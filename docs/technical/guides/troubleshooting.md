---
layout: technical
title: Troubleshooting — technical reference
description: Technical triage guidance for Brightdesk Suite and its ten workspaces, including safe diagnostics and verified support boundaries.
status: Source-confirmed
permalink: /technical/guides/troubleshooting.html
---

# Troubleshooting — technical reference

This reference provides a safe triage path without inventing diagnostic commands, reset procedures or product capabilities. For the shorter customer version, see [Troubleshooting Brightdesk](../../everyday/troubleshooting.html).

## Triage sequence

1. Identify whether the issue is in Brightdesk Suite or one of its product workspaces.
2. Record the exact message shown by the software.
3. Preserve the current document or project data before attempting further work.
4. Confirm the file type is supported by the relevant product.
5. Open the product-specific troubleshooting section linked below.
6. Avoid deleting local files, resetting folders or reinstalling as an unverified first response.

## Product-specific references

| Product | Technical reference | Plain-English guide |
| --- | --- | --- |
| Pages | [Pages](../products/pages.html) | [Everyday guide](../../products/pages.html) |
| Sheets | [Sheets](../products/sheets.html) | [Everyday guide](../../products/sheets.html) |
| Decks | [Decks](../products/decks.html) | [Everyday guide](../../products/decks.html) |
| Notes | [Notes](../products/notes.html) | [Everyday guide](../../products/notes.html) |
| Database | [Database](../products/database.html) | [Everyday guide](../../products/database.html) |
| Forms | [Forms](../products/forms.html) | [Everyday guide](../../products/forms.html) |
| Lists | [Lists](../products/lists.html) | [Everyday guide](../../products/lists.html) |
| Planner | [Planner](../products/planner.html) | [Everyday guide](../../products/planner.html) |
| To Do | [To Do](../products/to-do.html) | [Everyday guide](../../products/to-do.html) |
| Workspace | [Workspace](../products/workspace.html) | [Everyday guide](../../products/workspace.html) |

## Known Suite-level boundaries

- Live update delivery is not active or verified. Do not troubleshoot an update channel as though it is available.
- A customer-facing repair procedure has not yet been verified. Do not recommend removing the Suite or deleting its data as a repair attempt.
- Product workspaces are managed inside Brightdesk Suite. Removing a workspace from the Suite is not the same as deleting local customer files.
- A display-language selection and a proofing-language selection are separate settings.
- Spelling checks require an installed dictionary and do not automatically rewrite documents.

## Evidence to collect

When a problem needs investigation, record only the information needed to reproduce it:
- the Brightdesk product and version shown by the software;
- the operating system and version;
- the file type involved, where relevant;
- the steps immediately before the problem;
- the exact on-screen error or unexpected result; and
- whether the document or project was saved successfully.

Do not include passwords, private document contents or unrelated personal information in a support report. Do not assume diagnostic files are automatically uploaded or that customers should send complete project folders.

## Unsupported troubleshooting claims

The help centre must not invent requirements for firewall rules, loopback networking, encryption modes, synchronization services, hidden status indicators or configuration-file paths. Such instructions belong here only after the relevant Brightdesk implementation and supported behaviour have been verified.

## Related references

- [Plain-English troubleshooting guide](../../everyday/troubleshooting.html)
- [Install and update](install-update.html)
- [Languages and spelling](languages-and-spelling.html)
- [Data and privacy](../data-and-privacy.html)

[Back to Technical Documentation](../index.html)
