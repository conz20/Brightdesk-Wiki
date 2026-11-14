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
- URL
- Checkbox
- Choice

## Record operations

The workspace provides record search and sorting, plus CSV export.

Two protected structures are important:

- The final table is protected from deletion.
- The system ID field is protected.

## Data boundary

Database data is stored on the device. CSV export produces a separate file; it does not create a shared or hosted database.

## Related information

- [File formats](../file-formats.html)
- [Everyday Help: Database](../../products/database.html)
