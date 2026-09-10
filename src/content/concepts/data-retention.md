---
title: 数据留存与零留存
english: Data retention and zero data retention
aliases: [ZDR, Zero data retention, 零数据留存, 数据留存, 数据保留, EFS, Enterprise Frontier Safeguards]
category: 模型与使用
summary: 数据是否保存、保存在哪里、谁能访问以及是否用于训练是不同问题；零留存安排有适用范围，不能推断所有产品与工具都不存数据。
updated: 2026-09-10
sources:
  - title: Anthropic：API and data retention
    url: https://platform.claude.com/docs/en/manage-claude/api-and-data-retention
  - title: Anthropic：Developing Enterprise Frontier Safeguards with our customers
    url: https://www.anthropic.com/news/enterprise-frontier-safeguards
related: [api, mcp, local-deployment]
---

## 数据留存指什么

数据留存是服务保存输入、输出或相关记录的安排，需要看保存内容、时长和位置。是否用于训练是另一维度：保存聊天以便下次打开，不必然意味着拿去训练；承诺不用来训练，也不代表完全不保存。

## ZDR 的范围

ZDR 是零数据留存。以 [Anthropic 的 API 安排](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention)为例，它通常指响应返回后，不持久保存客户的提示和回复，但受模型、功能及约定范围限制，并有安全标记或法律要求等例外。不能把它扩展为所有聊天产品、上传文件和第三方工具都不保留记录。

## EFS 是什么

EFS 是 Anthropic 的 Enterprise Frontier Safeguards 方案。[2026 年 9 月的公告](https://www.anthropic.com/news/enterprise-frontier-safeguards)介绍了客户自有云存储、客户管理加密密钥等可选控制，并保留自动安全监测。这里的数据仍可能保存在客户账户中。截至本页更新，官方计划于秋季分批开放，具体可用性需要按账户和服务确认。

## 一个实际阅读方法

假设把活动报名表交给 AI 整理，需要分别看模型服务、使用的应用和外接工具各自如何处理文件。询问“存在哪里、存多久、谁能访问、是否用于训练”比只找“隐私保护”几个字更具体。ZDR 与 EFS 都应按对应官方文档和合同范围理解，不能据名称作出跨产品保证。
