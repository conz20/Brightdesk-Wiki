# Brightdesk documentation

Use this index to find the right Brightdesk answer. Start with the [customer start page](customer-start-here.md) if you are not sure which product or guide you need. Pages are maintained as ordinary Markdown in the Brightdesk Wiki repository.

## About this resource

The Wiki is a **separate online help and knowledge resource**. It is not one of the ten customer products, a desktop application, a Suite component, an App Centre entry, an installer payload or a runtime dependency. No Brightdesk application may rely on Wiki availability or internet access; customer software must remain usable offline without it.

The Markdown source currently lives in this private GitHub repository and is readable online by people who have repository access. There is no public hosted documentation website today. Do not describe an unrestricted public website as available until a separate publishing route has been explicitly approved and verified.

## Customer help

- [Start here: find the Brightdesk help you need](customer-start-here.md) — choose a product, understand guide labels and request missing help.
- [Product guide directory](products/) — guidance for the ten approved products.

## Architecture and engineering

- [Portfolio architecture](architecture/overview.md) — how the Suite, ten products and shared foundations fit together.
- [27-repository inventory](architecture/repository-inventory.md) — maintainer reference for the current repository set.
- [Development setup](development/setup.md) — required tool versions and local verification approach.
- [Security and privacy boundaries](security/boundaries.md) — local-first principles, data ownership and engineering boundaries.
- [Release and platform status](releases/status.md) — target package formats and what counts as release evidence.

## Product guides

- [Pages](products/pages.md)
- [Sheets](products/sheets.md)
- [Decks](products/decks.md)
- [Notes](products/notes.md)
- [Database](products/database.md)
- [Forms](products/forms.md)
- [Lists](products/lists.md)
- [Planner](products/planner.md)
- [To Do](products/to-do.md)
- [Workspace](products/workspace.md)

## Sources of truth

The [Brightdesk-suite repository](https://github.com/conz20/Brightdesk-suite) owns the integrated desktop experience and its release coordination. Each product repository owns its product implementation and tests. The [Brightdesk Design System](https://github.com/conz20/Brightdesk-Design-System) owns canonical shared visual contracts. The [Brightdesk developer ecosystem architecture](https://github.com/conz20/Brightdesk-suite/blob/main/docs/DEVELOPER_ECOSYSTEM_ARCHITECTURE.md) describes the repository roles and dependency model.
