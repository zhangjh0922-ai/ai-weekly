<!-- 来源核查阶段的记录快照；最终合并结果、数量与修订以 ../2026-10-19-autumn-audit.md 为准。 -->

# OpenAI / Anthropic / Google 与独立产品核查

核查：2026-10-19；目标事件区间：2026-09-08—10-19。官方正文读取成功，除另有标注外不是仅读搜索摘要。性能比较均是厂商自述，没有本站统一实测。

## OpenAI

- API完整区间日志：https://developers.openai.com/api/docs/changelog （使用 .md 全文读取）；ChatGPT全区间日志：https://help.openai.com/en/articles/6825453-chatgpt-release-notes （HTTP403后用浏览器成功读取）。补读官方RSS候选，排除客户案例、融资、政策声明。
- 模型已覆盖：Image2.5两款9/8、Sol/Luna9/22、6.1Sol9/29；API服务更新不可再次当模型首发。
- 新增模型：10/15 GPT-Live-1.1与Quip，ChatGPT Voice逐步上线，不推出API可用性。
- 9/10 Agents API public beta；9/29托管浏览器computer use与Responses原生多智能体beta。
- 9/10 GPT-Live-1 API GA，不能把7/8已发布的ChatGPT语音模型重记首发；10/6 Decisions API beta、10/15 Live原生接入Decisions；10/16 prompt-to-voice对所有API用户开放。
- 9/10 Data插件；Box/Dropbox/SharePoint文件接入；9/17 ChatGPT for Word（所有套餐含Free，但限额适用）；9/22交互式闪卡（所有套餐移动/网页）；9/23语音支持插件，Work语音可继续任务。
- 9/29 Space和Pages协作（符合条件Pro/Business/Enterprise；组织控制适用）；Codex Cloud任务使用隔离环境，可在电脑休眠时继续；Sites修改和定时任务；Code Review与Security Cloud；MCP事件自动化；交互式插件扩展；第三方应用复用ChatGPT额度仅有限预览、仍消耗原额度。
- 9/29 dots长期云端代理：符合条件Pro与Business Premium，18+，部分市场；Pro首发不含EEA/瑞士/英国；Enterprise默认关闭beta。不可向高中生泛化推荐为人人可用。
- 10/1手机扫描多页PDF（iOS分批）与虚拟试穿；10/6付费音频上传；10/7 GPT6与Intelligent UI进入Chat，付费Sol、Free/Go Luna；Pro推理Astra不支持该UI，Work/Codex模型不因此改变。10/16 Pro聊天工具和并行代理升级、Slides（后者第4期已覆盖）。
- 9/11宣布custom GPTs将退役并迁移plugins，不能写成已退役，时间依套餐通知；9/29 Pro500与Ultrafast只属服务/套餐变化。9/14 Plus/Pro取消Instant自动切Thinking。
- 来源中医疗/金融专属入口、MFA历史、一般UI小修列为次要，未逐项进入特刊。

## Anthropic

- API：https://platform.claude.com/docs/en/release-notes/overview （.md）；产品：https://support.claude.com/en/articles/12138966-release-notes 。两者全区间已读。
- 已收Opus5.5 9/22、Sonnet5.5 9/28、Haiku5.5 10/7、Opus fast GA10/15。
- 9/16统一chat/Cowork：Pro/Max网页桌面移动分批；Docs/Slides/Design在任何对话创建编辑，所有套餐含Free；Enterprise beta且默认关闭。不是9/24 Compliance API支持Office日志才首次上线产品。
- 9/25插件开发者门户；10/7 Max/Team月度API credits须关联Console组织，不等于无限免费API；10/7浏览器/电脑SDK toolsets beta（执行环境由开发者提供）；10/9Managed Agents dynamic workflows beta；9/10Managed Agents auto权限策略。
- 9/30宣布Sonnet4.5将于11/30从Claude API退役；10/7Sonnet5.5缓存读价降半，不是整体输入输出价减半。
- 历史日期修正候选已确认：产品和API日志均将Fable5.1/Mythos5.1记为9/1，当前库误记9/3，需修正且说明范围外。
- 10/17媒体关于Fable5.5下周发布的消息不进入已发布模型库。

## Google

