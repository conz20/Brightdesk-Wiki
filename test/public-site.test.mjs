import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { checkPublicSite } from '../scripts/check-public-site.mjs';

const PRODUCTS = ['pages','sheets','decks','notes','database','forms','lists','planner','to-do','workspace'];

function siteFixture(t) {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'brightdesk-public-site-'));
  fs.mkdirSync(path.join(rootDir, 'products'), { recursive: true });
  fs.mkdirSync(path.join(rootDir, 'assets/css'), { recursive: true });
  fs.writeFileSync(path.join(rootDir, 'assets/css/site.css'), 'body { font-family: sans-serif; }\n');
  const html = '<!doctype html><html lang="en-AU"><head><meta charset="utf-8"></head><body>Brightdesk Help</body></html>\n';
  fs.writeFileSync(path.join(rootDir, 'index.html'), html);
  fs.writeFileSync(path.join(rootDir, 'customer-start-here.html'), html);
  for (const product of PRODUCTS) {
    fs.writeFileSync(path.join(rootDir, 'products', product + '.html'), html);
  }
  t.after(() => fs.rmSync(rootDir, { recursive: true, force: true }));
  return rootDir;
}

test('a complete static customer site passes the public-output gate', t => {
  const siteRoot = siteFixture(t);
  const result = checkPublicSite({ siteRoot });
  assert.equal(result.files, 13);
  assert.equal(result.htmlPages, 12);
});

test('internal maintainer documentation must never enter the public output', t => {
  const siteRoot = siteFixture(t);
  fs.mkdirSync(path.join(siteRoot, 'security'), { recursive: true });
  fs.writeFileSync(path.join(siteRoot, 'security/boundaries.html'), '<!doctype html>private');
  assert.throws(() => checkPublicSite({ siteRoot }), /internal or repository-only content/i);
});

test('private Brightdesk repository links must never be published', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(path.join(siteRoot, 'index.html'), '<!doctype html><a href="https://github.com/conz20/Brightdesk-AI">private</a>');
  assert.throws(() => checkPublicSite({ siteRoot }), /external URL|private Brightdesk GitHub account/i);
});

test('JavaScript and external assets are rejected', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(path.join(siteRoot, 'index.html'), '<!doctype html><script src="https://example.com/tracker.js"></script>');
  assert.throws(() => checkPublicSite({ siteRoot }), /contains JavaScript/i);
});

test('unlisted output file types are rejected', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(path.join(siteRoot, 'secret.json'), '{"private":true}');
  assert.throws(() => checkPublicSite({ siteRoot }), /unexpected public output file type/i);
});

test('only the approved customer homepage, start page, ten product guides and local CSS are allowed', t => {
  const siteRoot = siteFixture(t);
  fs.mkdirSync(path.join(siteRoot, 'owner-only'), { recursive: true });
  fs.writeFileSync(path.join(siteRoot, 'owner-only/admin.html'), '<!doctype html>owner only');
  assert.throws(() => checkPublicSite({ siteRoot }), /outside the approved customer-help allowlist/i);
});

test('unlisted customer help pages are rejected until explicitly approved', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(path.join(siteRoot, 'extra-guide.html'), '<!doctype html>extra');
  assert.throws(() => checkPublicSite({ siteRoot }), /outside the approved customer-help allowlist/i);
});

test('symbolic-link files are rejected instead of being followed into generated output', {
  skip: process.platform === 'win32'
}, t => {
  const siteRoot = siteFixture(t);
  fs.symlinkSync(path.join(siteRoot, 'index.html'), path.join(siteRoot, 'linked-index.html'), 'file');
  assert.throws(() => checkPublicSite({ siteRoot }), /symbolic link is not allowed in generated output/i);
});

test('symbolic-link directories are rejected instead of being walked into generated output', {
  skip: process.platform === 'win32'
}, t => {
  const siteRoot = siteFixture(t);
  fs.symlinkSync(path.join(siteRoot, 'products'), path.join(siteRoot, 'linked-products'), 'dir');
  assert.throws(() => checkPublicSite({ siteRoot }), /symbolic link is not allowed in generated output/i);
});
