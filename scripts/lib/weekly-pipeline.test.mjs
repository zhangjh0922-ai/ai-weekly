import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createSourceDraft } from './source-draft.mjs';
import { resolveProvider } from './llm.mjs';

const scripts = fileURLToPath(new URL('../', import.meta.url));

test('every failing feed has three attempts regardless of its position in the source list', async () => {
  const sources = Array.from({ length: 6 }, (_, i) => ({ id: `feed-${i}`, url: `https://example.com/${i}` }));
  const attempts = Object.fromEntries(sources.map(({ url }) => [url, 0]));
  const code = fs.readFileSync(path.join(scripts, 'collect.mjs'), 'utf8')
    .replace(/^#![^\n]*\n/, '')
    .replace(/^import[\s\S]*?from ['"][^'"]+['"];\s*/gm, '');
  const quiet = () => {};
  const exit = Symbol('exit');
  await vm.runInNewContext(`(async () => { ${code}\n })()`, {
    Parser: class { async parseURL(url) { attempts[url]++; throw new Error('HTTP 503'); } },
    paths: { sources: 'sources.json' },
    readJson: () => ({ sources, keywords: { release: [], model: [] } }),
    parseArgs: () => ({ check: true }),
    log: { step: quiet, ok: quiet, err: quiet, warn: quiet, dim: quiet },
    console: { log: quiet },
    setTimeout: (callback) => queueMicrotask(callback),
    process: { exit: () => { throw exit; } },
  }).catch((error) => { if (error !== exit) throw error; });
  assert.deepEqual(Object.values(attempts), Array(6).fill(3));
});

test('without an API key the command writes an unpublished source draft without claiming verification', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'weekly-draft-test-'));
  try {
    fs.mkdirSync(path.join(temporary, 'scripts', 'lib'), { recursive: true });
    fs.mkdirSync(path.join(temporary, 'src', 'content', 'issues'), { recursive: true });
    fs.mkdirSync(path.join(temporary, '.cache'), { recursive: true });
    fs.copyFileSync(path.join(scripts, 'draft.mjs'), path.join(temporary, 'scripts', 'draft.mjs'));
    for (const name of fs.readdirSync(path.join(scripts, 'lib')).filter((name) => name.endsWith('.mjs') && !name.endsWith('.test.mjs'))) {
      fs.copyFileSync(path.join(scripts, 'lib', name), path.join(temporary, 'scripts', 'lib', name));
    }
    fs.writeFileSync(path.join(temporary, '.cache', 'collected.json'), JSON.stringify({
      rangeLabel: '2026-10-12 ~ 2026-10-18', sourceCount: 2, failures: [{ id: 'unavailable', error: '503' }],
      items: [{ title: 'An official announcement', url: 'https://example.com/announcement', source: 'official', sourceName: 'Official source', published: '2026-10-13T00:00:00Z', summary: 'A supplied feed summary.', alsoSeenIn: [] }],
    }));
    const env = { ...process.env, LLM_PROVIDER: 'deepseek', LLM_MODEL: '' };
    for (const key of Object.keys(env)) if (key.endsWith('_API_KEY')) delete env[key];
    const result = spawnSync(process.execPath, ['scripts/draft.mjs', '--slug=2026-w42'], { cwd: temporary, env, encoding: 'utf8', timeout: 10000 });
    assert.equal(result.status, 0, result.stderr + result.stdout);
    const draft = fs.readFileSync(path.join(temporary, 'src', 'content', 'issues', '2026-w42.md'), 'utf8');
    assert.match(draft, /^draft: true$/m);
    assert.match(draft, /未经核查/);
    assert.match(draft, /未实测/);
    assert.match(draft, /https:\/\/example\.com\/announcement/);
    assert.match(draft, /An official announcement/);
    assert.match(draft, /2026-10-13/);
    assert.match(draft, /unavailable/);
    assert.doesNotMatch(draft, /已核实|已实测/);
  } finally {
    assert.ok(path.resolve(temporary).startsWith(path.join(path.resolve(os.tmpdir()), 'weekly-draft-test-')));
    fs.rmSync(temporary, { recursive: true, force: true });
  }
});

test('configured credentials retain their provider and configuration errors stay distinguishable', () => {
  const provider = resolveProvider({ LLM_PROVIDER: 'deepseek', LLM_API_KEY: 'test-only', LLM_MODEL: 'configured-model' });
  assert.equal(provider.name, 'deepseek');
  assert.equal(provider.model, 'configured-model');
  assert.equal(provider.apiKey, 'test-only');
  assert.throws(() => resolveProvider({ LLM_PROVIDER: 'deepseek' }), { code: 'MISSING_API_KEY' });
  assert.throws(() => resolveProvider({ LLM_PROVIDER: 'misspelled-provider' }), (error) => error.code !== 'MISSING_API_KEY');
});

test('source drafts escape feed markup and preserve the candidate limit and date uncertainty', () => {
  const draft = createSourceDraft({
    issueNo: 4, date: '2026-10-18', maxItems: 1,
    collected: { rangeLabel: '2026-10-12 ~ 2026-10-18', items: [
      { title: 'A [title]\nsecond line', url: 'https://example.com/a(b)', sourceName: 'Publisher', summary: '<script>bad</script>' },
      { title: 'Omitted candidate', url: 'https://example.com/omitted' },
    ] },
  });
  assert.match(draft, /A \\\[title\\\] second line/);
  assert.ok(!draft.includes('<script>'));
  assert.match(draft, /https:\/\/example\.com\/a\(b\)/);
  assert.match(draft, /来源标注日期：未标注/);
  assert.match(draft, /共采集 2 条，本稿列出前 1 条/);
  assert.ok(!draft.includes('Omitted candidate'));
});
