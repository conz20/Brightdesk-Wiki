import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { checkPublicSite } from '../scripts/check-public-site.mjs';

const PRODUCTS = ['pages','sheets','decks','notes','database','forms','lists','planner','to-do','workspace'];
const TECHNICAL_PAGES = [
  'technical/index.html','technical/system-overview.html','technical/file-formats.html','technical/data-and-privacy.html',
  ...PRODUCTS.map(product => 'technical/products/' + product + '.html')
];
const PRODUCT_LABELS = {
  pages: 'Pages', sheets: 'Sheets', decks: 'Decks', notes: 'Notes', database: 'Database',
  forms: 'Forms', lists: 'Lists', planner: 'Planner', 'to-do': 'To Do', workspace: 'Workspace'
};
const WORKFLOW_ALT_TEXT = {
  pages: 'Three-step workflow: create a document, write and format it, then save or export.',
  sheets: 'Three-step workflow: enter spreadsheet data, add a formula, then check the result.',
  decks: 'Three-step workflow: add slides, arrange the content, then present your work.',
  notes: 'Three-step workflow: create a note, capture an idea, then keep a copy.',
  database: 'Three-step workflow: create a table, choose fields, then add records.',
  forms: 'Three-step workflow: create a form, add questions, then preview the form.',
  lists: 'Three-step workflow: create a list, add items and columns, then search, filter or sort.',
  planner: 'Three-step workflow: create a plan, add buckets and tasks, then track progress.',
  'to-do': 'Three-step workflow: open My Day, add tasks, then mark finished work complete.',
  workspace: 'Three-step workflow: create a workspace, add pages and blocks, then use a checklist.'
};

function siteFixture(t) {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'brightdesk-public-site-'));
  fs.mkdirSync(path.join(rootDir, 'products'), { recursive: true });
  fs.mkdirSync(path.join(rootDir, 'everyday'), { recursive: true });
  fs.mkdirSync(path.join(rootDir, 'technical/products'), { recursive: true });
  fs.mkdirSync(path.join(rootDir, 'assets/css'), { recursive: true });
  fs.mkdirSync(path.join(rootDir, 'assets/js'), { recursive: true });
  fs.mkdirSync(path.join(rootDir, 'assets/images/product-icons'), { recursive: true });
  fs.mkdirSync(path.join(rootDir, 'assets/images/workflows'), { recursive: true });
  fs.writeFileSync(path.join(rootDir, 'assets/css/site.css'), 'body { font-family: sans-serif; }\n');
  fs.writeFileSync(path.join(rootDir, 'assets/js/search.js'), 'export function searchTopics() { return []; }\n');
  const html = '<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><script type="module" src="/assets/js/search.js"></script></head><body><input id="help-search" type="search"></body></html>\n';
  const icon = '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" role="img" aria-labelledby="title desc"><title id="title">Test product icon</title><desc id="desc">A sample product icon.</desc><rect width="128" height="128" rx="12" fill="#ffffff"/></svg>';
  const workflow = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 360" role="img" aria-labelledby="title desc"><title id="title">Test product workflow</title><desc id="desc">A simple three-step product workflow.</desc><rect x="0" y="0" width="1200" height="360" fill="#ffffff"/><text x="20" y="40" font-family="Arial,sans-serif" font-size="20" font-weight="700" text-anchor="start" fill="#111111">Step one</text></svg>';
  fs.writeFileSync(path.join(rootDir, 'index.html'), html);
  fs.writeFileSync(path.join(rootDir, 'everyday/index.html'), html);
  fs.writeFileSync(path.join(rootDir, 'customer-start-here.html'), html);
  for (const page of TECHNICAL_PAGES) fs.writeFileSync(path.join(rootDir, page), html);
  for (const product of PRODUCTS) {
    const label = PRODUCT_LABELS[product];
    const productHtml = html.replace(
      '</body>',
      '<img src="../assets/images/product-icons/' + product + '.svg" alt="Brightdesk ' + label + ' product icon" class="product-guide-icon">' +
      '<img src="../assets/images/workflows/guide-' + product + '.svg" alt="' + WORKFLOW_ALT_TEXT[product] + '" class="product-workflow-diagram"></body>'
    );
    fs.writeFileSync(path.join(rootDir, 'products', product + '.html'), productHtml);
    fs.writeFileSync(path.join(rootDir, 'assets/images/product-icons', product + '.svg'), icon);
    fs.writeFileSync(path.join(rootDir, 'assets/images/workflows/guide-' + product + '.svg'), workflow);
  }
  t.after(() => fs.rmSync(rootDir, { recursive: true, force: true }));
  return rootDir;
}

test('a complete static customer site passes the public-output gate', t => {
  const siteRoot = siteFixture(t);
  const result = checkPublicSite({ siteRoot });
  assert.equal(result.files, 49);
  assert.equal(result.htmlPages, 27);
});

