# Brightdesk Wiki visual asset library

This directory is the source-controlled visual library for the Brightdesk Help website.

## Asset rules

- Prefer original, accessible SVG illustrations for diagrams, concepts, and reusable visual elements.
- Keep SVGs self-contained: no remote images, fonts, scripts, CSS imports or external references.
- Use descriptive filenames and include useful alternative text in any guide that embeds an asset.
- Keep illustrations clearly labelled as illustrations. Never present concept artwork as a product screenshot.
- Product screenshots must be genuine captures from a current running Brightdesk build. Record product, version, operating system, capture date and workflow. Until those captures are available, use a clearly marked placeholder or omit the screenshot.
- Do not include customer data, personal information, secrets, internal endpoints or private development details in public-facing assets.
- Keep original Brightdesk visual identity. Do not use Microsoft or Adobe logos, proprietary artwork or copied interface assets.

## Current library

| Asset | Purpose |
| --- | --- |
| `illustrations/brightdesk-suite-map.svg` | A detailed overview of Brightdesk Suite and exactly ten approved products |
| `illustrations/offline-first-privacy.svg` | Explains local-first document handling and the separate official update channel |
| `illustrations/help-workflow.svg` | Shows how readers find a guide and check its evidence status |
| `icons/README.md` and `icons/*.svg` | Ten original, distinctive product icons; byte-for-byte public copies are stored in `docs/assets/images/product-icons/` |
| `illustrations/workflows/README.md` and `guide-*.svg` | Ten product-specific workflow illustrations; byte-for-byte public copies are stored in `docs/assets/images/workflows/` |

The product icon pack uses one consistent 128 × 128 design system. Each icon is a separate SVG with its own accessible title and description. Each workflow illustration has its own three-step product scene. See the icon and workflow indexes for their visual concepts and usage rules.

## Source and publication boundaries

The larger Suite, privacy and Help-journey illustrations are maintained in this source library. They are not currently approved for publication in the generated customer site. Public output remains restricted to the twenty named product icons and workflow diagrams. Do not expand that allowlist without reviewing the SVG content, accessibility, layout, generated-site behaviour and regression tests.

The generated customer site checks that every approved public copy matches its canonical source byte for byte. The public-output checker restricts SVG elements and attributes, requires accessible titles and descriptions, rejects active content and external references, limits diagram typography to the local Arial/sans-serif fallback, and checks each product guide's two local images and meaningful alternative text.

## Screenshot status

The current library contains explanatory illustrations, not genuine product screenshots. No genuine screenshots from current running Brightdesk Suite and product builds were available during this asset-library update. Do not substitute these illustrations for screenshots. Capture and document genuine product evidence separately when current builds can be run.

Add new assets here as the library grows. Update this index whenever an asset is added, replaced or retired.
