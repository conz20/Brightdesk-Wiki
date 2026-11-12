#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_SITE_ROOT = path.resolve(SCRIPT_DIR, '..', '_site');
const PRODUCTS = ['pages','sheets','decks','notes','database','forms','lists','planner','to-do','workspace'];
const REQUIRED_FILES = ['index.html','customer-start-here.html','assets/css/site.css']
  .concat(PRODUCTS.map(product => 'products/' + product + '.html'));
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

export function checkPublicSite({ siteRoot = DEFAULT_SITE_ROOT } = {}) {
  const rootDir = path.resolve(siteRoot);
  if (!fs.existsSync(rootDir) || !fs.statSync(rootDir).isDirectory()) {
    fail('site output directory does not exist: ' + rootDir);
  }
  const files = walkFiles(rootDir, rootDir);
  const fileSet = new Set(files);
  for (const required of REQUIRED_FILES) {
    if (!fileSet.has(required)) fail('required customer page or asset is missing: ' + required);
  }
  for (const file of files) {
    if (FORBIDDEN_PATHS.some(pattern => pattern.test(file))) {
      fail('internal or repository-only content was included: ' + file);
    }
    if (!/\.(html|css)$/i.test(file)) fail('unexpected public output file type: ' + file);
  }

  const htmlFiles = files.filter(file => file.endsWith('.html'));
  for (const file of htmlFiles) {
    const html = fs.readFileSync(path.join(rootDir, file), 'utf8');
    if (!/<!doctype html>/i.test(html)) fail(file + ' is missing an HTML doctype');
    if (/<script\b/i.test(html)) fail(file + ' contains JavaScript; the customer Wiki must remain static and tracker-free');
    if (/https?:\/\//i.test(html)) {
      fail(file + ' contains an external URL; public help pages must not load third-party resources or expose private repositories');
    }
    if (/github\.com\/conz20/i.test(html)) fail(file + ' contains a link to the private Brightdesk GitHub account');
  }

  const css = fs.readFileSync(path.join(rootDir, 'assets/css/site.css'), 'utf8');
  if (/https?:\/\//i.test(css) || /url\s*\(/i.test(css)) fail('site CSS loads external resources');
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
