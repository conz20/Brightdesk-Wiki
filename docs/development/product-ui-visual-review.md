# Brightdesk product and Suite visual review — Craft, Fluent and Spectrum

**Status:** Research baseline and implementation checklist; not a claim that the applications have passed visual review.
**Scope:** Brightdesk Suite and exactly ten customer products: Pages, Sheets, Decks, Notes, Database, Forms, Lists, Planner, To Do and Workspace.
**Reference research date:** 14 November 2026.

## Owner-approved visual direction

- Keep the current Brightdesk Suite visual identity, overall composition and visual character. Treat the existing Suite UI as the starting point, not something to replace.
- Refresh the Suite to a more finished, professional standard: stronger hierarchy, consistent spacing, typography, component states, icon alignment, surface treatment and responsive window resizing.
- Retain the Suite's preferred Adobe-style left navigation/sidebar pattern: clear persistent destinations, well-defined selected state, useful grouping and a compact/collapsible option only where it fits the existing design. Blend this with Microsoft Fluent-style content surfaces, command patterns and predictable interactions.
- The ten individual products should read as a coherent Microsoft-inspired desktop productivity family, while retaining their own task-specific workspaces and Brightdesk branding.
- All designs, code, icons, colours, illustrations and assets must be original Brightdesk work. Microsoft Fluent and Adobe Spectrum are design references only. Do not copy logos, product marks, proprietary assets, source code or trade dress.
- This is desktop software for Windows, macOS and Linux. Validate resizable desktop windows; do not create a mobile/tablet product.

## Research reviewed

### Craft Wiki — https://craft.wiki/

The site is the **ArtCraft / Craft Apps documentation portal**, not the Craft.do documentation site. Its landing page lists 18 official apps grouped into AI/generative media, graphics/design, video/effects, audio, CAD/drafting, office and developer tools, plus two separately identified third-party apps. Its useful patterns are:

- A searchable app directory with meaningful categories.
- Consistent per-app guide families: overview, getting started, install/update, workflows and troubleshooting, with specialist topics where relevant.
- Workflow pages organised around concrete tasks rather than long undifferentiated feature lists.
- Contextual, task-specific illustrations and links to related help.
- A clear distinction between official and third-party ecosystem entries.

Relevant office workflows reviewed:
- Word Craft: ribbon tabs and contextual tabs; styles; tables, pictures and shapes; page layout; references; review and editing; equations; document protection; mail merge; reading/view modes; printing; settings; file formats and shortcuts.
- Grid Craft: formulas and formula auditing; formatting; tables; sorting/filtering/cleanup; data analysis; charts; pivot tables; pictures/shapes/comments; slicers and controls; print/export; macros; workspace appearance.
- Deck Craft: dedicated presentation and slide-show workflow documentation.
- Word Craft language/spelling documentation and Vector Craft workspace customisation were also inspected for language and user-customisable workspace patterns.

Important limitation: Craft Wiki is a capability and documentation reference, not proof that every listed capability is suitable for Brightdesk. It includes collaboration, mail merge, Zotero, macros, AI/agent workflows and other features that must not be assumed or copied into Brightdesk. Brightdesk remains local-first, free, private and offline-capable; no customer accounts, subscriptions, tracking, cloud collaboration or customer-document uploads.

### Microsoft Fluent 2 — https://fluent2.microsoft.design/

Use current Fluent 2 guidance as the primary product-family reference:
- Layout, spacing, grids, alignment and responsive desktop window behaviour.
- Clear navigation taxonomy, short labels and predictable ordering.
- Command bars/ribbons that expose important actions consistently.
- Typography, colour, geometry, iconography, elevation and restrained materials.
- Consistent interaction states, keyboard access and readable focus indication.
- Shared design tokens and reusable components, with product-specific variants.

### Adobe Spectrum 2 — https://spectrum.adobe.com/

Use Spectrum 2 as a secondary reference for the Suite's preferred sidebar treatment and professional creative-workspace patterns:
- A consistent app frame with a persistent header and side navigation working together.
- Clear workflow categories, selected states, grouping and useful collapsible navigation.
- Flexible navigation width and icon/label presentation.
- Consistent component states, layout, typography, colour and accessibility.
- Strong separation between navigation and the active work surface.

The Suite should borrow the *navigation pattern* the owner likes, not become an Adobe clone. The current Suite's overall design and arrangement remain the baseline.

## Product-by-product capability and UI review matrix

This matrix maps relevant Craft documentation patterns to Brightdesk product work. It is a review checklist, not a claim that all features already exist or must be implemented.

| Brightdesk product | Craft reference | Review focus |
|---|---|---|
| Pages | Word Craft | Document canvas, ribbon/command organisation, styles, insert/layout/references/review/view, navigation pane, page setup, print/export, spelling and accessible reading. |
| Sheets | Grid Craft | Formula bar and function discovery, grid hierarchy, cell formatting, tables, sort/filter, charts, data tools, formula auditing, print and export. |
| Decks | Deck Craft | Slide canvas, thumbnail navigator, contextual slide/object tools, themes/layouts, alignment, speaker/presenter workflow, slideshow and export. |
| Notes | Word Craft workspace and view patterns | Fast capture, notebook/page hierarchy, readable editor, lightweight formatting, search, organisation, autosave/local persistence and export. Do not force a full word-processor ribbon onto a focused note editor. |
| Database | Grid Craft tables and data analysis | Table/list views, fields and types, record editing, sorting/filtering, relationships where supported, clear schema/data distinction, validation and import/export. |
| Forms | Word Craft content controls and Pdf Craft forms/signing topics | Form builder canvas, question/control palette, required/optional state, field settings, preview, validation and local response handling. Do not imply cloud collection or e-signature services. |
| Lists | Grid Craft tables, sorting and filtering | Fast task/list entry, status and priority, grouping, filters, sorting, keyboard operation, clear empty/completed states and consistent row actions. |
| Planner | Grid Craft data organisation plus Microsoft task-board patterns | Plan navigation, board/list/calendar views where implemented, status grouping, task detail, dates, progress and uncluttered overview. |
| To Do | Focused task-management patterns | Quick add, today/upcoming/completed views where implemented, simple task details, reminders only where supported, keyboard-first completion and clear priorities. |
| Workspace | Fluent 2 app shell and Spectrum 2 app-frame navigation | Coherent multi-product frame, original Suite sidebar, product switching, Home/Apps/Files, active workspace, search, settings and predictable window behaviour. |

