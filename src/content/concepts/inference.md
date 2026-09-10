---
title: 推理运行与思考
english: Inference and Reasoning
aliases: [Inference, Reasoning, 推理, 推理运行, 思考模型, 推理模型, 推理强度, 思考强度, 推理预算, 思考预算, reasoning_effort, budget_tokens]
category: 模型与使用
summary: 运行模型生成结果和进行多步思考都常被称作推理；区分两者，才能读懂速度、思考强度和预算说明。
updated: 2026-09-10
sources:
  - title: Google：Machine Learning Glossary — Inference
    url: https://developers.google.com/machine-learning/glossary#inference
  - title: Anthropic：Effort
    url: https://platform.claude.com/docs/en/build-with-claude/effort
  - title: Anthropic：Extended thinking
    url: https://platform.claude.com/docs/en/build-with-claude/extended-thinking
related: [token, llm, benchmark]
---

## 中文里的推理有两种常见意思

Inference 指使用训练好的模型处理输入、生成结果，也就是「运行模型」。给照片分类、生成一句问候，都属于这种推理。Reasoning 则强调结合条件、进行多步分析等能力或过程。新闻里的「推理速度」和「推理能力」，因此可能在讨论不同事情。[运行模型的定义](https://developers.google.com/machine-learning/glossary#inference)

## 用一道题来区分

让 AI 把活动通知改得简洁，和让它分析一道条件复杂的概率题，都会发生模型运行。后一个任务可能需要更多分析、检查或工具调用。产品显示「正在思考」说明它进入某种处理模式，但仅凭等待时间，无法知道其中每一步是否有效。

## 强度与预算分别控制什么

推理强度常以 low、medium、high 等档位表达，给模型使用多少努力的倾向。推理预算则更明确地给出 token、时间等资源目标或限制。两者不能统一换算：同一档位在不同模型上含义可能不同，预算也可能是目标或硬上限，需要看对应接口说明。[强度说明](https://platform.claude.com/docs/en/build-with-claude/effort)与[预算说明](https://platform.claude.com/docs/en/build-with-claude/extended-thinking)

## 思考更久不等于一定答对

更多资源可能帮助复杂任务，也可能带来重复分析和更长等待。对比模型时，需要记录思考设置、实际用量、工具权限及结果，避免把配置差异全部归因于模型本身。展示出来的思考文字还可能经过摘要，因此不能把它当成对全部内部计算的直接观察。
