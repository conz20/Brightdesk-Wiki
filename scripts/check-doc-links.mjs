#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = path.resolve(SCRIPT_DIR, '..');
const EXCLUDED_DIRECTORIES = new Set(['.git', 'node_modules', 'dist', 'coverage']);
const REMOTE_SCHEME = /^[a-z][a-z0-9+.-]*:/i;

function fail(message) {
  throw new Error(`Wiki link check: ${message}`);
}

function walkMarkdown(rootDir, currentDir = rootDir) {
  const entries = fs.readdirSync(currentDir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name);
    if (entry.isSymbolicLink()) fail(`symbolic link is not allowed in documentation tree: ${path.relative(rootDir, fullPath)}`);
    if (entry.isDirectory()) {
      if (EXCLUDED_DIRECTORIES.has(entry.name)) continue;
      files.push(...walkMarkdown(rootDir, fullPath));
    } else if (entry.isFile() && /\.mdx?$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

function extractInlineLinks(markdown) {
  const links = [];
  const pattern = /!?\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)]+))(?:\s+[^)]*)?\s*\)/g;
  for (const match of markdown.matchAll(pattern)) {
    const target = (match[1] ?? match[2] ?? '').trim();
    if (target) links.push(target);
  }
  return links;
}

function resolveLocalTarget({ rootDir, sourceFile, rawTarget }) {
  if (rawTarget.startsWith('#') || rawTarget.startsWith('//') || REMOTE_SCHEME.test(rawTarget)) return null;
  let decoded;
  try { decoded = decodeURIComponent(rawTarget); }
  catch { fail(`${path.relative(rootDir, sourceFile)} contains an invalid encoded link: ${rawTarget}`); }
  const withoutSuffix = decoded.split(/[?#]/, 1)[0];
  if (!withoutSuffix) return null;
  if (withoutSuffix.includes('\\\\')) fail(`${path.relative(rootDir, sourceFile)} contains a backslash path: ${rawTarget}`);
  const candidate = path.isAbsolute(withoutSuffix)
    ? path.resolve(rootDir, `.${withoutSuffix}`)
    : path.resolve(path.dirname(sourceFile), withoutSuffix);
  const relative = path.relative(rootDir, candidate);
  if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    fail(`${path.relative(rootDir, sourceFile)} link escapes the repository root: ${rawTarget}`);
  }
  return candidate;
}

function verifyTarget({ rootDir, sourceFile, rawTarget }) {
  const candidate = resolveLocalTarget({ rootDir, sourceFile, rawTarget });
  if (!candidate) return false;
  let stat;
  try { stat = fs.lstatSync(candidate); }
  catch { fail(`${path.relative(rootDir, sourceFile)} links to missing target: ${rawTarget}`); }
  if (stat.isSymbolicLink()) fail(`${path.relative(rootDir, sourceFile)} links to a symbolic link: ${rawTarget}`);
  if (!stat.isFile() && !stat.isDirectory()) fail(`${path.relative(rootDir, sourceFile)} links to an unsupported target: ${rawTarget}`);
  const realRoot = fs.realpathSync(rootDir);
  const realTarget = fs.realpathSync(candidate);
  const realRelative = path.relative(realRoot, realTarget);
  if (realRelative === '..' || realRelative.startsWith(`..${path.sep}`) || path.isAbsolute(realRelative)) {
    fail(`${path.relative(rootDir, sourceFile)} link resolves outside the repository root: ${rawTarget}`);
  }
  return true;
}

export function checkMarkdownLinks({ rootDir = DEFAULT_ROOT } = {}) {
  const absoluteRoot = path.resolve(rootDir);
  if (!fs.existsSync(absoluteRoot) || !fs.statSync(absoluteRoot).isDirectory()) fail(`repository root does not exist: ${absoluteRoot}`);
  const markdownFiles = walkMarkdown(absoluteRoot);
  let localLinks = 0;
  for (const sourceFile of markdownFiles) {
    const markdown = fs.readFileSync(sourceFile, 'utf8');
    for (const rawTarget of extractInlineLinks(markdown)) {
      if (verifyTarget({ rootDir: absoluteRoot, sourceFile, rawTarget })) localLinks += 1;
    }
  }
  return { markdownFiles: markdownFiles.length, localLinks };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = checkMarkdownLinks();
    console.log(`Wiki link check passed: ${result.markdownFiles} Markdown files, ${result.localLinks} local file/directory links.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
