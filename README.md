# Brightdesk Wiki

Source repository for the separate Brightdesk customer Help website. GitHub currently reports this repository as **public** (checked 21 November 2026), which conflicts with the requirement that all 27 Brightdesk repositories remain private. No visibility or permission settings were changed.

## Publishing status

**No public customer Help website is currently verified as deployed.** Do not advertise a customer URL or describe the site as live until the approved GitHub Pages configuration, production deployment, public URL and deployed commit have all been verified.

GitHub is the only approved publishing platform. Do not create, connect, configure or use Cloudflare Pages or any other external hosting provider. No custom domain, paid add-on, external database, account system or publishing service is approved.

The current repository tree contains the quality workflow but no GitHub Pages deployment workflow. The latest PR quality run verifies a static build and output checks; it is not a deployment result. GitHub Pages settings and the account's current plan have not been verified.

The repository is currently public. Public GitHub Pages may be available on GitHub Free, but that would leave the source public and would not meet the all-private portfolio requirement. If the source repository is private, publishing a public GitHub Pages site from it requires GitHub Pro or a higher eligible plan. The account plan is not verified; do not buy, trial or upgrade a plan. Do not change repository visibility as part of this task.

Until the owner-approved privacy and plan conditions are met, keep the Markdown source in GitHub and leave the public customer site unpublished.

## What Brightdesk Help covers

Brightdesk Help supports the integrated Brightdesk Suite and exactly ten customer products:

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

Brightdesk-AI and shared engineering repositories are engineering tools, not customer products.

## Desktop-only product support

**Brightdesk Suite and all ten products are desktop software only.** Supported desktop operating systems are Windows, macOS and Linux.

There will be **no mobile application, mobile app version, Android release or iOS release** for the Suite or any of the ten products. Do not create mobile product projects, mobile build targets, mobile installers or mobile product guides.

The Brightdesk Help website may reflow so its pages remain readable in a narrow browser window. That is responsive website presentation only; it does not mean Brightdesk software is available on phones or tablets.

## Approved customer-help scope

The customer-facing help centre is limited to:

- One Brightdesk Help homepage.
- One plain-English Brightdesk Suite getting-started guide.
- Exactly ten product guides: Pages, Sheets, Decks, Notes, Database, Forms, Lists, Planner, To Do and Workspace.
- Local CSS and only the navigation required to reach those pages.

Do not add separate engineering, development, architecture, security, release-management, maintainer, owner-operation or internal administration pages. Do not add other product areas, accounts, comments, uploads, forms or edit controls. Customers may only browse the published static help pages.

## Current release status — 22 November 2026

**Draft — not production.** The former Wiki PR #3 was merged on 13 November 2026. Its current successor [PR #8](https://github.com/conz20/Brightdesk-Wiki/pull/8) remains open, draft and unmerged. This branch is a review change, not a production deployment.

The latest exact-head quality run before this maintenance change, [#44828532172](https://github.com/conz20/Brightdesk-Wiki/actions/runs/44828532172), was for pre-fix head `f78b5b2f6dc77ef9ec17ebd8e47a17befdf8b028` and failed during `npm test`: **101 of 103 tests passed**. Two legacy policy tests tried to read `docs/development/cloudflare-pages.md`, which had already been removed. The Markdown link check, Jekyll build and generated-output audit were skipped after the test failure. Earlier run [#44473651228](https://github.com/conz20/Brightdesk-Wiki/actions/runs/44473651228) belongs to an older head and is not current. This update removes the obsolete provider integration and replaces those tests with the current GitHub-only publication gate. A new exact-head run is required; no pass is claimed here.

No GitHub Pages configuration, production deployment, deployed commit or public customer URL has been verified. The quality workflow is a static build and output check only; it does not deploy. The account plan remains unverified. The repository is currently public, which conflicts with the all-private portfolio requirement. Do not change visibility, buy or upgrade a plan, or publish without explicit owner authorisation. If the repository becomes private, public GitHub Pages requires an eligible GitHub Pro or higher plan; do not assume eligibility.

All ten product guides remain **Needs review** pending walkthroughs in current installed builds. No genuine product screenshots are claimed.

## Help guide structure

The Suite guide explains how to get started and choose among the ten approved products. Each product guide should use plain English, verified interface labels and short task steps, with expected results and safe troubleshooting where evidence exists.

Label every workflow accurately as Verified, Source-confirmed, Planned, Under test, Not available or Needs review. A successful static site build does not prove that a product workflow works. Use genuine screenshots only when captured from a running product build and tied to the exact product version, operating system, source commit and successful verification evidence.

## Design and content

Brightdesk Help must have an original, professional Brightdesk identity and a consistent visual system across the homepage, Suite guide, ten product guides, search, navigation and article templates. Craft Wiki is an information-architecture reference only. Microsoft Fluent principles may inform clarity and accessibility. Do not copy either brand's logos, code, wording, assets or page designs.

Workflow illustrations are explanatory diagrams, not screenshots of running Brightdesk software. Genuine screenshots must be captured from current Windows, macOS and Linux desktop builds where those platforms are claimed, with product version, operating system and commit/build evidence recorded. Do not mark an untested workflow as verified.

## Product and privacy requirements

Brightdesk is free forever. There are no subscriptions, trials, paid tiers, licence fees, activation codes, customer accounts, sign-ins, passwords, paywalls or advertising.

The generated website must remain static and read-only. Do not add customer uploads, comments, public editing, analytics, visitor tracking, advertising, cookies, visitor storage, remote AI, third-party scripts, external fonts, external images or customer-data collection. Search must not send visitor search terms anywhere. Keep internal architecture, development, security, release and maintainer material out of public output.

GitHub Pages processes visitor IP addresses and other technical request metadata for security and service delivery. Do not claim visitor metadata is never processed. Brightdesk must not add analytics, tracking or unnecessary data collection.

## Hosting

GitHub Pages is the only approved publishing target. No GitHub Pages configuration, production deployment, deployed commit or public customer URL has been verified. The available workflow evidence is a quality/static-build check only.

If the source remains private, public GitHub Pages requires an eligible GitHub Pro or higher plan. The current account plan is unverified and no paid upgrade is authorised. Do not make the repository public to bypass this gate; the current public repository state is already a privacy-policy discrepancy that must be reported, not treated as approval.

Keep publication separate from Brightdesk software builds and releases. The Wiki must never be installed, bundled, linked into product UI or required for offline product use.

## Publication checklist

- [ ] Reduce the Wiki to one homepage, one Suite getting-started guide and exactly ten product guides.
- [ ] Remove internal development, architecture, security, release, maintainer and owner-operation material from the Wiki source and customer navigation.
- [ ] Review customer instructions against current source, tests and genuinely verified product workflows.
- [ ] Complete keyboard, visible-focus, contrast and screen-reader review.
- [ ] Pass exact-head documentation tests, Markdown-link checks, static build and generated-output privacy audit.
- [ ] Verify the GitHub repository privacy and eligible account-plan requirements without buying or upgrading a plan.
- [ ] Obtain explicit owner authorisation for GitHub Pages publication.
- [ ] Verify the successful production deployment, public URL and exact deployed commit before describing the site as live.
- [ ] Keep PR #8 draft and unmerged until exact-head verification and review are complete.
