import assert from 'node:assert/strict';
import test from 'node:test';
import { extractReleaseModelNames, selectNewModels } from './lib/model-release-names.mjs';

// Official RSS titles checked on 2026-10-19:
// https://openai.com/news/rss.xml
test('retains the family suffix on the GPT-6.1 Sol announcement', () => {
  assert.deepEqual(extractReleaseModelNames('Introducing GPT-6.1 Sol'), ['GPT-6.1 Sol']);
});

test('splits the joint GPT-6 Sol and Luna announcement', () => {
  assert.deepEqual(extractReleaseModelNames('Introducing GPT-6 Sol and Luna'), ['GPT-6 Sol', 'GPT-6 Luna']);
});

test('retains Astra on a release title without an introducing verb', () => {
  assert.deepEqual(extractReleaseModelNames('GPT-6 Astra: A new generation of intelligence'), ['GPT-6 Astra']);
});

test('extracts both image model names when a title names them explicitly', () => {
  assert.deepEqual(extractReleaseModelNames('Introducing GPT-Image-Sunburst and GPT-Image-Flare'), ['GPT-Image-Sunburst', 'GPT-Image-Flare']);
});

test('shares an explicit image-model prefix, without inferring unnamed models', () => {
  assert.deepEqual(extractReleaseModelNames('Introducing GPT-Image-Sunburst and Flare'), ['GPT-Image-Sunburst', 'GPT-Image-Flare']);
  assert.deepEqual(extractReleaseModelNames('Introducing ChatGPT Images 2.5'), ['ChatGPT Images 2.5']);
});

test('handles repeated prefixes and typographic hyphens', () => {
  assert.deepEqual(extractReleaseModelNames('Introducing GPT‑6 Sol and GPT‑6 Luna'), ['GPT-6 Sol', 'GPT-6 Luna']);
});

test('does not treat comparison models or product descriptions as joint releases', () => {
  assert.deepEqual(extractReleaseModelNames('Introducing GPT-6.1 Sol: faster than GPT-6 Sol'), ['GPT-6.1 Sol']);
  assert.deepEqual(extractReleaseModelNames('GPT-6 and Intelligent UI for everyone'), ['GPT-6']);
});

test('does not emit duplicate candidates when a name is repeated', () => {
  assert.deepEqual(extractReleaseModelNames('Introducing GPT-6 Sol and GPT-6 Sol'), ['GPT-6 Sol']);
});

test('preserves established releases including descriptions containing action verbs', () => {
  assert.deepEqual(extractReleaseModelNames('GPT-5.6: Frontier intelligence that scales with your ambition'), ['GPT-5.6']);
  assert.deepEqual(extractReleaseModelNames('Introducing Claude Opus 5'), ['Claude Opus 5']);
  assert.deepEqual(extractReleaseModelNames('Introducing Gemini 3.7'), ['Gemini 3.7']);
});

test('rejects customer stories, guides, system cards, and capability demonstrations', () => {
  for (const title of [
    'Asana cuts model costs 76x in browser tests with GPT-6.1 Sol',
    'Model ML completes finance work more efficiently with GPT-5.6 Sol',
    'How GPT-5.6 Sol helps run quantum computing experiments',
    'A model guide for the GPT-6 family',
    'GPT-6 Sol and Luna System Card',
    'Retiring GPT-6 Sol and Luna',
    'GPT-6.1 Sol helps teams write better documents',
    'GPT-6 Astra solves a research problem',
  ]) assert.deepEqual(extractReleaseModelNames(title), [], title);
});

test('a previously catalogued Sol does not hide Luna from their shared announcement', () => {
  const url = 'https://openai.com/index/introducing-gpt-6-sol-and-luna';
  const existing = [{ id: 'gpt-6-sol', name: 'GPT-6 Sol', url }];
  const sol = { id: 'gpt-6-sol-2026-09-22', name: 'GPT-6 Sol', url };
  const luna = { id: 'gpt-6-luna-2026-09-22', name: 'GPT-6 Luna', url };
  assert.deepEqual(selectNewModels([sol, luna], existing), [luna]);
});

test('deduplication preserves distinct co-released models but rejects repeated ids and name/url pairs', () => {
  const url = 'https://openai.com/index/introducing-gpt-6-sol-and-luna';
  const sol = { id: 'sol', name: 'GPT-6 Sol', url };
  const luna = { id: 'luna', name: 'GPT-6 Luna', url };
  assert.deepEqual(selectNewModels([sol, luna, { ...sol, id: 'another-sol' }], []), [sol, luna]);
  assert.deepEqual(selectNewModels([{ ...sol, url: url + '/alternate' }], [sol]), []);
  assert.deepEqual(selectNewModels([{ ...sol, id: 'sol-new-id', name: 'GPT‑6 Sol' }], [sol]), []);
});
