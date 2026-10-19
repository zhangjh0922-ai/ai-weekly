# 停更期间模型与产品复核：2026-10-19

## 范围与最终内容

- 事件区间：2026-09-08 至 2026-10-19；核查时区 Asia/Shanghai，10/19 为核查当日已可见信息，不代表全天结束。
- 比对基线：`3e7bf69`，116 条模型、4 期周报；上一轮 GPT-6.1 Sol 等 15 条补录已包含在基线，不重复算本轮新增。
- 本轮新增 **28 条模型记录**，总数 **144**。分组：OpenAI/Google 3，中国核心 2，中国扩展 14，全球扩展 9。
- 修正 2 条历史近似日期：Claude Fable 5.1 / Mythos 5.1，9/3 → 9/1。两家官方日志一致。范围外历史纠错，不计新增。
- 新增第 5 期特刊 `src/content/issues/2026-autumn-catchup.md`，从第 4 期链接，保留第 4 期原有周区间。特刊使用独立 slug，不占用常规 `2026-w43.md`，避免使本周自动草稿因同名文件而跳过。
- 产品内容涵盖文档与学习、实时语音、视频创作、浏览器/电脑操作、持续任务、编程工具、服务开放、退役与计费。不是只加模型名称。
- 未运行统一模型实测；能力与性能引述为官方表述，场景建议为编辑判断。

## 证据记录

以下文件保留分工采集时的证据快照，里面“未收录/候选/建议”描述的是采集当时状态；最终合并数量以上述结果为准。

- [OpenAI、Anthropic、Google、Cursor、Perplexity、Notion](2026-autumn-audit/root.md)
- [Qwen、DeepSeek、Kimi、Z.ai](2026-autumn-audit/china-core.md)
- [腾讯、小米、阶跃、可灵、字节、MiniMax、百度](2026-autumn-audit/china-extended.md)
- [xAI、Meta、Microsoft/GitHub、NVIDIA、Mistral、AWS/Kiro、Adobe、Runway](2026-autumn-audit/global-extended.md)
- [ElevenLabs、Ideogram 补充核查](2026-autumn-audit/global-supplement.md)

## 已解决的覆盖问题

1. RSS 窗口之外还缺产品入口。此次查产品 release notes 与 API changelog，发现 ChatGPT Word/Space、Claude Docs、Kimi Desktop 等明确更新。
2. 研究博客不等于全部型号目录。Kimi K2.8 Preview 的证据在 Code 最新动态；腾讯 Image3.5 在中文博客，英文列表未出现。
3. 仓库创建日不等于公开日。AuK 8 月已建仓，9/9 才在官方 News 宣布代码和权重公开；只按 createdAt 筛选会漏掉。
4. 公告日、提前灰度、正式开放要分别记录。Kling 4.0/Flash、Grok Voice Transcribe 2.0、Hy Image3.5 均保留明确事件说明；不承诺 date 字段代表所有用户同时首次可用。
5. 产品接入不重复生成模型条目。Perplexity/Runway/GitHub 上架、MiMo UltraSpeed、HydraFusion、SDK 和多代理工作流均独立报道。
6. 使用更新后的政策记录。DeepSeek V4-Pro 旧停服计划已撤回；Google/Claude 尚未到期的退役明确标为计划。
7. 合并前后的只读复核修正了 Qwen Pro/Turbo 日期歧义、Qwen SSH 来源漏链、Grok 新独立邮箱草稿审批适用范围、HydraFusion 的计划门槛。

## 保留的未决项

- Qwen LiveTranslate（9/17平台、9/18公告）、Omni Realtime（9/21仓库News与平台，9/18博客现文也含实时版）、HappyOyster（不同平台9/17—18）、Image Pro独立型号含义。产品开放已报道，未给模型库强填统一首发。
- Youtu-Parsing-Omni 仅确认2026年10月；WeVisDoc、EVIE、MiMo Distill-Qwen-9B、StepAudio3 Chat缺独立首发日。存在与可用性证据不等于具体首发日。
- Step5现权重可获取、原定10/15开放均确认，未确证实际转公开瞬间，时间线采用9/20 API预览日。
- ElevenLabs V4、Ideogram4.5有第三方平台接入线索；原厂首发日期不足。ElevenLabs、Canva入口受限，不能写成没有更新。
- 历史日期风险：Kimi K3、GLM5.3/Flash、DeepSeek Vision Exp、MiniMax H3存在公告/API/权重/仓库创建口径差异，范围外未贸然重写。
- 国内消费App灰度、所有Windows/Office/AWS子产品、Mistral完整产品帮助日志、NVIDIA开发者博客、全部创作产品尚未逐版本完整覆盖。正文公开这些边界，不作绝对无遗漏保证。

## 发布前检查

- Astro check：25 个文件，0 errors / warnings / hints。
- 数据：144 条唯一 ID，所有前代引用有效；新增28条均指向第5期。对照基线无删除，仅两条历史日期及其说明改变。
- 根路径与 GitHub `/ai-weekly` 子路径各构建73页；各1758个内部链接通过，RSS均含5期，28个新增模型锚点均存在。
- 特刊与新增模型共77个独立外链：75个HTTP成功，ChatGPT帮助中心与Grok Bot日志对直接HTTP返回403；前者浏览器正文、后者研究阶段官方正文均已读取，不把反爬响应误判为不存在。
- 三个分工复核均已完成；已应用日期与来源对应修正。没有功能代码变更，不新增镜像实现的测试。
- 部署后的线上可见性在交付前另行确认。
