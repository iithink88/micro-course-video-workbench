# -*- coding: utf-8 -*-
"""
全自动剪辑 —— 用大白话提示词驱动本地混剪引擎出片。
底层复用 video-mix-edit 技能的 build.py（全程本地 ffmpeg + ASR，无需密钥）。
工作原理：解析提示词 → 扫描素材生成完整 plan.json（含字幕/BGM/转场/结尾卡）→ 调用 build.py 出片。

用法：
  python auto_edit.py "把这几段剪成4分钟，去掉口误，加中文字幕字号大，配轻快BGM别盖过人声，结尾留3秒黑屏" --dir "D:/我的微课/素材夹"
  python auto_edit.py --interactive
  python auto_edit.py "..." --dir 素材夹 --dry-run          # 只生成方案，不出片
  python auto_edit.py "..." --dir 素材夹 --bgm "music.mp3" # 指定 BGM 文件

说明：
  - 素材文件夹里至少放 2 个视频，按文件名自然排序拼接。
  - 建议把录废的、卡壳的原片原样放入，"去掉口误/停顿"通过每段截取实现。
  - 成片务必逐句核对学科术语、公式、人名与字幕（AI 剪的是节奏，不是内容对错）。
"""
import os
import re
import sys
import json
import argparse
import subprocess

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
USER_SKILLS = os.path.join(os.path.expanduser("~"), ".workbuddy", "skills")
SKILL_DIR = os.environ.get("VIDEO_MIX_SKILL_DIR",
                           os.path.join(USER_SKILLS, "video-mix-edit"))
SCRIPTS = os.path.join(SKILL_DIR, "scripts")
BUILD_PY = os.path.join(SCRIPTS, "build.py")
TOOL_PY = os.path.join(SCRIPTS, "ffmpeg_tool.py")
sys.path.insert(0, SCRIPTS)

VIDEO_EXTS = {".mp4", ".mov", ".mkv", ".webm", ".avi", ".m4v", ".flv", ".ts"}
TRANSITIONS = ["fade", "slideup", "slidedown", "slideleft", "slideright",
               "wipeleft", "wiperight", "circlecrop", "rectcrop", "fadeblack",
               "smoothleft", "smoothright"]


# ---------- 提示词解析 ----------
def parse_prompt(p):
    o = {}
    # 时长 → 每段最长秒数
    m = re.search(r"每[段个](?:保留|取|最多)?\s*(\d+)\s*秒", p)
    if m:
        o["per_clip"] = int(m.group(1))
    else:
        m = re.search(r"(\d+)\s*分钟", p)
        if m:
            # 粗略：总时长 / 估计段数(默认4)，上限60
            o["per_clip"] = min(60, max(8, int(int(m.group(1)) * 60 / 4)))

    # 画幅版本
    has_v = bool(re.search(r"竖屏|9:16", p))
    has_h = bool(re.search(r"横屏|16:9", p))
    if has_v and not has_h:
        o["versions"] = ["9:16"]
    elif has_h and not has_v:
        o["versions"] = ["16:9"]
    else:
        o["versions"] = ["9:16", "16:9"]

    # 转场（中文别名优先，避免"淡入"被当成 slideup）
    t = "fade"
    if re.search(r"淡入淡出|渐变|淡入|平滑过渡", p):
        t = "fade"
    elif re.search(r"黑场|淡黑", p):
        t = "fadeblack"
    elif re.search(r"推入|上推|推镜", p):
        t = "slideup"
    elif re.search(r"左滑|横移", p):
        t = "slideleft"
    else:
        for tr in TRANSITIONS:
            if tr in p.lower():
                t = tr; break
        else:
            if re.search(r"转场|特效|炫酷", p):
                t = "slideup"
    o["transition"] = t

    # 字幕
    o["subtitle_on"] = not bool(re.search(r"不要字幕|不加字幕|去掉字幕", p))
    o["subtitle_big"] = bool(re.search(r"字号大|大一点|大些|字大", p))
    o["subtitle_srt"] = re.search(r"([^\s，。；]+\.srt)", p, re.I).group(1) if re.search(r"\.srt", p, re.I) else None

    # BGM
    o["want_bgm"] = bool(re.search(r"背景音乐|BGM|配乐|音乐", p, re.I))
    o["bgm_quiet"] = bool(re.search(r"别盖过|不要盖|轻快|小声|压低|不抢", p))

    # 封面
    mc = re.search(r"封面(?:标题|文字)?[:：]?\s*[「\"'《]?([^，。；\s\"'》]{2,14})", p)
    o["cover_text"] = mc.group(1) if mc else None

    # 结尾 CTA / 黑屏
    me = re.search(r"结尾(?:留|保留|加)?\s*(\d+)\s*秒(黑屏)?", p)
    if me:
        o["ending_sec"] = int(me.group(1))
        o["ending_black"] = bool(me.group(2))
    else:
        o["ending_sec"] = None
        o["ending_black"] = False
    return o


def collect_clips(folder):
    import re as _re
    def key(n):
        return [int(t) if t.isdigit() else t.lower() for t in _re.split(r"(\d+)", n)]
    files = [f for f in os.listdir(folder)
             if os.path.splitext(f)[1].lower() in VIDEO_EXTS]
    files.sort(key=key)
    return files


def probe_duration(path):
    try:
        import ffmpeg_tool as ft
        return ft.probe(path).get("duration")
    except Exception:
        return None


