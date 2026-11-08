# Security and privacy boundaries

## Customer experience

Brightdesk is free forever. The Suite and all ten customer products must remain usable without a Brightdesk account, sign-in, subscription, paid tier or metered customer service. Local work must remain usable offline and must not depend on Brightdesk-Services.

Customers own their local documents and project data. Removing a product must not silently remove user documents or unrelated settings. Explain any destructive operation clearly and require deliberate confirmation where appropriate.

## Network access

Network access should be limited to clearly identified product needs such as official update checks, or a user-enabled optional feature. Do not add telemetry, external account identity, third-party synchronization or background uploads without a documented requirement and review.

## Engineering boundaries

- Keep customer products independent of Brightdesk-AI credentials and model services.
- Keep secrets out of source files, logs, test fixtures and documentation.
- Use least-privilege workflow permissions and pin third-party GitHub Actions to immutable commits.
- Do not publish private source, raw private logs or private build artifacts through public workflows.
- Validate paths, file types, checksums and licence permissions before consuming repository assets.
- Treat imported documents, extensions and remote content as untrusted input.

## Intellectual property

Use original Brightdesk code, names, icons and artwork. Microsoft 365 is the primary product inspiration, not a source of copied proprietary code or assets. Adobe applications and services must not be included, installed, bundled, depended on, integrated or required. Do not redistribute fonts or other third-party assets until the exact licence and applicable redistribution/embedding permissions have been checked.
