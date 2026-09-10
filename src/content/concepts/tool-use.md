---
title: 工具调用
english: Tool use / Function calling
aliases: [Tool use, Function calling, 工具使用, 函数调用]
category: 模型与使用
summary: 模型选择工具并生成调用请求，由配套程序执行后返回结果；会提出请求与工具真实执行成功，是需要分别确认的两件事。
updated: 2026-09-10
sources:
  - title: Anthropic：Tool use with Claude
    url: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview
related: [agent, api, mcp]
---

## 它是什么

工具调用让模型使用对话生成之外的功能，例如查询数据、计算数字或保存文档。系统先告诉模型有哪些工具、各自用途和需要什么信息；模型再生成指定格式的调用请求。请求由应用或服务提供方的程序执行，结果随后回到模型。[官方文档展示了这一来回过程](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)。

## 一个日常例子

你让 AI 统计一份报名表。它可以调用表格读取工具取得数据，再调用计算工具统计各组人数，最后解释结果。如果没有读取成功，它就不能仅凭“我会检查表格”这句话，声称已经核对全部记录。

## 与普通回答有何区别

模型在回复中写出一段代码，不意味着代码已经运行；说“文件已保存”，也不意味着电脑上出现了文件。Function calling 是工具调用的一种常用说法，强调模型输出函数名称和参数，再由程序执行。工具并不只限于函数名看起来像代码的操作，也可以封装搜索、图像生成或网页交互。

## 怎样判断调用是否可靠

要分别检查工具选得是否合适、参数是否正确、执行是否成功，以及模型有没有如实理解返回结果。格式正确不保证填入的日期或文件路径正确。工具调用可成为智能体多步行动的一部分，但一次调用成功，不能证明整项任务已经完成；最终仍要核对数据或成品。
