---
title: 提示词注入
english: Prompt injection
aliases: [Prompt injection, 提示注入, 间接提示词注入]
category: 模型与使用
summary: AI 把待阅读材料中的指令当成自己的任务要求，可能因此偏离用户原意；网页、文档和工具结果都可能携带这类内容。
updated: 2026-09-10
sources:
  - title: Anthropic：Mitigate jailbreaks and prompt injections
    url: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks
  - title: Anthropic：Mitigating the risk of prompt injections in browser use
    url: https://www.anthropic.com/news/prompt-injection-defenses
related: [agent, computer-use, context-window]
---

## 它是什么

提示词注入是通过输入中的指令，试图把 AI 引向原定任务以外的行为。周报里常见的是“间接提示词注入”：指令藏在 AI 代你读取的网页、文档、图片或工具结果中。这些材料是需要处理的数据，却被误当成了可以支配行动的要求。[官方文档区分了直接与间接注入](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks)。

## 一个无害的例子

你让 AI 总结活动网页上的时间和地点，网页里却夹着一段让摘要加入某个无关词语的要求。如果 AI 照做，就说明页面内容影响了它本应遵循的任务。正常做法是提取活动信息，必要时说明发现了异常要求。

## 与事实错误有什么区别

网页写错日期，会让 AI 引用错误信息；提示词注入则试图改变 AI 的行为。两者都可能导致错误答案，但出错原因不同。材料中出现命令句也不自动构成攻击：文章引用一条操作说明，仍可能只是要被阅读的正文。

## 为什么智能体尤其需要注意

当 AI 能写文件、操作网页或发送信息时，任务偏离可能影响真实状态。[浏览器智能体的相关研究](https://www.anthropic.com/news/prompt-injection-defenses)强调，这仍是尚未解决的问题。区分信息来源、限制工具权限并核对关键操作有助于降低风险，但一句提醒或一次成功拦截，都不能证明系统在所有场景下可靠。
