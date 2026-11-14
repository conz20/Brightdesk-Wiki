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
  const menuStart = layout.indexOf('<details class="product-menu" aria-label="Browse product guides">');
  assert.notEqual(menuStart, -1, 'Every page must provide a keyboard-accessible product guide menu');
  const menuEnd = layout.indexOf('</details>', menuStart);
  assert.notEqual(menuEnd, -1, 'The product guide menu must be properly closed');
  const productMenu = layout.slice(menuStart, menuEnd);

  const productPaths = Array.from(
    productMenu.matchAll(/href="[^']*'([^']+)'/g),
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
  assert.ok(productMenu.includes('<summary>Product guides</summary>'));
});

test('homepage explains that links open help instructions, not desktop software', () => {
  const homepage = fs.readFileSync(new URL('../docs/index.md', import.meta.url), 'utf8');
  assert.match(homepage, /These links open help pages only/);
  assert.match(homepage, /They do not launch Brightdesk Suite or any of its applications/);
});

test('all ten product guides include more worked examples and common fixes', () => {
  const productGuides = [
    'pages', 'sheets', 'decks', 'notes', 'database',
    'forms', 'lists', 'planner', 'to-do', 'workspace'
  ];
  for (const product of productGuides) {
    const guide = fs.readFileSync(new URL('../docs/products/' + product + '.md', import.meta.url), 'utf8');
    assert.match(guide, /## More examples to try/, product + ' must include additional worked examples');
    assert.match(guide, /## Common questions and fixes/, product + ' must include product-specific help for common problems');
    assert.match(guide, /status: Needs review/, product + ' must not be marked verified before a full product walkthrough');
  }
});

test('Suite guide explains supported files, Brightdesk projects, exports and spelling checks', () => {
  const suiteGuide = fs.readFileSync(new URL('../docs/customer-start-here.md', import.meta.url), 'utf8');
  for (const extension of ['.bdesk', '.docx', '.xlsx', '.xlsm', '.csv', '.tsv', '.pptx', '.txt', '.md', '.html']) {
    assert.ok(suiteGuide.includes(extension), 'Suite guide must explain ' + extension + ' files');
  }
  assert.match(suiteGuide, /## Save a Brightdesk project/);
  assert.match(suiteGuide, /## Export a copy from a product/);
  assert.match(suiteGuide, /## Common questions and fixes/);
  assert.match(suiteGuide, /## Notifications, Settings and languages/);
  assert.match(suiteGuide, /Check spelling/);
  assert.match(suiteGuide, /does not change your document/);
});

test('Help search understands natural questions without matching filler words literally', () => {
  assert.deepEqual(
    searchTopics(topics, 'How do I export a PDF?').map(topic => topic.title),
    ['Brightdesk Pages']
  );
});

test('Help search keeps the exact To Do product name searchable', () => {
  const todo = [{ title: 'Brightdesk To Do', href: '/products/to-do.html', searchText: 'Personal task lists and due dates.' }];
  assert.deepEqual(searchTopics(todo, 'To Do').map(topic => topic.href), ['/products/to-do.html']);
  assert.deepEqual(searchTopics(todo, 'How do I use To Do?').map(topic => topic.href), ['/products/to-do.html']);
});

test('Suite guide explains switching, hiding, restoring and removing products safely', () => {
  const suiteGuide = fs.readFileSync(new URL('../docs/customer-start-here.md', import.meta.url), 'utf8');
  assert.match(suiteGuide, /## Switch between products/);
  assert.match(suiteGuide, /Switch product/);
  assert.match(suiteGuide, /Product settings/);
  assert.match(suiteGuide, /Hide from Switch product/);
  assert.match(suiteGuide, /Show in Switch product/);
  assert.match(suiteGuide, /does not delete your documents or project data/i);
});

test('Workspace and Database examples use the exact current Suite control labels', () => {
  const workspaceGuide = fs.readFileSync(new URL('../docs/products/workspace.md', import.meta.url), 'utf8');
  const databaseGuide = fs.readFileSync(new URL('../docs/products/database.md', import.meta.url), 'utf8');
  assert.match(workspaceGuide, /Search pages/);
  assert.doesNotMatch(workspaceGuide, /Find a page/);
  assert.match(databaseGuide, /Text, Number, Date, Email, URL, Checkbox or Choice/);
  assert.doesNotMatch(databaseGuide, /Choice list|Web address/);
});

test('Lists guide explains the working Active and Done status filters', () => {
  const listsGuide = fs.readFileSync(new URL('../docs/products/lists.md', import.meta.url), 'utf8');
  assert.match(listsGuide, /\*\*Active\*\* \(Not started and In progress\)/);
  assert.match(listsGuide, /Done shows completed records/);
});

test('product guides use the actual Database, Lists, Forms, Planner and Workspace labels', () => {
  const guide = name => fs.readFileSync(new URL('../docs/products/' + name + '.md', import.meta.url), 'utf8');
  const database = guide('database');
  const lists = guide('lists');
  const forms = guide('forms');
  const planner = guide('planner');
  const workspace = guide('workspace');

  assert.match(database, /\*\*Sort by\*\*/);
  assert.match(database, /\*\*Order\*\*/);
  assert.doesNotMatch(database, /\*\*Sort records\*\*/);
  assert.match(lists, /\*\*Active\*\* \(Not started and In progress\)/);
  assert.match(lists, /Done shows completed records/);
  assert.match(forms, /\*\*Required question\*\*/);
  assert.match(planner, /\*\*New bucket\*\*/);
  assert.match(planner, /\*\*Bucket name\*\*/);
  assert.match(planner, /\*\*New task\*\*/);
  assert.match(planner, /\*\*Task name\*\*/);
  assert.match(workspace, /\*\*Bullet list\*\*/);
  assert.match(workspace, /\*\*Add block\*\*/);
});



test('everyday Help links to a separate Technical Documentation area', () => {
  assert.match(layout, /Technical documentation/);
  assert.ok(layout.includes('/technical/index.html'));

  const technicalLayout = fs.readFileSync(new URL('../docs/_layouts/technical.html', import.meta.url), 'utf8');
  assert.match(technicalLayout, /Everyday Help/);
  assert.match(technicalLayout, /Technical Documentation/);
  assert.match(technicalLayout, /aria-label="Technical documentation sections"/);
  assert.match(technicalLayout, /Search Technical Documentation/);

  const declarationLine = technicalLayout.split('\\n').find(line => line.includes('{% assign public_technical_paths = '));
  assert.ok(declarationLine, 'Technical search must declare its own explicit page allowlist');
  const declaration = declarationLine.match(/"([^"]+)"/);
  assert.ok(declaration, 'Technical search allowlist must contain its page paths');
  const actualPaths = declaration[1].split('|');
  const expectedPaths = [
    '/technical/index.html',
    '/technical/system-overview.html',
    '/technical/file-formats.html',
    '/technical/data-and-privacy.html',
    '/technical/products/pages.html',
    '/technical/products/sheets.html',
    '/technical/products/decks.html',
    '/technical/products/notes.html',
    '/technical/products/database.html',
    '/technical/products/forms.html',
    '/technical/products/lists.html',
    '/technical/products/planner.html',
    '/technical/products/to-do.html',
    '/technical/products/workspace.html'
  ];
  assert.deepEqual(actualPaths, expectedPaths);
  assert.equal(new Set(actualPaths).size, 14);
  assert.ok(technicalLayout.includes('{% if public_technical_paths contains help_page.url %}'));
});

test('technical reference pages cover exactly the ten approved Brightdesk products', () => {
  const productRefs = [
    'pages','sheets','decks','notes','database',
    'forms','lists','planner','to-do','workspace'
  ];
  for (const product of productRefs) {
    const page = fs.readFileSync(new URL('../docs/technical/products/' + product + '.md', import.meta.url), 'utf8');
    assert.match(page, /^layout: technical$/m, product + ' technical page must use its separate layout');
    assert.ok(page.includes('permalink: /technical/products/' + product + '.html'));
  }
});
