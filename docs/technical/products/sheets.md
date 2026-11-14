---
layout: technical
title: Brightdesk Sheets technical reference
description: Spreadsheet input, formula operators, calculation functions and export capabilities in Brightdesk Sheets.
permalink: /technical/products/sheets.html
---

# Sheets technical reference

<img class="technical-product-icon" src="../../assets/images/product-icons/sheets.svg" alt="Brightdesk Sheets application icon" width="80" height="80" loading="lazy">


Sheets is Brightdesk's spreadsheet workspace for tabular data, calculations and totals.

## Formula engine

A formula begins with an equals sign (`=`). The current calculation engine supports:

- Cell references such as `A1` and `B4`.
- Cell ranges such as `A1:A5` inside a supported function.
- Addition (`+`), subtraction (`-`), multiplication (`*`), division (`/`) and remainder (`%`).
- Positive and negative values, plus parentheses for grouping.

The six supported named functions are:

| Function | Purpose |
| --- | --- |
| `SUM` | Adds numeric values |
| `AVERAGE` | Finds the average of numeric values |
| `MIN` | Finds the smallest numeric value |
| `MAX` | Finds the largest numeric value |
| `COUNT` | Counts numeric values |
| `COUNTA` | Counts non-empty values |

For example, `=SUM(B2:B6)` adds the numeric values in cells B2 through B6. `=B2*1.1` multiplies the value in B2 by 1.1.

A circular reference is rejected and shown as `#VALUE!`, rather than being allowed to calculate forever. Unsupported or invalid formulas and calculations that need a non-numeric cell value also show `#VALUE!`.

These are the six named functions confirmed in the current formula implementation. Do not assume that other spreadsheet functions, external data connections or macro execution are supported.

## File handling

| Operation | Formats |
| --- | --- |
| Open | XLSX, XLSM, CSV, TSV |
| Export | XLSX, CSV |

The open-file route does not mean that every feature of a source workbook, including macros or unsupported formula types, will behave identically. Keep the original workbook when exact compatibility matters.

## Related information

- [File formats](../file-formats.html)
- [Everyday Help: Sheets](../../products/sheets.html)
