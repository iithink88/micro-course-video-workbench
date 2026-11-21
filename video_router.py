# -*- coding: utf-8 -*-
"""
视频路由 AI —— 根据用户提示词，自动选择最合适的视频技能。
两种模式：
  1) Qwen 语义模式：设置了 DASHSCOPE_API_KEY 时，调用通义千问做深度意图理解。
  2) 本地关键词模式：无密钥时自动兜底，零网络、零配置，双击即用。

用法：
  python video_router.py "给初二学生讲光的反射定律，4分钟，白板手绘风"
  python video_router.py "把这首古诗做成国风短片" --json
  python video_router.py --interactive

密钥设置（任选其一，不写入本文件）：
  Windows:  set DASHSCOPE_API_KEY=你的key
  PowerShell: $env:DASHSCOPE_API_KEY="你的key"
"""
import os
import re
import sys
import json
import argparse

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "skills_data.js")


# ---------- 读取技能数据 ----------
def load_skills():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        text = f.read()
    m = re.search(r"window\.SKILLS_DATA\s*=\s*(\{.*\})\s*;", text, re.S)
    if not m:
        raise RuntimeError("无法解析 skills_data.js")
    return json.loads(m.group(1))


# ---------- 本地关键词匹配 ----------
SUBJECT = {
    "数学": ["数学", "几何", "代数", "函数", "方程", "公式", "解题", "行程", "三角形", "面积"],
    "物理": ["物理", "力学", "受力", "牛顿", "电磁", "光学", "电路", "反射", "折射", "能量", "运动"],
    "化学": ["化学", "反应", "配平", "分子", "离子", "氧化还原", "元素", "原子", "溶液"],
    "语文": ["语文", "古诗", "诗词", "汉字", "识字", "课文", "作文", "文言", "阅读", "诗"],
    "英语": ["英语", "单词", "词汇", "英文", "语法", "口语"],
    "历史": ["历史", "朝代", "时间线", "古迹", "史"],
    "地理": ["地理", "地图", "路线", "地形", "区域", "城市"],
    "生物": ["生物", "进化", "细胞", "植物", "动物", "物种", "遗传"],
    "音乐": ["音乐", "音符", "乐谱", "舞蹈", "节拍", "唱", "歌曲"],
}
INTENT = {
    "解题讲题": ["解题", "讲题", "例题", "题目", "怎么解", "推导", "讲解题"],
    "讲解教学": ["讲", "定律", "定理", "讲透", "复习", "学习", "重点讲"],
    "口播讲解": ["口播", "讲解", "解说", "讲一下", "介绍", "科普", "讲透"],
    "宣传推广": ["宣传", "推广", "发布", "产品", "品牌", "广告"],
    "说唱趣味": ["说唱", "rap", "口诀", "好记", "趣味", "爆款"],
    "故事动画": ["故事", "动画", "寓言", "童话", "绘本", "剪影", "火柴人"],
    "国风大片": ["国风", "古诗", "诗词", "水墨", "神话", "传说", "电影", "大片", "上美影", "拍成"],
    "字幕转录": ["字幕", "转录", "识别", "转文字", "srt"],
    "剪辑混剪": ["剪辑", "混剪", "合并", "拼接", "掐头", "去口误", "转场", "卡点", "删掉"],
    "下载素材": ["下载", "素材", "去水印", "采集", "保存到本地"],
    "数字人": ["数字人", "虚拟人", "主播", "真人出镜", "口型"],
    "白板手绘": ["白板", "手绘", "板书", "笔迹", "纸张"],
    "地图轨迹": ["地图", "轨迹", "路线", "定位", "旅行", "飞线", "出行"],
}
CATEGORY_INTENT = {
    "subject": ["解题讲题", "讲解教学"], "explainer": ["口播讲解", "宣传推广", "数字人"],
    "text2video": ["口播讲解"], "creative": ["说唱趣味", "故事动画"],
    "motion": ["白板手绘", "地图轨迹", "故事动画"], "cinema": ["国风大片", "故事动画"],
    "music": ["剪辑混剪"], "edit": ["字幕转录", "剪辑混剪"], "asset": ["下载素材"],
}
# 学科主线技能（名称含学科词），当出现该学科且是讲解类需求时优先
SUBJECT_SKILLS = {
    "数学": ["edu-math-video"], "物理": ["edu-physics-video"],
    "化学": ["edu-chem-video", "edu-chem-reaction"],
    "语文": ["hbg-hanzi-chaizi-video", "poem-to-seedance-film"],
    "英语": ["english-word-memory-video"], "地理": ["map-motion"],
    "生物": ["wanwu-evolution-video"], "历史": ["history-lesson-generator"],
}


def detect(prompt, dictionary):
    hits = []
    for name, words in dictionary.items():
        found = [w for w in words if w.lower() in prompt.lower()]
        if found:
            hits.append({"name": name, "score": len(found), "words": found})
    return sorted(hits, key=lambda x: -x["score"])


