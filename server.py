# -*- coding: utf-8 -*-
"""
视频工作台 · 本地服务
作用：托管 index.html，并提供 API 让网页能真正调用路由AI与全自动剪辑。
启动：python server.py  然后浏览器打开 http://127.0.0.1:8770
（双击"启动工作台.bat"会自动启动服务并打开浏览器）
"""
import os
import sys
import json
import subprocess
import urllib.parse
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PY = sys.executable
PORT = 8770


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=BASE_DIR, **kw)

    def log_message(self, fmt, *args):
        pass  # 静默日志

    def _json(self, obj, code=200):
        data = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        qs = urllib.parse.parse_qs(parsed.query)
        if parsed.path == "/api/route":
            prompt = qs.get("q", [""])[0]
            if not prompt:
                return self._json({"error": "缺少需求描述"}, 400)
            try:
                r = subprocess.run([PY, os.path.join(BASE_DIR, "video_router.py"), prompt, "--json"],
                                   capture_output=True, text=True, timeout=90, encoding="utf-8")
                self._json(json.loads(r.stdout))
            except Exception as e:
                self._json({"error": str(e)}, 500)
            return
        super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length).decode("utf-8") if length else "{}"
        try:
            payload = json.loads(body)
        except Exception:
            payload = {}

        if parsed.path == "/api/edit":
            prompt = payload.get("prompt", "")
            folder = payload.get("dir", "")
            bgm = payload.get("bgm", "")
            dry = payload.get("dry", False)
            if not prompt or not folder:
                return self._json({"error": "需要提供剪辑要求和素材文件夹"}, 400)
            cmd = [PY, os.path.join(BASE_DIR, "auto_edit.py"), prompt, "--dir", folder]
            if bgm: cmd += ["--bgm", bgm]
            if dry: cmd.append("--dry-run")
            try:
                r = subprocess.run(cmd, capture_output=True, text=True, timeout=1800, encoding="utf-8", errors="replace")
                self._json({"code": r.returncode, "out": (r.stdout or "") + (r.stderr or "")})
            except Exception as e:
                self._json({"error": str(e)}, 500)
            return
        self._json({"error": "未知接口"}, 404)


def main():
    srv = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print("=" * 56)
    print("  微课视频工作台 已启动")
    print(f"  请在浏览器打开：http://127.0.0.1:{PORT}")
    print("  按 Ctrl+C 停止服务")
    print("=" * 56)
    # 尝试自动打开浏览器
    try:
        import webbrowser
        webbrowser.open(f"http://127.0.0.1:{PORT}")
    except Exception:
        pass
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        print("\n服务已停止。")


if __name__ == "__main__":
    main()
