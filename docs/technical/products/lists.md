---
layout: technical
title: Brightdesk Lists technical reference
description: Lists record schema, custom column types, search, sorting and status filter behaviour.
permalink: /technical/products/lists.html
---

# Lists technical reference

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

Deleting a custom column also removes the values stored for that column from every record in the list. Review the impact before deleting a column.

## Search, sorting and status filtering

Search checks values across all columns in the current list. It is case-insensitive and matches part of a value.

The visible status filter contains **All records**, **Active** and **Done**.

| Filter option | Records included |
| --- | --- |
| All records | Every record |
| Active | Not started and In progress |
| Done | Completed records |

The underlying status values are **Not started**, **In progress** and **Done**. Records can also be sorted by a chosen column. Priority sorting uses Low, Normal and High order.

## Data boundary

Lists saves records locally. Connected data sources and shared editing are not part of the current product scope.

## Related information

- [Data and privacy](../data-and-privacy.html)
- [Everyday Help: Lists](../../products/lists.html)
