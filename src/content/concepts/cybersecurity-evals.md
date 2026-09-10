---
title: 网络安全评测与风险分级
english: Cybersecurity evaluations and risk thresholds
aliases: [ExploitBench, Preparedness Framework, Critical, 网络安全评测, 风险分级]
category: 评测与指标
summary: 网络安全评测检查模型在规定任务中的表现，风险框架据多种证据判断能力门槛；一个高分不能直接等同于现实风险水平。
updated: 2026-09-10
sources:
  - title: OpenAI：Our updated Preparedness Framework
    url: https://openai.com/index/updating-our-preparedness-framework/
  - title: OpenAI：Path to Astra — critical capabilities and frontier safeguards
    url: https://openai.com/index/path-to-astra/
related: [benchmark, harness, alignment]
---

## 网络安全评测在测什么

这类评测会设置具体任务，观察模型识别问题、分析风险或完成安全研究的能力。不同题集覆盖范围不同。[OpenAI 对 ExploitBench 的介绍](https://openai.com/index/path-to-astra/)是考查根据已知漏洞开发利用的能力；它与发现全新漏洞、评估防护措施属于不同问题。

## Preparedness Framework 是什么

这是 OpenAI 用于评估先进能力及相关严重风险的框架，结合自动化评测、专家评估和防护措施审查。它规定如何解释证据及采取行动，本身并不是另一套试题。[官方框架说明](https://openai.com/index/updating-our-preparedness-framework/)也强调，需要持续更新判断。

## Critical 怎么理解

Critical 是该框架中的能力阈值，指可能开辟前所未有的严重危害路径的能力水平。达到阈值会对应更高的防护要求，但不能读成“每次使用都会出事”，也不是通用的模型综合排名。它与某个漏洞被标为严重或危急，评定的对象也不同。

## 一个阅读新闻的例子

假设报道同时写“某评测满分”和“达到 Critical”。需要分别看试题是什么、允许哪些工具和尝试，以及风险判断还参考了什么证据。研究配置与公开产品的功能限制也可能不同。单项满分只能说明该题集和条件下的结果，无法推出对任意真实系统都有效。
