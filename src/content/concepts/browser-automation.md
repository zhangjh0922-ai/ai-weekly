---
title: 浏览器自动化
english: Browser automation
aliases: [Browser automation, Browser use, DOM, GUI, 网页交互]
category: 模型与使用
summary: 让程序或 AI 在浏览器中打开页面、填写信息和检查结果；读取网页结构与观察截图是不同操作方式，评测时应说明。
updated: 2026-09-10
sources:
  - title: Playwright 官方文档：Locators
    url: https://playwright.dev/docs/locators
  - title: Anthropic：Computer use tool
    url: https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool
related: [computer-use, tool-use, agent]
---

## 它是什么

浏览器自动化是让程序控制浏览器完成操作，例如打开页面、点击按钮、填写表单和读取结果。它可以按事先写好的脚本运行，也可以由 AI 根据页面情况决定下一步。因而看到“自动化”，并不能直接判断背后是否使用了模型。

## DOM 与 GUI 是什么

DOM 是浏览器组织网页内容的结构，包含按钮、文本框等元素。工具可以根据元素名称或属性定位它们，[Playwright 的定位功能](https://playwright.dev/docs/locators)就是例子。GUI 指图形用户界面；另一种方式是让模型看截图，再通过鼠标和键盘操作。两种方式可配合使用，但获得的信息不同。

## 与搜索和电脑操作的关系

搜索重在找到资料，浏览器自动化还可以改变网页状态。例如找到活动报名页后，填写信息并保存草稿，需要额外的交互和检查。Computer use 的范围可延伸到桌面软件；通过截图操作浏览器，也可以属于[计算机操作](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool)的一部分。

## 看演示时如何判断

以保存报名草稿为例，应重新打开记录，确认字段和保存状态，而不只看是否点击了按钮。网页加载、弹窗和登录状态都可能影响过程。评测应写清是否允许读取网页结构、使用截图或调用其他接口，同时记录人工协助；完成同一任务，不代表采用了相同条件。
