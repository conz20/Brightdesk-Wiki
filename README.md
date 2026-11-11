# Brightdesk Wiki

The Markdown-first technical knowledge base for Brightdesk products and shared foundations.

> **Status:** Initial documentation structure and local-link validation are implemented. This repository is not a hosted website, and its presence does not prove that every guide or product feature is complete.

## Start here

- [Documentation index](docs/index.md)
- [Portfolio architecture](docs/architecture/overview.md)
- [Development setup](docs/development/setup.md)
- [Security and privacy boundaries](docs/security/boundaries.md)
- [Release and platform status](docs/releases/status.md)
- [Ten product guide entries](docs/products/)

## Implemented foundation

- Markdown-first guides that remain readable directly in GitHub and local editors.
- A recursive local Markdown link and image-reference checker in scripts/check-doc-links.mjs.
- Regression tests for valid local links, missing targets, repository-root traversal, image references and symbolic-link safety.
- A Node.js 24.22.2 requirement and pinned GitHub Actions quality workflow.
- No hosted site generator, database, account system or paid publishing service.

## Commands

Run from this repository root:

~~~sh
npm ci --no-audit --no-fund
npm run check:node
npm run check
npm test
npm run links
~~~

## Desktop platform scope

Brightdesk products are desktop software for Windows, macOS and Linux only. Mobile applications, mobile editions, Android/iOS builds and mobile installers are not part of the product scope. Responsive layout rules may still support resizing a desktop window; they do not create a mobile product.

## Documentation rules

Keep instructions short, literal and product-specific. Each product guide separates its intended role from features actually confirmed in that product repository. Link feature claims to a current README, implementation or test where possible. Clearly mark proposals, unsupported functionality and unverified platform support. Do not publish private Brightdesk-AI prompts, credentials, internal logs or private build artifacts.

The local link checker verifies relative file and directory targets in Markdown links and image references. It does not validate remote websites, heading-anchor spelling, generated site behavior or whether a linked product feature works.
