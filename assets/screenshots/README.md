# Brightdesk screenshot evidence plan

**Purpose:** record genuine screenshots from the running Brightdesk desktop software. This file is an internal source-library checklist; it is not customer guidance and must not be included in the generated Help site.

## Current evidence status

**Verified screenshots: 0 of 11.**

The audit on 14 November 2026 checked the default branches of Brightdesk Suite and the ten approved product repositories, their committed visual assets and available recent build-workflow artifact listings. The product SVGs found are design references or preview artwork, not screenshots captured from a running application. The Suite's older `assets/hero-showcase.png` is explicitly described by its README as a composed promotional collage, not screenshot evidence. The checked CI artifact listings contained no screenshot bundles.

Do not rename, crop, export, or relabel any existing SVG design reference or promotional collage to make it appear to be a screenshot.

## Capture checklist

For every image:

1. Build the current approved commit with the repository's pinned Node.js **24.22.2** toolchain and launch the actual Electron desktop build on the operating system being recorded.
2. Use a disposable test profile and clearly fictional sample content. Never use a maintainer's real profile, personal files, customer content, credentials, access tokens or real contact details.
3. Complete and inspect the visible workflow before capture. Confirm the intended product name, icon, workspace, primary controls and saved/local status are correct. A successful package build alone is not workflow verification.
4. Capture the real application window directly from the running build. Keep the whole product window and readable controls visible. Do not composite windows, add controls, paint over errors, recreate the interface, or substitute SVG preview artwork.
5. Review the image for personal information, secrets, development tools, debug overlays, error dialogs and unrelated desktop clutter. Reject or recapture anything that fails.
6. Save the original PNG in the owning repository's `assets/screenshots/` folder using the filename below. Keep the unmodified source capture.
7. Complete `evidence-template.json` alongside the image. Record the exact product version, source commit, operating system/version/architecture, capture timestamp with timezone, workflow exercised, sample-data description, and SHA-256 of the original image.
8. Keep the screenshot marked **not verified** until the evidence record and visible workflow have been reviewed. A capture from one operating system does not verify another operating system.

## Required first capture set

| Target | Owning repository | Required filename | Workflow to show | Status |
| --- | --- | --- | --- | --- |
| Suite | `Brightdesk-suite` | `suite-workspace.png` | Suite Home: show the ten product cards and the single suite-wide Settings control. | Not captured |
| Pages | `Brightdesk-Pages` | `pages-workspace.png` | Open a sample document, apply a heading and text formatting, and show the document canvas. | Not captured |
| Sheets | `Brightdesk-Sheets` | `sheets-workspace.png` | Show a small sample grid, a working formula and its calculated result. | Not captured |
| Decks | `Brightdesk-Decks` | `decks-workspace.png` | Show a multi-slide sample presentation with the slide navigator and editing canvas. | Not captured |
| Notes | `Brightdesk-Notes` | `notes-workspace.png` | Show a sample note with a title and formatted content. | Not captured |
| Database | `Brightdesk-Database` | `database-workspace.png` | Show a sample table with named fields and several fictional records. | Not captured |
| Forms | `Brightdesk-Forms` | `forms-workspace.png` | Show the question editor or form preview with fictional sample questions. | Not captured |
| Lists | `Brightdesk-Lists` | `lists-workspace.png` | Show a sample list with visible columns, records and a useful status. | Not captured |
| Planner | `Brightdesk-Planner` | `planner-workspace.png` | Show a sample plan with task cards, buckets or a timeline. | Not captured |
| To Do | `Brightdesk-To-Do` | `to-do-workspace.png` | Show My Day with fictional tasks and a visible completion state. | Not captured |
| Workspace | `Brightdesk-Workspace` | `workspace-workspace.png` | Show a sample project page with content blocks and a checklist. | Not captured |

The shared naming pattern is `assets/screenshots/<product>-workspace.png`; the Suite uses `suite-workspace.png`. Keep these captures in their owning application repositories first. The Wiki may use a copy only after the evidence has passed review.

## Wiki publication gate

The customer Help website currently permits exactly twenty product SVGs: ten product icons and ten workflow illustrations. These are the only image assets currently approved for generated customer output. Do not add screenshot files to `docs/assets/images/`, product guides or the public output allowlist until all of the following are complete:

- The original capture and metadata are present in the owning repository.
- The image is demonstrably from the named current Electron build and source commit.
- The visible primary workflow was run and checked on the recorded operating system.
- The image has been reviewed for private information and misleading visual content.
- The public copy has a descriptive alternative text and is reviewed at desktop and narrow widths.
- The generated-site checker and regression tests are intentionally updated to allow only the reviewed screenshot files.

Until that gate is met, keep product guides marked **Needs review** where the complete running-product workflow has not been verified. This checklist does not approve or publish any screenshot.

## Evidence metadata

Copy `evidence-template.json` once for each screenshot. Leave the status as `not-captured` until a genuine image exists; never fill missing build or capture details by guessing.
