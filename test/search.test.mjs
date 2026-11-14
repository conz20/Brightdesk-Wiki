import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { searchTopics } from '../docs/assets/js/search.js';

const layout = fs.readFileSync(new URL('../docs/_layouts/default.html', import.meta.url), 'utf8');

const topics = [
  {
    title: 'Brightdesk Pages',
    href: '/products/pages.html',
    searchText: 'Write documents, format text and export a PDF copy.'
  },
  {
    title: 'Brightdesk Sheets',
    href: '/products/sheets.html',
    searchText: 'Create spreadsheets and calculate totals with SUM formulas.'
  },
  {
    title: 'Brightdesk Workspace',
    href: '/products/workspace.html',
    searchText: 'Create project pages and add checklists.'
  }
];

test('Help search indexes only the twelve approved customer pages', () => {
  const declaration = layout.match(/\{%\s*assign public_help_paths = "([^"]+)"\s*\|\s*split:\s*"\|"\s*%\}/);
  assert.ok(declaration, 'The layout must declare an explicit customer-page search allowlist');

  const actualPaths = declaration[1].split('|');
  const expectedPaths = [
    '/index.html',
    '/customer-start-here.html',
    '/products/pages.html',
    '/products/sheets.html',
    '/products/decks.html',
    '/products/notes.html',
    '/products/database.html',
    '/products/forms.html',
    '/products/lists.html',
    '/products/planner.html',
    '/products/to-do.html',
    '/products/workspace.html'
  ];
  assert.deepEqual(actualPaths, expectedPaths);
  assert.equal(new Set(actualPaths).size, 12, 'The search allowlist must not contain duplicate pages');
  assert.match(layout, /\{%\s*if public_help_paths contains help_page\.url\s*%\}/);
});

test('Help search finds a guide from words in its instructions', () => {
  assert.deepEqual(
    searchTopics(topics, 'export PDF').map(topic => topic.title),
    ['Brightdesk Pages']
  );
});

test('Help search requires every query word to match the same guide', () => {
  assert.deepEqual(
    searchTopics(topics, 'project checklist').map(topic => topic.title),
    ['Brightdesk Workspace']
  );
});

test('Help search is case-insensitive and ignores extra whitespace', () => {
  assert.deepEqual(
    searchTopics(topics, '  SUM   FORMULAS ').map(topic => topic.title),
    ['Brightdesk Sheets']
  );
});

test('Help search returns no results for an empty or unmatched query', () => {
  assert.deepEqual(searchTopics(topics, '   '), []);
  assert.deepEqual(searchTopics(topics, 'cloud collaboration'), []);
});

test('Help search returns a bounded number of results', () => {
  const manyTopics = Array.from({ length: 10 }, (_, index) => ({
    title: 'Guide ' + index,
    href: '/guide-' + index,
    searchText: 'common topic'
  }));
  assert.equal(searchTopics(manyTopics, 'common', 4).length, 4);
});

test('Help search exposes an accessible search landmark and connected result/status descriptions', () => {
  const searchSection = layout.match(/<section class="help-search"[^>]*>([\s\S]*?)<\/section>/);
  assert.ok(searchSection, 'The page must expose a dedicated Help search section');
  assert.match(searchSection[0], /\brole="search"/);

  const searchInput = searchSection[1].match(/<input\b[^>]*id="help-search"[^>]*>/);
  assert.ok(searchInput, 'The Help search input must be present');
  assert.match(searchInput[0], /\baria-describedby="help-search-hint help-search-status"/);
  assert.match(searchInput[0], /\baria-controls="help-search-results"/);

  assert.match(searchSection[1], /<p id="help-search-status" class="search-status" role="status" aria-live="polite">/);
  assert.match(searchSection[1], /<ul id="help-search-results" class="search-results" aria-label="Matching help guides" hidden>/);
});

test('the footer offers exactly one working suggestion for the Suite and each of the ten products', () => {
  const suggestions = layout.match(/<ul class="footer-suggestions">([\s\S]*?)<\/ul>/);
  assert.ok(suggestions, 'The customer help layout must include task suggestions');

  const suggestedPaths = Array.from(
    suggestions[1].matchAll(/href="\{\{\s*'([^']+)'\s*\|\s*relative_url\s*\}\}"/g),
    match => match[1]
  );
  const expectedSuggestions = [
    '/customer-start-here.html',
    '/products/pages.html',
    '/products/sheets.html',
    '/products/decks.html',
    '/products/notes.html',
    '/products/database.html',
    '/products/forms.html',
    '/products/lists.html',
    '/products/planner.html',
    '/products/to-do.html',
    '/products/workspace.html'
  ];
  assert.deepEqual(suggestedPaths, expectedSuggestions);
  assert.equal(new Set(suggestedPaths).size, 11, 'Each customer guide must have exactly one suggestion');
});



test('every Help page explains how to use built-in browser translation', () => {
  assert.match(layout, /<aside class="translation-help" aria-label="Language help">/);
  assert.match(layout, /web browser offers page translation/);
  assert.match(layout, /does not send page text to a separate translation service/);
  assert.doesNotMatch(layout, /translate="no"/i);
});

test('the homepage gives task-first links to exactly the ten approved products', () => {
  const homepage = fs.readFileSync(new URL('../docs/index.md', import.meta.url), 'utf8');
  const taskGrid = homepage.match(/<ul class="task-grid">([\s\S]*?)<\/ul>/);
  assert.ok(taskGrid, 'The homepage must show task-first suggestions');
  const paths = Array.from(taskGrid[1].matchAll(/href="([^"]+)"/g), match => match[1]);
  assert.deepEqual(paths, [
    'products/pages.html',
    'products/sheets.html',
    'products/decks.html',
    'products/notes.html',
    'products/database.html',
    'products/forms.html',
    'products/lists.html',
    'products/planner.html',
    'products/to-do.html',
    'products/workspace.html'
  ]);
  assert.match(homepage, /start with the simple Suite guide/);
});

test('homepage presents a clear getting-started route before task suggestions', () => {
  const homepage = fs.readFileSync(new URL('../docs/index.md', import.meta.url), 'utf8');
  assert.match(homepage, /<section class="start-panel" aria-labelledby="start-panel-title">/);
  assert.match(homepage, /<h2 id="start-panel-title">Start with Brightdesk Suite<\/h2>/);
  assert.match(homepage, /href="customer-start-here.html">Open the getting-started guide/);
});

test('every page provides a direct navigation menu for all ten product guides', () => {
  const productMenu = layout.match(/<details class="product-menu" aria-label="Browse product guides">([\\s\\S]*?)<\\/details>/);
  assert.ok(productMenu, 'Every page must provide a keyboard-accessible product guide menu');

  const productPaths = Array.from(
    productMenu[1].matchAll(/href="\\{\\{\\s*'([^']+)'\\s*\\|\\s*relative_url\\s*\\}\\}"/g),
    match => match[1]
  );
  assert.deepEqual(productPaths, [
    '/products/pages.html',
    '/products/sheets.html',
    '/products/decks.html',
    '/products/notes.html',
    '/products/database.html',
    '/products/forms.html',
    '/products/lists.html',
    '/products/planner.html',
    '/products/to-do.html',
    '/products/workspace.html'
  ]);
  assert.match(productMenu[1], /<summary>Product guides<\\/summary>/);
});
