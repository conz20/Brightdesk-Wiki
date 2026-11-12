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

test('quality workflow builds pinned libyaml and Ruby in a runner-local cache', () => {
  assert.match(workflow, /libyaml_version="0\.2\.5"/);
  assert.match(workflow, /https:\/\/github\.com\/yaml\/libyaml\/releases\/download\/\$libyaml_version\/yaml-\$libyaml_version\.tar\.gz/);
  assert.match(workflow, /c642ae9b75fee120b2d96c712538bd2cf283228d2337df2cf2988e3c02678ef4/);
  assert.match(workflow, /shasum -a 256 --check -/);
  assert.match(workflow, /libyaml_prefix=.*RUNNER_TEMP/);
  assert.match(workflow, /RUBY_CONFIGURE_OPTS=.*--with-libyaml-dir=/);
  assert.match(workflow, /ruby_build_revision=.*573f87a93b27195b97c2a72b5c6fbc0a266d73d0/);
  assert.match(workflow, /ruby-build[\s\S]*3\.4\.4/);
  assert.match(workflow, /RUNNER_TOOL_CACHE:\s*\$\{\{\s*runner\.temp\s*\}\}\/ruby-toolcache/);
  assert.match(workflow, /touch "\$prefix\.complete"/);
  assert.match(workflow, /uses:\s*ruby\/setup-ruby@b3aaceaef7e0ee231b499e7b5f49c03fc1d32199/);
  assert.match(workflow, /self-hosted:\s*true/);
  assert.match(workflow, /ruby-version:\s*['"]3\.4\.4['"]/);
  assert.match(workflow, /bundler-cache:\s*true/);
  assert.doesNotMatch(workflow, /Check whether Ruby 3\.4\.4 is preinstalled/);
  assert.doesNotMatch(workflow, /Jekyll build and generated-output audit are deferred/);
  assert.doesNotMatch(workflow, /if:\s*steps\.ruby\.outputs\.available/);
  assert.doesNotMatch(workflow, /\b(sudo|apt-get|brew install)\b/);
});

test('quality workflow always runs Jekyll build and the generated-output privacy audit', () => {
  assert.match(workflow, /run:\s*bundle exec jekyll build/);
  assert.match(workflow, /run:\s*npm run check:site/);
  assert.doesNotMatch(workflow, /if:\s*steps\.ruby\.outputs\.available/);
});
