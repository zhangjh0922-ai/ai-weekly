---
title: 智能体运行框架
english: Agent harness
aliases: [Harness, Agent harness, Scaffold, Scaffolding, 运行框架]
category: 模型与使用
summary: 围绕模型组织工具、任务状态、执行和检查的配套程序；框架会影响智能体表现，所以模型成绩与整套系统成绩需要分清。
updated: 2026-09-10
sources:
  - title: Anthropic：Effective harnesses for long-running agents
    url: https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
  - title: Anthropic：Building effective agents
    url: https://www.anthropic.com/engineering/building-effective-agents
related: [agent, tool-use, benchmark]
---

## 它是什么

在智能体语境中，Harness 通常指围绕模型运行的一套配套程序：传入任务和上下文、执行工具请求、保留进度，并决定何时重试或停止。Scaffold 有时也用来形容这些支撑结构，各团队的具体用法不完全相同。它们帮助模型持续做事，本身不等于模型的权重。

## 一个日常例子

让 AI 把多份活动资料整理成网站，可能需要反复读取文件、写代码和检查页面。框架可以保存待办清单，在新一轮工作开始时恢复进度，避免每次从头猜测。Anthropic 的[长时间运行智能体案例](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)就使用进度文件和功能检查来支持持续开发。

## 与工作流有何关系

工作流（Workflow）描述任务如何分步骤推进；运行框架提供执行和管理这些步骤的机制。[一种常见划分](https://www.anthropic.com/engineering/building-effective-agents)是，固定工作流预先规定路径，智能体则由模型根据反馈决定路径。同一个框架也可能同时包含这两类安排。

## 为什么评测要说明框架

同一个模型，如果获得不同工具、提示、重试次数和检查程序，完成率可能不同。看到成绩提高，需要确认是更换了模型，还是调整了整个系统。比较时应记录框架版本、可用工具、预算与人工参与；只有整套系统跑过的结果，才能直接归属于那套系统。
