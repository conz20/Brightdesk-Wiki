import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const mcp = JSON.parse(fs.readFileSync(new URL('../.github/mcp.json', import.meta.url), 'utf8'));
const api = mcp.mcpServers['cloudflare-api'];
const docs = mcp.mcpServers['cloudflare-docs'];
const skill = fs.readFileSync(new URL('../.github/skills/brightdesk-cloudflare-pages/SKILL.md', import.meta.url), 'utf8');
const guide = fs.readFileSync(new URL('../docs/development/cloudflare-pages.md', import.meta.url), 'utf8');

test('Cloudflare MCP configuration uses only the documented API and documentation servers', () => {
  assert.deepEqual(Object.keys(mcp.mcpServers).sort(), ['cloudflare-api', 'cloudflare-docs']);
  assert.equal(api.type, 'http');
  assert.equal(api.url, 'https://mcp.cloudflare.com/mcp');
  assert.deepEqual(api.tools, ['search', 'execute']);
  assert.equal(api.headers.Authorization, 'Bearer ${COPILOT_MCP_CLOUDFLARE_API_TOKEN}');
  assert.equal(docs.type, 'http');
  assert.equal(docs.url, 'https://docs.mcp.cloudflare.com/mcp');
  assert.deepEqual(docs.tools, ['search_cloudflare_documentation']);
  assert.doesNotMatch(JSON.stringify(mcp), /Bearer\s+[A-Za-z0-9._-]{24,}/, 'no literal API token is committed');
  assert.ok(!JSON.stringify(mcp).includes('DNS Write'));
});

test('Brightdesk Pages skill fixes the private project, build, runtime, and public-output boundaries', () => {
  for (const text of [
    'conz20/Brightdesk-Wiki',
    'Pages Free',
    'Production branch: main',
    'Preview branch deployments: None',
    'Root directory: repository root (/)',
    'npm run build:cloudflare',
    '_site',
    '24.22.2',
    '3.4.4',
    '12 HTML pages',
    '13 static files',
    'help.brightdesk.com',
    'Only select repositories',
    'Do not add paid plans',
    'COPILOT_MCP_CLOUDFLARE_API_TOKEN'
  ]) assert.ok(skill.includes(text), 'skill includes ' + text);

  assert.match(skill, /Do not change repository visibility/);
  assert.match(skill, /Never change nameservers, DNS records/);
  assert.match(skill, /complete DNS-zone export/);
  assert.match(skill, /Do not grant DNS Write/);
  assert.match(skill, /Do not delete Pages projects/);
  assert.match(skill, /Never read, print, log, copy, expose, or commit the token value/);
});

test('maintainer guide explains repository MCP settings and the dedicated Agents secret', () => {
  assert.match(guide, /GitHub Copilot repository integration/);
  assert.match(guide, /Settings.*Copilot.*MCP servers/);
  assert.match(guide, /Secrets and variables.*Agents/);
  assert.match(guide, /COPILOT_MCP_CLOUDFLARE_API_TOKEN/);
  assert.match(guide, /Cloudflare Pages Edit/);
  assert.match(guide, /Account Settings Read/);
  assert.match(guide, /does not install or authorise the Cloudflare GitHub App/i);
  assert.match(guide, /Cloudflare Pages Edit.*delete/i);
  assert.match(guide, /DNS Write.*not granted|Do not grant DNS Write/i);
});
