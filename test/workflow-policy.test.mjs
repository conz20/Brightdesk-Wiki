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

test('Ruby setup installs into the writable runner tool cache', () => {
  const rubyStep = workflow.split('      - name: Set up Ruby 3.4.4')[1]?.split('      - name: ')[0] ?? '';
  assert.match(rubyStep, /RUNNER_TOOL_CACHE:\s*\$\{\{\s*runner\.tool_cache\s*\}\}/);
  assert.doesNotMatch(rubyStep, /self-hosted:\s*true/);
  assert.match(rubyStep, /ruby-version:\s*3\.4\.4/);
});
