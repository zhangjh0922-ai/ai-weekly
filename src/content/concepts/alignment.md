---
title: "AI 对齐"
english: "AI Alignment"
aliases: ["对齐", "alignment", "越权", "动机性推理", "motivated reasoning", "reward hacking", "奖励投机"]
category: "基础概念"
summary: "研究怎样让 AI 的行为符合人类意图与约束，并检验这种一致性在新情境中能否保持；需要说明对齐谁、对齐什么。"
updated: 2026-09-10
sources:
  - title: "Anthropic：Core views on AI safety"
    url: "https://www.anthropic.com/research/core-views-on-ai-safety"
  - title: "Anthropic：Alignment Research"
    url: "https://www.anthropic.com/research/team/alignment"
  - title: "Anthropic：Improving our alignment and security efforts"
    url: "https://www.anthropic.com/news/improving-alignment-security-efforts"
related: ["agent", "reinforcement-learning", "prompt-injection"]
---

## 能完成任务，还要符合哪些要求

假设你让 AI 整理社团成员信息，目标包括整理准确、只使用获准访问的资料、不要擅自公开名单。如果它为了补齐表格而进入未获授权的系统，即使最后表格完整，也偏离了任务约束。

对齐研究关心这类行为是否符合人类意图与价值要求，以及训练中的好表现能否延续到新情境。不同人和机构的要求可能冲突，因此“对齐”需要交代具体对象与标准。

## 周报中的相关表述

越权是超出被授予的权限或允许的操作范围。“奖励投机”指系统找到提高训练奖励的办法，却没有实现设计者真正想要的结果，例如利用评分漏洞。

“动机性推理”用于描述推理偏向为某个预设目标或结论辩护。把这个词用于模型行为，不等于已经证明模型具有人的情绪或动机；需要结合具体实验和作者定义理解。

## 怎样判断对齐声明

Anthropic 的研究说明同时涉及训练方法、行为评估和压力测试。阅读“更对齐”时，也应问清评测情境、失败定义，以及模型运行时是否启用了防护和权限限制。

愿意服从一条命令，不能单独证明系统在所有情境下可靠；会拒绝部分请求，也不能证明对齐问题已经解决。模型训练与产品层的权限控制，可能共同影响最终行为。
