# Brightdesk repository inventory

**Maintainer reference — live inventory checked 12 November 2026.**

The current owner listing contains 27 private, unarchived repositories under `conz20`, all using `main` as the default branch. Recheck the live GitHub inventory whenever this page is updated; repository existence does not prove that its implementation is complete or consumed by a product.

The portfolio is:

- 1 integrated Suite repository.
- Exactly 10 customer product repositories.
- 1 separate Brightdesk-AI engineering/tooling repository.
- 15 shared, engineering and supporting repositories.

That is **27 repositories**. The extra infrastructure repositories do not add to the approved customer product count.

## Suite

| Repository | Role |
| --- | --- |
| [Brightdesk-suite](https://github.com/conz20/Brightdesk-suite) | Integrated desktop Suite, product coordination and release source of truth. |

## Customer products — exactly ten

| Repository | Customer product |
| --- | --- |
| [Brightdesk-Pages](https://github.com/conz20/Brightdesk-Pages) | Document writing and page layout. |
| [Brightdesk-Sheets](https://github.com/conz20/Brightdesk-Sheets) | Spreadsheet and cell-based work. |
| [Brightdesk-Decks](https://github.com/conz20/Brightdesk-Decks) | Slide presentations. |
| [Brightdesk-Notes](https://github.com/conz20/Brightdesk-Notes) | Notes and idea capture. |
| [Brightdesk-Database](https://github.com/conz20/Brightdesk-Database) | Structured tables and records. |
| [Brightdesk-Forms](https://github.com/conz20/Brightdesk-Forms) | Form creation and response handling. |
| [Brightdesk-Lists](https://github.com/conz20/Brightdesk-Lists) | Custom lists and structured items. |
| [Brightdesk-Planner](https://github.com/conz20/Brightdesk-Planner) | Plans, projects and task organisation. |
| [Brightdesk-To-Do](https://github.com/conz20/Brightdesk-To-Do) | Personal task tracking. |
| [Brightdesk-Workspace](https://github.com/conz20/Brightdesk-Workspace) | Connected project information and workspace content. |

## Separate engineering repository

| Repository | Role |
| --- | --- |
| [Brightdesk-AI](https://github.com/conz20/Brightdesk-AI) | Private engineering automation and developer tooling. It is not a customer product and must not be bundled into customer applications. |

## Shared, engineering and supporting repositories — fifteen

| Repository | Role and boundary |
| --- | --- |
| [Brightdesk-Assets](https://github.com/conz20/Brightdesk-Assets) | Governed original visual assets, provenance, rights evidence and integrity records; not a CDN. |
| [Brightdesk-Common-Actions](https://github.com/conz20/Brightdesk-Common-Actions) | Reusable, pinned GitHub Actions and CI building blocks. |
| [Brightdesk-Common-Libs](https://github.com/conz20/Brightdesk-Common-Libs) | Shared libraries with explicit contracts and tested consumers. |
| [Brightdesk-Design-System](https://github.com/conz20/Brightdesk-Design-System) | Original Brightdesk design tokens, controls and visual standards. |
| [Brightdesk-Developer-Tools](https://github.com/conz20/Brightdesk-Developer-Tools) | Local developer utilities and diagnostics. |
| [Brightdesk-Engine](https://github.com/conz20/Brightdesk-Engine) | Shared native and Rust engine components, including the local language engine. |
| [Brightdesk-Extensions](https://github.com/conz20/Brightdesk-Extensions) | Extension manifests and permission contracts; a manifest is not runtime enforcement. |
| [Brightdesk-Fonts](https://github.com/conz20/Brightdesk-Fonts) | Font files, source provenance, licences and embedding permissions. |
| [Brightdesk-Localization](https://github.com/conz20/Brightdesk-Localization) | Language catalogues, locale metadata and governed language-resource packages. |
| [Brightdesk-Printing](https://github.com/conz20/Brightdesk-Printing) | Shared local-first printing adapter and platform discovery work; still requires platform and real-printer verification. |
| [Brightdesk-Release-Tools](https://github.com/conz20/Brightdesk-Release-Tools) | Release manifests, artifact inventories, checksums and verification tooling. |
| [Brightdesk-Services](https://github.com/conz20/Brightdesk-Services) | Optional owner-operated experimental infrastructure only; never a customer runtime dependency. |
| [Brightdesk-Type-Preview](https://github.com/conz20/Brightdesk-Type-Preview) | Local/offline font preview and installed-font metadata; not a hosted font service. |
| [Brightdesk-Voice](https://github.com/conz20/Brightdesk-Voice) | Separate private audio research/prototype infrastructure. No customer-product integration or release is approved. |
| [Brightdesk-Wiki](https://github.com/conz20/Brightdesk-Wiki) | Private Markdown knowledge source; no public hosted help site or customer-facing distribution is currently approved. It is not installed or required by Brightdesk software. |

## Product and dependency boundaries

- The approved customer lineup remains exactly Pages, Sheets, Decks, Notes, Database, Forms, Lists, Planner, To Do and Workspace.
- Brightdesk-AI, Printing, Voice and the other shared repositories are not additional customer products.
- Brightdesk-Services is experimental and optional; it must never be required at customer runtime.
- Brightdesk-Wiki is maintained separately online. It is not bundled, installed, listed in the App Centre or required for offline product use.
- Repository count and documentation do not prove implementation. A shared component is adopted only after the consuming product, exact source version and passing contract tests are verified.
- Keep every repository private unless the owner explicitly approves a separate visibility change. Do not change repository settings or permissions as part of documentation maintenance.
