@echo off
chcp 65001 >nul
title 微课视频工作台 - 一键安装
echo ============================================================
echo   微课视频工作台 · 一键安装
echo ============================================================
echo.
echo 本脚本会把"微课视频工作台"技能复制到你的 WorkBuddy 技能目录。
echo.

set "SRC=%~dp0"
set "DST=%USERPROFILE%\.workbuddy\skills\micro-course-video-workbench"

echo 源目录  ：%SRC%
echo 目标目录：%DST%
echo.

if not exist "%USERPROFILE%\.workbuddy\skills" mkdir "%USERPROFILE%\.workbuddy\skills"
if exist "%DST%" (
  echo [提示] 目标目录已存在，将覆盖同名文件（你的自定义修改会被覆盖）。
  choice /C YN /M "确认继续覆盖？"
  if errorlevel 2 exit /b 0
)

xcopy "%SRC%*" "%DST%\" /E /I /Y >nul 2>&1
if errorlevel 1 (
  echo [错误] 复制失败，请手动把整个文件夹复制到：
  echo        %DST%
  pause
  exit /b 1
)

echo.
echo [完成] 技能已安装到：
echo        %DST%
echo.
echo 请重启 WorkBuddy，然后在对话里说"做个微课"或"帮我选个视频技能"即可触发。
echo 详细说明见 README.md。
echo.
pause
