#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_SITE_ROOT = path.resolve(SCRIPT_DIR, '..', '_site');
const PRODUCTS = ['pages','sheets','decks','notes','database','forms','lists','planner','to-do','workspace'];
const PRODUCT_LABELS = new Map([
  ['pages', 'Pages'], ['sheets', 'Sheets'], ['decks', 'Decks'], ['notes', 'Notes'],
  ['database', 'Database'], ['forms', 'Forms'], ['lists', 'Lists'], ['planner', 'Planner'],
  ['to-do', 'To Do'], ['workspace', 'Workspace']
]);
const PRODUCT_ICON_FILES = PRODUCTS.map(product => 'assets/images/product-icons/' + product + '.svg');
const REQUIRED_FILES = ['index.html','customer-start-here.html','assets/css/site.css']
  .concat(PRODUCTS.map(product => 'products/' + product + '.html'))
  .concat(PRODUCT_ICON_FILES);
const ALLOWED_FILES = new Set(REQUIRED_FILES);
const SVG_ELEMENTS = new Set(['svg', 'title', 'desc', 'rect', 'path', 'ellipse', 'circle']);
const SVG_ATTRIBUTES = new Set([
  'xmlns', 'width', 'height', 'viewBox', 'role', 'aria-labelledby', 'id',
  'x', 'y', 'rx', 'ry', 'cx', 'cy', 'r', 'd', 'fill', 'stroke',
  'stroke-width', 'stroke-linecap', 'stroke-linejoin'
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

function validateProductIcon(file, svg) {
  const relative = file.split(path.sep).join('/');
  if (!PRODUCT_ICON_FILES.includes(relative)) {
    fail('SVG is outside the approved product icon library: ' + relative);
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
  const tags = [...svg.matchAll(/<\/?([a-z][a-z0-9:-]*)\b[^>]*>/gi)];
  if (tags.length === 0) fail(relative + ' contains no SVG elements');
  for (const match of tags) {
    const token = match[0];
    const name = match[1];
    if (!SVG_ELEMENTS.has(name)) fail(relative + ' contains a disallowed SVG element: ' + name);
    const attributeText = token.replace(/^<\/?[a-z][a-z0-9:-]*/i, '').replace(/\/?>$/, '');
    const attributeMatches = [...attributeText.matchAll(/\s+([a-zA-Z_:][a-zA-Z0-9:_.-]*)\s*=\s*(?:"[^"]*"|'[^']*')/g)];
    const parsedAttributeText = attributeMatches.map(item => item[0]).join('');
    if (parsedAttributeText.trim() !== attributeText.trim()) {
      fail(relative + ' contains malformed or unsupported SVG attributes');
    }
    for (const attribute of attributeMatches) {
      if (!SVG_ATTRIBUTES.has(attribute[1])) {
        fail(relative + ' contains a disallowed SVG attribute: ' + attribute[1]);
      }
    }
    if (token.startsWith('</')) {
      if (stack.pop() !== name) fail(relative + ' contains incorrectly nested SVG elements');
    } else if (!token.endsWith('/>')) {
      stack.push(name);
    }
  }
  if (stack.length !== 0 || tags[0][1] !== 'svg' || !tags[tags.length - 1][0].startsWith('</svg>')) {
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
    if (!/\.(html|css|svg)$/i.test(file)) {
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
    if (/<(?:form|input|textarea|select|button|iframe|object|embed)\b/i.test(html) || /\bcontenteditable(?:\s|=|>)/i.test(html)) {
      fail(file + ' contains interactive or editable controls; customer help must remain read-only');
    }
    const urlAttributes = getNormalizedUrlAttributes(html);
    if (/\son[a-z][a-z0-9_-]*\s*=/i.test(html) ||
        urlAttributes.some(containsExecutableUrl)) {
      fail(file + ' contains an active HTML event handler or executable URL');
    }
    if (/<script\b/i.test(html)) fail(file + ' contains JavaScript; the customer Wiki must remain static and tracker-free');
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

    const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map(match => match[0]);
    const productPage = file.match(/^products\/([a-z-]+)\.html$/);
    if (!productPage && imageTags.length !== 0) {
      fail(file + ' contains an image outside the approved product-guide icon placement');
    }
    if (productPage) {
      const product = productPage[1];
      if (!PRODUCTS.includes(product) || imageTags.length !== 1) {
        fail(file + ' must contain exactly one approved product icon');
      }
      const imageTag = imageTags[0];
      const source = imageTag.match(/\bsrc\s*=\s*(["'])(.*?)\1/i)?.[2];
      const alternative = imageTag.match(/\balt\s*=\s*(["'])(.*?)\1/i)?.[2];
      const expectedSource = '../assets/images/product-icons/' + product + '.svg';
      const expectedAlternative = 'Brightdesk ' + PRODUCT_LABELS.get(product) + ' product icon';
      if (source !== expectedSource) {
        fail(file + ' must use its own approved local product icon: ' + expectedSource);
      }
      if (alternative !== expectedAlternative) {
        fail(file + ' must provide meaningful alternative text for its product icon');
      }
    }
  }

  for (const file of files.filter(item => item.endsWith('.svg'))) {
    validateProductIcon(file, fs.readFileSync(path.join(rootDir, file), 'utf8'));
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
    console.log('Public Wiki check passed: ' + result.htmlPages + ' customer pages and ' + result.files +
      ' static files; no private repository links, internal docs, scripts or external assets.');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
