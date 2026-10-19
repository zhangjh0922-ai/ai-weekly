# 2026-10-19 模型补录核查

上次正式稿为 9 月 7 日，恢复维护时却只采集最近 7 天，漏掉了停更期间的发布。10 月 19 日从 9 月 8 日重新采集，得到 326 条候选，确认包含 OpenAI 9 月 22 日的 Sol / Luna 与 9 月 29 日的 GPT-6.1 Sol 正式公告。此次依据官方公告、模型文档和发布日志补录 15 条，模型时间线由 101 条增至 116 条。

## 已确认的补录

| 发布日期 | 模型 | 日期与说明来源 |
| --- | --- | --- |
| 10-15 | Timestral | [Mistral 公告](https://mistral.ai/news/timestral/) |
| 10-07 | Claude Haiku 5.5 | [模型页](https://platform.claude.com/docs/en/models/haiku-5-5) |
| 10-06 | Nano Banana 2.1 | [Gemini API 日志](https://ai.google.dev/gemini-api/docs/changelog) |
| 10-06 | Mistral Large 4 Preview | [Mistral 公告](https://mistral.ai/news/mistral-large-4/)，仅 API 预览，放权重仍为计划 |
| 09-29 | GPT-6.1 Sol | [OpenAI API 日志](https://developers.openai.com/api/docs/changelog) |
| 09-28 | Claude Sonnet 5.5 | [模型页](https://platform.claude.com/docs/en/models/sonnet-5-5) |
| 09-22 | GPT-6 Sol、GPT-6 Luna | [OpenAI API 日志](https://developers.openai.com/api/docs/changelog) |
| 09-22 | Gemini 3.8 Flash TTS、Flash-Lite TTS | [Gemini API 日志](https://ai.google.dev/gemini-api/docs/changelog) |
| 09-15 | Gemini 3.8 Live、Live Extended Thinking | [Gemini API 日志](https://ai.google.dev/gemini-api/docs/changelog) |
| 09-08 | GPT Image 2.5 Sunburst、Flare | [OpenAI API 日志](https://developers.openai.com/api/docs/changelog) |
| 09-02 | Gemini 3.8 Flash | [Gemini API 日志](https://ai.google.dev/gemini-api/docs/changelog)，额外旧漏项 |

第 4 期中明确区分本周新闻与近期补录；模型日期不使用本站补录日。未进行模型横向实测。

## 覆盖边界与后续核查

本次重点核对 OpenAI、Anthropic、Google、DeepSeek、Qwen、Kimi、GLM 和 Mistral 的主要官方入口。没有系统审计所有厂商、区域 API 和模型快照。DeepSeek 两次近期主版本已收录；Kimi 与 GLM 本次所查官方入口未发现区间内新增主版本，但不能据此断言不存在所有更新。

[QwenCloud 模型日志](https://docs.qwencloud.com/changelog/models)另有以下 API 上架记录，尚不能统一视为首次发布日期，应继续核对第一方公告和模型卡：

- 9 月 17 日：qwen3.8-livetranslate-flash-realtime。
- 9 月 18 日：qwen3.8-omni-flash。
- 9 月 20 日：qwen-audio-3.1-realtime-plus。
- 9 月 21 日：qwen3.8-omni-flash-realtime。
- 9 月 24 日：decision-model-preview。
- 10 月 2 日：qwen-image-2.1-pro，需确认托管名称与已收录权重的关系。
- HappyOyster 1.0 的不同云端日志存在 9 月 17 日 / 18 日差异，保留待核。

另发现需单独复核的历史日期差异：Fable / Mythos 5.1 的 Claude 平台日志记 9 月 1 日，而旧时间线记近似 9 月 3 日；GLM 5.3 / 5.3 Flash 的厂商公告日期与旧表 HF 创建时间不同。应查清正式发布和平台开放口径后再修订，不能简单用平台时间覆盖其他日期。后续[秋季全面复核](2026-10-19-autumn-audit.md)已用 Claude 产品与 API 两份日志确认 Fable / Mythos 为 9 月 1 日并修正；GLM 日期差异仍待厘清。

## 流程修复与限制

- 默认采集窗口至少 7 天，停更后自动回溯到最近已发布稿日期；草稿不作为基准。已有新稿不能证明旧缺口已补齐，本次必须显式指定 `--since=2026-09-08`。
- 模型标题提取保留 Sol、Luna 等后缀；同公告明确列出多个型号时分别生成候选，去重不再仅依赖共同 URL。
- RSS 留存、来源条数上限和标题中未出现型号，仍然可能造成遗漏。自动化成功和测试通过只能验证流程，不能证明内容覆盖完整；发布前仍需对照官方模型目录与更新日志。
