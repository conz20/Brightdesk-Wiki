#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_SITE_ROOT = path.resolve(SCRIPT_DIR, '..', '_site');
const PRODUCTS = ['pages','sheets','decks','notes','database','forms','lists','planner','to-do','workspace'];
const TECHNICAL_PAGES = [
  'technical/index.html',
  'technical/system-overview.html',
  'technical/file-formats.html',
  'technical/data-and-privacy.html',
  ...PRODUCTS.map(product => 'technical/products/' + product + '.html')
];
const PRODUCT_LABELS = new Map([
  ['pages', 'Pages'], ['sheets', 'Sheets'], ['decks', 'Decks'], ['notes', 'Notes'],
  ['database', 'Database'], ['forms', 'Forms'], ['lists', 'Lists'], ['planner', 'Planner'],
  ['to-do', 'To Do'], ['workspace', 'Workspace']
]);
const PRODUCT_ICON_FILES = PRODUCTS.map(product => 'assets/images/product-icons/' + product + '.svg');
const PRODUCT_WORKFLOW_FILES = PRODUCTS.map(product => 'assets/images/workflows/guide-' + product + '.svg');
const BRAND_IMAGE_FILES = ['favicon.svg', 'assets/images/brightdesk-help-social.svg'];
const APPROVED_SVG_FILES = [...PRODUCT_ICON_FILES, ...PRODUCT_WORKFLOW_FILES, ...BRAND_IMAGE_FILES];
const REQUIRED_FILES = ['index.html','everyday/index.html','customer-start-here.html','assets/css/site.css','assets/js/search.js','_headers', ...BRAND_IMAGE_FILES]
  .concat(PRODUCTS.map(product => 'products/' + product + '.html'))
  .concat(TECHNICAL_PAGES)
  .concat(APPROVED_SVG_FILES);
const ALLOWED_FILES = new Set(REQUIRED_FILES);
const SVG_ELEMENTS = new Set(['svg', 'title', 'desc', 'rect', 'path', 'ellipse', 'circle', 'text']);
const SVG_ATTRIBUTES = new Set([
  'xmlns', 'width', 'height', 'viewBox', 'role', 'aria-labelledby', 'id',
  'x', 'y', 'rx', 'ry', 'cx', 'cy', 'r', 'd', 'fill', 'stroke',
  'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'text-anchor',
  'font-family', 'font-size', 'font-weight'
]);
const WORKFLOW_ALT_TEXT = new Map([
  ['pages', 'Three-step workflow: create a document, write and format it, then save or export.'],
  ['sheets', 'Three-step workflow: enter spreadsheet data, add a formula, then check the result.'],
  ['decks', 'Three-step workflow: add slides, arrange the content, then present your work.'],
  ['notes', 'Three-step workflow: create a note, capture an idea, then keep a copy.'],
  ['database', 'Three-step workflow: create a table, choose fields, then add records.'],
  ['forms', 'Three-step workflow: create a form, add questions, then preview the form.'],
  ['lists', 'Three-step workflow: create a list, add items and columns, then search, filter or sort.'],
  ['planner', 'Three-step workflow: create a plan, add buckets and tasks, then track progress.'],
  ['to-do', 'Three-step workflow: open My Day, add tasks, then mark finished work complete.'],
  ['workspace', 'Three-step workflow: create a workspace, add pages and blocks, then use a checklist.']
]);
const FORBIDDEN_PATHS = [
  /^(architecture|development|security|releases)\//i,
  /(^|\/)README\.html$/i,
  /(^|\/)package(-lock)?\.json$/i,
  /(^|\/)Gemfile(\.lock)?$/i,
  /(^|\/)\.ruby-version$/i,
  /(^|\/)scripts\//i,
  /(^|\/)test\//i
];

function fail(message) {
  throw new Error('Public Wiki check: ' + message);
}

