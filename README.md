# Brightdesk Wiki

Private source repository for the separate Brightdesk customer Help website.

## Website addresses

- **Customer Help:** https://brightdesk-help.pages.dev/ — the permanent public address. It uses the free Cloudflare Pages address; no paid domain, subscription or DNS change is required.
- **PR #6 review preview:** https://reconcile-customer-help-main.brightdesk-help.pages.dev/ — a review-only preview address, not the production website.

When the latest preview build fails, the stable preview address may continue to show an older successful build. It is not proof that the current PR commit has deployed. The source repository remains private. Do not replace the permanent customer address with a temporary preview URL.

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

## Help structure

The website provides two connected but separate reading areas:

- **Everyday Help:** simple, plain-English, task-first instructions for customers.
- **Technical Documentation:** deeper product, file-format, system and privacy references.

Each area has its own navigation and local-only search. Visitors can move between the two areas without needing an account.

## Current release status

**Draft — not production.** Keep [PR #6](https://github.com/conz20/Brightdesk-Wiki/pull/6) in draft and unmerged until the publication gates below are complete.

The earlier completed [quality run #464](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43587357146) passed 96 automated tests, Markdown-link checks, the Jekyll build and the earlier 27-page/52-file generated-output privacy audit. Its Cloudflare preview succeeded and its read-only launch audit scored 99/100 (A). That result does not validate the expanded current site.

The current draft expands the approved customer output to **31 HTML pages, 24 local assets and one `_headers` policy file (56 files total)**. It adds shared Suite install/update, languages-and-spelling and troubleshooting guides, plus a focused Decks slide-show guide. The exact allowlist and regression fixture have been updated. The new guide pages are not verified by a successful current-head test run yet.

[Quality run #492](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43593738729) on the preceding head `db6f1cb2bd9ce07e9b29e9b5d9d6918acd150cdf` failed before any workflow step ran. GitHub reports zero workflow steps, no runner log and no test execution. This is a runner/provisioning failure, not evidence that the source tests failed. The cause is not exposed by the repository check; do not enable paid usage or make the repository public as a workaround. See [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions) and [GitHub Billing → Budgets and alerts](https://github.com/settings/billing).

The Cloudflare Pages deployment for that same preceding head also failed with only a generic check result. Its account-only [Cloudflare build log](https://dash.cloudflare.com/?to=/a7ac2321cd83b2afb1be0dcca520f9d7/pages/view/brightdesk-help/04b58934-07f7-49d5-b033-d3615645d249) is required to identify the provider-side cause. Do not guess further source changes without that diagnostic.

The permanent production website has not been changed. The current PR head still requires exact-head automated tests, Markdown-link checks, a Jekyll build, the 56-file privacy audit and a successful Cloudflare preview before publication.

The repository uses only the read-only Cloudflare documentation MCP server. It does not require a Cloudflare API token or GitHub Agents secret.

## Help guide structure

The draft adds shared Suite install/update, languages-and-spelling and troubleshooting guides, plus a focused Decks slide-show guide. Product homes remain the entry points for overview, getting started, workflows, troubleshooting and technical references. These additions do not imply that every Craft Wiki feature exists in Brightdesk.

The homepage search remains prominent and local. Everyday Help and Technical Documentation retain separate search indexes. New routes remain draft content and must pass the exact-head build and privacy checks before publication.

## Design and content

Brightdesk Help must have an original, professional Brightdesk identity and a consistent visual system across the homepage, Everyday Help, Technical Documentation, search, navigation and article templates. Craft Wiki is an information-architecture reference only. Microsoft Fluent principles may inform clarity and accessibility. Do not copy either brand's logos, code, wording, assets or page designs.

Workflow illustrations are explanatory diagrams, not screenshots of running Brightdesk software. Genuine screenshots must be captured from current Windows, macOS and Linux desktop builds where those platforms are claimed, with product version, operating system and commit/build evidence recorded. Do not mark an untested workflow as verified.

## Product and privacy requirements

Brightdesk is free forever. There are no subscriptions, trials, paid tiers, licence fees, activation codes, customer accounts, sign-ins, passwords, paywalls or advertising.

The generated website must remain static and read-only. Do not add customer uploads, comments, public editing, analytics, visitor tracking, advertising, cookies, visitor storage, remote AI, third-party scripts, external fonts, external images or customer-data collection. Search must not send visitor search terms anywhere. Keep internal architecture, development, security, release and maintainer material out of public output.

The hosting provider necessarily processes technical request metadata to deliver and protect the site; do not describe that as Brightdesk analytics or visitor tracking.

## Hosting

Cloudflare Pages Free is the approved hosting route. Use the permanent address above. No paid custom domain, paid upgrade, subscription, DNS change or nameserver change is required. Do not change Cloudflare settings or DNS without explicit approval.

## Publication checklist

- [ ] Complete and approve the professional visual redesign across all public pages and shared components.
- [ ] Review every public route on wide desktop and standard laptop screens; confirm narrow browser layouts remain readable as a website.
- [ ] Capture genuine screenshots from current running desktop builds of the Suite and all ten products, with evidence recorded.
- [ ] Verify every documented workflow on each desktop operating system it claims to support: Windows, macOS and Linux.
- [ ] Complete keyboard, visible-focus, contrast and screen-reader review.
- [ ] Pass exact-head automated tests, Markdown-link checks, Jekyll build and public-output privacy audit.
- [ ] Verify the Cloudflare production deployment, HTTPS and deployed commit at the permanent customer address.
- [ ] Keep the source repository private and keep PR #6 in draft until every publication gate is complete.
