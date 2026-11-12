# Brightdesk Wiki

The Markdown-first knowledge base for Brightdesk products and shared foundations.

> **Status:** Initial documentation structure and local-link validation are implemented. This repository is not a hosted website, and its presence does not prove that every guide or product feature is complete.

## Start here

- **[Customer start here](docs/customer-start-here.md)** — choose the right product and find the help you need.
- [Documentation index](docs/index.md)
- [Portfolio architecture](docs/architecture/overview.md)
- [Repository inventory](docs/architecture/repository-inventory.md) — maintainer reference for the current 27-repository portfolio.
- [Development setup](docs/development/setup.md)
- [Security and privacy boundaries](docs/security/boundaries.md)
- [Release and platform status](docs/releases/status.md)
- [Ten product guide entries](docs/products/)

## This Wiki is separate from the software

Brightdesk Wiki is a separate online help and knowledge resource. It is **not** a Brightdesk customer product, desktop application, Suite component, App Centre entry, installer payload, runtime dependency, Start-menu item or file installed on a customer's computer.

Customers may choose to visit the help resource separately. Brightdesk Suite and the ten products must continue to install, launch and work offline without the Wiki. No product may depend on Wiki availability or internet access for installation, updates, spelling, dictionaries or ordinary work.

The Markdown source is maintained in this private GitHub repository and can be read online by people who have repository access. There is currently no public hosted documentation website. Do not advertise an unrestricted public help site until a separate publishing route has been explicitly approved and verified.

## Implemented foundation

- Markdown-first guides that remain readable directly in GitHub and local editors.
- A recursive local Markdown link and image-reference checker in `scripts/check-doc-links.mjs`.
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
