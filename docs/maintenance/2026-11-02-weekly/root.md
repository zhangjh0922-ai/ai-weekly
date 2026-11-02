# 2026-11-02：OpenAI / Anthropic / Google 核查

核查区间 2026-10-19 至 2026-11-02（当日核查时已公开的信息），对照第 5 期和 144 条模型基线。以下为来源记录，不是产品实测。

## 收录的模型事件

| 日期 | 事件 | 一手证据与边界 |
| --- | --- | --- |
| 10/26 | GPT-6.1 Terra | https://openai.com/index/introducing-gpt-6-1-terra/ 及 https://help.openai.com/en/articles/9624314-model-release-notes 。Work / Codex / API；不是 Chat。标准输入/缓存/输出 1/0.05/5 美元每百万 token。 |
| 10/27 | Genie 4 | https://deepmind.google/blog/genie-4-a-new-generation-of-world-simulation/ 。可信测试者研究预览，后续消费者和开发者开放不能提前算已上线。 |
| 10/28 | Gemini 4 Carbon | https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/ 。部分防御人员及 Fairwind 伙伴受限开放，公众入口仍待开放；公告价格为推出时计划，不写成公开 API 当前价格。 |
| 10/30 | GPT-6 Rosalind Research | https://help.openai.com/en/articles/9624314-model-release-notes 及 https://developers.openai.com/api/docs/changelog 。组织和用户须获 Research 授权；Discovery 仍为 5.5。 |

## 产品与开发者变化

- 10/21 Claude Duet：公告 https://claude.com/resources/articles/claude-duet ；使用边界 https://support.claude.com/en/articles/17631495-get-started-with-claude-duet 。美国 Pro / Max / Ultra 候补预览，Team / Enterprise 未开放；运行在自己的云端电脑，不支持用户观看或接管浏览器。后台任务计入用量，Microsoft 365 未接入。产品总日志仅写 Pro / Max，采用事件专页及详细帮助页核对当前范围。
- 10/29 Gemini 文件直接编辑：https://blog.google/innovation-and-ai/products/gemini-app/edit-files-directly/ 。PDF 网页/移动端；文档、表格、幻灯片、Markdown、TXT、代码的直接编辑在网页端。面向 Gemini 已开放地区所有用户与语言。
- 10/30 Gemini Computer Use GA：https://ai.google.dev/gemini-api/docs/changelog 及 https://ai.google.dev/gemini-api/docs/computer-use 。支持 Interactions 和 GenerateContent；客户端仍负责执行模型提出的动作，不是 Gemini 消费 App 全面遥控电脑。
- 10/28 ChatGPT API 赠额：https://developers.openai.com/api/docs/guides/chatgpt-api-credits 。Pro 100/200/500 档对应同额美元，Business Standard 每付费席位20、Premium100，工作区每月封顶500；付费订阅至少7天、同邮箱且需持有目标组织。首次按比例，按账期到期，年度 Business 特别规则见原文。API key 使用 Codex 不受该权益支持，登录版 Codex / ChatGPT 用量不增加。
- 10/29 GPT-6 Chat 风格调整：https://help.openai.com/en/articles/9624314-model-release-notes 。Free / Go / 未登录，以及 Plus/Pro 限额后的备用模型；Plus/Pro 主模型未改。属于原模型更新，不新增型号。
- 10/27 iCloud Mail / Calendar 插件：https://help.openai.com/en/articles/6825453-chatgpt-release-notes 。所有套餐，web / desktop / iOS；需用户连接账户。
- 10/21 Claude API 和 SDK 大版本迁移：https://platform.claude.com/docs/en/release-notes/overview 及 https://platform.claude.com/docs/en/api/migration-2026-10-21 。包含不兼容变化。

## 已查但未在正文展开

- OpenAI API 10/22 Decisions GA、10/20 12小时缓存、10/21服务层级限制；不当新模型。
- ChatGPT 10/20锁定聊天（不改变既有保留/训练设置）、10/28 Text your dot（美国 Pro beta）、10/29 Pro部分档位用量、10/30移动端账户切换；并非所有套餐同时全面放开。
- Claude API 10/28请求体扩至128MB（第一方）、10/29分析API beta、10/30 Opus4.8 fast弃用公告（11/30移除，不能写整个模型已退役）；10/22 Google Cloud 托管接口属于平台可用性。
- Google API 10/26新付费项目 GenerateContent 默认 store=true（既有项目设置保留）、10/27 CLI beta。基础模型更新日志不是完整产品新闻目录，因此另查 DeepMind / Google 官方博客。
- OpenAI 10/26工作使用数据集是研究发布，不是新 ChatGPT Work 功能。

## 不作已发布模型收录

截至核查时，Claude Mythos 5.5 的二手预告/网站线索未获得正式发布与开放日期的官方确认，不加入本期已发布型号。没有把公告索引的 sitemap lastmod 当作模型首发日。

## 采集与自动化状态

本地 `collect --since=2026-10-19`：23 来源、274 候选、12 条 likelyRelease，来源请求失败数 0。候选标签仅用于筛选，不是事实核验。

11/2 定时工作流 41403371465 已采集并保存附件，但创建 PR 仍因仓库禁止 Actions 创建/批准 PR 失败。本次人工核查与发布独立完成；未更改仓库权限或将候选稿自动发布。该限制仍需单独维护，不能宣称自动发布恢复。

agent-reach Exa 429、Jina 401后，使用官方站点直连和内置网页工具读取正文；未将工具访问失败记为厂商没有更新。已执行 check-update，未在本任务升级本地工具。
