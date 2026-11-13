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

The Wiki is a separate, free-to-read customer help centre. It is not a product, desktop application, installer payload, App Centre item or requirement for offline use. Its customer pages are intended to be static and read-only.

## No-cost hosting and privacy boundary

The customer promise is that customers never pay to use Brightdesk or read its help centre. **No paid hosting plan, subscription, trial, upgrade or third-party hosting service may be purchased to fulfil that promise.**

The source repository `conz20/Brightdesk-Wiki` must remain private. A public website generated from it must not expose the source repository or internal documents.

GitHub Pages has plan restrictions for publishing from a private source repository. The account's existing no-cost eligibility has not been verified. Do not buy, trial or upgrade a plan; do not make this repository public; do not create a public replacement repository; and do not switch to another hosting provider. If the current no-cost GitHub arrangement cannot publish from this private repository, leave the customer website unpublished until an approved no-cost GitHub Pages route is available that preserves the private source.

**Current status:** The source repository is private. No public website has been configured or deployed, and no public customer URL is confirmed. Do not describe the Wiki as live until a permitted no-cost publishing path, exact build/output checks, owner review and deployed commit have all been verified.

The maintainer instructions are in [GitHub Pages setup](docs/development/github-pages.md). The approved macOS runner recovery procedure is in [private runner setup](docs/development/runner-recovery.md).

## Draft website build

- Jekyll: `4.4.1` (build-time dependency only).
- Ruby: `3.4.4` (pinned in `.ruby-version`).
- Source directory: `docs/`.
- Generated output: `_site/`.
- Intended customer pages: help homepage, Suite start page and exactly ten approved product guides, plus local CSS.

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

A passing source test or a skipped Jekyll build does not mean the real website has been built or deployed. Production publication requires a permitted no-cost GitHub Pages path for this private source, exact-head checks, review, owner authorisation and a verified deployed URL.

## Documentation rules

Keep customer instructions short, literal and product-specific. Do not invent interface labels or claim that an untested workflow works. Use guide labels to distinguish verified, source-confirmed, planned, under-test and unavailable features. Never publish private Brightdesk-AI prompts, credentials, internal logs, customer documents or private build artefacts.
