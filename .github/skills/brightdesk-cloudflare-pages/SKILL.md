---
name: brightdesk-cloudflare-pages
description: Use when setting up, configuring, deploying, or troubleshooting the existing Brightdesk Help site on Cloudflare Pages.
---

# Brightdesk Help on Cloudflare Pages

## Scope

This repository contains the private source for the separate Brightdesk customer Help website. Maintain it as an existing Cloudflare Pages static-site project. Do not migrate it to Workers, introduce Wrangler, or turn it into a customer product.

The only intended customer URL is https://help.brightdesk.com. It is the approved target, not a verified live site. Never advertise a generated pages.dev hostname as the customer URL.

The Help site is optional. It is not bundled with Brightdesk, not required for offline use, and must never receive customer documents or application data.

## Fixed project configuration

Use these settings unless the repository owner explicitly changes them:

- Cloudflare product: Pages Free.
- GitHub repository: conz20/Brightdesk-Wiki, and no other Brightdesk repository.
- Production branch: main.
- Preview branch deployments: None.
- Root directory: repository root (/).
- Build command: npm run build:cloudflare.
- Build output directory: _site.
- Node.js: exactly 24.22.2 from .node-version.
- Ruby: exactly 3.4.4 from .ruby-version.
- Jekyll source: docs/.
- Jekyll output: _site/.

Do not add paid plans, paid add-ons, metered services, subscriptions, or trials. Do not change repository visibility or grant Cloudflare access to any other repository.

## Required privacy and output boundary

The production build must pass the repository's full validation pipeline and scripts/check-public-site.mjs. The public output allowlist is exact: 12 HTML pages (Help homepage, Suite getting-started page, and ten approved product guides), one local CSS file and one audited local search module, for 14 static files total.

The generated site must remain static and read-only. Its only interactive element is the accessible Help search field, powered by the one audited local search module. The search must remain in-browser and must not make network requests, use cookies or visitor storage, or send search terms anywhere. Do not add accounts, authentication, forms, uploads, comments, editing, analytics, advertising, tracking, external scripts, external fonts, external images, external stylesheets, or customer-data collection. Do not publish internal architecture, development, security, release, maintainer, runner, or repository material.

Do not weaken the output allowlist or bypass the privacy audit to make a deployment pass. A failed build, test, link check, or output audit blocks deployment.

## Cloudflare GitHub connection

The Cloudflare GitHub App must be installed with repository access restricted to Only select repositories, selecting only conz20/Brightdesk-Wiki. Verify the selected repository list before connecting the Pages project. Never select all repositories.

Cloudflare's GitHub App connection is separate from the Cloudflare API MCP token. A Pages API token does not install or authorise the GitHub App.

## DNS and custom-domain safeguards

The domain brightdesk.com is currently recorded as delegated to Sedo parking nameservers. The public DNS snapshot dated 13 November 2026 showed the root, www, and help names resolving to 64.190.63.111. This is not a complete DNS-zone export and does not establish which records are editable in the owner's registrar account.

Never change nameservers, DNS records, DNSSEC, mail records, or domain registration/transfer settings without all of the following:

1. A complete DNS-zone export from the current authoritative provider.
2. A record-by-record preservation plan for all existing website, mail, verification, and security records.
3. The owner's explicit approval of the exact proposed DNS change.

Check whether the current Sedo DNS controls support adding the help CNAME first. If they do, keep the current nameservers. Do not migrate DNS just to use Cloudflare Pages.

For a subdomain, add help.brightdesk.com under the Pages project's Custom domains first. Only then use the exact pages.dev CNAME target Cloudflare displays for that project. Never guess the target. Verify DNS resolution and HTTPS before reporting the site live.

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
- Production branch main and preview deployments set to None.
- A successful current build and the exact 13-file privacy audit.
- The custom domain help.brightdesk.com active with valid HTTPS.
- The deployed commit SHA recorded.
- The homepage, Suite guide, and all ten product guides checked on the live .com URL.

Keep this skill subordinate to the repository's fixed privacy, cost, product-scope, and DNS requirements.