def local_route(prompt, data):
    subj = detect(prompt, SUBJECT)
    intent = detect(prompt, INTENT)
    scored = []
    for s in data["skills"]:
        score = 0.0
        why = []
        for w in s.get("triggers", []):
            if w.lower() in prompt.lower():
                score += 5; why.append(w)
        for w in s.get("keywords", []):
            if len(w) > 1 and w.lower() in prompt.lower():
                score += 3; why.append(w)
        if s["name"].lower() in prompt.lower():
            score += 6; why.append(s["name"])
        for it in intent:
            if it["name"] in CATEGORY_INTENT.get(s["category"], []):
                score += 7; why.append("意图:" + it["name"])
        for sj in subj:
            if any(sj["name"] in k or k in sj["name"] for k in s.get("keywords", [])):
                score += 5; why.append(sj["name"])
            # 学科主线技能强加权（压过白板/字幕等风格修饰词）
            if s["id"] in SUBJECT_SKILLS.get(sj["name"], []):
                score += 14; why.append("学科主线:" + sj["name"])
        # 有明确讲解意图时，学科讲题类再加权
        if any(it["name"] in ("解题讲题", "讲解教学") for it in intent) and s["category"] == "subject":
            score += 6; why.append("讲解类")
        score += s.get("rating", 3) * 0.5
        scored.append({"skill": s, "score": score, "why": list(dict.fromkeys(why))})
    scored.sort(key=lambda x: -x["score"])
    mx = scored[0]["score"] if scored else 1
    return {
        "mode": "本地关键词匹配",
        "subjects": [x["name"] for x in subj[:3]],
        "intents": [x["name"] for x in intent[:3]],
        "recommendations": [
            {
                "rank": i + 1, "id": x["skill"]["id"], "name": x["skill"]["name"],
                "path": x["skill"]["path"], "match": round(max(35, x["score"] / mx * 100)),
                "reason": "、".join(x["why"][:6]) or "综合适配",
                "best_for": x["skill"]["bestFor"], "output": x["skill"]["output"],
            }
            for i, x in enumerate(scored[:3])
        ],
    }


# ---------- Qwen 语义模式 ----------
def qwen_route(prompt, data, api_key, model="qwen-plus"):
    import requests
    catalog = "\n".join(
        f"- {s['id']} | {s['name']} | 分类:{s['category']} | {s['desc']} | 触发:{','.join(s.get('triggers', []))}"
        for s in data["skills"]
    )
    sys_prompt = (
        "你是微课视频技能路由专家。从下列技能中选出最匹配用户需求的3个，按匹配度排序。"
        "只输出JSON，不要多余文字。格式：\n"
        '{"subjects":["学科"],"intents":["意图"],"recommendations":[{"rank":1,"id":"技能id","name":"名称","match":匹配度整数,"reason":"中文理由"}],"workflow":["步骤1","步骤2"]}\n'
        "技能清单：\n" + catalog
    )
    resp = requests.post(
        "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        json={
            "model": model,
            "messages": [
                {"role": "system", "content": sys_prompt},
                {"role": "user", "content": prompt},
            ],
            "temperature": 0.2,
        },
        timeout=60,
    )
    resp.raise_for_status()
    content = resp.json()["choices"][0]["message"]["content"]
    content = re.sub(r"```json|```", "", content).strip()
    result = json.loads(content)
    # 补充本地字段，保证输出结构统一
    by_id = {s["id"]: s for s in data["skills"]}
    for r in result.get("recommendations", []):
        s = by_id.get(r.get("id"), {})
        r.setdefault("path", s.get("path", ""))
        r.setdefault("best_for", s.get("bestFor", ""))
        r.setdefault("output", s.get("output", ""))
    result["mode"] = f"Qwen 语义模式 ({model})"
    return result


# ---------- 输出 ----------
def fmt(result, prompt):
    lines = []
    lines.append(f"\n  路由模式：{result['mode']}")
    if result.get("subjects"):
        lines.append("  识别学科：" + " / ".join(result["subjects"]))
    if result.get("intents"):
        lines.append("  识别意图：" + " / ".join(result["intents"]))
    lines.append("\n  ★ 推荐技能：")
    for r in result.get("recommendations", []):
        lines.append(f"    {r['rank']}. {r['name']}（{r['id']}）  匹配度 {r.get('match','?')}%")
        lines.append(f"       理由：{r.get('reason','')}")
        lines.append(f"       适合：{r.get('best_for','')}")
    if result.get("workflow"):
        lines.append("\n  ◆ 推荐工作流：")
        for i, step in enumerate(result["workflow"], 1):
            lines.append(f"    {i}. {step}")
    top = result.get("recommendations", [{}])[0]
    if top.get("id"):
        lines.append(f"\n  可直接使用的提示词：")
        lines.append(f"    python video_router.py \"{prompt}\"  →  选择 {top['name']}（{top['path']}）")
    return "\n".join(lines)


def main():
    ap = argparse.ArgumentParser(description="视频路由 AI：按提示词自动选技能")
    ap.add_argument("prompt", nargs="?", help="微课需求描述")
    ap.add_argument("--json", action="store_true", help="输出 JSON")
    ap.add_argument("--model", default="qwen-plus", help="Qwen 模型名")
    ap.add_argument("--local", action="store_true", help="强制本地匹配")
    ap.add_argument("--interactive", action="store_true", help="交互输入模式")
    args = ap.parse_args()

    prompt = args.prompt
    if args.interactive or not prompt:
        prompt = input("请描述你要做的微课：").strip()
    if not prompt:
        print("未提供需求描述。"); sys.exit(1)

    data = load_skills()
    api_key = os.environ.get("DASHSCOPE_API_KEY", "").strip()
    if api_key and not args.local:
        try:
            result = qwen_route(prompt, data, api_key, args.model)
        except Exception as e:
            print(f"[提示] Qwen 调用失败（{e}），已自动切换本地匹配。", file=sys.stderr)
            result = local_route(prompt, data)
    else:
        result = local_route(prompt, data)

    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        print(fmt(result, prompt))


if __name__ == "__main__":
    main()
