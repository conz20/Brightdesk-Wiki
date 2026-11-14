# Brightdesk Wiki

Private source repository for the separate Brightdesk customer Help website. This repository is not a customer product, desktop application, installer component or runtime dependency.

## Customer Help

**Intended address:** [https://help.brightdesk.com](https://help.brightdesk.com)

The address is reserved as the intended customer destination, but the website is **not live or verified**. Do not direct customers to it as a working support service until hosting, HTTPS, the deployed commit and every public page have been checked.

## Product and privacy boundaries

Brightdesk Help covers the integrated Suite and exactly these ten customer products:

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

Brightdesk-AI is engineering tooling, not an eleventh customer product. Do not add Outlook, OneDrive, Teams or other products.

Brightdesk is free forever. There are no subscriptions, trials, paid tiers, licence fees, activation codes, customer accounts, sign-ins or passwords.

The generated Help site must remain static, read-only and independent of installed Brightdesk software. Do not add analytics, telemetry, advertising, tracking, cookies, visitor storage, remote AI, uploads, comments, forms, customer-data collection, external scripts, external fonts or external images. Both search areas run locally in the visitor's browser and must not send search terms or make network requests. Use browser-native translation only; do not send page text to a translation service. Keep internal architecture, development, security, release and maintainer material out of the generated site.

## Current work — 14 November 2026

The initial Help website framework and build/privacy gates are on `main` from [PR #3](https://github.com/conz20/Brightdesk-Wiki/pull/3). The larger Everyday Help and Technical Documentation improvements are in [draft PR #5](https://github.com/conz20/Brightdesk-Wiki/pull/5).

PR #5 currently contains:

- **Everyday Help:** a task-first homepage for simple, non-technical tasks, a clear Suite getting-started route, natural-language local search and plain-English guides for all ten products.
- **Consistent product guides:** each of the ten guides has **Overview**, **Getting started**, **Workflows**, and **Troubleshooting and common questions** sections, with in-page navigation, examples, expected results, product-specific questions, feature boundaries and a link to the relevant technical reference.
- **Technical Documentation:** a separate `/technical/` area for readers who want deeper product and system detail. It has its own layout, navigation and local search. It includes system references and individual technical references for the same ten products. The two areas link to each other but their search indexes remain separate. Technical detail is available to anyone; it is not a prerequisite for everyday help.
- **Translation:** visitors use their browser's automatic translation or manual translate command. Brightdesk does not provide a separate translation service.
- **Source-checked control labels:** the current Lists filter/sort and custom-column controls, plus Workspace's **Find a page** control, now match the labels in the product source.
- **Visual assets:** the ten current product SVGs are explanatory diagrams, not screenshots of Brightdesk. They are labelled accordingly.

The source changes are not yet merged into `main`. PR #5 remains a **draft** and must stay unmerged until its review and release gates are met.

## Verification — exact commits matter

[Run #296](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43557314209) passed on commit `98500f11db2aabd2bd5c57cb6922161bd3bc8728`. The workflow completed the pinned Node.js 24.22.2 and Ruby 3.4.4 setup, validation-script checks, automated regression tests, Markdown-link check, Jekyll customer-site generation and generated-output privacy audit successfully.

[Run #295](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43557189238) passed on the immediately preceding commit `e57bd3f572bf41ed73c1d8e62c253cfe298b4cd2`. It completed the same validation pipeline successfully.

[Run #294](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43556708962) passed on commit `acdec414a39c85f01baff970f96db834113576e1`. [Run #293](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43556304582) passed on commit `60b1c7dcb1ac377b181d73b2db591188afe29b0a`. Run #293 reported 109 tests passed, 0 failed and 0 skipped; 39 Markdown files and 99 local file/directory links checked; Jekyll generation passed; and the privacy audit approved 26 documentation pages and 38 static files.

[Run #292](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43556224932) is historical evidence for commit `acbd5ea86532b6f16eef7eba3181ab5bf27e8ac1`.

These run entries are an audit trail for the exact commits named; they do not claim that an earlier run checked a later commit. Every new commit must pass its own exact-head workflow. Use [PR #5's current checks](https://github.com/conz20/Brightdesk-Wiki/pull/5/checks) as the source of truth for the current branch head. Automated CI does not establish visual quality, genuine product screenshots, live product workflows, manual keyboard/screen-reader usability, production hosting or deployment.

## Publication blockers

### 1. Complete visual redesign

The current Help UI still feels like a prototype and is not acceptable for publication. Redesign the complete experience as one coherent system: the Everyday Help homepage and article templates, Technical Documentation, navigation, search, menus, hierarchy, typography, spacing, cards, workflow visuals, responsive behaviour, focus states and keyboard interaction. Review wide desktop, laptop, tablet and narrow mobile layouts.

The [visual redesign brief](docs/development/visual-redesign-brief.md) defines the design and acceptance requirements. Craft Wiki is a reference for useful capabilities and guide coverage only. Use original Brightdesk identity, writing, code and assets; do not copy Craft branding, layouts, content, code or screenshots.

The required 12ui design workflow could not be started in this environment. One CLI installation attempt failed because the npm registry could not be resolved (`EAI_AGAIN`); the CLI is not installed. No design candidates were generated, selected or implemented. Do not claim that the visual redesign is complete, and do not substitute isolated CSS tweaks for the required exploration and review.

### 2. Genuine product evidence

The Suite guide remains **Source-confirmed** and all ten product guides remain **Needs review**. Their instructions must be walked through in current installed desktop builds before their status can be raised. Record the product version, operating system and build/commit for each walkthrough.

Genuine screenshots from the running Suite and all ten products have not yet been captured. The ten SVG diagrams are not screenshots and must never be presented as such. Use fictional sample data and remove personal details and local file paths from any future screenshots.

Suite-level installation, repair, upgrade and update information belongs in the Suite guide. The ten products are integrated workspaces, not separate installers. Do not invent a repair procedure or claim that an update service is active before it is verified.

### 3. Hosting and domain

Cloudflare Pages Free is the approved hosting route, but no project or production deployment has been verified. On 14 November 2026 the connected Cloudflare dashboard showed no projects. The intended address is `help.brightdesk.com`, not a generated `pages.dev` hostname.

The last recorded DNS inspection showed Sedo parking nameservers and a parking A record for `help.brightdesk.com`. That inspection was not a complete DNS-zone export. Do not change DNS or nameservers without a complete current zone export, a preservation plan and explicit approval of the exact changes.

## Completion gate

Before publication, all of the following must be evidenced:

- The full visual redesign is selected, implemented consistently and reviewed at desktop and narrow widths.
- Everyday Help and Technical Documentation both work, remain separate and link to each other.
- All Suite and product workflows are checked in current installed builds; guide statuses match the evidence.
- Genuine screenshots are captured and recorded where the interface needs to be shown.
- Keyboard access, visible focus, search status, contrast, image alt text and reduced-motion behaviour are checked.
- Regression tests, Markdown links, Jekyll generation and the generated-output privacy allowlist pass on the exact final commit.
- Cloudflare Pages Free, `help.brightdesk.com`, HTTPS and the deployed commit are verified.
- README and the visual redesign brief agree about what is complete.

Keep the repository private. Keep PR #5 draft and unmerged until the release gates have been met. Do not change DNS, publish the site or claim it is live as part of this documentation work.
