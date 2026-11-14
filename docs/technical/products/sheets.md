---
layout: technical
title: Brightdesk Sheets technical reference
description: Spreadsheet input, calculation expressions and export capabilities in Brightdesk Sheets.
permalink: /technical/products/sheets.html
---

# Sheets technical reference

Sheets is Brightdesk's spreadsheet workspace for tabular data, calculations and totals.

## Formula engine

The current formula engine supports:

- Arithmetic expressions.
- Cell references.
- Cell ranges.
- SUM
- AVERAGE
- MIN
- MAX
- COUNT
- COUNTA

These are the six named functions confirmed in the current formula implementation. Do not assume that other spreadsheet functions, external data connections or macro execution are supported.

## File handling

| Operation | Formats |
| --- | --- |
| Open | XLSX, XLSM, CSV, TSV |
| Export | XLSX, CSV |

The open-file route does not mean that every feature of a source workbook, including macros or unsupported formula types, will behave identically.

## Related information

- [File formats](../file-formats.html)
- [Everyday Help: Sheets](../../products/sheets.html)
