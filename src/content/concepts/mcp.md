---
title: MCP
english: Model Context Protocol
aliases: [MCP, Model Context Protocol, 模型上下文协议, MCP Server]
category: 模型与使用
summary: 让 AI 应用按统一方式连接外部资料和工具的协议；它解决连接方式的问题，不会自动提高模型能力或授予所有访问权限。
updated: 2026-09-10
sources:
  - title: MCP 官方文档：What is the Model Context Protocol?
    url: https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro
  - title: MCP 规范：Authorization
    url: https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization
related: [tool-use, api, prompt-injection]
---

## 它是什么

MCP 是 Model Context Protocol 的缩写，常译为模型上下文协议。它约定了 AI 应用如何发现和使用外部工具、资料及提示模板。按[官方介绍](https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro)，目的在于提供统一连接方式，让应用不必为每种数据来源都从头设计一套沟通规则。

## 一个日常例子

假设笔记服务提供一个 MCP 服务端，把“查找笔记”和“读取正文”开放出来。支持 MCP 的 AI 应用可以连接它，在你询问活动安排时查找相关记录。“服务端”就是提供这些能力的程序，既可能运行在本机，也可能运行在远处的服务器上。

## 与模型和 API 有何区别

MCP 本身不负责理解你的问题，也不是一种新模型。它可以把已有 API 包装成 AI 应用易于连接的工具；底层查询仍由对应软件执行。支持 MCP 只说明具备某种连接能力，不能据此判断答案质量、操作可靠性或支持哪些具体服务。

## 连接之后能做什么

可用能力取决于服务端提供什么、应用支持什么，以及账户获得了哪些权限。[MCP 的授权规范](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization)也区分访问凭证与权限范围。接上笔记库不等于允许删除笔记；接收到外部正文，也不意味着正文里的要求可以覆盖用户任务。协议兼容性和内容可信度需要分别判断。
