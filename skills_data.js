/* ============================================================
 * 视频工作台 · 技能清单数据源
 * ------------------------------------------------------------
 * 本文件是网页展示页与视频路由AI的共用数据源。
 * 网页通过 <script src> 加载（本地双击可用，无跨域限制）；
 * 路由AI通过读取本文件并解析 JSON 使用。
 * 新增技能：按同样结构往 skills 数组追加即可，网页会自动展示。
 * ============================================================ */
window.SKILLS_DATA = {
  "meta": {
    "name": "微课视频工作台",
    "version": "1.0.0",
    "updated": "2026-11-21",
    "owner": "京灵智创",
    "skillRoot": "~/.workbuddy/skills/"
  },
  "categories": [
    { "id": "subject",   "name": "学科讲题微课", "short": "学科", "desc": "把一道题/一个知识点讲透，带配音字幕动画", "color": "#2563eb" },
    { "id": "explainer", "name": "通用讲解口播", "short": "口播", "desc": "主题/文案驱动的解说、数字人、白板讲解视频", "color": "#7c3aed" },
    { "id": "text2video","name": "文案转视频",   "short": "文转视", "desc": "一段文字/网页/PPT 一键变成讲解视频", "color": "#0891b2" },
    { "id": "creative",  "name": "知识点创意",   "short": "创意", "desc": "说唱、单词记忆、故事、科普等趣味形式", "color": "#db2777" },
    { "id": "motion",    "name": "动画视觉风格", "short": "动效", "desc": "代码生成的风格化动画、地图、白板、粒子", "color": "#ea580c" },
    { "id": "cinema",    "name": "AI大片国风",   "short": "大片", "desc": "国风、古诗词、课文改编的影片级短片", "color": "#dc2626" },
    { "id": "music",     "name": "音乐卡点",     "short": "音乐", "desc": "音乐驱动的卡点、舞蹈、配乐视频", "color": "#16a34a" },
    { "id": "edit",      "name": "剪辑后期",     "short": "剪辑", "desc": "混剪、字幕、转录、去口误——成片精修", "color": "#4f46e5" },
    { "id": "asset",     "name": "素材下载",     "short": "素材", "desc": "从各平台下载视频素材与提取文案", "color": "#64748b" }
  ],
  "skills": [
    {
      "id": "edu-math-video", "name": "数学题讲解视频", "category": "subject", "icon": "数",
      "desc": "一道数学题做成带中文配音+双语字幕+手绘动画的讲题微课",
      "detail": "输入题目截图或文字，生成 16:9/1920×1080 讲题 MP4。画面跟着旁白走，线段滑动、图形叠合把推理演出来。自带完整模板与读音控制。",
      "triggers": ["数学题", "解题视频", "例题精讲", "数学微课", "几何题", "函数题", "行程问题"],
      "keywords": ["数学", "讲题", "几何", "代数", "函数", "解题", "微课", "例题"],
      "bestFor": "数学解题过程讲解、例题精讲微课", "output": "MP4 1080P + 中英双语字幕",
      "deps": "GLM-TTS 配音（无 Key 自动兜底 edge-tts）、Node、Playwright、ffmpeg", "needsKey": "可选(GLM_API_KEY)", "rating": 5,
      "path": "edu-math-video"
    },
    {
      "id": "edu-physics-video", "name": "物理题讲解视频", "category": "subject", "icon": "物",
      "desc": "物理题做成受力/运动真实推演的蓝图风格讲题微课",
      "detail": "覆盖力学（受力分析、牛顿定律、斜面、传送带、平抛、圆周、能量动量）、光学、电磁。中文配音+双语字幕，运动严格跟随真实解法。",
      "triggers": ["物理题", "受力分析", "力学", "物理微课", "电磁题", "光学题"],
      "keywords": ["物理", "力学", "受力", "牛顿", "电磁", "光学", "讲题", "微课"],
      "bestFor": "物理受力分析、运动过程讲解微课", "output": "MP4 1080P + 中英双语字幕",
      "deps": "GLM-TTS 配音（可兜底）、Node、Playwright、ffmpeg", "needsKey": "可选(GLM_API_KEY)", "rating": 5,
      "path": "edu-physics-video"
    },
    {
      "id": "edu-chem-video", "name": "化学题讲解视频", "category": "subject", "icon": "化",
      "desc": "化学题做成围绕方程式的黑板风格讲题微课",
      "detail": "覆盖氧化还原配平、物质的量、化学平衡三段式、离子反应、电化学、滴定、工业流程。中文配音+双语字幕。",
      "triggers": ["化学题", "配平", "化学平衡", "化学微课", "离子反应", "电化学"],
      "keywords": ["化学", "配平", "氧化还原", "平衡", "离子", "滴定", "讲题", "微课"],
      "bestFor": "化学方程式与计算题讲解微课", "output": "MP4 1080P + 中英双语字幕",
      "deps": "GLM-TTS 配音（可兜底）、Node、Playwright、ffmpeg", "needsKey": "可选(GLM_API_KEY)", "rating": 5,
      "path": "edu-chem-video"
    },
    {
      "id": "edu-chem-reaction", "name": "化学反应微观演示", "category": "subject", "icon": "反",
      "desc": "一个化学反应做成可交互的微观 3D 演示网页",
      "detail": "Three.js 分子动画（拖滑块看断键成键）+ KaTeX 方程式 + 分步讲解 + 原子守恒计数。sympy 精确驱动配平。输入反应式/随机出题/拍照识别。",
      "triggers": ["化学反应演示", "微观动画", "分子动画", "断键成键", "反应机理"],
      "keywords": ["化学", "反应", "微观", "分子", "3D", "交互", "配平", "机理"],
      "bestFor": "化学反应原理的交互式可视化（非 MP4，是网页）", "output": "单文件交互 HTML",
      "deps": "sympy、Three.js（内嵌）", "needsKey": "否", "rating": 4,
      "path": "edu-chem-reaction"
    },
    {
      "id": "manim", "name": "Manim 数学动画", "category": "subject", "icon": "M",
      "desc": "用 3Blue1Brown 的 Manim 引擎生成严谨的数学概念动画",
      "detail": "在本机用社区版 manim 生成讲解数学/概念的可视化动画 MP4，公式推导优美严谨，适合抽象概念演示。",
      "triggers": ["manim", "数学动画", "概念动画", "3blue1brown", "公式动画"],
      "keywords": ["manim", "数学", "动画", "公式", "概念", "可视化"],
      "bestFor": "数学概念原理的高质量动画演示", "output": "MP4",
      "deps": "Python manim、LaTeX、ffmpeg", "needsKey": "否", "rating": 4,
      "path": "manim"
    },
    {
      "id": "teaching-animation-scriptwriter", "name": "教学动画编剧", "category": "subject", "icon": "编",
      "desc": "把学科抽象/微观/动态难点转成交互式单文件 HTML 教学动画",
      "detail": "面向义务教育各学科，把认知难点做成可交互动画。适用于原理讲解、难点可视化、仿真资源推荐与自建。",
      "triggers": ["教学动画", "难点可视化", "微课脚本", "交互式动画", "原理讲解动画"],
      "keywords": ["教学动画", "可视化", "交互", "HTML", "难点", "原理", "微课"],
      "bestFor": "各学科抽象难点的交互式教学动画", "output": "单文件交互 HTML",
      "deps": "无（纯前端 HTML）", "needsKey": "否", "rating": 5,
      "path": "teaching-animation-scriptwriter"
    },
    {
      "id": "history-lesson-generator", "name": "历史课生成器", "category": "subject", "icon": "史",
      "desc": "历史主题生成课件+练习题+交互网页（非视频）",
      "detail": "根据历史主题生成标准化教学产物：文字课件（教案/知识点/互动）、配套练习、交互式网页（时间线/转盘点名/图片）。",
      "triggers": ["历史课件", "历史课", "历史教学", "时间线网页"],
      "keywords": ["历史", "课件", "教案", "时间线", "练习"],
      "bestFor": "历史备课配套资源", "output": "文档 + 交互网页",
      "deps": "无", "needsKey": "否", "rating": 3,
      "path": "history-lesson-generator"
    },
    {
      "id": "hbg-hanzi-chaizi-video", "name": "汉字拆字短视频", "category": "subject", "icon": "字",
      "desc": "把一个汉字写出来、拆开来、讲成一句记得住的话",
      "detail": "9:16 汉字拆字短视频，上方逐笔书写，下方偏旁部件分离变形为独立汉字。基于 Remotion + Edge TTS。",
      "triggers": ["汉字视频", "拆字", "识字视频", "汉字讲解", "偏旁"],
      "keywords": ["汉字", "拆字", "识字", "语文", "偏旁", "书写"],
      "bestFor": "语文识字教学、汉字文化微课", "output": "MP4 9:16 竖屏",
      "deps": "Remotion、Edge TTS、ffmpeg", "needsKey": "否", "rating": 4,
      "path": "hbg-hanzi-chaizi-video"
    },

    {
      "id": "bb-video", "name": "纯代码讲解/宣传片", "category": "explainer", "icon": "B",
      "desc": "28 种视觉风格的纯代码解说片与宣传片，选风格即可出片",
      "detail": "旁白驱动解说片 / 节拍驱动宣传片，16:9 或 9:16。风格含白板、水墨、皮影、像素、等距微缩、电影预告、日漫、地图动画等。科普/历史/产品发布通吃。",
      "triggers": ["科普视频", "白板动画", "宣传片", "讲个历史故事", "产品发布视频", "explainer"],
      "keywords": ["科普", "白板", "宣传片", "解说", "历史", "风格", "水墨", "皮影", "像素"],
      "bestFor": "通用科普/讲解微课，风格选择丰富", "output": "MP4 16:9 / 9:16",
      "deps": "Node、无头 Chrome、ffmpeg、edge-tts", "needsKey": "否", "rating": 5,
      "path": "bb-video"
    },
    {
      "id": "animate", "name": "纯代码风格动画", "category": "explainer", "icon": "A",
      "desc": "7+ 种手作风格的程序化短动画，单文件 canvas 出 MP4",
      "detail": "剪纸/钢笔画/孔版/速写本/manim 数学/像素/等距线稿，支持从参考图仿制新风格。含故事→画面→分镜三次确认和量化审查。",
      "triggers": ["动画视频", "短动画", "reel", "风格动画", "代码动画"],
      "keywords": ["动画", "剪纸", "钢笔画", "像素", "等距", "速写", "风格", "短片"],
      "bestFor": "有故事性的风格化知识点动画", "output": "MP4",
      "deps": "Node、系统 Chrome（已适配本机）、ffmpeg、edge-tts", "needsKey": "否", "rating": 4,
      "path": "animate"
    },
    {
      "id": "text-to-voiceover-video", "name": "文案转口播视频", "category": "explainer", "icon": "播",
      "desc": "一段文案自动生成画面+edge-tts 配音+同步字幕的口播视频",
      "detail": "文案既是画面文字也是口播稿。Remotion 生成画面，叠加配音与同步字幕。自带 tkinter 图形界面，双击启动即用。",
      "triggers": ["文案转口播", "文案配音视频", "文字出解说视频", "口播视频"],
      "keywords": ["文案", "口播", "配音", "字幕", "Remotion", "文字转视频"],
      "bestFor": "已有讲稿快速转成带声解说视频", "output": "MP4 + 字幕",
      "deps": "Remotion、Node、edge-tts、ffmpeg", "needsKey": "否（edge-tts 免费）", "rating": 5,
      "path": "text-to-voiceover-video"
    },
    {
      "id": "text-to-clonedvoice-video-full", "name": "克隆音色横版视频", "category": "explainer", "icon": "声",
      "desc": "口播文案生成横版分镜视频，支持克隆你自己的声音",
      "detail": "两种声音引擎：MiniMax 云端克隆声（需凭证）或 edge-tts 免费声。输入口播文案，自动带配音、字幕严格对齐、分镜画面的深色科技风横版视频。",
      "triggers": ["克隆声音视频", "我的声音配音", "口播文案视频", "横版讲解视频"],
      "keywords": ["克隆", "配音", "口播", "分镜", "声音", "横版"],
      "bestFor": "需要教师本人音色的讲解微课", "output": "MP4 1920×1080",
      "deps": "MiniMax(可选) / edge-tts、ffmpeg", "needsKey": "可选(MiniMax)", "rating": 4,
      "path": "text-to-clonedvoice-video-full"
    },
    {
      "id": "talking-head-remotion", "name": "口播视频工程", "category": "explainer", "icon": "讲",
      "desc": "可复用的口播视频工程：PIP 画中画+同步字幕+章节进度条",
      "detail": "支持口播音频/视频、右下角圆形 PIP、底部同步字幕、顶部章节进度条、Studio 现代主题、SFX/BGM 规划。适合搭建系列化口播工程。",
      "triggers": ["口播工程", "画中画视频", "数字人模板", "章节进度条视频"],
      "keywords": ["口播", "PIP", "画中画", "字幕", "章节", "Remotion", "模板"],
      "bestFor": "系列化、固定模板的口播微课", "output": "Remotion 工程 + MP4",
      "deps": "Remotion、Node、ffmpeg", "needsKey": "否", "rating": 4,
      "path": "talking-head-remotion"
    },
    {
      "id": "lanshu-create-ai-presenter-video", "name": "AI数字人讲解视频", "category": "explainer", "icon": "人",
      "desc": "数字人/12 种讲解风格出一条完整可发布视频",
      "detail": "AI 数字人口播（需授权的真人形象图），或无数字人的 12 种讲解风格（留白、科技感、手帐、立体书、波普、黑板报、黏土小城、推演图解等）。口型修复、字幕、重导出。",
      "triggers": ["数字人", "数字人讲解", "AI主播", "讲解视频风格", "口型同步"],
      "keywords": ["数字人", "口播", "讲解", "风格", "口型", " presentER"],
      "bestFor": "需要虚拟教师出镜的讲解微课", "output": "MP4",
      "deps": "Python3.9+、ffmpeg、jq、Node、rsync；远程声音/形象需凭证", "needsKey": "是（远程生成）", "rating": 4,
      "path": "lanshu-create-ai-presenter-video"
    },
    {
      "id": "one-minute-knowledge-video", "name": "一分钟知识短视频", "category": "explainer", "icon": "分",
      "desc": "输入主题自动产出竖屏知识科普短视频（口播+配图+配音+字幕）",
      "detail": "法律常识、学科知识、通识科普等「一分钟读懂」类。配音走 Windows 离线 SAPI，零网络。",
      "triggers": ["一分钟知识", "短视频", "知识科普", "口播视频", "主题短视频"],
      "keywords": ["一分钟", "科普", "短视频", "口播", "竖屏", "知识"],
      "bestFor": "1 分钟知识点速讲、翻转课堂导入", "output": "MP4 9:16 竖屏",
      "deps": "Windows SAPI 离线配音、ffmpeg", "needsKey": "否", "rating": 4,
      "path": "one-minute-knowledge-video"
    },
    {
      "id": "wtt-code-video-studio", "name": "代码视频工作室", "category": "explainer", "icon": "W",
      "desc": "想法/文章/剧本做成前端代码动画与 MP4，五方向智能推荐",
      "detail": "按内容推荐五方向，先出四帧拼图确认再完整渲染。支持概念解释、个人宣传、产品教程、纪实、数据地图明信片。默认个人音色和素材版本审阅。",
      "triggers": ["代码视频", "概念视频", "产品教程视频", "数据视频", "想法做成视频"],
      "keywords": ["代码视频", "概念", "教程", "数据", "地图", "工作室"],
      "bestFor": "概念解释类微课，先审帧再渲染可控", "output": "MP4 + 交互输出",
      "deps": "前端代码渲染、ffmpeg", "needsKey": "否", "rating": 4,
      "path": "wtt-code-video-studio"
    },

    {
      "id": "text-to-remotion-video", "name": "文字一键转视频", "category": "text2video", "icon": "文",
      "desc": "文字/文案/脚本一键生成可编辑 Remotion 短视频并渲染 MP4",
      "detail": "React+TypeScript+Remotion。支持抖音 9:16、YouTube 16:9、小红书 3:4。内置场景拆分、图标、渐变背景与免费商用 BGM。",
      "triggers": ["文本生成视频", "文案转视频", "脚本做成视频", "remotion", "文字生成短视频"],
      "keywords": ["文字转视频", "文案", "脚本", "Remotion", "竖屏", "横屏"],
      "bestFor": "把已有讲稿快速做成可编辑视频工程", "output": "Remotion 工程 + MP4",
      "deps": "Node、React、Remotion、ffmpeg", "needsKey": "否", "rating": 4,
      "path": "text-to-remotion-video"
    },
    {
      "id": "webpage-to-video", "name": "网页转讲解视频", "category": "text2video", "icon": "页",
      "desc": "HTML 分步演示页录制成带语音旁白的 MP4",
      "detail": "edge-tts 生成中英配音，Playwright 无头 Chromium 精确按幻灯片计时录制，ffmpeg 合并音画。适合把交互网页课件转成视频。",
      "triggers": ["网页转视频", "HTML加配音", "课件录成视频", "演示文稿录视频"],
      "keywords": ["网页", "HTML", "配音", "录制", "课件", "演示", "edge-tts"],
      "bestFor": "把已有 HTML 交互课件转成视频", "output": "MP4",
      "deps": "edge-tts、Playwright、ffmpeg", "needsKey": "否", "rating": 4,
      "path": "webpage-to-video"
    },
    {
      "id": "web-video-presentation", "name": "网页式视频演示", "category": "text2video", "icon": "演",
      "desc": "文章/口播稿做成点击驱动、看起来像视频的 16:9 网页演示",
      "detail": "一次产出口播稿+outline，一次对齐后开发网页，可选合成口播音频。每一步独占整屏，进度条悬浮显示。像视频又不像 PPT，可录屏。",
      "triggers": ["网页演示", "动态PPT", "交互式解说", "文章变视频", "录屏教程"],
      "keywords": ["网页", "演示", "交互", "口播稿", "录屏", "动态PPT"],
      "bestFor": "需要现场交互讲解的微课（可录屏成片）", "output": "单文件网页（+可选音频）",
      "deps": "可选 TTS（MiniMax/OpenAI/edge-tts）", "needsKey": "可选", "rating": 3,
      "path": "web-video-presentation"
    },
    {
      "id": "ppt-to-video__skillhub", "name": "PPT转讲解视频", "category": "text2video", "icon": "P",
      "desc": "PPT/PDF 幻灯片+讲稿+参考声音转成同步字幕的解说视频",
      "detail": "从 PPT/PDF 幻灯片生成带声音克隆、TTS、同步字幕的完整讲解视频。触发词：PPT转视频、演讲视频、幻灯片生成视频。",
      "triggers": ["PPT转视频", "幻灯片生成视频", "演讲视频", "课件转视频", "PDF转视频"],
      "keywords": ["PPT", "PDF", "幻灯片", "课件", "配音", "字幕", "克隆"],
      "bestFor": "把现成 PPT 课件转成讲解视频", "output": "MP4 + 字幕",
      "deps": "语音克隆/TTS、ffmpeg", "needsKey": "视声音方案", "rating": 4,
      "path": "ppt-to-video__skillhub"
    },
    {
      "id": "dlazy-ppt-to-video__skillhub", "name": "PPT智能转视频", "category": "text2video", "icon": "幻",
      "desc": "解析 PPT 后自动做大纲、分镜、配音、构建、校验",
      "detail": "给一份 PPT/PowerPoint/Keynote，自动生成讲解、路演、课件或培训视频：解析→大纲→分镜→配音→构建→校验。",
      "triggers": ["ppt to video", "slides to video", "培训视频", "路演视频", "课件视频"],
      "keywords": ["PPT", "大纲", "分镜", "配音", "培训", "路演"],
      "bestFor": "培训/路演类 PPT 快速转视频", "output": "MP4",
      "deps": "TTS、ffmpeg", "needsKey": "视声音方案", "rating": 3,
      "path": "dlazy-ppt-to-video__skillhub"
    },
    {
      "id": "wechat-article-remotion", "name": "公众号文章转视频", "category": "text2video", "icon": "微",
      "desc": "把公众号文章转成 Studio 风格的讲解视频",
      "detail": "暖白画布+镜像透视格子+章节进度+底部黑字字幕，原文图完整保留。6 种场景类型。适合把图文教程转成视频。",
      "triggers": ["公众号转视频", "文章变视频", "微信文章视频"],
      "keywords": ["公众号", "文章", "视频", "Remotion", "图文"],
      "bestFor": "把图文教程/推文转成视频", "output": "MP4",
      "deps": "Remotion、Node、ffmpeg", "needsKey": "否", "rating": 3,
      "path": "wechat-article-remotion"
    },

    {
      "id": "math-rap-video", "name": "数学说唱讲题", "category": "creative", "icon": "唱",
      "desc": "知识点做成 AI 说唱+口诀+图形演示的爆款讲题短视频",
      "detail": "顶部常驻口诀、中间图形跟着唱词演示、底部逐句字幕。歌用 AI 音乐模型生成或给提示词去 Suno 等生成，自动分人声逐字对齐。",
      "triggers": ["数学说唱", "口诀视频", "rap讲题", "公式做成歌", "说唱讲知识点"],
      "keywords": ["说唱", "rap", "口诀", "数学", "公式", "音乐", "趣味"],
      "bestFor": "公式/定理的记忆类趣味微课", "output": "MP4 短视频",
      "deps": "AI 音乐模型(或提示词)、分人声、ffmpeg", "needsKey": "可选(音乐模型)", "rating": 5,
      "path": "math-rap-video"
    },
    {
      "id": "chat-rap-video", "name": "聊天记录说唱视频", "category": "creative", "icon": "聊",
      "desc": "场景想法做成抖音说唱风格的微信聊天爆款视频",
      "detail": "完整微信界面+上下黑边+聊天气泡+大黄字 hook+绿色光柱+文字特写+表情包。剧本→BGM→节拍分析→逐帧渲染→ffmpeg 合成。",
      "triggers": ["聊天说唱", "微信聊天视频", "rap对话", "聊天记录视频"],
      "keywords": ["聊天", "说唱", "微信", "rap", "爆款", "短视频"],
      "bestFor": "情境对话类趣味教学导入", "output": "MP4 短视频",
      "deps": "AI音乐(Mureka/Suno)、ffmpeg", "needsKey": "是（音乐模型）", "rating": 3,
      "path": "chat-rap-video"
    },
    {
      "id": "english-word-memory-video", "name": "英语单词速记视频", "category": "creative", "icon": "英",
      "desc": "输入英语单词，自动生成音形义记忆动画+真人配音速记视频",
      "detail": "纯前端单 HTML，双击即用，一键下载 MP4。音形义结合帮助记忆。",
      "triggers": ["英语单词视频", "单词速记", "背单词动画", "音形义"],
      "keywords": ["英语", "单词", "速记", "音形义", "配音", "单HTML"],
      "bestFor": "英语词汇教学微课", "output": "MP4（单文件 HTML 生成）",
      "deps": "纯前端、真人配音", "needsKey": "否", "rating": 5,
      "path": "english-word-memory-video"
    },
    {
      "id": "cartoon-science-video", "name": "卡通科学短视频", "category": "creative", "icon": "卡",
      "desc": "科学主题自动切句、逐句配卡通插画与配音，9:16 科普短视频",
      "detail": "输入科学主题或科普文案，本地 PIL+ffmpeg+edge_tts 渲染，零平台独占依赖。",
      "triggers": ["卡通科普", "科学短视频", "卡通知识视频", "科普动画"],
      "keywords": ["卡通", "科学", "科普", "插画", "短视频", "竖屏"],
      "bestFor": "面向低龄学生的科普微课", "output": "MP4 9:16",
      "deps": "PIL、ffmpeg、edge-tts", "needsKey": "否", "rating": 4,
      "path": "cartoon-science-video"
    },
    {
      "id": "katong-zhishi-video", "name": "卡通知识素材包", "category": "creative", "icon": "素",
      "desc": "主题+文案生成卡通配图、TTS、背景图，输出可在剪映编辑的素材包",
      "detail": "生成卡通配图、TTS 语音、背景图，打包成可在剪映二次编辑的素材包。",
      "triggers": ["卡通素材", "剪映素材包", "知识视频素材"],
      "keywords": ["卡通", "素材包", "剪映", "TTS", "配图"],
      "bestFor": "需要在剪映里二次编辑的老师", "output": "素材包文件夹",
      "deps": "配图生成、TTS", "needsKey": "视配图方案", "rating": 3,
      "path": "katong-zhishi-video"
    },
    {
      "id": "sanfenzhong-dushu-video", "name": "三分钟读书视频", "category": "creative", "icon": "书",
      "desc": "输入作者书名，生成《三分钟精读一本书》风格短视频",
      "detail": "文案+配音+配图+合成，整本书精读类短视频流水线。",
      "triggers": ["三分钟读书", "精读书视频", "读书短视频", "好书推荐视频"],
      "keywords": ["读书", "精读", "短视频", "文案", "配音"],
      "bestFor": "整本书阅读/阅读推广微课", "output": "MP4",
      "deps": "配音、配图、ffmpeg", "needsKey": "视方案", "rating": 3,
      "path": "sanfenzhong-dushu-video"
    },
    {
      "id": "wanwu-evolution-video", "name": "万物进化视频", "category": "creative", "icon": "进",
      "desc": "输入生物名称，自动生成进化史短视频",
      "detail": "进化阶段 LLM 生成→配音→PIL 进化卡片渲染→ffmpeg 混音成 MP4。本地 edge_tts，100% 自包含离线可渲染。",
      "triggers": ["进化视频", "生物进化", "万物进化", "物种演变视频"],
      "keywords": ["进化", "生物", "科普", "短视频", "历史", "离线"],
      "bestFor": "生物/科学演化类科普微课", "output": "MP4",
      "deps": "edge-tts、PIL、ffmpeg、LLM", "needsKey": "LLM(可配)", "rating": 4,
      "path": "wanwu-evolution-video"
    },
    {
      "id": "stickman-video-director", "name": "火柴人动画导演", "category": "creative", "icon": "柴",
      "desc": "文案/知识点做成一分钟火柴人动画视频导演方案",
      "detail": "产出分镜提案+6 条给视频生成模型的独立提示词。线稿动态图解、励志短片、知识讲解、口播短视频。",
      "triggers": ["火柴人视频", "火柴人动画", "线稿动画", "stickman", "文案做视频"],
      "keywords": ["火柴人", "线稿", "动画", "分镜", "提示词", "短视频"],
      "bestFor": "线稿风格的知识点讲解短片", "output": "分镜提案 + 视频提示词",
      "deps": "视频生成模型（提示词驱动）", "needsKey": "视视频模型", "rating": 3,
      "path": "stickman-video-director"
    },
    {
      "id": "sketch-story-remotion", "name": "手绘故事视频", "category": "creative", "icon": "绘",
      "desc": "「小白学AI」系列手绘故事视频，火柴人+Q萌 AI 角色",
      "detail": "米白纸底+火柴人+Q萌电脑 AI「小智」+手绘抖动线框/箭头/红圈动画。适合制作该系列新一集或改已有集。",
      "triggers": ["小白学AI", "手绘故事视频", "火柴人视频", "sketch story"],
      "keywords": ["手绘", "故事", "火柴人", "Remotion", "系列", "AI科普"],
      "bestFor": "系列化手绘科普故事微课", "output": "MP4",
      "deps": "Remotion、Node、ffmpeg", "needsKey": "否", "rating": 3,
      "path": "sketch-story-remotion"
    },
    {
      "id": "silhouette-story-video", "name": "几何剪影故事视频", "category": "creative", "icon": "影",
      "desc": "故事主题自动产出配音+9 段几何剪影动画的完整 MP4",
      "detail": "纯本地零 API Key。PIL 逐帧绘制实心剪影（兔/龟/愚公等）做跑步/挖山等动画，edge-tts 配音，交叉淡入转场+两行字幕。内置龟兔赛跑、愚公移山。",
      "triggers": ["剪影动画", "故事视频", "寓言动画", "几何剪影", "剪纸动画"],
      "keywords": ["剪影", "故事", "寓言", "动画", "离线", "字幕"],
      "bestFor": "语文/德育寓言故事微课", "output": "MP4",
      "deps": "PIL、edge-tts、ffmpeg", "needsKey": "否", "rating": 4,
      "path": "silhouette-story-video"
    },

    {
      "id": "ruic-motion-reel", "name": "代码动效样片", "category": "motion", "icon": "动",
      "desc": "15 秒动态图形成片，画面与音乐全部代码产出",
      "detail": "自研渲染引擎（矢量/文字/bloom/色差/颗粒）、3D 点云、riso 四色分色、代码合成配乐。16 张视觉风格牌随机抽。",
      "triggers": ["动效视频", "动态图形", "motion graphics", "作品集样片", "15秒视频"],
      "keywords": ["动效", "动态图形", "代码", "视觉", "样片", "motion"],
      "bestFor": "创意片头、概念动效微课", "output": "MP4 1920×1080/30fps",
      "deps": "Node、渲染引擎、ffmpeg", "needsKey": "否", "rating": 3,
      "path": "ruic-motion-reel"
    },
    {
      "id": "huashu-art-motion", "name": "艺术视频动画", "category": "motion", "icon": "画",
      "desc": "36 种实做风格+16 种研究配方的艺术动画复刻",
      "detail": "拆解复刻动画；9 种解说动画语法，8 种可按口播参数渲片段；含口播整片参考代码及框景检查。可选已有录音、系统声音与语音复刻。",
      "triggers": ["艺术动画", "动画复刻", "口播动画", "风格配方"],
      "keywords": ["艺术", "动画", "风格", "复刻", "口播", "配方"],
      "bestFor": "高美感艺术风格的讲解动画", "output": "MP4",
      "deps": "AI 生帧、可选语音复刻、ffmpeg", "needsKey": "可选", "rating": 3,
      "path": "huashu-art-motion"
    },
    {
      "id": "map-motion", "name": "地图动效视频", "category": "motion", "icon": "图",
      "desc": "真实地图做旅行/解说视频的 14 种地图镜头动画",
      "detail": "高德地图真实路线/边界/瓦片。地球俯冲定位、路线描线、飞线航线、行政区高亮、多站旅程、3D 地形等。竖屏/横屏 MP4 和 GIF。",
      "triggers": ["地图动画", "轨迹视频", "旅行路线动画", "飞线", "定位动画", "3D地形"],
      "keywords": ["地图", "轨迹", "旅行", "路线", "定位", "地理", "飞线"],
      "bestFor": "地理教学、研学路线微课", "output": "MP4 横/竖 + GIF",
      "deps": "高德地图、ffmpeg", "needsKey": "地图Key(可能)", "rating": 4,
      "path": "map-motion"
    },
    {
      "id": "note-playback-animation", "name": "谱面音符动画", "category": "motion", "icon": "谱",
      "desc": "MusicXML/MIDI 映射真实谱面符头的 3D 跳动音符动画",
      "detail": "双声部 3D 跳动音符，11 种粒子光效、5 种跳跃动力学、运镜缓动，音视频实时同步录制导出 MP4/WebM。纯本地浏览器。",
      "triggers": ["音符动画", "谱面动画", "钢琴可视化", "MIDI可视化", "音乐动画"],
      "keywords": ["音符", "谱面", "音乐", "MIDI", "可视化", "动画"],
      "bestFor": "音乐教学的乐谱可视化微课", "output": "MP4/WebM",
      "deps": "浏览器、MusicXML/MIDI", "needsKey": "否", "rating": 3,
      "path": "note-playback-animation"
    },
    {
      "id": "srt-whiteboard-animation", "name": "SRT白板手绘动画", "category": "motion", "icon": "板",
      "desc": "把 SRT 字幕做成暖米黄纸张底的白板手绘流式笔迹动画",
      "detail": "读字幕→配图策略→统一风格线稿→语义分区→预览调整→渲染 MP4。连续笔迹（骨架/网格 ink→color）。",
      "triggers": ["字幕白板动画", "SRT手绘", "白板手绘视频", "流式笔迹"],
      "keywords": ["字幕", "白板", "手绘", "SRT", "笔迹", "动画"],
      "bestFor": "已有字幕快速转成白板讲解动画", "output": "MP4",
      "deps": "渲染引擎、ffmpeg", "needsKey": "否", "rating": 4,
      "path": "srt-whiteboard-animation"
    },
    {
      "id": "paper-cutout-remotion", "name": "纸片分层动画", "category": "motion", "icon": "纸",
      "desc": "背景/主角/配角/前景分层 PNG 做出纵深的纸片风动画",
      "detail": "各层按不同节奏运动，靠遮挡制造纵深。素材用 nano-banana-pro 生成+绿幕抠图，MiniMax 配音。",
      "triggers": ["纸片风视频", "剪纸动画", "拼贴动画", "paper cutout", "collage video"],
      "keywords": ["纸片", "剪纸", "拼贴", "分层", "Remotion", "纵深"],
      "bestFor": "绘本风格的知识点故事微课", "output": "MP4",
      "deps": "图像生成、MiniMax、Remotion、ffmpeg", "needsKey": "是（图像/配音）", "rating": 3,
      "path": "paper-cutout-remotion"
    },
    {
      "id": "falling-leaves", "name": "落叶粒子特效", "category": "motion", "icon": "叶",
      "desc": "真实翻滚的落叶/花瓣/雪花 2D 与 3D 粒子特效",
      "detail": "每片叶子绕自身轴翻滚呈现正面/侧面，密度-数量数学，景深层次，色调映射合成。可Canvas 或实例化 3D。",
      "triggers": ["落叶动画", "花瓣飘落", "雪花特效", "粒子效果"],
      "keywords": ["落叶", "花瓣", "雪花", "粒子", "特效", "canvas"],
      "bestFor": "课件/视频里的氛围装饰特效", "output": "Canvas/3D 代码片段",
      "deps": "Canvas 或 WebGL", "needsKey": "否", "rating": 2,
      "path": "falling-leaves"
    },
    {
      "id": "photo-story", "name": "照片故事风格化", "category": "motion", "icon": "照",
      "desc": "照片转成东方故事/泛黄信纸/铅笔画/水彩等质感画面",
      "detail": "保留原图结构，改变呈现材质，做成有故事感的视觉风格。",
      "triggers": ["照片转风格", "照片故事", "手绘质感", "水彩照片"],
      "keywords": ["照片", "风格化", "水彩", "铅笔画", "质感", "故事"],
      "bestFor": "历史/语文课的史料图片风格化", "output": "风格化图片",
      "deps": "图像处理", "needsKey": "视方案", "rating": 2,
      "path": "photo-story"
    },
    {
      "id": "text-physics-curtain", "name": "文字物理帘", "category": "motion", "icon": "帘",
      "desc": "文字+锚点物体做 Verlet 积分的物理帘效果",
      "detail": "任何文字内容做成像帘子一样垂落的物理动画，教学动态文字展示、课件装饰。",
      "triggers": ["文字帘", "物理帘", "珠帘效果", "文字物理"],
      "keywords": ["文字", "物理", "Verlet", "帘", "动画", "课件装饰"],
      "bestFor": "课件里吸睛的文字动态展示", "output": "动画片段",
      "deps": "Verlet 物理引擎", "needsKey": "否", "rating": 2,
      "path": "text-physics-curtain"
    },

    {
      "id": "smy-seedance-storyboard", "name": "上美影国风短剧", "category": "cinema", "icon": "国",
      "desc": "故事/神话转成上美影风格 Seedance 分镜脚本与资产生成提示词",
      "detail": "上海美术电影制片厂复古手绘动画风格（水墨线条、矿物颜料平涂、胶片颗粒）。完整剧本+剧集分解+色盘+角色/场景资产提示词+Seedance 2.0 分镜。",
      "triggers": ["国风动画", "上美影", "神话视频", "民间传说视频", "动画短剧"],
      "keywords": ["国风", "上美影", "神话", "水墨", "短剧", "Seedance", "分镜"],
      "bestFor": "语文/历史神话传说的国风影片微课", "output": "剧本+分镜+提示词",
      "deps": "Seedance 2.0、图像模型", "needsKey": "是（视频/图像模型）", "rating": 4,
      "path": "smy-seedance-storyboard"
    },
    {
      "id": "poem-to-seedance-film", "name": "古诗词AI短片", "category": "cinema", "icon": "诗",
      "desc": "古诗名/诗句全自动生成 30 秒东方写实浪漫短片并配音烧字幕",
      "detail": "原文校订→意象解析→六镜分镜→主角三视图+场景定样图→4 张参考资产→Seedance 30 秒提示词→生成视频→配音烧字幕配乐合成 MP4。全程自动。",
      "triggers": ["古诗视频", "诗词短片", "把诗拍成视频", "诗配画", "古风短片"],
      "keywords": ["古诗", "诗词", "国风", "Seedance", "短片", "配音", "浪漫"],
      "bestFor": "语文古诗词意境可视化微课", "output": "MP4 30秒",
      "deps": "Seedance 2.5、图像模型、配音、ffmpeg", "needsKey": "是（视频/图像模型）", "rating": 5,
      "path": "poem-to-seedance-film"
    },
    {
      "id": "textbook-to-movie", "name": "课文转电影分镜", "category": "cinema", "icon": "影",
      "desc": "课本/课文文本一键转成电影级视频分镜提示词",
      "detail": "零成本全自动「课文→电影级分镜提示词」，配合 Seedance/Kling 批量出片拼接。4 种视觉风格（韦斯安德森/吉卜力/写实/卡通），自定义人物设定。",
      "triggers": ["课文拍成电影", "课文分镜", "课本剧视频", "课文视频提示词"],
      "keywords": ["课文", "分镜", "电影", "Seedance", "提示词", "剧本", "语文"],
      "bestFor": "语文课文情景再现、课本剧微课", "output": "prompts.md + storyboard.json",
      "deps": "视频生成模型（提示词驱动）", "needsKey": "是（视频模型）", "rating": 4,
      "path": "textbook-to-movie"
    },
    {
      "id": "music-dance-video", "name": "音乐舞蹈视频", "category": "cinema", "icon": "舞",
      "desc": "音乐+角色风格图生成节奏感知的舞蹈视频",
      "detail": "付费生成前需确认 provider/模型、查询歌曲主题、确认画幅、批准统一视觉风格圣经。",
      "triggers": ["舞蹈视频", "编舞视频", "音乐角色视频", "卡点舞蹈"],
      "keywords": ["舞蹈", "音乐", "角色", "节奏", "视频生成"],
      "bestFor": "音乐/形体教学的律动演示", "output": "MP4",
      "deps": "付费视频生成模型", "needsKey": "是（付费模型）", "rating": 2,
      "path": "music-dance-video"
    },

    {
      "id": "music-to-video", "name": "音乐卡点视频", "category": "music", "icon": "卡",
      "desc": "音乐驱动节奏的歌词/幻灯片/卡点宣传视频",
      "detail": "音乐驱动全部节奏，用户图片/视频按同一节拍网格剪辑，零素材也能出完整视频。librosa 节拍分析→分镜→逐帧渲染→装配。",
      "triggers": ["卡点视频", "音乐视频", "歌词视频", "beat视频", "音乐剪辑"],
      "keywords": ["音乐", "卡点", "节拍", "歌词", "幻灯片", "宣传"],
      "bestFor": "课堂暖场、节奏感强的知识点回顾", "output": "MP4",
      "deps": "librosa、hyperframes CLI、ffmpeg", "needsKey": "否", "rating": 3,
      "path": "music-to-video"
    },
    {
      "id": "music-prompt-generator", "name": "BGM提示词生成", "category": "music", "icon": "曲",
      "desc": "把模糊配乐要求转成 AI 音乐工具可用的标准 BGM 提示词",
      "detail": "「来点悬疑感」「旅行vlog的BGM」「口播背景别抢人声」等形容词翻译成 MiniMax/海绵/Suno 等可粘贴的音乐参数。",
      "triggers": ["配乐提示词", "BGM提示词", "背景音乐提示词", "音乐prompt"],
      "keywords": ["配乐", "BGM", "提示词", "音乐", "背景音乐"],
      "bestFor": "为微课配乐生成提示词（配合其他技能）", "output": "BGM 提示词文本",
      "deps": "无", "needsKey": "否", "rating": 3,
      "path": "music-prompt-generator"
    },
    {
      "id": "go-music-skill", "name": "音乐搜索下载", "category": "music", "icon": "乐",
      "desc": "搜索歌曲、下载音频、获取歌词、解析音乐分享链接",
      "detail": "通过本地 go-music-api 后端搜歌、下音频、取歌词、切音源、配平台 Cookie。",
      "triggers": ["搜歌", "下载音乐", "获取歌词", "音乐分享链接"],
      "keywords": ["音乐", "搜歌", "下载", "歌词", "BGM素材"],
      "bestFor": "为微课寻找 BGM 素材", "output": "音频 + 歌词",
      "deps": "go-music-api 后端", "needsKey": "视平台", "rating": 2,
      "path": "go-music-skill"
    },
    {
      "id": "tme-music-academy", "name": "音乐成长助手", "category": "music", "icon": "音",
      "desc": "作曲/编曲/混音/声乐等音乐学习规划与答疑",
      "detail": "音乐学习路径规划、课程推荐、疑问解答，覆盖作曲作词编曲混音声乐音乐运营 AI 音乐。",
      "triggers": ["学音乐", "作曲学习", "编曲规划", "音乐课程"],
      "keywords": ["音乐", "学习", "作曲", "编曲", "声乐"],
      "bestFor": "音乐知识学习（非直接出视频）", "output": "学习计划/答疑",
      "deps": "无", "needsKey": "否", "rating": 1,
      "path": "tme-music-academy"
    },

    {
      "id": "video-mix-edit", "name": "通用视频混剪", "category": "edit", "icon": "剪",
      "desc": "用大白话把多段素材剪成一条：掐头去尾、转场、字幕、BGM、结尾",
      "detail": "给 2+ 视频或整个素材文件夹，说清空求即可混剪。横竖比例统一、xfade 转场、自动中文子字幕（faster-whisper/Vosk 降级）、可选 BGM。全程本地 ffmpeg+ASR。支持批量出竖屏+横屏+封面三件套。",
      "triggers": ["混剪", "合并视频", "按我的要求剪", "文件夹批量混剪", "掐头去尾", "去气口"],
      "keywords": ["剪辑", "混剪", "合并", "转场", "字幕", "BGM", "ffmpeg", "批量", "去口误"],
      "bestFor": "全自动剪辑的核心引擎——成片精修", "output": "MP4 横/竖 + 封面",
      "deps": "ffmpeg、faster-whisper(可降 Vosk)、本地 ASR", "needsKey": "否（全本地）", "rating": 5,
      "path": "video-mix-edit"
    },
    {
      "id": "baocut", "name": "BaoCut 转录剪辑", "category": "edit", "icon": "转",
      "desc": "转录媒体、润色文案、做字幕、口播视频可逆剪辑与导出",
      "detail": "CLI 驱动：转录本地媒体或视频 URL、Agent 润色 transcript、创建/翻译字幕、说话人分离审校、单条口播源做可逆的停顿/口癖/重录剪辑与 B-roll、导出 SRT/VTT/ASS/MD/视频。",
      "triggers": ["转录视频", "字幕翻译", "去口癖", "口播剪辑", "说话人分离"],
      "keywords": ["转录", "字幕", "翻译", "口播", "剪辑", "B-roll", "说话人"],
      "bestFor": "口播微课的精细化剪辑与字幕", "output": "字幕文件 + 视频",
      "deps": "BaoCut CLI、Agent workers", "needsKey": "视转录方案", "rating": 4,
      "path": "baocut"
    },
    {
      "id": "baocut-translation-win", "name": "字幕转录翻译编辑(Win)", "category": "edit", "icon": "字",
      "desc": "Windows 原生字幕转录+Qwen 润色翻译+tkinter 二次编辑",
      "detail": "音视频转带时间戳字幕，Qwen 纠错去口癖加标点+翻译，tkinter GUI 友好编辑时间轴/说话人/原文/译文，导出 SRT/ASS/CSV 或烧录回视频。",
      "triggers": ["转录视频", "加字幕", "改字幕", "翻译字幕", "字幕二次编辑", "导出SRT"],
      "keywords": ["字幕", "转录", "翻译", "Qwen", "GUI", "烧录", "SRT"],
      "bestFor": "需要人工校对字幕的老师（中文友好）", "output": "SRT/ASS/CSV + 烧录视频",
      "deps": "Qwen(DASHSCOPE_API_KEY)、tkinter、ffmpeg", "needsKey": "是(Qwen)", "rating": 4,
      "path": "baocut-translation-win"
    },
    {
      "id": "audio-to-subtitles", "name": "音频转字幕", "category": "edit", "icon": "幕",
      "desc": "音视频转 SRT/VTT/JSON 字幕，另支持 MiniMax TTS",
      "detail": "上传本地文件到 Cloudflare R2 调火山 AI MediaKit ASR 字幕 API，也支持 MiniMax TTS 生成音频并出字幕。批量处理、语言选择、说话人标签。",
      "triggers": ["音频转字幕", "生成SRT", "批量转录", "ASR字幕"],
      "keywords": ["字幕", "ASR", "SRT", "VTT", "转录", "TTS"],
      "bestFor": "快速给微课批量生成字幕", "output": "SRT/VTT/JSON",
      "deps": "Cloudflare R2、火山 ASR、MiniMax", "needsKey": "是（云服务）", "rating": 3,
      "path": "audio-to-subtitles"
    },
    {
      "id": "speech-recognition", "name": "通用语音识别", "category": "edit", "icon": "识",
      "desc": "多格式音频用 SenseVoice API 语音转文字",
      "detail": "支持 ogg/mp3/wav/m4a，硅基流动 SenseVoice API。语音消息、音频文件转录。",
      "triggers": ["语音转文字", "转录音频", "语音识别", "音频转文字"],
      "keywords": ["语音识别", "转录", "ASR", "SenseVoice", "文字"],
      "bestFor": "把录音讲稿转成文字", "output": "文字",
      "deps": "硅基流动 SenseVoice API", "needsKey": "是(SenseVoice)", "rating": 2,
      "path": "speech-recognition"
    },

    {
      "id": "SHY-downloader", "name": "全能视频下载", "category": "asset", "icon": "下",
      "desc": "15+ 平台视频下载：抖音/小红书/视频号/YouTube/B站等",
      "detail": "微信视频号零配置在线解析、抖音 H5 去水印、小红书解析、断点续传、字幕封面、下载报告、ASR 转录、批量追踪博主。",
      "triggers": ["下载视频", "去水印", "抖音下载", "视频号下载", "B站下载"],
      "keywords": ["下载", "去水印", "抖音", "小红书", "视频号", "B站", "YouTube", "素材"],
      "bestFor": "下载微课素材（注意版权）", "output": "视频文件 + 报告",
      "deps": "yt-dlp、托管 venv Python", "needsKey": "视平台", "rating": 4,
      "path": "SHY-downloader"
    },
    {
      "id": "yt-dlp", "name": "yt-dlp 下载", "category": "asset", "icon": "y",
      "desc": "yt-dlp 下载数千站点视频/音频",
      "detail": "B站、YouTube、抖音、快手、Twitter/X、微博等。提取音频、选清晰度。抖音/快手通常带平台水印。",
      "triggers": ["下载视频", "yt-dlp", "提取音频", "下载B站", "下载YouTube"],
      "keywords": ["下载", "yt-dlp", "B站", "YouTube", "音频提取"],
      "bestFor": "下载网络视频素材", "output": "视频/音频文件",
      "deps": "yt-dlp", "needsKey": "否", "rating": 3,
      "path": "yt-dlp"
    },
    {
      "id": "douyin-video-fetch", "name": "抖音视频采集", "category": "asset", "icon": "抖",
      "desc": "按互动数据筛选高价值抖音视频、下载、提取口播文案",
      "detail": "互动数据筛选爆款、下载视频、API字幕优先+SenseVoice ASR 兜底提取口播文案。",
      "triggers": ["采集抖音", "提取抖音文案", "筛选爆款", "抖音口播提取"],
      "keywords": ["抖音", "采集", "文案提取", "爆款", "口播", "ASR"],
      "bestFor": "收集优质案例与文案灵感", "output": "视频 + 文案",
      "deps": "抖音 API、SenseVoice", "needsKey": "可能需要Cookie", "rating": 3,
      "path": "douyin-video-fetch"
    },
    {
      "id": "wechat-video-downloader", "name": "视频号下载", "category": "asset", "icon": "号",
      "desc": "在线解析站点下载微信视频号无水印视频",
      "detail": "通过 vtool.pro 等解析站点下载微信视频号无水印视频到本地。",
      "triggers": ["视频号下载", "下载视频号", "视频号无水印"],
      "keywords": ["视频号", "下载", "无水印", "微信"],
      "bestFor": "下载视频号素材", "output": "视频文件",
      "deps": "在线解析站点", "needsKey": "否", "rating": 2,
      "path": "wechat-video-downloader"
    },
    {
      "id": "z-video-downloader", "name": "批量视频下载", "category": "asset", "icon": "批",
      "desc": "单/多/清单/媒体清单输入的视频下载，断点续传+字幕+封面",
      "detail": "支持视频链接、清单、04-media-inventory.md。覆盖 yt-dlp 平台及直链，断点续传、重试、字幕、封面、下载历史，保存到 Video/Downloads 并生成报告。",
      "triggers": ["批量下载视频", "下载清单视频", "保存视频到本地", "下载字幕"],
      "keywords": ["下载", "批量", "断点续传", "字幕", "封面", "报告"],
      "bestFor": "按清单批量下载教学素材", "output": "视频文件 + 报告",
      "deps": "yt-dlp", "needsKey": "视平台", "rating": 3,
      "path": "z-video-downloader"
    }
  ]
};
