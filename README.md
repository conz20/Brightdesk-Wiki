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
- Site-wide Help search and clickable task suggestions: **implemented in draft [PR #5](https://github.com/conz20/Brightdesk-Wiki/pull/5)**. The search index is explicitly restricted to the 12 approved customer pages; it does not index maintainer documentation. This work is not yet on `main` or in a live site.
- Exact-head quality run for PR #5 on commit `9ae59200e75a0ba7732d57110581997833309d1e`, run [#171](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43528334692): **80 tests passed, 0 failed, 0 skipped**; Markdown link check passed (23 Markdown files and 35 local file/directory links); the Jekyll site built successfully; and the generated-output privacy audit passed with exactly 12 customer pages and 14 static files. All workflow steps succeeded.
- This is evidence for that exact commit only. Every later PR-head change must receive its own successful exact-head workflow run. Automated CI does not verify the product walkthroughs, screenshots, browser usability or production deployment listed below.
- Exact current `main` revision: must pass the complete quality workflow, including the real Jekyll build and generated-output privacy audit, before it is considered build-ready.
- Live Cloudflare Pages deployment and the `.com` custom domain: **not configured or verified**.

Do not label a guide **Verified** until its instructions have been run in the named product version and operating system. Do not use concept artwork as a product screenshot.

## Hosting decision

Cloudflare Pages Free is the approved hosting route. The intended customer address is **https://help.brightdesk.com**. This is a target address, not a live website.

The source repository must remain private. The linked Cloudflare Workers & Pages dashboard showed **No projects found** on 14 November 2026. The GitHub App installation identity is not confirmed, so Cloudflare's GitHub App access cannot be claimed. A public DNS lookup on 14 November 2026 showed `help.brightdesk.com` resolving to Sedo parking A record `64.190.63.222`, with no CNAME; the authoritative nameservers remain Sedo. This is not a complete DNS-zone export.

Do not change nameservers or DNS records without a complete current zone export, a preservation plan and the owner's approval of the exact change. Do not advertise a generated `pages.dev` hostname as the customer Help address. Do not claim the website is live until the exact `.com` address, HTTPS, deployed commit and all customer pages have been verified.

## What must be complete before publication

- A professional, usable Help homepage with working search and suggested-help links.
- A clear Suite guide and ten product-specific guides with simple, accurate instructions and practical examples.
- Genuine screenshots captured from current running Brightdesk desktop builds.
- A complete walkthrough of every documented customer workflow, with version, operating system and evidence recorded.
- Successful exact-head tests, Markdown-link checks, Jekyll generation and the generated-output privacy audit.
- A browser review of all customer pages, navigation, keyboard use, narrow desktop windows, visible focus and reduced-motion behavior.
- A verified Cloudflare Pages Free production connection, the approved custom domain with valid HTTPS, and a recorded deployed commit.

The generated customer site remains static and read-only. Its only interactive element is the accessible Help search field, powered by one audited local JavaScript module that searches the published guide text in the browser. That module must not make network requests, use cookies or visitor storage, or send search terms anywhere. Do not add accounts, authentication, forms, uploads, comments, editing, analytics, advertising, tracking, external scripts, external fonts, external images or customer-data collection. Keep architecture, development, security, release and maintainer material out of the generated customer output.

## Related work

- [Merged Help website implementation — PR #3](https://github.com/conz20/Brightdesk-Wiki/pull/3)
- [Intended customer Help address](https://help.brightdesk.com) — not yet live
- [Wiki GitHub Actions](https://github.com/conz20/Brightdesk-Wiki/actions)
