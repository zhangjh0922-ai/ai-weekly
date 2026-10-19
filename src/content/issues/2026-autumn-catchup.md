---
issue: 5
title: "补更特刊：六周里漏掉的模型与产品更新"
date: 2026-10-19
range: "2026-09-08 ~ 2026-10-19"
summary: "回查停更期间的官方公告与产品日志，补齐模型、文档工具、语音、编程和浏览器操作更新，并注明预览、分批开放与待核实信息。"
highlights:
  - "模型之外，也补查文档、浏览器操作和长期智能体"
  - "ChatGPT Word、Claude Docs 与 Gemini Notebook 的日常用途"
  - "按实际发布与开放日期记录，不把计划当成上线"
tags:
  - "补更特刊"
  - "模型发布"
  - "产品更新"
  - "智能体"
editors:
  - Emergence AI Lab
draft: false
---

**这是一篇补更特刊，覆盖 2026 年 9 月 8 日至 10 月 19 日，不代表这些更新都发生在本周。** 上一轮只补查了部分厂商的模型，仍漏掉不少产品功能。此次扩大到国内外模型厂商、办公工具、编程助手和多媒体产品，逐项回到官方公告、模型卡或更新日志核对。

**核查说明**：以下是来源核查，未进行统一实测。能力介绍来自厂商说明；用途分析属于编辑判断。预览、分批开放、特定套餐和未来计划均单独标明，不能仅凭产品名称推断自己的账号已经可用。

## 先看最影响日常使用的变化

- **写文档、做展示**：ChatGPT 进入 Word；Claude 把 Docs、Slides、Design 放进对话；Notion 增加可共享的技能库与跨工具连接。
- **学习与理解**：ChatGPT 增加闪卡和交互式回答；Gemini Notebook 公布语音交流、测验和短视频学习工具。
- **让 AI 持续做事**：dots、Cursor Projects、Perplexity Automations 等开始把一次性对话延伸为持续任务，但开放地区、年龄、套餐和运行环境各不相同。
- **操作浏览器和电脑**：模型能力、浏览器工具与实际产品入口分别在更新。支持网页搜索，不等于能登录网站、填写表单并检查执行结果。

## 这次补入的模型

本轮新增 **28 条模型记录**，模型时间线从 116 条增至 **144 条**。同系列明确区分的型号分别收录，量化格式、推理服务档位和第三方平台接入不重复算新模型。下表按厂商归组，日期对应的事件类型写在说明里。

