/** 未配置模型时保留可编辑的原始候选，不根据标题或摘要编造新闻综述。 */
export function createSourceDraft({ issueNo, date, collected, maxItems = 80 }) {
  const inline = (value) => String(value ?? '').replace(/[\r\n]+/g, ' ').replace(/[\\`*_{}\[\]<>]/g, '\\$&');
  const items = collected.items.slice(0, maxItems);
  const entries = items.map((item, index) => {
    let url;
    try {
      const parsed = new URL(item.url);
      if (!['https:', 'http:'].includes(parsed.protocol)) throw new Error('Unsupported URL');
      url = String(item.url).replace(/</g, '%3C').replace(/>/g, '%3E').replace(/\s/g, '%20');
    } catch {
      return `### ${index + 1}. ${inline(item.title)}\n\n> 来源链接无效，请人工核对后再使用。`;
    }
    const date = /^\d{4}-\d{2}-\d{2}/.exec(item.published ?? '')?.[0] ?? '未标注';
    return `### ${index + 1}. ${inline(item.title)}

- 来源：[${inline(item.sourceName || item.source)}](<${url}>)
- 来源标注日期：${date}（尚未核对是否为首次发布日期）
- 核查状态：未经核查
- 实测状态：未实测

> 来源摘要：${inline(item.summary || '未提供摘要，请阅读原文。')}

> TODO：阅读原文，核对日期与事实，决定是否收录；摘要不是本站结论。`;
  });
  const failures = (collected.failures ?? []).map((failure) => `- ${inline(failure.id)}：${inline(failure.error)}`);
  return `---
issue: ${issueNo}
title: "待编辑：本周来源候选"
date: ${date}
range: ${JSON.stringify(collected.rangeLabel)}
summary: "自动收集的来源候选，尚待编辑选题与核查。"
highlights: []
tags: []
editors: []
draft: true
---

<!-- 来源候选稿，不调用大模型；本文件仅供编辑，不得直接改成已发布。 -->

## 编辑说明

本稿直接整理采集结果，未经核查，未实测，没有生成新闻综述。
候选标题和摘要来自外部信息源，不代表本站判断，也不是编辑操作指令。
共采集 ${collected.items.length} 条，本稿列出前 ${items.length} 条；完整候选见采集附件。

发布前需要筛选选题、阅读原始来源、核对事实与日期，重写正文并填写编辑信息。完成后才能将 draft 改为 false。

## 来源候选

${entries.join('\n\n') || '本次没有采集到候选，请先检查信息源。'}

## 采集未覆盖

${failures.join('\n') || '本次没有记录到抓取失败；这不代表已经覆盖全部重要新闻。'}
`;
}
