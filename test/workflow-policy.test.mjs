import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const workflow = fs.readFileSync(new URL('../.github/workflows/quality.yml', import.meta.url), 'utf8');

test('quality workflow only targets the approved private macOS runner', () => {
  assert.match(workflow, /runs-on:\\s*\\[self-hosted,\\s*macOS,\\s*ARM64\\]/);
  assert.doesNotMatch(workflow, /ubuntu-latest|windows-latest|macos-latest/);
});

test('quality workflow keeps repository permissions read-only', () => {
  assert.match(workflow, /permissions:\\s*\\n\\s+contents:\\s*read/);
});

test('quality workflow provisions exact Ruby in the runner tool cache', () => {
  assert.match(workflow, /uses:\\s*ruby\\/setup-ruby@b3aaceaef7e0ee231b499e7b5f49c03fc1d32199/);
  assert.match(workflow, /ruby-version:\\s*['"]3\\.4\\.4['"]/);
  assert.match(workflow, /bundler-cache:\\s*true/);
  assert.doesNotMatch(workflow, /Check whether Ruby 3\\.4\\.4 is preinstalled/);
  assert.doesNotMatch(workflow, /Jekyll build and generated-output audit are deferred/);
  assert.doesNotMatch(workflow, /if:\\s*steps\\.ruby\\.outputs\\.available/);
  assert.doesNotMatch(workflow, /\\b(sudo|apt-get|brew install)\\b/);
});

test('quality workflow always runs Jekyll build and the generated-output privacy audit', () => {
  assert.match(workflow, /run:\\s*bundle exec jekyll build/);
  assert.match(workflow, /run:\\s*npm run check:site/);
  assert.doesNotMatch(workflow, /if:\\s*steps\\.ruby\\.outputs\\.available/);
});
