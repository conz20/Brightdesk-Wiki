import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('Suite getting-started front matter quotes scalar values containing colons', async () => {
  const source = await readFile(new URL('../docs/customer-start-here.md', import.meta.url), 'utf8');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  assert.ok(match, 'The Suite getting-started page must have YAML front matter.');

  const unquotedColonValues = match[1].split(/\r?\n/).filter((line) => {
    const mapping = /^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/.exec(line);
    if (!mapping) return false;
    const value = mapping[2].trim();
    if (!value || /^[>|]/.test(value) || /^["']/.test(value)) return false;
    return /:\s/.test(value);
  });

  assert.deepEqual(
    unquotedColonValues,
    [],
    'YAML scalar values containing colon-space must be quoted so Jekyll can parse them.'
  );
});
