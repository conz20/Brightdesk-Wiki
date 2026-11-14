---
name: brightdesk-cloudflare-pages
description: Use when setting up, configuring, deploying, or troubleshooting the existing Brightdesk Help site on Cloudflare Pages.
---

# Brightdesk Help on Cloudflare Pages

## Scope

This repository contains the private source for the separate Brightdesk customer Help website. Maintain it as an existing Cloudflare Pages static-site project. Do not migrate it to Workers, introduce Wrangler, or turn it into a customer product.

The only approved customer URL is https://brightdesk-help.pages.dev/. This is Cloudflare Pages' free project hostname and the permanent customer address. PR preview addresses are review-only and never replace it. Do not add or advertise a paid .com custom domain.

The Help site is optional. It is not bundled with Brightdesk, not required for offline use, and must never receive customer documents or application data.

## Fixed project configuration

Use these settings unless the repository owner explicitly changes them:

- Cloudflare product: Pages Free.
- GitHub repository: conz20/Brightdesk-Wiki, and no other Brightdesk repository.
- Production branch: main.
- Preview branch deployments: target **None** before production. PR preview deployments were observed active on 14 November 2026; verify the current account-side setting and do not change it without owner approval.
- Root directory: repository root (/).
- Build command: npm run build:cloudflare.
- Build output directory: _site.
- Node.js: exactly 24.22.2 from .node-version.
- Ruby: exactly 3.4.4 from .ruby-version.
- Jekyll source: docs/.
- Jekyll output: _site/.

Do not add paid plans, paid add-ons, metered services, subscriptions, or trials. Do not change repository visibility or grant Cloudflare access to any other repository.

## Required privacy and output boundary

The production build must pass the repository's full validation pipeline and scripts/check-public-site.mjs. The public output allowlist is exact: 31 HTML pages (Help homepage, Everyday Help homepage, Suite getting-started page, three shared Everyday Help topic guides, ten Everyday Help product guides, one Decks slide-show guide, Technical Documentation homepage, three system references, and ten technical product references) plus 24 local assets (one CSS file, one search JavaScript file, ten product icon SVGs, ten workflow illustration SVGs, the root favicon SVG, and the social-preview SVG), plus one `_headers` policy file, for 56 files total.

The generated site must remain static and read-only. Do not add accounts, authentication, forms, uploads, comments, editing, analytics, advertising, tracking, external scripts, external fonts, external images, external stylesheets, or customer-data collection. Do not publish internal architecture, development, security, release, maintainer, runner, or repository material.

Do not weaken the output allowlist or bypass the privacy audit to make a deployment pass. A failed build, test, link check, or output audit blocks deployment.

## Cloudflare GitHub connection

The Cloudflare GitHub App must be installed with repository access restricted to Only select repositories, selecting only conz20/Brightdesk-Wiki. Verify the selected repository list before connecting the Pages project. Never select all repositories.

Cloudflare's GitHub App connection is separate from the Cloudflare API MCP token. A Pages API token does not install or authorise the GitHub App.

## Domain and DNS safeguards

- The approved customer address is **https://brightdesk-help.pages.dev/**, using Cloudflare's free project hostname.
- No custom domain purchase, paid registration, DNS record change, nameserver change or DNSSEC change is required or authorised. Never change nameservers, DNS records, DNSSEC or domain registration for this project.
- Do not configure `help.brightdesk.com`, transfer or change domain registration, or migrate DNS.
- A custom domain is outside the current project. Any future proposal would require a complete current DNS-zone export, a preservation plan and the owner's explicit approval of the exact change before any action.

## Cloudflare documentation reference

The optional `.github/mcp.json` configuration exposes only Cloudflare's public documentation search server. It is read-only and requires no account token or GitHub secret.

Do not add a Cloudflare API execution server, API token, or GitHub Agents secret to this repository. The website's deployment does not require Cloudflare API credentials. Do not grant DNS Write or broader Cloudflare permissions, and do not delete Pages projects or deployments as part of setup or repair. Cloudflare project changes must be made by the owner in the Cloudflare dashboard and must follow the approval boundaries above.

## Deployment verification

Before creating or changing the production project, inspect the current repository files and retrieve the current Pages documentation. Run the repository's existing build and checks. Do not claim a deployment succeeded merely because an API call or build command returned success.

A live-site claim requires:
- The correct private Wiki repository connected.
- Production branch main; verify the preview-branch setting against the owner's approved policy (target None).
- A successful current build and the exact 52-file privacy audit.
- The free project hostname https://brightdesk-help.pages.dev/ serving the verified production deployment over valid HTTPS.
- The deployed commit SHA recorded.
- The homepage, Suite guide, and all ten product guides checked on the live .com URL.

Keep this skill subordinate to the repository's fixed privacy, cost, product-scope, and DNS requirements.
