---
layout: technical
title: Brightdesk Database technical reference
description: Database field types, record operations, search, sorting and CSV export.
permalink: /technical/products/database.html
---

# Database technical reference

Database is Brightdesk's local structured-data workspace for tables, fields and records.

## Field types

The current field types are:

- Text
- Number
- Date
- Email
- Web address
- Checkbox
- Choice list

Choice list fields use a set of named options. Field values are checked against the selected field type when a record is saved or updated.

## Record operations

The workspace provides record search, sorting and CSV export.

- Search checks the values in all fields in the selected table. It is case-insensitive and matches part of a value.
- Sorting uses the field selected by the user. Number fields sort numerically; other values use natural text ordering.
- CSV export creates a separate file containing the table's field names and record values.

Two protected structures are important:

- The final table is protected from deletion.
- The system ID field cannot be changed or removed.

## Deletion and data handling

Removing a custom field also removes that field's value from every record in the table. The interface asks for confirmation before removing it. Export a CSV copy before removing a field when those values may be needed later.

Deleting a table removes that table and its records. Check that you have selected the intended table before confirming its removal.

## Data boundary

Database data is stored on the device. CSV export produces a separate file; it does not create a shared or hosted database.

## Related information

- [File formats](../file-formats.html)
- [Everyday Help: Database](../../products/database.html)
