# Brightdesk Help — complete visual redesign brief

**Status:** Required before publication  
**Audience:** Everyday Help visitors and technical readers  
**Reference:** Craft Wiki (craft.wiki) and its public source repository, used for capability and information-architecture research only  
**Ownership:** Brightdesk original design, content, code and assets

## Why this work is required

The current customer-facing site is a working prototype, not a release-quality Help experience. Small isolated CSS changes are not an acceptable substitute. The full visual system, navigation model and page templates must be reconsidered together. Brightdesk Help supports desktop applications for Windows, macOS and Linux, so the primary design target is a desktop browser on a desktop or laptop computer. Narrow-screen support is required as a readable fallback, not as the design centre.

The redesign is a publication blocker. Do not promote the current presentation as finished.

## Product and privacy boundaries

- Show exactly ten Brightdesk customer products: Pages, Sheets, Decks, Notes, Database, Forms, Lists, Planner, To Do and Workspace.
- Brightdesk-AI is engineering tooling, not an eleventh customer product.
- Preserve the two separate audiences and information spaces:
  - **Everyday Help:** plain English, task-first guidance for people who do not have technical knowledge.
  - **Technical Documentation:** detailed product and system references for technical readers and people who deliberately want more depth.
- Keep the website static, read-only and independent of installed Brightdesk software.
- No sign-in, accounts, uploads, comments, public editing, cookies, visitor storage, analytics, tracking, advertising, remote AI, third-party scripts, external fonts or external images.
- Search remains local in the visitor's browser and each documentation area searches only its own approved pages.
- Browser-native translation remains the translation approach. A browser may offer automatic page translation or a manual translate command; the Help site must not try to replace, disable or imitate those browser controls. Write and structure content so browser translation can work reliably, and explain where users can find their browser's translation option without assuming every browser uses the same menu label.
- The two Help experiences are separate routes within one Brightdesk Help identity. Everyday Help must link to Technical Documentation for deeper detail, and every technical page must offer a clear route back to the plain-English guide. Readers may move between them freely; the technical area is not restricted to experts.
- Do not publish internal repository or maintainer material.

## Desktop application support — Windows, macOS and Linux

Brightdesk's customer products are desktop applications for **Windows, macOS and Linux**. The Help site is a website that supports those desktop products; it is not a mobile Brightdesk app.

- Design and judge the primary experience at wide desktop and standard laptop sizes first. Prioritise comfortable reading beside a desktop application, clear product navigation, search, workflow steps, tables and technical references.
- Keep tablet and narrow-mobile layouts responsive and readable, but do not let phone-style navigation, stacked mobile cards or touch-first controls dictate the desktop composition. Narrow layouts are a secondary reading fallback.
- Write shared instructions once when the steps are genuinely the same across operating systems. Where a menu name, window control, file location, keyboard shortcut or workflow differs, label the variant clearly as **Windows**, **macOS** or **Linux**.
- Show keyboard shortcuts in platform-aware form, for example **Ctrl** on Windows/Linux and **Command (⌘)** on macOS, but only when the actual Brightdesk build confirms those bindings. Never infer parity from another product or from Craft.
- Do not publish guessed menu paths, shortcut keys, file locations, settings, features or availability. Mark a platform-specific detail as unverified in internal review notes until it has been checked against a current build for that operating system.
- Avoid duplicating an entire article for each operating system when only one or two steps differ. Use a shared task flow with short, clearly labelled platform notes or side-by-side comparisons where they materially help.
- Capture genuine interface evidence separately for each operating system when the visible UI or workflow differs. Record product version, OS version, architecture where relevant, and commit/build identifier. Do not reuse a Windows screenshot as proof of the macOS or Linux interface.
- Before approving a guide, verify the instructions on every platform they claim to support. If a platform build has not been tested, say so internally and keep the guide in review rather than presenting the steps as confirmed.

## Design direction

Create a polished, distinctive Brightdesk documentation experience with the clarity and confidence expected of a finished desktop-software support site. It should feel deliberately art-directed, not like a default theme with a logo added.

Explore multiple clearly different compositions before selecting one direction. Review hierarchy, rhythm, typography, colour, density, page navigation, search placement, component states and small-screen behaviour together. The chosen direction must be implemented as one coherent system across all public routes.

The exact palette, type scale, icon style and decorative language are to be chosen during visual exploration and review; do not treat the current prototype styling as the design baseline. Use original Brightdesk marks and locally available assets. Do not copy Craft branding, page layouts, content, code or screenshots.

## Shared Brightdesk visual references

Before selecting the Help website's visual direction, review the existing portfolio sources:

