// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import { satteri } from '@astrojs/markdown-satteri';
import conceptLinks from './scripts/concept-links.mjs';

// 部署到 GitHub Pages 时，这两个值由 .github/workflows/deploy.yml 注入：
//   SITE_URL  = https://<用户名>.github.io
//   BASE_PATH = /<仓库名>/
// 本地开发不设置即可（默认根路径）。
// 如果以后绑定了自定义域名，把 SITE_URL 改成域名、BASE_PATH 留空。
const site = process.env.SITE_URL || 'https://example.github.io';
const base = process.env.BASE_PATH || '/';
const conceptIds = fs.readdirSync(new URL('./src/content/concepts/', import.meta.url))
  .filter((name) => name.endsWith('.md'))
  .map((name) => name.slice(0, -3));

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  markdown: {
    processor: satteri({ mdastPlugins: [conceptLinks({ base, ids: conceptIds })] }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
  },
  build: {
    format: 'directory',
  },
});
