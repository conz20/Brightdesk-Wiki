# Proposal: separate public help website

## Approval status

**Not approved for deployment.** This document records a possible future approach only. The presence of a Jekyll scaffold or deployment instructions is not owner approval to create a public website, connect a hosting account, install a GitHub App, grant repository access or publish customer documentation. Obtain explicit approval before any hosting or publication step.

The GitHub repository must remain private. If a separate public help site is approved later, a static build may use only explicitly reviewed customer-facing pages from `docs/`. The current branch does not yet have a verified Jekyll build, generated-output privacy audit or deployment workflow. No claim is made that the generated site is safe or ready to publish.

## Cloudflare Pages project settings

Only after explicit owner approval, a separate deployment plan and a completed generated-output review, a maintainer could evaluate the following settings:

- Create a Pages project using the Git integration.
- Any GitHub App authorisation would require a separate explicit approval and must be scoped to **only** `conz20/Brightdesk-Wiki`. Do not grant access to all repositories.
- Select `conz20/Brightdesk-Wiki` and set the production branch to `main`.
- Keep the root directory at the repository root (`/`).
- Build command: `bundle exec jekyll build`.
- Build output directory: `_site`.
- Set `RUBY_VERSION=3.4.4` in both preview and production environments. The root `.ruby-version` file also records the same version.
- Do not create or expose a public hostname, buy a custom domain or deploy a preview until publication is explicitly approved.

Official setup references:

- [Cloudflare Pages Jekyll guide](https://developers.cloudflare.com/pages/framework-guides/deploy-a-jekyll-site/)
- [Cloudflare Pages build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/)
- [Cloudflare Pages GitHub integration and repository access](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/)
- [Cloudflare Pages Free limits](https://developers.cloudflare.com/pages/platform/limits/)

## Privacy and scope controls

- Keep `Brightdesk-Wiki` private. A public website does not require a public source repository.
- Scope the Cloudflare GitHub App to this repository only.
- Publish only the customer-facing material in `docs/index.md`, `docs/customer-start-here.md` and `docs/products/`.
- Do not publish `docs/architecture/`, `docs/development/`, `docs/security/`, `docs/releases/`, private logs, credentials, internal prompts or build artefacts.
- Do not add Pages Functions, forms, databases, accounts, analytics, tracking scripts, advertising, embedded third-party fonts or external JavaScript.
- The public site is read-only and has no customer document upload or login feature.
- A static site cannot provide private access controls for individual pages. Anything included in `_site` must be safe for the public internet.
- Hosting providers may process connection metadata to deliver and protect the site; do not describe the hosting layer as collecting no data whatsoever.

## Required gates before any deployment

1. Obtain explicit owner approval for public customer documentation and for the selected hosting provider.
2. Implement and run a real, pinned Jekyll build on the existing private macOS runner; the current workflow does not do this.
3. Implement and test `scripts/check-public-site.mjs`; it does not currently exist, despite the earlier scaffold referring to it.
4. Check that only the intended customer pages are generated and that all links resolve within the generated site.
5. Inspect `_site/` for internal material, private prompts, repository/issue links, credentials, source maps, logs or unintended files before any preview or production publication.
6. Confirm that the GitHub repository remains private and any separately approved hosting integration is limited to this repository.
7. Confirm the provider plan and all optional services before use; do not enable paid add-ons, Workers, Functions or analytics.
8. Do not deploy a preview or production site until all preceding checks and owner approvals are complete.

Until all gates above are satisfied, keep the Jekyll scaffold as un-deployed draft source. Do not use a paid tier, buy a domain, change GitHub repository visibility, connect an account, authorise a GitHub App or deploy a preview/production site.
