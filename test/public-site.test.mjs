import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { checkPublicSite } from '../scripts/check-public-site.mjs';

const PRODUCTS = ['pages','sheets','decks','notes','database','forms','lists','planner','to-do','workspace'];
const TECHNICAL_PAGES = [
  'technical/index.html',
  'technical/system-overview.html',
  'technical/file-formats.html',
  'technical/data-and-privacy.html',
  ...PRODUCTS.map(product => 'technical/products/' + product + '.html')
];

function siteFixture(t) {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'brightdesk-public-site-'));
  fs.mkdirSync(path.join(rootDir, 'products'), { recursive: true });
  fs.mkdirSync(path.join(rootDir, 'technical/products'), { recursive: true });
  fs.mkdirSync(path.join(rootDir, 'assets/css'), { recursive: true });
  fs.mkdirSync(path.join(rootDir, 'assets/js'), { recursive: true });
  fs.writeFileSync(path.join(rootDir, 'assets/css/site.css'), 'body { font-family: sans-serif; }\\n');
  fs.writeFileSync(path.join(rootDir, 'assets/js/search.js'), 'export function searchTopics() { return []; }\\n');
  const html = '<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><script type="module" src="/assets/js/search.js"></script></head><body><input id="help-search" type="search"></body></html>\\n';
  fs.writeFileSync(path.join(rootDir, 'index.html'), html);
  fs.writeFileSync(path.join(rootDir, 'customer-start-here.html'), html);
  for (const product of PRODUCTS) {
    fs.writeFileSync(path.join(rootDir, 'products', product + '.html'), html);
  }
  for (const page of TECHNICAL_PAGES) {
    const target = path.join(rootDir, page);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, html);
  }
  t.after(() => fs.rmSync(rootDir, { recursive: true, force: true }));
  return rootDir;
}

test('technical documentation landing page has its stable public URL', () => {
  const sourcePath = path.join(process.cwd(), 'docs', 'technical', 'index.md');
  const source = fs.readFileSync(sourcePath, 'utf8');
  assert.match(source, /^permalink: \/technical\/index\.html$/m);
  assert.doesNotMatch(source, /^permalink: \/technical\.\.\//m);
});

test('a complete static customer site passes the public-output gate', t => {
  const siteRoot = siteFixture(t);
  const result = checkPublicSite({ siteRoot });
  assert.equal(result.files, 28);
  assert.equal(result.htmlPages, 26);
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

test('external JavaScript is rejected', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(path.join(siteRoot, 'index.html'), '<!doctype html><script type="module" src="https://example.com/tracker.js"></script><input id="help-search" type="search">');
  assert.throws(() => checkPublicSite({ siteRoot }), /external URL/i);
});

test('only the dedicated Help search field is allowed', t => {
  const siteRoot = siteFixture(t);
  const indexPath = path.join(siteRoot, 'index.html');
  const html = fs.readFileSync(indexPath, 'utf8').replace(
    '<input id="help-search" type="search">',
    '<input id="help-search" type="search"><input id="comment" type="text">'
  );
  fs.writeFileSync(indexPath, html);
  assert.throws(() => checkPublicSite({ siteRoot }), /accessible Brightdesk Help search field/i);
});

test('the local search module cannot use network requests or visitor storage', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(path.join(siteRoot, 'assets/js/search.js'), 'fetch("https://example.com");');
  assert.throws(() => checkPublicSite({ siteRoot }), /network access, executable code generation or visitor storage/i);
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


test('interactive and editable controls are rejected from the customer help site', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(
    path.join(siteRoot, 'index.html'),
    '<!doctype html><form><label>Comment <input name="comment"></label><button>Submit</button></form>'
  );
  assert.throws(() => checkPublicSite({ siteRoot }), /interactive or editable controls/i);
});

test('inline event handlers and executable URLs are rejected', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(
    path.join(siteRoot, 'index.html'),
    '<!doctype html><a href="javascript:alert(1)" onclick="alert(1)">Open</a>'
  );
  assert.throws(() => checkPublicSite({ siteRoot }), /active HTML event handler or executable URL/i);
});

test('embedded frames and plugin content are rejected from customer pages', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(
    path.join(siteRoot, 'index.html'),
    '<!doctype html><iframe src="/external"></iframe>'
  );
  assert.throws(() => checkPublicSite({ siteRoot }), /interactive or editable controls/i);
});

