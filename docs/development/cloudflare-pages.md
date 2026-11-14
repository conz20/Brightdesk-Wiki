# Maintainer setup: Cloudflare Pages Free for Brightdesk Help

## Purpose and customer promise

Brightdesk Suite, the ten approved desktop products and Brightdesk Help remain free for every customer. There are no subscriptions, paid customer tiers, trials, licence fees, customer accounts, sign-ins, passwords, paywalls or advertising.

Brightdesk Help is a separate, static, read-only public website. It is not a customer product, desktop application, Suite component, installer payload, App Centre item or runtime dependency. It does not receive customer documents or product data.

The source repository conz20/Brightdesk-Wiki remains private. The current PR #6 customer site build contains 27 approved HTML pages: the Help homepage, Everyday Help homepage, Suite getting-started guide, ten Everyday Help product guides, the Technical Documentation homepage, three system references and ten technical product references. It also contains one local CSS file, one local browser-search JavaScript file, ten original product icons and ten workflow illustrations: 49 files total. The exact output allowlist in `scripts/check-public-site.mjs` is authoritative.

## Owner authorisation and cost boundary

- The owner explicitly approved Cloudflare Pages Free for publishing the Help website.
- The owner's preferred public customer address is **https://help.brightdesk.com**. Treat this as the intended canonical URL, not as a live or registered domain.
- The owner has confirmed in this conversation that they own `brightdesk.com`. Record this as **owner-confirmed**, not as independent registry verification.
- Public DNS on 13 November 2026 confirms that the whole domain is delegated to Sedo parking nameservers: `ns1.sedoparking.com` and `ns2.sedoparking.com`. The root A record is `64.190.63.111`; a fresh lookup on 13 November 2026 shows both `www` and `help` resolving to `64.190.63.111`. The visible MX record is priority 0 `localhost`, and TXT includes `v=spf1 -all`. The SOA identifies `hostmaster.sedo.de`. This is a public DNS snapshot, not a complete zone export; other record types or records not returned by the lookup may exist.
- The registrar and the owner's ability to edit authoritative DNS are not yet established. `help.brightdesk.com` is not a Pages CNAME yet; it resolves to the Sedo parking IP. Public DNS does not show whether the owner's Sedo account supports custom records. Check the account's DNS controls first. If it supports a custom CNAME, keep the current nameservers and add the record there. Migrate nameservers only if Sedo does not support the required record.
- No domain purchase, transfer, paid Cloudflare plan, trial, subscription, add-on, GitHub plan or upgrade is authorised.
- Do not publish or advertise a `pages.dev` address as the customer website. Cloudflare's generated `pages.dev` host is a technical Pages origin only. The customer-facing URL must end in `.com`.
- Keep `https://help.brightdesk.com` as the target. Before configuring DNS, identify the registrar/DNS control panel and inventory the existing DNS records. Preserve any existing website, mail, verification and security records. Do not replace nameservers or alter DNS until the record set is understood and the owner has approved the exact change.
- Use Cloudflare's GitHub integration. Do not create or store a Cloudflare API token or account ID in the repository.
- On 14 November 2026, Cloudflare successfully built and deployed pull-request previews for this private repository, including PR #6. This confirms that a Cloudflare Pages GitHub integration and Pages project are now active. It does not independently prove the GitHub App's exact repository-access scope; verify that scope is **Only select repositories** with conz20/Brightdesk-Wiki as the only selected repository before production. Do not claim that the app is scoped correctly until the installed-app configuration is inspected.
- The GitHub App installation must be scoped to **Only select repositories**, with conz20/Brightdesk-Wiki as the only selected repository. Do not grant Cloudflare access to any other Brightdesk source repository.
- The source repository stays private. Do not change GitHub repository visibility or collaborator permissions.

Cloudflare Pages Free currently allows 500 builds per month and one concurrent build. The 49-file Help output is well below the Free plan's 20,000-file limit. Check the [official Pages limits](https://developers.cloudflare.com/pages/platform/limits/) before relying on quotas, as provider limits can change.

## Cloudflare project configuration

The existing Cloudflare Pages project is named **brightdesk-help**, as shown by successful PR preview deployment checks on 14 November 2026. Do not create a duplicate project. Verify the existing project's Git repository, production branch and build settings against the table below. Confirm its GitHub App access scope before production.

Use these exact settings:

| Setting | Value |
| --- | --- |
| Project name | Choose an available name such as brightdesk-help; confirm the resulting pages.dev address before updating app links |
| Production branch | main |
| Root directory | / (repository root) |
| Build command | npm run build:cloudflare |
| Build output directory | _site |
| Node.js version | .node-version sets 24.22.2 |
| Ruby version | .ruby-version sets 3.4.4 |
| Preview branch | **None** |
| Customer-facing custom domain | `help.brightdesk.com`, only after domain and DNS control are verified and the owner approves setup |
| Cloudflare Pages project hostname | Cloudflare-generated `*.pages.dev` host (technical origin only; do not advertise as the customer URL) |
| DNS record for the custom subdomain | CNAME `help` → the exact project `*.pages.dev` host, only after the Pages custom domain is added and DNS changes are approved |

