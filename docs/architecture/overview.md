# Brightdesk portfolio architecture

Brightdesk is developed as a coordinated family of ten customer products, an integrated desktop Suite, and shared engineering foundations. Repository count is an inventory measure, not proof that every repository is implemented or consumed.

## Customer-facing scope

The approved product scope is fixed at ten products: Pages, Sheets, Decks, Notes, Database, Forms, Lists, Planner, To Do and Workspace. Brightdesk-suite coordinates the customer-facing desktop experience, product management, local file workflows and release process. Each product repository remains the owner of its own product implementation and tests; an individual product window should open directly into that product's workspace.

## Shared foundations

- **Design System** — shared visual tokens, navigation states and product-window shell rules.
- **Fonts** — source and licence metadata for fonts that may be redistributed; no font may be bundled without explicit rights review.
- **Localization** — language catalogues, regional conventions and dictionary-pack licensing.
- **Engine** — shared Rust/native performance primitives and their language bindings.
- **Common Libraries** — small reusable, language-specific libraries with verified consumers.
- **Common Actions** — reusable, pinned GitHub Actions and CI components.
- **Developer Tools** — local developer utilities and documented setup aids.
- **Extensions** — a future permissioned extension model; untrusted native code is not loaded by default.
- **Wiki** — maintained technical knowledge and product guidance.
- **Release Tools** — read-only release manifests, artifact inventories and verification helpers.
- **Services** — optional device and synchronisation services; local product functionality must not depend on them.

## Engineering control plane

Brightdesk-AI is a private engineering control plane, not a customer product. It can audit source and coordinate permitted developer workflows. It must not be bundled into customer installers or become a customer sign-in, account, model-provider or subscription requirement.

## Dependency principles

Products may consume a shared foundation only after its source, tests, versioning, licensing and compatibility have been verified. Keep local fallback behavior where the product design requires it. A README link or a repository existing does not prove integration. Record the exact consuming product, commit and passing contract test before calling a shared dependency adopted.

## Design and vendor boundaries

Microsoft productivity conventions are the primary product inspiration. Brightdesk uses original code, product identities, layouts and artwork. Adobe products and services are not dependencies, bundled items, integrations or requirements. Brightdesk excludes Outlook, OneDrive and Teams from its approved product scope.

See the [Suite developer ecosystem architecture plan](https://github.com/connormolloy12/Brightdesk-suite/blob/main/docs/DEVELOPER_ECOSYSTEM_ARCHITECTURE.md) and [Brightdesk visual standard](https://github.com/connormolloy12/Brightdesk-suite/blob/main/docs/BRIGHTDESK_VISUAL_STANDARD.md) for the canonical contracts.