- Gemini API完整区间：https://ai.google.dev/gemini-api/docs/changelog?hl=en 。Google月度回顾：https://blog.google/innovation-and-ai/technology/ai/google-ai-updates-september-2026/ ，逐项打开原始文章核日期，不使用10/2回顾日当各项首发日。
- 新模型：EmbeddingGemma2 10/6，https://blog.google/innovation-and-ai/technology/developers-tools/embeddinggemma-2/ ，740M，Apache2.0，多模态嵌入，不是生成模型。
- 9/10 Windows桌面App，Windows10/11；Spark/Omni等各自开放条件依套餐，桌面版不等于所有功能免费：https://blog.google/innovation-and-ai/products/gemini-app/gemini-app-now-on-windows/
- 9/15 Gemini Notebook学习工具公告：实时语音、录音、学习总览、扩展测验、短视频；多项用soon/next week表述，不能写9/15全部GA。学生优惠针对符合资格大学生，不能泛化至高中。https://blog.google/innovation-and-ai/products/gemini-notebook/new-study-tools-september-2026/
- 9/17 CC家庭代理实验预览：最多6人，美国18+个人Google账号，新用户waitlist：https://blog.google/innovation-and-ai/models-and-research/google-labs/cc-expanding-to-groups/
- 9/23 Connected Apps新增Airtable/Linear/Adobe/Webflow等，需连接授权：https://blog.google/innovation-and-ai/products/gemini-app/new-connected-apps-gemini/
- 10/7 Playground提示词造游戏，实验产品，美国18+，创建额度随GoogleAI套餐分批；UnitySpark仍测试/待封测：https://blog.google/innovation-and-ai/technology/ai/playground-experimental-gaming-platform/
- 9/17Antigravity Agent09-2026，旧05-2026于10/5停用；本地工具参数变化，非基础模型首发。10/8 Gemini3.7Flash/3.5Flash弃用并自动转到3.8/3.6；DeepResearch12-2025计划10/23关闭。9/18 Gemini2.5仅允许已有活跃使用者访问，未宣布弃用。
- 已覆盖Live/TTS、NanoBanana2.1、Argon9/30受限发布与10/13扩大开放、Skills10/13分批和Workspace延期。
- 月报发现的Lyria3.5原文9/4、WeatherNext3原文9/3，均在本次范围前，列覆盖线索而不凑入停更漏项。原文：https://blog.google/innovation-and-ai/products/gemini-app/better-tracks-lyria-gemini/ 与 https://blog.google/innovation-and-ai/models-and-research/google-deepmind/introducing-weathernext-3/ 。
- Gemini App独立updates入口HTTP失败；上述博客与API日志已核，不宣称完整覆盖App每项小更新。

## 独立产品

- Cursor https://cursor.com/changelog 与page/2（第二页最新9/2，区间边界已跨过）：9/10 Projects beta云端长期协作调度；9/23Rollouts与Security Review面向Teams/Enterprise（不会自行合并/回滚）；10/6iOS远程控制本地代理，主机仍须在线；10/13OriginAppMarketplace；10/16云代理交互画布与环境API beta。
- Notion https://www.notion.com/releases ：9/9管理员模型控制；9/15 3.7共享Skills、导出SKILL.md、子代理和AgentSDK beta；10/13 3.8跨工具MCP、Skills API、版本记录、列权限；Business/Enterprise可连接ChatGPT Plus/Pro订阅承担GPT用量，仍遵循原计划额度。后处理会议在7/31已出现，不把9/15回顾当首次发布。
- Perplexity https://www.perplexity.ai/changelog/effort-mode-gpt-6-astra-and-skills-marketplace （9/21）：Effort/SkillsMarketplace、Mac混合推理（AppleSilicon/macOS15+/24GB）；SideChat、Windows NVIDIA本地运行另有硬件条件；不是所有计算都留本地。
- https://www.perplexity.ai/changelog/automations-inline-visualizations-and-gpt-6-1-sol （10/5）：事件/定时Automations、交互可视化、接入6.1Sol/Opus5.5；AMD Ryzen AI Max本地Computer（Windows10/11、至少24GB GPU可用内存，电脑与应用须开）；Mac26.38+Chromium浏览器扩展控制；API FastSearch和AgentProfiles预览。MiniMaxH3/Seedance2.5仅平台接入而非首发。
- Canva官方newsroom HTTP403，未确认区间全量；不写无更新。未系统覆盖所有独立创作工具/地区灰度入口；如后续有公告可追加。
