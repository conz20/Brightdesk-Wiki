import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const mcp = JSON.parse(fs.readFileSync(new URL('../.github/mcp.json', import.meta.url), 'utf8'));
const docs = mcp.mcpServers['cloudflare-docs'];
const skill = fs.readFileSync(new URL('../.github/skills/brightdesk-cloudflare-pages/SKILL.md', import.meta.url), 'utf8');
const guide = fs.readFileSync(new URL('../docs/development/cloudflare-pages.md', import.meta.url), 'utf8');

test('Cloudflare MCP configuration is public documentation search only and requires no credential', () => {
  assert.deepEqual(Object.keys(mcp.mcpServers), ['cloudflare-docs']);
  assert.equal(docs.type, 'http');
  assert.equal(docs.url, 'https://docs.mcp.cloudflare.com/mcp');
  assert.deepEqual(docs.tools, ['search_cloudflare_documentation']);
  assert.doesNotMatch(JSON.stringify(mcp), /cloudflare-api|authorization|bearer|token|execute/i);
});

test('Brightdesk Pages skill fixes the private project, free hostname, build, runtime and output boundaries', () => {
  for (const text of [
    'conz20/Brightdesk-Wiki',
    'Pages Free',
    'Production branch: main',
    'Preview branch deployments: target **None**',
    'Root directory: repository root (/)',
    'npm run build:cloudflare',
    '_site',
    '24.22.2',
    '3.4.4',
    '31 HTML pages',
    '24 local assets',
    '56 files total',
    'https://brightdesk-help.pages.dev/',
    'Only select repositories',
    'Do not add paid plans',
    'does not require Cloudflare API credentials'
  ]) assert.ok(skill.includes(text), 'skill includes ' + text);

  assert.match(skill, /Do not change repository visibility/);
  assert.match(skill, /Never change nameservers, DNS records/);
  assert.match(skill, /complete current DNS-zone export/);
  assert.match(skill, /Do not grant DNS Write/);
  assert.match(skill, /Do not delete Pages projects/);
  assert.doesNotMatch(skill, /COPILOT_MCP_CLOUDFLARE_API_TOKEN|Cloudflare Pages Edit/i);
});

test('maintainer guide documents read-only Cloudflare documentation search without an API token', () => {
  assert.match(guide, /GitHub Copilot repository integration/);
  assert.match(guide, /\.github\/mcp\.json/);
  assert.match(guide, /public documentation search server/);
  assert.match(guide, /No Cloudflare API token is required/i);
  assert.match(guide, /Only select repositories/);
  assert.doesNotMatch(guide, /COPILOT_MCP_CLOUDFLARE_API_TOKEN|Cloudflare Pages Edit|Account Settings Read|Cloudflare API MCP server/i);
});
