# 2026-11-02 产品更新核查

核查日：2026-11-02。事件窗口：2026-10-19—11-02；优先推荐 10/26—11/01，其余为与上期衔接的更新。已对照 `docs/maintenance/2026-autumn-audit/root.md`、`global-extended.md` 和 `data/models.json`，不把旧产品的回顾或第三方模型接入重记为新模型首发。

以下为官方正文确认的 12 个精选事件。用途判断为编辑归纳；性能、节省成本及成功率未做本站实测。公告未写地区或套餐时明确留空，不推导为中国大陆或全部账户可用。

## 优先供本期正文选用（10/26—11/01）

### 1. 10/26：Runway App Studio 把创作流程做成可分享应用

用自然语言描述工具，App Studio 生成带界面的图像、视频或音频应用，调用 Brand Kits 与 Workflows；可预览、修改、查看代码和回退。对用户的价值是把反复使用的分镜、商品图、多媒体处理流程交给一个可重复使用的界面，而不是每次重写提示词。

**开放条件：**所有付费计划已可创建，无需另购附加包，但构建、运行和托管都消耗原有 credits。免费用户可使用内置或别人分享的应用；公共链接使用者仍须登录 Runway，并承担自己的生成额度。Team/Enterprise 支持向指定成员、项目或工作区分享；Enterprise 管理员可关闭功能或公共链接。不能写成任意访客免登录、免费托管的网站生成器。[官方发布正文](https://runway.com/news/company-news/introducing-runway-app-studio)

### 2. 10/27：Runway Ads 从早期试用扩大为所有付费计划 GA

接入 Meta、Google、TikTok 广告账户后，结合已有广告表现和品牌资料生成变体、调整尺寸与本地化，并在同一处查看表现。适合营销创作团队批量迭代已有素材。**每条广告发布前都需团队成员批准**；Enterprise 需管理员在组织及工作区开启，免费账户须升级。

这次是扩大开放，**产品初次公布是 9/30**。旧产品页还显示企业 early access，应以 10/27 GA 正文为此次状态依据。厂商自身降低获客成本的数字不能写成用户普遍效果。[10/27 GA 正文](https://runway.com/news/company-news/runway-ads)；[9/30 原始公告](https://runway.com/news/company-news/introducing-runway-ads)

### 3. 10/28：GitHub Copilot Fusion 正式可用；本地模型路由仍为实验预览

Fusion 合并此前 Auto 与 HydraFusion：任务可由单模型完成，也可先用较轻模型尝试再升级，或让另一模型检查结果。对用户的价值是少做手动选模型，复杂任务可按 Standard/High/Max 调整投入。

**开放条件：**Fusion GA，所有 Copilot 计划，入口为 VS Code、Copilot App、CLI 与 JetBrains；服从组织模型策略，按实际使用模型标准价计费，付费计划的 30% 折扣是限时。**本地与云端自动路由是另一个需主动开启的 experimental preview**，只明确 CLI/App/VS Code，不应和 Fusion GA 混写，也不等于全部离线运行。[Fusion 正文](https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/)；[本地路由正文](https://github.blog/changelog/2026-10-28-github-copilot-fusion-now-supports-selection-of-local-models/)

### 4. 10/28：Copilot App Projects 公测，围绕一个目标组织跨仓库和非代码工作

项目可放入仓库、设计稿、Slack 线程和会议笔记，选择模型与工具，由多个代理在后台推进，再带回结果供审核；也可围绕项目设置重复任务。它比单一代码会话更适合把研究、需求文档、设计和实现放在同一任务里。

**开放条件：**Projects 为 public preview，需更新 Copilot App；官方文档在资格栏说明 App 支持所有 Copilot 计划，未列单独地区名单。文章同时介绍的 macOS/Windows computer use 仍是公测、接管应用前需授权，但这是 **10/01 已公开的能力**，本期不重记首发。[发布正文](https://github.blog/changelog/2026-10-28-github-copilot-app-universe-releases/)；[Projects 官方文档](https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-projects)

### 5. 10/28：Copilot 原生生成、编辑图片，直接落入项目

在编程对话中用自然语言生成或编辑图片，内联预览并保存到工作区；推理模型实际调用 GPT Image 2.5 Flare 专用工具。适合网页、应用原型和说明文档直接补齐视觉素材。

**开放条件：**VS Code、Copilot App、CLI；Pro、Pro+、Business、Enterprise 的 public preview。图像 token 与聊天模型分别计费，扣计划 AI credits；组织可用模型策略关闭。只是既有图像模型的新入口，不是 GPT Image 2.5 的新首发。[官方正文](https://github.blog/changelog/2026-10-28-generate-and-edit-images-directly-in-copilot/)

### 6. 10/28：GitHub 开源 Replica，用自己的设计系统做交互原型

Replica 读取团队组件、设计模式与文档，在 Copilot App 对话中把需求做成交互原型；可本地使用，也可自建可选 Replica Hub 供同事查看与评论。对于网页设计的实际价值是沿用已有组件和视觉规则，减少原型与真实产品脱节。

**开放条件：**项目已以 MIT 许可开源。Hub 是可选自托管服务；开源代码不意味着 Copilot 订阅、模型使用或托管成本全免。属于原型工具，不是新基础模型。[官方发布正文](https://github.blog/changelog/2026-10-28-introducing-replica-an-open-source-ai-prototyping-tool/)

### 7. 10/28：Microsoft 将 Copilot 的代理运行框架开放给开发者

Microsoft Copilot harness 可通过 SDK 下载，或交由 Foundry 云端管理；让开发者提供指令、skills、工具与模型选择，由运行框架处理代理循环和沙箱。适合需要把长任务、多模型与工具调用嵌入自己产品的团队，普通读者可列为短讯。

**边界：**此事包括 GitHub Copilot SDK 更名为 Microsoft Copilot SDK 及跨产品共用基础设施；不意味着当天所有消费者 Copilot 新界面、Home/Code/Autopilot 已普遍开放。主公告未给出统一套餐、地区或免费额度，不补写。[Microsoft 正文](https://blogs.microsoft.com/blog/2026/10/28/introducing-the-microsoft-copilot-harness-unlocking-the-potential-of-truly-multi-model-agentic-work/)；[SDK 更名日志](https://github.blog/changelog/2026-10-28-github-copilot-sdk-is-becoming-microsoft-copilot-sdk/)

## 与上期衔接（10/19—10/25）

### 8. 10/19 公告、11/02 老客户迁移：Notion 重建 Agent 与额度体系

Agent 新增自己的电脑和浏览器，支持长任务和独立模型进行动作检查；MCP 已支持记忆同步。对学习和知识工作更有意义的是基于资料执行多步任务、维持跨工具上下文，而非只生成一段摘要。[发布日志](https://www.notion.com/releases)

**开放与计费：**Business/Enterprise 每席每月含 1,500 Standard credits（Auto 选模型）及 500 Select credits（自己选模型或 Custom Agents）。新客户 10/19 启用，现有客户按公告于 **11/02 迁移**；没有账户实测确认迁移完成。ChatGPT Plus/Pro/Go 连接先用于个人 Notion Agent，不含 Custom Agents；Enterprise BYOK 仍为 private alpha。**AI Command Center 与通过 MCP 提供 Skills 仍是 coming soon。**[官方博客正文](https://www.notion.com/blog/notion-ai-more-for-less)

**编辑边界：**上期已写 10/13 MCP 和连接 ChatGPT，此次新增重点为代理运行能力、记忆同步及额度迁移，不再把同一连接机制写成第一次出现。日志说任务可达 24 小时，博客前段又写超过 24 小时，宜写“支持长时间任务”而不承诺硬性时长。Auto 节省约 90% 成本属于厂商对 20 多项任务的结果，非本站测试。

### 9. 10/20：Cursor Agent SDK GA，将代理定义、测试和部署放进同一项目

代理可由提示词、工具、skills、MCP 连接与渠道组成，在本地 playground 调试、用 evals 检查行为，之后部署到 Cursor 或自有基础设施。可由代码托管事件、Slack、webhook 或定时计划唤醒，并持续同一会话；适合把一次性的 AI 操作做成可重复的工作工具。

**开放条件：**公告明确 generally available。原文未给具体订阅、地区和部署费用，不能把 GA 改写为永久免费。它是 SDK 与托管部署能力，不是新模型，也不是 10/16 云代理画布的新一轮首发。[官方正文](https://cursor.com/changelog/agent-sdk)

### 10. 10/19：Perplexity Computer 增加 Ultrafast；Decisions API 更新结构化判断

Computer 网页版可为 GPT-6 Astra、GPT-6.1 Sol 选 Ultrafast，适合更快地修改草稿和比较方案；**仅明确 Max，且比 Normal/Fast 消耗更多 credits**。同一日志中的 Decisions API 提供文本/JSON/图片的分类概率与评分，便于软件自动分流和按量表批改，27B 与 4B Flash v1.2 可 API 调用或下载权重。连接器按角色控制只明确销售协助的 Enterprise 计划。[官方正文](https://www.perplexity.ai/changelog/ultrafast-computer-models-decisions-api-and-connector-controls)

**模型边界：**27B 模型卡明确基于 Qwen3.8-27B，Flash 基于 Qwen3.5-4B、从教师决策模型蒸馏；是有独立权重的专项派生模型，已补 2 条候选 JSON，不能写成从零训练的新基础模型。模型卡与 API 的多问题约束应分别看，不能把 API 的 128 个问题限制概括为所有本地推理的统一上限。[27B 模型卡](https://huggingface.co/perplexity-ai/pplx-decider-v1.2)；[Flash 模型卡](https://huggingface.co/perplexity-ai/pplx-decider-flash-v1.2)

**日期证据：**两个官方 HF 仓库首个版本均为 10/16（standard `225c913`、flash `6d771ad`）；10/19 官方日志和 API 团队明确 API 更新到 v1.2、可下载权重。**JSON 日期采用 10/19 的明确可用事件**，note 保留 10/16 历史。仓库可在提交后才转公开，模型卡仍有 private repository 的操作文字，因此不能用提交时间证明当时所有用户可获取。[Standard 提交记录](https://huggingface.co/perplexity-ai/pplx-decider-v1.2/commits/main)；[Flash 提交记录](https://huggingface.co/perplexity-ai/pplx-decider-flash-v1.2/commits/main)；[10/19 官方 API 团队确认](https://community.perplexity.ai/t/decisions-api-shared-state-counted-per-question-in-usage-input-tokens/6316/8)

### 11. 10/19：ElevenLabs 实时语音代理配置与企业实时同传

Eleven Realtime Mini/Max 正在按工作区逐步开放，把 LLM、语音识别和合成设置封装成一个语音代理选择；Max 面向复杂指令和多步工具调用。**官方将其描述为完整 voice-agent configuration，不据此登记成两个从零训练的基础模型。**10/26 日志说明控制台切到 Realtime 时已默认选 Max，不沿用 10/19 的 Mini 默认状态。[10/19 日志正文](https://elevenlabs.io/docs/changelog/2026/10/19)；[10/26 日志正文](https://elevenlabs.io/docs/changelog/2026/10/26)

同期 Realtime Translation WebSocket 已向 **Enterprise 工作区**开放：边听边译为目标语言语音，同时输出原文与译文字幕，可在速度和完整语境间调整。适合会议字幕或跨语言语音产品，不等于所有个人用户可直接开启的免费同传 App。[同传 API 文档](https://elevenlabs.io/docs/api-reference/realtime-translation/v-1-translation-realtime)

### 12. 10/19：ElevenLabs Video to Music API 从视频生成配乐与音效

可上传最多 10 个视频、总计 200 MB，按顺序合成一个配乐任务；可附描述和风格标签，也可参考原视频音频风格，添加音效并将音乐与音效分轨导出。对视频创作者的价值是先有画面再匹配声音，保留后期混音空间。[10/19 官方日志](https://elevenlabs.io/docs/changelog/2026/10/19)；[Video to Music API 文档](https://elevenlabs.io/docs/api-reference/music/video-to-music)

**开放条件：**API 已可用；本次日志未声明某个统一免费套餐或全球地区，不能自行补写。Zero Retention Mode 属 Enterprise 的另行条件，不能认为所有生成默认零留存。是多媒体工作流/API 更新，不是另一个新音乐基础模型。

## 覆盖范围与排除项

| 厂商 | 已读入口 | 结论与局限 |
|---|---|---|
| Cursor | Changelog 首屏至 10/16、10/20 Agent SDK 完整正文 | 窗口内日志仅见 10/20；未宣称所有非日志渠道无更新。 |
| Notion | releases、10/19 官方长文 | 新功能、计划与 11/02 迁移拆开；未登录验证账户额度。 |
| Perplexity | changelog、10/19 正文、两张官方 HF 模型卡 | 日志最新为 10/19；未把平台接入 GPT 模型当新首发。 |
| GitHub | 10 月完整 changelog 目录、10/28 重点独立正文 | Universe 标题已扫，挑选目标任务、网页设计、图片和路由；不做小修复全集。Agent Merge、共享 Automations、Security、代码评审等可在后续专题展开，本期不挤入过多技术细节。 |
| Microsoft | 10/28 harness 正文、SDK 更名日志；搜索官方主博客 | 不是逐产品 365/Windows/消费者 Copilot 全量核查。9/25 Home/Code/Autopilot 不能因本次 SDK 公布改写为全面 GA。 |
| Runway | Changelog、News 目录、App Studio 与 Ads GA 正文 | 10/20 加入 Claude Marketplace 属集成短讯；9/30 Ads 原始公布、Praxis-1 等窗外事件不挪日期。 |
| Adobe/Firefly/Acrobat | 官方新闻、Acrobat 分类、官方域名检索 | Acrobat 分类最新看到 10/07 网页检索；Firefly topic 返回 404。搜索未确认本窗口内足够重要且可读正文的新发布，**不等于 Adobe 没有更新**。9/29 ChatGPT 交互编辑、9/24 Gemini/Claude 插件、9/08 视频剪辑已属旧事；MAX 活动预告不算功能发布。 |
| ElevenLabs | 官方 changelog 至 10/26、10/19 与 10/26 独立正文、同传/配乐 API | 选择实时语音与视频配乐，不罗列日志修复。v4/v4 Turbo 是 9/28 原厂发布，Runway 9/29 接入不能当原厂日。 |
| Ideogram | 官方 News、Blog 目录及主页 | 窗口内多为教程/选型文章，无确认新基础模型发布；4.5 已在 10/14 教程及 10/02 Runway 接入出现，不能挪到 10/26 教程日首发。 |

## 取证方式

按 agent-reach 尝试 Exa、Jina Reader 与 web-reader：Exa 429 免费配额，Jina 401 网络信誉限制，web-reader 未配置；随后用内置 web 搜索/打开第一方正文。未使用第三方报道替代发布来源，未修改生产文件或提交。补充模型候选位于 `weekly-2026-11-02-products-models.json`，共 2 条 Perplexity 专项派生模型，无 issue 字段。
