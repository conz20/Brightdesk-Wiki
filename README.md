# Brightdesk Wiki

The private Markdown source repository for the separate online Brightdesk customer-help website.

> **Status:** Customer-help content and a Jekyll site scaffold are under review on the open draft pull request. The account plan has not been confirmed and no public website has been configured or deployed.

## Customer help

- [Customer start page](docs/customer-start-here.md) — choose the right product and understand guide status.
- [Customer help index](docs/index.md)
- [Ten product guide entries](docs/products/)

The customer website is separate from Brightdesk Suite and all ten desktop products. It will not be installed, bundled, shown in the App Centre or required for offline use.

## GitHub Pages plan gate

The approved direction is GitHub Pages only. The source repository must remain private. GitHub Pages can publish from a private repository on GitHub Pro or an eligible higher plan; the generated website is public on the internet. GitHub Free requires a public repository for Pages.

The current account plan has not been confirmed through an account billing/plan view. Do not change repository visibility, create a public replacement, buy or activate a paid plan, or configure/deploy Pages until the existing plan has been checked. The maintainer instructions are in [GitHub Pages setup](docs/development/github-pages.md). The approved macOS runner recovery procedure is in [private runner setup](docs/development/runner-recovery.md).

## Draft website build

- Jekyll: `4.4.1` (build-time dependency only).
- Ruby: `3.4.4` (pinned in `.ruby-version`).
- Source directory: `docs/`.
- Generated output: `_site/`.
- Intended customer pages: help homepage, customer start page and exactly ten approved product guides, plus local CSS.

Architecture, development, security and release/maintainer documents must remain outside the generated public website. The public-output audit rejects internal files, private GitHub links, scripts, forms, editable controls, event handlers, executable URLs and external resources. A synthetic test pass is not a real generated-site privacy review.

## Local checks

The repository uses Node.js `24.22.2` for documentation validation:

~~~sh
npm ci --no-audit --no-fund
npm run check:node
npm run check
npm test
npm run links
bundle install
bundle exec jekyll build
npm run check:site
~~~

A passing source test or a skipped Jekyll build does not mean the real website has been built or deployed. Production publication requires the existing private account plan to support Pages, exact-head checks, review, owner authorisation and a verified deployed URL.

## Documentation rules

Keep customer instructions short, literal and product-specific. Do not invent interface labels or claim that an untested workflow works. Use guide labels to distinguish verified, source-confirmed, planned, under-test and unavailable features. Never publish private Brightdesk-AI prompts, credentials, internal logs, customer documents or private build artefacts.
