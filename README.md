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

The earlier completed [quality run #464](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43587357146) passed 96 automated tests, Markdown-link checks, the Jekyll build and the generated-output privacy audit. Its Cloudflare preview deployment succeeded and its read-only launch audit scored 99/100 (A).

The quality workflow now uses standard GitHub-hosted `ubuntu-latest`, with Node.js 24.22.2, Ruby 3.4.4 and a 10-minute job limit. The latest exact-head attempt, [run #488](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43591350680), failed before any workflow step ran: GitHub assigned no runner (`runner_id: 0`, empty runner name, no steps). It did not execute tests or build the site.

A likely cause is that the private repository has exhausted the account's included GitHub Actions usage or is blocked by an Actions spending budget; this is not confirmed because the account's billing usage is not visible from the repository connection. GitHub documents that private repositories draw on an account-level allowance, and usage is blocked after the included quota is exhausted when there is no valid payment method. Check [GitHub Billing → Budgets and alerts](https://github.com/settings/billing) before enabling any paid usage. Keep spending disabled; no paid workaround is required or authorised. See [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions).

The exact-head Cloudflare Pages preview check failed on commit `a87f954b8c3ee967e8718146ffeedcdf79dfbee1`. GitHub shows only the generic failure status; the actual error is in the signed-in [Cloudflare build log](https://dash.cloudflare.com/?to=/a7ac2321cd83b2afb1be0dcca520f9d7/pages/view/brightdesk-help/9d4ea062-c21c-4b21-9bf9-8d7934b7d947). That account-only log is the remaining diagnostic needed to fix the preview. The earlier successful [run #464](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43587357146) does **not** verify the current PR head. The current head is not verified or published.

The repository uses only the read-only Cloudflare documentation MCP server. It does not require a Cloudflare API token or GitHub Agents secret. The Cloudflare Pages build command still runs the complete validation pipeline: locked Node install, pinned runtime checks, regression tests, Markdown links, Jekyll build and public-output privacy audit.

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
