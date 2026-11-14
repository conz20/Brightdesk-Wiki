# Brightdesk Help — complete visual redesign brief

**Status:** Required before publication  
**Audience:** Everyday Help visitors and technical readers  
**Reference:** Craft Wiki (craft.wiki) and its public source repository, used for capability and information-architecture research only  
**Ownership:** Brightdesk original design, content, code and assets

## Why this work is required

The current customer-facing site is a working prototype, not a release-quality Help experience. Small isolated CSS changes are not an acceptable substitute. The full visual system, navigation model and page templates must be reconsidered together, then reviewed at desktop and narrow screen sizes.

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
- Browser-native translation remains the translation approach.
- Do not publish internal repository or maintainer material.

## Design direction

Create a polished, distinctive Brightdesk documentation experience with the clarity and confidence expected of a finished desktop-software support site. It should feel deliberately art-directed, not like a default theme with a logo added.

Explore multiple clearly different compositions before selecting one direction. Review hierarchy, rhythm, typography, colour, density, page navigation, search placement, component states and small-screen behaviour together. The chosen direction must be implemented as one coherent system across all public routes.

The exact palette, type scale, icon style and decorative language are to be chosen during visual exploration and review; do not treat the current prototype styling as the design baseline. Use original Brightdesk marks and locally available assets. Do not copy Craft branding, page layouts, content, code or screenshots.

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

Create a consistent, predictable structure for each product:

1. **Overview:** what the product is for, common jobs, important boundaries and the route into the guide.
2. **Getting started:** first-use steps with expected results.
3. **Workflows:** task-led instructions split into useful topics, each with numbered steps, a clear outcome and relevant genuine screenshots.
4. **Troubleshooting:** symptom, likely cause, safe next step and a clear route back to the relevant workflow.

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

Review at minimum: wide desktop, standard laptop, tablet and narrow mobile widths. Confirm that:

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

- **12ui Design:** required visual exploration and design-to-code workflow for the full multi-page redesign. The CLI is not currently available in the working environment; the previous package-registry attempt failed. Do not replace its required candidate-selection and implementation-review stages with improvised CSS.
- **Product Design:** proposed for user-flow review, alternative interface directions and prototype critique. It has been suggested for connection; do not claim it is connected or use it until the user completes the connection.
- **Figma:** proposed for editable screen designs, reusable design-system components and implementation handoff. It has been suggested for connection; do not claim it is connected or use it until the user completes the connection.
- **GitHub:** source-of-truth for branch changes, review state, commit history and exact-head CI evidence.
- **Web Validator:** may check supplied HTML/CSS syntax and bounded public pages where permitted. A CSS syntax pass does not establish visual quality, WCAG conformance or browser usability.
- **Browser context:** may inspect pages already open in the user's browser. The available read-only browser actions do not provide interactive viewport, keyboard or screen-reader testing.
- **GitHub Actions:** remains the authoritative automated build, regression, link and public-output privacy gate for each exact commit.

Do not connect a design provider to the repository or grant broad account access unless its permissions are clear and the user has approved the connection. Never send private repository content to a third-party design service unless the user explicitly approves that data flow. Prefer sanitized screenshots and synthetic content for design exploration.
