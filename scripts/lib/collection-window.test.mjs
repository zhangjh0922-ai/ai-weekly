import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { collectionWindow, publishedIssueDates } from './collection-window.mjs';

const now = new Date('2026-10-19T03:00:00.000Z');
const windowFor = (args = {}, dates = []) => collectionWindow(args, { now, publishedDates: dates });

test('default window recovers the publication gap while retaining a seven-day minimum', () => {
  const recovered = windowFor({}, ['2026-09-07']);
  assert.equal(recovered.windowStart, '2026-09-07T00:00:00.000Z');
  assert.equal(recovered.windowEnd, now.toISOString());
  assert.equal(recovered.rangeLabel, '2026-09-07 ~ 2026-10-19');
  assert.equal(recovered.windowDays, 43);
  assert.equal(windowFor({}, ['2026-10-18']).windowStart, '2026-10-12T03:00:00.000Z');
  assert.equal(windowFor().windowStart, '2026-10-12T03:00:00.000Z');
});

test('explicit days or since override recovery and preserve exact UTC boundaries', () => {
  assert.equal(windowFor({ days: '14' }, ['2026-09-07']).windowStart, '2026-10-05T03:00:00.000Z');
  assert.equal(windowFor({ since: '2026-09-08' }, ['2026-10-18']).windowStart, '2026-09-08T00:00:00.000Z');
  assert.equal(windowFor({ days: 'auto', since: '2026-09-08' }).windowStart, '2026-09-08T00:00:00.000Z');
  assert.equal(windowFor({ days: 'auto' }, ['2026-09-07']).windowStart, '2026-09-07T00:00:00.000Z');
});

test('invalid or conflicting window arguments fail before collecting', () => {
  for (const days of ['0', '-1', '1.5', 'NaN', '', true, '99999999999999999']) {
    assert.throws(() => windowFor({ days }), /days/);
  }
  for (const since of ['2026-02-30', '2026-2-01', '2026-10-20', '', true]) {
    assert.throws(() => windowFor({ since }), /since/);
  }
  assert.throws(() => windowFor({ days: '7', since: '2026-09-08' }), /days.*since|since.*days/);
});

test('drafts and dates in article bodies cannot replace the latest published issue', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'weekly-window-test-'));
  try {
    fs.writeFileSync(path.join(temporary, 'published.md'), '---\ndate: 2026-09-07\ndraft: false\n---\ndate: 2026-10-18\n');
    fs.writeFileSync(path.join(temporary, 'draft.md'), '---\ndate: 2026-10-18\ndraft: true # awaiting review\n---\n');
    fs.writeFileSync(path.join(temporary, 'default-published.md'), '---\ndate: "2026-08-31"\n---\n');
    fs.writeFileSync(path.join(temporary, 'invalid.md'), '---\ndate: 2026-02-30\ndraft: false\n---\n');
    fs.writeFileSync(path.join(temporary, 'not-an-issue.txt'), '---\ndate: 2026-10-18\n---\n');
    const dates = publishedIssueDates(temporary);
    assert.deepEqual(dates.sort(), ['2026-08-31', '2026-09-07']);
    assert.equal(windowFor({}, dates).windowStart, '2026-09-07T00:00:00.000Z');
    assert.equal(windowFor({}, [...dates, '2026-10-20']).windowStart, '2026-09-07T00:00:00.000Z');
  } finally {
    assert.ok(path.resolve(temporary).startsWith(path.join(path.resolve(os.tmpdir()), 'weekly-window-test-')));
    fs.rmSync(temporary, { recursive: true, force: true });
  }
});

test('collector retains announcements from the missed weeks and reports the exact selected window', async () => {
  const code = fs.readFileSync(new URL('../collect.mjs', import.meta.url), 'utf8')
    .replace(/^#![^\n]*\n/, '')
    .replace(/^import[\s\S]*?from ['"][^'"]+['"];\s*/gm, '');
  const feed = ['2026-09-06', '2026-09-08', '2026-09-22', '2026-09-29', '2026-10-18'].map(date => ({
    title: `Announcement ${date}`, link: `https://example.com/${date}`, isoDate: `${date}T00:00:00.000Z`,
  }));
  const quiet = () => {};
  for (const args of [{}, { since: '2026-09-08' }, { days: '7' }]) {
    let saved;
    await vm.runInNewContext(`(async () => { ${code}\n })()`, {
      Parser: class { async parseString() { return { items: feed }; } },
      fetch: async () => ({ ok: true, text: async () => '<rss/>' }), AbortSignal,
      paths: { sources: 'sources.json', raw: 'collected.json' },
      readJson: () => ({ sources: [{ id: 'official', name: 'Official', url: 'https://example.com/rss', category: 'official' }], keywords: { release: [], model: [] } }),
      parseArgs: () => args,
      publishedIssueDates: () => ['2026-09-07'],
      collectionWindow: (options, settings) => collectionWindow(options, { ...settings, now }),
      stripHtml: () => '', writeJson: (_file, value) => { saved = value; },
      log: { step: quiet, ok: quiet, err: quiet, warn: quiet, dim: quiet },
      console: { log: quiet },
      process: { exit: code => { throw new Error(`Unexpected exit ${code}`); } },
    });
    assert.deepEqual(Array.from(saved.items, item => item.published.slice(0, 10)),
      args.days ? ['2026-10-18'] : ['2026-10-18', '2026-09-29', '2026-09-22', '2026-09-08']);
    assert.equal(saved.windowStart, windowFor(args, ['2026-09-07']).windowStart);
    assert.equal(saved.windowEnd, now.toISOString());
    assert.equal(saved.rangeLabel, windowFor(args, ['2026-09-07']).rangeLabel);
  }
});
