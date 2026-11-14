# Brightdesk Wiki

Private source repository for the separate Brightdesk customer Help website.

## Latest website links

| Link | Address | Purpose |
|---|---|---|
| **Customer website** | [brightdesk-help.pages.dev](https://brightdesk-help.pages.dev/) | Permanent public address. Always use this link when directing customers to Brightdesk Help. |
| **Latest review build** | [Open the latest successful PR #6 preview](https://6d491e3c.brightdesk-help.pages.dev/) | Newest deployed review version of the current draft. It is not the production website. |

**Keep these links current.** Whenever Cloudflare successfully deploys a newer review build, update the **Latest review build** link in this README to that newest successful preview. Keep the permanent customer address unchanged unless the approved production address itself changes. Never replace the customer link with a temporary preview URL.

The current review build is based on commit `fc85319ca4ae387466bfdef66f696026af23b172` on [draft PR #6](https://github.com/conz20/Brightdesk-Wiki/pull/6). The draft has not been promoted to production.

## What Brightdesk Help covers

Brightdesk Help supports the Brightdesk Suite and exactly ten customer products:

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

Brightdesk-AI and the shared engineering repositories are engineering tools, not additional customer products.

## Current release status

<badge>Draft — not production</badge>

The latest review build has:

- **96/96 automated tests passing.**
- Successful Markdown-link checks, Jekyll build and generated-output privacy audit.
- Successful Cloudflare Pages preview deployment.
- A read-only launch audit score of **99/100 (A)**: 26 checks passed, 1 optional structured-data warning, 0 failures.

See [quality run #464](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43587357146) and [draft PR #6](https://github.com/conz20/Brightdesk-Wiki/pull/6).

The complete professional visual redesign is still a publication blocker. Craft Wiki is the information-architecture reference for grouped product discovery, clear guide navigation, strong search and well-organised article pages. Brightdesk must have its own original identity, artwork, typography and composition. Do not copy Craft branding, code, content or assets.

The draft is **not ready to replace the production website** until the visual direction is approved and implemented, all customer pages receive desktop and narrow-screen review, genuine screenshots are captured from running Brightdesk products, documented workflows are verified, and release checks are complete.

## Design and content structure

The Help website keeps two connected but distinct reading areas:

- **Everyday Help:** plain-English, task-first instructions and practical workflows.
- **Technical Documentation:** deeper product, file-format, system and privacy references.

The two areas link to each other. Search stays local in the visitor's browser and each area searches only its own approved pages.

The design should feel like a professional Brightdesk knowledge base: strong homepage, clear product directory, persistent and searchable product navigation, consistent article layouts, readable typography, deliberate spacing and responsive desktop-first composition. Craft Wiki is a reference, not a template to copy. Microsoft Fluent principles may inform clarity and accessibility, while Brightdesk branding and components remain original.

## Product and privacy requirements

Brightdesk is free forever. There are no customer subscriptions, trials, paid tiers, licence fees, activation codes, customer accounts, sign-ins, passwords, paywalls or advertising.

The generated customer website must remain static and read-only. It must not contain customer uploads, comments, public editing, analytics, visitor tracking, advertising, cookies, visitor storage, remote AI, third-party scripts, external fonts, external images or customer-data collection. Search must not send visitor search terms anywhere. Keep architecture, development, security, release and maintainer material out of public output.

The hosting provider necessarily processes technical request metadata to deliver and protect the site; this must not be described as Brightdesk analytics or visitor tracking.

## Hosting

Cloudflare Pages Free is the approved hosting route. The permanent customer address is [https://brightdesk-help.pages.dev/](https://brightdesk-help.pages.dev/). No paid custom domain, subscription, DNS change or nameserver change is required.

The source repository must remain private. Pull-request preview URLs are review links only. Before a production release, verify the deployed production commit, the `main` production branch, build/output settings and the GitHub App's repository access scope. Do not change Cloudflare settings or DNS without explicit approval.

## Publication checklist

- [ ] Complete and approve the full Brightdesk visual design across homepage, Everyday Help, Technical Documentation, navigation, search, articles and narrow layouts.
- [ ] Review all public routes on desktop and narrow screens.
- [ ] Capture genuine screenshots from current running builds of the Suite and all ten products. Never present concept artwork or workflow diagrams as product screenshots.
- [ ] Verify every documented workflow on each operating system it claims to support.
- [ ] Complete keyboard, visible-focus and screen-reader review.
- [ ] Pass exact-head automated tests, Markdown-link checks, Jekyll build and public-output privacy audit.
- [ ] Verify the production Cloudflare deployment and deployed commit at the permanent customer address.
- [ ] Update the **Latest review build** link above whenever a newer successful PR preview is deployed.

Keep PR #6 in draft and unmerged until the publication checklist is complete.
