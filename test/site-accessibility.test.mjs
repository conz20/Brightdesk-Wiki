import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const css = fs.readFileSync(new URL('../docs/assets/css/site.css', import.meta.url), 'utf8');

function relativeLuminance(hex) {
  const match = /^#([0-9a-f]{6})$/i.exec(hex);
  assert.ok(match, `Expected a six-digit hex colour, received ${hex}`);
  const channels = match[1].match(/.{2}/g).map(value => parseInt(value, 16) / 255);
  const linear = channels.map(value =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(first, second) {
  const values = [relativeLuminance(first), relativeLuminance(second)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}



test('keyboard focus indicator is visible against both page and content surfaces', () => {
  const selectorStart = css.indexOf('a:focus-visible');
  assert.ok(selectorStart >= 0, 'The stylesheet must provide a visible keyboard focus rule for links');
  const ruleOpen = css.indexOf('{', selectorStart);
  const ruleClose = css.indexOf('}', ruleOpen);
  assert.ok(ruleOpen >= 0 && ruleClose > ruleOpen, 'The link focus rule must be complete');
  const declarations = css.slice(ruleOpen + 1, ruleClose);
  const outline = declarations.split(';').find(value => value.trim().startsWith('outline:'));
  assert.ok(outline, 'The focus rule must declare an outline');
  const compactOutline = outline.replaceAll(' ', '').replaceAll('\n', '').replaceAll('\t', '');
  assert.ok(compactOutline.includes('solidvar(--focus-ring)'), 'The focus rule must use the theme-aware focus colour');
  const width = Number(compactOutline.slice('outline:'.length).split('px')[0]);
  assert.ok(Number.isFinite(width) && width >= 2, 'The focus outline must be at least 2 CSS pixels wide');

  const rootStart = css.indexOf(':root {');
  const rootOpen = css.indexOf('{', rootStart);
  const rootClose = css.indexOf('}', rootOpen);
  assert.ok(rootStart >= 0 && rootClose > rootOpen, 'The stylesheet must define light-theme colour tokens');
  const root = css.slice(rootOpen + 1, rootClose);
  const token = name => {
    const line = root.split('\n').find(value => value.trim().startsWith('--' + name + ':'));
    assert.ok(line, 'Missing light-theme colour token --' + name);
    const value = line.slice(line.indexOf(':') + 1).trim();
    const colour = value.endsWith(';') ? value.slice(0, -1) : value;
    assert.ok(colour.length === 7 && colour.startsWith('#'), 'Colour token --' + name + ' must be a six-digit hex value');
    return colour;
  };
  const focus = token('focus-ring');
  for (const surface of [token('surface'), token('page')]) {
    assert.ok(
      contrastRatio(focus, surface) >= 3,
      'Focus outline ' + focus + ' must have at least 3:1 contrast against ' + surface
    );
  }
});

const layout = fs.readFileSync(new URL('../docs/_layouts/default.html', import.meta.url), 'utf8');

test('help layout exposes a named main navigation and skip link', () => {
  assert.match(layout, /<html lang="en-AU">/);
  assert.match(layout, /<a class="skip-link" href="#main">Skip to content<\/a>/);
  assert.match(layout, /<nav class="site-nav" aria-label="Main navigation">/);
  assert.match(layout, /<main id="main" class="main-content">/);
});

test('Everyday Help marks the current homepage, Suite and product navigation links', () => {
  const navigationStart = layout.indexOf('<nav class="site-nav"');
  const navigationEnd = layout.indexOf('</nav>', navigationStart);
  assert.ok(navigationStart >= 0 && navigationEnd > navigationStart, 'Everyday Help navigation must be present');
  const navigation = layout.slice(navigationStart, navigationEnd);

  const routes = [
    '/index.html',
    '/everyday/index.html',
    '/customer-start-here.html',
    '/products/pages.html',
    '/products/sheets.html',
    '/products/decks.html',
    '/products/notes.html',
    '/products/database.html',
    '/products/forms.html',
    '/products/lists.html',
    '/products/planner.html',
    '/products/to-do.html',
    '/products/workspace.html'
  ];

  for (const route of routes) {
    const anchor = navigation.split(/\r?\n/).find(line =>
      line.includes(`href="{{ '${route}' | relative_url }}"`)
    );
    assert.ok(anchor, 'Navigation link must exist for ' + route);
    assert.ok(
      anchor.includes(`{% if page.url == '${route}' %} aria-current="page"{% endif %}`),
      'Navigation link must announce the current page for ' + route
    );
  }
});

const technicalLayout = fs.readFileSync(new URL('../docs/_layouts/technical.html', import.meta.url), 'utf8');

test('technical reference navigation is named and marks the current document', () => {
  const sidebarStart = technicalLayout.indexOf('<aside class="technical-sidebar"');
  const navStart = technicalLayout.indexOf('<nav', sidebarStart);
  const navEnd = technicalLayout.indexOf('</nav>', navStart);
  assert.ok(sidebarStart >= 0 && navStart > sidebarStart && navEnd > navStart, 'Technical sidebar navigation must be present');
  const navigation = technicalLayout.slice(navStart, navEnd);

  assert.match(navigation, /^<nav aria-label="Technical reference navigation">/);

  const routes = [
    '/technical/index.html',
    '/technical/system-overview.html',
    '/technical/file-formats.html',
    '/technical/data-and-privacy.html',
    '/technical/products/pages.html',
    '/technical/products/sheets.html',
    '/technical/products/decks.html',
    '/technical/products/notes.html',
    '/technical/products/database.html',
    '/technical/products/forms.html',
    '/technical/products/lists.html',
    '/technical/products/planner.html',
    '/technical/products/to-do.html',
    '/technical/products/workspace.html'
  ];

  for (const route of routes) {
    const anchor = navigation.split(/\r?\n/).find(line =>
      line.includes(`href="{{ '${route}' | relative_url }}"`)
    );
    assert.ok(anchor, 'Technical reference link must exist for ' + route);
    assert.ok(
      anchor.includes(`{% if page.url == '${route}' %} aria-current="page"{% endif %}`),
      'Technical reference link must announce the current document for ' + route
    );
  }
});

test('technical top navigation marks only its own overview page as current', () => {
  const technicalLayout = fs.readFileSync(new URL('../docs/_layouts/technical.html', import.meta.url), 'utf8');
  const navStart = technicalLayout.indexOf('<nav class="site-nav"');
  const navEnd = technicalLayout.indexOf('</nav>', navStart);
  assert.ok(navStart >= 0 && navEnd > navStart, 'Technical top navigation must be present');
  const navigation = technicalLayout.slice(navStart, navEnd);
  const technicalLink = navigation.split('\n').find(line =>
    line.includes(`href="{{ '/technical/index.html' | relative_url }}"`)
  );
  assert.ok(technicalLink, 'Technical overview link must be present in top navigation');
  assert.ok(
    technicalLink.includes(`{% if page.url == '/technical/index.html' %} aria-current="page"{% endif %}`),
    'Top navigation must mark only the Technical Documentation overview as the current page'
  );
});

test('help typography keeps comfortable reading size and spacing', () => {
  const body = css.match(/body\s*\{([^}]*)\}/i);
  assert.ok(body, 'The stylesheet must define body typography');
  assert.match(body[1], /font-size:\s*1\.0625rem/i);
  assert.match(body[1], /line-height:\s*1\.7/i);
});

test('reduced-motion and narrow-screen reading layouts remain supported', () => {
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/i);
  assert.match(css, /scroll-behavior:\s*auto/);
  assert.match(css, /@media\s*\(max-width:\s*600px\)/i);
  assert.match(css, /\.content-card\s*\{[^}]*border-radius:/is);
  assert.match(css, /\.content-card table\s*\{[^}]*overflow-x:\s*auto/is);
});

test('skip link becomes visible when keyboard-focused', () => {
  const rule = css.match(/\.skip-link:focus\s*\{([^}]*)\}/i);
  assert.ok(rule, 'The skip link must have a visible keyboard-focus state');
  assert.match(rule[1], /top:\s*1rem/i);
});

