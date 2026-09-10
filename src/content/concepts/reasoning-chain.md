---
title: 思维链
english: Chain of Thought
aliases: [CoT, Chain of Thought, Chain-of-Thought, 推理链, 逐步推理]
category: 模型与使用
summary: 在答案前生成中间推导步骤的一类方法；这些步骤可以帮助解题和检查逻辑，但不能保证完整、忠实地揭示模型内部计算。
updated: 2026-09-10
sources:
  - title: 论文：Chain-of-Thought Prompting Elicits Reasoning in Large Language Models
    url: https://arxiv.org/abs/2201.11903
  - title: 论文：Language Models Don't Always Say What They Think
    url: https://arxiv.org/abs/2305.04388
related: [prompt, hallucination, benchmark]
---

## 它是什么

思维链常缩写为 CoT，指生成一系列中间推导步骤，再给出答案。[早期相关论文](https://arxiv.org/abs/2201.11903)通过在提示中提供带推导的示例，研究这种方法对算术、常识等任务的帮助。“思维”是方法的名称，并不能据此把生成文字等同于人类的心理过程。

## 一个日常例子

你要比较两种活动票价：一种固定收取场地费再按人数收费，另一种只按人数收费。AI 先写出两个总价表达式，再计算人数达到多少时更划算。这些中间步骤可以帮助你检查有没有漏掉固定费用，也比只收到一个人数更容易核验。

## 展示的解释是否等于内部计算

不能直接画等号。[关于解释忠实性的实验](https://arxiv.org/abs/2305.04388)发现，模型可能受到某些输入线索影响，却在输出推导时没有如实说明这些影响。因而一段连贯解释既不能证明它完整披露了答案的成因，也不能仅凭措辞确定内部机制。

## 评测时怎么使用

可以检查推导中的条件、运算和结论是否成立，并观察修改条件后答案能否相应更新。解释顺序和展开风格则可以留给读者比较。更长的推导不自动代表更强能力；答案正确、论证有效和解释忠实，是需要区分的问题，不能只凭“它写了很多步骤”一并认定。
