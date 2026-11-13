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

test('quality workflow keeps one pending run per PR without cancelling active validation', () => {
  assert.ok(workflow.includes('group: brightdesk-wiki-quality-${{ github.event.pull_request.number || github.ref }}'));
  assert.match(workflow, /cancel-in-progress:\s*false/);
});

test('quality workflow uses the persistent self-hosted runner tool cache', () => {
  assert.ok(workflow.includes('RUNNER_TOOL_CACHE: ${{ runner.workspace }}/../../_tool'));
  assert.doesNotMatch(workflow, /runner\.tool_cache/);
  assert.doesNotMatch(workflow, /RUNNER_TOOL_CACHE:\s*\$\{\{\s*runner\.temp/);
  assert.match(workflow, /prefix="\$RUNNER_TOOL_CACHE\/Ruby\/3\.4\.4/);
  assert.match(workflow, /libyaml_prefix="\$RUNNER_TOOL_CACHE\/Brightdesk\/libyaml\/\$libyaml_version/);
});

test('quality workflow verifies cached Ruby and libyaml versions before reuse', () => {
  assert.match(workflow, /ruby_cache_valid=false/);
  assert.match(workflow, /RUBY_VERSION == "3\.4\.4"/);
  assert.ok(workflow.includes('Psych::LIBYAML_VERSION == "0.2.5"'));
  assert.match(workflow, /libyaml_cache_valid=false/);
  assert.match(workflow, /touch "\$prefix\.complete"/);
  assert.match(workflow, /touch "\$libyaml_prefix\.complete"/);
});

test('quality workflow preserves literal shell escapes for checksum and diagnostic commands', () => {
  assert.ok(workflow.includes("printf '%s  %s\\n'"));
  assert.ok(workflow.includes('-exec cat {} \\;'));
  assert.doesNotMatch(workflow, /%s\\\\n/);
  assert.doesNotMatch(workflow, /cat \{\} \\\\;/);
});

test('quality workflow builds pinned libyaml and Ruby in a runner-local cache', () => {
  assert.match(workflow, /libyaml_version="0\.2\.5"/);
  assert.match(workflow, /https:\/\/github\.com\/yaml\/libyaml\/releases\/download\/\$libyaml_version\/yaml-\$libyaml_version\.tar\.gz/);
  assert.match(workflow, /c642ae9b75fee120b2d96c712538bd2cf283228d2337df2cf2988e3c02678ef4/);
  assert.match(workflow, /shasum -a 256 --check -/);
  assert.match(workflow, /RUBY_CONFIGURE_OPTS=.*--with-libyaml-dir=/);
  assert.match(workflow, /ruby_build_revision=.*573f87a93b27195b97c2a72b5c6fbc0a266d73d0/);
  assert.match(workflow, /ruby-build[\s\S]*3\.4\.4/);
  assert.match(workflow, /uses:\s*ruby\/setup-ruby@b3aaceaef7e0ee231b499e7b5f49c03fc1d32199/);
  assert.match(workflow, /self-hosted:\s*true/);
  assert.match(workflow, /ruby-version:\s*['"]3\.4\.4['"]/);
  assert.match(workflow, /bundler-cache:\s*true/);
  assert.doesNotMatch(workflow, /node-version:\s*22(?:\.|['"])/);
  assert.doesNotMatch(workflow, /ruby-version:\s*['"]3\.[0-3]\./);
  assert.doesNotMatch(workflow, /\b(sudo|apt-get|brew install)\b/);
});

test('quality workflow always runs Jekyll build and the generated-output privacy audit', () => {
  assert.match(workflow, /run:\s*bundle exec jekyll build/);
  assert.match(workflow, /run:\s*npm run check:site/);
  assert.doesNotMatch(workflow, /if:\s*steps\.ruby\.outputs\.available/);
});

test('developer runtime pins match the exact CI runtimes without fallback versions', () => {
  const nodeVersion = fs.readFileSync(new URL('../.node-version', import.meta.url), 'utf8').trim();
  const rubyVersion = fs.readFileSync(new URL('../.ruby-version', import.meta.url), 'utf8').trim();
  const packageJson = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

  assert.equal(nodeVersion, '24.22.2');
  assert.equal(packageJson.engines.node, '24.22.2');
  assert.match(workflow, /node-version:\s*24\.22\.2/);
  assert.equal(rubyVersion, '3.4.4');
  assert.match(workflow, /ruby-version:\s*['"]3\.4\.4['"]/);
  assert.match(workflow, /runs-on:\s*\[self-hosted,\s*macOS,\s*ARM64\]/);
  assert.doesNotMatch(workflow, /node-version:\s*22(?:\.|['"])/);
  assert.doesNotMatch(workflow, /ruby-version:\s*['"]3\.[0-3]\./);
});
