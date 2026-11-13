import test from 'node:test';
import assert from 'node:assert/strict';
import { searchTopics } from '../docs/assets/js/search.js';

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
