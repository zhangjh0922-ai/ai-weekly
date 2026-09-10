---
title: "LiveCodeBench（持续更新的编程评测）"
english: "LiveCodeBench"
aliases: [LiveCodeBench, Live Code Bench, LCB, LiveCodeBench v5, LiveCodeBench v6, release_v5, release_v6]
category: "评测与指标"
summary: "按时间持续收集编程竞赛题，以减少旧题接触对评测的影响；比较时需要说明题目时间范围和具体任务。"
updated: 2026-09-10
sources:
  - title: "LiveCodeBench：项目说明与时间切分方法"
    url: "https://livecodebench.github.io/"
  - title: "LiveCodeBench：官方代码与数据版本"
    url: "https://github.com/livecodebench/livecodebench"
related: [swe-bench, pass-at-k, benchmark]
---

## 用新题观察编程能力

LiveCodeBench 持续收集 LeetCode、AtCoder 和 Codeforces 等平台的编程竞赛题。除了生成代码，项目也研究根据反馈修正代码、推断执行结果和预测测试输出等任务。

可以把它类比为定期换题的编程测验：读懂题意，设计解法，再检查程序对不同输入是否正确。它更偏向明确题目下的编程能力，与进入大型项目修复功能的 SWE-bench 各有侧重。

## 为什么需要题目的日期

如果测试题及答案已经出现在训练材料中，成绩就可能混入对旧题的记忆。LiveCodeBench 标注题目发布日期，允许选择模型训练截止日期之后发布的题目，尽量减少这种影响。

但时间切分不是“绝对无污染”的证明。模型实际接触过哪些后续训练资料，未必全部公开；换一个时间窗口，也会改变题目数量与难度分布。

## 名称相同，测试范围可能不同

报告需要说明数据发布版本、题目起止日期、任务类型和编程语言。代码生成的成绩，不能直接当作代码修正或执行推断的成绩。

还要区分一次生成通过测试，与多次尝试中至少一次通过的 [pass@k](concept:pass-at-k)。竞赛题得分也不自动覆盖软件的易用性、维护成本或上线后的可靠性，结果应放在它实际测到的任务范围内理解。
