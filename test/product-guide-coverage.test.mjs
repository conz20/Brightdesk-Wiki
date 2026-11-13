import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const productDirectory = path.join(root, 'docs', 'products');
const expected = new Map([
  ['pages.md', 'Brightdesk Pages'],
  ['sheets.md', 'Brightdesk Sheets'],
  ['decks.md', 'Brightdesk Decks'],
  ['notes.md', 'Brightdesk Notes'],
  ['database.md', 'Brightdesk Database'],
  ['forms.md', 'Brightdesk Forms'],
  ['lists.md', 'Brightdesk Lists'],
  ['planner.md', 'Brightdesk Planner'],
  ['to-do.md', 'Brightdesk To Do'],
  ['workspace.md', 'Brightdesk Workspace']
]);

test('customer help contains exactly the ten approved product guides', () => {
  const actual = fs.readdirSync(productDirectory).filter(name => name.endsWith('.md')).sort();
  assert.deepEqual(actual, [...expected.keys()].sort());
});

test('each product guide has the correct title, route and review status', () => {
  for (const [filename, title] of expected) {
    const source = fs.readFileSync(path.join(productDirectory, filename), 'utf8');
    const slug = filename.slice(0, -'.md'.length);
    const lines = source.split(/\r?\n/);
    assert.ok(lines.includes('title: ' + title), filename + ' title must match its approved product');
    assert.ok(lines.includes('permalink: /products/' + slug + '.html'), filename + ' route must match its product');
    assert.ok(lines.includes('status: Needs review'), filename + ' must not claim verification before an end-to-end walkthrough');
    assert.ok(lines.includes('# ' + title), filename + ' heading must match its approved product');
  }
});

test('the Suite getting-started page remains explicitly source-confirmed', () => {
  const source = fs.readFileSync(path.join(root, 'docs', 'customer-start-here.md'), 'utf8');
  assert.ok(source.split(/\r?\n/).includes('status: Source-confirmed'));
});

test('customer guides explain destructive actions and protected minimums', () => {
  const forms = fs.readFileSync(path.join(productDirectory, 'forms.md'), 'utf8');
  const planner = fs.readFileSync(path.join(productDirectory, 'planner.md'), 'utf8');
  const workspace = fs.readFileSync(path.join(productDirectory, 'workspace.md'), 'utf8');
  assert.match(forms, /removes that question's answer from every saved response/i);
  assert.match(planner, /moved to another remaining bucket/i);
  assert.match(planner, /cannot delete its final bucket/i);
  assert.match(workspace, /removes the page and all its content/i);
  assert.match(workspace, /removes that workspace and all its pages/i);
});

test('Pages guide names the supported PDF export control', () => {
  const source = fs.readFileSync(path.join(productDirectory, 'pages.md'), 'utf8');
  assert.match(source, /open \\*\\*Home\\*\\* and choose \\*\\*PDF\\*\\* in the \\*\\*Export\\*\\* group/i);
});

test('Sheets guide distinguishes the selected cell reference from its formula input', () => {
  const source = fs.readFileSync(path.join(productDirectory, 'sheets.md'), 'utf8');
  assert.match(source, /selected cell reference.*beside the formula input/i);
});
