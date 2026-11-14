---
layout: technical
title: Brightdesk Workspace technical reference
description: Workspace and page hierarchy, content blocks, search, block ordering and deletion safeguards.
permalink: /technical/products/workspace.html
---

# Workspace technical reference

Workspace groups related project information into workspaces and pages.

## Content model

A workspace contains one or more pages. Pages contain ordered content blocks.

The current block types are:

- Text
- Heading
- Bullet list
- Callout
- Checklist
- Divider

Checklist items have their own completion state and can be edited independently of the surrounding block.

## Search and organisation

**Find a page** searches page titles, block content and checklist item text. Blocks can be moved up or down one position at a time. Pages and workspaces can be renamed.

## Deletion safeguards

- A workspace must retain at least one page.
- At least one workspace must remain.
- Deleting a page removes that page and all its content.
- Deleting a workspace removes that workspace and all its pages.

Review the selected page or workspace before deleting it. The protection for the final page and final workspace does not prevent deletion of other pages or workspaces.

## Data boundary

Workspaces and pages are saved locally. Live collaboration, shared workspaces, permissions and cloud synchronisation are not part of the current product scope.

## Related information

- [Data and privacy](../data-and-privacy.html)
- [Everyday Help: Workspace](../../products/workspace.html)
