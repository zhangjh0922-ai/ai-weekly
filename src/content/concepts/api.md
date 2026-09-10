---
title: API 与 SDK
english: Application Programming Interface / Software Development Kit
aliases: [API, SDK, API key, API 密钥, API 接口, 应用程序接口, 软件开发工具包]
category: 基础概念
summary: API 让程序按约定调用服务，SDK 提供更方便的开发工具；通过接口使用模型，与使用完整聊天产品的条件可能不同。
updated: 2026-09-10
sources:
  - title: MDN：API
    url: https://developer.mozilla.org/en-US/docs/Glossary/API
  - title: Anthropic：CLI, SDKs, and libraries
    url: https://platform.claude.com/docs/en/cli-sdks-libraries/overview
related: [tool-use, mcp, token]
---

## API 是什么

API 是应用程序接口：一套让软件之间交换请求和结果的约定。[MDN 的解释](https://developer.mozilla.org/en-US/docs/Glossary/API)强调，它提供程序可以使用的功能与规则。在 AI 应用中，开发者可以发送模型名称、任务内容等信息，再接收模型输出，而无需手动打开聊天网页。

API key（API 密钥）是一些服务用来识别调用账户的凭证，可能关联访问权限与账单，需要保密；它不是模型本身，也不是付费聊天账号天然附带的同一份额度。

## SDK 又是什么

SDK 是软件开发工具包，通常包含现成代码和辅助工具。用于模型接口的客户端 SDK，可以替开发者处理请求格式、返回结果和部分错误。比如 [Anthropic 的客户端 SDK](https://platform.claude.com/docs/en/cli-sdks-libraries/overview)提供多种编程语言的调用方式。SDK 会帮助使用 API，但它本身不等于 AI 模型。

## 一个日常例子

你想在周报编辑器里加“生成摘要”按钮。按钮背后的程序可以把文章通过 API 交给模型，再把摘要放回编辑框。SDK 能减少这段连接代码，却不会自动决定摘要好不好，或替你设计完整网页。

## 为什么与网页聊天的结果不同

聊天产品可能额外提供系统提示词、搜索、文件处理或对话管理；通过 API 调用时，需要核对实际启用了哪些功能。即使显示相同的模型名，输入材料、设置与工具不同，结果也可能不同。评测中应记录调用渠道和配置，不能把两种使用方式默认视为同一条件。
