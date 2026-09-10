import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '../consts';
import { link } from '../lib/utils';

export async function GET(context: APIContext) {
  const issues = (await getCollection('issues', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.issue - a.data.issue,
  );

  return rss({
    title: `${SITE.title} · ${SITE.org}`,
    description: SITE.description,
    site: new URL(link('/'), context.site!),
    trailingSlash: false,
    items: issues.map((issue) => ({
      title: `第 ${issue.data.issue} 期 · ${issue.data.title}`,
      pubDate: issue.data.date,
      description: issue.data.summary,
      link: link(`/issues/${issue.id}`),
      categories: issue.data.tags,
      content: [
        `<p>${escapeHtml(issue.data.summary)}</p>`,
        issue.data.highlights.length
          ? `<ul>${issue.data.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('')}</ul>`
          : '',
        `<p><em>覆盖 ${escapeHtml(issue.data.range)}</em></p>`,
      ].join(''),
    })),
    customData: `<language>zh-cn</language>`,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
