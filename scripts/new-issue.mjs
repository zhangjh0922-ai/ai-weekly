#!/usr/bin/env node
/**
 * 手写一期时用这个：按模板生成一个空的期号文件，不调用任何 API。
 *
 *   node scripts/new-issue.mjs
 *   node scripts/new-issue.mjs --issue=3 --slug=2026-w38
 */
import fs from 'node:fs';
import path from 'node:path';
import { paths, writeText, parseArgs, isoWeekSlug, isoDay, log } from './lib/util.mjs';

const args = parseArgs();

const existing = fs.existsSync(paths.issues)
  ? fs
      .readdirSync(paths.issues)
      .filter((f) => f.endsWith('.md'))
      .map((f) => {
        const m = fs.readFileSync(path.join(paths.issues, f), 'utf8').match(/^issue:\s*(\d+)/m);
        return m ? Number(m[1]) : 0;
      })
  : [];

const issueNo = Number(args.issue ?? (existing.length ? Math.max(...existing) + 1 : 1));
const slug = String(args.slug ?? isoWeekSlug());
const outFile = path.join(paths.issues, `${slug}.md`);

if (fs.existsSync(outFile) && !args.force) {
  log.err(`${outFile} 已存在。加 --force 覆盖。`);
  process.exit(1);
}

const today = isoDay();
const weekAgo = isoDay(Date.now() - 7 * 86_400_000);

const template = `---
issue: ${issueNo}
title: "待填写：本期主线"
date: ${today}
range: "${weekAgo} ~ ${today}"
summary: "一句话概述本周最重要的变化，40 字以内。"
highlights:
  - "要点一"
  - "要点二"
  - "要点三"
tags:
  - 模型发布
editors: []
draft: true
---

## 本期速览

-
-
-

## 本周重点

### 1. 标题

**发生了什么** —— 事实陈述，附 [来源](https://)。

**为什么重要** —— 相对之前变了什么。

**核查状态** —— TODO：记录已查阅的来源、核查日期和仍未确认的信息。

**实测状态** —— TODO：实际使用过的，记录模型、版本、日期、任务、工具环境和结果；没试就写「未实测」。

**使用观察** —— TODO：结合学习、工作或日常场景填写，未经测试的设想需明确标注；不适用时省略本节。

**限制与待核实信息** —— 已知限制、失败情况与仍需核实的问题。

## 其他动态

- [标题](https://) —— 一句话说明（来源）

## 本期未覆盖

-
`;

writeText(outFile, template);
log.ok(`已创建 ${path.relative(process.cwd(), outFile)}（第 ${issueNo} 期）`);
console.log('\n写完后把 draft 改成 false 再提交。');
