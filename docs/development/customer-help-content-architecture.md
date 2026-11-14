# Brightdesk Help content architecture

**Status:** Implementation guide for the Brightdesk Help redesign  
**Research input:** Owner-supplied Craft Wiki product and guide URLs, reviewed 14 November 2026  
**Scope:** The Brightdesk Suite and exactly ten customer products

## Audience paths

Brightdesk Help must serve three reading intentions without creating separate websites:

1. **I just need to do something.** Everyday Help stays plain-English, task-first and short.
2. **I am learning the product.** Each product page is a home for its overview, getting-started path, workflow topics, examples, common questions and related guides.
3. **I want to understand or research it.** Technical Documentation is the deeper path for system behaviour, file formats, data boundaries, product models, capabilities and limitations.

The homepage search remains prominent. Search is local in the visitor's browser; Everyday Help and Technical Documentation keep independent search indexes.

## Guide families

| Guide type | Brightdesk location | Purpose |
| --- | --- | --- |
| Homepage and search | Help homepage | Find a product, task or reading area quickly |
| Product overview | Each of the ten product pages | Explain purpose and current boundaries |
| Getting started | Each product page and Suite guide | First-use steps and expected results |
| Workflow guides | Product page sections or focused standalone pages | Instructions for one task |
| Install and update | Shared Suite guide | Official Suite install, workspaces and truthful update status |
| Languages and spelling | Shared guide | Display/proofing language and official packs/dictionaries |
| Troubleshooting | Shared directory plus each product FAQ | Route symptoms to safe, product-specific help |
| Recovery and repair | Only after verification | Publish only after exact procedures are verified |
| Specialist topic | When current Brightdesk features justify it | A distinct task such as Decks slide shows |
| Technical reference | Technical Documentation | Behaviour, formats, data models and limitations |

A dedicated article is not required for every topic. Keep short workflows inside the product home; create a separate route when the task merits its own instructions and navigation.

## Product guide coverage map

| Product | Everyday guide focus | Deeper reading |
| --- | --- | --- |
| Pages | Write, format, lay out, review, save and export documents | Page model, supported formats and compatibility limits |
| Sheets | Enter values, use supported formulas and export | Formula engine, six confirmed functions and calculation boundaries |
| Decks | Create slides, organise, theme, present and export | Slide operations, themes, file support and slide-show guide |
| Notes | Capture text, dates and checklist markers, export and clear notes | Content elements, local storage and export formats |
| Database | Create tables, fields and records; search, sort and export CSV | Field types, record model, deletion and local data |
| Forms | Create forms, add questions, preview and review local responses | Question model, required/choice rules and deletion behaviour |
| Lists | Create lists, manage records/columns, search, filter and sort | Record fields, custom columns and status filters |
| Planner | Create plans, buckets and tasks; update status and filter | Plan/bucket/task model and task-card limits |
| To Do | Add tasks, organise My Day, mark important and complete | Task fields, views, ordering and local data |
| Workspace | Create workspaces/pages and add text, headings, callouts and checklists | Page/block model, search and deletion safeguards |

Use exact current control labels and source/build evidence. Do not infer feature parity from WordCraft, GridCraft, DeckCraft or another product.

## Shared guide decisions

Installation, workspace management, updates and repair guidance belongs at Suite level. The ten products are workspaces managed inside Brightdesk Suite. The update-publishing provider is not configured, so update delivery is not active or verified. Repair steps remain unpublished until verified for each claimed operating system.

Language controls are shared. Display language changes menus; proofing language selects spelling-check language; language packs and dictionaries are separate resources. Spelling checks apply to Pages, Sheets, Decks and Notes where the required dictionary is installed. Use only official Brightdesk language-resource routes.

Troubleshooting provides safe first steps and links to product-specific common questions. It must not recommend deleting local data, removing a product or resetting files as generic repair.

## Specialist guides and exclusions

The first specialist route is Decks slide shows. It documents only the current confirmed path: select a slide, choose **Slide Show → From current slide**, navigate by click or arrow keys, press **Esc** to leave.

Do not add customer-facing AI-agent, Zotero, advanced Presenter View, laser-pointer, timing, animation or collaboration instructions unless a Brightdesk customer release implements and verifies those features. Brightdesk-AI is private engineering tooling, not a customer product or customer-facing AI assistant. A document-recovery or repair guide must wait for a verified Brightdesk workflow.

## Research path

Technical Documentation should lead readers from Suite/system overview to file formats, data/privacy, then product references. Use definitions, scoped examples, comparison tables and explicit supported / unsupported / not-yet-verified distinctions. Link back to plain-English workflows.

## Acceptance checklist

- [ ] Homepage search remains prominent, keyboard accessible and local.
- [ ] Everyday Help and Technical Documentation retain separate local search.
- [ ] Homepage and Everyday Help link to shared guide families.
- [ ] Every product home links to its technical reference.
- [ ] Specialist guides describe only evidence-backed Brightdesk features.
- [ ] Every guide has a route back to its product or help-area home.
- [ ] Ten approved product names remain unchanged; Brightdesk-AI stays outside customer product navigation.
- [ ] Public output contains only explicitly approved pages and assets.
