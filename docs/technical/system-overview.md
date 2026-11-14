---
layout: technical
title: Brightdesk system overview
description: Product boundaries and the relationship between Brightdesk Suite and its ten local workspaces.
permalink: /technical/system-overview.html
---

# System overview

<img class="technical-product-icon" src="../assets/brand/brightdesk-suite-mark.svg" alt="Brightdesk Suite brand mark" width="80" height="80" loading="lazy">


Brightdesk is a desktop productivity suite with one Suite entry point and ten customer products. The Suite helps people choose which products are included and open them. Each product works in its own window.

## Product model

| Layer | Responsibility |
| --- | --- |
| Brightdesk Suite | Home, product availability, file entry points, notifications and shared Suite settings |
| Product workspace | The product-specific editing or organisation experience |
| Local project and product data | Work created by the customer and retained on their device |

The ten customer products are Pages, Sheets, Decks, Notes, Database, Forms, Lists, Planner, To Do and Workspace. Brightdesk-AI is engineering tooling and is not a customer product.

## Window behaviour

- The Suite Home window remains available while a product is open.
- Choosing **Open** on a product card opens that product in its own window.
- Choosing **Open** again brings the existing product window to the front.
- A product window can use **Switch product** to open another product that is included and visible in the Suite.
- Closing one product window does not close the Suite window or the other product windows.

The Help website is not part of this runtime model. It is a separate, read-only website that provides written guidance.

## Local-first boundary

Brightdesk is designed to keep customer work on the customer's device. It does not require customer accounts, online sign-in, cloud sync or a paid licence to use the products.

This reference describes the customer-facing product boundary. It does not publish private build pipelines, internal service endpoints, source repository details or maintainer credentials.

## Related references

- [File formats and product routing](file-formats.html)
- [Data and privacy](data-and-privacy.html)
- [Everyday Help: get started with Suite](../customer-start-here.html)
