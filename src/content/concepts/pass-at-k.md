---
title: pass@k
english: Pass at k
aliases: [pass@1, pass@4, pass@5, pass@10, pass@100, pass-at-k]
category: 评测与指标
summary: 衡量每道题生成 k 个候选答案时，至少一个通过检验的表现；它不等于一次成功率，也不保证能选出正确答案。
updated: 2026-09-10
sources:
  - title: HumanEval 论文：Evaluating Large Language Models Trained on Code
    url: https://arxiv.org/html/2107.03374
related: [benchmark, frontiermath, agent]
---

## 它在计算什么

pass@k 关注：对同一道题生成 k 个候选答案，是否至少有一个通过规定的检验，再汇总整个题集的表现。pass@1 对应单个候选，pass@10 则允许十个候选中出现一个成功。它没有要求连续答对 k 次。[HumanEval 论文](https://arxiv.org/html/2107.03374)用这一指标衡量代码通过测试的情况。

## 用一道题理解

假设让 AI 写一个计算平均数的函数，生成五份候选代码，只有一份通过全部测试。按这一组候选判断，这道题满足 pass@5 的成功条件，但五份答案的正确比例只有五分之一。前者关注有没有成功的候选，后者关注每份答案有多可靠。

## 有正确答案，不代表能选出来

评测者可以用预设测试检查所有候选。实际使用时，你未必有完整测试，也未必知道五份答案中哪一份正确。因此，较高的 pass@5 不能直接读成“让它试五次，你就会拿到可靠答案”。如果产品会自动筛选结果，筛选方法也需要单独验证。

## 比较成绩前看什么

先核对 k、题集、通过标准、生成设置和计算预算。正式评测也可能先生成更多候选，再用统计方法估计 pass@k，而非每题恰好运行 k 次。生成多个候选与看到失败反馈后反复修改，也应写清楚；不能只凭指标名字判断是否允许这种反馈。
