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

The owner has authorised publishing the customer Help website through **Cloudflare Pages Free** and selected **https://help.brightdesk.com** as the intended customer-facing address. The source repository conz20/Brightdesk-Wiki remains private.

- Use Cloudflare's GitHub integration for this repository only.
- Configure the GitHub App for **Only select repositories**, with conz20/Brightdesk-Wiki as the sole selected repository.
- Production branch: main.
- Preview branch deployments: **None**. Pull-request and working-branch previews must not be published.
- Cloudflare build command: npm run build:cloudflare.
- Build output directory: _site.
- Node.js 24.22.2 and Ruby 3.4.4 are pinned in the repository's .node-version and .ruby-version files.
- The build runs tests, Markdown-link checks, Jekyll generation and the exact customer-output allowlist audit before Cloudflare publishes the build.
- No Cloudflare API token, paid plan, trial, domain purchase or upgrade is authorised.
- The generated `*.pages.dev` hostname is a technical Pages origin only. It must not be advertised or used as the customer-facing Help address.

The owner has confirmed that they own `brightdesk.com`. Public DNS checks on 13 November 2026 show that the domain is delegated to Sedo parking nameservers. A fresh DNS lookup on 13 November 2026 shows the root domain, `www` and `help` all resolving to `64.190.63.111`. The visible MX record is priority 0 `localhost`, TXT includes `v=spf1 -all`, and the SOA identifies `hostmaster.sedo.de`. This is a public DNS snapshot, not a full zone export. The registrar and authoritative DNS control panel have not yet been identified.

Do not buy or transfer the domain. Public DNS does not reveal whether the owner's Sedo account supports custom DNS records. Check its DNS controls first; if it supports a CNAME, keep the current nameservers and add the Pages record there. Only if it does not support the required record should you identify the registrar, export the complete current zone, recreate and verify all records with a new DNS provider, and obtain approval before changing nameservers. Cloudflare Pages requires `help.brightdesk.com` to be registered under the Pages project's **Custom domains** settings before its `help` CNAME is created.

The target customer URL is **https://help.brightdesk.com**. The site is **not yet published**. Do not publish the in-app Help links until the exact `.com` URL and deployed commit have been verified.

Cloudflare's GitHub App must not be granted access to any other Brightdesk repository. Customers can read only the published static help pages; they do not receive GitHub or source-repository access. The private source continues to contain owner-only maintainer material.

The earlier GitHub Pages setup investigation is retained as historical documentation in [the superseded GitHub Pages notes](docs/development/github-pages.md). The active setup is [Cloudflare Pages Free](docs/development/cloudflare-pages.md).

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

A source test pass is not the same as a real production deployment. GitHub Actions runs the private-repository quality checks on pull requests and main. Cloudflare Pages runs the complete build:cloudflare command for production, including the generated-output audit, before publishing main.

## Documentation rules

Keep customer instructions short, literal and product-specific. Do not invent interface labels or claim that an untested workflow works. Use guide labels to distinguish verified, source-confirmed, planned, under-test and unavailable features. Never publish private Brightdesk-AI prompts, credentials, internal logs, customer documents or private build artefacts.
