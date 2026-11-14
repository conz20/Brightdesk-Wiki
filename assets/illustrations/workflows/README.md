# Brightdesk product workflow illustrations

This folder holds the canonical, original workflow diagrams for the ten approved Brightdesk customer products.

## Included diagrams

| File | Product | Workflow shown |
| --- | --- | --- |
| `guide-pages.svg` | Pages | Create a document → write and format → save or export |
| `guide-sheets.svg` | Sheets | Enter data → add a formula → check the result |
| `guide-decks.svg` | Decks | Add slides → arrange content → present |
| `guide-notes.svg` | Notes | Create a note → capture an idea → keep a copy |
| `guide-database.svg` | Database | Create a table → choose fields → add records |
| `guide-forms.svg` | Forms | Create a form → add questions → preview the form |
| `guide-lists.svg` | Lists | Create a list → add items and columns → search, filter or sort |
| `guide-planner.svg` | Planner | Create a plan → add buckets and tasks → track progress |
| `guide-to-do.svg` | To Do | Open My Day → add tasks → mark finished work complete |
| `guide-workspace.svg` | Workspace | Create a workspace → add pages and blocks → use a checklist |

## Asset and accessibility rules

- These are explanatory diagrams, not screenshots or representations of a captured product interface.
- Each SVG includes a descriptive `title` and `desc` linked by `aria-labelledby`.
- Diagram text uses the local system's Arial/sans-serif fallback. No web fonts, images, scripts, or external resources are loaded.
- Each matching customer guide includes meaningful alternative text and a visible note that the workflow is illustrative.
- Keep diagram steps aligned with the corresponding guide. Update the source SVG and the public copy together.
- The public copy lives at `docs/assets/images/workflows/guide-<product>.svg` and must remain byte-for-byte identical to the canonical source. The automated regression test checks this.
- Do not label these diagrams as verified workflows. Product guides remain **Needs review** until current installed desktop workflows are run.

## Screenshot evidence

Genuine screenshots from current running Brightdesk builds are still outstanding. Do not use these workflow diagrams as substitutes. A genuine screenshot must record product, version, operating system, capture date and the workflow captured, and must be reviewed for private information before publication.
