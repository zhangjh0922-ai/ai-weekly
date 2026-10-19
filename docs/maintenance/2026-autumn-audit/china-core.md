<!-- 来源核查阶段的记录快照；最终合并结果、数量与修订以 ../2026-10-19-autumn-audit.md 为准。 -->

# 中国核心厂商停更期核查：2026-09-08—2026-10-19

核查日：2026-10-19，北京时间。范围为 Qwen / 阿里通义、DeepSeek、Kimi / Moonshot、Z.ai / 智谱。依据官方公告、开发文档、官方仓库发布记录及模型卡；未实际运行收费接口、模型或桌面客户端。下文“适用用户”是编辑判断，性能与演示效果是厂商表述。日期只有日粒度的来源保留其标注日，不擅自推断时区；GitHub 时间明确为 UTC 时另写北京时间。

## 可直接交给主编的结论

- **新增两条可确认模型候选**：9 月 11 日 Kimi K2.8 Preview 全量上线 Kimi Code；9 月 18 日 Qwen3.8-Omni-Flash 正式上线。已放入同目录 `audit-2026-autumn-china-core-models.json`，不含 issue 字段，Kimi 的 prev 对应库中已存在的 `kimi-k2-7-code`。
- **重要产品漏项**：Kimi Code Desktop 9 月 17 日发布、10 月 14 日加入 Linux 与远程控制；Qwen-MM-Plugins 的视频转 PDF、视频编辑、录屏转 Skill；Qwen-Live Harness 的实时音视频交互、任务委托与记忆；QwenCloud 的同传、双工语音、结构化决策和 HappyOyster 世界模型；Z.ai 10 月 16 日 API 密钥与计费分类变化。
- **不能把当前模型目录当作发布日期表**：Kimi 研究目录没有 9 月模型文章，但 Kimi Code 产品日志明确记录 K2.8 Preview。Qwen 博客页头、仓库 News 与云端上架记录也不总是同日。Qwen Realtime、LiveTranslate、Image 2.1 Pro、HappyOyster 的双日期保留如下。

## 已核实的模型与平台能力

### Qwen / 阿里通义

