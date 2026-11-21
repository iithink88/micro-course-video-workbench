@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================================
echo   微课视频工作台 启动中...
echo ============================================================

rem —— 动态探测 Python：PATH 优先，其次 WorkBuddy 托管 venv ——
set "PY="
where python >nul 2>nul && set "PY=python"
if not defined PY if exist "%USERPROFILE%\.workbuddy\binaries\python\envs\default\Scripts\python.exe" set "PY=%USERPROFILE%\.workbuddy\binaries\python\envs\default\Scripts\python.exe"
if not defined PY where py >nul 2>nul && set "PY=py"
if not defined PY (
  echo [错误] 未找到 Python，请先安装 Python 3.9+ 并加入 PATH。
  pause
  exit /b 1
)
echo 使用 Python: %PY%

"%PY%" server.py
pause
