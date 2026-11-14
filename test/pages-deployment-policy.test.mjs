import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const workflow = fs.readFileSync(new URL('../.github/workflows/quality.yml', import.meta.url), 'utf8');
const config = fs.readFileSync(new URL('../_config.yml', import.meta.url), 'utf8');
const packageJson = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const cloudflareGuide = fs.readFileSync(new URL('../docs/development/cloudflare-pages.md', import.meta.url), 'utf8');
const historicGithubGuide = fs.readFileSync(new URL('../docs/development/github-pages.md', import.meta.url), 'utf8');

const buildCommand = packageJson.scripts['build:cloudflare'];

test('Cloudflare production build runs the complete validation pipeline before publishing', () => {
  assert.ok(buildCommand, 'Cloudflare build command is defined');
  const required = [
    'npm ci --no-audit --no-fund',
    'npm run check:node',
    'npm run check &&',
    'npm test',
    'npm run links',
    'bundle install',
    'bundle exec jekyll build',
    'npm run check:site'
  ];
  let lastPosition = -1;
  for (const command of required) {
    const position = buildCommand.indexOf(command);
    assert.ok(position > lastPosition, command + ' runs in the required order');
    lastPosition = position;
  }
});

test('the Cloudflare build uses the exact repository-pinned Node and Ruby runtimes', () => {
  assert.equal(fs.readFileSync(new URL('../.node-version', import.meta.url), 'utf8').trim(), '24.22.2');
  assert.equal(fs.readFileSync(new URL('../.ruby-version', import.meta.url), 'utf8').trim(), '3.4.4');
  assert.match(cloudflareGuide, /NODE_VERSION.*24\\.22\\.2|\\.node-version.*24\\.22\\.2/i);
  assert.match(cloudflareGuide, /RUBY_VERSION.*3\\.4\\.4|\\.ruby-version.*3\\.4\\.4/i);
});

test('Jekyll builds from the customer docs folder at the Pages project root', () => {
  assert.match(config, /^source: docs$/m);
  assert.match(config, /^destination: _site$/m);
  assert.match(config, /^baseurl:\\s*""$/m);
  assert.doesNotMatch(config, /github\\.io|Brightdesk-Wiki/);
  assert.match(cloudflareGuide, /Build output directory.*_site|_site.*Build output directory/i);
  assert.match(cloudflareGuide, /Build command.*build:cloudflare|build:cloudflare.*Build command/i);
});

test('GitHub Actions validates changes but never publishes or grants deployment permissions', () => {
  assert.match(workflow, /pull_request:\\s*\\n\\s+branches:\\s*\\[main\\]/);
  assert.match(workflow, /push:\\s*\\n\\s+branches:\\s*\\[main\\]/);
  assert.match(workflow, /runs-on:\\s*ubuntu-latest/);
  assert.match(workflow, /timeout-minutes:\\s*10/);
  assert.doesNotMatch(workflow, /self-hosted|macOS|ARM64/);
  assert.match(workflow, /run: npm run check:site/);
  assert.doesNotMatch(workflow, /pages:\\s*write|id-token:\\s*write|actions\\/deploy-pages|actions\\/upload-pages-artifact|actions\\/configure-pages|github-pages/);
  assert.doesNotMatch(workflow, /CLOUDFLARE_API_TOKEN|CLOUDFLARE_ACCOUNT_ID|wrangler-action/i);
  assert.doesNotMatch(workflow, /^\\s{2}deploy:/m);
  for (const match of workflow.matchAll(/uses:\\s*[^\\s@]+@([^\\s#]+)/g)) {
    assert.match(match[1], /^[0-9a-f]{40}$/, 'every external action is pinned to a full commit SHA');
  }
});

test('Cloudflare Git integration is restricted to the private Wiki repository and main production branch', () => {
  assert.match(cloudflareGuide, /conz20\\/Brightdesk-Wiki/);
  assert.match(cloudflareGuide, /Only select repositories|only.*Brightdesk-Wiki.*repository/i);
  assert.match(cloudflareGuide, /production branch.*main|main.*production branch/i);
  assert.match(cloudflareGuide, /Preview branch.*None|disable.*preview deployments/i);
  assert.match(cloudflareGuide, /free plan|Cloudflare Pages Free/i);
  assert.match(cloudflareGuide, /no paid|no purchase|no upgrade/i);
});

test('customer Help address is the approved free Pages hostname and custom DNS is not required', () => {
  assert.match(cloudflareGuide, /https:\\/\\/brightdesk-help\\.pages\\.dev\\//);
  assert.match(cloudflareGuide, /canonical free project hostname|canonical public Help address/i);
  assert.match(cloudflareGuide, /No paid custom domain.*DNS change or nameserver change is required/i);
  assert.match(cloudflareGuide, /do not change DNS or nameservers/i);
  assert.match(cloudflareGuide, /Cloudflare successfully built and deployed pull-request previews/i);
  assert.match(cloudflareGuide, /production branch.*main/i);
  assert.match(cloudflareGuide, /deployed commit SHA/i);
  assert.doesNotMatch(cloudflareGuide, /help\\.brightdesk\\.com|64\\.190\\.63\\.222|64\\.190\\.63\\.111/);
});

test('only the audited read-only customer output is configured for publishing', () => {
  assert.match(cloudflareGuide, /31 approved HTML pages/);
  assert.match(cloudflareGuide, /56 files total/);
  assert.match(cloudflareGuide, /Everyday Help homepage/);
  assert.match(cloudflareGuide, /Technical Documentation homepage/);
  assert.match(cloudflareGuide, /24 local assets/);
  assert.match(cloudflareGuide, /local-only browser search/i);
  assert.match(cloudflareGuide, /internal.*must remain private|maintainer.*private/i);
  assert.match(cloudflareGuide, /No customer login.*comments.*uploads|no customer login.*upload/i);
});

test('Cloudflare response policy applies same-origin-only resources and browser protections', () => {
  const headers = fs.readFileSync(new URL('../docs/_headers', import.meta.url), 'utf8');
  assert.match(headers, /X-Content-Type-Options: nosniff/);
  assert.match(headers, /Referrer-Policy: strict-origin-when-cross-origin/);
  assert.match(headers, /X-Frame-Options: DENY/);
  assert.match(headers, /Permissions-Policy: camera=\\(\\), microphone=\\(\\), geolocation=\\(\\)/);
  assert.match(headers, /Strict-Transport-Security: max-age=31536000/);
  assert.match(headers, /Content-Security-Policy: default-src 'self'.*object-src 'none'.*frame-ancestors 'none'.*script-src 'self'.*style-src 'self'/);
});

test('hosting privacy notes disclose Cloudflare visitor metadata processing', () => {
  assert.match(cloudflareGuide, /visitor IP|IP addresses/i);
  assert.match(cloudflareGuide, /Cloudflare.*process.*technical.*metadata|technical.*metadata.*Cloudflare/i);
});

test('historical GitHub Pages instructions are preserved but clearly superseded', () => {
  assert.match(historicGithubGuide, /Superseded by.*Cloudflare Pages/i);
  assert.match(historicGithubGuide, /historical|kept for reference/i);
});