function validateApprovedSvg(file, svg) {
  const relative = file.split(path.sep).join('/');
  if (!APPROVED_SVG_FILES.includes(relative)) {
    fail('SVG is outside the approved image library: ' + relative);
  }
  if (!/^<svg\b[^>]*>/.test(svg) || !/<\/svg>\s*$/.test(svg)) {
    fail(relative + ' is not a complete SVG document');
  }
  if (!/\bxmlns="http:\/\/www\.w3\.org\/2000\/svg"/.test(svg) ||
      !/\brole="img"/.test(svg) || !/\baria-labelledby="title desc"/.test(svg) ||
      !/<title id="title">[\s\S]+?<\/title>/.test(svg) ||
      !/<desc id="desc">[\s\S]+?<\/desc>/.test(svg)) {
    fail(relative + ' must include an SVG namespace, image role, accessible title and description');
  }

  const withoutNamespace = svg.replace('xmlns="http://www.w3.org/2000/svg"', '');
  if (/(?:https?:)?\/\//i.test(withoutNamespace) ||
      /(?:javascript|data|vbscript):|url\s*\(|\son[a-z][a-z0-9_-]*\s*=|\b(?:href|xlink:href|src)\s*=|<style\b/i.test(svg)) {
    fail(relative + ' contains an active feature or external SVG reference');
  }

  const stack = [];
  let rootSeen = false;
  let rootClosed = false;
  const tags = [...svg.matchAll(/<\/?([a-z][a-z0-9:-]*)\b[^>]*>/gi)];
  if (tags.length === 0) fail(relative + ' contains no SVG elements');
  for (const match of tags) {
    const token = match[0];
    const name = match[1];
    if (!SVG_ELEMENTS.has(name)) fail(relative + ' contains a disallowed SVG element: ' + name);
    const attributeText = token.replace(/^<\/?[a-z][a-z0-9:-]*/i, '').replace(/\/?>$/, '');
    const attributeMatches = [...attributeText.matchAll(/\s+([a-zA-Z_:][a-zA-Z0-9:_.-]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)];
    const parsedAttributeText = attributeMatches.map(item => item[0]).join('');
    if (parsedAttributeText.trim() !== attributeText.trim()) {
      fail(relative + ' contains malformed or unsupported SVG attributes');
    }
    for (const attribute of attributeMatches) {
      const attributeName = attribute[1];
      const attributeValue = attribute[2] ?? attribute[3] ?? '';
      if (!SVG_ATTRIBUTES.has(attributeName)) {
        fail(relative + ' contains a disallowed SVG attribute: ' + attributeName);
      }
      if (attributeName === 'font-family' && attributeValue !== 'Arial,sans-serif') {
        fail(relative + ' uses an unapproved font family');
      }
    }

    if (token.startsWith('</')) {
      if (rootClosed || stack.pop() !== name) {
        fail(relative + ' contains incorrectly nested SVG elements');
      }
      if (stack.length === 0) {
        if (name !== 'svg') fail(relative + ' has an invalid SVG root');
        rootClosed = true;
      }
    } else {
      if (rootClosed) fail(relative + ' contains elements after its SVG root');
      if (stack.length === 0) {
        if (rootSeen || name !== 'svg') fail(relative + ' must have exactly one SVG root');
        rootSeen = true;
      }
      if (!token.endsWith('/>')) stack.push(name);
    }
  }
  if (stack.length !== 0 || !rootSeen || !rootClosed || tags[0][1] !== 'svg') {
    fail(relative + ' contains unclosed or incorrectly nested SVG elements');
  }
}

function walkFiles(rootDir, currentDir) {
  const output = [];
  for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
    const fullPath = path.join(currentDir, entry.name);
    const relative = path.relative(rootDir, fullPath).split(path.sep).join('/');
    if (entry.isSymbolicLink()) fail('symbolic link is not allowed in generated output: ' + relative);
    if (entry.isDirectory()) output.push(...walkFiles(rootDir, fullPath));
    else if (entry.isFile()) output.push(relative);
    else fail('unsupported generated output entry: ' + relative);
  }
  return output;
}

function decodeHtmlCharacterReferences(value) {
  return value
    .replace(/&#(x[0-9a-f]+|[0-9]+);?/gi, (match, numeric) => {
      const codePoint = numeric[0].toLowerCase() === 'x'
        ? Number.parseInt(numeric.slice(1), 16)
        : Number.parseInt(numeric, 10);
      if (!Number.isInteger(codePoint) || codePoint <= 0 || codePoint > 0x10ffff ||
          (codePoint >= 0xd800 && codePoint <= 0xdfff)) return '\uFFFD';
      return String.fromCodePoint(codePoint);
    })
    .replace(/&colon;?/gi, ':')
    .replace(/&sol;?/gi, '/')
    .replace(/&Tab;/gi, '\t')
    .replace(/&NewLine;/gi, '\n');
}

