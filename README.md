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
- **Full visual and UI redesign: REQUIRED.** The current presentation still feels like a prototype and does not meet the requested professional, production-quality standard. Redesign the complete customer-facing experience—not just colours—including the Everyday Help homepage, article templates, Technical Documentation portal, navigation, search, menus, page hierarchy, typography, spacing, cards, diagrams, responsive layouts, focus/keyboard states and mobile/narrow-window behaviour. The internal [visual redesign brief](docs/development/visual-redesign-brief.md) defines the scope and acceptance checks. Use Craft Wiki as a capability and quality reference, not as a template to copy; retain original Brightdesk branding and assets. The ten current workflow SVGs are clearly labelled explanatory diagrams, not product screenshots, and will be replaced or supplemented by professionally art-directed visuals as part of the full redesign. Do not use diagrams or generated artwork as fake product screenshots. Keep this as a publication blocker until the new design has been reviewed and checked at relevant screen sizes.
- Homepage task suggestions for all ten approved products and a clear Suite getting-started route: **implemented in draft [PR #5](https://github.com/conz20/Brightdesk-Wiki/pull/5)**. Every product link opens its Help article only; no Help link launches or controls the desktop software. A keyboard-accessible product-guide menu is available on every Help page. Search supports natural-language questions and searches the homepage, Suite guide and ten product guides locally in the browser. Everyday Help and Technical Documentation now have separate explicit page allowlists and independent browser-local search indexes: the 12 plain-English Help pages do not mix with the 14 technical reference pages. Neither index includes maintainer documentation. This work is not yet on `main` or in a live site.
- All ten product guides now include additional worked examples and product-specific common questions and fixes. They remain **Needs review** until complete workflows are tested in a current installed desktop build.
- The Suite guide now covers product switching and visibility, supported file types, saving `.bdesk` projects, export formats, language settings and spelling checks. It remains **Source-confirmed** until the full workflow is tested in a running Suite build.
- A separate Technical Documentation portal is being added in PR #5. It has its own layout, search, system reference pages and individual technical references for all ten approved products. The same site links both ways between plain-English Help and technical reference material.
- Earlier PR #5 quality workflow: run [#173](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43539553672) passed on 14 November 2026 for PR head `096fc7cf760a9a4f22da398d8d70d2231e860f3c`.
- Previous successful PR #5 quality workflow: [run #176](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43541319544) passed on commit `037facdf049272d1434339a268db1bf84e332466`. It verified the accessible Help search landmark and connected status/results relationship, plus exactly eleven footer suggestions for the Suite and ten products. Regression tests: **82 passed, 0 failed, 0 skipped**; Markdown links, the Jekyll build and the 12-page/14-file privacy audit also passed. A later README-only commit recorded that earlier result; it is historical evidence only and does not replace checks on the current pull-request head. GitHub ran the `pull_request` workflow against merge ref `415d5a9e2668bda8647be0005ec2ed7ade134a15`; the macOS ARM64 job completed successfully with Node.js 24.22.2 and Ruby 3.4.4. Regression tests: **80 passed, 0 failed, 0 skipped**. Markdown link check: 23 files and 35 local file/directory links. Jekyll generation passed. The generated-output privacy audit passed with exactly 12 customer pages and 14 static files, with no private repository links, internal documents, external scripts or external assets. This verifies that PR revision in its current main-branch context; it does not merge the draft into `main` or publish the site.
- Earlier successful exact-head quality workflow: [run #261](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43549292186) passed on commit `85fd6d717e44b06a2a2e7e0f9f216ae871a4b874`. All 12 main steps passed: Node.js 24.22.2 verification, documentation regression tests, Markdown links, Jekyll customer-site build and generated-output privacy check. The public-output gate now approves only the ten named local workflow SVGs, validates them as static artwork, and requires alternative text on page images. The ten product guides now each contain a labelled workflow diagram and a technical-reference cross-link. These diagrams are not genuine product screenshots. This result applies only to the named commit; the README update recording it creates a newer head which must itself pass the exact-head workflow before merge.
- Earlier [run #253](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43548939309) failed at the generated-output privacy gate because SVG assets had not yet been added to the allowlist. [Run #259](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43549187822) then exposed an invalid regular-expression literal in the new SVG test. Both issues were corrected in commits before the successful run #261. The earlier successful [run #243](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43548457247) and its test fix `9b1b01d8e357cbf9dc7541406a73acd5e7f86342` remain historical evidence only.
- This is evidence for the exact commits named above only. Automated CI does not verify the product walkthroughs, screenshots, browser usability or production deployment listed below.
- `main` remains on the pre-search baseline while PR #5 is still a draft. Require a successful main-branch quality workflow after any approved merge; the PR run above is not a post-merge main-branch result.
- Live Cloudflare Pages deployment and the `.com` custom domain: **not configured or verified**.

Do not label a guide **Verified** until its instructions have been run in the named product version and operating system. Do not use concept artwork as a product screenshot.

## Hosting decision

Cloudflare Pages Free is the approved hosting route. The intended customer address is **https://help.brightdesk.com**. This is a target address, not a live website.

The source repository must remain private. The linked Cloudflare Workers & Pages dashboard showed **No projects found** on 14 November 2026. The GitHub App installation identity is not confirmed, so Cloudflare's GitHub App access cannot be claimed. A DNS lookup at 01:15 UTC on 14 November 2026 showed `help.brightdesk.com` resolving to Sedo parking A record `64.190.63.222`, with no CNAME or AAAA record; nameservers remain `ns1.sedoparking.com` and `ns2.sedoparking.com`. The visible MX record is priority 0 `localhost`, TXT includes `v=spf1 -all`, and the SOA identifies `hostmaster.sedo.de`. This is not a complete DNS-zone export; `www` was not checked.

Do not change nameservers or DNS records without a complete current zone export, a preservation plan and the owner's approval of the exact change. Do not advertise a generated `pages.dev` hostname as the customer Help address. Do not claim the website is live until the exact `.com` address, HTTPS, deployed commit and all customer pages have been verified.

## What must be complete before publication

- A complete professional visual and UI redesign of the whole customer-facing site, including Everyday Help, Technical Documentation, all page templates, navigation, search, typography, spacing, diagrams and responsive behaviour. The current prototype-level presentation is not acceptable for publication.
- A professional, usable Help homepage with working local search, task-based suggestions and clearly labelled direct links to all everyday Help guides.
- A separate Technical Documentation area with its own navigation and search, linked from Help and back again, covering the Suite, file formats, data boundaries and all ten product references.
- A clear Suite guide and ten product-specific guides with simple numbered steps, expected results, additional worked examples and product-specific troubleshooting.
- Genuine screenshots captured from current running Brightdesk desktop builds.
- A complete walkthrough of every documented customer workflow, with version, operating system and evidence recorded.
- Successful exact-head tests, Markdown-link checks, Jekyll generation and the generated-output privacy audit.
- A browser review of all customer pages, navigation, keyboard use, narrow desktop windows, visible focus and reduced-motion behavior.
- A verified Cloudflare Pages Free production connection, the approved custom domain with valid HTTPS, and a recorded deployed commit.

The generated customer site remains static and read-only. Its only interactive elements are navigation between documentation pages, the native keyboard-accessible product-guide menu and one accessible search field per documentation area. Everyday Help and Technical Documentation have separate search indexes, both powered by the same audited local JavaScript module; each searches only its own published page allowlist in the browser. None of these links or controls opens or operates Brightdesk Suite or a desktop product. That module must not make network requests, use cookies or visitor storage, or send search terms anywhere. Do not add accounts, authentication, forms, uploads, comments, editing, analytics, advertising, tracking, external scripts, external fonts, external images or customer-data collection. Keep private architecture, development, security, release and maintainer material out of the generated customer output. Only the customer-facing technical reference pages explicitly named in the public-output allowlist may be published.

## Related work

- [Merged Help website implementation — PR #3](https://github.com/conz20/Brightdesk-Wiki/pull/3)
- [Intended customer Help address](https://help.brightdesk.com) — not yet live
- [Wiki GitHub Actions](https://github.com/conz20/Brightdesk-Wiki/actions)


## Latest PR #5 verification — 14 November 2026

This section is the current status for the latest PR revision and supersedes older statements above that describe run #261 as the most recent successful check.

- **Last completed PR head:** `274b63bc7a8300f0c7385e22fb0145e60ebd5726` on `improve/customer-search-examples-2026-11-14`. Run #269 verified that earlier head. This README records that completed evidence but is itself newer than run #269, so the latest commit containing this note must pass its own exact-head workflow before merge. Check [PR #5's Actions checks](https://github.com/conz20/Brightdesk-Wiki/pull/5/checks) for the current commit's result.
- **Latest exact-head workflow:** [run #269](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43551631417) completed successfully on that head. The macOS ARM64 runner used Node.js 24.22.2 and Ruby 3.4.4.
- **Regression tests:** 104 passed, 0 failed, 0 skipped.
- **Markdown links:** 39 Markdown files and 99 local file/directory links checked successfully.
- **Site build and privacy gate:** Jekyll generation passed. The public-output audit passed with exactly 26 approved documentation pages (12 Everyday Help pages and 14 Technical Documentation pages) and 38 static files in total, including the shared CSS and search module and ten labelled local SVG workflow diagrams. No private repository links, internal documents, external scripts or external assets were found in the generated output.
- **Previous failure explained:** run [#268](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43551605235) failed one accessibility regression test. The test had an over-escaped selector pattern and did not recognise the existing `a:focus-visible` CSS rule. The test was corrected in commit `274b63bc7a8300f0c7385e22fb0145e60ebd5726`; run #269 then passed all checks.
- **What CI does not prove:** the automated run does not verify live product workflows, genuine application screenshots, manual keyboard/screen-reader use, visual quality at each viewport, hosting, deployment or the custom domain.

## Remaining publication blockers

- The full visual redesign described in [the visual redesign brief](docs/development/visual-redesign-brief.md) is **not complete**. Do not describe the current UI as production-ready. The redesign must be explored and approved as a coherent direction, then implemented across Everyday Help and Technical Documentation.
- The product-guide content should consistently cover an overview, getting started, task-led workflows and troubleshooting. Suite-level installation and update guidance belongs in the Suite guide; the ten products are integrated workspaces, not separate installers. Current guide content is still being reviewed against this structure.
- All ten product guides remain **Needs review**, and the Suite guide remains **Source-confirmed**, until complete workflows are checked in current installed builds.
- Genuine screenshots from the running Suite and ten products have not been captured. The ten local SVGs are labelled explanatory diagrams and must never be presented as product screenshots.
- Cloudflare Pages, `help.brightdesk.com`, HTTPS and the deployed commit remain unconfigured or unverified. No DNS changes are authorised by this status update.
- PR #5 remains draft and unmerged. Keep the source repository private, preserve the existing free/static/read-only/privacy boundaries, and do not publish or change DNS as part of this work.
