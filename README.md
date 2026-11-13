# Brightdesk Wiki

The private Markdown source repository for the separate Brightdesk customer-help website.

## The permanent free customer promise

**Brightdesk is free forever.** Brightdesk Suite, all ten approved Brightdesk products and the Brightdesk customer Wiki/help centre are free for every customer to use.

Customers will not be charged to:
- Download, install or use Brightdesk Suite.
- Use any of the ten approved products.
- Read the Brightdesk Wiki and its customer help guides.
- Follow the documented Suite and product workflows.

There are no subscriptions, paid product tiers, trials, licence fees, activation codes, customer accounts, sign-ins, passwords, paywalls or advertising. The Wiki is a free help resource, not a paid product or add-on. It does not require a customer account or a Brightdesk sign-in.

The ten products are exactly:

1. Pages
2. Sheets
3. Decks
4. Notes
5. Database
6. Forms
7. Lists
8. Planner
9. To Do
10. Workspace

Do not add other customer products to this list. Brightdesk-AI is separate engineering/tooling, not an additional customer product.

## Customer help

- [Customer start page](docs/customer-start-here.md) — choose the right product and understand guide status.
- [Customer help index](docs/index.md)
- [Ten product guide entries](docs/products/)

The Wiki is a separate, free-to-read customer help centre. It is not a product, desktop application, installer payload, App Centre item or requirement for offline use. Its customer pages are static and read-only.

## Public site and private source

The owner has authorised the public, read-only Help website at:

`https://conz20.github.io/Brightdesk-Wiki/`

The `conz20/Brightdesk-Wiki` source repository remains private. GitHub Pages publishes only the audited customer output; it does not make the source repository or maintainer documents public.

The owner confirmed the existing GitHub account has an eligible plan for publishing a public Pages site from a private source repository. No additional paid plan, purchase, trial, upgrade or hosting service is authorised or required. Customers never pay to use Brightdesk or read the Help website.

The production workflow publishes only from the reviewed `main` branch after the full quality checks and generated-output audit pass. Pull requests do not deploy previews. The workflow uses the existing private macOS ARM64 runner and immutable action revisions.

The maintainer instructions are in [GitHub Pages setup](docs/development/github-pages.md). The approved macOS runner recovery procedure is in [private runner setup](docs/development/runner-recovery.md).

## Website build and privacy gate

- Jekyll: `4.4.1` (build-time dependency only).
- Ruby: `3.4.4` (pinned in `.ruby-version`).
- Node.js: `24.22.2`.
- Source directory: `docs/`.
- Generated output: `_site/`.
- Intended customer pages: help homepage, Suite start page and exactly ten approved product guides, plus local CSS.

Architecture, development, security and release/maintainer documents must remain outside the generated public website. The public-output audit rejects internal files, private GitHub links, scripts, forms, editable controls, event handlers, executable URLs and external resources. Only a successful deployment run and verified public URL prove that the site is live.

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

A source test pass is not the same as a real production deployment. The production workflow repeats these checks on `main`, uploads the generated site only after the public-output audit, and deploys through the `github-pages` environment.

## Documentation rules

Keep customer instructions short, literal and product-specific. Do not invent interface labels or claim that an untested workflow works. Use guide labels to distinguish verified, source-confirmed, planned, under-test and unavailable features. Never publish private Brightdesk-AI prompts, credentials, internal logs, customer documents or private build artefacts.
