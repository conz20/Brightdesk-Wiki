---
layout: technical
title: Brightdesk Lists technical reference
description: Lists record schema, custom column types, search, sorting and status filter behaviour.
permalink: /technical/products/lists.html
---

# Lists technical reference

<img class="technical-product-icon" src="../../assets/images/product-icons/lists.svg" alt="Brightdesk Lists application icon" width="80" height="80" loading="lazy">


Lists is a local structured-list workspace.

## Default record fields

A new list starts with five built-in fields:

| Field | Use |
| --- | --- |
| Title | Main record label |
| Status | Work state: Not started, In progress or Done |
| Priority | Importance: Low, Normal or High |
| Due date | Target date |
| Notes | Additional detail |

Built-in columns cannot be deleted.

## Custom columns

The current custom column types are **Text**, **Date** and **Choice**. A Choice column contains between 1 and 30 distinct options.

The current Lists workspace supports adding custom columns, but it does not expose a control to remove them.

## Search, sorting and status filtering

Search checks values across all columns in the current list. It is case-insensitive and matches part of a value.

The visible **Filter by status** choices are **All statuses**, **Not started**, **In progress** and **Done**.

| Filter option | Records included |
| --- | --- |
| All statuses | Every record |
| Not started | Records with that status |
| In progress | Records with that status |
| Done | Completed records |

Search is case-insensitive and checks values across the list's columns. Status filtering uses the selected status value. Records can be sorted by a chosen column; the **Sort direction** choices are **A to Z** and **Z to A**. Priority sorting follows Low, Normal and High order.

## Data boundary

Lists saves records locally. Connected data sources and shared editing are not part of the current product scope.

## Related information

- [Data and privacy](../data-and-privacy.html)
- [Everyday Help: Lists](../../products/lists.html)