| 厂商 | 此次补录 | 日期与关键区别 |
| --- | --- | --- |
| OpenAI | [GPT‑Live‑1.1／Quip](https://help.openai.com/en/articles/6825453-chatgpt-release-notes#october-15-2026) | 10 月 15 日开始在 ChatGPT Voice 分批上线；Quip 是小型版本，不能据此推断同名 API 同日开放。 |
| Google | [EmbeddingGemma 2](https://blog.google/innovation-and-ai/technology/developers-tools/embeddinggemma-2/) | 10 月 6 日开放的多模态嵌入模型，用于本地检索文字、图像、音视频；不直接生成聊天回答或图片。 |
| xAI | [Grok 4.7](https://x.ai/news/grok-4-7)、[Voice 3.0](https://x.ai/news/grok-voice-3)、[Voice Transcribe 2.0](https://x.ai/news/grok-voice-transcribe-2) | 分别侧重通用任务、实时语音和转写。4.7 为 9 月 21 日、Voice 3.0 为 10 月 14 日；Transcribe 的控制台 9 月 11 日已确认可用，9 月 18 日才发正式公告。 |
| Meta | [Muse Wonder／Wonder Full](https://research.meta.ai/blog/muse-wonder)、[Muse Spark Open](https://research.meta.ai/blog/muse-spark-open) | Wonder 两款 10 月 12 日开放，Full 仅明确 Muse Code 订阅入口；Spark Open 于 10 月 15 日开放权重，许可含额外商业条款。 |
| NVIDIA | [Nemotron 3.5 Super VL／Bolt 74B-A9B 24GB](https://blogs.nvidia.com/blog/nemotron-3-5-super-vl/) | 10 月 15 日开放，分别面向多模态智能体和本地运行。同期提到的 Bolt E4B 4GB 仍是 10 月 23 日计划，未计入。 |
| Amazon | [Nova 2.5 Sonic](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-nova-2.5-Sonic/) | 10 月 5 日正式可用，面向实时语音与工具调用；10 月 13 日只是官方周报回顾日。 |
| Qwen／Kimi | [Qwen3.8-Omni-Flash](https://qwen.ai/blog?id=qwen3.8-omni-flash)、[Kimi K2.8 Preview](https://www.kimi.com/code/docs/kimi-code/whats-new.html) | Omni 于 9 月 18 日正式上线；K2.8 Preview 于 9 月 11 日全量进入 Kimi Code，不能写成开放权重。 |
| 小米 | [MiMo‑V2.6 Pro／Flash](https://mimo.xiaomi.com/mimo-v2-6) | 9 月 22 日发布 API 与开放权重，面向多模态、编程和文档任务；9 月 25 日的工具调用修复属于原型号更新，Pro-UltraSpeed 是服务档位。 |
| 阶跃星辰 | [Step 5 Preview](https://www.stepfun.com/news/step-5-preview)、[StepAudio 3 五款](https://www.stepfun.com/news/stepaudio-3) | Step 5 于 9 月 20 日开放预览，核查时权重已可获取；StepAudio 3 的 Realtime、ASR、TTS、Gen、Music 于 9 月 15 日系列公告上线，分别处理对话、转写、合成、音效与音乐。 |
| 腾讯 | [AuK／AuK-Flash](https://huggingface.co/tencent/AuK)、[Hy Image3.5 preview](https://hunyuan.tencent.com/blog/hy-image35-preview)、[Hy-Memory-30B-A3B](https://memory.hunyuan.tencent.com/) | AuK 两款 9 月 9 日开放代码与权重；图像预览版 9 月 22 日正式公告，元宝曾提前灰度；记忆模型 10 月 16 日发布，是记忆写入组件，需要搭配检索和回答模型。 |
| 快手可灵 | [Kling 4.0／Flash](https://kling.ai/release-note/release-notes/Kling_4) | Flash 自 9 月 28 日向 Ultra 年费用户早期开放；4.0 的 9 月 30 日公告确认早期访问，10 月 15 日正式向所有用户开放。开放不等于所有功能免费。 |

**生图与视频仍需看具体版本。** Hy Image3.5 preview 支持最多五张参考图和连续编辑；Kling 4.0 与 Flash 的时长、分辨率和权限不同。可灵当前发布页中的 10-bit HDR、延长至两分钟仍写着“Coming soon”，本次没有把它们算成已开放功能。[混元公告](https://hunyuan.tencent.com/blog/hy-image35-preview)、[可灵发布说明](https://kling.ai/release-note/release-notes/Kling_4)

## 写作、文档与学习工具

### ChatGPT：Word、协作文稿与交互式回答

**9 月 17 日，ChatGPT for Word 上线**：在 Word 侧栏中根据笔记起草、概括文档、修改选段和调整标题格式。包括 Free 在内的所有套餐可使用，仍受各自用量限制。它与“让聊天窗口生成一份 Word 文件”是不同的入口。[官方记录](https://help.openai.com/en/articles/6825453-chatgpt-release-notes#september-17-2026)

**9 月 29 日，Space 和 Pages 增加协作入口**：把对话、文件和文稿放在一起，继续编辑并邀请他人协作，面向符合条件的 Pro、Business、Enterprise 用户，组织权限仍适用。**10 月 16 日的 Slides** 则进一步支持演示文稿编辑、协作与导出，详见[第 4 期](/issues/2026-w42)。[产品日志](https://help.openai.com/en/articles/6825453-chatgpt-release-notes#september-29-2026)

学习方面，**9 月 22 日**新增可翻面、重练的闪卡；**10 月 6 日**付费账号增加音频文件上传，可转写、总结并围绕录音提问；**10 月 7 日**开始推出 GPT‑6 与 Intelligent UI，把比较、图解和小工具直接放进回答。付费 Chat 使用 Sol，Free／Go 使用 Luna；Pro 推理选项仍使用 Astra，并不支持这套交互界面。音频转写与 AI 生成的学习内容仍需要核对。[闪卡记录](https://help.openai.com/en/articles/6825453-chatgpt-release-notes#september-22-2026)、[10 月产品记录](https://help.openai.com/en/articles/6825453-chatgpt-release-notes#october-7-2026)

### Claude：从对话直接进入 Docs、Slides 和 Design

**9 月 16 日**，Claude 宣布将聊天与 Cowork 合并为统一体验，向 Pro／Max 的网页、桌面和移动端逐步开放。同时，Docs、Slides 和 Design 可以在对话中创建并继续编辑，支持包括 Free 在内的所有套餐；Enterprise 仍是默认关闭的 beta，需要管理员启用。[官方产品日志](https://support.claude.com/en/articles/12138966-release-notes)

值得比较的是：给同一份资料后，能否持续修改文档、保持引用和版式，并让其他人接着编辑。本站尚未验证这些产品在同一任务中的完成质量。

### Gemini Notebook、Windows 版与 Notion

| 公告日期 | 更新 | 开放条件与值得注意的地方 |
| --- | --- | --- |
| 9 月 10 日 | [Gemini Windows App](https://blog.google/innovation-and-ai/products/gemini-app/gemini-app-now-on-windows/) | 支持 Windows 10／11，可用快捷键唤出；Spark 等功能仍遵循各自套餐与开放条件，安装桌面版不等于所有能力免费。 |
| 9 月 15 日 | [Gemini Notebook 学习工具](https://blog.google/innovation-and-ai/products/gemini-notebook/new-study-tools-september-2026/) | 公布围绕资料实时语音交流、录音、学习总览、更多测验题型和短视频。原文多处写“即将”“下周”，不能把公告日写成全部功能正式开放日；学生优惠针对符合资格的大学生。 |
| 9 月 15 日 | [Notion 3.7](https://www.notion.com/releases/2026-09-15) | 共享技能库，可导出给其他智能体使用；Custom Agents 可调用子智能体，部分连接与 SDK 属于 beta。 |
| 10 月 13 日 | [Notion 3.8](https://www.notion.com/releases/2026-10-13) | 扩展 MCP 连接、技能同步和修改记录。Business／Enterprise 可连接 ChatGPT Plus／Pro 计划承担 GPT 用量，仍消耗原计划额度，并不是新增无限额度。 |

## 浏览器操作与长期任务

### 同样叫“智能体”，运行方式并不一样

| 日期 | 产品更新 | 实际变化与限制 |
| --- | --- | --- |
| 9 月 10 日；9 月 29 日 | [OpenAI Agents API](https://developers.openai.com/api/docs/guides/agents-api/overview) | 先推出公测的持久会话和执行环境，随后加入[托管浏览器操作](https://developers.openai.com/api/docs/guides/agents-api/tools/computer-use)。网站访问、登录与敏感操作仍需应用处理授权。 |
| 9 月 10 日 | [Cursor Projects](https://cursor.com/changelog/projects) | beta 分批开放；协调智能体在云端分派任务、保留项目上下文，并可按日程或外部事件持续工作。 |
| 9 月 17 日 | [Google Labs CC 家庭代理](https://blog.google/innovation-and-ai/models-and-research/google-labs/cc-expanding-to-groups/) | 最多六名成员共享选定的信息、日历和待办。仍是实验预览，仅美国 18 岁以上个人账号，新用户需候补。 |
| 9 月 29 日 | [ChatGPT dots](https://help.openai.com/en/articles/6825453-chatgpt-release-notes#meet-your-dot) | 拥有云端电脑的持续任务代理，逐步提供给符合条件的 Pro／Business Premium 用户，要求 18 岁以上和受支持市场；Pro 首发不含欧洲经济区、瑞士与英国，Enterprise 默认关闭 beta。 |
| 10 月 5 日 | [Perplexity Automations 与浏览器扩展](https://www.perplexity.ai/changelog/automations-inline-visualizations-and-gpt-6-1-sol) | Computer 可按时间或连接应用的事件运行；Mac 26.38.0 及以后版本可通过扩展操作 Chromium 浏览器。具体连接与用量仍受账号权限限制。 |
| 10 月 7 日；10 月 9 日 | [Claude 浏览器／电脑工具与动态工作流](https://platform.claude.com/docs/en/release-notes/overview) | SDK toolsets beta 帮开发者处理工具循环与审批回调，但浏览器或桌面驱动仍需自行提供；Managed Agents 动态工作流 beta 则让多个子智能体分阶段处理大型任务。 |

**本地与云端也要分开**。Cursor 在 **10 月 6 日**加入 iOS 远程查看和继续本地任务，本机仍须开机联网。[官方说明](https://cursor.com/changelog/remote-control-local-agents) Perplexity 在 **9 月 21 日**介绍 Mac 混合计算、**10 月 5 日**扩展 AMD 本地运行：前者需要 Apple silicon、macOS 15 及以上和至少 24GB 统一内存；后者针对特定 Ryzen AI Max 设备。它们不是所有电脑都能使用的通用离线功能。[9 月日志](https://www.perplexity.ai/changelog/effort-mode-gpt-6-astra-and-skills-marketplace)、[10 月日志](https://www.perplexity.ai/changelog/automations-inline-visualizations-and-gpt-6-1-sol)

## 语音、图像与创作

**语音更新不能只看“支持音频”**：实时对话、录音转写、朗读文字和用文字设计声音，是不同任务。OpenAI 的 GPT‑Live‑1 在 **9 月 10 日**正式开放 API，GPT‑Live‑1.1／Quip 在 **10 月 15 日**开始进入 ChatGPT Voice；API 在 **10 月 16 日**加入按文字描述创建声音的入口。它们分别是服务开放、新版本分批上线和声音设计功能，不能合并成一次模型首发。[API 日志](https://developers.openai.com/api/docs/changelog)、[ChatGPT Voice 更新](https://help.openai.com/en/articles/6825453-chatgpt-release-notes#october-15-2026)

Google 的 Gemini 3.8 Live 与两款 TTS 已在上一轮补录。TTS 配套增加声音设计、经同意验证的声音复现和声音库；**10 月 7 日**发布的 [Playground](https://blog.google/innovation-and-ai/technology/ai/playground-experimental-gaming-platform/) 则是用提示词制作、修改和分享游戏的实验产品，首发仅美国 18 岁以上用户，创建额度按套餐分批开放。Unity Spark 集成仍在测试，不能写成已经可用。

**创作工具也有独立更新**：Adobe 在 **9 月 8 日**公布 Premiere 时间线内的生成式媒体与 After Effects AI Assistant，部分功能仍为公测；**9 月 9 日**公布 Acrobat 的交互报告、摘要幻灯片和音频摘要。Runway 在 **9 月 8 日**推出 Premiere／After Effects 插件、**9 月 23 日**加入 DaVinci Resolve，插件下载与实际生成消耗的套餐额度要分开计算。[Adobe 视频工具公告](https://blog.adobe.com/en/publish/2026/09/08/generate-create-directly-in-your-timeline-with-new-ai-powered-innovations-in-premiere-after-effects)、[Acrobat 公告](https://blog.adobe.com/en/publish/2026/09/09/show-up-sharper-faster-with-new-acrobat-ai)、[Runway 日志](https://runway.com/changelog)

## 国内工具：编程桌面端、视频笔记与实时音视频

**Kimi Code 不能只查模型研究博客。** 产品日志记录了 **9 月 11 日 K2.8 Preview** 全量上线，沿用 `kimi-for-coding` 名称；**9 月 17 日 Desktop 1.0** 发布，加入项目、终端、Git、内置浏览器和改动查看。**10 月 14 日 Desktop 1.1** 又加入 Linux 和远程控制，任务仍在本机运行。9 月 23 日的 1.0.3 还包含重要安全修复，使用早期桌面版的用户应检查版本。[模型与产品动态](https://www.kimi.com/code/docs/kimi-code/whats-new.html)、[桌面版本日志](https://www.kimi.com/code/docs/kimi-code-desktop/changelog.html)

Qwen 的变化横跨模型、插件和托管平台。以下分别标明记录的是什么事件：

| 日期与事件 | 更新 | 需要区分的边界 |
| --- | --- | --- |
| 9 月 10 日、16 日，插件发布 | [Qwen-MM-Plugins](https://github.com/QwenLM/Qwen-MM-Plugins#-news) 加入视频转带图 PDF 笔记、视频编辑，以及从操作录屏提炼 Skill | 是可安装的工具流程，通常还需要模型 API 与媒体工具；并不证明普通聊天入口自动拥有全部能力。 |
| 9 月 17 日平台上架；18 日技术公告 | [Qwen3.8-LiveTranslate](https://qwen.ai/blog?id=qwen3.8-livetranslate) | 支持同传和说话人区分。两个日期分别代表平台记录与公告，不强定为同一个全球首发日。 |
| 9 月 18 日，模型正式上线 | [Qwen3.8-Omni-Flash](https://qwen.ai/blog?id=qwen3.8-omni-flash) | 全模态输入与长音视频理解；完整视频创作、笔记工作还依赖插件和执行环境。 |
| 9 月 18 日，平台上架 | [HappyOyster 1.0](https://docs.qwencloud.com/developer-guides/getting-started/world-model/happyoyster-guide) 三种模式 | 面向可探索世界、导演和角色互动，输出实时视频流；不是直接交付完整 3D 游戏资产。首发日期尚未统一核定。 |
| 9 月 20 日，平台上架 | [Qwen-Audio-3.1-Realtime-Plus](https://docs.qwencloud.com/developer-guides/speech/qwen-audio-realtime) | 双工语音、函数调用与搜索等能力；搜索和函数调用不能同时启用，也有音频历史长度限制。 |
| 9 月 21 日，仓库正式发布记录 | [Omni Realtime 与 Qwen-Live Harness](https://github.com/QwenLM/Qwen-Live-Harness#news) | 实时音视频、后台任务和记忆；完整桌面体验现为 macOS 12+，仍需联网 API。9 月 18 日博客当前正文也含实时版，不单凭页头推定它的首发。 |
| 9 月 24 日，平台预览 | [decision-model-preview](https://docs.qwencloud.com/api-reference/decision-model-api) | 做分类、判断和评分，输出概率等结构化结果，不生成自由文本；不是另一款普通聊天模型。 |
| Pro：10 月 2 日平台上架；Pro／Turbo：10 月 9 日 API 公告 | [Qwen-Image-2.1 Pro／Turbo 托管服务](https://github.com/QwenLM/Qwen-Image-2.1#news) | 不把 Pro 的服务名称自动当作一套独立开放权重。日期另对照 [QwenCloud 日志](https://docs.qwencloud.com/changelog/models)。 |

Qwen Code 的桌面版发布记录还包含浏览器 SDK／Chrome relay、SSH 工作区和多媒体处理等功能；**10 月的 v0.25.2** 发布记录包含文件预览和子智能体面板，其中 Excel 预览是只读功能，不能写成完整表格编辑器。[浏览器能力版本](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.24.1)、[SSH 工作区版本](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.24.4)、[10 月版本](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.25.2)

**10 月 16 日，腾讯还开放了 Hy Memory 2.0 与 MemHub**：把记忆模型、框架和应用连在一起，帮助用户在授权关联的工具之间保存和召回信息。需要安装、关联和配置，不会自动获得所有聊天与代码历史。[官方项目](https://memory.hunyuan.tencent.com/)、[仓库](https://github.com/Tencent-Hunyuan/Hy-Memory)

## 其他容易漏掉的产品变化

| 日期 | 产品 | 核实后的更新与条件 |
| --- | --- | --- |
| 9 月 8 日 | [Meta Muse](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/) | 个人智能体使用云端电脑和浏览器、保留记忆并继续后台任务；美国 18+ 分批首发，9 月底的公告已确认美国与加拿大可用。不是所有地区同时开放。 |
| 9 月 9 日 | [Amazon Quick 桌面端](https://aws.amazon.com/about-aws/whats-new/2026/09/amazon-quick-desktop-app-generally-available-macos-windows/) | macOS／Windows 正式可用，结合本地文件与业务连接器，后台代理可继续工作；在公告列明的七个区域提供。 |
| 9 月 16 日 | [Grok Build Memory](https://x.ai/news/grok-build-memory) | 将项目惯例与决策保存为可检查的记忆，供后续任务使用。 |
| 9 月 16 日 | [Mistral × Firefox Smart Window](https://mistral.ai/news/mistral-x-mozilla/) | beta 中利用标签页上下文搜索、找回信息，公告确认法国与北美；不能等同于完整自主浏览器操作。 |
| 9 月 23 日 | [Cursor Rollouts／Security Review](https://cursor.com/changelog/rollouts-and-security-reviewer) | Teams／Enterprise 可监测部署变化、检查可利用的漏洞。可以提出修复或回退 PR，不会自行合并或回滚。 |
| 9 月 25 日 | [Copilot Home／Code／Autopilot](https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/) | 分别面向统一办公入口、创建小应用和持续代理；公告混合了 Frontier 分批开放、私测扩展和稍后预览计划，不能统称当天全面上线。 |
| 9 月 26 日版本上线；28 日公测公告 | [Grok Team Bots](https://x.ai/news/team-bots) | Teams／Enterprise 共用技能和连接器；个人会话与团队资产仍需区分。[版本日志](https://x.ai/changelog/bot)早于单独公告。 |
| 9 月 29 日 | [Codex Cloud](https://help.openai.com/en/articles/6825453-chatgpt-release-notes#codex-cloud) | 项目任务在隔离的云端工作区运行，电脑休眠后也可继续；需要仓库、环境和相应工作区权限。 |
| 9 月 29 日 | [Bedrock Managed Agents](https://aws.amazon.com/about-aws/whats-new/2026/09/bedrock-managed-agents-preview/) | 持久会话、代码执行和工具管理进入公测，首发限公告列明的三个 AWS 区域。 |
| 9 月 30 日 | [Kiro Workflows](https://kiro.dev/blog/introducing-workflows/) | 将设计、实现、并行评审和验证组成流程，在 IDE／CLI／Web 使用；需主动开启，按账户开放和实际工作计费。 |
| 10 月 1 日 | [GitHub Copilot computer use](https://github.blog/changelog/2026-10-01-github-copilot-can-now-interact-with-desktop-apps/) 与[动态工作流](https://github.blog/changelog/2026-10-01-dynamic-workflows-in-copilot-cli-and-the-copilot-app/) | 桌面操作公测支持 macOS／Windows；流程可复用，CLI 的工作流需实验选项。电脑权限与组织策略仍生效。 |
| 10 月 7 日、11 日 | [Grok Bot](https://x.ai/changelog/bot) | 先增加可导出 PowerPoint／Google Slides 的幻灯片制作，随后加入独立邮箱和交互应用卡；从新独立邮箱发出的邮件仍先显示待审草稿。 |
| 10 月 7 日、14 日 | [Copilot 本地沙箱](https://github.blog/changelog/2026-10-07-local-sandboxing-for-github-copilot-now-generally-available/)、[Kiro 本地沙箱](https://kiro.dev/blog/local-sandboxing/) | 对代理访问文件、网络或凭证施加运行限制；这是执行环境变化，不是新基础模型。 |
| 10 月 14 日 | [Copilot HydraFusion Max](https://github.blog/changelog/2026-10-14-hydrafusion-updates-and-new-max-option/) | 多模型编排的研究预览；Pro／Pro+／Business／Enterprise 需启用实验或预览功能，并受组织模型策略约束。不能与单模型跑分直接等同。 |
| 10 月 16 日 | [Cursor 云代理画布](https://cursor.com/changelog/cloud-agent-canvases-and-environments) | 云代理可交付可分享的交互画布，环境 API 进入 beta。 |

第三方平台“接入某模型”也单独处理。例如 Perplexity **10 月 5 日**接入 MiniMax H3、Seedance 2.5，Runway 同期加入更多合作模型，只证明平台支持发生了变化，不能把这些日期当成原厂模型首发。[Perplexity 日志](https://www.perplexity.ai/changelog/automations-inline-visualizations-and-gpt-6-1-sol)、[Runway 日志](https://runway.com/changelog)

## 已有条目也重新核对

以下主要版本此前已经补入[模型时间线](/models)，本次保留并复核，避免重复计数：

| 厂商 | 停更期间已记录的主要版本 |
| --- | --- |
| OpenAI | GPT Image 2.5 Sunburst／Flare（9 月 8 日）；GPT‑6 Sol／Luna（9 月 22 日）；GPT‑6.1 Sol（9 月 29 日）。 |
| Anthropic | Claude Opus 5.5（9 月 22 日）、Sonnet 5.5（9 月 28 日）、Haiku 5.5（10 月 7 日）；Opus fast mode 的 10 月 15 日变化属于服务正式开放。 |
| Google | Gemini 3.8 Live 两款（9 月 15 日）、TTS 两款（9 月 22 日）、Nano Banana 2.1（10 月 6 日）；Argon 9 月 30 日的受限发布与 10 月 13 日扩大开放分别记录。 |
| DeepSeek／Qwen | DeepSeek‑V4.1‑Flash（9 月 10 日）、1017 更新（10 月 17 日）；Qwen‑Image‑2.1（9 月 20 日）、Turbo（10 月 9 日）。 |
| Mistral | Large 4 Preview（10 月 6 日）、Timestral（10 月 15 日）。Large 4 的开放权重仍是后续计划。 |

模型的具体来源和限制可在时间线展开查看；上一轮的详细解释见[第 4 期补录](/issues/2026-w42)。

## 开放、迁移与退役安排也值得收录

- **Gemini Skills**：10 月 13 日更新安排，App 分批上线，Workspace 版本延期；不是全部用户当天可用。[官方进度](https://workspaceupdates.googleblog.com/2026/10/an-update-on-launch-of-skills-in-gemini-app-and-workspace.html)
- **Claude 套餐与价格**：10 月 7 日 Max／Team 开始包含月度 API credits，需要关联 Console 组织；Sonnet 5.5 降价的是缓存读取，并非全部输入、输出价格。[平台日志](https://platform.claude.com/docs/en/release-notes/overview)
- **旧接口迁移**：Antigravity Agent 05‑2026 已于 10 月 5 日停止服务；Gemini 3.7／3.5 Flash 在 10 月 8 日弃用并转到后续型号。旧 Deep Research 12‑2025 计划 10 月 23 日关闭，截至核查日尚未到期。[Gemini API 日志](https://ai.google.dev/gemini-api/docs/changelog)
- **尚未发生的退役**：Claude Sonnet 4.5 的 API 退役计划为 11 月 30 日；ChatGPT 自定义 GPT 的迁移与退役时间依套餐通知，不能写成已经全部关闭。[Claude 公告](https://platform.claude.com/docs/en/about-claude/model-deprecations)、[ChatGPT 公告](https://help.openai.com/en/articles/6825453-chatgpt-release-notes#september-11-2026)
- **DeepSeek 撤回旧停服计划**：9 月 10 日新闻原文仍有 V4‑Pro 将停用的旧安排，后续更新日志已明确继续提供且原计费不变。迁移判断应以更新后的记录为准。[DeepSeek 更新日志](https://api-docs.deepseek.com/updates)
- **Z.ai 密钥分型**：10 月 16 日起，新建标准 API 与 Coding Plan 密钥分开管理，密钥类型决定计费；旧密钥值不变，不要求统一重建。订阅编程套餐不等于所有标准 API 调用都使用套餐额度。[官方说明](https://docs.z.ai/devpack/notice/api-key-management)

## 核查覆盖与仍待确认的内容

这次同时检查了**模型公告、产品日志、API 日志和官方模型仓库**。以下覆盖记录说明查到了哪里；“已查目录”不等于所有地区、灰度账号和移动端版本都已验证。

| 范围 | 已核入口 | 尚存边界 |
| --- | --- | --- |
| OpenAI、Anthropic、Google | 模型／API 日志、ChatGPT／Claude 产品日志、Google 官方博客与月度回顾原始链接 | Gemini App 独立更新页未成功完整读取；账号实际灰度状态未逐个验证。 |
| Qwen、DeepSeek、Kimi、Z.ai | 官方中英文文档、模型公告、Code 桌面／CLI 日志与主要仓库 | Qwen 若干平台上架与博客日期不同；部分产品页没有发布日期。 |
| 腾讯、小米、阶跃、可灵 | 中文发布目录、完整公告、版本历史与模型卡 | 腾讯部分专项模型只有月份；可灵个别功能生效日未单列。 |
| 字节、MiniMax、百度 | 官方模型／研究目录及能读取的产品记录 | 豆包、即梦、海螺、文心等消费端 App 的灰度和权益更新未完整复原；不能据此说没有更新。 |
| xAI、Meta、Mistral、NVIDIA | 官方新闻、研究与部分产品日志 | Mistral 产品帮助中心、NVIDIA 独立开发者博客未全量覆盖。 |
| Microsoft／GitHub、Amazon／Kiro | Copilot 重要公告、GitHub 日志、AWS 主要模型与工作产品公告、Kiro 博客 | 不是全部 Windows／Office／AWS 服务的逐版本审计。 |
| Cursor、Perplexity、Notion、Adobe、Runway | 前三者区间日志；Adobe 重点公告；Runway 区间日志 | Adobe 与 Runway 的所有独立研究、创作产品入口未全量覆盖；Canva 官方入口本轮访问受限。 |

以下条目**不是认定没有发布**，而是证据尚不足以填入精确日期的模型时间线：

| 条目 | 已确认什么 | 还缺什么 |
| --- | --- | --- |
| [Qwen LiveTranslate、Omni Realtime、HappyOyster](https://docs.qwencloud.com/changelog/models) | 平台上架与工具发布记录已核，已在上文报道 | 不同入口的首发日期口径需要继续厘清。 |
| [Youtu-Parsing-Omni](https://huggingface.co/tencent/Youtu-Parsing-Omni)、[WeVisDoc](https://github.com/Tencent/WeVisDoc)、[EVIE](https://huggingface.co/tencent/EVIE-8B) | 腾讯的多模态文档解析、文档转换和视觉检索候选已有官方项目／模型卡；Youtu 明确标注 2026 年 10 月 | 缺少一致、明确的公开首发日，不能用上传日替代。 |
| [MiMo 蒸馏 9B](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B)、[StepAudio 3 Chat](https://platform.stepfun.com/docs/zh/guides/models/stepaudio-3-realtime) | 官方模型卡或当前接口文档确认存在 | 是否独立发布、何时首次开放尚未核定。 |
| ElevenLabs V4、Ideogram 4.5 | [Runway 日志](https://runway.com/changelog)有接入记录；Ideogram 官方目录可见 4.5 内容 | 原厂首发日尚未确认；ElevenLabs 官方入口本轮受限，不能把平台接入日当首发。 |

另将 Claude Fable 5.1／Mythos 5.1 在模型时间线中的近似日期 **9 月 3 日改为官方日志确认的 9 月 1 日**，这项属于范围外的历史纠错，不计入上面的 28 条新增。Kimi K3、GLM‑5.3 等更早条目的公告、API 与权重日期还存在口径风险，已保留在维护记录中，未用猜测替换。[Claude 官方日志](https://support.claude.com/en/articles/12138966-release-notes)

之后每次更新都应同时查模型与产品入口，并记录遗漏与待核项。RSS 抓取成功、候选数量增加或网站构建通过，都不能代替内容覆盖核查。