def make_plan(o, folder, output, bgm):
    clips = collect_clips(folder)
    plan = {
        "segments": [],
        "transition": o["transition"],
        "transition_duration": 0.5,
        "crop_mode": "cover",
        "subtitle": {
            "enabled": o["subtitle_on"], "language": "zh", "engine": "auto",
            "size": 66 if o["subtitle_big"] else 54, "font": "Microsoft YaHei",
        },
    }
    if o["subtitle_srt"]:
        plan["subtitle"]["srt"] = o["subtitle_srt"]
    if len(o["versions"]) == 1:
        plan["resolution"] = "1080x1920" if o["versions"][0] == "9:16" else "1920x1080"
    else:
        plan["versions"] = o["versions"]
    if bgm and os.path.exists(bgm):
        plan["bgm"] = {"file": os.path.abspath(bgm), "volume": 0.10 if o["bgm_quiet"] else 0.18}
    if o["cover_text"]:
        plan["cover"] = {"enabled": True, "time": 0, "text": o["cover_text"], "size": 72, "color": "white"}
    # 结尾卡：黑屏需求用文字卡近似（引擎支持 CTA）；也可纯黑由 cta 空文本处理
    if o["ending_sec"]:
        if o["ending_black"]:
            plan["cta"] = {"text": "", "duration": o["ending_sec"], "color": "black", "box": False}
        else:
            plan["cta"] = {"text": "感谢观看", "duration": o["ending_sec"], "size": 56, "color": "white"}
    plan["output"] = output

    for i, c in enumerate(clips):
        seg = {"file": c}
        dur = probe_duration(os.path.join(folder, c))
        if o.get("per_clip") and dur and dur > o["per_clip"]:
            seg["trim"] = {"end": o["per_clip"]}
        if i > 0:
            seg["transition"] = o["transition"]
            seg["transition_duration"] = 0.5
        plan["segments"].append(seg)
    return plan, clips


def report(o, folder, output, bgm, clips):
    L = ["", "  ══════════ 剪辑方案（提示词自动解析） ══════════",
         f"  素材文件夹：{folder}", f"  扫描到素材：{len(clips)} 个 → " + "、".join(clips[:6]) + ("…" if len(clips) > 6 else ""),
         f"  输出成片：{output}",
         f"  画幅版本：{','.join(o['versions'])}",
         f"  段间转场：{o['transition']}（0.5s）",
         f"  字幕：{'开启' if o['subtitle_on'] else '关闭'} · 中文 · 字号{'大' if o['subtitle_big'] else '标准'}" + (f" · 烧录{o['subtitle_srt']}" if o['subtitle_srt'] else ""),
         f"  去口误/停顿：{'已按每段截取处理' if o.get('per_clip') else '否'}",
         f"  BGM：{bgm or ('想要（未指定文件，可用 --bgm 提供）' if o['want_bgm'] else '不加')}" + (f"（音量压低）" if bgm and o['bgm_quiet'] else ""),
         ]
    if o.get("per_clip"): L.append(f"  每段最长：{o['per_clip']} 秒")
    if o.get("ending_sec"): L.append(f"  结尾：{o['ending_sec']} 秒{'黑屏' if o['ending_black'] else '感谢卡'}")
    if o.get("cover_text"): L.append(f"  封面标题：{o['cover_text']}")
    L += ["  ──────────────────────────────────────────",
          "  成片后请逐句核对学科术语、公式、人名与字幕。", ""]
    return "\n".join(L)


def main():
    ap = argparse.ArgumentParser(description="全自动剪辑：提示词驱动本地混剪引擎")
    ap.add_argument("prompt", nargs="?", help="剪辑要求描述")
    ap.add_argument("--dir", help="素材文件夹（含 >=2 个视频）")
    ap.add_argument("--output", default="微课成片.mp4", help="输出文件名")
    ap.add_argument("--bgm", help="BGM 音频文件路径")
    ap.add_argument("--dry-run", action="store_true", help="只解析并生成 plan.json，不出片")
    ap.add_argument("--interactive", action="store_true")
    args = ap.parse_args()

    prompt = args.prompt
    if args.interactive or not prompt:
        prompt = input("请用大白话描述剪辑要求：").strip()
    if not prompt:
        print("未提供剪辑要求。"); sys.exit(1)
    if not args.dir:
        print("❌ 请用 --dir 指定素材文件夹。"); sys.exit(1)

    folder = os.path.abspath(args.dir)
    if not os.path.isdir(folder):
        print(f"❌ 素材文件夹不存在：{folder}"); sys.exit(1)
    if not os.path.exists(BUILD_PY):
        print("❌ 未找到剪辑引擎 build.py："); print(f"   {BUILD_PY}")
        print("   请确认 video-mix-edit 技能已安装，或设置 VIDEO_MIX_SKILL_DIR。")
        sys.exit(1)

    o = parse_prompt(prompt)
    plan, clips = make_plan(o, folder, args.output, args.bgm)
    if len(clips) < 2:
        print(f"❌ 素材文件夹里至少需要 2 个视频，当前 {len(clips)} 个：{folder}")
        sys.exit(1)

    print(report(o, folder, args.output, args.bgm, clips))
    plan_path = os.path.join(folder, "auto_edit_plan.json")
    with open(plan_path, "w", encoding="utf-8") as f:
        json.dump(plan, f, ensure_ascii=False, indent=2)
    print(f"  📋 剪辑方案已生成：{plan_path}")

    if args.dry_run:
        print(json.dumps(plan, ensure_ascii=False, indent=2))
        print("\n（--dry-run：仅预览，未出片）")
        return

    cmd = [sys.executable, BUILD_PY, "--plan", plan_path]
    print("\n  执行命令：" + " ".join('"' + c + '"' if " " in c else c for c in cmd))
    print("\n🎬 开始自动剪辑...\n")
    try:
        r = subprocess.run(cmd, cwd=folder)
        sys.exit(r.returncode)
    except KeyboardInterrupt:
        print("\n已中断。"); sys.exit(130)


if __name__ == "__main__":
    main()