- [Brightdesk Design System tokens](https://github.com/conz20/Brightdesk-Design-System/blob/main/css/tokens.css) define the current shared colour, surface, spacing, radius, focus and motion values. Use them as the first reference for visual consistency, then decide during exploration which values should map into web-specific Help tokens. Do not transplant desktop product-window widths or application-shell layouts into the website.
- [Brightdesk Design System navigation artwork](https://github.com/conz20/Brightdesk-Design-System/blob/main/assets/navigation-states.svg) is original design reference artwork, not a screenshot of a running product. It may inform the review of Brightdesk navigation patterns but must not be presented as a product screenshot.
- [Brightdesk Assets](https://github.com/conz20/Brightdesk-Assets) is the intended governed library for approved original logos, marks, product icons, screenshots and media. Its current `assets/manifest.json` is empty; its README confirms there are no approved distributable visual assets or product screenshots in that collection at present. Do not assume an asset is approved merely because it exists elsewhere in a repository. Check provenance, rights and bundling approval before using it.
- The Help site's existing SVG workflow diagrams are explanatory illustrations, not approved product screenshots. Keep that distinction visible until genuine captures from verified builds are available.

The current website's CSS palette is not the canonical Design System token set. Do not treat either palette as automatically approved for the redesign; compare and map them during the required visual exploration. Keep all customer-facing assets local and within the existing static-output privacy allowlist.

## Everyday Help experience

### Homepage

- Lead with one clear sentence explaining what Brightdesk Help is for.
- Make the main search action obvious and usable by keyboard.
- Give new visitors one clear path into the Suite getting-started guide.
- Organise the ten products by the tasks people want to complete, not only by product name.
- Use a consistent original icon or mark for each approved product.
- Show the Everyday Help / Technical Documentation distinction clearly without making technical content compete with simple everyday tasks.
- Keep cards, task labels and descriptions short and scannable.

### Product guide system

Assume the reader may not know technical terms, product names or where a control is located. Start from the task they want to complete, explain unfamiliar words, identify the visible button or menu name, give one clear action at a time, and say what they should see next. Use pictures where they genuinely help identify a control or understand a step. Do not assume that a reader knows how to open developer tools, use a terminal or change application settings outside the described task.

Create a consistent, predictable structure for each product:

1. **Overview:** what the product is for, common jobs, important boundaries and the route into the guide.
2. **Getting started:** first-use steps with expected results.
3. **Workflows:** task-led instructions split into useful topics, each with numbered steps, a clear outcome and relevant genuine screenshots.
4. **Troubleshooting:** symptom, likely cause, safe next step and a clear route back to the relevant workflow.

Make these sections easy to find through simple in-page navigation. Keep the words and labels familiar; technical terms should be explained rather than used as unexplained shorthand. The technical reference link should be visible but secondary to the everyday task, so it does not overwhelm a reader who only needs simple help.

Suite-level installation, repair, upgrade and update information belongs in the Suite guide because the ten products are integrated workspaces, not separate installable customer products. Do not invent product-specific installers or claim update delivery is active when it is not.

Every article should make it easy to answer: where am I, what will this guide help me do, what should I do next, and how do I get back to the product overview?

### Workflow visuals

- Prefer genuine screenshots captured from a current running Brightdesk build for instructions that depend on the visible interface.
- Each screenshot must record product version, operating system and build/commit in the internal evidence register.
- Use fictional sample data and remove personal details and local file paths.
- Captions must explain what the reader should notice.
- Alt text must describe the useful content, not repeat the caption.
- Diagrams may explain a concept or process, but must be labelled as diagrams. Never present diagrams, mock-ups or generated artwork as product screenshots.
- Keep every guide marked Needs review until the actual workflow has been tested and the evidence recorded.

## Technical Documentation experience

- Retain a separate visual identity within the shared Brightdesk design system.
- Provide its own navigation hierarchy and independent local search index.
- Keep system references, file formats, data and privacy, and all ten product references easy to reach.
- Use strong heading hierarchy, concise technical summaries, readable tables, code blocks only when useful, and explicit feature boundaries.
- Provide a consistent route back to Everyday Help and to the related product workflow.
- Do not mix internal architecture, build instructions, security implementation, credentials, or maintainer-only material into the public technical area.

## Shared components and states

Design and verify the full set, not only the homepage:

- Site header, Brightdesk brand lockup and audience navigation.
- Search field, empty state, matching results, no-results state and keyboard interaction.
- Homepage hero, getting-started feature, product directory and task cards.
- Product guide header, product navigation, breadcrumbs, contents navigation and related links.
- Numbered workflow steps, expected-result panels, notes and warnings.
- Image and diagram frames with captions and responsive sizing.
- Technical side navigation, reference tables and code presentation.
- Footer and cross-area links.
- Hover, focus-visible, active, expanded, collapsed and reduced-motion states.

Avoid gratuitous animation, dense decoration, oversized cards and excessive rounded panels. Use whitespace and typography to create hierarchy.

## Responsive and accessibility acceptance

Review the desktop-first experience at minimum: wide desktop and standard laptop widths. Then check tablet and narrow-mobile widths as responsive fallbacks. Confirm that:

- Navigation remains understandable and usable without a mouse.
- Focus is always visible and moves in a sensible order.
- Search is labelled, keyboard-accessible and announces useful result status.
- Text remains readable without zooming and line lengths are comfortable.
- Images scale inside their content area and have meaningful alt text.
- Tables and code do not force the entire page to scroll horizontally.
- There is no clipped content, overlapping navigation or unreachable controls.
- Reduced-motion preferences are respected.
- Light and dark appearance remain readable where supported.

## Review and release gate

The redesign is not complete until all of the following are true:

1. One approved visual direction is selected from genuinely different explorations.
2. The approved direction is implemented consistently across Everyday Help and Technical Documentation, including all page templates and shared components.
3. Every public route has been inspected at relevant desktop and narrow widths.
4. Keyboard, focus-visible, contrast, search, image-alt and reduced-motion checks pass.
5. Real product screenshots are present where required, with evidence recorded; no mock screenshot is used.
6. The Jekyll build, Markdown link check, regression tests and generated-output privacy allowlist pass on the exact branch head.
7. The README and this brief agree about what is complete and what remains.
8. No merge, deployment, domain or DNS change occurs without the appropriate explicit approval.

## Research notes

Craft Wiki demonstrates useful capability patterns: a focused landing page, a browsable app directory, clear app categories, consistent guide families, a persistent app navigation model and detailed workflow pages with supporting visuals. Brightdesk should adapt the usability lessons to its own ten-product scope and static, private-data-safe implementation. Craft's authoring portal, sign-in flow, third-party identity, product catalogue, visual identity and assets are not part of the Brightdesk design.

## Design and verification tools

Use specialist tools when they are connected and available, with each tool limited to its proper job:

- **12ui Design:** required visual exploration and design-to-code workflow for the full multi-page redesign. One CLI installation attempt was made on 14 November 2026 with `npx -y @12ui/design cli install`; the npm registry lookup failed with `EAI_AGAIN`, and no `12ui` executable is available in this environment. No design candidates were generated, selected or implemented. Do not repeat the installation attempt here, claim this design stage is complete, or replace the required candidate-selection and implementation-review stages with improvised CSS. Resume the 12ui workflow when the tool is available in an approved environment.
- **Product Design:** proposed for user-flow review, alternative interface directions and prototype critique. It has been suggested for connection; do not claim it is connected or use it until the user completes the connection.
- **Figma:** proposed for editable screen designs, reusable design-system components and implementation handoff. It has been suggested for connection; do not claim it is connected or use it until the user completes the connection.
- **GitHub:** source-of-truth for branch changes, review state, commit history and exact-head CI evidence.
- **Web Validator:** may check supplied HTML/CSS syntax and bounded public pages where permitted. A CSS syntax pass does not establish visual quality, WCAG conformance or browser usability.
- **Browser context:** may inspect pages already open in the user's browser. The available read-only browser actions do not provide interactive viewport, keyboard or screen-reader testing.
- **GitHub Actions:** remains the authoritative automated build, regression, link and public-output privacy gate for each exact commit.

Do not connect a design provider to the repository or grant broad account access unless its permissions are clear and the user has approved the connection. Never send private repository content to a third-party design service unless the user explicitly approves that data flow. Prefer sanitized screenshots and synthetic content for design exploration.

## Craft Wiki research translated into Brightdesk decisions

The public Craft Wiki was reviewed on 14 November 2026:

- [Craft Wiki homepage](https://craft.wiki/) presents a clear directory of its app family, grouped into broad areas such as graphics, video, audio, office and developer tools. Brightdesk should keep its directory limited to the ten approved products and organise entry points around the jobs people want to do, rather than adopting Craft's product categories or naming.
- [Craft Wiki Getting started guide](https://craft.wiki/apps/figcraft/getting-started/) uses a numbered first-use journey, explains the visible areas of the interface and gives concrete actions. Brightdesk guides should retain this step-by-step approach, use the exact labels found in the relevant Brightdesk build, and state the expected result after important actions.
- [Craft Wiki DeckCraft workflows](https://craft.wiki/apps/deckcraft/workflows/) groups instructions by real tasks, then explains controls and keyboard shortcuts in context. Brightdesk can use the same general documentation principle while writing original product-specific instructions and avoiding assumptions that every Brightdesk product has the same controls. Its VectorCraft workflow reference explicitly distinguishes Windows/Linux shortcuts from macOS shortcuts ([example](https://craft.wiki/apps/vectorcraft/workflows/)); Brightdesk should follow the platform-labelling principle only where its own current builds confirm differences.
- The Craft Wiki repository describes a searchable app sidebar with expandable guide links and the current app expanded on its pages ([source repository](https://github.com/storytold/craft-wiki)). This is a useful navigation behaviour to evaluate during Brightdesk's visual exploration. It is not an instruction to reproduce Craft's sidebar, layout, typography or visual styling.

### Brightdesk application

1. Keep the homepage directory compact and scannable, with exactly ten approved product destinations and a separate, clearly labelled route to Technical Documentation.
2. Make the current product and current guide section easy to identify in navigation. Optimise the main composition for desktop and laptop browsers, then reflow it cleanly at narrow widths.
3. Structure each guide around a task, not a feature catalogue. Use numbered steps, visible control names, expected outcomes and troubleshooting paths.
4. Use real screenshots only when they help identify the current Brightdesk interface. Until verified captures exist, retain clearly labelled explanatory diagrams and do not imply that they show the running software.
5. Keep the Brightdesk visual identity, wording, implementation and assets original. Craft is a research reference, not a source of copied page templates, code, logos, icons, screenshots or text.

These observations inform the design brief; they do not satisfy the required full visual redesign, product walkthroughs or screenshot evidence.

## Microsoft documentation and Fluent design research

Microsoft is a second reference, alongside Craft Wiki, but the two references serve different purposes:

- **Craft Wiki** informs app-directory organisation, guide families, task-led workflows and contextual illustrations.
- **Microsoft Support / Microsoft Learn** informs customer-help discovery, article navigation, search, breadcrumbs, in-page section navigation and feedback paths.
- **Microsoft Fluent 2** informs the visual language of clear hierarchy, typography, spacing, surfaces, reusable components, responsive layout and accessible interaction states. It is a design-system reference, not a source of Brightdesk branding or copied components.

Research reviewed on 14 November 2026:

- [Microsoft 365 help & learning](https://support.microsoft.com/en-au/microsoft-365/) groups help by product and common customer needs, and makes install/manage and troubleshooting routes discoverable. Brightdesk should provide similarly direct routes for its own Suite and ten products, but must not import Microsoft account, subscription, licence, activation, billing or cloud-service assumptions.
- [Microsoft 365 documentation navigation guide](https://learn.microsoft.com/en-us/microsoft-365/microsoft-365-docs-navigation-guide?view=o365-worldwide) describes a hub entry point, table-of-contents search, breadcrumbs, article section navigation and page-level feedback. Brightdesk should evaluate these as distinct navigation functions: a clear route back to the Help home, a way to find a guide in the current information area, breadcrumbs showing the guide's place, in-page section links for long articles, and a simple way to report a documentation problem if a privacy-safe route is approved. Do not add a public comment system, customer account, tracking or data-collection form.
- [Microsoft 365 documentation hub](https://learn.microsoft.com/office365/) shows how a broad product family can be grouped into understandable areas and audience routes. Brightdesk should retain its much smaller, fixed product family and its own Everyday Help / Technical Documentation split.
- [Fluent 2 design system](https://fluent2.microsoft.design/) is the primary visual reference for web-friendly layout, typography, colour, geometry, iconography, elevation, motion and interaction states. Use its principles to assess consistency and usability, then map them to original Brightdesk tokens and components.

### Microsoft patterns translated into Brightdesk decisions

1. Provide a clear Help home route from every page, without making visitors depend on browser history.
2. Keep Everyday Help search and Technical Documentation search separate, scoped to their own approved public pages, and entirely local in the visitor's browser.
3. Show breadcrumbs on guide and reference pages so visitors understand where they are and can move up a level.
4. Provide in-page contents navigation for long guides. On wide desktop screens, assess a restrained right-side section navigator; on narrow screens, keep it compact and avoid taking space away from the article.
5. Make product navigation predictable and accessible, with the active product and current page visibly identified. Use expandable groups only where they genuinely reduce scanning effort.
6. Keep article feedback privacy-safe. Do not add comments, sign-in, remote forms, analytics or telemetry; a local mail link or a clearly documented contact route may be evaluated only if it fits the approved privacy and support model.
7. Apply Fluent-inspired hierarchy, spacing, typography, focus states and restrained surfaces without copying Microsoft's exact page composition, logos, icons, wording, proprietary assets or code.
8. Preserve Brightdesk's permanent product and business rules: the integrated Suite plus exactly Pages, Sheets, Decks, Notes, Database, Forms, Lists, Planner, To Do and Workspace; always free; local-first, private and offline-capable; no customer accounts, subscriptions, paid tiers, telemetry, advertising, cloud collaboration or document uploads.

Microsoft's documentation and design patterns are research inputs, not proof that a particular Brightdesk feature exists. Every customer instruction must still match the current Brightdesk source and, before being marked Verified, a genuine product walkthrough on each claimed operating system.
