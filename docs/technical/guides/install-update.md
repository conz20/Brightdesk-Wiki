---
layout: technical
title: Install and update — technical reference
description: Technical reference for Brightdesk Suite installation, product workspace lifecycle, update availability and verified repair boundaries.
status: Source-confirmed
permalink: /technical/guides/install-update.html
---

# Install and update — technical reference

This reference describes the confirmed installation and update boundaries for Brightdesk Suite. For the shorter step-by-step version, see [Install and update Brightdesk](../../everyday/install-update.html).

## Product and package boundary

Brightdesk Suite is the installable desktop product. The ten approved products are managed as workspaces inside the Suite:

| Product family | Workspaces |
| --- | --- |
| Create and communicate | Pages, Decks, Notes |
| Work with information | Sheets, Database, Forms, Lists |
| Plan and organise | Planner, To Do, Workspace |

Adding or removing a workspace in the Suite is not the same operation as installing or uninstalling the Suite package. Removing a workspace from the Suite does not, by itself, delete the customer's local project files.

## Supported desktop environments

Brightdesk is designed for desktop use on Windows, macOS and Linux. A release must be verified for the target operating system before it is treated as an available customer download.

A configured installer format is not evidence that a verified release exists. Use only release links published through Brightdesk's official channels.

## Installation consent boundary

The installer presents the Brightdesk Terms and Conditions. The customer must accept the agreement to continue. Declining, or closing the required agreement without accepting, prevents the product workspace from opening.

The customer does not need Node.js, Terminal or Command Prompt to run an official Brightdesk installation.

## Workspace lifecycle

The Suite's Apps area exposes the add and remove actions for the ten workspaces. These actions control whether a workspace is included in the Suite. They must not be described as deleting documents, removing the Suite installation or uninstalling a separate desktop package.

## Update availability

Live update delivery is **not active or verified**. The Suite does not yet have a configured update-publishing provider. Do not describe automatic update checks, update downloads or an update channel as working until that service has been implemented and tested.

Customers should not obtain installers or updates from third-party download sites.

## Repair and recovery status

A customer-facing repair procedure has not yet been verified for the current release. Do not prescribe removal, folder deletion, settings resets or manual file replacement as repair steps.

A repair procedure should be documented only after it has been tested for the relevant operating system and shown to preserve customer documents and settings.

## Verification boundary

The presence of Windows, macOS or Linux installer configuration does not prove that all release formats are built, signed, available or verified. The public help centre must distinguish configured packaging from a completed, tested release.

## Related references

- [Plain-English install and update guide](../../everyday/install-update.html)
- [System overview](../system-overview.html)
- [File formats](../file-formats.html)
- [Data and privacy](../data-and-privacy.html)

[Back to Technical Documentation](../index.html)
