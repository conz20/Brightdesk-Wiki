import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { searchTopics } from '../docs/assets/js/search.js';

const root = new URL('..', import.meta.url);
const read = path => fs.readFileSync(new URL(path, root), 'utf8');
const products = ['pages','sheets','decks','notes','database','forms','lists','planner','to-do','workspace'];
const routes = [
  '/index.html',
  '/customer-start-here.html',
  ...products.map(product => '/products/' + product + '.html')
];

test('customer navigation exposes only the homepage, Suite guide and ten product guides', () => {
  const layout = read('docs/_layouts/default.html');
  const nav = layout.match(/<nav class="site-nav" aria-label="Main navigation">([\s\S]*?)<\/nav>/);
  assert.ok(nav, 'the shared Help layout must expose its main navigation');
  for (const route of routes) assert.ok(layout.includes(route), 'navigation/search must include ' + route);
  assert.doesNotMatch(nav[1], /everyday\/|technical\/|decks-slide-shows|More help|Everyday Help|Technical Documentation/i);
});

test('the searchable page allowlist contains exactly twelve approved customer pages', () => {
  const layout = read('docs/_layouts/default.html');
  const allowlist = layout.match(/assign public_help_paths = "([^"]+)"/);
  assert.ok(allowlist, 'the shared layout must define the public search allowlist');
  assert.deepEqual(allowlist[1].split('|'), routes);
  assert.doesNotMatch(layout, /everyday\/|technical\/|decks-slide-shows/);
});

test('the homepage directs readers to the Suite guide and exactly ten products', () => {
  const home = read('docs/index.md');
  assert.match(home, /Start with Brightdesk Suite/);
  assert.ok(home.includes('customer-start-here.html'));
  for (const product of products) assert.ok(home.includes('products/' + product + '.html'));
  assert.doesNotMatch(home, /everyday\/|technical\/|decks-slide-shows|Everyday Help|Technical Documentation/i);
});

test('each product guide remains self-contained and links only to approved customer pages', () => {
  for (const product of products) {
    const guide = read('docs/products/' + product + '.md');
    assert.match(guide, /^## Overview$/m);
    assert.match(guide, /^## Getting started$/m);
    assert.match(guide, /^## Workflows$/m);
    assert.match(guide, /^## Troubleshooting and common questions$/m);
    assert.doesNotMatch(guide, /technical\/|everyday\/|decks-slide-shows/);
    assert.match(guide, /Needs review/);
  }
});

test('the Suite guide keeps first-use, language and troubleshooting guidance on the page', () => {
  const suite = read('docs/customer-start-here.md');
  assert.match(suite, /Settings/);
  assert.match(suite, /Languages & dictionaries/);
  assert.match(suite, /Troubleshooting and common questions/);
  assert.doesNotMatch(suite, /technical\/|everyday\/|decks-slide-shows/);
});

test('local Help search finds natural-language product tasks without network services', () => {
  const topics = [
    { title: 'Brightdesk Pages', href: '/products/pages.html', searchText: 'Write documents and export a PDF copy.' },
    { title: 'Brightdesk Sheets', href: '/products/sheets.html', searchText: 'Add formulas and calculate totals.' },
    { title: 'Brightdesk To Do', href: '/products/to-do.html', searchText: 'Keep track of personal tasks and reminders.' }
  ];
  assert.deepEqual(searchTopics(topics, 'export PDF').map(topic => topic.title), ['Brightdesk Pages']);
  assert.deepEqual(searchTopics(topics, 'TO DO').map(topic => topic.title), ['Brightdesk To Do']);
  assert.deepEqual(searchTopics(topics, 'calculate totals').map(topic => topic.title), ['Brightdesk Sheets']);
  assert.deepEqual(searchTopics(topics, 'unknown remote service'), []);
  const script = read('docs/assets/js/search.js');
  assert.doesNotMatch(script, /\b(fetch|XMLHttpRequest|WebSocket|EventSource|sendBeacon|localStorage|sessionStorage|document\.cookie)\b/);
});

test('the shared layout explains the browser translation privacy boundary', () => {
  const layout = read('docs/_layouts/default.html');
  assert.match(layout, /Translation is provided by your browser or its provider, not Brightdesk/);
  assert.match(layout, /that provider may process page text/);
  assert.match(layout, /Check its translation and privacy settings before using the feature/);
  assert.match(layout, /Brightdesk Help does not run a separate translation service/);
});