Do not add unsupported features just to match a competitor. Mark each item **Implemented and verified**, **Implemented but unverified**, **Partial**, **Not implemented**, or **Not applicable** with evidence.

## Shared visual acceptance checklist

Review the live application, not only source code or documentation. For Suite and every product:

1. **Identity:** original Brightdesk logo/wordmark, product icon, colour use and consistent visual language.
2. **Hierarchy:** clear title, primary task, secondary actions and content focus; no competing headers or duplicate settings.
3. **Navigation:** predictable location, selected state, readable labels, meaningful grouping, keyboard access and window-resize behaviour.
4. **Commands:** important actions visible and consistently placed; contextual actions appear only when relevant; overflow is deliberate.
5. **Workspace:** task-appropriate canvas, side panes and inspectors; no excessive blank areas, clutter, cramped controls or prototype-like cards.
6. **Typography and spacing:** readable type hierarchy, consistent spacing scale, aligned controls, restrained borders/shadows and consistent corner treatment.
7. **States:** default, hover, focus-visible, pressed, selected, disabled, loading, empty, success, warning and error states where applicable.
8. **Accessibility:** keyboard-only completion of core tasks, visible focus, labels/names, contrast, sensible reading order, scalable text and reduced-motion support.
9. **Platform:** Windows, macOS and Linux conventions; window resizing and display scaling; no mobile-app scope.
10. **Quality evidence:** genuine screenshots from the current build, recorded version/commit and OS, plus automated and manual workflow results.

## Suite-specific preservation rules

- Preserve the current Suite layout and the visual elements the owner already likes.
- Keep the existing Adobe-style left sidebar concept. Improve finish, hierarchy, icon/label alignment, selected states and spacing without replacing the overall composition.
- Blend in Fluent-inspired command surfaces, typography, spacing, content hierarchy and predictable controls.
- Avoid a wholesale redesign, generic dashboard template, exaggerated cards, excessive rounded containers or a dense imitation of either vendor.
- Do not alter the existing 192 px sidebar decision without a measured usability reason and review of the current live layout.
- The Suite is the product launcher and shared workspace for the ten products; Brightdesk-AI is internal engineering tooling, not a customer-facing eleventh product.

## Verification and implementation sequence

1. Capture current, genuine screenshots of Suite and each of the ten installed products on the available macOS build. Record version, OS and commit. Add Windows/Linux captures when those builds can be run; do not claim those platforms were visually verified otherwise.
2. Inspect every screen and compare it to this checklist. Record evidence and specific defects by product/screen.
3. Review existing shared design tokens/components before proposing changes. Prefer fixing shared components once over introducing ten inconsistent one-off solutions.
4. Create distinct visual explorations for the Suite refresh and representative product workspaces. Preserve the existing Suite direction when exploring; do not use a new direction as a replacement without owner approval.
5. Apply changes on review branches/PRs, not directly to main. Keep changes scoped and independently testable.
6. Run product-specific tests, shared UI regression checks, build/type checks and exact-head CI.
7. Inspect the actual running applications at relevant desktop sizes. Automated tests and passing builds alone do not establish visual quality.
8. Keep all changes compatible with the permanent Brightdesk constraints: free forever; no accounts, subscriptions, paid tiers, ads, telemetry, analytics, cloud sync/collaboration or customer text uploads; official Brightdesk update endpoints only; local-first and offline use; zero Adobe software/services/dependencies/integrations.

## Current evidence boundary

The available repository information confirms an existing Suite compact-sidebar PR and a separate Microsoft product-parity requirements PR. Those are requirements/source changes, not proof of current visual quality. Product repositories have not yet been visually inspected in running builds in this review. The ten product CI workflows have previously been reported as blocked before test execution when no matching repository runner was assigned. Do not mark the product UI matrix complete until current builds and real screenshots are inspected.

## Sources

- Craft Wiki landing page: https://craft.wiki/
- Word Craft workflows: https://craft.wiki/apps/wordcraft/workflows/
- Grid Craft workflows: https://craft.wiki/apps/gridcraft/workflows/
- Deck Craft workflows: https://craft.wiki/apps/deckcraft/workflows/
- Word Craft languages and spelling: https://craft.wiki/apps/wordcraft/languages/
- Microsoft Fluent 2 layout: https://fluent2.microsoft.design/layout
- Microsoft Fluent 2 navigation usage: https://fluent2.microsoft.design/components/web/react/core/nav/usage/
- Adobe Spectrum 2 app frame: https://spectrum.adobe.com/foundations/app-frame/overview
- Adobe Spectrum 2 side navigation: https://spectrum.adobe.com/web/rsp/components/side-navigation
