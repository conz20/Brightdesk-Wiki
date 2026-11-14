# Brightdesk Wiki

The private source repository for the separate Brightdesk customer Help website. The Help website is not a customer product, desktop application, installer component or offline dependency.

## Customer Help website

**Customer Help link:** [https://brightdesk-help.pages.dev/](https://brightdesk-help.pages.dev/)

This is the free Cloudflare Pages address for Brightdesk Help. It uses Cloudflare's provided `pages.dev` hostname, so no paid domain registration, subscription or custom DNS setup is required. Keep this as the canonical customer-facing Help link. Verify the live URL and deployed commit when checking a release.

## Approved customer scope

Brightdesk Help supports the integrated Suite and exactly ten customer products:

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

Brightdesk-AI and the shared engineering repositories are not additional customer products.

Brightdesk is free forever. There are no customer subscriptions, trials, paid tiers, licence fees, activation codes, accounts, sign-ins, passwords, paywalls or advertising.

## Current status — 14 November 2026

The initial Help website framework, build and privacy checks, maintainer setup documentation, and ten product-guide drafts have been merged into `main` from [PR #3](https://github.com/conz20/Brightdesk-Wiki/pull/3).

**The customer website is not ready for publication.** The merged material is a working source foundation, not a completed customer help centre.

- Suite getting-started guide: **Source-confirmed**. Its complete workflow still needs a live walkthrough.
- All ten product guides: **Needs review** until each workflow is tested in a current installed desktop build.
- Genuine screenshots from the running Suite and all ten products: **not yet captured**.
- Homepage search and task-based suggested-help links: **implemented on PR #6 and covered by regression checks; not yet part of `main`**.
- Exact current `main` revision: must pass the complete quality workflow, including the real Jekyll build and generated-output privacy audit, before it is considered build-ready.
- The Cloudflare Pages project has a deployed free hostname at **https://brightdesk-help.pages.dev/**. Pull-request preview deployments are separate review links; they are not the canonical customer Help address. Check the deployed commit before claiming that the latest draft content is live.

Do not label a guide **Verified** until its instructions have been run in the named product version and operating system. Do not use concept artwork as a product screenshot.

## Hosting decision

Cloudflare Pages Free is the approved hosting route. The canonical customer Help address is **https://brightdesk-help.pages.dev/**. This is Cloudflare's free project hostname; no paid custom domain is required.

The Cloudflare Pages GitHub integration is active for this repository. Cloudflare has successfully built and deployed pull-request previews for the private Wiki branch, including PR #6. The production project address remains **https://brightdesk-help.pages.dev/**; PR-specific preview URLs are for review only. The production branch settings, build/output settings, GitHub App repository-access scope and exact deployed production commit still require verification.

The source repository must remain private. The free `pages.dev` hostname is sufficient for the public Help website; do not purchase a domain or change DNS/nameservers for this purpose. Confirm HTTPS and the deployed production commit when validating a release.

Before release, verify the Cloudflare GitHub App is scoped to **Only select repositories** and only `conz20/Brightdesk-Wiki`. Also verify the production branch is `main`, the build command and output directory match this repository, and the branch-preview policy matches the approved runbook. The runbook currently specifies preview deployments as **None** to avoid exposing unfinished help content; preview deployments are presently enabled, so this remains an account-side setting check. Do not change Cloudflare settings or DNS without explicit approval of the exact change.

## What must be complete before publication

- A professional, usable Help homepage with working search and suggested-help links.
- A clear Suite guide and ten product-specific guides with simple, accurate instructions and practical examples.
- Genuine screenshots captured from current running Brightdesk desktop builds.
- A complete walkthrough of every documented customer workflow, with version, operating system and evidence recorded.
- Successful exact-head tests, Markdown-link checks, Jekyll generation and the generated-output privacy audit.
- A browser review of all customer pages, navigation, keyboard use, narrow desktop windows, visible focus and reduced-motion behavior.
- A verified Cloudflare Pages Free production connection at `https://brightdesk-help.pages.dev/`, valid HTTPS, and a recorded deployed commit.

The generated customer site must remain static and read-only. It must not contain accounts, authentication, forms, uploads, comments, editing, analytics, advertising, tracking, external scripts, external fonts, external images or customer-data collection. Keep architecture, development, security, release and maintainer material out of the generated customer output.

## Related work

- [Merged Help website implementation — PR #3](https://github.com/conz20/Brightdesk-Wiki/pull/3)
- [Free public customer Help address](https://brightdesk-help.pages.dev/) — Cloudflare Pages project hostname
- [Wiki GitHub Actions](https://github.com/conz20/Brightdesk-Wiki/actions)


## Help experience in progress

The next Help release is being reviewed on a draft branch created directly from the current `main` revision. It separates **Everyday Help** (plain-English, task-first instructions) from **Technical Documentation** (detailed product and system references). Both remain static and read-only. Search runs locally in the visitor's browser and does not send search terms anywhere.

The following improvements are implemented on the PR #6 branch, but are **not yet part of `main`**:

- Separate Everyday Help and Technical Documentation routes, with navigation between them.
- A separate local search index for each reading area.
- Expanded, plain-English guides for exactly the ten approved products.
- Ten matching technical product references and system, file-format and data/privacy references.
- Regression checks for route structure, guide coverage, reciprocal links and local search.

The preceding PR #6 head `8eac3e316b64e40a0fa813323a09dedc3c7165bd` passed [Brightdesk Wiki quality run #452](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43579835862) on 14 November 2026. All 94 tests passed, including the Technical Documentation accessibility-structure test. The Markdown checker verified 75 local links across 44 Markdown files; the Jekyll build and generated-output privacy audit also passed. Check the live PR #6 checks for exact-head results covering this README and runbook update.

This README status block records the last fully completed quality run. The live [PR #6 checks](https://github.com/conz20/Brightdesk-Wiki/pull/6) are the authority for subsequent commits and preview deployments.
The work is tracked in [draft PR #6](https://github.com/conz20/Brightdesk-Wiki/pull/6), based directly on the current `main` revision. It remains open, draft and unmerged. Keep it that way until the following release gates are complete:

- Visual exploration and manual review at desktop and narrow widths. No visual candidates have been generated or approved.
- Genuine screenshots from current running Brightdesk builds and end-to-end walkthroughs for all ten guides.
- Manual keyboard, screen-reader and browser visual review.
- Cloudflare Pages Free, `https://brightdesk-help.pages.dev/`, HTTPS and deployed-commit verification.

Keep `https://brightdesk-help.pages.dev/` as the free public Help address. Do not purchase a custom domain or change DNS/nameservers. Keep the source repository private.
