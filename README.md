# Brightdesk Wiki

The private source repository for the separate Brightdesk customer Help website. The Help website is not a customer product, desktop application, installer component or offline dependency.

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

## Current status — 13 November 2026

The customer Help website is **not ready for publication**. Its current implementation is being developed in [draft pull request #3](https://github.com/conz20/Brightdesk-Wiki/pull/3). The source repository remains private.

The draft contains a Jekyll site structure, the Suite getting-started guide and ten product guide drafts. Their evidence status is deliberately conservative:

- Suite getting-started guide: **Source-confirmed**, not yet verified in a complete live desktop walkthrough.
- All ten product guides: **Needs review** until their steps are tested in current installed builds.
- Genuine screenshots from the running Suite and products: **not yet captured**.
- Working homepage search and clickable suggested-help links at the bottom of pages: **not yet implemented or verified**.

The current draft must not be merged as a finished customer site until its exact latest revision passes the full quality workflow, including the real Jekyll build and generated-output privacy audit. A previous pass on an earlier revision is not evidence for a newer revision.

## Hosting decision

Cloudflare Pages Free is the approved hosting route. The intended customer address is **https://help.brightdesk.com**. This is a target address, not a live website.

The source repository must remain private. The Cloudflare GitHub App has not yet been installed for this repository, the Pages project has not been connected or verified, and the custom domain is not configured. Public DNS checks on 13 November 2026 showed the domain using Sedo parking nameservers; this is not a complete DNS-zone export.

Do not change nameservers or DNS records without a complete current zone export, a preservation plan and the owner's approval of the exact change. Do not advertise a generated `pages.dev` hostname as the customer Help address. Do not claim the website is live until the exact `.com` address, HTTPS, deployed commit and all customer pages have been verified.

## What must be complete before publication

- A professional, usable Help homepage with working search and suggested-help links.
- A clear Suite guide and ten product-specific guides with simple, accurate instructions and practical examples.
- Genuine screenshots captured from current running Brightdesk desktop builds. Do not use concept artwork as a product screenshot.
- A complete walkthrough of every documented customer workflow, with version, operating system and evidence recorded. Do not label an untested guide **Verified**.
- Successful exact-head tests, Markdown-link checks, Jekyll generation and the generated-output privacy audit.
- A browser review of all customer pages, navigation, keyboard use, narrow desktop windows, visible focus and reduced-motion behavior.
- A verified Cloudflare Pages Free production connection, the approved custom domain with valid HTTPS, and a recorded deployed commit.

The generated customer site must remain static and read-only. It must not contain accounts, authentication, forms, uploads, comments, editing, analytics, advertising, tracking, external scripts, external fonts, external images or customer-data collection. Keep architecture, development, security, release and maintainer material out of the generated customer output.

## Related work

- [Draft customer Help implementation — PR #3](https://github.com/conz20/Brightdesk-Wiki/pull/3)
- [Intended customer Help address](https://help.brightdesk.com) — not yet live
