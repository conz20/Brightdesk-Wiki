import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL(path, import.meta.url), 'utf8');
const readme = read('../README.md');
const policy = read('../docs/development/github-pages.md');
const config = read('../_config.yml');
const workflow = read('../.github/workflows/quality.yml');
const packageJson = JSON.parse(read('../package.json'));

test('no Cloudflare or external hosting integration is configured for the Wiki', () => {
  assert.equal(fs.existsSync(new URL('../.github/mcp.json', import.meta.url)), false);
  assert.equal(fs.existsSync(new URL('../.github/skills/brightdesk-cloudflare-pages/SKILL.md', import.meta.url)), false);
  assert.doesNotMatch(config, /pages\.dev|cloudflare|wrangler/i);
  assert.doesNotMatch(JSON.stringify(packageJson), /cloudflare|wrangler/i);
  assert.doesNotMatch(workflow, /cloudflare|wrangler|pages:\s*write|id-token:\s*write|actions\/deploy-pages|actions\/upload-pages-artifact|actions\/configure-pages|github-pages/i);
  assert.match(readme, /Do not create, connect, configure or use Cloudflare Pages/);
});

test('GitHub Pages remains a gated future target, not a configured deployment', () => {
  assert.match(readme, /GitHub is the only approved publishing platform/);
  assert.match(readme, /No public customer Help website is currently verified as deployed/);
  assert.match(readme, /GitHub Pages settings and the account's current plan have not been verified/);
  assert.match(readme, /If the source repository is private, publishing a public GitHub Pages site from it requires GitHub Pro/);
  assert.match(readme, /do not buy, trial or upgrade a plan/i);
  assert.match(policy, /No GitHub Pages configuration, production deployment, deployed commit or public customer URL is verified/);
  assert.match(policy, /explicit authorisation/);
  assert.equal(packageJson.scripts['build:cloudflare'], undefined);
  assert.equal(packageJson.scripts['build:site'], 'bundle exec jekyll build');
  assert.equal(config.match(/^url:\s*""$/m)?.length, 1);
});

test('quality checks remain read-only and the Help site stays separate from customer software', () => {
  assert.match(workflow, /permissions:\s*\n\s+contents:\s*read/);
  assert.match(workflow, /runs-on:\s*ubuntu-24\.04/);
  assert.match(workflow, /run: npm run check:site/);
  assert.doesNotMatch(workflow, /pages:\s*write|id-token:\s*write|actions\/deploy-pages|actions\/upload-pages-artifact|actions\/configure-pages/);
  assert.match(policy, /one Help homepage, one Suite getting-started guide and exactly ten product guides/);
  assert.match(policy, /GitHub Pages processes visitor IP addresses/);
  assert.match(policy, /never installed, bundled, linked into product UI or required for offline product use/);
});
