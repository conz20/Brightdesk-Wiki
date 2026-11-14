# Customer guide evidence register

**Internal maintainer document — never publish.** The public-site allowlist must continue to exclude `docs/development/`.

**Review date:** 13 November 2026

## Current customer-facing status

- The Suite getting-started guide is `Source-confirmed`; its source and tests support the documented navigation, but a full end-to-end walkthrough is still outstanding.
- All ten product guides remain `Needs review`. Source inspection is not a substitute for running each workflow in a current installed desktop build.
- No product guide may be changed to `Verified` based only on README text, design artwork, source code or a successful automated build.
- Do not add a screenshot unless it is captured from the actual running product and its version/platform are recorded.

## Product guide source map

| Customer guide | Primary source checked on `main` | Supporting source |
| --- | --- | --- |
| Pages | [Brightdesk-Pages `src/index.html`](https://github.com/conz20/Brightdesk-Pages/blob/main/src/index.html) | [Brightdesk-Pages `src/app.js`](https://github.com/conz20/Brightdesk-Pages/blob/main/src/app.js) |
| Sheets | [Brightdesk-Sheets `src/index.html`](https://github.com/conz20/Brightdesk-Sheets/blob/main/src/index.html) | [Brightdesk-Sheets `src/app.js`](https://github.com/conz20/Brightdesk-Sheets/blob/main/src/app.js) |
| Decks | [Brightdesk-Decks `src/index.html`](https://github.com/conz20/Brightdesk-Decks/blob/main/src/index.html) | [Brightdesk-Decks `src/app.js`](https://github.com/conz20/Brightdesk-Decks/blob/main/src/app.js) |
| Notes | [Brightdesk-Notes `src/index.html`](https://github.com/conz20/Brightdesk-Notes/blob/main/src/index.html) | [Brightdesk-Notes `src/app.js`](https://github.com/conz20/Brightdesk-Notes/blob/main/src/app.js) |
| Database | [Brightdesk-Database `src/index.html`](https://github.com/conz20/Brightdesk-Database/blob/main/src/index.html) | [Database feature specification](https://github.com/conz20/Brightdesk-Database/blob/main/docs/apps/DATABASE-SPEC.md) |
| Forms | [Brightdesk-Forms `src/index.html`](https://github.com/conz20/Brightdesk-Forms/blob/main/src/index.html) | [Forms feature specification](https://github.com/conz20/Brightdesk-Forms/blob/main/docs/apps/FORMS-SPEC.md) |
| Lists | [Brightdesk-Lists `src/index.html`](https://github.com/conz20/Brightdesk-Lists/blob/main/src/index.html) | [Lists feature module](https://github.com/conz20/Brightdesk-Lists/blob/main/src/lists-service.js) |
| Planner | [Brightdesk-Planner `src/index.html`](https://github.com/conz20/Brightdesk-Planner/blob/main/src/index.html) | [Planner feature module](https://github.com/conz20/Brightdesk-Planner/blob/main/src/planner-workspace.js) |
| To Do | [Brightdesk-To-Do `src/index.html`](https://github.com/conz20/Brightdesk-To-Do/blob/main/src/index.html) | [To Do feature module](https://github.com/conz20/Brightdesk-To-Do/blob/main/src/todo-service.js) |
| Workspace | [Brightdesk-Workspace `src/index.html`](https://github.com/conz20/Brightdesk-Workspace/blob/main/src/index.html) | [Workspace feature module](https://github.com/conz20/Brightdesk-Workspace/blob/main/src/workspace-editor.js) and [Workspace specification](https://github.com/conz20/Brightdesk-Workspace/blob/main/docs/apps/WORKSPACE-SPEC.md) |

## Source conflict to keep visible

The Workspace repository's current README, committed `src/index.html`, `src/workspace-editor.js` and `docs/apps/WORKSPACE-SPEC.md` describe an implemented local desktop workflow. Its older `docs/DESIGN_BRIEF.md` still says **Scaffold only** and claims there is no runnable source. That statement conflicts with the newer source and README. Treat the design-brief status as stale; do not repeat it in customer help. The customer guide still remains `Needs review` until the running desktop workflow is tested.

## Required walkthrough before a guide is promoted

1. Record the product version, operating system and exact build/commit tested.
2. Launch the product from its supported entry point and confirm the screen labels match the guide.
3. Complete every documented create/edit/organise/export workflow that is claimed by the guide.
4. Close and reopen the product; confirm local work is retained where the guide says it is saved locally.
5. Test destructive actions only with disposable test data and confirm the warning/confirmation behaves as documented.
6. Confirm all stated unavailable/planned boundaries still match the product scope.
7. Capture genuine screenshots only from the running build, then review them for real data, private paths and unintended personal information.
8. Update the guide status only after the evidence is recorded. If any step differs, fix the customer instructions first and leave the guide `Needs review`.

## Release boundary

This register is maintainer-only. The current PR #6 draft public-output allowlist is 31 HTML pages, 24 local assets and one `_headers` policy file (56 files total). This includes the Help homepage, Everyday Help, Suite guide, shared topic guides, ten product guides, the Decks slide-show guide and Technical Documentation. Do not publish repository source links, build notes, this register or other maintainer documents.


## Source review update — 13 November 2026

This was a read-only source review against each product repository's current `main` branch. It checks whether the guide's documented controls and data rules are represented in code. It is **not** a desktop walkthrough and does not promote any guide to `Verified`.

| Guide | Source behaviours confirmed |
| --- | --- |
| Pages | Page layout supports A4, US Letter and US Legal, portrait/landscape, and Normal/Narrow/Moderate/Wide margins. The editor source includes the PDF export action described by the guide. |
| Sheets | The formula engine parses cell references and ranges, arithmetic, and the six named functions listed in the guide: SUM, AVERAGE, MIN, MAX, COUNT and COUNTA. |
| Decks | The editor source contains the New slide, Duplicate, Delete, Title slide and Text slide controls; Lavender, Midnight and Paper themes; and the Slide Show action for the current slide. |
| Notes | The editor source confirms Date, Divider and Checklist item insertion, Export note and a confirmation prompt before Clear note. |
| Database | The workspace uses device-local storage and provides record search/sort and CSV export. The service protects the final table and the system ID field. |
| Forms | The workspace supports Questions, Preview and Responses. Deleting a question removes that question's answer from each saved response; the guide's warning is accurate. |
| Lists | The service confirms the five starting columns (Title, Status, Priority, Due date and Notes) and custom Text, Date and Choice columns. |
| Planner | The service prevents deleting the final bucket. Deleting another bucket moves its tasks to a remaining bucket. The task card editor exposes title editing separately from the progress selector, as the guide states. |
| To Do | The task service confirms due dates, Low/Normal/High priority, completion state and the Planned view's due-date filter. |
| Workspace | The service protects the final page and final workspace. Page search checks titles and block content, and checklist items have their own completion state. |

### Source snapshot identifiers

The following blob SHAs identify the key modules inspected for this review. They are source references, not release/build identifiers.

| Product | File on `main` | Blob SHA |
| --- | --- | --- |
| Pages | `src/page-layout.js` | `9777090bbbd01fee1b2789c703619dc8faa87859` |
| Pages | `src/app.js` | `f499a20e8bf1283e67f50f73c6aeda5fb52a0c3b` |
| Sheets | `src/formula.js` | `4b75569239c9834308f77815392b98d7371ea459` |
| Decks | `src/app.js` | `7c24d368e62761aad95dd672bfe3529018fa9ae4` |
| Notes | `src/app.js` | `08e3c08967e7fe24ee268cd8c0e4f237c40d6c68` |
| Database | `src/database-service.js` | `1eefab8c225cf6e4eae426305ee0378838681e41` |
| Forms | `src/forms-service.js` | `d925764977a79ec6b7d79af5e1a0d6e08ab9d8e4` |
| Lists | `src/lists-service.js` | `ae3aebadd3194af4846c80fe58a2f1c98c88c57f` |
| Planner | `src/planner-service.js` | `6b05218a71f0f0d63beebdf20decae5ea112f7fc` |
| To Do | `src/todo-service.js` | `34e048b651dfdd50cb8b3292c660e1dbd57fe7f8` |
| Workspace | `src/workspace-service.js` | `a5a73ac3b727064f43fde0a14320fe2f594a5ba7` |

**Outcome:** the inspected source supports the behaviours above. All ten guides remain `Needs review` until the documented workflows are run in current installed desktop builds. No screenshots, publication, Pages configuration, PR approval or merge were performed.

## Source snapshot recheck — 14 November 2026

The source files listed in the 13 November snapshot table were fetched again from the current `main` branch of each owning product repository on 14 November 2026. All eleven file blob SHAs still match the recorded values exactly:

| Product | File checked | Current blob SHA | Result |
| --- | --- | --- | --- |
| Pages | `src/page-layout.js` | `9777090bbbd01fee1b2789c703619dc8faa87859` | Unchanged |
| Pages | `src/app.js` | `f499a20e8bf1283e67f50f73c6aeda5fb52a0c3b` | Unchanged |
| Sheets | `src/formula.js` | `4b75569239c9834308f77815392b98d7371ea459` | Unchanged |
| Decks | `src/app.js` | `7c24d368e62761aad95dd672bfe3529018fa9ae4` | Unchanged |
| Notes | `src/app.js` | `08e3c08967e7fe24ee268cd8c0e4f237c40d6c68` | Unchanged |
| Database | `src/database-service.js` | `1eefab8c225cf6e4eae426305ee0378838681e41` | Unchanged |
| Forms | `src/forms-service.js` | `d925764977a79ec6b7d79af5e1a0d6e08ab9d8e4` | Unchanged |
| Lists | `src/lists-service.js` | `ae3aebadd3194af4846c80fe58a2f1c98c88c57` | Unchanged |
| Planner | `src/planner-service.js` | `6b05218a71f0f0d63beebdf20decae5ea112f7fc` | Unchanged |
| To Do | `src/todo-service.js` | `34e048b651dfdd50cb8b3292c660e1dbd57fe7f8` | Unchanged |
| Workspace | `src/workspace-service.js` | `a5a73ac3b727064f43fde0a14320fe2f594a5ba7` | Unchanged |

This confirms that the source snapshot identifiers remain current. It does not add new workflow verification, build evidence or screenshots. All ten guides remain **Needs review** until the required running-desktop walkthroughs are complete.


## Public-output boundary recheck — 15 November 2026

The current PR #6 branch expands the customer site from the earlier 12-page structure to the exact 31-page / 24-local-asset / one-headers-file allowlist (56 files total). The source allowlist and regression fixture were updated for this draft. This is a draft branch boundary only: it is not evidence that the current-head build or generated-output audit has passed. Keep this register private and retain all ten product guides as **Needs review** until their running-desktop walkthroughs are completed.
