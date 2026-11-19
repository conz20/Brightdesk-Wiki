# Brightdesk Wiki contributor instructions

## Repository identity and portfolio scope

The separate public Brightdesk customer Help website and product documentation. This is a support website, not a customer desktop product or an eleventh product.

The Brightdesk customer portfolio contains exactly these ten products: Pages, Sheets, Decks, Notes, Database, Forms, Lists, Planner, To Do and Workspace. Brightdesk Office Suite is their shared desktop experience, not an additional product. Do not create new customer products or add Outlook, OneDrive, Teams or other unapproved products. Brightdesk-AI is separate private engineering tooling.

The shared written policy is under review in [Brightdesk Office Suite PR #77](https://github.com/conz20/Brightdesk-suite/pull/77). Keep these repository instructions aligned with that portfolio standard as it is reviewed and adopted.

## Approved toolchains and compatibility

Use exactly Node.js **24.22.2 LTS** wherever this repository uses Node.js for development, tests, scripts or CI. Where Electron applications or packaging are actually used, pin Electron **45.2.1** and electron-builder **26.18.0** exactly. Where Cargo or Rust native code is used, pin Rust **1.99.1** as the selected toolchain.

Keep applicable manifests, lockfiles, runtime selector files, development containers, build scripts and CI workflows aligned. Do not add a runtime or build tool merely to make this repository match another repository.

Do not copy older-version code, examples or API instructions into a current implementation unchanged. Check the versions they target and port useful work to the approved APIs, updating code, configuration, lockfiles, tests and documentation together. Never mix incompatible major-version APIs or use an older runtime to force a test to pass. Do not change the approved baseline without explicit owner approval and a coordinated compatibility review.

## Customer and service boundaries

Brightdesk is free forever. Do not introduce subscriptions, trials, paid tiers, billing, customer accounts, sign-in, passwords, profiles, activation codes, serial numbers or licence servers.

Do not add telemetry, analytics, advertising, crash reporting, customer-content uploads, cloud storage, cloud synchronisation, hosted collaboration or remote processing of customer documents or text. Internet access in customer product runtimes is limited to official Brightdesk product updates and Brightdesk-controlled language-resource discovery, download and update. Do not add third-party runtime dictionary downloads.

## Brand and third-party boundaries

Use original Brightdesk names, code, interface design, icons, SVGs, fonts and artwork. Microsoft is the primary product and workflow inspiration, not a source of copied code, logos, assets or distinctive trade dress. Adobe may be used only as a capability/workflow reference. Never install, bundle, depend on, integrate with or require an Adobe application or Adobe service. Do not imply Microsoft or Adobe affiliation.

## Development and verification

- Work on dedicated feature branches and use pull requests; do not commit routine changes directly to `main`.
- Read the README and relevant documentation before changing implementation or workflow behaviour.
- Add or update regression tests for behaviour changes where practical. Run focused checks and the full relevant test suite on the exact approved toolchain.
- Do not weaken tests, security checks, licence checks or accessibility checks to make a workflow pass.
- Keep implementation, tests, CI and documentation aligned. Update this repository's README when its implementation, status, commands, interfaces or verification claims change.
- Do not claim a check, build, integration, consumer adoption or platform is verified without exact evidence from the relevant commit and environment.
- Protect credentials, tokens, personal information and private reports from source files, logs and release artifacts.
- Do not publish releases, deploy production, change repository visibility or permissions, or enable paid services without explicit owner approval.

## Repository-specific requirements

## Public Help website boundaries

Keep the Help website limited to accurate support, product, installation, privacy and troubleshooting information for Brightdesk Suite and the exact ten approved products. Brightdesk-AI and engineering repositories are not customer products.

Keep the approved permanent customer Help address unchanged unless the owner explicitly approves a change. Label branch previews as review builds; never present a preview as production. Keep release, product availability, integration and installer claims tied to current verified evidence.

Do not add accounts, subscriptions, advertising, analytics, tracking, customer document uploads or remote customer-content processing. Do not publish secrets or private engineering information. Changes to production domains, DNS, deployment configuration or production publishing require explicit owner approval. Public documentation deployment must not be confused with a desktop-product release.
