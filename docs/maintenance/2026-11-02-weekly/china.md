# 中国厂商周报证据稿：2026-10-19—2026-11-02

核查日：2026-11-02，北京时间。起点为 main `35aa91a` 的 144 条模型；只写本轮研究产物，未改生产文件、提交或发布。10 月 19 日为包含边界，避免漏掉上轮核查完成后同日发布的项目；最近一周优先，但保留两周内重要发布。本稿中的“新增”指相对任务起点，主任务合并期间生产文件可能变化。

结论：确认 **7 个新增型号**，见 `weekly-2026-11-02-china-models.json`。Kimi K3.1 Pro、MiniMax M3.1 Flash、Qwen 三个音频 API 型号、腾讯两款科研模型。Highspeed 是官方称同等效果的高速服务档位，没有独立训练／权重证据，因此并入 Pro 的 changes。Kimi 与 MiniMax 的完整权重仍是公告里的后续计划；Qwen 日期为官方平台明确记载的上架日，不声称是全球最早首发。腾讯两款的实际权重开放由官方仓库 News 证实。

## 12 个精选事件

| 日期与事件类型 | 已核事实、读者价值与条件 | 起点收录状态与原始来源 |
|---|---|---|
| **10/19 正式发布／API 与产品开放**：MiniMax M3.1 Flash | 已上线 MiniMax API、M Plan、MiniMax Code，主要增强 Agent、编程与电脑操作。匿名 Space Bunny 为其早期版本。公告列每百万 token 输入 $0.15、输出 $0.60、缓存输入 $0.015；速度近三倍、任务成本低 70% 均为厂商表述，未实测。**正文明确权重稍后发布，Pro 也仍是计划**。 | **边界新增**，模型库没有 M3.1 Flash；不能误当上轮已收。[正式全文](https://www.minimax.io/blog/minimax-m31f)、[模型日志](https://platform.minimax.io/docs/release-notes)。 |
| **10/23 Kimi Code 全量开放；10/24 综合公告**：Kimi K3.1 Pro / Highspeed | 3 万亿级、1M 上下文，面向代码、3D、金融与长程 Agent。24 日公告确认网页、App、Work、Code 和 API。Highspeed 官方称同等效果、2–3 倍速度，API 价格两倍。Code 中 Pro 的 Plus/Moderato 可用，1M 与 Highspeed 需 Pro/Allegretto 及以上；仅支持思考模式，关闭会返回 400，建议新会话。**完整权重承诺 11/4 前发布，截至本轮不写已公开**。 | **新增 Pro 一个型号，Highspeed并入服务档位说明**。日期选 10/23 表示最早已核的 Code 开放，不把官网文章日期覆盖产品日志。[Code 动态](https://www.kimi.com/code/docs/kimi-code/whats-new.html)、[24 日发布全文](https://www.kimi.com/news/kimi-k3-1-pro)、[技术说明](https://www.kimi.com/en/blog/kimi-k3-1-pro)、[会员与模型条件](https://www.kimi.com/code/docs/kimi-code/models.html)。 |
| **10/24 消费端功能开放**：Kimi 3D Make | 同一发布正文明确，kimi.com 与 App **已同步上线** 3D Make，可在线预览和编辑 3D 模型、下载用于 3D 打印，或导出视频／实况照片。适合创作读者作为“可立即尝试”的入口。不能把演示成功当成任意模型均可直接生产或打印；输出仍要检查。 | **产品新增，不另造模型**。[正文“3D 建模”章节](https://www.kimi.com/news/kimi-k3-1-pro)。 |
| **10/21、10/28 CLI 迁移与会话导入**：Kimi Code | 2.3.0 将插件技能改成 `<插件ID>:<技能名>`，裸名不再生效；远程控制流式传输上限由 10 MiB 升至 100 MiB。2.4.0 可导入近 15／30 天 Claude Code、Codex 会话继续处理；计划模式只能由用户开启，所有计划均要审阅。适合更换编程工具与旧脚本迁移。 | **产品新增**。来自两个实际版本日志，不把细小修复逐条凑数。[CLI 版本记录](https://www.kimi.com/code/docs/kimi-code-cli/changelog.html)、[用户可见动态](https://www.kimi.com/code/docs/kimi-code/whats-new.html)。 |
| **10/21 API 上架**：Qwen-Audio-3.1-TTS-Plus | 专业文本转语音，支持流式、多语言／方言、自由指令及情绪、音调、角色、语速、音量控制。Plus 侧重品牌声音、影视配音和角色表现；官方称参考音频有噪声／混响时音色克隆更稳。本轮未实测。 | **新增型号**；记录 QwenCloud 上架，未确认全球最早公告。[模型日志](https://docs.qwencloud.com/changelog/models)。 |
| **10/22 API 上架**：Qwen-Audio-3.1-TTS-Next | 将语音、音效、环境声统一生成，输入可包含文字、时间与参考声音，适合播客、音频剧和视频配声。当前指南列中英文、最多 3000 字符；播客最长 240 秒，其他场景 120 秒；参考最多三段、每段 30 秒且 10 MB 内。 | **新增型号**；不能只按日志中的“多语言”泛化成无限语言，也不能承诺任意长音频。[上架记录](https://docs.qwencloud.com/changelog/models)、[完整指南及限制](https://docs.qwencloud.com/developer-guides/speech/audio-generation)。 |
| **10/27 API 上架**：Qwen-Audio-3.1-Realtime-Flash | 实时双工文字／音频输入输出，支持工具调用、搜索及音色克隆；面向客服与语音应用。通过 WebSocket、WebRTC 或 AOQ 接入，API Key 分地区；文档列音频历史最多 50 轮、累计 300 秒，不能以 262K 文本窗口暗示无限音频记忆。 | **新增型号**，不是消费者 App 全面启用公告。[上架记录](https://docs.qwencloud.com/changelog/models)、[实时语音文档](https://docs.qwencloud.com/developer-guides/speech/qwen-audio-realtime)。 |
| **10/21 多区域、10/23 美国区开放**：QwenCloud | 21 日开放新加坡、北京、法兰克福、香港、东京，端点、密钥、工作区、模型与价格分区；旧 `maas.qwencloudapi.com` 继续指向新加坡。23 日美国 Virginia 上线，实时调用／Try AI／账单可用，Batch、数据集、微调、评估、部署和警报在该区尚不可用。 | **平台新增**，对开发者选区和迁移有价值。[平台日志](https://docs.qwencloud.com/changelog/platform)。10/27 Qwen3.8-Flash 新增德国／香港服务范围，10/26 GLM-5.3 新增美国范围均属于旧型号地域上架，不另建模型。 |
| **10/27 服务别名迁移**：QwenCloud 的 DeepSeek V4.1 Flash | `deepseek-v4.1-flash` 自动转向 `deepseek-v4.1-flash-1017`，计费项目与价格不变。原厂 1017 已在上轮收录，此次是第三方托管平台切换，读者已有调用的实际行为会变化。 | **平台事件新增，模型已收**，不重复造 1017 型号。[迁移公告](https://docs.qwencloud.com/changelog/model-updates/deepseek-v4.1-flash-upgrade)、[原厂日志](https://api-docs.deepseek.com/updates/)。 |
| **10/26 版本发布／重要迁移**：MiMo Code v0.1.16 | 退役 legacy Compose 主智能体、内置 workflow 与 `compose:*` 技能，复杂任务改用 build 模式下 `/compose-next`。MCP 工具默认按需发现；npm 包目前仅启动器，完整体验推荐原生安装。实验 Orchestrator 移除，Claude 会话导入和 agent-CLI 技能需环境变量明确启用。 | **产品新增，无新主模型**。从官方 release 的 Upgrade notes 取事实，没有把众多 PR 修复等同独立发布。[完整版本说明](https://github.com/XiaomiMiMo/MiMo-Code/releases/tag/v0.1.16)。 |
| **11/2 官方研究发布＋部分成果开放**：腾讯 Hyra 2.0 | 多 Agent 研究系统将目标从单次解题扩展到研发科研工具。公告介绍任务队列、独立复核和长期记忆；**不能写整个 Hyra 2.0 Harness 已对普通用户开放**。官方成果仓库明确当天发布 HyInv（1.96M）和 HyPLM-Flash（650M）的权重、代码与报告：前者做蛋白质逆折叠，CPU/GPU 可用；后者做蛋白质序列表征，需 CUDA。仅报道科研能力与公开工件，未复现论文效果。 | **两个科研型号新增**。中文博客列表 `displayPublishTime` 与展示日期为11/2；不使用其较早的草稿创建字段。开放证据是 README News，不用仓库创建时间。[官方中文公告](https://hunyuan.tencent.com/blog/hyra2)、[官方 News](https://github.com/Tencent-Hunyuan/hyra-results#news)、[HyInv](https://github.com/Tencent-Hunyuan/hyra-results/tree/main/AI4Science/hyinv)、[HyPLM-Flash](https://github.com/Tencent-Hunyuan/hyra-results/tree/main/AI4Science/hyplm_flash)。许可未单独审查，不承诺任意商业使用。 |
| **11/2 方案公告**：Kimi 游戏开发与创意工作方案 | 基于 K3.1、Code、Work 与 Unity／Unreal／Blender 等工具插件，覆盖试玩原型、工程修改、资产制作和玩家反馈整理。正文提供销售与桌面入口；按方案与工作流发布报道，**不等同所有插件全量免费或任何项目都能在固定时间完成**。 | **方案新增，不另建模型**。日期由官方新闻目录的11/2卡片与全文“今天发布”共同确认。[新闻目录](https://www.kimi.com/news/)、[完整方案](https://www.kimi.com/news/kimi-game-solutions)。 |

## 覆盖与排除

| 厂商 | 本轮实际打开的主要入口 | 结论及剩余边界 |
|---|---|---|
| Qwen／阿里 | QwenCloud 模型、平台和模型迁移日志；音频生成和实时语音完整指南；Qwen Code 官方 release API 最近50条；Qwen官网／博客定向搜索 | 确认上述音频和平台事件。CLI/Desktop 到0.26.5有稳定发布，未把大量 PR 标题单独凑成周报。Qwen官网搜索中的空正文10/19页面不作发布证据；未穷尽国内百炼与所有App灰度。 |
| DeepSeek | 完整官方 Change Log、QwenCloud迁移全文 | 原厂最新仍为10/17 Search/Fetch与Flash-1017，均为上轮；仅10/27托管切换为本轮。未把原厂日志空档扩展成“全渠道没有更新”。 |
| Kimi | 官网研究目录、新闻目录、K3.1完整公告／技术博客、Code动态、CLI完整日志、模型权益、11/2方案全文 | 已覆盖主要发布与可用性。搜索缓存曾显示10/28 Computer Use Windows支持，但当前最新动态与CLI正文未显示相同条目，**不据搜索摘要收录**；记忆帮助页只写“自10月起逐步升级”，缺少本区间精确日，不纳本轮新品。 |
| 智谱／Z.ai | 国际 `docs.z.ai/release-notes/new-released`、中文 `docs.bigmodel.cn/cn/update/new-releases` 完整模型／产品日志 | 最新主模型仍8月GLM-5.3/Flash。10/16 API Key分类在上轮已核；本轮无独立新增型号。日志未覆盖全部智谱消费产品／私域公告。 |
| 腾讯混元 | 官方中文博客 POST `https://api.hunyuan.tencent.com/api/blog/publicList`（12条，含完整正文）、Hyra成果README与两款模型卡 | 11/2 Hyra2及科研工件新增；Hy4、Image3.5、Hy-Memory为旧项。中文列表必须设置 `accept-language: zh`，英文目录可能不全；元宝独立App灰度及腾讯所有研究组未穷尽。 |
| 小米 MiMo | 官网完整研究／博客目录，MiMo-Code官方release API最近20条及v0.1.16升级说明 | 主要模型仍V2.6；重要新增为10/26开发工具迁移。官网显示MiMo Desktop入口，但没有已核区间首发日，不能凭入口出现当新发布。 |
| 阶跃星辰 | 官网新闻页加载的当前官方JS全文，提取完整公告目录日期 | 最新核心公告仍9/20 Step 5 Preview，随后9/15音频系列；上轮已收。未重新复原每个开放平台子服务和Step5精确权重转公开日。 |
| 字节 Seed／豆包／即梦 | 官方 foundation、visual、audio 三类按新到旧目录全文 | 最新主项仍Seed2.1（6/23）、Seedance2.5（7/31）、SeedRealtime（8/5）。未确认本区间新主模型；豆包／即梦App内灰度与火山全量更新日志未完全覆盖，不能写成绝对无更新。 |
| MiniMax／海螺 | 英文官网新闻入口、API模型发布日志、M3.1完整技术文章 | 10/19 M3.1 Flash确定新增。消费端海螺／Design全部灰度日志未覆盖；不把旧H3的10月推广文章当新模型。 |
| 快手可灵 | 当前release入口、release sitemap、blog sitemap；10/26官方《AI Video Generation News》正文 | 当前发布索引仍指向4.0；10/26正文再次明确4.0实际全面发布日10/15。两周内多数新博客为教程／行业回顾，无证据可把它们写成新模型开放；当前页面客户端正文此次未重新完整渲染，因此保留该覆盖边界。 |

官方目录链接：[Qwen](https://qwen.ai/)、[Z.ai](https://docs.z.ai/release-notes/new-released)、[智谱中文](https://docs.bigmodel.cn/cn/update/new-releases)、[MiMo](https://mimo.xiaomi.com/)、[阶跃](https://www.stepfun.com/news)、[Seed基础](https://seed.bytedance.com/en/blog_list/foundation)、[Seed视觉](https://seed.bytedance.com/en/blog_list/visual)、[Seed音频](https://seed.bytedance.com/en/blog_list/audio)、[可灵回顾正文](https://kling.ai/blog/ai-video-generation-news)。

## 取证与后续注意

- 使用 agent-reach 搜索／网页路由。Exa 一次调用遇429（客户端自动重试后仍失败），停止该后端；web搜索可用，官方HTTP、模型README与GitHub release API承担完整正文核查。未登录付费产品、未调用收费模型、未做性能横测。
- 原文在 `C:/Users/26365/.agent-reach/weekly-china-20261102/`，未将下载原文放入生产目录。核心原文包括 `tencent-list.json`、`hyra2.md`、`kimi-pro-news.txt`、`kimi-cli.txt`、`minimax-m31.txt`、`qwen-ds-migration.txt`、音频指南及发布API返回。
- 严格不用 Hugging Face `createdAt`、GitHub仓库创建时间或 sitemap `lastmod` 充当发布日。可灵sitemap仅用于发现入口；腾讯日期取页面展示字段并与News核对。
- Qwen音频型号的“新增”采用本次区间内可确认的官方上架事件，`note`已明确日期口径；若编辑只收全球首次，应保留为API更新而暂不并入模型首发时间线。
- Kimi Hosted Agents 在10/24文章里已出现，但没有独立精确首发证据，未另列“当日新发布”。腾讯HyFF／HyQEC在文章里有科研进展，未核到与本轮同等明确的公开工件证据，不增型号。
- `agent-reach check-update` 已执行，GitHub API 限流，无法确认工具是否有新版；不因此中断周报任务。
