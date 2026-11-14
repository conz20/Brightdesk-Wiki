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
const REQUIRED_FILES = ['index.html','customer-start-here.html','assets/css/site.css','assets/js/search.js']
  .concat(PRODUCTS.map(product => 'products/' + product + '.html'))
  .concat(TECHNICAL_PAGES);
const ALLOWED_FILES = new Set(REQUIRED_FILES);
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
    if (!/\.(html|css|js)$/i.test(file)) {
      fail('unexpected public output file type: ' + file);
    }
    if (!ALLOWED_FILES.has(file)) {
      fail('file is outside the approved customer-help allowlist: ' + file);
    }
  }

  const htmlFiles = files.filter(file => file.endsWith('.html'));
  for (const file of htmlFiles) {
    const html = decodeHtmlCharacterReferences(fs.readFileSync(path.join(rootDir, file), 'utf8'));
    if (!/<!doctype html>/i.test(html)) fail(file + ' is missing an HTML doctype');
    if (/<(?:form|textarea|select|button|iframe|object|embed)\b/i.test(html) || /\bcontenteditable(?:\s|=|>)/i.test(html)) {
      fail(file + ' contains interactive or editable controls; customer help must remain read-only');
    }
    const urlAttributes = getNormalizedUrlAttributes(html);
    if (/\son[a-z][a-z0-9_-]*\s*=/i.test(html) ||
        urlAttributes.some(containsExecutableUrl)) {
      fail(file + ' contains an active HTML event handler or executable URL');
    }

    if (/<style\b/i.test(html) || /\sstyle\s*=/i.test(html)) {
      fail(file + ' contains inline CSS; customer styling must use the approved local stylesheet');
    }
    if (/<meta\b[^>]*\bhttp-equiv\s*=\s*["']?refresh\b/i.test(html)) {
      fail(file + ' contains automatic navigation through a meta refresh');
    }
    if (/(?:https?:)?\/\//i.test(html) || urlAttributes.some(containsUnsafeUrl)) {
      fail(file + ' contains an external URL; public help pages must not load third-party resources or expose private repositories');
    }
    if (/github\.com\/conz20/i.test(html)) fail(file + ' contains a link to the private Brightdesk GitHub account');
    const searchInputs = [...html.matchAll(/<input\b[^>]*>/gi)].map(match => match[0]);
    if (searchInputs.length !== 1 ||
        !/^<input\b(?=[^>]*\bid=["']help-search["'])(?=[^>]*\btype=["']search["'])[^>]*>$/i.test(searchInputs[0])) {
      fail(file + ' must contain only the accessible Brightdesk Help search field');
    }
    const scriptTags = [...html.matchAll(/<script\b[^>]*>[\s\S]*?<\/script>/gi)].map(match => match[0]);
    if (scriptTags.length !== 1 ||
        !/^<script\b(?=[^>]*\bsrc=["']\/assets\/js\/search\.js["'])(?=[^>]*\btype=["']module["'])[^>]*>\s*<\/script>$/i.test(scriptTags[0]) ||
        /<script\b/i.test(html.replace(scriptTags[0], ''))) {
      fail(file + ' must load only the approved local search script');
    }
  }

  const searchScript = fs.readFileSync(path.join(rootDir, 'assets/js/search.js'), 'utf8');
  if (/(?:https?:)?\/\/|\b(?:fetch|XMLHttpRequest|WebSocket|EventSource|sendBeacon|localStorage|sessionStorage|eval|importScripts)\b|document\.cookie|new Function|new Worker/i.test(searchScript)) {
    fail('the local search script must not use network access, executable code generation or visitor storage');
  }
  const css = fs.readFileSync(path.join(rootDir, 'assets/css/site.css'), 'utf8');
  if (/\\/.test(css)) fail('site CSS contains a CSS escape that could hide an external resource');
  if (/@import\b/i.test(css) || /(?:https?:)?\/\//i.test(css) || /url\s*\(/i.test(css)) fail('site CSS loads external resources');
  return { files: files.length, htmlPages: htmlFiles.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const siteRoot = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_SITE_ROOT;
    const result = checkPublicSite({ siteRoot });
    console.log('Public Wiki check passed: ' + result.htmlPages + ' approved Help and technical pages and ' + result.files +
      ' static files; no private repository links, internal docs, external scripts or external assets.');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
