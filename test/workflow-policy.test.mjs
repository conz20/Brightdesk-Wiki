import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const workflow = fs.readFileSync(new URL('../.github/workflows/quality.yml', import.meta.url), 'utf8');

test('quality workflow only targets the approved private macOS runner', () => {
  assert.match(workflow, /runs-on:\s*\[self-hosted,\s*macOS,\s*ARM64\]/);
  assert.doesNotMatch(workflow, /ubuntu-latest|windows-latest|macos-latest/);
});

test('quality workflow keeps repository permissions read-only', () => {
  assert.match(workflow, /permissions:\s*\n\s+contents:\s*read/);
});

test('Jekyll verification is deferred when exact Ruby 3.4.4 is unavailable', () => {
  assert.match(workflow, /Check whether Ruby 3\.4\.4 is preinstalled/);
  assert.match(workflow, /RUBY_VERSION == "3\.4\.4"/);
  assert.match(workflow, /Jekyll build and generated-output audit are deferred/);
  assert.match(workflow, /if: steps\.ruby\.outputs\.available == 'true'/);
  assert.match(workflow, /if: steps\.ruby\.outputs\.available != 'true'/);
  assert.doesNotMatch(workflow, /ruby\/setup-ruby@/);
});
