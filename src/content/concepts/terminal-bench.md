---
title: "Terminal-Bench（终端任务评测）"
english: "Terminal-Bench"
aliases: [Terminal-Bench, Terminal Bench, T-Bench, Terminal-Bench 2.0, Terminal-Bench 2.1, Terminal-Bench 3.0, Terminal-Bench 4.0, Terminal-Bench-Science, Terminal-Bench Science, Terminal-Bench-Science 0.1]
category: "评测与指标"
summary: "考察 AI 能否通过命令行完成实际任务；题集版本、工具环境和科学工作流分支会影响分数含义。"
updated: 2026-09-10
sources:
  - title: "Terminal-Bench：最初发布说明"
    url: "https://www.tbench.ai/news/announcement"
  - title: "Terminal-Bench 4.0：资源与题集修订"
    url: "https://www.tbench.ai/news/terminal-bench-4-0"
  - title: "Terminal-Bench-Science 0.1：科学工作流评测"
    url: "https://www.tbench.ai/news/terminal-bench-science-0-1"
related: [agent, computer-use, swe-bench]
---

## 在命令行里把任务做完

终端是通过输入文字命令来操作电脑的界面。Terminal-Bench 让 AI 在准备好的环境中完成任务，例如配置软件、处理数据、修复程序或运行计算，再用测试检查结果。

这像把一台需要整理的电脑交给助手：它要读懂现状、选择工具、处理报错，最后留下可用的文件或系统状态。只会解释某条命令的用途，还不足以完成这种任务。

## Science 分支测什么

Terminal-Bench-Science 是面向科学研究工作流的独立分支。其 0.1 版包含数据分析、模拟、模型拟合和定理证明等任务，检查分析结果、代码和数据产物，而非只问科学知识选择题。

它并不是普通 Terminal-Bench 的一个“更难档位”。两者的任务范围不同，比较时需要写出完整名称及版本，不能把两个完成率画成同一条进步曲线。

## 读完成率还要看环境

Terminal-Bench 会修订题目、验证程序和资源配置。例如 4.0 调整了时间与计算资源，并修复或移除了部分任务。因此，版本变化可能同时改变测试内容与运行条件。

模型、智能体、可用工具和尝试次数也会影响结果。完成率衡量的是这套系统在规定任务中的表现；它不能单独说明助手能否适应自己的电脑环境，也不代表完成了完整科研项目中的选题与结果解释。
