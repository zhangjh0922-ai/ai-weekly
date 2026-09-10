---
title: "SWE-bench（软件工程评测）"
english: "SWE-bench"
aliases: [SWE-bench, SWE-Bench, SWE-bench Verified, SWE-Bench Verified, SWE-Bench Pro, SWE-bench Pro, DeepSWE, DeepSWE-Preview]
category: "评测与指标"
summary: "让 AI 修改真实代码项目并接受测试的软件工程评测；Verified、Pro 及同名 DeepSWE 项目需要分别辨认。"
updated: 2026-09-10
sources:
  - title: "SWE-bench：官方基准说明"
    url: "https://www.swebench.com/"
  - title: "OpenAI：Introducing SWE-bench Verified"
    url: "https://openai.com/index/introducing-swe-bench-verified/"
  - title: "Scale AI：SWE-Bench Pro"
    url: "https://scale.com/blog/swe-bench-pro"
  - title: "Together AI：DeepSWE-Preview"
    url: "https://www.together.ai/blog/deepswe"
  - title: "Datacurve：DeepSWE 基准"
    url: "https://deepswe.datacurve.ai/"
related: [benchmark, agent, livecodebench]
---

## 测的是修改现有项目

SWE-bench 把真实 GitHub 项目的问题描述和代码交给 AI，要求它找到相关文件、修改程序，再用测试检查问题是否解决。原始题集来自 Python 项目，关注的是在已有代码中完成任务。

可以把它类比为接手一栋正在使用的房子：先弄清管线，再修好故障，还要避免影响其他房间。它与从零写一个小程序所需的能力有所不同。

## Verified 和 Pro 是什么

SWE-bench Verified 是原始 SWE-bench 中经人工筛选的 500 题子集，筛选关注问题是否清楚、测试是否适合验证修复。Verified 并不保证题目永远没有错误。

SWE-Bench Pro 由 Scale AI 推出，另行收集更复杂的软件工程任务，包含公开、保留和商业代码题集。它不是把 Verified 原题调高难度，两者的题目来源和范围不同，分数不能直接互换。

## DeepSWE 有两个同名项目

Together AI 与 Agentica 的 DeepSWE-Preview 是编码模型及智能体项目；Datacurve 的 DeepSWE 则是一套独立的软件工程基准。看到“DeepSWE 成绩”时，需要从出处确认它指被测试的系统，还是测试题集。

## 分数还取决于运行方式

常见指标是解决任务的比例。除了题集，还需要看模型搭配的智能体、可用工具、尝试次数和运行预算。通过既定测试能说明补丁满足这些检查，不能涵盖代码可维护性、安全性或整个项目的所有要求。
