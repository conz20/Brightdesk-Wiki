# Brightdesk Wiki

The private source repository for the separate Brightdesk customer Help website. The Help website is not a customer product, desktop application, installer component or offline dependency.

## Customer Help website

**Customer Help link:** [https://help.brightdesk.com](https://help.brightdesk.com)

This is the intended public Help address. It is included here so the customer link is easy to find, but the website is **not yet published or verified as live**. Do not treat it as a working support destination until hosting, the custom domain and HTTPS have been configured and checked.

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
- Working homepage search and clickable suggested-help links at the bottom of pages: **not yet implemented or verified**.
- Exact current `main` revision: must pass the complete quality workflow, including the real Jekyll build and generated-output privacy audit, before it is considered build-ready.
- Live Cloudflare Pages deployment and the `.com` custom domain: **not configured or verified**.

Do not label a guide **Verified** until its instructions have been run in the named product version and operating system. Do not use concept artwork as a product screenshot.

## Hosting decision

Cloudflare Pages Free is the approved hosting route. The intended customer address is **https://help.brightdesk.com**. This is a target address, not a live website.

The source repository must remain private. The Cloudflare GitHub App has not yet been installed for this repository, the Pages project has not been connected or verified, and the custom domain is not configured. Public DNS checks on 13 November 2026 showed the domain using Sedo parking nameservers; this is not a complete DNS-zone export.

Do not change nameservers or DNS records without a complete current zone export, a preservation plan and the owner's approval of the exact change. Do not advertise a generated `pages.dev` hostname as the customer Help address. Do not claim the website is live until the exact `.com` address, HTTPS, deployed commit and all customer pages have been verified.

## What must be complete before publication

- A professional, usable Help homepage with working search and suggested-help links.
- A clear Suite guide and ten product-specific guides with simple, accurate instructions and practical examples.
- Genuine screenshots captured from current running Brightdesk desktop builds.
- A complete walkthrough of every documented customer workflow, with version, operating system and evidence recorded.
- Successful exact-head tests, Markdown-link checks, Jekyll generation and the generated-output privacy audit.
- A browser review of all customer pages, navigation, keyboard use, narrow desktop windows, visible focus and reduced-motion behavior.
- A verified Cloudflare Pages Free production connection, the approved custom domain with valid HTTPS, and a recorded deployed commit.

The generated customer site must remain static and read-only. It must not contain accounts, authentication, forms, uploads, comments, editing, analytics, advertising, tracking, external scripts, external fonts, external images or customer-data collection. Keep architecture, development, security, release and maintainer material out of the generated customer output.

## Related work

- [Merged Help website implementation — PR #3](https://github.com/conz20/Brightdesk-Wiki/pull/3)
- [Intended customer Help address](https://help.brightdesk.com) — not yet live
- [Wiki GitHub Actions](https://github.com/conz20/Brightdesk-Wiki/actions)


## Help experience in progress

The next Help release is being reviewed on a draft branch created directly from the current `main` revision. It separates **Everyday Help** (plain-English, task-first instructions) from **Technical Documentation** (detailed product and system references). Both remain static and read-only. Search runs locally in the visitor's browser and does not send search terms anywhere.

The following improvements are implemented on the PR #6 branch, but are **not yet part of `main`**:

- Separate Everyday Help and Technical Documentation routes, with navigation between them.
- A separate local search index for each reading area.
- Expanded, plain-English guides for exactly the ten approved products.
- Ten matching technical product references and system, file-format and data/privacy references.
- Regression checks for route structure, guide coverage, reciprocal links and local search.

The implementation, including the new translation privacy guidance and its regression test, passed [Brightdesk Wiki quality run #444](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43578996619) on 14 November 2026. The successful run completed the pinned Node.js 24.22.2 and Ruby 3.4.4 setup, validation-script checks, documentation and public-output regression tests, Markdown link checks, Jekyll build and generated-site privacy audit. The run's exact commit is `88d44b087536841c0ccfbccfc9f083eba15cbca6`.

This README status correction is a later documentation-only change on the same draft branch. Check the live [PR #6 checks](https://github.com/conz20/Brightdesk-Wiki/pull/6) for the exact-head result covering the latest README revision.
The work is tracked in [draft PR #6](https://github.com/conz20/Brightdesk-Wiki/pull/6), based directly on the current `main` revision. It remains open, draft and unmerged. Keep it that way until the following release gates are complete:

- Visual exploration and manual review at desktop and narrow widths. No visual candidates have been generated or approved.
- Genuine screenshots from current running Brightdesk builds and end-to-end walkthroughs for all ten guides.
- Manual keyboard, screen-reader and browser visual review.
- Cloudflare Pages Free, `help.brightdesk.com`, HTTPS and deployed-commit verification.

The customer Help site is not live. Do not change DNS or nameservers. Keep the source repository private.
