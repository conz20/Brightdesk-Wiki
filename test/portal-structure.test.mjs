import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { searchTopics } from '../docs/assets/js/search.js';

const root = new URL('..', import.meta.url);
const read = path => fs.readFileSync(new URL(path, root), 'utf8');
const products = ['pages','sheets','decks','notes','database','forms','lists','planner','to-do','workspace'];

test('Everyday Help has a separate task-first route and exactly ten product links', () => {
  const everyday = read('docs/everyday/index.md');
  const directory = everyday.match(/<div class="product-card-grid">([\s\S]*?)<\/div>/);
  assert.ok(directory, 'Everyday Help must display its product directory');
  const matches = [...directory[1].matchAll(/href="\.\.\/products\/([a-z-]+)\.html"/g)].map(match => match[1]);
  assert.deepEqual(matches, products);
  assert.match(everyday, /What are you trying to do\?/);
  assert.match(everyday, /Technical Documentation/);
  assert.match(everyday, /src="\.\.\/favicon\.svg" alt="Brightdesk Suite brand mark"/);
  assert.doesNotMatch(everyday, /product-card-mark-img[^>]*>B</);
});

test('the Help header searches only its approved Everyday pages', () => {
  const layout = read('docs/_layouts/default.html');
  const allowlist = layout.match(/assign public_help_paths = "([^"]+)"/);
  assert.ok(allowlist);
  assert.deepEqual(allowlist[1].split('|'), [
    '/index.html','/everyday/index.html','/customer-start-here.html',
    '/everyday/install-update.html','/everyday/languages-and-spelling.html','/everyday/troubleshooting.html','/products/decks-slide-shows.html',
    ...products.map(product => '/products/' + product + '.html')
  ]);
  assert.match(layout, /type="module" src="\{\{ '\/assets\/js\/search\.js'/);
  assert.match(layout, /aria-controls="help-search-results"/);
  assert.match(layout, /aria-live="polite"/);
});

test('shared guide entry points are discoverable', () => {
  const everyday = read('docs/everyday/index.md');
  const home = read('docs/index.md');
  const suite = read('docs/customer-start-here.md');
  const decks = read('docs/products/decks.md');
  for (const route of ['install-update.html','languages-and-spelling.html','troubleshooting.html']) {
    assert.ok(everyday.includes(route)); assert.ok(home.includes(route));
  }
  assert.ok(suite.includes('install-update.html')); assert.ok(suite.includes('languages-and-spelling.html'));
  assert.ok(decks.includes('decks-slide-shows.html'));
});

test('Technical Documentation has its own seventeen-page search index', () => {
  const layout = read('docs/_layouts/technical.html');
  const allowlist = layout.match(/assign public_technical_paths = "([^"]+)"/);
  assert.ok(allowlist);
  assert.deepEqual(allowlist[1].split('|'), [
    '/technical/index.html','/technical/system-overview.html',
    '/technical/file-formats.html','/technical/data-and-privacy.html',
    '/technical/guides/install-update.html','/technical/guides/languages-and-spelling.html','/technical/guides/troubleshooting.html',
    ...products.map(product => '/technical/products/' + product + '.html')
  ]);
  assert.match(layout, /Search Technical Documentation/);
  assert.match(layout, /Matching technical references/);
  assert.match(layout, /Technical reference navigation/);
});

test('both help areas share the same top navigation and Brightdesk brand mark', () => {
  const everyday = read('docs/_layouts/default.html');
  const technical = read('docs/_layouts/technical.html');
  const everydayNav = everyday.match(/<nav class="site-nav" aria-label="Main navigation">([\s\S]*?)<\/nav>/);
  const technicalNav = technical.match(/<nav class="site-nav" aria-label="Main navigation">([\s\S]*?)<\/nav>/);
  assert.ok(everydayNav, 'Everyday Help must expose its main navigation');
  assert.ok(technicalNav, 'Technical Documentation must expose its main navigation');
  for (const href of [
    '/index.html', '/everyday/index.html', '/customer-start-here.html',
    '/products/pages.html', '/products/sheets.html', '/products/decks.html',
    '/products/notes.html', '/products/database.html', '/products/forms.html',
    '/products/lists.html', '/products/planner.html', '/products/to-do.html',
    '/products/workspace.html', '/everyday/install-update.html',
    '/everyday/languages-and-spelling.html', '/everyday/troubleshooting.html',
    '/products/decks-slide-shows.html', '/technical/index.html'
  ]) {
    assert.ok(everydayNav[1].includes(href), 'Everyday Help navigation must include ' + href);
    assert.ok(technicalNav[1].includes(href), 'Technical Documentation navigation must include ' + href);
  }
  for (const layout of [everyday, technical]) {
    assert.ok(layout.includes('src="{{ \'/favicon.svg\' | relative_url }}"'));
    assert.ok(layout.includes('aria-label="Brightdesk Help home"'));
  }
  const favicon = read('docs/favicon.svg');
  assert.match(favicon, /four-panel Brightdesk symbol/);
  for (const colour of ['#53C8E8', '#8C7CF0', '#43B9A7', '#4B8DE8']) {
    assert.ok(favicon.includes(colour), 'Brightdesk mark must retain ' + colour);
  }
  assert.doesNotMatch(favicon, /<text/i);
  const social = read('docs/assets/images/brightdesk-help-social.svg');
  assert.ok(social.includes('#101B35'));
  assert.ok(social.includes('brand-gradient'));
});

