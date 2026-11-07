# Brightdesk-Wiki

Central technical documentation for the private Brightdesk ecosystem.

## Purpose and ownership

Owns maintained developer guides, architecture references, product documentation indexes, onboarding material and operational runbooks. It documents verified behaviour and links to the source repository for each product.

## Current verified status

As of 7 November 2026, this repository has been created and is private. Its root currently contains only this README. No source implementation, package, published release, reusable service or passing test suite has been verified in this repository. The descriptions below are the intended scope, not a claim that these capabilities are already implemented.

## First implementation stage

Proposed first deliverables: information architecture, contribution rules, versioned documentation policy and links to all ten products, the Suite, Brightdesk-AI and shared infrastructure. No documentation site or publishing workflow is claimed yet.

## Ecosystem connections

The customer-facing desktop experience is coordinated by [Brightdesk Office Suite](https://github.com/connormolloy12/Brightdesk-suite). The ten products remain in their own repositories:

- [Brightdesk Pages](https://github.com/connormolloy12/Brightdesk-Pages)
- [Brightdesk Sheets](https://github.com/connormolloy12/Brightdesk-Sheets)
- [Brightdesk Decks](https://github.com/connormolloy12/Brightdesk-Decks)
- [Brightdesk Notes](https://github.com/connormolloy12/Brightdesk-Notes)
- [Brightdesk Database](https://github.com/connormolloy12/Brightdesk-Database)
- [Brightdesk Forms](https://github.com/connormolloy12/Brightdesk-Forms)
- [Brightdesk Lists](https://github.com/connormolloy12/Brightdesk-Lists)
- [Brightdesk Planner](https://github.com/connormolloy12/Brightdesk-Planner)
- [Brightdesk To Do](https://github.com/connormolloy12/Brightdesk-To-Do)
- [Brightdesk Workspace](https://github.com/connormolloy12/Brightdesk-Workspace)

[Brightdesk-AI](https://github.com/connormolloy12/Brightdesk-AI) is the separate private engineering control plane. This repository must not depend on AI being available at runtime. AI-specific models, prompts, agent orchestration and AI tests belong in Brightdesk-AI.

The shared architecture and dependency rules are documented in the [Brightdesk developer ecosystem architecture](https://github.com/connormolloy12/Brightdesk-suite/blob/main/docs/DEVELOPER_ECOSYSTEM_ARCHITECTURE.md).

## Engineering rules

- Preserve existing implementations and programming languages across the ecosystem; do not standardise by deleting or rewriting language choices.
- Keep Rust supported where the component requires native/core functionality.
- Use versioned, documented interfaces. Shared repositories must not depend on product repositories.
- Add tests before implementing new behaviour and run the repository's full checks before proposing integration.
- Keep repositories private and use least-privilege access.
- Review third-party licences before adding code, fonts, icons or other assets.
- Do not add paid services, metered APIs or paid build infrastructure without separate approval.
- Do not publish a release or merge integration changes automatically.

## Planned repository

[Brightdesk-Release-Tools](https://github.com/connormolloy12/Brightdesk-Release-Tools) is still awaiting creation. It is not a dependency for this repository's first implementation stage.
