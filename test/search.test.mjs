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
