---
title: 智能体
english: AI agent
aliases: [Agent, AI 智能体, 代理式 AI]
category: 模型与使用
summary: 围绕一个目标调用工具、观察结果并继续行动的 AI 系统；实际能力还取决于工具、权限和运行流程。
updated: 2026-09-10
sources:
  - title: Anthropic：Building effective agents
    url: https://www.anthropic.com/engineering/building-effective-agents
related: [computer-use, prompt-injection, context-window]
---

## 它是什么

在大语言模型产品中，智能体通常指能围绕目标采取行动的系统：模型决定下一步，工具负责执行，系统把结果送回模型，再决定继续、调整还是结束。例如，发现文件打不开后，它可以换一种读取方式，而不必等你逐步指挥。

各家对 Agent 的用法并不完全一致。[Anthropic 的一种划分](https://www.anthropic.com/engineering/building-effective-agents)是：工作流沿预先写好的步骤运行，智能体则由模型根据情况决定过程与工具使用。

## 放到日常任务里

假设你要把活动报名表整理成一份 Word 报告。智能体可以读取表格、发现重复项、生成统计图，再把图表和说明放进文档。如果导出的图被裁切，它还需要检查结果并修正。这串行动是否真正完成，比它口头上列出多少步骤更有意义。

## 容易混淆的地方

智能体通常由模型、工具和运行流程组成，并不意味着使用了某种全新的基础模型。同一个模型接上不同工具、获得不同权限，能完成的事情可能差很多。联网回答一次问题，也不足以说明它能长期独立处理任务。

## 看演示时关注什么

留意使用的模型和产品、允许的工具、耗时以及人工介入次数。最后还要查看文件是否保存、内容是否正确、失败后有没有恢复。自主执行会让错误沿后续步骤累积，因此一段成功演示不能代替多次实际验证。