test('all ten guides use the same clear structure and link to their technical reference', () => {
  for (const product of products) {
    const guide = read('docs/products/' + product + '.md');
    const title = product === 'to-do' ? 'To Do' : product[0].toUpperCase() + product.slice(1);
    assert.match(guide, new RegExp('^## Overview$', 'm'));
    assert.match(guide, new RegExp('^## Getting started$', 'm'));
    assert.match(guide, new RegExp('^## Workflows$', 'm'));
    assert.match(guide, new RegExp('^## Troubleshooting and common questions$', 'm'));
    assert.ok(guide.includes('../technical/products/' + product + '.html'));
    assert.ok(guide.includes('Illustrative workflow, not a screenshot of the Brightdesk interface.'));
    assert.ok(guide.includes('../assets/images/workflows/guide-' + product + '.svg'));
    assert.ok(guide.includes('../assets/images/product-icons/' + product + '.svg'));
    assert.match(guide, /Needs review/);
  }
});

test('each technical product reference links back to the matching everyday guide', () => {
  for (const product of products) {
    const reference = read('docs/technical/products/' + product + '.md');
    assert.match(reference, /^layout: technical$/m);
    assert.ok(reference.includes('../../products/' + product + '.html'));
    assert.ok(reference.includes('../../assets/images/product-icons/' + product + '.svg'));
  }
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

test('both help areas explain the browser translation privacy boundary', () => {
  for (const path of ['docs/_layouts/default.html', 'docs/_layouts/technical.html']) {
    const layout = read(path);
    assert.match(layout, /Translation is provided by your browser or its provider, not Brightdesk/);
    assert.match(layout, /that provider may process page text/);
    assert.match(layout, /Check its translation and privacy settings before using the feature/);
    assert.match(layout, /Brightdesk Help does not run a separate translation service/);
  }
});



test('breadcrumbs avoid repeating a page as its own parent section', () => {
  const layout = read('docs/_layouts/default.html');
  const match = layout.match(/<nav class="page-breadcrumb" aria-label="Breadcrumb">([\s\S]*?)<\/nav>/);
  assert.ok(match, 'shared layout must provide breadcrumbs');
  const breadcrumb = match[1];
  assert.match(breadcrumb, /if page\.url contains '\/products\/'/);
  assert.match(breadcrumb, /index\.html#directory-title/);
  assert.match(breadcrumb, /unless page\.url == '\/everyday\/index\.html'/);
  assert.match(breadcrumb, /unless page\.url == '\/technical\/index\.html'/);
  assert.doesNotMatch(breadcrumb, /customer-start-here\.html/);
});


test('technical sidebar groups all ten applications and reuses their approved product icons', () => {
  const layout = read('docs/_layouts/technical.html');
  for (const group of ['Create and communicate', 'Work with information', 'Plan and organise']) {
    assert.ok(layout.includes(group), 'Technical navigation must include ' + group);
  }
  for (const product of products) {
    assert.ok(layout.includes('/technical/products/' + product + '.html'), 'Sidebar must link to ' + product);
    assert.ok(layout.includes('/assets/images/product-icons/' + product + '.svg'), 'Sidebar must use the approved ' + product + ' icon');
  }
  for (const guide of ['install-update', 'languages-and-spelling', 'troubleshooting']) {
    assert.ok(layout.includes('/technical/guides/' + guide + '.html'), 'Sidebar must include the technical ' + guide + ' guide');
    const page = read('docs/technical/guides/' + guide + '.md');
    assert.match(page, /^layout: technical$/m);
    assert.ok(page.includes('../../everyday/' + guide + '.html'), 'Technical guide must link to its plain-English companion');
  }
});
