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
- Site-wide Help search, homepage task suggestions and a direct product-guide menu on every page: **implemented in draft [PR #5](https://github.com/conz20/Brightdesk-Wiki/pull/5)**. The menu links directly to all ten approved products; the Suite guide remains one click away. The search index is explicitly restricted to the 12 approved customer pages; it does not index maintainer documentation. This work is not yet on `main` or in a live site.
- Earlier PR #5 quality workflow: run [#173](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43539553672) passed on 14 November 2026 for PR head `096fc7cf760a9a4f22da398d8d70d2231e860f3c`.
- Latest exact-head PR #5 quality workflow: [run #176](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43541319544) passed on commit `037facdf049272d1434339a268db1bf84e332466`. It verified the accessible Help search landmark and connected status/results relationship, plus exactly eleven footer suggestions for the Suite and ten products. Regression tests: **82 passed, 0 failed, 0 skipped**; Markdown links, the Jekyll build and the 12-page/14-file privacy audit also passed. A later README-only commit records this result and must itself retain a successful exact-head quality check before merge. GitHub ran the `pull_request` workflow against merge ref `415d5a9e2668bda8647be0005ec2ed7ade134a15`; the macOS ARM64 job completed successfully with Node.js 24.22.2 and Ruby 3.4.4. Regression tests: **80 passed, 0 failed, 0 skipped**. Markdown link check: 23 files and 35 local file/directory links. Jekyll generation passed. The generated-output privacy audit passed with exactly 12 customer pages and 14 static files, with no private repository links, internal documents, external scripts or external assets. This verifies that PR revision in its current main-branch context; it does not merge the draft into `main` or publish the site.
- This is evidence for that exact commit only. Every later PR-head change must receive its own successful exact-head workflow run. Automated CI does not verify the product walkthroughs, screenshots, browser usability or production deployment listed below.
- `main` remains on the pre-search baseline while PR #5 is still a draft. Require a successful main-branch quality workflow after any approved merge; the PR run above is not a post-merge main-branch result.
- Live Cloudflare Pages deployment and the `.com` custom domain: **not configured or verified**.

Do not label a guide **Verified** until its instructions have been run in the named product version and operating system. Do not use concept artwork as a product screenshot.

## Hosting decision

Cloudflare Pages Free is the approved hosting route. The intended customer address is **https://help.brightdesk.com**. This is a target address, not a live website.

The source repository must remain private. The linked Cloudflare Workers & Pages dashboard showed **No projects found** on 14 November 2026. The GitHub App installation identity is not confirmed, so Cloudflare's GitHub App access cannot be claimed. A DNS lookup at 01:15 UTC on 14 November 2026 showed `help.brightdesk.com` resolving to Sedo parking A record `64.190.63.222`, with no CNAME or AAAA record; nameservers remain `ns1.sedoparking.com` and `ns2.sedoparking.com`. The visible MX record is priority 0 `localhost`, TXT includes `v=spf1 -all`, and the SOA identifies `hostmaster.sedo.de`. This is not a complete DNS-zone export; `www` was not checked.

Do not change nameservers or DNS records without a complete current zone export, a preservation plan and the owner's approval of the exact change. Do not advertise a generated `pages.dev` hostname as the customer Help address. Do not claim the website is live until the exact `.com` address, HTTPS, deployed commit and all customer pages have been verified.

## What must be complete before publication

- A professional, usable Help homepage with working search, task-based suggestions and clearly labelled direct links to all customer guides.
- A clear Suite guide and ten product-specific guides with simple, accurate instructions and practical examples.
- Genuine screenshots captured from current running Brightdesk desktop builds.
- A complete walkthrough of every documented customer workflow, with version, operating system and evidence recorded.
- Successful exact-head tests, Markdown-link checks, Jekyll generation and the generated-output privacy audit.
- A browser review of all customer pages, navigation, keyboard use, narrow desktop windows, visible focus and reduced-motion behavior.
- A verified Cloudflare Pages Free production connection, the approved custom domain with valid HTTPS, and a recorded deployed commit.

The generated customer site remains static and read-only. Its interactive elements are a native, keyboard-accessible product-guide menu and the accessible Help search field. The search is powered by one audited local JavaScript module that searches the published guide text in the browser. That module must not make network requests, use cookies or visitor storage, or send search terms anywhere. Do not add accounts, authentication, forms, uploads, comments, editing, analytics, advertising, tracking, external scripts, external fonts, external images or customer-data collection. Keep architecture, development, security, release and maintainer material out of the generated customer output.

## Related work

- [Merged Help website implementation — PR #3](https://github.com/conz20/Brightdesk-Wiki/pull/3)
- [Intended customer Help address](https://help.brightdesk.com) — not yet live
- [Wiki GitHub Actions](https://github.com/conz20/Brightdesk-Wiki/actions)