function stripApprovedMetadataUrls(html) {
  return html.replace(/<(?:link|meta)\b[^>]*>/gi, tag => {
    const canonical = /<link\b/i.test(tag) && /\brel\s*=\s*(["'])canonical\1/i.test(tag);
    const openGraph = /<meta\b/i.test(tag) && /\bproperty\s*=\s*(["'])og:(?:url|image)\1/i.test(tag);
    const twitter = /<meta\b/i.test(tag) && /\bname\s*=\s*(["'])twitter:image\1/i.test(tag);
    if (!canonical && !openGraph && !twitter) return tag;
    return tag.replace(/https:\/\/brightdesk-help\.pages\.dev(?=\/)/gi, '');
  });
}

function getNormalizedUrlAttributes(html) {
  const values = [];
  const pattern = /\b(href|src|srcset|poster|data|action|formaction|background|xlink:href)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;
  for (const match of html.matchAll(pattern)) {
    values.push({
      name: match[1].toLowerCase(),
      value: match[2] ?? match[3] ?? match[4] ?? ''
    });
  }
  return values;
}

function urlCandidates(attribute) {
  return attribute.name === 'srcset'
    ? attribute.value.split(',').map(candidate => candidate.trim().split(/\s+/, 1)[0] ?? '')
    : [attribute.value];
}

function normalizeUrl(value) {
  return value.replace(/[\u0000-\u0020\u007f]+/g, '').trim();
}

function containsExecutableUrl(attribute) {
  return urlCandidates(attribute).some(candidate =>
    /^(?:javascript|data|vbscript):/i.test(normalizeUrl(candidate))
  );
}

function containsUnsafeUrl(attribute) {
  return urlCandidates(attribute).some(candidate =>
    /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(normalizeUrl(candidate))
  );
}

export function checkPublicSite({ siteRoot = DEFAULT_SITE_ROOT } = {}) {
  const rootDir = path.resolve(siteRoot);
  let rootMetadata;
  try {
    rootMetadata = fs.lstatSync(rootDir);
  } catch {
    fail('site output directory does not exist: ' + rootDir);
  }
  if (rootMetadata.isSymbolicLink()) {
    fail('site output root must not be a symbolic link: ' + rootDir);
  }
  if (!rootMetadata.isDirectory()) {
    fail('site output path must be a real directory: ' + rootDir);
  }
  const files = walkFiles(rootDir, rootDir);
  const fileSet = new Set(files);
  for (const required of REQUIRED_FILES) {
    if (!fileSet.has(required)) fail('required customer page or asset is missing: ' + required);
  }
  for (const file of files) {
    // Give security-specific failures precedence over the general allowlist so
    // tests and CI identify the actual boundary being protected.
    if (FORBIDDEN_PATHS.some(pattern => pattern.test(file))) {
      fail('internal or repository-only content was included: ' + file);
    }
    if (!/\.(html|css|js|svg)$/i.test(file) && file !== '_headers') {
      fail('unexpected public output file type: ' + file);
    }
    if (!ALLOWED_FILES.has(file)) {
      fail('file is outside the approved customer-help allowlist: ' + file);
    }
  }

  const htmlFiles = files.filter(file => file.endsWith('.html'));
  for (const file of htmlFiles) {
    const html = decodeHtmlCharacterReferences(fs.readFileSync(path.join(rootDir, file), 'utf8'));
    const safetyHtml = stripApprovedMetadataUrls(html);
    if (!/<!doctype html>/i.test(html)) fail(file + ' is missing an HTML doctype');
    if (/<(?:form|textarea|select|button|iframe|object|embed)\b/i.test(html) || /\bcontenteditable(?:\s|=|>)/i.test(html)) {
      fail(file + ' contains interactive or editable controls; customer help must remain read-only');
    }
    const urlAttributes = getNormalizedUrlAttributes(safetyHtml);
    if (/\son[a-z][a-z0-9_-]*\s*=/i.test(safetyHtml) ||
        urlAttributes.some(containsExecutableUrl)) {
      fail(file + ' contains an active HTML event handler or executable URL');
    }
    if (/<style\b/i.test(html) || /\sstyle\s*=/i.test(html)) {
      fail(file + ' contains inline CSS; customer styling must use the approved local stylesheet');
    }
    if (/<meta\b[^>]*\bhttp-equiv\s*=\s*["']?refresh\b/i.test(html)) {
      fail(file + ' contains automatic navigation through a meta refresh');
    }
    if (/(?:https?:)?\/\//i.test(safetyHtml) || urlAttributes.some(containsUnsafeUrl)) {
      fail(file + ' contains an external URL; public help pages must not load third-party resources or expose private repositories');
    }
    if (/github\.com\/conz20/i.test(html)) fail(file + ' contains a link to the private Brightdesk GitHub account');

    const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map(match => match[0]);
    const productPage = file.match(/^products\/([a-z-]+)\.html$/);
    if (imageTags.some(imageTag => !/\balt=["'][^"']+["']/i.test(imageTag))) {
      fail(file + ' does not provide the required meaningful alternative text for each image');
    }
    if (!productPage && imageTags.some(imageTag => {
      const source = imageTag.match(/\bsrc\s*=\s*(["'])(.*?)\1/i)?.[2] || '';
      return !/(?:\.\.\/)*assets\/images\/product-icons\/[a-z-]+\.svg$/i.test(source);
    })) {
      fail(file + ' contains an image outside the approved local product-icon library');
    }
    if (productPage) {
      const product = productPage[1];
      if (!PRODUCTS.includes(product) || imageTags.length !== 2) {
        fail(file + ' must contain exactly one product icon and one workflow diagram');
      }

      const expectedImages = [
        {
          source: '../assets/images/product-icons/' + product + '.svg',
          alternative: 'Brightdesk ' + PRODUCT_LABELS.get(product) + ' product icon',
          className: 'product-guide-icon'
        },
        {
          source: '../assets/images/workflows/guide-' + product + '.svg',
          alternative: WORKFLOW_ALT_TEXT.get(product),
          className: 'product-workflow-diagram'
        }
      ];

      imageTags.forEach((imageTag, index) => {
        const expected = expectedImages[index];
        const source = imageTag.match(/\bsrc\s*=\s*(["'])(.*?)\1/i)?.[2];
        const alternative = imageTag.match(/\balt\s*=\s*(["'])(.*?)\1/i)?.[2];
        const className = imageTag.match(/\bclass\s*=\s*(["'])(.*?)\1/i)?.[2];
        if (source !== expected.source) {
          fail(file + ' must use its approved local image: ' + expected.source);
        }
        if (alternative !== expected.alternative) {
          fail(file + ' must provide the required meaningful alternative text');
        }
        if (className !== expected.className) {
          fail(file + ' must use the approved image presentation class: ' + expected.className);
        }
      });
    }

    const scriptTags = [...html.matchAll(/<script\b[^>]*>[\s\S]*?<\/script>/gi)].map(match => match[0]);
    if (scriptTags.length !== 1 ||
        !/^<script\b(?=[^>]*\bsrc=["']\/assets\/js\/search\.js["'])(?=[^>]*\btype=["']module["'])[^>]*>\s*<\/script>$/i.test(scriptTags[0]) ||
        /<script\b/i.test(html.replace(scriptTags[0] || '', ''))) {
      fail(file + ' contains JavaScript other than the approved local Help search script');
    }
  }

  for (const file of files.filter(item => item.endsWith('.svg'))) {
    validateApprovedSvg(file, fs.readFileSync(path.join(rootDir, file), 'utf8'));
  }

  const searchScript = fs.readFileSync(path.join(rootDir, 'assets/js/search.js'), 'utf8');
  if (/(?:https?:)?\/\/|\b(?:fetch|XMLHttpRequest|WebSocket|EventSource|sendBeacon|localStorage|sessionStorage|eval|importScripts)\b|document\.cookie|new Function|new Worker/i.test(searchScript)) {
    fail('the local Help search script must not use network access, executable code generation or visitor storage');
  }

  const headers = fs.readFileSync(path.join(rootDir, '_headers'), 'utf8');
  const requiredHeaders = [
    'X-Content-Type-Options: nosniff',
    'Referrer-Policy: strict-origin-when-cross-origin',
    'X-Frame-Options: DENY',
    'Permissions-Policy: camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security: max-age=31536000',
    "Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; upgrade-insecure-requests"
  ];
  if (!headers.startsWith('/*') || !requiredHeaders.every(header => headers.includes(header))) {
    fail('Cloudflare response headers must enforce the approved privacy and browser security policy');
  }

  const css = fs.readFileSync(path.join(rootDir, 'assets/css/site.css'), 'utf8');
  if (/\\/.test(css)) fail('site CSS contains a CSS escape that could hide an external resource');
  if (/@import\b/i.test(css) || /(?:https?:)?\/\//i.test(css) || /url\s*\(/i.test(css)) fail('site CSS loads external resources');
  for (const file of htmlFiles) {
    const html = decodeHtmlCharacterReferences(fs.readFileSync(path.join(rootDir, file), 'utf8'));
    const searchInputs = [...html.matchAll(/<input\b[^>]*>/gi)].map(match => match[0]);
    if (searchInputs.length !== 1 ||
        !/^<input\b(?=[^>]*\bid=["']help-search["'])(?=[^>]*\btype=["']search["'])[^>]*>$/i.test(searchInputs[0])) {
      fail(file + ' must contain only the approved read-only Help search field');
    }
  }

  return { files: files.length, htmlPages: htmlFiles.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const siteRoot = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_SITE_ROOT;
    const result = checkPublicSite({ siteRoot });
    console.log('Public Wiki check passed: ' + result.htmlPages + ' Everyday Help and technical pages and ' + result.files +
      ' static files; no private repository links, internal docs or external resources.');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
