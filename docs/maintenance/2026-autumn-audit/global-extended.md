<!-- 来源核查阶段的记录快照；最终合并结果、数量与修订以 ../2026-10-19-autumn-audit.md 为准。 -->

# 2026 秋季停更审计：全球厂商扩展组

核查范围：2026-09-08—2026-10-19（含首尾）；核查日 2026-10-19。本组覆盖 xAI、Meta、Mistral、Microsoft/GitHub、NVIDIA、Amazon/AWS/Kiro，另补 Adobe 和 Runway。结论基于官方公告、更新日志和模型卡，未实测。没有修改生产数据或期刊。

对照本轮开始时 `data/models.json`（116 条）和 `src/content/issues/2026-w42.md`：本组确认的 9 个新模型条目均未收录；Mistral Large 4 Preview 与 Timestral 已收录；下面所列其他产品变化在这两份文件中未收录。独立候选 JSON 为 `output/audit-2026-autumn-global-extended-models.json`，不附 issue、不虚构 prev。

## 建议特刊优先写入

1. Meta Muse 个人智能体与 Muse Wonder / Spark Open；区分美国先行、加拿大后续可用、API 与 Muse Code 入口，以及有限商业许可。
2. Microsoft 新 Copilot 的 Home、Code、Autopilot；这是分批/预览和后续计划的组合，不能写成全量正式开放。
3. GitHub Copilot 的电脑操作、可复用动态工作流、多模型 HydraFusion；这是产品能力，不是三个新基础模型。
4. Grok 4.7、Voice 3.0、Transcribe 2.0，以及 Grok Bot 幻灯片、Team Bots、邮箱和应用卡。
5. Amazon Quick 桌面端与后台持续工作、Kiro Workflows、Nova 2.5 Sonic。
6. Adobe Acrobat 文档转交互报告/摘要幻灯片/音频，Premiere/After Effects 内生成与代理；Runway 原剪辑软件插件。
7. NVIDIA Super VL 与 Bolt 74B 本地模型；E4B 截止日仍属计划，不补成已发布。

## 已核模型与日期依据

