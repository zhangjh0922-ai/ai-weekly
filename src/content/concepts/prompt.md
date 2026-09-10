---
title: 提示词
english: Prompt
aliases: [Prompt, System prompt, 系统提示词, 提示工程]
category: 基础概念
summary: 交给 AI 的任务说明、背景材料和示例；清楚的要求能减少误解，但无法保证答案正确或让模型获得不存在的能力。
updated: 2026-09-10
sources:
  - title: Anthropic：Prompt engineering overview
    url: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview
  - title: Anthropic：Using the Messages API
    url: https://platform.claude.com/docs/en/build-with-claude/working-with-messages
  - title: Anthropic：Prompting best practices
    url: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
related: [context-window, prompt-injection, reasoning-chain]
---

## 它是什么

Prompt 常译作提示词，也可以是一整段任务说明，包含目标、背景、限制和示例。广义的模型输入还可以包含图片等材料。“提示工程”就是调整这些输入，并观察修改是否让结果更符合需求。判断标准需要结合实际任务，[官方指南也强调先明确成功条件](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)。

## 一个日常例子

“帮我写活动通知”留下了很多空白。补充活动时间、地点、面向谁、报名方式，以及希望控制在两百字内，AI 就更容易写出可用稿件。给一份你喜欢的通知作参考，还能减少对语气和格式的误解。

## 系统提示词与多轮要求

系统提示词通常由应用设置，用来规定助手角色和通用行为；用户消息则描述当前任务。聊天时的后续要求也会影响输出，例如先要求保留全部细节，后来改为只留三项重点。[消息接口通过角色和历史消息组织对话](https://platform.claude.com/docs/en/build-with-claude/working-with-messages)，模型能利用的范围仍取决于实际传入的上下文。

## 写得长不一定更有效

过多重复、相互冲突的要求，可能让重点更难识别。可以把必须满足的条件和可自由发挥的部分分开，并用具体结果检查效果。提示词能改善任务表达，却不会自动核实事实、授予工具权限，或保证模型始终遵循每条要求。
