# 2026-11-02 周一更新：全球扩展组核查

核查窗口：2026-10-19—2026-11-02（含首尾）。基线：`main` 35aa91a 的 `data/models.json`，144 条；上次审计截至 10 月 19 日。只采用官方公告、官方更新日志和官方模型卡，未实测。此文件为编辑材料，不改生产数据。

## 建议优先采用的 12 项事件

| 日期与性质 | 内容、使用条件与编辑边界 | 官方正文 | 已收／新增 |
|---|---|---|---|
| **10-29 改进模型开放权重** | **Mistral Large 4（Le Chonk）**兑现月底权重计划。相比 10-06 API 预览，继续强化训练后改进编程、防御安全、推理效率；增加 low / medium / high 三档推理，low 替换 none。可下载并用 vLLM / SGLang 自部署，也进入 Vibe Code。Mistral Ecosystem Open-Weight 为修改版 MIT，经营 Model-as-a-Service 业务需另获商业许可。新 API 价为每百万 token 输入 $0.70、缓存 $0.07、输出 $2.10。**受审核企业伙伴的专用网络安全变体是有限预览，不是全部公开权重的另一款通用模型。** | [10-29 公告](https://mistral.ai/news/mistral-large-4-oss/)、[官方权重卡](https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B) | 已收 `mistral-large-4-preview`；建议更新旧项状态、名称与 changes，保留 10-06 API 预览历史，不重复新增基础型号 |
| **10-20 公开预览** | **Voxtral 3 四款音频模型与 Voice Agents SDK**：Mini Transcribe、Small Transcribe、Mini Transcribe Realtime、TTS。转写覆盖 50+ 语言；TTS 覆盖 35+ 语言、50+ 方言。SDK 把转写、可替换 LLM、工具调用与语音合成串成双向实时链路，支持 SIP / WebRTC。四款模型在日志与模型卡均为 **Public Preview**；API 可用、自部署需联系团队，不能写成四款权重已公开下载或单一端到端语音模型。 | [发布正文](https://mistral.ai/news/voxtral-3/)、[官方日志](https://docs.mistral.ai/resources/changelogs) | 四个独立型号均新增，进入候选 JSON |
| **10-21 开放模型** | **Nemotron 3.5 Retriever**新增 Embed 8B、Embed 1B、Rerank 8B 和 Parse 631M：前两者检索文字与文档图像，Rerank 对候选证据重排，Parse 保留阅读顺序、表格与图表结构，输出 Markdown / HTML 等。是检索和文档处理组件，不是四个聊天助手；Embed 1B 的 BF16 / NVFP4 是精度版本，合为一个型号。 | [NVIDIA 官方 Hugging Face 技术文章](https://huggingface.co/blog/nvidia/nemotron-retriever-world-class-agentic-retrieval) | 四个独立型号均新增，进入候选 JSON |
| **10-23 权重与服务开放** | **Nemotron 3.5 Bolt E4B 4GB**兑现上次审计的计划。模型卡明确列出 Hugging Face 与 Build.NVIDIA.com 的 Release Date 均为 10/23/2026；8B 总参数、4B effective，Q4_K_M 版本面向低内存本地助手和多轮工具使用。**输入输出是文字，面向语音助手不代表模型原生音频输入。**HF 仓库 createdAt 为 10/05，不采用为首发日。 | [官方模型卡](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB)、[10-28 已可用回顾](https://blogs.nvidia.com/blog/local-ai-rtx-spark-laptops-updates-models-agents-games/) | 新增，进入候选 JSON；已有 Super VL / Bolt 74B 的“E4B 仍计划”说明需同步修订 |
| **10-28 发布并开放权重** | **Nemotron 3.5 Transcribe 30B-A4B**将转写、说话人归属、翻译及音频问答合入可用提示词控制的离线录音模型。支持 40 语言、最长 1 小时录音、65,536 token；包含音频编码器为约 34B 总参数、4.3B 激活，名称中的 30B 不等于全部参数。10-28 正文称量化版本 coming soon，而本次模型卡已列 FP8 / NVFP4，可写“当前模型卡已提供量化入口”，不能倒填量化首发日。 | [10-28 正文](https://blogs.nvidia.com/blog/local-ai-rtx-spark-laptops-updates-models-agents-games/)、[官方模型卡](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B) | 新增，进入候选 JSON；不与已有 0.6B 流式 ASR 混同 |
| **10-21 工具与检查点开放** | **NVIDIA Cosmos**新增 Data Factory 五类蓝图（驾驶数据、图像属性、事件视频、缺陷图像、视频增强），扩展训练、优化和部署工具，并提供 Cosmos 3 Nano 仿真检查点及 VSS 3.3。正文强调工具与仿真流程；综述称 Cosmos 3.5，但专文写 Cosmos 3 / Nano，暂不根据一处统称新增“Cosmos 3.5”模型条目。 | [Cosmos 专文](https://blogs.nvidia.com/blog/cosmos-open-train-evaluate-deploy-world-models/)、[模型总览](https://blogs.nvidia.com/blog/open-models-europe-industry/) | 新增产品事件；具体检查点首次公开日期未逐项核，不入 JSON |
| **10-27 地区开放** | **Muse 在新加坡上线** iOS、Android 与 muse.ai，接入本地常用购物、出行和旅游服务的路线公布。Shopee、Grab、Singapore Airlines、Agoda、ShopBack、Klook、Trip.com、Lazada 等连接器功能是渐进推出，部分在首发后才开放；AI 眼镜接入仍 coming soon。发送邮件、购买等敏感操作需确认。 | [Meta 新加坡公告](https://about.fb.com/news/2026/10/muse-is-now-available-in-singapore-the-worlds-first-personal-ai-agent-built-for-everyone/) | 新增地区事件；不是 Wonder / Spark 的新模型首发 |
| **10-27，Grok Bot v0.78.1（含 0.78.0）** | **购物卡、订单追踪、Shop Pay 与订阅模板**：展示商品图、价格、评级与商店，购买需确认，订单后可跟踪物流。模板可开启试用并在扣款前取消或提醒、查找闲置订阅、监测续费价格；取消或变更订阅需先确认。Team Bot 管理者可在其 Vault 配团队登录凭证。 | [Grok Bot 更新日志](https://x.ai/changelog/bot) | 新增产品变化；不另建 Grok 模型条目 |
| **10-22 地区开放；10-26 文档更新／10-28 发布公告** | **Amazon Quick**进入新加坡 AWS 区域，数据在该区域存储处理；另推出 **Smart Approvals**，默认开启，由独立审查模型检查用户设置为“每次询问”的合格动作。现有拒绝规则优先，不授予新权限；对外发送、权限变更、删除、付款等高影响行为交人审，失败或超时亦交人审。用户可关闭，管理员可控制，CloudTrail 记录审查。10/26 是文档历史，10/28 是 What's New 公告，不能混为同一个首发证据。 | [新加坡公告](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-quick-now-available-in-the-aws-singapore-region/)、[Smart Approvals 公告](https://aws.amazon.com/about-aws/whats-new/2026/10/quick-smart-approvals-agentic-actions/)、[文档历史](https://docs.aws.amazon.com/quick/latest/userguide/doc-history.html) | 新增产品变化；审查器未公布独立型号，不入 JSON |
| **10-20 功能开放** | **Kiro 本机记忆**保存工作偏好、仓库惯例、纠错与排障经验；同一机器的 IDE / CLI 共用，可全局或限定仓库。默认关闭，可检索、查看与删除；启用后召回内容占上下文。条件：IDE 1.4.0+、CLI 2.29.0+ 的本地 V3 会话；CLI 权限变更新会话生效。 | [Kiro 记忆公告](https://kiro.dev/blog/memory-in-ide-cli/) | 新增产品变化 |
| **10-28 Web；10-29 CLI 2.36.0** | **Kiro 工作流与审批**：Web 新工作流创建步骤可给用户检查计划，缺信息会询问，计划列明代理、模型、推理强度与第一项任务；默认连续两次评审拒绝后暂停，工作流自带上限优先。CLI 的 Approve for me 在交互式 V3 会话按工作区启用，现有 deny / ask / allow 规则先处理，只审查未决动作；界面未提供时仍人工审批，不能说所有账户自动启用。 | [Kiro 版本日志](https://kiro.dev/changelog/) | 新增产品变化 |
| **10-27 公告；11-01 生效** | **Kiro 新试用与按比例计费**：首次从免费升级，当前月剩余时间的 Pro 免费，附 500 trial credits，12 个月过期；升级更高档只减去按比例的 Pro 费用。以后升级按剩余秒数分摊价格和额度，不再一律发整月额度；试用只限首次升级。不能写成每次升级都免费一个完整月。 | [Kiro 试用公告](https://kiro.dev/blog/kiros-new-free-trial-gives-you-500-extra-credits/) | 新增且本期已经生效的使用条件变化 |

## 模型目录合并建议

候选文件 `output/weekly-2026-11-02-global-models.json` 含 **10 个已确认且基线未收的独立型号**，不带 issue。没有将精度变体、Voice Agents SDK、Smart Approvals 分类器或产品版本建立为新模型。

- `mistral-large-4-preview`：建议名称改为 Mistral Large 4，保留最早 API 预览日期 2026-10-06，note / changes 明确 10-29 改进权重开放与新许可；tags 删除“权重待发布”，添加“开放权重”。不要覆盖掉预览与权重发布是两种事件的历史。
- `nemotron-3-5-super-vl` 与 `nemotron-3-5-bolt-74b-a9b`：旧 note / changes 中“Bolt E4B 仍是 10/23 计划”已过时，应改为“后于 10/23 另行开放”，或删去跨型号状态说明。
- Voxtral TTS 3 文档标题使用 TTS 3，公告写 Mini TTS 3；候选名称用 **Voxtral Mini TTS 3**，note 保留 API id `voxtral-mini-tts-3-0` 以便消歧。
- Bolt E4B 模型卡写 8B total / 4B effective，不能把 E4B 直接解释为 MoE 每 token 激活 4B；它是 Gemma 4 E4B 派生模型。

## 实际覆盖与尚待核实

| 厂商 | 实际覆盖 | 空白与排除项 |
|---|---|---|
| xAI / Grok | News 目录截至 10/27；Bot 日志最新 0.78.1（10/27）；Build 日志最新 1.0.70（10/23），含 10/19 边界；Console 日志截至 9/30；开发者 Release Notes 搜索正文有 10/27 自定义内容指南 | 10/20 事故处理与 10/27 销售 Bot 为案例而非新基础模型，10/22 合作伙伴网络不当模型发布。没有在这些目录找到窗口内新 Grok 型号，不等于所有渠道都无变化。API 自定义 moderation 仅作为次级候选，未深挖完整参数文档 |
| Meta / Muse | Research 首页至 10/28、Newsroom 10 月目录与新加坡原文 | 10/28 大学研究合作不当新模型。未逐项检查 Muse 每个地区/账户的实时开关，未完整翻遍 Newsroom 历史分页；不声称全球覆盖完毕 |
| Mistral / Vibe / Le Chat | News 完整目录，10/20、21、29 条目；API changelog；四款 Voxtral 模型卡；Large4 10/29 公告与权重卡 | 10/21 与 NVIDIA 工业工程合作主要是合作与后续工作，未作当日新产品。Vibe 独立逐版本日志、全部帮助中心未全扫。旧 API changelog 10/06 段仍写权重即将开放，以 10/29 新公告为后续状态依据 |
| NVIDIA | Corporate Blog WP REST 日期筛选 10/19—11/02 共 28 篇，展开模型总览、Cosmos、本地 AI 两篇；官方 HF 技术文章、Bolt / Transcribe 模型卡 | 已确认 Kumo 新结构化数据模型家族与 RFD4-Proteina 在 10/21 总览宣布可用，但具体型号与首发历史未逐卡核，不入 JSON。Alpamayo 2 Edge 在 10/21 仍写月底计划，尚未证实兑现；Cosmos 3.5 总览命名与 Cosmos3 专文不一致。Developer Blog 未全面扫描，科研专用权重仍有空白 |
| Amazon / Nova / Quick | AWS News 首页、Nova 分类（最新 Nova 条目仍为 10/13 周回顾）、10/26 AWS 周报、Quick 精确搜索与原始公告／文档历史 | 未找到已完整核验的新 Nova 独立型号；不能据此声称 Amazon 没有模型更新。AWS 全部 What's New、Nova Act、Alexa 未全扫；Polly 引擎 10/26 回顾、AWS Continuum GA 是额外候选，未占本组 12 项核心表 |
| Kiro | Blog 全目录至 10/30、Changelog 最新条目至 10/30，记忆与试用正文 | Haiku 5.5 日志为 10/23 实验接入、10/26 博客回顾；10/21、30 多款模型去实验标签是平台 GA，不改原厂首发日。10/28 学生扩 41 所大学属可选条目。CLI3 月底成为默认的计划未据旧文强行写已兑现，当前版本日志仍 2.36.0 |

## 取证过程说明

先按 agent-reach 的 Exa / Jina 路由尝试；Exa 返回 429（免费额度限制），Jina 返回 401（匿名网络信誉限制）。失败后切换 web 浏览与官方 HTTP / HTML / RSS / 模型卡，没有反复撞限流。临时正文保存在系统 TEMP 的 `weekly-global-20261102` 目录。研究结论不把搜索摘要、Hugging Face createdAt、模型训练日期或厂商性能宣称当作独立证实的首发或实测结果。
