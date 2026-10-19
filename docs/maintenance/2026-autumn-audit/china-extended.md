<!-- 来源核查阶段的记录快照；最终合并结果、数量与修订以 ../2026-10-19-autumn-audit.md 为准。 -->

# 中国厂商扩展核查：2026-09-08—2026-10-19

核查日期：2026-10-19（Asia/Shanghai）。范围：字节 Seed／豆包／即梦、腾讯混元／元宝、MiniMax／海螺、百度文心、小米 MiMo、阶跃星辰、快手可灵。本文是证据审计稿，未修改生产文件。

已确认 14 个可新增型号，见同目录 `audit-2026-autumn-china-extended-models.json`。型号、日期、事件含义分开记录；Pro/Flash 独立，权重精度、分片、RL/MOPD 阶段不重复拆型号。JSON 的 `date` 指首次可核实的本轮发布／开放事件，并不统一表示普通用户全面可用日期。无 `issue` 字段；仅 MiMo Pro 的 `prev` 已有直接系列证据。

对照任务开始时的 116 条模型与 `2026-w42.md`，下列 14 项均未收录；腾讯原有 Hy4 preview、Hy3、翻译与具身模型，不覆盖下述图像、语音与记忆发布。工作期间主任务并行整合，最终结构检查时生产库已有 144 条并包含本稿 14 个 ID；本稿的“新增”以核查起点为基准，不应二次插入。

## 方法与覆盖边界

本轮实际打开官网正文、官方前端承载的完整公告、官方 API 返回的文章内容、官方仓库模型卡和公开发布历史。搜索工具本轮仍遇 429，主要使用直接 HTTP；可灵客户端页面通过浏览器实际渲染读取。来源原文缓存位于 `C:/Users/26365/.agent-reach/audit-china-20261019`，未把下载的第三方材料放进仓库。

两个容易漏报的方法问题：

- 腾讯博客目录语言不对称。官方 `https://api.hunyuan.tencent.com/api/blog/publicList` 使用 `accept-language: zh` 返回 11 条文章；默认英文目录只有 9 条，其中没有 9 月 22 日 Hy Image3.5 preview。必须核中文目录。
- Hugging Face 仓库创建、权重提交、更新时间都不自动等于公开发布日。AuK 仓库 8 月已经建立，官方 News 却明确 9 月 9 日开源；如果只筛 9 月以后创建的仓库，会漏掉它。Step 5 的原公告还将权重公开列为未来计划，不能用此前仓库创建时间覆盖公告。

| 厂商 | 本轮实际覆盖入口 | 已核结果 | 剩余边界 |
|---|---|---|---|
| 字节 Seed／豆包／即梦 | Seed 基础、视觉、音频三类博客目录与 sitemap；ByteDance-Seed 官方模型目录 | 目录内最近核心型号均早于 9/8；Seedance 2.5 是 7/31 发布，不能因 10 月被第三方接入重记为首发 | 豆包与即梦 App 内灰度、区域版本、付费权益缺少完整公开日志；不能宣称没有产品更新 |
| 腾讯混元／元宝 | 中英博客 API、Hy-Memory 官网与 GitHub、腾讯 HF 模型卡，含创建早但近期公告的 AuK | Image3.5 preview、AuK/Flash、Hy-Memory 已确认；元宝在图像公告中有灰度说明 | Youtu/WeVisDoc/EVIE 已见实物，精确首发日待核；元宝独立 App 发布历史未完整复原 |
| MiniMax／海螺 | 中英新闻 API、模型 API 更新日志、研究入口、官方 HF 目录 | 范围内确认 IP 合作公告；未从已读日志确认新的独立模型首发；H3 为此前型号 | 消费端海螺／MiniMax Code／Design 的所有灰度更新未有完整时间轴；动态研究列表未完整恢复 |
| 百度文心 | ERNIE 官网与中文博客目录、官方模型目录 | 已读博客没有本范围内可确认新首发；原有 OCR 与图像型号更早 | 千帆全产品日志和文心 App 内更新未系统复原，不能据此断言无更新 |
| 小米 MiMo | V2.6 完整发布文章、工具重复问题文章、官方 HF、MiMo Code release | 9/22 Pro/Flash、9/25 API 修复（9/27 公告）、MiMo Code 同期更新 | Distill-Qwen-9B 精确日期待核；MOPD 的独立公开权重时刻不以 HF 创建时间代替 |
| 阶跃星辰 | 官网新闻完整数据、StepAudio 专题、Step 5/HF 许可、实时语音文档 | 9/15 五款音频型号、9/20 Step 5 Preview | StepAudio 3 Chat 当前存在，但单独首发日未证实；Step 5 权重实际转公开时刻待核 |
| 快手可灵 | 站点地图、9/30 官方文章、浏览器打开完整 Release Notes 与 Release History | Flash 9/28 限定开放；4.0 9/30 早期公告、10/15 全面开放；当前 MCP/CLI 已列出 | 早期与当前套餐范围须区分；HDR/2 分钟延长仍为计划；MCP/CLI 单独生效日不明 |