test('all ten product guides use their matching local icon and workflow diagram with descriptive alternative text', t => {
  const siteRoot = siteFixture(t);
  for (const product of PRODUCTS) {
    const html = fs.readFileSync(path.join(siteRoot, 'products', product + '.html'), 'utf8');
    assert.ok(html.includes('src="../assets/images/product-icons/' + product + '.svg" alt="Brightdesk ' + PRODUCT_LABELS[product] + ' product icon" class="product-guide-icon"'));
    assert.ok(html.includes('src="../assets/images/workflows/guide-' + product + '.svg" alt="' + WORKFLOW_ALT_TEXT[product] + '" class="product-workflow-diagram"'));
    assert.equal(html.includes('https://'), false);
    assert.equal(html.includes('//'), false);
  }
});

test('product icon SVGs must contain only the approved static vector elements', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(
    path.join(siteRoot, 'assets/images/product-icons/pages.svg'),
    '<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc"><title id="title">Pages</title><desc id="desc">A document icon.</desc><script>alert(1)</script></svg>'
  );
  assert.throws(
    () => checkPublicSite({ siteRoot }),
    /disallowed SVG element: script/i
  );
});

test('product icon SVGs require accessible title and description elements', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(
    path.join(siteRoot, 'assets/images/product-icons/pages.svg'),
    '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" role="img" aria-labelledby="title desc"><title id="title">Pages</title><rect width="128" height="128" fill="#fff"/></svg>'
  );
  assert.throws(
    () => checkPublicSite({ siteRoot }),
    /accessible title and description/i
  );
});

test('product guide images must use the matching product icon', t => {
  const siteRoot = siteFixture(t);
  const page = path.join(siteRoot, 'products', 'pages.html');
  const html = fs.readFileSync(page, 'utf8').replace(
    'product-icons/pages.svg',
    'product-icons/sheets.svg'
  );
  fs.writeFileSync(page, html);
  assert.throws(
    () => checkPublicSite({ siteRoot }),
    /must use its approved local image/i
  );
});

test('product guide workflow diagrams must match the product being documented', t => {
  const siteRoot = siteFixture(t);
  const page = path.join(siteRoot, 'products', 'pages.html');
  const html = fs.readFileSync(page, 'utf8').replace(
    'workflows/guide-pages.svg',
    'workflows/guide-sheets.svg'
  );
  fs.writeFileSync(page, html);
  assert.throws(
    () => checkPublicSite({ siteRoot }),
    /must use its approved local image/i
  );
});

test('product guide workflow diagrams require meaningful alternative text', t => {
  const siteRoot = siteFixture(t);
  const page = path.join(siteRoot, 'products', 'pages.html');
  const html = fs.readFileSync(page, 'utf8').replace(
    'alt="' + WORKFLOW_ALT_TEXT.pages + '"',
    'alt=""'
  );
  fs.writeFileSync(page, html);
  assert.throws(
    () => checkPublicSite({ siteRoot }),
    /required meaningful alternative text/i
  );
});

test('workflow SVG text uses only the approved local font family', t => {
  const siteRoot = siteFixture(t);
  const workflowPath = path.join(siteRoot, 'assets/images/workflows/guide-pages.svg');
  const svg = fs.readFileSync(workflowPath, 'utf8').replace(
    'Arial,sans-serif',
    'RemoteWebFont'
  );
  fs.writeFileSync(workflowPath, svg);
  assert.throws(
    () => checkPublicSite({ siteRoot }),
    /unapproved font family/i
  );
});

test('product guide images require meaningful alternative text', t => {
  const siteRoot = siteFixture(t);
  const page = path.join(siteRoot, 'products', 'pages.html');
  const html = fs.readFileSync(page, 'utf8').replace(
    'alt="Brightdesk Pages product icon"',
    'alt=""'
  );
  fs.writeFileSync(page, html);
  assert.throws(
    () => checkPublicSite({ siteRoot }),
    /meaningful alternative text/i
  );
});

test('SVG files outside the twenty approved product image paths are rejected', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(
    path.join(siteRoot, 'assets/images/product-icons/extra.svg'),
    '<svg xmlns="http://www.w3.org/2000/svg"></svg>'
  );
  assert.throws(
    () => checkPublicSite({ siteRoot }),
    /outside the approved customer-help allowlist/i
  );
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
  assert.throws(() => checkPublicSite({ siteRoot }), /external URL|contains JavaScript/i);
});

test('unlisted output file types are rejected', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(path.join(siteRoot, 'secret.json'), '{"private":true}');
  assert.throws(() => checkPublicSite({ siteRoot }), /unexpected public output file type/i);
});

test('only the approved customer pages, local CSS and ten product icons are allowed', t => {
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
  fs.writeFileSync(path.join(siteRoot, 'assets/css/site.css'), '@import "//example.com/site.css";\n');
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
    '<!doctype html><style>@import \"//example.com/site.css\";</style>'
  );
  assert.throws(() => checkPublicSite({ siteRoot }), /inline CSS/i);
});

test('non-web URL schemes are rejected in resource attributes', t => {
  const siteRoot = siteFixture(t);
  fs.writeFileSync(
    path.join(siteRoot, 'index.html'),
    '<!doctype html><img src=\"ftp://images.example.com/photo.png\" alt=\"Example\">'
  );
  assert.throws(() => checkPublicSite({ siteRoot }), /external URL/i);
});
