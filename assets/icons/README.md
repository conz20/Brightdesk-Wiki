# Brightdesk product icon set

This folder contains the original Brightdesk product icon pack. Each icon is a separate, self-contained SVG with a consistent 128 × 128 view box and an accessible title and description.

## Included icons

| File | Product | Visual concept |
| --- | --- | --- |
| `pages.svg` | Pages | Document sheet and text lines |
| `sheets.svg` | Sheets | Spreadsheet grid and highlighted cell |
| `decks.svg` | Decks | Presentation slide and chart |
| `notes.svg` | Notes | Note sheet and pencil |
| `database.svg` | Database | Structured record cylinder |
| `forms.svg` | Forms | Questions and response choices |
| `lists.svg` | Lists | Ordered checklist rows |
| `planner.svg` | Planner | Three-column planning board |
| `to-do.svg` | To Do | Completed and unfinished task rows |
| `workspace.svg` | Workspace | Page, note and checklist blocks |

## Use and accessibility

- Use the icon as a supporting visual next to the product's visible text label.
- When the nearby text already names the product, use empty alternative text (`alt=""`) so assistive technology does not announce the same name twice.
- When the icon is used without a visible text label, provide meaningful alternative text such as `Brightdesk Pages`.
- Keep the SVG's `title` and `desc` elements when adapting an icon.
- Preserve the 128 × 128 view box, clear silhouette and readable contrast at small sizes.
- Do not recolour or combine icons in ways that confuse the product distinctions.

## Publication status

These are approved original source-library illustrations, not screenshots of the Brightdesk interface. On the current `main` branch, the generated customer-site allowlist does not yet permit SVG files. Keep this icon pack in the source library until the public-output checker and tests are deliberately updated and pass on the exact branch head. Do not link these files from customer pages before that gate is in place.

No external images, font files, scripts, CSS imports or remote references are used.
