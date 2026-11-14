# Maintainer setup: Cloudflare Pages Free for Brightdesk Help

## Purpose and customer promise

Brightdesk Suite, the ten approved desktop products and Brightdesk Help remain free for every customer. There are no subscriptions, paid customer tiers, trials, licence fees, customer accounts, sign-ins, passwords, paywalls or advertising.

Brightdesk Help is a separate, static, read-only public website. It is not a customer product, desktop application, Suite component, installer payload, App Centre item or runtime dependency. It does not receive customer documents or product data.

The source repository conz20/Brightdesk-Wiki remains private. The current PR #6 customer site build contains 27 approved HTML pages: the Help homepage, Everyday Help homepage, Suite getting-started guide, ten Everyday Help product guides, the Technical Documentation homepage, three system references and ten technical product references. It also contains one local CSS file, one local browser-search JavaScript file, ten original product icons and ten workflow illustrations: 49 files total. The exact output allowlist in `scripts/check-public-site.mjs` is authoritative.

## Owner authorisation and cost boundary

- The owner approved Cloudflare Pages Free and chose the free project hostname as the canonical public Help address: **https://brightdesk-help.pages.dev/**.
- No paid custom domain, domain purchase, transfer, subscription, Cloudflare upgrade, DNS change or nameserver change is required or authorised.
- Keep the source repository private. The public website is served from the Cloudflare Pages project hostname; the source repository is not made public.
- Cloudflare successfully built and deployed pull-request previews for this private repository, including PR #6. This confirms that a Pages project and GitHub integration are active, but does not independently verify production settings or the exact deployed production commit.
- Verify the GitHub App is scoped to **Only select repositories** with conz20/Brightdesk-Wiki as the only selected repository. Do not grant Cloudflare access to other Brightdesk repositories.
- Keep the existing Pages project named **brightdesk-help**. Do not create a duplicate project.
- Do not configure a custom domain or change DNS/nameservers. The free `pages.dev` hostname is the approved customer-facing address.


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
| Customer-facing public address | `https://brightdesk-help.pages.dev/` (canonical free project hostname) |
| Cloudflare Pages project hostname | `https://brightdesk-help.pages.dev/` (public customer Help address) |
| DNS / custom domain | Not required; do not change DNS or nameservers |

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

Cloudflare Pages Free is active for the project **brightdesk-help**. The canonical public customer Help address is **https://brightdesk-help.pages.dev/**. PR-specific preview URLs are review links and are not the canonical address.

Before reporting the latest source as live:

1. Confirm the Cloudflare GitHub App is scoped to **only** conz20/Brightdesk-Wiki.
2. Confirm the production branch is `main`, the build command is `npm run build:cloudflare`, and the output directory is `_site`.
3. Confirm the project hostname `https://brightdesk-help.pages.dev/` serves the production deployment over valid HTTPS.
4. Record the exact deployed commit SHA and compare it with the intended reviewed source commit.
5. Open the homepage, Suite guide and all ten product guides. Check navigation, local search, local CSS, keyboard focus and narrow-screen layout.
6. Keep the source repository private and the customer site static, read-only and free of tracking, analytics, external scripts, external fonts and external images.

Do not purchase or configure a custom domain. Do not change DNS or nameservers. The free `pages.dev` hostname is the approved public address.

The Wiki remains a separate optional Help resource. It is not bundled, installed or required for offline Brightdesk use.

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
