# Brightdesk Wiki

Brightdesk Wiki is the private source repository for a separate, read-only Brightdesk customer help centre. It is not an engineering wiki and is not part of Brightdesk Suite or any desktop product.

## Customer-facing scope

The intended help website contains only:

- A Brightdesk Help homepage.
- A Brightdesk Suite getting-started guide.
- One practical guide for each of the ten approved products: Pages, Sheets, Decks, Notes, Database, Forms, Lists, Planner, To Do and Workspace.
- Local CSS and the navigation needed to use those pages.

It must not become a general technical knowledge base. Architecture, development, release and security material is maintainer-only source content and must never appear in generated customer output.

The Wiki is not installed, bundled, included in the Suite App Centre or required to use Brightdesk offline.

## Current status

The `main` branch currently contains this repository scope document only. The separate draft customer-help implementation is in [PR #3](https://github.com/conz20/Brightdesk-Wiki/pull/3).

The ten product guides are still labelled **Needs review** until each workflow is walked through in a current installed desktop build. The Suite getting-started guide is **Source-confirmed**, not **Verified**. Genuine runtime screenshots have not yet been captured.

The current-head Wiki quality workflow has been queued but has not completed. A source test pass alone is not proof that the real Jekyll site builds or that generated output is safe.

## Privacy and read-only requirements

- Keep this source repository private. Do not create a public replacement repository or change repository visibility, permissions or settings.
- The future customer site must be static and read-only. No customer accounts, sign-ins, passwords, comments, uploads, forms, editing or administration controls.
- Do not include Brightdesk-AI prompts, credentials, customer files, internal reports, analytics, advertising, tracking, external scripts or third-party assets.
- Only the homepage, Suite start page, exactly ten product guides and local CSS are permitted in generated output.
- Keep private GitHub links and maintainer-only material out of the generated website.

## Publishing gate

No GitHub Pages website is confirmed configured or deployed. The account plan has not been verified.

A published Pages website is public on the internet even when its source repository is private. Do not change repository visibility, buy or trial a paid plan, configure Pages or deploy the site until the existing account plan and all required privacy checks have been verified and the owner has authorised publication.

If the current account plan does not support Pages from this private source repository, leave the site unpublished. Do not move it to another host.

## Build and verification

The draft site uses Jekyll 4.4.1 and Ruby 3.4.4 as build-time tooling. Node.js 24.22.2 is used for documentation checks.

The implementation branch documents these commands:

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

The public-output audit is intended to reject symlinks, unapproved files, internal content, scripts, forms, editable controls, executable URLs, private GitHub links and external resources. The exact current-head quality workflow must complete successfully, including a real Jekyll build and generated-output audit, before any claim of build readiness.

Do not mark product instructions Verified until they have been tested in the named product version and operating system.
