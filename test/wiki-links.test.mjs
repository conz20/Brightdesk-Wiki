import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { checkMarkdownLinks } from '../scripts/check-doc-links.mjs';

function fixture(t) {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'brightdesk-wiki-'));
  fs.mkdirSync(path.join(rootDir, 'docs', 'guide'), { recursive: true });
  t.after(() => fs.rmSync(rootDir, { recursive: true, force: true }));
  return rootDir;
}

test('valid local links and external links pass', t => {
  const rootDir = fixture(t);
  fs.writeFileSync(path.join(rootDir, 'README.md'), '[Guide](docs/guide/index.md)\n[GitHub](https://github.com/connormolloy12)\n');
  fs.writeFileSync(path.join(rootDir, 'docs/guide/index.md'), '[Home](../../README.md)\n[Section](#overview)\n');
  const result = checkMarkdownLinks({ rootDir });
  assert.equal(result.markdownFiles, 2);
  assert.equal(result.localLinks, 2);
});

test('missing local links fail with source file and target', t => {
  const rootDir = fixture(t);
  fs.writeFileSync(path.join(rootDir, 'docs/guide/index.md'), '[Missing](not-here.md)\n');
  assert.throws(() => checkMarkdownLinks({ rootDir }), /docs\/guide\/index\.md.*not-here\.md/i);
});

test('links that escape the repository root are rejected', t => {
  const rootDir = fixture(t);
  fs.writeFileSync(path.join(rootDir, 'docs/guide/index.md'), '[Outside](../../../outside.md)\n');
  assert.throws(() => checkMarkdownLinks({ rootDir }), /escapes the repository root/i);
});

test('image references are checked just like document links', t => {
  const rootDir = fixture(t);
  fs.writeFileSync(path.join(rootDir, 'docs/guide/index.md'), '![Diagram](missing.svg)\n');
  assert.throws(() => checkMarkdownLinks({ rootDir }), /missing\.svg/i);
});

test('query strings, fragments and encoded path segments resolve to local files', t => {
  const rootDir = fixture(t);
  fs.mkdirSync(path.join(rootDir, 'docs', 'guide', 'release notes'), { recursive: true });
  fs.writeFileSync(path.join(rootDir, 'docs/guide/release notes/status.md'), '# Status\n');
  fs.writeFileSync(path.join(rootDir, 'README.md'), '[Status](docs/guide/release%20notes/status.md?view=short#current)\n');
  const result = checkMarkdownLinks({ rootDir });
  assert.equal(result.localLinks, 1);
});

test('Jekyll .html routes are accepted when backed by a matching Markdown source', t => {
  const rootDir = fixture(t);
  fs.mkdirSync(path.join(rootDir, 'docs', 'products'), { recursive: true });
  fs.writeFileSync(
    path.join(rootDir, 'docs/index.md'),
    '---\\npermalink: /index.html\\n---\\n# Help home\\n'
  );
  fs.writeFileSync(
    path.join(rootDir, 'docs/products/database.md'),
    '---\\npermalink: /products/database.html\\n---\\n[Back to help](../index.html)\\n'
  );

  const result = checkMarkdownLinks({ rootDir });
  assert.equal(result.localLinks, 1);
});

test('symbolic-link targets are rejected', t => {
  const rootDir = fixture(t);
  const outside = path.join(rootDir, 'outside.md');
  const inside = path.join(rootDir, 'docs/guide/alias.md');
  fs.writeFileSync(outside, '# Outside\n');
  fs.symlinkSync(outside, inside);
  fs.writeFileSync(path.join(rootDir, 'README.md'), '[Outside](docs/guide/alias.md)\n');
  assert.throws(() => checkMarkdownLinks({ rootDir }), /symbolic link/i);
});


test('Markdown links inside fenced code examples are ignored', t => {
  const rootDir = fixture(t);
  fs.writeFileSync(
    path.join(rootDir, 'README.md'),
    'Example:\n\n\`\`\`markdown\n[Not a link](missing-backtick-example.md)\n\`\`\`\n\n~~~text\n![Not an image link](missing-tilde-example.svg)\n~~~\n'
  );
  const result = checkMarkdownLinks({ rootDir });
  assert.equal(result.localLinks, 0);
});