覆盖表示本轮实际核查面，不是对全部产品、地区或灰度渠道作绝对无遗漏保证。

## 已核新增型号与日期

| 型号 | 实际事件日期 | 公告日期与含义 | 普通用户影响与限制 | 主要原文 |
|---|---|---|---|---|
| AuK | 9/9 代码与权重开放 | 模型卡 News 明记 2026/09/09 | 统一语音生成、内容修改、情绪/语速调整、增强与分离；MIT。主模型 1.5B 之外仍需配套编码器 | [官方模型卡](https://huggingface.co/tencent/AuK/raw/main/README.md) |
| AuK-Flash | 9/9 代码与权重开放 | 同上，卡中明确蒸馏型号 | 同一任务接口、4 步推理；MIT，步数不是任意设备固定加速倍数 | [官方模型卡](https://huggingface.co/tencent/AuK-Flash/raw/main/README.md) |
| StepAudio 3 Realtime | 9/15 已上线开放平台 | 9/15 系列公告 | 全双工打断、边想边说、后台异步任务；当前预览型号限免后将下线并增加正式付费版 | [系列公告](https://www.stepfun.com/news/stepaudio-3)、[当前文档](https://platform.stepfun.com/docs/zh/guides/models/stepaudio-3-realtime) |
| StepAudio 3 ASR | 9/15 已上线开放平台 | 同一系列公告明确五款均上线 | 录音转写、中英方言混合与术语；结果依录音与领域而变 | [系列公告](https://www.stepfun.com/news/stepaudio-3) |
| StepAudio 3 TTS | 9/15 已上线开放平台 | 同上 | 流式语音、风格与情绪控制，适合朗读配音 | [系列公告](https://www.stepfun.com/news/stepaudio-3) |
| StepAudio 3 Gen | 9/15 已上线开放平台 | 同上 | 语音、音效、环境声、音乐统一生成，文字/参考音频与时间控制 | [系列公告](https://www.stepfun.com/news/stepaudio-3) |
| StepAudio 3 Music | 9/15 已上线开放平台 | 同上 | 歌词、参考歌曲、ABC 乐谱，作曲/伴奏/多轮编辑 | [系列公告](https://www.stepfun.com/news/stepaudio-3) |
| Step 5 Preview | 9/20 API 与 Studio 开放 | 9/20，公告计划 10/15 开权重 | 600B/27B、百万上下文、文本视觉、编程与长任务。核查时已有官方权重；许可为 StepFun Model License 1.0，含额外商用条件 | [公告](https://www.stepfun.com/news/step-5-preview)、[模型卡](https://huggingface.co/stepfun-ai/Step-5-Preview/raw/main/README.md)、[许可](https://huggingface.co/stepfun-ai/Step-5-Preview/raw/main/LICENSE.txt) |
| MiMo-V2.6-Pro | 9/22 发布与开放权重 | 官方文章顶部 September 22nd, 2026，并明确当日 release/open-source | 1.02T/42B、百万上下文、文字图像视频音频，面向代码/文档/工具任务；MIT，部署资源仍很大 | [完整官方文章](https://mimo.xiaomi.com/mimo-v2-6/article.html)、[模型卡](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL/raw/main/README.md) |
| MiMo-V2.6-Flash | 9/22 发布与开放权重 | 同上 | 309B/15B，效率侧重，百万上下文与多模态；MIT | [文章](https://mimo.xiaomi.com/mimo-v2-6/article.html)、[模型卡](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Flash-RL/raw/main/README.md) |
| Hy Image3.5 preview | 9/22 公开发布 | 中文原文封面与 publicAt 均为 9/22；UTC 字段转中国时间一致 | 最多 5 张参考、2K、连续编辑、文字布局；Studio/API 与元宝等入口。此前元宝灰度不等于全量发布 | [中文公告](https://hunyuan.tencent.com/blog/hy-image35-preview) |
| Kling 4.0 Flash | 9/28 对 Ultra 年费订阅用户早期开放 | 9/30 文章追溯明确 9/28 起 | 当前规格 3–20 秒、720p、8-bit SDR；不能照搬 4.0 的所有规格或把早期付费条件删掉 | [9/30 公告](https://kling.ai/blog/kling40-kling-visual-realism-creative-control-introducing-storytelling)、[当前发布页](https://kling.ai/release-note/release-notes/Kling_4) |
| Kling 4.0 | 9/30 可证早期发布；10/15 全面开放 | 9/30 文章说明 early access；更新后的 Release Notes 与历史列表明记 10/15 | 原生 3–30 秒、10 关键帧、多素材与立体声；对所有用户开放不等于全部功能免费 | [9/30 公告](https://kling.ai/blog/kling40-kling-visual-realism-creative-control-introducing-storytelling)、[发布页](https://kling.ai/release-note/release-notes/Kling_4)、[历史列表](https://kling.ai/release-note/release-history) |
| Hy-Memory-30B-A3B | 10/16 开源发布 | 官网首屏明确 2026.10.16 | 记忆写入/更新专项模型，约 30B/3B；Apache 2.0；需组合检索与回答模型 | [官网](https://memory.hunyuan.tencent.com/)、[模型卡](https://huggingface.co/tencent/Hy-Memory-30B-A3B/raw/main/README.md) |

Step 5 计划 10/15 开权重与“现在能下载到权重”分别已证实，精确公开生效时刻没有独立公告闭环。JSON 使用 9/20 API 首发日，避免把仓库建立或上传日当成开放日。

可灵现行规格表把 HDR 标作 NEW，但同一页具体章节仍写 Coming soon；2 分钟延长也仍为 Coming soon。本稿按功能正文的限制保守处理，不将两者写成已经可用。Flash 不应被描述为 30 秒、4K 或 HDR 型号。

## 应单列的产品／平台事件

1. **9/22，MiMo Code 同期更新与 Pro-UltraSpeed 推理模式。** 官方 MiMo Code `v0.1.15` 发布页显示 9/22（Atom 的后续 updated 时间不是首发时间），正文直接宣布 V2.6。更新包括串行处理会变更状态的工具、可并行执行纯读取/搜索、重复调用约束和可恢复错误续跑。UltraSpeed 是 V2.6-Pro 的服务选项，官方宣称最高 20 倍输出速度，不应变成第三个独立模型或本站实测结论。[MiMo Code 发布页](https://github.com/XiaomiMiMo/MiMo-Code/releases/tag/v0.1.15)、[V2.6 发布文章](https://mimo.xiaomi.com/mimo-v2-6/article.html)。MiMo Code 最初产品文章为 6/10，不应说 9 月才诞生。

2. **9/25 06:00 UTC+8 生效，9/27 公告：MiMo V2.6 重复工具调用修复。** 原 API IDs 保持不变，处理智能体重复调用却无进展的问题。MOPD 权重卡说明这是 RL 之后改善此问题的训练阶段；不按精度/阶段重复拆新型号，也不以 HF 创建日确认精确公开时间。[官方问题说明](https://mimo.xiaomi.com/blog/mimo-v2-6-tool-call-repetition)、[Pro MOPD 模型卡](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-MOPD/raw/main/README.md)。

3. **10/15，可灵 4.0 全面开放与新创作流程。** 这一天在 release history 中有正式记录，适合在特刊作为“现在能使用”的重要事件，即使模型初次早期公告在 9 月。页面同时展示新的输入区、网格/列表、时间线、Canvas/Agent 工作流。当前页已明确 4.0 可经 MCP/CLI 使用，包括 Omni 与 keyframes；该接入的单独启用日未标明，不能擅自写成 10/15 当天新增。[现行发布页](https://kling.ai/release-note/release-notes/Kling_4)。

4. **10/16，Hy Memory 2.0 + MemHub。** 模型、框架、应用三层一起开放，意义是让用户授权关联的聊天、工作、代码历史能持续沉淀和跨工具召回。当前官网列 10 种工具，包括 Codex、Claude Code、Cursor、OpenCode、Qwen Code 等；需要关联授权与集成，不是未经设置自动读取所有工具。官方提供 CLI 与 Mac App；本次未验证 Windows 桌面客户端。10/17、10/18 仓库补丁不另拆重大首发。[官网](https://memory.hunyuan.tencent.com/)、[官方仓库](https://github.com/Tencent-Hunyuan/Hy-Memory)。

5. **9/11 活动，10/13 英文公告：MiniMax 的日本 IP 合作。** 官方文章描述 Kagami AI、Kagami Gate 和 H3 IP Edition 的权利方合作与商业化工作流。应按合作/产品方向报道，不应写成 H3 在 10/13 新发布，也不能从合作愿景推出所有用户已有相同版权权限。[官方文章](https://www.minimax.io/news/minimax-japanese-ip-ready-for-the-global-ai-era)。消费者实际可用范围需要具体合作条款；重要性低于上面直接可用的新能力。

## 已收录旧型号及范围外的日期风险

- **Seedance 2.5**：当前已收录 7/31，与 Seed 视觉目录一致。10/5 Perplexity 接入线索由主任务独立打开其官方日志确认，本子任务未重复读取该日志；可作为平台接入事件，不能作为字节首发。Seed 的基础、视觉、音频目录分别最近见 Seed 2.1（6/23）、Seedance 2.5（7/31）、SeedRealtime（8/5）。[基础目录](https://seed.bytedance.com/en/blog_list/foundation)、[视觉目录](https://seed.bytedance.com/en/blog_list/visual)、[音频目录](https://seed.bytedance.com/en/blog_list/audio)。sitemap 的 9 月 lastmod 只说明网页维护。
- **MiniMax H3**：生产数据当前 7/28；官方 API 更新日志明确 **7/31 上线**，官方开放权重文章是 **8/3**。7/28 可能来自仓库创建，不能据此当首发；应由主任务决定单独修正。10/5 第三方平台接入不重建型号。[API 日志](https://platform.minimax.io/docs/release-notes)、[8/3 开放权重文章](https://www.minimax.io/news/minimax-h3-open-source)。
- MiniMax M3、Music3、Seedream 5.0 Pro、Seed-Audio 1.0、ERNIE Image、Unlimited OCR 等生产库已有更早型号；本次没有把旧模型在最近更新列表或平台导航的重新出现当新发布。MiniMax API 日志最新模型事件停留在 7 月；不能把这一本日志的空档推广成全部产品都没有更新。

## 待核实，不进入新增型号 JSON

| 候选 | 已打开证据与实际能力 | 日期缺口／本次处理 |
|---|---|---|
| Tencent Youtu-Parsing-Omni | 官方卡明确 `[2026-10]` 已发布技术报告、权重、vLLM 插件与示例；5B，文档/图片/图表/几何/音频/视频解析成结构化 JSON，含 Markdown 表与 Mermaid 流程图；自定义 YoutuParsing 许可。[卡](https://huggingface.co/tencent/Youtu-Parsing-Omni/raw/main/README.md) | 月份确认，精确日不明。10/9 权重与 remote code 提交是上传证据，不能单独断言公开首发。很适合后续文档与多模态专题。 |
| Tencent WeVisDoc 2B／4B | 官方项目与卡可用，页面图片转 Markdown、LaTeX、HTML 表；基于 Qwen3-VL，Apache 2.0。[项目](https://tencent.github.io/WeVisDoc/)、[仓库](https://github.com/Tencent/WeVisDoc) | 9/16 仓库/权重上传与 9/18 论文线索不足以单独确认首发日。保留待核。 |
| Tencent EVIE 8B／4.5B | 8B 官方卡明确已开放权重、推理与评测，面向视觉文档检索；Apache 2.0。[卡](https://huggingface.co/tencent/EVIE-8B/raw/main/README.md) | 卡未给公告日；仓库 9/4 创建、10/9 修改和 10 月论文编号都不能自动代表首发。4.5B 未完整复核，不录。 |
| MiMo-V2.6-Distill-Qwen-9B | 已读官方模型卡，MIT，基于 Qwen3.5-9B 与 MiMo 数据的蒸馏研究起点。[卡](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B/raw/main/README.md) | 仅 HF 创建时间不足以确定独立公开日；不与 9/22 主模型发布日期硬绑定。 |
| StepAudio 3 Chat | 当前实时语音文档另列 `stepaudio-3-chat-preview`，提供 Chat Completions 的语音理解/文本对话/工具调用；全双工仍须 Realtime API。[文档](https://platform.stepfun.com/docs/zh/guides/models/stepaudio-3-realtime) | 9/15 公告标题明确列五款，没有单列 Chat；当前存在已证，单独首发日期与是否需独立型号条目待核。 |
| Step 5 精确权重公开日 | 首发公告的 10/15 计划与当前可下载权重均已确认 | 不能让早于计划的私有仓库创建/上传时间覆盖公开公告。模型首发日已有 9/20，故不阻止主型号入库。 |
| 豆包、即梦、文心、元宝的 App 内灰度更新 | 已覆盖相关官方研究入口、部分平台和关联公告 | 公开官网不能覆盖全部移动端灰度；本稿不作“无更新”的绝对结论。 |

## 供编辑整合的优先顺序

优先保留可灵 4.0 的 10/15 全面开放、MiMo V2.6 与真实工具循环修复、Step 5 与 StepAudio 3、Hy Image3.5、Hy Memory/MemHub。AuK 很适合声音创作与本地工具读者，需说明配套组件和部署成本。Youtu/WeVisDoc 很契合文档主题，但须补首发证据后再入精确日期模型页。

所有榜单、速度倍数和演示完成度均来自厂商，不构成本次实测。本稿只核实发布与可用性表述。
