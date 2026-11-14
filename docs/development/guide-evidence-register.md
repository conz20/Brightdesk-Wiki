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

## Customer screenshots and practical examples

Every public product guide should explain the product in plain language, provide numbered steps, include a small example with an expected result, and show genuine application screenshots with concise captions and useful alternative text.

Required genuine screenshot set:
| Area | First capture | Second capture |
| --- | --- | --- |
| Suite | Home showing the ten approved product cards | Apps or a product opened from the Suite |
| Pages | Document with a heading and formatted text | Available export options |
| Sheets | Sample cells with labels and values | Supported SUM formula and calculated total |
| Decks | Presentation with multiple slides | Slide Show running |
| Notes | Titled note with inserted content | Available export action |
| Database | Table with named fields | Sample record and record search |
| Forms | Questions view with sample questions | Preview or saved sample response |
| Lists | List with a custom column | Search or filter results |
| Planner | Plan with buckets and tasks | Task card showing progress |
| To Do | My Day with sample tasks | Important or Completed view |
| Workspace | Workspace page with content blocks | Checklist with an item completed |

Capture images only from the actual running desktop product. Record product version, operating system and exact build or commit for every capture. Use fictional sample information. Remove personal information, local file paths and account details before publishing. Never present a design SVG, mock-up, generated illustration, HTML rendering or promotional collage as a genuine software screenshot. When a real capture is unavailable, keep the guide marked as needing review and do not show a fake substitute.

The practical examples added to the customer guides are text instructions with expected outcomes. They are not screenshots and do not promote the guide to Verified.

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

This register is maintainer-only. The public website may contain only the help homepage, Suite getting-started page, the ten approved product guides, local CSS and the single audited local search module. Do not publish repository source links, build notes, this register or other maintainer documents.


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

## Source revalidation — 14 November 2026

A fresh read-only check against the current `main` branches of the Suite and all ten product repositories was completed on 14 November 2026. The implementation-module blob identifiers below match the source snapshot identifiers recorded in the 13 November source review. The current product-page HTML identifiers are recorded alongside them so that future reviews can identify which interface markup was inspected.

| Customer guide | Current `src/index.html` blob SHA on product `main` | Current supporting implementation blob SHA on product `main` |
| --- | --- | --- |
| Pages | `2a97fd47c4c4db9671d74b3a1b4c3a792439aa29` | `src/app.js` — `f499a20e8bf1283e67f50f73c6aeda5fb52a0c3b` |
| Sheets | `5742f40cdf78f70e5c8d22f755df0020390db8f7` | `src/app.js` — `0a7643a1fa406775b23fa54ff2421c7107d1d9fd` |
| Decks | `d9fe05b7251e3656569be675fa030dac95400df0` | `src/app.js` — `7c24d368e62761aad95dd672bfe3529018fa9ae4` |
| Notes | `ab33cc214ae8cb8171fdb6d40b43f9b5b1821dce` | `src/app.js` — `08e3c08967e7fe24ee268cd8c0e4f237c40d6c68` |
| Database | `f0aaa30f752883507686f94abfb9f4a4e2a708` | `src/database-service.js` — `1eefab8c225cf6e4eae426305ee0378838681e41` |
| Forms | `3d6a79451fbb52ceb3162a7a66a0b99b536df6ed` | `src/forms-service.js` — `d925764977a79ec6b7d79af5e1a0d6e08ab9d8e4` |
| Lists | `dfe890c6b25d0d3c9a87e233fa8e19f25185431c` | `src/lists-service.js` — `ae3aebadd3194af4846c80fe58a2f1c98c88c57f` |
| Planner | `0e5eed092577288e972ccb11c149297aaa109ed9` | `src/planner-service.js` — `6b05218a71f0f0d63beebdf20decae5ea112f7fc` |
| To Do | `0e5eed092577288e972ccb11c149297aaa109ed9` | `src/todo-service.js` — `34e048b651dfdd50cb8b3292c660e1dbd57fe7f8` |
| Workspace | `0e5eed092577288e972ccb11c149297aaa109ed9` | `src/workspace-service.js` — `a5a73ac3b727064f43fde0a14320fe2f594a5ba7` |

The Suite getting-started guide's relevant current source references were also checked: `src/index.html` (`fccb5fb0c38b535c2eb7d408abd2312e4c34f00c`), `src/main.js` (`8436ba07165824851d5e1fc1cc19670ac7ab78f9`), `src/app.js` (`6f08131b743ce6453d1b34130ec38feee67ab7fa`), `src/app-catalog.js` (`75c760ce4d555c16fcff51d4fd03a1318f5c2921`) and the current `README.md` (`e03bcb28e0e223404ef5b7317aa97bb2ba313212`). The Suite README confirms that the product cards manage Suite availability and that **Open** creates a product's own window without replacing the Suite Home, Apps or Files window.

**Scope of this revalidation:** this was read-only source inspection and blob-identifier comparison. It confirms the recorded source snapshots have not changed; it does not establish that the visible interface is identical in a running build, that a workflow succeeds end to end, or that a screenshot has been captured.

**Customer guide status is unchanged:** the Suite guide remains `Source-confirmed`; all ten product guides remain `Needs review`. Do not promote any guide to `Verified` until the complete workflow has been run in a current installed build and its product version, operating system, build/commit and genuine screenshots have been recorded.

