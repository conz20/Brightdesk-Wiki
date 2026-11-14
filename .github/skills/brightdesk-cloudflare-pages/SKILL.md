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

The production build must pass the repository's full validation pipeline and scripts/check-public-site.mjs. The public output allowlist is exact: 27 HTML pages (Help homepage, Everyday Help homepage, Suite getting-started page, ten Everyday Help product guides, Technical Documentation homepage, three system references, and ten technical product references) plus 24 local assets (one CSS file, one search JavaScript file, ten product icon SVGs, ten workflow illustration SVGs, the root favicon SVG, and the social-preview SVG), plus one `_headers` policy file, for 52 files total.

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

## Safe use of Cloudflare MCP

Use the Cloudflare Docs MCP tool search_cloudflare_documentation to retrieve current Cloudflare documentation before relying on API details or changing project settings.

The Cloudflare API MCP server exposes search and execute. The execute tool can call many Cloudflare API endpoints, and Copilot can use configured MCP tools autonomously without asking for approval before each call. Treat the configured API token as the security boundary.

Use only a token scoped to the intended Cloudflare account with:
- Cloudflare Pages Edit, required to create or update the Pages project.
- Account Settings Read, only for account/resource discovery if required by the API MCP server.

Cloudflare Pages Edit includes create, edit, and delete access to Pages projects in that Cloudflare account. Keep the token scoped to the single intended account. Do not grant DNS Write, Zone Edit, Account Settings Edit, Workers, Billing, User, API Tokens, or any unrelated permissions. Never request a Global API Key.

Never read, print, log, copy, expose, or commit the token value. It must be supplied only through the GitHub Agents secret COPILOT_MCP_CLOUDFLARE_API_TOKEN. Do not put credentials in source, workflow files, logs, issues, pull requests, or generated site output.

Do not delete Pages projects, production deployments, domains, DNS records, zones, or account resources. Do not purchase, transfer, renew, or change billing. Stop and request explicit owner approval before any operation outside the fixed Pages project configuration or the DNS safeguards above.

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
