---
layout: technical
title: Languages and spelling — technical reference
description: Technical reference for Brightdesk display-language packs, proofing languages, spelling dictionaries and supported document checks.
status: Source-confirmed
permalink: /technical/guides/languages-and-spelling.html
---

# Languages and spelling — technical reference

Brightdesk treats interface translation and spelling resources as separate resource types. For customer-facing steps, see [Languages and spelling](../../everyday/languages-and-spelling.html).

## Resource types

| Resource | Purpose | Selection |
| --- | --- | --- |
| Display-language pack | Translates Brightdesk menus, labels and messages | Display language |
| Spelling dictionary | Supplies word data for proofing | Proofing language and dictionary selection |

A language appearing in a menu or catalogue does not, by itself, prove that its spelling dictionary is installed.

## Resource discovery and source

Language packs and spelling dictionaries are discovered through Brightdesk's official language controls and catalogue. Installation and update instructions must refer to that approved route.

Do not direct customers to third-party dictionary downloads or ask them to replace Brightdesk dictionary files manually.

## Settings model

The shared language controls are available from Brightdesk Suite through **Settings → Languages & dictionaries**.

The settings expose distinct states for:
- available language packs;
- installed language packs;
- the selected display language;
- available spelling dictionaries;
- installed spelling dictionaries; and
- the selected proofing language.

The display language and proofing language are independent selections. A change to one must not be documented as automatically changing the other.

## Document proofing support

The documented spelling-check entry point covers open documents in Pages, Sheets, Decks and Notes when the required dictionary is installed.

The spelling checker reports possible issues and suggestions. It does not automatically rewrite the document.

Dictionary availability may depend on the installed resource and operating system. A language listed in the available catalogue must not be presented as an installed or usable proofing dictionary until its installed status has been confirmed.

## Status interpretation

| Observed state | Meaning |
| --- | --- |
| Listed under available dictionaries | The resource can be selected for installation |
| Listed under installed dictionaries | The resource is installed locally |
| No dictionary available | The selected proofing language does not currently have an installed dictionary available |
| Display language changed, spelling unchanged | The display-language and proofing-language settings remain separate |

## Privacy and external services

The Brightdesk Help site does not provide a separate cloud translation service. Browser translation, when used, is supplied by the browser or its provider; that provider may process page text. This is separate from Brightdesk's local spelling-dictionary controls.

Do not imply that Brightdesk sends customer documents to a third-party spelling or translation provider.

## Related references

- [Plain-English languages and spelling guide](../../everyday/languages-and-spelling.html)
- [Data and privacy](../data-and-privacy.html)
- [System overview](../system-overview.html)

[Back to Technical Documentation](../index.html)
