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
  const rule = css.match(/a:focus-visible\s*\{([^}]*)\}/i);
  assert.ok(rule, 'The stylesheet must provide a visible keyboard focus rule for links');
  const outline = rule[1].match(/outline:\s*(\d+)px\s+solid\s+(#[0-9a-f]{6})/i);
  assert.ok(outline, 'The focus rule must use a solid, explicit-colour outline');
  assert.ok(Number(outline[1]) >= 2, 'The focus outline must be at least 2 CSS pixels wide');

  for (const surface of ['#ffffff', '#f4f7fb']) {
    assert.ok(
      contrastRatio(outline[2], surface) >= 3,
      `Focus outline ${outline[2]} must have at least 3:1 contrast against ${surface}`
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

test('workflow diagrams stay readable and keyboard-scrollable on narrow screens', () => {
  const viewportStart = css.indexOf('.workflow-diagram-scroll {');
  const viewportEnd = css.indexOf('}', viewportStart);
  assert.ok(viewportStart >= 0 && viewportEnd > viewportStart, 'Workflow diagrams need a dedicated horizontal scroll region');
  const viewport = css.slice(viewportStart, viewportEnd);
  assert.ok(viewport.includes('max-width: 100%'));
  assert.ok(viewport.includes('overflow-x: auto'));

  const diagramStart = css.indexOf('.product-workflow-diagram {');
  const diagramEnd = css.indexOf('}', diagramStart);
  assert.ok(diagramStart >= 0 && diagramEnd > diagramStart, 'Workflow diagram image styling must be defined');
  const diagram = css.slice(diagramStart, diagramEnd);
  assert.ok(diagram.includes('min-width: 720px'));
  assert.ok(diagram.includes('height: auto'));

  const focusStart = css.indexOf('.workflow-diagram-scroll:focus-visible {');
  const focusEnd = css.indexOf('}', focusStart);
  assert.ok(focusStart >= 0 && focusEnd > focusStart, 'The scrollable diagram must have a visible keyboard focus state');
  assert.ok(css.slice(focusStart, focusEnd).includes('outline: 3px solid'));
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

const technicalLayout = fs.readFileSync(new URL('../docs/_layouts/technical.html', import.meta.url), 'utf8');

test('technical reference layout provides the same keyboard and screen-reader essentials', () => {
  assert.match(technicalLayout, /<html lang="en-AU">/);
  assert.ok(technicalLayout.includes('<a class="skip-link" href="#main">Skip to content</a>'));
  assert.match(technicalLayout, /<nav class="site-nav" aria-label="Main navigation">/);
  assert.match(technicalLayout, /<main id="main" class="technical-layout">/);
  assert.match(technicalLayout, /<aside class="technical-sidebar" aria-label="Technical documentation sections">/);
  assert.match(technicalLayout, /<nav aria-label="Technical reference navigation">/);
  assert.match(technicalLayout, /<section class="help-search" role="search" aria-labelledby="help-search-label">/);
  assert.match(technicalLayout, /aria-controls="help-search-results"/);
  assert.match(technicalLayout, /role="status" aria-live="polite"/);
  assert.match(technicalLayout, /aria-label="Matching technical references"/);
});