Cloudflare's build image supports selecting Node.js and Ruby versions using the repository's .node-version and .ruby-version files. The Jekyll build reads the root Gemfile and the root _config.yml; the configured source is docs/ and the output is _site/.

### GitHub App access scope

Cloudflare requires both authorisation of the GitHub user and installation of its GitHub App. These are separate steps. When configuring the installation on GitHub, select **Only select repositories** and select only Brightdesk-Wiki. Verify the installed-app repository list before creating the Pages project. Do not select all repositories.

### Disable preview deployments

In the Pages project settings, open **Builds & deployments → Branch control**. The current PR #6 preview deployments are active and have successfully published review branches. The intended production setting in this runbook is preview branch deployments **None**, to avoid exposing unfinished documentation. Verify the current branch-control setting in the Cloudflare dashboard and align it with the owner's approved release policy before production. Do not change this setting without approval of the exact change. Production builds should occur only from pushes to the reviewed main branch.

## Mandatory build and privacy gate

Cloudflare's build command is npm run build:cloudflare. It performs the following sequence and must fail on any failed step:

1. Install the locked Node dependencies with npm ci.
2. Confirm Node.js 24.22.2.
3. Check validation-script syntax.
4. Run all Node regression tests.
5. Check every authored Markdown link.
6. Install the pinned Jekyll dependency from the root Gemfile.
7. Build the real Jekyll site into _site/.
8. Run scripts/check-public-site.mjs against the generated output.

The output audit requires exactly 49 files:

**27 HTML pages**
- `index.html` — Brightdesk Help homepage.
- `everyday/index.html` — Everyday Help homepage.
- `customer-start-here.html` — Suite getting-started guide.
- `products/pages.html`, `products/sheets.html`, `products/decks.html`, `products/notes.html`, `products/database.html`, `products/forms.html`, `products/lists.html`, `products/planner.html`, `products/to-do.html` and `products/workspace.html` — the ten Everyday Help product guides.
- `technical/index.html` — Technical Documentation homepage.
- `technical/system-overview.html`, `technical/file-formats.html` and `technical/data-and-privacy.html` — three system references.
- `technical/products/pages.html`, `technical/products/sheets.html`, `technical/products/decks.html`, `technical/products/notes.html`, `technical/products/database.html`, `technical/products/forms.html`, `technical/products/lists.html`, `technical/products/planner.html`, `technical/products/to-do.html` and `technical/products/workspace.html` — ten technical product references.

**22 local assets**
- `assets/css/site.css` — local styling.
- `assets/js/search.js` — local-only browser search for the active help area. The generated script must remain free of network requests, analytics and visitor storage.
- `assets/images/product-icons/` — exactly ten approved Brightdesk product SVG icons.
- `assets/images/workflows/` — exactly ten approved workflow SVG illustrations. They are labelled illustrations, not screenshots from running products.

The authoritative exact file list is in `scripts/check-public-site.mjs`. No other output file or folder is permitted. Architecture, development, security, release and maintainer material stays in the private repository and outside the customer site. Do not publish repository READMEs, scripts, tests, workflows, lockfiles, credentials, prompts, internal reports, logs or customer documents.

Customer output must remain static and read-only: no customer login, accounts, forms, uploads, comments, editing, administration controls, analytics scripts, ads, tracking scripts, external fonts, external images or external stylesheets. The output audit is the final authority; a deployment must not proceed when it fails.

## Privacy note

The website itself contains no Brightdesk analytics, advertising, tracking scripts, forms or customer upload mechanism. Opening Help from a desktop product sends no product documents or application data.