| 日期 / 事件类型 | 模型 | 可用范围与编辑要点 | 一手依据 | 已收录 |
|---|---|---|---|---|
| 09-11 控制台可用；09-18 正式公告 | Grok Voice Transcribe 2.0 | 控制台 9/11 写 playground 和 clone matcher 使用 2.0；9/18 公告提供 batch/streaming、diarization、时间戳、多声道。JSON 用最早确认的 9/11，明确不等于所有 API 用户首日。公告中的替换默认/弃用1.0仍为未来安排。 | [控制台日志](https://x.ai/api/changelog)、[9/18 公告](https://x.ai/news/grok-voice-transcribe-2) | 否 |
| 09-21 正式发布 | Grok 4.7 | Cursor、Grok Build、Grok API；编程、文档和长任务自检。$2/$6 每百万输入/输出token，fast档价格两倍。 | [官方公告](https://x.ai/news/grok-4-7) | 否 |
| 10-05 GA | Amazon Nova 2.5 Sonic | Bedrock四区域：N. Virginia、Oregon、Stockholm、Tokyo；实时语音、异步工具、256K上下文、七语种；与2 Sonic同价。10/13是回顾日。 | [What’s New](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-nova-2.5-Sonic/) | 否 |
| 10-06 API Preview | Mistral Large 4 Preview | 已有条目应继续保留“权重月底计划”，不能写已开放权重。 | [官方公告](https://mistral.ai/news/mistral-large-4/) | 是 |
| 10-12 正式开放 | Muse Wonder / Muse Wonder Full | Wonder经Meta Model API和Muse Code；Full只明确Muse Code订阅者。普通Muse里的Wonder仍是后续优先向订阅者推出。Newsroom页面同时显示10/12、10/13，研究页确认10/12发布。 | [研究公告](https://research.meta.ai/blog/muse-wonder)、[Newsroom](https://about.fb.com/news/2026/10/introducing-muse-wonder-models/) | 否（两个条目） |
| 10-14 正式发布 | Grok Voice 3.0 | Voice Agent API，$0.08/min；`grok-voice-latest`已自动切换；也用于Grok Bot语音模式。 | [官方公告](https://x.ai/news/grok-voice-3) | 否 |
| 10-15 开放权重 | Muse Spark Open | 816B总参数/42B激活、原生多模态、1M窗口；第三方API、HF等权重入口；Muse Model License含有限商业条款。两台M5 Ultra Mac Studio是官方部署示例，不是任意电脑可跑。 | [官方公告](https://research.meta.ai/blog/muse-spark-open)、[模型卡](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B) | 否 |
| 10-15 开放权重 | Nemotron 3.5 Super VL 120B-A12B / Bolt 74B-A9B 24GB | 前者面向多模态文档和长期代理，后者为本地24GB档。模型卡标OpenMDW1.1。Bolt E4B4GB是10/23计划，未加入JSON。 | [发布文章](https://blogs.nvidia.com/blog/nemotron-3-5-super-vl/)、[Super模型卡](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-NVFP4)、[Bolt模型卡](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-24GB) | 否（两个条目） |
| 10-15 发布 | Timestral | 专项时间序列预测；与通用聊天模型分开解释用途。 | [官方公告](https://mistral.ai/news/timestral/) | 是 |

## 已核产品：xAI / Grok

本节均未在对照文件收录。

| 日期 | 更新与事件性质 | 条件 / 不能混写的边界 | 来源 |
|---|---|---|---|
| 09-08，v0.45.0 | 邮件与Slack草稿卡，可先检查再发送/丢弃 | Grok Bot版本功能；不是某个基础模型首发 | [Bot日志](https://x.ai/changelog/bot) |
| 09-11，v0.50.0 | Bot云电脑的网页流量可经用户自己的电脑转发 | 需在Settings主动开启Route egress；不等于模型本地运行 | [Bot日志](https://x.ai/changelog/bot) |
| 09-15，v0.53.0 | macOS接入1Password；可上传到Drive/OneDrive或附入Gmail草稿 | 需要连接相应服务；1Password默认先确认，Auto fill另行开启 | [Bot日志](https://x.ai/changelog/bot) |
| 09-16 | Grok Build Memory正式可用 | 任务后后台记录项目惯例/决策为Markdown，跨会话读取；新会话开始生效，可用/memory检查 | [发布文章](https://x.ai/news/grok-build-memory) |
| 09-18，v0.57.0 | Bot可启动Project：由Cloud Agent计划并运行子代理 | 产品版本变化，不能把所有演示任务当成功率证据 | [Bot日志](https://x.ai/changelog/bot) |
| 09-26版本上线；09-28公开beta公告 | Team Bots：团队共用技能/连接器/知识，可在Slack协作 | Teams和Enterprise公测；个人会话保持独立。9/26 v0.61.0先有功能，9/28为专门公告，两日都保留 | [版本日志](https://x.ai/changelog/bot)、[Team Bots公告](https://x.ai/news/team-bots) |
| 09-29 | Imagine控制台合并首帧、尾帧、关键帧、参考图的Images-to-Video入口 | 控制台工作流更新，不是Imagine模型新版本 | [控制台日志](https://x.ai/api/changelog) |
| 09-30，v0.65.0 | Team Bot语音聊天 | 每名成员的通话仍在自己的会话中 | [Bot日志](https://x.ai/changelog/bot) |
| 10-02，v0.66.0 | 主Bot主动发现可处理工作并提出建议 | 需Grok Bot0.59.0+；不是默认获准执行一切操作 | [Bot日志](https://x.ai/changelog/bot) |
| 10-07，v0.68.1 | 与Bot共同制作幻灯片，先挑示例，再交付PPT或Google Slides | 已有发布日志；不是10/16 ChatGPT Slides的另一种名称 | [Bot日志](https://x.ai/changelog/bot) |
| 10-11，v0.70.2合集 | Bot独立邮箱、无需连接X账号的X检索、聊天内交互应用卡；网页存PDF | 邮件发送经过草稿审批；Figma/Notion/Canva等卡片随连接器提供；该版本日志含0.69.0—0.70.1，最早子版本日未逐个拆定 | [Bot日志](https://x.ai/changelog/bot) |
| 10-12开始开放 | The X Subscription合并Grok、Grok Bot、Cursor和X权益 | 新客户当日起、全球未来数日分批；老客户可保持原计划。Grok模型共享额度，Cursor第三方模型在Premium及以上另按API价充值 | [官方公告](https://x.ai/news/x-subscription) |

## 已核产品：Meta / Mistral

| 日期 | 更新与事件性质 | 条件 / 边界 | 来源 | 已收录 |
|---|---|---|---|---|
| 09-08发布 | Muse个人智能体：专用云VM与浏览器、跨应用做事、后台继续、记忆和目标 | 首发美国iOS/Android/web分批，18+；常用部分免费、更多用量订阅；9/29文章已确认美国和加拿大可用。对发送/购买等敏感动作确认；Shop Pay/1Password在9/8文章仍“coming soon” | [发布公告](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/)、[9/29范围更新](https://about.fb.com/news/2026/09/introducing-muse-small-business/) | 否 |
| 09-15订阅发布 | Meta One：更多图像/视频AI用量、Restyle、创作者和商业Agent额度 | 分地区/应用/账户渐进；单品$2.99起、个人组合$7.99起；免费核心体验保留。不是9/15新训练的模型 | [公告](https://about.fb.com/news/2026/09/introducing-meta-one-subscription-service-more-features-ai/) | 否 |
| 09-16产品接入 | Mistral接入Firefox Smart Window beta，依据标签页搜索、找回信息 | 已覆盖法国与北美；英国/德国是当年稍后计划；不是浏览器全自主操作的同义词 | [Mistral公告](https://mistral.ai/news/mistral-x-mozilla/) | 否 |
| 09-23技术宣布 | Muse Realtime Avatar：由Realtime Voice驱动可交互角色 | 官方介绍448×768/25fps与低延迟，强调演示角色不全在Muse App可用。公开API/权重和普遍开放日期未确认，暂未放模型JSON | [研究原文](https://research.meta.ai/blog/bringing-your-muse-to-life) | 否 |
| 09-23发布会；09-24回顾 | Muse拟接入AI眼镜、增加语音、连接器和独立邮件身份 | “未来数月”眼镜接入、Muse Charm稍后更多信息；支付/连接器各项时间不同，不能统称当日全量上线 | [Connect官方回顾](https://about.fb.com/news/2026/09/the-biggest-news-from-connect-2026/) | 否 |
| 09-29产品扩展 | Muse for Small Business：新skills与商业连接器，可接社媒、店铺、账务、设计和协作应用 | 美国/加拿大已有Muse；可自定义连接器；发布/发送/付费需用户批准；10/8是文章更新日而非首发 | [官方公告](https://about.fb.com/news/2026/09/introducing-muse-small-business/) | 否 |

## 已核产品：Microsoft / GitHub

| 日期 | 更新与事件性质 | 条件 / 边界 | 来源 | 已收录 |
|---|---|---|---|---|
| 09-10周更新记录 | Copilot CLI引入Project HydraFusion；VS Code1.137定时代理任务、语音模式；App Jira集成 | HydraFusion实验开关；定时任务public preview，语音experimental。9/10是汇总确认日，需精确到VS Code首版日时再核其release notes | [9/10官方周更新](https://github.blog/changelog/2026-09-10-github-copilot-weekly-releases-september-7/) | 否 |
| 09-14分批 | Auto模型路由可选效率/平衡/智能三档 | VS Code、CLI、App分批；共用模型池，按实际选中模型计费；不等于新模型 | [公告](https://github.blog/changelog/2026-09-14-configure-cost-and-quality-in-copilot-auto-model-selection/) | 否 |
| 09-18周更新记录 | Copilot App Sentry崩溃报告到修复；VS Code代理支持本地Dev Containers | Docker与受支持配置必需，逐步开放；评审自动解决已修复评论等同时更新 | [9/18周更新](https://github.blog/changelog/2026-09-18-github-copilot-weekly-releases-september-14/) | 否 |
| 09-25公告，分批/计划组合 | 新Copilot Home / Code / Autopilot：整合Chat/Cowork与Office、生成小应用、持续主动代理 | Home和Code未来数周经Frontier；Code月底Frontier、365Premium/Pro晚些时候预览。Autopilot月底扩私测；不是9/25全量GA。Office可编辑文档协作，Managed Runtime预览，Fabric IQ在Chat/Cowork当日GA | [Microsoft原文](https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/) | 否 |
| 09-25更新 | Slack/Teams中途换模型、检查重复issue、增强长任务状态；Slack文件上下文 | 仍是相应产品public preview；JetBrains回退编辑与共享skills另见同周更新 | [周更新](https://github.blog/changelog/2026-09-25-github-copilot-weekly-releases-september-21/) | 否 |
| 09-30研究预览扩入口 | HydraFusion进入VS Code与App，按任务选单模型、级联或交叉批评流程 | Pro/Pro+/Business/Enterprise；企业需允许preview。不是一款基础模型 | [公告](https://github.blog/changelog/2026-09-30-hydrafusion-in-vs-code-and-the-github-copilot-app/) | 否 |
| 10-01公测 | Copilot computer use读界面、点击、输入，跨桌面应用工作 | macOS/Windows的CLI和App；接管应用前授权，macOS需Accessibility/Screen Recording；组织可关闭 | [公告](https://github.blog/changelog/2026-10-01-github-copilot-can-now-interact-with-desktop-apps/) | 否 |
| 10-01公测 | Dynamic workflows：把多代理、检查、暂停确认等流程存为可复用代码 | 所有Copilot计划；App直接提供，CLI需experimental；并非每次自然语言请求都会自动变成稳定工作流 | [公告](https://github.blog/changelog/2026-10-01-dynamic-workflows-in-copilot-cli-and-the-copilot-app/) | 否 |
| 10-07 GA | Local sandboxing限制代理的文件、网络与凭证访问 | CLI/App/VS Code Agent Host；Windows/macOS/Linux，无额外费；底层模型执行和工具隔离分开理解 | [公告](https://github.blog/changelog/2026-10-07-local-sandboxing-for-github-copilot-now-generally-available/) | 否 |
| 10-07产品更新 | CLI /model发现运行中的本地Ollama模型 | CLI1.0.94-0+，模型需tool calling+streaming；不会自动安装模型，也不会自动关闭遥测或进入离线 | [公告](https://github.blog/changelog/2026-10-07-discover-local-models-in-github-copilot-cli/) | 否 |
| 10-14研究预览更新 | HydraFusion Max、更细的推理强度、并行模型批评与工作区工具检查 | VS Code/App/CLI；Pro/Pro+/Business/Enterprise，需preview或experimental且服从组织模型策略 | [公告](https://github.blog/changelog/2026-10-14-hydrafusion-updates-and-new-max-option/) | 否 |

平台模型接入已扫：9/21 Grok4.7、9/22 Opus5.5/GPT6 Sol/Luna、9/28 Sonnet5.5、9/29 GPT6.1 Sol、10/7 Haiku5.5、10/13 Gemini4 Argon；这些是Copilot上架事件，应与模型原厂日期分别记录。没有重复放进本组模型JSON。

退役也不写成发布：10/2 GitHub Copilot实际下架Gemini3.5/3.6 Flash、KimiK2.7 Code、Opus4.7。[实际退役公告](https://github.blog/changelog/2026-10-02-selected-models-in-github-copilot-deprecated/)。10/15公告的是11/16计划下架Opus4.8/5和GPT5.6 Terra，Opus4.8个人年付订阅有例外。[后续计划](https://github.blog/changelog/2026-10-15-upcoming-deprecation-of-selected-github-copilot-models-in-mid-november/)。

## 已核产品：Amazon / AWS / Kiro

| 日期 | 更新与事件性质 | 条件 / 边界 | 来源 | 已收录 |
|---|---|---|---|---|
| 09-08扩大可用 | Kiro Students新增16国121所大学 | 大学邮箱+SheerID核验；一年每月1000 credits，无结转，结束转免费计划；不是全球每个学生自动可领 | [公告](https://kiro.dev/blog/students-2026/) | 否 |
| 09-09 GA | Amazon Quick macOS/Windows桌面端；本地文件和业务连接器，桌面手机同步，关电脑后代理仍继续 | 7区域：N.Virginia/Sydney/Oregon/Ireland/London/Tokyo/Frankfurt；已有Quick用户下载；9/14仅周报回顾 | [What’s New](https://aws.amazon.com/about-aws/whats-new/2026/09/amazon-quick-desktop-app-generally-available-macos-windows/) | 否 |
| 09-29 public preview | Bedrock Managed Agents（AWS与OpenAI合作）提供持续会话、代码执行、工具/skills/MCP和审批 | N.Virginia/Oregon/Ohio；预览期除底层资源无额外BMA费用；属于可用代理服务，不是采购合作广告 | [What’s New](https://aws.amazon.com/about-aws/whats-new/2026/09/bedrock-managed-agents-preview/) | 否 |
| 09-30产品开放 | Kiro Workflows把设计、实现、并行评审与验证组成多代理流程 | IDE/CLI/Web同一runtime，主动开启且按账户提供；不见设置意味着尚未到该账户；按实际代理工作耗credits | [官方公告](https://kiro.dev/blog/introducing-workflows/) | 否 |
| 10-09公告；10-12起逐步提示迁移 | Kiro CLI V3计划转默认，共用IDE/Web harness、cloud sessions、spec/tangent mode | V3自6月已可选，不是10月首发；月底CLI3.0才预计默认，届时退役inline autocomplete/CLI桌面App/Classic | [迁移公告](https://kiro.dev/blog/cli-3/) | 否 |
| 10-14 GA | Kiro本地sandbox约束代理命令/脚本对文件和凭证的访问 | Kiro IDE及CLI，需按本机环境配置；不等于全部任务在云端隔离 | [官方公告](https://kiro.dev/blog/local-sandboxing/) | 否 |

9/14 Kiro Web autonomous mode文章是自家代码维护案例，明确Web已向付费用户GA，但未证明9/14是该能力首发；排除“新首发”表述。[原文](https://kiro.dev/blog/tackling-technical-debt-at-scale-with-autonomous-mode/)。AWS模型接入和Strands基础工具次要更新已读官方周报，不逐项挤入特刊。

## 已核产品：Adobe / Runway（补充覆盖）

| 日期 | 更新与事件性质 | 条件 / 边界 | 来源 | 已收录 |
|---|---|---|---|---|
| 09-08发布/公测组合 | Premiere Generative Media直接在时间线生成视频/音效；Soundscape/Music beta；After Effects AI Assistant公测 | 可选Adobe和合作模型；音频分离/降噪等也有public beta，不能把全部写GA | [Adobe公告](https://blog.adobe.com/en/publish/2026/09/08/generate-create-directly-in-your-timeline-with-new-ai-powered-innovations-in-premiere-after-effects) | 否 |
| 09-08开放插件 | Runway进入Premiere Pro与After Effects，可生成图像/视频、Aleph2改已有镜头、直接放回序列 | macOS/Windows插件免费下载，实际生成使用原有付费计划和credits。日志短卡写All Plans，详情卡写Paid Plans，按详细条款说明 | [Runway日志](https://runway.com/changelog) | 否 |
| 09-09产品更新 | Acrobat密集文档转交互报告/摘要幻灯片；个人播客、音频摘要、朗读；Stylize套Express模板 | 原文未清晰逐项给出套餐/地区，写功能公布并提醒按账户可见范围，不能自填“所有免费用户” | [Adobe公告](https://blog.adobe.com/en/publish/2026/09/09/show-up-sharper-faster-with-new-acrobat-ai) | 否 |
| 09-10 / 09-15 / 09-22 | Runway Agent创建编辑Brand Kits；资产评论@Agent；MCP读取Brand Kits | 9/10 All Plans；9/15 Enterprise；9/22 MCP只能读，创建编辑仍在产品内 | [Runway日志](https://runway.com/changelog) | 否 |
| 09-17 | Runway Enhance Frame Rate可处理任意来源视频，最高4K/5分钟，转多种帧率 | Max+；Enhance、Tool Mode、Workflows、Agent入口 | [Runway日志](https://runway.com/changelog) | 否 |
| 09-17 / 09-23 | Runway进入Grok Bot插件与Cursor Marketplace；DaVinci Resolve插件 | Grok Bot/DaVinci条目标Paid Plans；Cursor MCP条目标All Plans，调用仍以模型额度为准 | [Runway日志](https://runway.com/changelog) | 否 |
| 10-01 / 10-02 | OpenAI Dots中接Runway；Agent支持Seedance2.5 Draft，480p快速草稿后增强 | 日志All Plans；这些是产品接入/草稿模式，不是Seedance2.5首发 | [Runway日志](https://runway.com/changelog) | 否 |

Runway同期上架Kling系列（9/18）、ElevenLabsV4（9/29）、Ideogram4.5 MCP（10/2）；只证明平台上架日，不能代替原厂首发日。未放入本组JSON。

Adobe 10/7 Acrobat Web search在官方搜索全文结果中有明确日期与说明（文档优先、可开关、文档/网页各自引用），但直连原文返回404，web open随后限流；列为**待再次打开正文确认**，本组不据此写成已完整核验。候选：[官方页面](https://blog.adobe.com/en/publish/2026/10/07/web-search-now-available-in-acrobat)。

## 覆盖矩阵与仍有空白

“目录覆盖完整”只表示指定公开目录中这段日期已扫过，不等于厂商所有渠道或全球更新全部查全。公开搜索间歇429、Jina上轮401；本轮主要直接读取官方HTML/RSS/模型卡，微软主博客部分直连403但web open成功。

| 厂商 | 已覆盖入口与时间范围 | 覆盖程度 | 尚未覆盖/待核 |
|---|---|---|---|
| xAI | [News](https://x.ai/news)全目录；[Bot changelog](https://x.ai/changelog/bot)9/8—10/11全部版本；[Console changelog](https://x.ai/api/changelog)覆盖9/8—9/30 | 上述目录完整；重要正文逐一打开 | Grok Build独立逐版本日志、地区/账户实时开关未逐项查；Transcribe2.0 API绝对首日仍有差异 |
| Meta | [Newsroom九月](https://about.fb.com/news/2026/09/)3页、[十月](https://about.fb.com/news/2026/10/)2页；[研究目录](https://research.meta.ai/)至10/15；Muse/Wonder/Open/SmallBusiness/MetaOne/Avatar/Connect正文 | 新闻与研究目录时间窗完整；模型和主要AI产品完整度较高 | AI眼镜具体硬件交付日、Muse各账户地区开关未逐项核；Avatar/Realtime Voice的API可用性待核 |
| Mistral | [News](https://mistral.ai/news/)全目录，窗口内7篇标题检查；Large4与Mozilla正文复核 | 新闻目录完整；已有Timestral保留 | Studio/Vibe/Le Chat帮助中心逐版本日志未完整扫；融资/客户合作/Fortran案例排除 |
| GitHub | [九月Changelog](https://github.blog/changelog/2026/9/)及[十月目录](https://github.blog/changelog/)全部标题；9/10、18、25、10/2、9周汇总及重要单独条目 | 官网Changelog窗口完整；重点产品已核 | VS Code各周release notes、所有IDE次要fix未逐条；10/15AI Scan/autofix标题见目录但未展开，作为可选次级待核 |
| Microsoft | Copilot/365博客目录及9/25主公告、9/23策略文 | 部分；9/25重点已核 | MAI研究模型目录直连403；消费者Copilot、Windows、Office逐产品release notes仍有空白。未宣称微软“无其他更新” |
| NVIDIA | [9月归档](https://blogs.nvidia.com/blog/2026/09/)4页、[10月归档](https://blogs.nvidia.com/blog/2026/10/)3页，并使用公开WP REST日期筛选校验46篇；Super/Bolt正文及模型卡 | Corporate Blog窗口目录完整 | Developer Blog独立模型文章未全扫；9/22Isaac ROS5偏机器人开发、采购/算力/客户案例排除。9/14Perplexity Portable Computer移交主代理查 |
| AWS | [Bedrock分类](https://aws.amazon.com/blogs/aws/category/artificial-intelligence/amazon-machine-learning/amazon-bedrock/)、[Nova分类](https://aws.amazon.com/blogs/aws/category/artificial-intelligence/amazon-machine-learning/amazon-bedrock/amazon-nova/)，9/14、21、28、10/5、13周报；Nova/Quick/BMA原始What’sNew | 重点模型与工作产品已核；非全量AWS目录 | AWS全部What’sNew、Nova Act、Alexa、Quick所有更新未全扫，不能声称Amazon全部覆盖 |
| Kiro | [Blog](https://kiro.dev/blog/)窗口内全部标题，Workflows/Students/CLI3/Sandbox正文 | Blog目录完整；重点功能已核 | IDE/CLI逐版本Changelog尚未完整扫；第三方模型仅归平台接入 |
| Runway | [Changelog](https://runway.com/changelog)窗口内全部条目，最新10/2，之后没有显示新条目 | 该日志完整；News动态列表只显示导航未可靠展开 | Research News需另查；Ruby8/20、Gen4.5等窗外不混入本期 |
| Adobe | 官方搜索与9/8、9/9原文 | 部分 | Firefly/Acrobat/Photoshop全目录未完成；10/7Acrobat检索正文重开受限，明确待核 |

## 不应误填的日期与负面结果

- Muse Spark1.3 是9/2、Muse Voice Transcribe是9/1、Muse Glimmer是8/10，虽研究目录有这些模型但都在本窗口前。本组不把它们挪到9/8后。
- Grok4.6是8/12、Imagine Image2.0是8/7，窗口内的控制台接入不是新模型首发。
- Mistral目录未找到窗内另一个确定的通用模型首发；不等于所有Mistral产品日志都没有更新。
- NVIDIA Bolt E4B4GB是10/23计划；Microsoft Today是10月私测计划；Muse眼镜是未来数月计划；Kiro CLI3月底默认与功能退役是计划。
- 10/19当日尚未看到本组覆盖目录中的新增发布；不据此推断全天或全球无更新。
- 临时原文缓存位于 `C:/Users/26365/.agent-reach/tmp/global-audit/`，报告与JSON是审计交付文件。
