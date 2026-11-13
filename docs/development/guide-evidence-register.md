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

This register is maintainer-only. The public website may contain only the help homepage, Suite getting-started page, the ten approved product guides and local CSS. Do not publish repository source links, build notes, this register or other maintainer documents.
