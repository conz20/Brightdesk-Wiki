import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const guide = fs.readFileSync(new URL('../docs/development/cloudflare-pages.md', import.meta.url), 'utf8');
const mcpConfig = new URL('../.github/mcp.json', import.meta.url);
const agentSkill = new URL('../.github/skills/brightdesk-cloudflare-pages/SKILL.md', import.meta.url);

test('Cloudflare Pages deployment uses the repository-scoped GitHub integration without API credentials', () => {
  assert.match(guide, /Use Cloudflare's GitHub integration/);
  assert.match(guide, /Only select repositories/);
  assert.match(guide, /select only Brightdesk-Wiki/);
  assert.match(guide, /Cloudflare Pages Git integration is the approved deployment path/);
  assert.match(guide, /Do not create a Cloudflare API token, GitHub Actions secret, Copilot Agents secret, or remote MCP execution configuration/);
  assert.doesNotMatch(guide, /COPILOT_MCP_CLOUDFLARE_API_TOKEN|Cloudflare Pages Edit|GitHub Copilot repository integration/);
  assert.equal(fs.existsSync(mcpConfig), false, 'remote Cloudflare API MCP configuration is not present');
  assert.equal(fs.existsSync(agentSkill), false, 'credential-based Copilot agent instructions are not present');
});

test('Cloudflare deployment remains gated by exact build, privacy, and DNS requirements', () => {
  for (const text of [
    'npm run build:cloudflare',
    '24.22.2',
    '3.4.4',
    '12 customer pages',
    '14 static files',
    'help.brightdesk.com',
    'Preview branch',
    'complete DNS-zone export',
    'explicit approval of the exact change'
  ]) assert.ok(guide.includes(text), 'maintainer guide includes ' + text);

  assert.match(guide, /Do not publish or advertise a `pages\.dev` address/);
  assert.match(guide, /Do not change nameservers or alter DNS/);
});
