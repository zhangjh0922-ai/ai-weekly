---
title: "MMLU（多学科知识评测）"
english: "Massive Multitask Language Understanding"
aliases: [MMLU, MMLU-Pro, MMLU Pro, Massive Multitask Language Understanding]
category: "评测与指标"
summary: "通过多学科选择题考察知识与解题能力；MMLU-Pro 另有题目、选项和学科设置，分数不能直接对照。"
updated: 2026-09-10
sources:
  - title: "Measuring Massive Multitask Language Understanding：原始论文"
    url: "https://arxiv.org/abs/2009.03300"
  - title: "TIGER-AI-Lab：MMLU-Pro 项目说明"
    url: "https://github.com/TIGER-AI-Lab/MMLU-Pro"
  - title: "MMLU-Pro：原始论文"
    url: "https://arxiv.org/abs/2406.01574"
related: [benchmark, gpqa, hle]
---

## 一份跨学科的选择题试卷

MMLU 用多个学科的选择题考察模型的知识和问题解决能力。原版覆盖数学、历史、计算机、法律等 57 个领域，既有基础知识，也有需要专业背景的内容。

它像把不同课程的试题放在一起做综合测验，可以观察模型的知识覆盖是否均衡。总分只是汇总：两个模型平均分相近，仍可能分别擅长不同学科，单看总分会遮住这些差异。

## Pro 不是同一套题的高级评分

TIGER-AI-Lab 推出的 MMLU-Pro 在 MMLU 基础上筛选和补充题目，更强调推理，并把选择范围从四个选项扩展到最多十个。它覆盖 14 个大类，与原版的分类和题集都不相同。

因此，MMLU-Pro 低于 MMLU 的分数不表示模型退步。两者应分别比较，也不宜把英文题与翻译题、不同语言版本混成同一项成绩。

## 选择正确与实际使用的距离

给不给示例、是否要求展开推理、怎样提取最终选项，都会影响结果。选项数量也改变了随机猜中的机会，不能忽略评分协议只看百分比。

这类题主要检查能否在给定选项中辨认答案，没有直接测量长篇写作、操作软件或持续完成项目的能力。题目公开后的训练接触，以及各学科表现，都应作为解释分数时的背景。