test('body, secondary and link text maintain readable contrast', () => {
  const root = css.match(/:root\s*\{([^}]*)\}/i);
  assert.ok(root, 'The stylesheet must define its colour tokens');
  const token = name => {
    const match = root[1].match(new RegExp('(?:^|\\s)--' + name + ':\\s*(#[0-9a-f]{6})', 'i'));
    assert.ok(match, 'Missing explicit colour token --' + name);
    return match[1];
  };
  const surfaces = [token('surface'), token('page')];
  const textColours = [token('ink'), token('muted'), token('brand-dark')];
  for (const textColour of textColours) {
    for (const surface of surfaces) {
      assert.ok(
        contrastRatio(textColour, surface) >= 4.5,
        'Text colour ' + textColour + ' must meet 4.5:1 contrast against ' + surface
      );
    }
  }
});

test('dark theme body, secondary and link text maintain readable contrast', () => {
  const darkRoot = css.match(/@media\s*\(prefers-color-scheme:\s*dark\)\s*\{\s*:root\s*\{([^}]*)\}/i);
  assert.ok(darkRoot, 'The stylesheet must define dark-theme colour tokens');
  const token = name => {
    const match = darkRoot[1].match(new RegExp('(?:^|\\s)--' + name + ':\\s*(#[0-9a-f]{6})', 'i'));
    assert.ok(match, 'Missing dark-theme colour token --' + name);
    return match[1];
  };
  const surfaces = [token('surface'), token('page')];
  const textColours = [token('ink'), token('muted'), token('brand-dark')];
  for (const textColour of textColours) {
    for (const surface of surfaces) {
      assert.ok(
        contrastRatio(textColour, surface) >= 4.5,
        'Dark-theme text colour ' + textColour + ' must meet 4.5:1 contrast against ' + surface
      );
    }
  }
});

test('dark theme keyboard focus ring remains visible on page and content surfaces', () => {
  const darkRoot = css.match(/@media\s*\(prefers-color-scheme:\s*dark\)\s*\{\s*:root\s*\{([^}]*)\}/i);
  assert.ok(darkRoot, 'The stylesheet must define dark-theme colour tokens');
  const token = name => {
    const match = darkRoot[1].match(new RegExp('(?:^|\\s)--' + name + ':\\s*(#[0-9a-f]{6})', 'i'));
    assert.ok(match, 'Missing dark-theme colour token --' + name);
    return match[1];
  };
  const focus = token('focus-ring');
  for (const surface of [token('surface'), token('page')]) {
    assert.ok(
      contrastRatio(focus, surface) >= 3,
      'Dark-theme focus ring ' + focus + ' must meet 3:1 contrast against ' + surface
    );
  }
});


test('the portal directory uses a wide responsive layout for product discovery', () => {
  assert.match(css, /\.main-content:has\(\.portal-hero\)\s*\{[^}]*1240px/is);
  assert.match(css, /\.product-card-grid\s*\{[^}]*grid-template-columns/is);
  assert.match(css, /@media\s*\(max-width:\s*680px\)/i);
});
