# Brightdesk Wiki visual asset library

This directory is the source-controlled visual library for the Brightdesk Help website.

## Asset rules

- Prefer original, accessible SVG illustrations for diagrams, concepts, and reusable visual elements.
- Keep SVGs self-contained: inline styles, no remote images, fonts, scripts, or external references.
- Use descriptive filenames and include useful alt text in the guide that embeds each asset.
- Keep illustrations clearly labelled as illustrations. Never present concept artwork as a product screenshot.
- Product screenshots must be genuine captures from a current running Brightdesk build. Record product, version, operating system, capture date, and workflow. Until those captures are available, use a clearly marked placeholder or omit the screenshot.
- Do not include customer data, personal information, secrets, internal endpoints, or private development details in public-facing assets.
- Keep original Brightdesk visual identity. Do not use Microsoft or Adobe logos, proprietary artwork, or copied interface assets.

## Current library

| Asset | Purpose |
| --- | --- |
| `illustrations/brightdesk-suite-map.svg` | Explains the Suite and its ten approved products |
| `illustrations/offline-first-privacy.svg` | Explains local-first document handling and privacy boundaries |
| `illustrations/help-workflow.svg` | Shows a simple help-guide workflow |
| `icons/README.md` and `icons/*.svg` | Ten original, product-specific icons for Pages, Sheets, Decks, Notes, Database, Forms, Lists, Planner, To Do, and Workspace |

The product icon pack uses one consistent 128 × 128 design system. Each icon is a separate SVG with its own accessible title and description. See [the icon-set guide](icons/README.md) for the full file list and usage rules.

## Publication and screenshot status

The illustrations and icons in this directory are source-library assets. They are not genuine screenshots and must not be described as such.

The current `main` branch's generated-site allowlist permits only the approved HTML and CSS output. Do not copy these SVG files into the customer site or link to them from customer pages until the SVG allowlist, SVG content checks, image-alt checks and regression tests have been deliberately updated and passed on the exact branch head. The open visual-redesign PR contains a separate SVG-publication implementation; keep this branch's safety gate intact until that work is reviewed and merged.

No genuine screenshots from current running Brightdesk Suite and product builds were available during this asset-library update. Do not substitute these illustrations for screenshots. Capture and document genuine product evidence separately when current builds can be run.

Add new assets here as the library grows. Update this index whenever an asset is added, replaced, or retired.
