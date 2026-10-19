<!-- 来源核查阶段的记录快照；最终合并结果、数量与修订以 ../2026-10-19-autumn-audit.md 为准。 -->

# 小范围收尾：ElevenLabs V4 / Ideogram 4.5

核查日：2026-10-19。仅检查这两个候选；按要求最多使用两个原厂官方入口，没有继续扩散。当前 `data/models.json` 对 `name/org` 搜索 Eleven、Ideogram 均无命中，因此两款均尚未收录。

| 候选 | 已确认线索 | 原厂入口核查 | 结论 |
|---|---|---|---|
| ElevenLabs V4 | [Runway changelog](https://runway.com/changelog) 9/29 条目称 Paid Plans 已支持 ElevenLabs V4 音频生成。这里只能证明 Runway 接入时间。 | [ElevenLabs官方博客目录](https://elevenlabs.io/blog)直连403；相同入口以web工具重试429，未能读取原厂公告。 | 待核原厂正式名称、首发日期、具体能力与使用范围。不可将9/29填作原厂首发，也不据此添加模型。 |
| Ideogram 4.5 | [Runway changelog](https://runway.com/changelog) 10/2 条目称 Paid Plans 的 Runway MCP 已支持 Ideogram 4.5。 | [Ideogram官方博客目录](https://ideogram.ai/blog/)成功打开，导航明确列Ideogram4.5；10/14条目是“How to edit product photos with Ideogram 4.5”，内容摘要提到商品图颜色、细节、背景编辑。目录没有提供4.5首发公告与日期。 | 可确认产品存在以及商品图编辑用途；10/14是使用教程日，10/2是Runway上架日，都不能替代原厂首发日期。保留待核，不添加模型。 |

交付 `audit-2026-autumn-global-supplement-models.json` 为 `[]`，表示本次没有达到“原厂日期明确”的新增模型，不表示两款不存在。没有改变先前9条模型候选，也没有修改生产文件。
