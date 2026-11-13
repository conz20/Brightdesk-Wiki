# Brightdesk portfolio architecture

Brightdesk is developed as a coordinated family of ten customer products, an integrated desktop Suite, and shared engineering foundations. Repository count is an inventory measure, not proof that every repository is implemented or consumed.

## Customer-facing scope

The approved product scope is fixed at ten products: Pages, Sheets, Decks, Notes, Database, Forms, Lists, Planner, To Do and Workspace. Brightdesk-suite coordinates the customer-facing desktop experience, product management, local file workflows and release process. Each product repository remains the owner of its own product implementation and tests; an individual product window should open directly into that product's workspace.

## Supported desktop platforms

The Suite and all ten products are desktop software for **Windows, macOS and Linux**. Android, iOS, iPhone, iPad and other mobile targets are not supported or planned. Do not add mobile application projects, mobile build targets, or mobile installers. Responsive layouts that accommodate different desktop window sizes remain valid; they are not separate mobile editions.

## Repository inventory

The current portfolio contains **27 private repositories**: one Suite, exactly ten customer products, one separate Brightdesk-AI engineering repository, and fifteen shared, engineering and supporting repositories. See the [27-repository inventory](repository-inventory.md) for the full list and purpose of each repository. This count does not create additional customer products.

## Shared engineering infrastructure

- **Brightdesk-Design-System** — shared visual tokens, navigation states, accessible components and product-window shell rules.
- **Brightdesk-Fonts** — font source/provenance and licence metadata; no font may be bundled without explicit redistribution and embedding review.
- **Brightdesk-Localization** — language catalogues, regional conventions, dictionary-pack licensing and offline language-resource metadata.
- **Brightdesk-Engine** — shared Rust/native performance primitives and their language bindings.
- **Brightdesk-Common-Libs** — small reusable, language-specific libraries with documented contracts and verified consumers.
- **Brightdesk-Common-Actions** — reusable, pinned non-AI GitHub Actions and CI components.
- **Brightdesk-Developer-Tools** — local developer diagnostics, utilities, SDKs and documented setup aids.
- **Brightdesk-Extensions** — declarative extension manifests and permission contracts; a validated manifest is not a runtime or permission-enforcement system.
- **Brightdesk-Wiki** — private Markdown source for a separate customer-help website; Cloudflare Pages Free is owner-approved but not yet connected or deployed. The help site is not installed or required by customer software.
- **Brightdesk-Release-Tools** — read-only release manifests, artifact inventories, checksum validation and release evidence.
- **Brightdesk-Assets** — approved local visual assets, provenance, rights evidence, attribution and integrity validation; it is not a CDN or runtime asset service.
- **Brightdesk-Type-Preview** — local font-preview and installed-font metadata contracts; it is not a hosted font service and does not own font binaries.
- **Brightdesk-Printing** — shared local-first printing integration; discovery does not itself prove that a printer queue is configured or usable.
- **Brightdesk-Voice** — separate private audio research and prototype infrastructure; no customer-product integration or release is approved.

**Optional experiment:** **Brightdesk-Services** is owner-operated, loopback-only engineering experimentation. It is never a customer runtime requirement and must not provide customer document storage, cloud synchronisation, online collaboration or remote AI.

## Engineering control plane

Brightdesk-AI is a private engineering control plane, not a customer product. It can audit source and coordinate permitted developer workflows. It must not be bundled into customer installers or become a customer sign-in, account, model-provider or subscription requirement.

## Dependency principles

Products may consume a shared foundation only after its source, tests, versioning, licensing and compatibility have been verified. Keep local fallback behavior where the product design requires it. A README link or a repository existing does not prove integration. Record the exact consuming product, commit and passing contract test before calling a shared dependency adopted.

## Design and vendor boundaries

Microsoft productivity conventions are the primary product inspiration. Brightdesk uses original code, product identities, layouts and artwork. Adobe products and services are not dependencies, bundled items, integrations or requirements. Brightdesk excludes Outlook, OneDrive and Teams from its approved product scope.

See the [Suite developer ecosystem architecture plan](https://github.com/conz20/Brightdesk-suite/blob/main/docs/DEVELOPER_ECOSYSTEM_ARCHITECTURE.md) and [Brightdesk visual standard](https://github.com/conz20/Brightdesk-suite/blob/main/docs/BRIGHTDESK_VISUAL_STANDARD.md) for the canonical contracts.
