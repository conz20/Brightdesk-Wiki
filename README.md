# Brightdesk Wiki

The private Markdown source repository for the separate online Brightdesk customer-help website.

> **Status:** Customer-help content and a Jekyll site scaffold are under review on the open draft pull request. No production website has been deployed yet.

## Customer help

- [Customer start page](docs/customer-start-here.md) — choose the right product and understand guide status.
- [Customer help index](docs/index.md)
- [Ten product guide entries](docs/products/)

The public website will be separate from Brightdesk Suite and all ten desktop products. It will not be installed, bundled, shown in the App Centre or required for offline use.

## Website build

A possible publishing path is Cloudflare Pages Free with Jekyll, but this is only a proposal. **No public site or hosting provider has been approved, configured or connected.** Keep the GitHub repository private. Do not authorise a Cloudflare GitHub App, connect an account or deploy a preview until the owner explicitly approves the publishing plan.

- Jekyll: `4.4.1` (build-time dependency only).
- Ruby: `3.4.4` (pinned in `.ruby-version`).
- Cloudflare Pages build command: `bundle exec jekyll build`.
- Cloudflare Pages output directory: `_site`.
- Jekyll source directory: `docs/`.

Only the customer-help index, start page and ten product guide pages are intended for publication. Architecture, development, security and release documents remain private and are excluded from the generated site. The public-output check rejects internal files, private GitHub links, JavaScript and external resources.

## Local checks

The repository also uses Node.js `24.22.2` for its documentation validation scripts:

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

A successful local build or passing CI does not mean the production website has been deployed. Deployment requires a separately verified Cloudflare Pages project and public URL.

## Documentation rules

Keep customer instructions short, literal and product-specific. Do not invent interface labels or claim that an untested workflow works. Use the guide labels to distinguish verified workflows from source-confirmed, planned, under-test and unavailable features. Never publish private Brightdesk-AI prompts, credentials, internal logs, customer documents or private build artefacts.
