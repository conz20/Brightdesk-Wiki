import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const workflow = fs.readFileSync(new URL('../.github/workflows/quality.yml', import.meta.url), 'utf8');

test('quality workflow uses the standard GitHub-hosted Linux runner', () => {
  assert.match(workflow, /runs-on:\\s*ubuntu-latest/);
  assert.doesNotMatch(workflow, /self-hosted|macOS|ARM64|windows-latest|macos-latest/);
});

test('quality workflow keeps repository permissions read-only', () => {
  assert.match(workflow, /permissions:\\s*\\n\\s+contents:\\s*read/);
});

test('quality workflow keeps one current run per PR and cancels obsolete revisions', () => {
  assert.ok(workflow.includes('group: brightdesk-wiki-quality-${{ github.event.pull_request.number || github.ref }}'));
  assert.match(workflow, /cancel-in-progress:\\s*true/);
});

test('quality workflow uses pinned checkout, Node.js and Ruby actions', () => {
  assert.match(workflow, /uses:\\s*actions\\/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1/);
  assert.match(workflow, /uses:\\s*actions\\/setup-node@949feb2413d6458794dcd2491c4babbbce0c15c1/);
  assert.match(workflow, /uses:\\s*ruby\\/setup-ruby@b3aaceaef7e0ee231b499e7b5f49c03fc1d32199/);
  assert.match(workflow, /timeout-minutes:\\s*10/);
});

test('quality workflow pins and verifies the exact supported Node.js and Ruby runtimes', () => {
  const nodeVersion = fs.readFileSync(new URL('../.node-version', import.meta.url), 'utf8').trim();
  const rubyVersion = fs.readFileSync(new URL('../.ruby-version', import.meta.url), 'utf8').trim();
  const packageJson = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

  assert.equal(nodeVersion, '24.22.2');
  assert.equal(packageJson.engines.node, '24.22.2');
  assert.match(workflow, /node-version:\\s*24\\.22\\.2/);
  assert.match(workflow, /ruby-version:\\s*['"]3\\.4\\.4['"]/);
  assert.equal(rubyVersion, '3.4.4');
  assert.ok(workflow.includes('npm run check:node'));
  assert.doesNotMatch(workflow, /node-version:\\s*22(?:\\.|['"])/);
  assert.doesNotMatch(workflow, /ruby-version:\\s*['"]3\\.[0-3]\\./);
});

test('quality workflow disables dependency caches that could hide stale runtime state', () => {
  assert.ok(workflow.includes('package-manager-cache: false'));
  assert.ok(workflow.includes('bundler-cache: false'));
});

test('quality workflow runs every source, content, link and output check', () => {
  for (const command of [
    'npm ci --no-audit --no-fund',
    'npm run check',
    'npm test',
    'npm run links',
    'bundle install --jobs 4 --retry 3',
    'bundle exec jekyll build',
    'npm run check:site'
  ]) {
    assert.ok(workflow.includes(command), `Missing mandatory quality command: ${command}`);
  }
});

test('quality workflow does not silently skip the Jekyll build or output privacy audit', () => {
  assert.match(workflow, /run:\\s*bundle exec jekyll build/);
  assert.match(workflow, /run:\\s*npm run check:site/);
  assert.doesNotMatch(workflow, /if:\\s*steps\\./);
});