| 项目 | 确切日期与事件类型 | 内容、适用用户及限制 | 现有收录 / 建议 |
| --- | --- | --- | --- |
| Qwen3.8-Omni-Flash | **9/18 正式上线**。官方博客开头明确当天上线，QwenCloud 模型日志同日记录。 | 1M 上下文，文本、图像、音频、视频输入，面向会议整理、长视频理解、视频创作与音视频 Agent。适合开发者、研究与内容生产。插件、工具权限和运行环境是完整交付的前提，不能把演示等同于聊天入口默认能力。 | **未收录；纳入模型 JSON**。[正式公告](https://qwen.ai/blog?id=qwen3.8-omni-flash)、[模型日志](https://docs.qwencloud.com/changelog/models)。 |
| Qwen3.8-Omni-Flash-Realtime / Qwen-Live Harness | **9/21 正式发布记录**：Harness README News 明确 Realtime 与 v1.0.0 同时发布；QwenCloud 同日上架。9/18 Omni 博客的当前正文也包含实时版和调用示例，因此博客页头不足以独立证明实时版首发。 | 实时音视频输入、语音和文字输出；Harness 可调用后台编程 Agent、主动提醒并维护长期记忆。适合实时助手和多模态 Agent 开发。完整桌面体验现仅 macOS 12+；Windows/Linux 仍在推进。需联网 DashScope API，不要求本地 GPU；北京与新加坡密钥不能混用。 | **未收录；作为 9/21 工具与 API 开放，模型 JSON 暂不强定首发**。[仓库 News 与限制](https://github.com/QwenLM/Qwen-Live-Harness#news)、[模型日志](https://docs.qwencloud.com/changelog/models)。 |
| Qwen3.8-LiveTranslate | **9/17 QwenCloud 上架；9/18 官方技术发布文章**。两个一手日期均确认，事件口径不同。 | 实时说话人分离、原文译文同步、上下文消歧。60 种输入音频 / 输出文本语言，其中 29 种可输出音频；官方 LAAL 指标约 2.3 秒，不能泛化成所有环境的端到端体感。适合会议同传、双语字幕开发。 | **未收录；建议产品更新，暂不按单一“全球首发日”写入模型 JSON**。[官方文章](https://qwen.ai/blog?id=qwen3.8-livetranslate)、[上架记录](https://docs.qwencloud.com/changelog/models)、[API 指南](https://docs.qwencloud.com/developer-guides/speech/realtime-translation)。 |
| Qwen-Audio-3.1-Realtime-Plus | **9/20 QwenCloud 模型上架**。未找到单独的一手全球首发公告。 | 双工语音、函数调用、联网搜索、克隆音色，保留旧音色并增加八个音色。适合语音助手、客服开发。API 协议兼容 3.0 Plus；搜索与函数调用不能同时启用；文档所列音频历史上限为 50 轮 / 累计 300 秒，不能只写 262K token 就暗示无限音频记忆；新加坡区域密钥。 | **未收录；平台能力更新，未放模型 JSON**。[上架记录](https://docs.qwencloud.com/changelog/models)、[使用与限制](https://docs.qwencloud.com/developer-guides/speech/qwen-audio-realtime)。 |
| decision-model-preview | **9/24 QwenCloud 预览上架**。未确认更早首发。 | 单次前向计算处理分类、是非、评分，返回概率分布与置信度；不生成自由文本。适合工单分流、内容审核、Agent 路由与结果核验。独立 System One 接口，最多 16 个问题、64K 上下文；不支持流式、函数调用或联网搜索。 | **未收录；可纳入产品/API更新，保持 preview 标识**。[上架记录](https://docs.qwencloud.com/changelog/models)、[接口正文](https://docs.qwencloud.com/api-reference/decision-model-api)。 |
| HappyOyster 1.0 Adventure / Directing / Acting | **9/18 QwenCloud 上架**。维护文档已有其他云日志 9/17 的线索，本轮未成功读取其正文来解释差异，不能确定全球首发。 | 三个模式分别用于可探索世界、实时导演、角色互动；输出为实时生成的视频流。Adventure 文档列 1 分钟以上交互；Directing 约 3 分钟流式视频，可暂停、回退和分支。适合游戏、模拟教育、互动叙事原型；不能等同于完整可导出的 3D 游戏资产。 | **未收录；平台更新可写，首发日留待核**。[模型日志](https://docs.qwencloud.com/changelog/models)、[三模式指南](https://docs.qwencloud.com/developer-guides/getting-started/world-model/happyoyster-guide)。 |
| Qwen-Image-2.1 | **9/20 权重发布**，官方仓库 News 确认；HF 仓库 createdAt 为 9/14，不能取代权重发布日。 | 生成与编辑统一，视觉生成组件 7B、原生透明图、多参考图编辑。适合研究、设计与图像工作流。Qwen Research License 仅非商业研究/评估，商业用途需另行许可。 | **已收录模型与 W42**；维持 9/20，明确许可。[仓库 News](https://github.com/QwenLM/Qwen-Image-2.1#news)、[模型卡](https://huggingface.co/Qwen/Qwen-Image-2.1)、[许可](https://huggingface.co/Qwen/Qwen-Image-2.1/blob/main/LICENSE)。 |
| Qwen-Image-2.1-Turbo | **10/9 模型发布**，官方仓库明确 8 步生成与编辑。 | 适合在同系列中比较速度与质量，但本轮未实测。不要把“8 步”直接写成固定耗时。 | **已收录模型与 W42**，无需重复。[仓库 News](https://github.com/QwenLM/Qwen-Image-2.1#news)。 |
| Qwen-Image-2.1 Pro / Turbo 托管 API | **10/2 QwenCloud 记录 Pro 上架；10/9 模型仓库宣布 Pro 与 Turbo API 正式上线**。这是不同入口的上架/正式服务公告。 | Pro 的文档支持最多 10 张参考图、一次最多 6 张输出；输出 URL 有效 24 小时。未找到明确说明 Pro 是独立新权重还是托管配置的证据，不能另造新模型条目。 | **此前待核；现可补写托管 API 开放，仍不单列新权重**。[QwenCloud 日志](https://docs.qwencloud.com/changelog/models)、[正式 API 公告](https://github.com/QwenLM/Qwen-Image-2.1#news)、[编辑文档](https://docs.qwencloud.com/developer-guides/image-generation/image-editing)。 |

### Qwen 的重要工具更新

| 日期与类型 | 经正文确认的变化 | 适用用户 / 限制 | 收录与来源 |
| --- | --- | --- | --- |
| **9/10 插件功能发布** | Qwen-MM-Plugins 增加 omni-chatcut（MV、电影解说、视频翻译）与 omni-video2note（带图 PDF 笔记），同时开放插件 Hub。 | 内容创作者、课程整理和工作流开发；是可安装插件，通常还需要模型 API、媒体工具及其费用。 | 未收录。[官方 README News](https://github.com/QwenLM/Qwen-MM-Plugins#-news)。 |
| **9/16 插件功能发布** | omni-skill-creator 将操作演示视频提炼成可复用 Agent Skills。 | 适合把录屏中的操作步骤整理成规范；生成 Skill 仍要检查与验证。 | 未收录。[官方 News](https://github.com/QwenLM/Qwen-MM-Plugins#-news)。 |
| **9/20 插件功能发布** | mhs 通过 Model Hardware Standard 适配器操作物理硬件；video-spatio 处理图像/视频的三维空间推理。 | 硬件与空间推理开发者；硬件适配器由所有者部署，文档声明主机侧限制与急停机制，不能写成任何设备开箱即用。 | 未收录；可作为次要开发者快讯。[官方 News 与能力表](https://github.com/QwenLM/Qwen-MM-Plugins)。 |
| **9/17 Qwen Code Desktop v0.24.0 发布包含的能力** | 发布列表包含命名工作流、目标预算、远程 daemon 连接、多模态媒体管线与 Linux bwrap 沙箱。 | 开发者与长程任务用户；只能据该版本说“已包含”，未逐 PR 确认每项最早出现时间。 | 未收录。[官方 release](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.24.0)。 |
| **9/19 Desktop v0.24.1 / 9/22 v0.24.4 发布包含的能力** | 前者包括 Browser SDK、Chrome relay 与浏览器 Live Voice；后者包括 SSH 工作区和会过期的二维码配对。 | 浏览器自动化和远程开发；release 是源代码/包版本证据，不能泛化到所有云端产品已全面开通。 | 未收录。[v0.24.1](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.24.1)、[v0.24.4](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.24.4)。 |
| **10/15 CLI v0.25.2；10/16 北京时间 Desktop v0.25.2** | 文件树、工作区文件预览、只读 Excel 预览、子 Agent 面板和待审批提醒。Desktop GitHub 发布时间为 10/15 16:35 UTC，即北京时间次日 00:35。 | 开发者；“只读 Excel 预览”不能写成内置完整表格编辑器。发布列表中实验性 Managed Agents 不作全量上线处理。 | 未收录。[CLI release](https://github.com/QwenLM/qwen-code/releases/tag/v0.25.2)、[Desktop release](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.25.2)。 |

### Kimi / Moonshot

| 项目 | 日期与类型 | 内容、适用用户及限制 | 现有收录 / 建议 |
| --- | --- | --- | --- |
| Kimi K2.8 Preview | **9/11 模型发布栏目确认全量上线 Kimi Code**。 | 沿用 kimi-for-coding；low/high/max 思考、最高 1M 上下文。适合 Kimi Code 客户端和第三方编程工具用户。官方称相较 K2.7 Code 思考效率改善、能力接近 K3；未独立实测；没有权重开放证据。 | **漏模，已纳入 JSON**。[官方最新动态](https://www.kimi.com/code/docs/kimi-code/whats-new.html)、[模型配置](https://www.kimi.com/code/docs/kimi-code/models.html)。 |
| Kimi Code CLI Remote Control | **9/9 v0.42.0 从实验转正式**。 | 从手机或另一台电脑接管本地会话；本地机器仍执行任务。适合远程跟进开发任务。子 Agent 模型池同时始终开启。 | 未收录。[版本日志](https://www.kimi.com/code/docs/kimi-code-cli/changelog.html)。 |
| Kimi Code 目标模式 | **9/14 v0.43.0 行为更新**。 | 时间预算不再计算会话关闭期间，并取消此前 24 小时上限。适合长期任务；不能解读成无限额度或永不停止。 | 未收录，适合与桌面版合并讲述。[版本日志](https://www.kimi.com/code/docs/kimi-code-cli/changelog.html)。 |
| Kimi Code Desktop 1.0 | **9/17 正式发布**；官方新闻文章目录为 **9/21**。两个独立文档（最新动态、Desktop changelog）均确认 9/17，应采用版本实际发布日。 | macOS Apple/Intel 与 Windows；项目、会话、终端、Git、计划和目标模式、后台任务，内置浏览器与网页元素标注，支持查看改动、关联 PR 状态。适合希望用图形界面完成开发的用户。模型会员权益另计，可配第三方供应商；Tower 为实验功能。 | 未收录，优先补录。[最新动态](https://www.kimi.com/code/docs/kimi-code/whats-new.html)、[完整发布介绍](https://www.kimi.com/news/kimi-code-desktop)、[版本记录](https://www.kimi.com/code/docs/kimi-code-desktop/changelog.html)。 |
| Kimi Code Desktop 1.1 | **10/14 功能发布**。 | Linux x86_64 的 AppImage/deb/RPM，远程控制、文件树、终端唤起桌面会话，浏览器弹窗处理与暂停控制。Agent 进展播报为实验功能且默认关闭；远程控制要由用户在设置开启，任务与工具在本机执行。 | 未收录，属于 W42 当周重要漏项。[最新动态](https://www.kimi.com/code/docs/kimi-code/whats-new.html)、[桌面日志](https://www.kimi.com/code/docs/kimi-code-desktop/changelog.html)。 |
| Kimi Code Desktop 安全修复 | **9/23 v1.0.3**。 | 日志明确修复恶意网页经本地内嵌服务器执行任意命令的问题；这不是普通界面小 bug，旧版用户具有升级价值。 | 未收录；可作更新提示，不展开攻击细节。[桌面日志](https://www.kimi.com/code/docs/kimi-code-desktop/changelog.html)。 |
| Kimi 金融行业方案 | **9/17 产品方案发布**。 | 10+ 数据源、9 项专业技能与 Word/Excel/PDF 等交付工具，覆盖研究、财务建模与报告。适合机构用户；数据源权限、企业采购与许可分别处理。官方案例的节省时间未独立验证；飞书/腾讯文档/WPS 的连接在文章中属于“正在推进”，不能写为已全面上线。 | 未收录；可作为专业工作流补充，剔除客户名单与营销效果。[完整公告](https://www.kimi.com/news/kimi-financial-industry-ai-solution)。 |

Kimi 的文档、表格、PPT、浏览器扩展、Kimi Work、看板及小组件目前均有官网入口，但现存功能页不自动证明是在本次停更区间首次发布。已核查[帮助中心](https://www.kimi.com/help)、[新闻目录](https://www.kimi.com/news/)、[研究目录](https://www.kimi.com/blog)；不能据研究目录最近条目在 7 月就声称 9—10 月没有模型或产品变化。

### DeepSeek

| 日期与类型 | 核实结果 | 适用用户 / 限制 | 现有收录 |
| --- | --- | --- | --- |
| **9/10 V4.1-Flash 模型发布与 API 更新** | 原生视觉理解，552B MoE、输入/输出非对称激活架构；API 使用 deepseek-flash。旧 V4-Flash 和 Vision-Exp 名称临时转发至新版。 | 开发者需测试升级后的行为。**9/10新闻正文仍保留9/14停用V4-Pro的旧计划；更新日志已明确决定9/14后继续提供V4-Pro，原计费不变。**不得照搬旧计划为既成事实。 | 模型已收录；迁移及计划撤回未写入 W42。[新闻](https://api-docs.deepseek.com/news/news260910/)、[更新后的日志](https://api-docs.deepseek.com/updates)。 |
| **10/17 V4.1-Flash-1017 发布、权重开放与 Web/App/API 更新** | 强化完整项目开发，官方称输出与任务时间下降；建议 Harness 0.2.1-rc.1 及以上。 | 开发者、网页/3D 项目原型；性能是厂商测试，不据演示断言一次全部成功。 | 模型与 W42 已收录，无需重复。[正式公告](https://api-docs.deepseek.com/news/news261017/)。 |
| **10/17 Search / Fetch API 对外开放** | Search 返回结构化检索结果；Fetch 返回单页 Markdown。各每千次成功且有结果的请求 0.75 美元，空结果/失败不计费；各自账户级 QPS 为 5。 | Agent、RAG 开发者；抓取受目标站可用性与政策影响，不能直接等同浏览器操作。经 Harness/Claude Code/Codex 服务端工具发起的特定调用目前免费，**北京时间11/1 00:00**开始收费，是未来计费计划。 | W42 已收录主信息；成功计费条件与限流可按篇幅补充。[公告](https://api-docs.deepseek.com/news/news261017/)、[指南](https://api-docs.deepseek.com/guides/search)。 |

### Z.ai / 智谱

| 日期与类型 | 核实结果 | 适用用户 / 限制 | 现有收录 |
| --- | --- | --- | --- |
| **10/16 API Key 管理及计费规则变化** | 标准 API 与 Coding Plan 分开建密钥；此日之后新建密钥的类型决定计费，换 endpoint 不改变类型。旧密钥自动分类且值不变，不要求统一替换。 | GLM 编程套餐与 API 开发者。Standard Key 使用余额/资源包，不消耗 Coding Plan 额度；旧 Compatible Key 仍按旧规则，包含 endpoint 差异。不能把“订阅了套餐”写成所有调用都免费。 | 未收录，可作为实用更新。[公告全文](https://docs.z.ai/devpack/notice/api-key-management)。 |

已读取国际[模型更新日志](https://docs.z.ai/release-notes/new-released)、中文[模型与产品发布记录](https://docs.bigmodel.cn/cn/update/new-releases)、两个文档索引及官方 HF 组织最近 50 个仓库。上述日志最近主模型仍是 8 月 GLM-5.3 / Flash，**没有从这些入口确认本区间新增主模型**，不等于全平台无更新。还读取 [GLM Slide/Poster Agent beta](https://docs.z.ai/guides/agents/slide)，现有文档确认其存在但未给本区间的发布日，故不编造“9月新增幻灯片能力”。中文文档索引包含 Managed Agents 等平台能力，但无可确认区间日期，本轮不作为已发布新事件。

## 日期冲突与范围外风险（不在模型 JSON 强改）

1. **Kimi K3**：库里为 6/13（HF创建时间）。[技术目录](https://www.kimi.com/blog)与[Code动态](https://www.kimi.com/code/docs/kimi-code/whats-new.html)标 7/16；[新闻目录](https://www.kimi.com/news/)标正式发布文 7/17、权重/报告开放文 7/27。属于历史日期口径风险，需逐事件修订，不直接沿用 HF createdAt。
2. **GLM-5.3 / Flash**：库里均8/25；国际日志分别8/18、8/26；中文日志为8/19、8/26。8/18与8/19可能涉及地区/时区，但没有证据不能擅自归因。须核对正式公告、API开放与权重开放，不能继续用创建日包办。
3. **DeepSeek Vision Exp**：库为8/31，官方新闻/日志明确API实验版8/21。属于先API后权重的可能差异，范围外留待核。
4. **Qwen3.8-LiveTranslate、Omni Realtime、HappyOyster、Image 2.1 Pro**：见各行双日期，不强推某一日志为全球首次。
5. HF 本区间另有 `Qwen-Image-2.1-PE-T2I` / `PE-I2I`，现有证据只确认配套仓库；不将提示词增强组件重复列作重要主模型。

## 核查入口、覆盖边界与技术记录

- 生产文件核查：`data/models.json` 116 条、W42 正文和维护待核文档；在现有 issues 中检索关键产品名，未发现上述新增 Kimi/Qwen工具/Z.ai密钥项目已收录。
- Qwen：QwenCloud 完整模型日志、平台日志、模型更新公告、llms.txt；相关语音/同传/图像/决策/HappyOyster指南；Qwen 新研究目录与两篇完整公告（通过 CUA 读取可见正文）；官方图片、插件、Harness README；Qwen Code 官方 GitHub release API 前100条（筛选区间稳定/桌面版本并阅读功能列表）。未把PR标题单独当成完整产品开放证据。
- DeepSeek：完整更新日志、9/10与10/17公告、Search/Fetch指南、官方HF模型列表。
- Kimi：官网研究/新闻/帮助中心、Desktop公告、金融方案正文、Code最新动态、模型配置、Desktop/CLI完整版本日志、官方HF列表。未登录桌面客户端、未检查所有App内灰度能力。
- 智谱：国际与中文模型产品日志、文档索引、API Key公告、套餐公告、Slides/Poster beta文档、官方HF列表。套餐积分公告为7/30，已排除出本区间。`z.ai/blog`直接访问404，不能代表没有其他博客/社交公告。
- HF检查采用公开官方API，分别按创建时间倒序读取 Qwen、moonshotai、zai-org、deepseek-ai 最近50项；这只能发现新建仓库，无法证明仓库何时公开，也不能发现闭源模型（K2.8正是例子）。
- 搜索工具本轮一次 web__run 返回429；未反复重试。公开HTTP大多成功，Qwen SPA正文使用浏览器加载核查。阿里云 `new-models` 两个入口本轮返回的内容类型处理异常，未将其正文用作证据；HappyOyster9/17线索因此仍待核。
- 临时原文与解析结果保留在本机 `%TEMP%/weekly-china-core-audit/`，仅用于核查，不进入生产内容。此报告不声称已覆盖私域公众号、所有地区、灰度账号、每个小版本或全部第三方集成。
