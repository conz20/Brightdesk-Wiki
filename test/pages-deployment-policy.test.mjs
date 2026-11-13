import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const workflow = fs.readFileSync(new URL('../.github/workflows/quality.yml', import.meta.url), 'utf8');
const config = fs.readFileSync(new URL('../_config.yml', import.meta.url), 'utf8');
const home = fs.readFileSync(new URL('../docs/index.md', import.meta.url), 'utf8');
const maintainerGuide = fs.readFileSync(new URL('../docs/development/github-pages.md', import.meta.url), 'utf8');
const deployJob = workflow.split('\n  deploy:\n')[1] ?? '';

const mainPublicationCondition = /github\.ref == 'refs\/heads\/main' && \(github\.event_name == 'push' \|\| \(github\.event_name == 'workflow_dispatch' && inputs\.confirm_publication == true\)\)/;

test('production deployment is restricted to main pushes or explicit manual confirmation', () => {
  assert.match(workflow, /push:\s*\n\s+branches:\s*\[main\]/);
  assert.match(workflow, /workflow_dispatch:[\s\S]*?confirm_publication:[\s\S]*?default:\s*false/);
  assert.match(workflow, mainPublicationCondition);
  assert.match(deployJob, /needs:\s*quality/);
  assert.doesNotMatch(deployJob, /pull_request/i);
});

test('production deployment uses only the approved private macOS runner', () => {
  assert.match(deployJob, /runs-on:\s*\[self-hosted,\s*macOS,\s*ARM64\]/);
  assert.doesNotMatch(deployJob, /runs-on:\s*(?:ubuntu-latest|macos-latest|windows-latest)/);
});

test('Pages artifact is uploaded only after the generated-output privacy audit', () => {
  const audit = workflow.indexOf('run: npm run check:site');
  const upload = workflow.indexOf('uses: actions/upload-pages-artifact@fc324d3547104276b827a68afc52ff2a11cc49c9');
  assert.ok(audit >= 0 && upload > audit, 'Pages artifact upload follows the privacy audit');
  assert.match(workflow.slice(audit), new RegExp(mainPublicationCondition.source.replace(/^/, 'if:\\s*')));
  assert.match(workflow, /path:\s*_site\//);
});

test('production deployment uses immutable official GitHub Pages actions', () => {
  assert.match(workflow, /uses: actions\/configure-pages@45bfe0192ca1faeb007ade9deae92b16b8254a0d/);
  assert.match(workflow, /uses: actions\/upload-pages-artifact@fc324d3547104276b827a68afc52ff2a11cc49c9/);
  assert.match(deployJob, /uses: actions\/deploy-pages@368f82528645a54fb793d4d04e342629a3f51346/);
  for (const match of workflow.matchAll(/uses:\s*[^\s@]+@([^\s#]+)/g)) {
    assert.match(match[1], /^[0-9a-f]{40}$/, 'every external action is pinned to a full commit SHA');
  }
});

test('deployment permissions are least-privilege and use the GitHub Pages environment', () => {
  assert.match(deployJob, /permissions:\s*\n\s+actions:\s*read\s+contents:\s*read\s+pages:\s*write\s+id-token:\s*write/);
  assert.match(deployJob, /environment:\s*\n\s+name:\s*github-pages/);
  assert.match(deployJob, /url:\s*\$\{\{\s*steps\.deployment\.outputs\.page_url\s*\}\}/);
});

test('site configuration and customer homepage describe the intended public project URL truthfully', () => {
  assert.match(config, /url:\s*"https:\/\/conz20\.github\.io"/);
  assert.match(config, /baseurl:\s*"\/Brightdesk-Wiki"/);
  assert.doesNotMatch(home, /No public website or customer URL is currently available/i);
  assert.match(home, /read-only/i);
});

test('maintainer instructions preserve private source and free customer access without requiring a purchase', () => {
  assert.match(maintainerGuide, /source repository.*remain private/i);
  assert.match(maintainerGuide, /existing GitHub account.*eligible plan|eligible plan.*private source repository/i);
  assert.match(maintainerGuide, /no additional paid plan|upgrade|third-party hosting/i);
  assert.match(maintainerGuide, /Settings.*Pages/i);
  assert.match(maintainerGuide, /GitHub Actions/i);
});