test('protocol-relative external links are rejected from customer pages', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(path.join(siteRoot, 'index.html'), '<!doctype html><a href="//example.com/help">External help</a>');
  assert.throws(() => checkPublicSite({ siteRoot }), /external URL/i);
});

test('protocol-relative stylesheet imports are rejected', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(path.join(siteRoot, 'assets/css/site.css'), '@import "//example.com/site.css";\\n');
  assert.throws(() => checkPublicSite({ siteRoot }), /external resources/i);
});


test('HTML entity-encoded protocol-relative links are rejected', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(path.join(siteRoot, 'index.html'), '<!doctype html><a href="&#x2f;&#x2f;example.com/help">External help</a>');
  assert.throws(() => checkPublicSite({ siteRoot }), /external URL/i);
});

test('named HTML slash references cannot hide external links', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(path.join(siteRoot, 'index.html'), '<!doctype html><a href="&sol;&sol;example.com/help">External help</a>');
  assert.throws(() => checkPublicSite({ siteRoot }), /external URL/i);
});

test('HTML character references cannot hide executable URL schemes', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(path.join(siteRoot, 'index.html'), '<!doctype html><a href="java&#x73;cript:alert(1)">Open</a>');
  assert.throws(() => checkPublicSite({ siteRoot }), /active HTML event handler or executable URL/i);
});

test('a symbolic-link site output root is rejected rather than followed', {
  skip: process.platform === 'win32'
}, t => {
  const realSiteRoot = siteFixture(t);
  const linkedSiteRoot = path.join(
    path.dirname(realSiteRoot),
    path.basename(realSiteRoot) + '-root-link'
  );
  fs.symlinkSync(realSiteRoot, linkedSiteRoot, 'dir');
  t.after(() => fs.rmSync(linkedSiteRoot, { force: true }));

  assert.throws(
    () => checkPublicSite({ siteRoot: linkedSiteRoot }),
    /site output root must not be a symbolic link/i
  );
});


test('external image candidates in srcset are rejected', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(
    path.join(siteRoot, 'index.html'),
    '<!doctype html><img srcset="/local-small.png 1x, //images.example.com/large.png 2x">'
  );
  assert.throws(() => checkPublicSite({ siteRoot }), /external URL/i);
});

test('external video poster resources are rejected', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(
    path.join(siteRoot, 'index.html'),
    '<!doctype html><video poster="https://media.example.com/preview.jpg"></video>'
  );
  assert.throws(() => checkPublicSite({ siteRoot }), /external URL/i);
});

test('inline styles and style elements are rejected', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(
    path.join(siteRoot, 'index.html'),
    '<!doctype html><p style="background-image:url(//example.com/image.png)">Help</p>'
  );
  assert.throws(() => checkPublicSite({ siteRoot }), /inline CSS/i);
});

test('meta refresh navigation is rejected', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(
    path.join(siteRoot, 'index.html'),
    '<!doctype html><meta http-equiv="refresh" content="0;url=//example.com">'
  );
  assert.throws(() => checkPublicSite({ siteRoot }), /automatic navigation/i);
});

test('CSS escapes are rejected because the site needs no escaped CSS values', t => {
  const siteRoot = siteFixture(t);
  const escapedImport = '@' + String.fromCharCode(92) + '69mport "//example.com/site.css";';
  fs.writeFileSync(path.join(siteRoot, 'assets/css/site.css'), escapedImport);
  assert.throws(() => checkPublicSite({ siteRoot }), /CSS escape/i);
});


test('style elements cannot add inline styles or external imports', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(
    path.join(siteRoot, 'index.html'),
    '<!doctype html><style>@import "//example.com/site.css";</style>'
  );
  assert.throws(() => checkPublicSite({ siteRoot }), /inline CSS/i);
});

test('non-web URL schemes are rejected in resource attributes', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(
    path.join(siteRoot, 'index.html'),
    '<!doctype html><img src="ftp://images.example.com/photo.png" alt="Example">'
  );
  assert.throws(() => checkPublicSite({ siteRoot }), /external URL/i);
});
