---
title: 计算机操作
english: Computer use
aliases: [Computer use, computeruse, CUA, 电脑操作]
category: 模型与使用
summary: AI 通过电脑界面完成点击、输入和跨应用任务；评估时需要检查实际结果，并说明使用的工具环境。
updated: 2026-09-10
sources:
  - title: Anthropic：Computer use tool
    url: https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool
  - title: OSWorld：真实电脑环境中的智能体评测
    url: https://arxiv.org/abs/2404.07972
related: [agent, prompt-injection, benchmark]
---

## 它是什么

Computer use 通常指 AI 通过图形界面操作电脑，例如看截图、识别按钮、点击和输入，再观察界面有没有按预期变化。模型给出操作意图，由配套工具真正执行；[Anthropic 的计算机操作工具](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool)就是一种实现。

## 搜索、网页交互和桌面操作有何区别

搜索资料主要是在获取信息；网页交互还要填写表单、切换选项或保存记录；桌面任务则可能跨越浏览器、表格软件和 Word。它们会用到相近能力，但完成前一种任务不保证能完成后一种。

浏览器工具也可能直接读取网页结构并定位按钮。它与只看截图、使用鼠标键盘的方式，获得的信息和可用动作不同，比较成绩时应说明。

## 一个日常例子

让 AI 把表格中的报名人数做成图表，插入 Word，再导出 PDF。验收时要打开成品，核对数字、排版和保存位置；只看到它点击“导出”，还不能确定任务完成。像 [OSWorld](https://arxiv.org/abs/2404.07972) 这样的评测，会设置初始环境并检查执行后的实际状态。

## 怎样理解能力边界

电脑操作需要读懂界面、规划步骤、定位控件和处理失败，任何一环出错都可能影响结果。测试记录应包含模型、产品、工具、系统环境和人工协助；通过接口或脚本直接生成文件的结果，也应与通过界面操作的结果注明区别。
