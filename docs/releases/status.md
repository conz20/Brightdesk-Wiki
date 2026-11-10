# Release and platform status

## Target package formats

The approved desktop packaging targets are:

- **macOS:** universal DMG, PKG and ZIP archives.
- **Windows:** NSIS installer (.exe).
- **Linux:** AppImage and Debian package (.deb).

These are target formats, not a statement that all products currently have release-ready installers. The acceptance target is 66 deliverables: the Suite plus ten products, each with all six applicable platform formats.

## Release acceptance

A release candidate is not ready merely because a packaging command finished. Verify the exact commit and dependency lock, run the product's required tests, build the platform packages, inspect checksums and manifests, and perform clean installation, first-launch, upgrade, repair and actual native uninstallation checks appropriate to each operating system. Confirm that user documents and product data survive uninstall, and that removing one product does not remove the Suite or another product.

Keep separate installer artifacts for the Suite and each product. Verify product identity, package metadata, installed paths, icons, terms acceptance and update behavior. Native OS verification and compatibility emulation are distinct forms of evidence; do not describe Wine smoke tests as native Windows certification.

## Publication boundary

Do not publish a GitHub Release, update feed or customer-facing download until all required checks for the intended release scope are complete and explicitly approved. A draft pull request or a queued workflow is not a release. The current source of truth is the [Suite release verification documentation](https://github.com/conz20/Brightdesk-suite/blob/main/docs/CROSS-PLATFORM-RELEASE-VERIFICATION.md).