Cloudflare operates the hosting network and processes technical request metadata for visitors, which can include IP addresses and traffic-routing information. Do not claim that visitor IP addresses or all request metadata are never processed. See [Cloudflare's privacy policy](https://www.cloudflare.com/privacypolicy/) and [Cloudflare's Australia Privacy Act information](https://www.cloudflare.com/en-au/trust-hub/australia-privacy-act/).

## Current publication status and release

The repository contains the Cloudflare Pages Free build configuration. On 14 November 2026, Cloudflare successfully built PR #6 previews for commits on the review branch, proving that a Pages project and GitHub preview integration are active. A confirmed preview deployment is `ed19c2a7`, built from PR commit `8eac3e3` (`8eac3e316b64e40a0fa813323a09dedc3c7165bd`); its [Cloudflare deployment check](https://github.com/conz20/Brightdesk-Wiki/runs/132402122193) completed successfully. The repository's GitHub Actions quality run #452 also passed on that exact commit. Check the live PR #6 checks for any later preview deployment. PR previews are review environments only, not the production website. The production branch/build settings, exact GitHub App repository-access scope, preview-branch policy, custom domain and HTTPS still require account-side verification.

The required customer URL is **https://help.brightdesk.com**. The owner has confirmed ownership of `brightdesk.com`; current DNS is delegated to Sedo parking nameservers. The registrar and authoritative-DNS editing access are not yet confirmed. No purchase or DNS change is authorised.

Before reporting the site as live:

1. Confirm the Cloudflare GitHub App is installed for **only** conz20/Brightdesk-Wiki.
2. Confirm project build settings, production branch main, output _site and preview branch **None**.
3. Record the owner's confirmation that they control `brightdesk.com` and identify the registrar and DNS provider.
4. Obtain a complete DNS-zone export from the current authoritative provider. The public lookup on 13 November 2026 returned root A `64.190.63.111`, `www` A `64.190.63.111`, `help` A `64.190.63.111`, MX `localhost` and TXT `v=spf1 -all`, but this is not a complete zone export.
5. First check whether the Sedo account provides editable DNS records. If it does, keep the current nameservers and add the Pages CNAME there. If it does not, obtain a complete DNS-zone export, create a zone at the chosen provider, and reproduce every existing record. Preserve root and `www` parking records if the owner wants the existing parked landing page to remain. Validate all website, mail, verification, DNSSEC and security records before changing nameservers.
6. Only if Sedo does not support the required custom CNAME, change the authoritative nameservers at the registrar after the replacement zone is complete and the owner has approved the exact change. Never change nameservers blindly or leave records behind.
7. In Cloudflare Pages, add `help.brightdesk.com` under **Custom domains**. Cloudflare requires the subdomain to be added to the Pages project before the CNAME is created. The CNAME target must be the exact project `*.pages.dev` hostname.
8. Add the `help` CNAME at the new authoritative DNS provider, then verify the custom domain obtains a valid HTTPS certificate and points to the correct Pages project.
9. Confirm a production build completes, the Cloudflare Pages output audit passes, and the production deployment is from `main`.
10. Open the homepage, Suite guide and all ten product guides. Check links, local CSS, narrow-screen layout, visible keyboard focus and reduced-motion styling.
11. Record the exact `.com` URL and deployed commit SHA. The generated `pages.dev` address is not the customer-facing URL.
12. Only after the `.com` URL is live, update the eleven in-app Help links to that exact address. Keep the existing Help-link pull requests unmerged until then.

Cloudflare's custom-domain instructions for subdomains are documented at [Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).

The Wiki remains a separate optional Help resource. It is not bundled, installed or required for offline Brightdesk use.



## GitHub Copilot repository integration

The Cloudflare agent-setup instructions have been adapted for this repository so the setup lives in GitHub rather than on the owner's Mac. The project-scoped skill is `.github/skills/brightdesk-cloudflare-pages/SKILL.md`; the MCP configuration for Copilot CLI is `.github/mcp.json`. Neither file contains a credential.

### Copilot cloud agent configuration

The repository MCP file is available to project-level Copilot CLI clients. GitHub Copilot cloud agent uses the repository's MCP settings page as a separate configuration step:

1. Open **Brightdesk-Wiki → Settings → Copilot → MCP servers**.
2. Paste the complete JSON from [`.github/mcp.json`](../../.github/mcp.json) into **MCP configuration** and save it.
3. Open **Settings → Secrets and variables → Agents → Secrets**.
4. Create a repository secret named `COPILOT_MCP_CLOUDFLARE_API_TOKEN` and store the Cloudflare API token as its value. Do not paste the token into chat, source files, Actions secrets, issues, or logs. GitHub exposes this prefixed secret to the MCP server, not to ordinary agent shell commands.

Copilot cloud agent can use MCP tools autonomously without asking for approval before each call. The API server's `execute` tool can call Cloudflare API endpoints, so the token scope below is mandatory, not optional. The documentation server is public and read-only; it needs no secret.

### Cloudflare API token scope

Create a custom Cloudflare API token for the single account that owns the Brightdesk Help project. Use only **Cloudflare Pages Edit** and **Account Settings Read** (for account/resource discovery if required). Cloudflare documents that Pages Edit can create, update, and delete Pages projects; keep this token in the GitHub Agents secret and never reuse it for other repositories. Do not grant DNS Write, Zone Edit, Account Settings Edit, Workers, Billing, User, API Tokens, Global API Key, or unrelated permissions. Pages Edit is account-scoped, so it permits changes to Pages projects in that account; the skill prohibits deleting projects or deployments.

The Cloudflare API MCP server is configured with the `search` and `execute` tools only. The Cloudflare Docs MCP server exposes only `search_cloudflare_documentation`. An API token does not install or authorise the GitHub App for Cloudflare Pages. The GitHub App must still be installed separately with **Only select repositories**, choosing Brightdesk-Wiki only.

No Cloudflare token or GitHub secret has been created by this repository change. The Pages project and GitHub preview integration are active, but the exact GitHub App access scope, production settings, DNS configuration and live custom domain are not yet verified. Do not describe the site as live.

## Official Cloudflare documentation

- [GitHub integration](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/)
- [Git integration and branch deployment controls](https://developers.cloudflare.com/pages/configuration/git-integration/)
- [Branch deployment controls](https://developers.cloudflare.com/pages/configuration/branch-build-controls/)
- [Jekyll on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-jekyll-site/)
- [Cloudflare Pages build image and runtime versions](https://developers.cloudflare.com/pages/configuration/build-image/)
- [Cloudflare Pages Free plan limits](https://developers.cloudflare.com/pages/platform/limits/)
