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
- Homepage search and task-based suggested-help links: **implemented on PR #6 and covered by regression checks; not yet part of `main`**.
- Exact current `main` revision: must pass the complete quality workflow, including the real Jekyll build and generated-output privacy audit, before it is considered build-ready.
- Production Cloudflare Pages deployment and the `.com` custom domain: **not configured or verified**. Pull-request preview deployments are active, but are review links only.

Do not label a guide **Verified** until its instructions have been run in the named product version and operating system. Do not use concept artwork as a product screenshot.

## Hosting decision

Cloudflare Pages Free is the approved hosting route. The intended customer address is **https://help.brightdesk.com**. This is a target address, not a live website.

The Cloudflare Pages GitHub integration is now active for this repository. Cloudflare has successfully built and deployed pull-request previews for the private Wiki branch, including the current PR #6 commit. This confirms the preview integration and a Pages project are working. It does **not** confirm the production branch settings, build/output settings, GitHub App repository-access scope or custom-domain setup. The current PR previews are enabled and produce `*.brightdesk-help.pages.dev` review URLs; keep those URLs for internal review only and do not advertise them as the customer Help address.

The source repository must remain private. The production custom domain is not configured or verified. Public DNS checks on 13 November 2026 showed the domain using Sedo parking nameservers; this is not a complete DNS-zone export. Do not change nameservers or DNS records without a complete current zone export, a preservation plan and the owner's approval of the exact change. Do not claim the website is live until the exact `.com` address, HTTPS, deployed production commit and all customer pages have been verified.

Before production, verify the Cloudflare GitHub App is scoped to **Only select repositories** and only `conz20/Brightdesk-Wiki`. Also verify the production branch is `main`, the build command and output directory match this repository, and the branch-preview policy matches the approved runbook. The runbook currently specifies preview deployments as **None** to avoid exposing unfinished help content; preview deployments are presently enabled, so this is an outstanding account-side setting check. Do not change Cloudflare settings or DNS without explicit approval of the exact change.

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

The preceding PR #6 head `8eac3e316b64e40a0fa813323a09dedc3c7165bd` passed [Brightdesk Wiki quality run #452](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43579835862) on 14 November 2026. All 94 tests passed, including the Technical Documentation accessibility-structure test. The Markdown checker verified 75 local links across 44 Markdown files; the Jekyll build and generated-output privacy audit also passed. Check the live PR #6 checks for exact-head results covering this README and runbook update.

This README status block records the last fully completed quality run. The live [PR #6 checks](https://github.com/conz20/Brightdesk-Wiki/pull/6) are the authority for subsequent commits and preview deployments.
The work is tracked in [draft PR #6](https://github.com/conz20/Brightdesk-Wiki/pull/6), based directly on the current `main` revision. It remains open, draft and unmerged. Keep it that way until the following release gates are complete:

- Visual exploration and manual review at desktop and narrow widths. No visual candidates have been generated or approved.
- Genuine screenshots from current running Brightdesk builds and end-to-end walkthroughs for all ten guides.
- Manual keyboard, screen-reader and browser visual review.
- Cloudflare Pages Free, `help.brightdesk.com`, HTTPS and deployed-commit verification.

The customer Help site is not live. Do not change DNS or nameservers. Keep the source repository private.
