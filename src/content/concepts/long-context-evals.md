---
title: 长上下文评测
english: Long-context evaluations
aliases: [MRCR, OpenAI MRCR, Needle in a haystack, NIAH, 大海捞针, 多针检索]
category: 评测与指标
summary: 检查模型能否在大量材料中找准并利用信息；大海捞针与 MRCR 覆盖不同检索难度，不能仅凭窗口容量判断理解能力。
updated: 2026-09-10
sources:
  - title: OpenAI MRCR 官方数据集
    url: https://huggingface.co/datasets/openai/mrcr
  - title: Google：Long context
    url: https://ai.google.dev/gemini-api/docs/long-context
related: [context-window, benchmark, rag]
---

## 大海捞针是什么

Needle in a haystack 常译为“大海捞针”：把目标信息放进很长的材料中，再要求模型找出来。它是一类测试方法，不是唯一固定的题集。目标位置、干扰内容和需要找到几条信息，都可能改变难度。[Google 的文档](https://ai.google.dev/gemini-api/docs/long-context)也指出，单条与多条信息检索的表现可能不同。

## MRCR 又测什么

MRCR 即多轮指代消解，关注长对话中相似内容与先后顺序。[OpenAI 发布的版本](https://huggingface.co/datasets/openai/mrcr)在长对话里安排多次相同写作请求，最后要求返回其中指定的一次回复。它提供两针、四针和八针等设置，因此引用成绩时需要注明版本和条件。

## 放到日常场景里

假设你与 AI 讨论了很久，同一份活动通知已经改过三次，现在要求它找回第二版。找到任意一版都不够，还要区分顺序和内容。类似任务比在文档里找到一个明显的日期，更能暴露长对话中的混淆。

## 大窗口保证什么

上下文窗口描述可容纳的输入与输出范围，不保证其中每条信息都能被准确利用。检索成功也不能直接证明跨文档比较、推理或总结都可靠。看评测时应核对材料长度、目标数量、评分方式和失败位置，再结合自己的任务验证，而不只看窗口有多少 token。
