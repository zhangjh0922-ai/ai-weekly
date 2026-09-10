import test from 'node:test';
import assert from 'node:assert/strict';
import { createSatteriMarkdownProcessor } from '@astrojs/markdown-satteri';
import conceptLinks from './concept-links.mjs';

const renderer = (options) => createSatteriMarkdownProcessor({
  syntaxHighlight: false,
  mdastPlugins: [conceptLinks(options)],
});

test('concept links render under root and repository base paths, including tables', async () => {
  for (const base of ['/', '/ai-weekly/', '/ai-weekly']) {
    const processor = await renderer({ base, ids: ['frontiermath'] });
    const { code } = await processor.render('| 指标 |\n| --- |\n| [FrontierMath](concept:frontiermath) |');
    const prefix = base === '/' ? '' : '/ai-weekly';
    assert.ok(code.includes(`href="${prefix}/concepts/frontiermath"`));
    assert.ok(code.includes('data-concept="frontiermath"'));
    assert.ok(code.includes('>FrontierMath</a>'));
  }
});

test('misspelled or malformed concept targets fail instead of publishing broken links', async () => {
  const processor = await renderer({ ids: ['agi'] });
  for (const target of ['frontier-math', '../agi', 'agi#missing', '']) {
    await assert.rejects(processor.render(`[AGI](concept:${target})`), /Unknown concept/);
  }
});

test('site-root Markdown links use the deployment base and preserve query strings and fragments', async () => {
  for (const base of ['/', '/ai-weekly/', '/ai-weekly']) {
    const processor = await renderer({ base });
    const { code } = await processor.render('[第 1 期](/issues/2026-w35) [首页](/) [定位](/issues/2026-w35?view=full#cost)');
    const prefix = base === '/' ? '' : '/ai-weekly';
    assert.ok(code.includes(`href="${prefix}/issues/2026-w35"`));
    assert.ok(code.includes(`href="${prefix}/"`));
    assert.ok(code.includes(`href="${prefix}/issues/2026-w35?view=full#cost"`));
    assert.ok(!code.includes('data-concept='));
  }
});

test('external and relative links, fragments, code and unmarked abbreviations stay unchanged', async () => {
  const markdown = '[来源](https://epoch.ai/frontiermath) [HTTP](http://example.com/article) [协议相对](//example.com/article) [邮件](mailto:hello@example.com) [页内](#sources) [相对](../issues/2026-w35) [查询](?view=full)\n\nARC-AGI contains AGI.\n\n`[AGI](concept:agi)`';
  const baseline = await createSatteriMarkdownProcessor({ syntaxHighlight: false });
  const expected = (await baseline.render(markdown)).code;
  for (const base of ['/', '/ai-weekly/']) {
    const processor = await renderer({ base, ids: ['agi'] });
    assert.equal((await processor.render(markdown)).code, expected);
  }
});
