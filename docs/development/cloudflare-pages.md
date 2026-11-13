# Maintainer setup: Cloudflare Pages Free for Brightdesk Help

## Purpose and customer promise

Brightdesk Suite, the ten approved desktop products and Brightdesk Help remain free for every customer. There are no subscriptions, paid customer tiers, trials, licence fees, customer accounts, sign-ins, passwords, paywalls or advertising.

Brightdesk Help is a separate, static, read-only public website. It is not a customer product, desktop application, Suite component, installer payload, App Centre item or runtime dependency. It does not receive customer documents or product data.

The source repository conz20/Brightdesk-Wiki remains private. The published output is restricted to the customer homepage, Suite getting-started page, exactly ten product guides and one local CSS file: 12 customer pages and 13 static files total (12 HTML pages plus local CSS).

## Owner authorisation and cost boundary

- The owner explicitly approved Cloudflare Pages Free for publishing the Help website.
- The owner's preferred public customer address is **https://help.brightdesk.com**. Treat this as the intended canonical URL, not as a live or registered domain.
- A DNS check on 13 November 2026 found `brightdesk.com` pointed at a Sedo parking address and used `ns1.sedoparking.com` / `ns2.sedoparking.com`. This indicates that the domain is registered/parked; it does not establish the owner's ownership, purchase price or availability. Registrar and DNS control are not verified.
- No domain purchase, transfer, paid Cloudflare plan, trial, subscription, add-on, GitHub plan or upgrade is authorised. Do not purchase a domain or change registrar, nameserver or DNS settings.
- Do not publish or advertise a `pages.dev` address as the customer website. Cloudflare's generated `pages.dev` host is a technical Pages origin only. The customer-facing URL must end in `.com`.
- If the owner obtains and confirms control of `brightdesk.com`, configure `help.brightdesk.com` as a Cloudflare Pages custom subdomain. If that domain cannot be obtained, stop and wait for an owner-approved alternative `.com` domain before publication.
- Do not configure a custom domain or make DNS changes until domain ownership/control is verified and the owner has approved the exact changes.
- Use Cloudflare's GitHub integration. Do not create or store a Cloudflare API token or account ID in the repository.
- The GitHub App installation must be scoped to **Only select repositories**, with conz20/Brightdesk-Wiki as the only selected repository. Do not grant Cloudflare access to any other Brightdesk source repository.
- The source repository stays private. Do not change GitHub repository visibility or collaborator permissions.

Cloudflare's current Free Pages limits include 500 builds per month and one concurrent build. The Help site is small (13 static files), and normal documentation updates should fit comfortably within those published limits.

## Cloudflare project configuration

Create one Pages project using **Import an existing Git repository** and select the private conz20/Brightdesk-Wiki repository after authorising the Cloudflare GitHub App.

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

In the Pages project settings, open **Builds & deployments → Branch control**. Keep the production branch set to main and set preview branch deployments to **None**. This avoids publishing review branches or in-progress documentation as preview sites. Production builds occur only from pushes to the reviewed main branch.

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

The output audit requires exactly these files:

- index.html — Brightdesk Help homepage.
- customer-start-here.html — Suite getting-started guide.
- products/pages.html, products/sheets.html, products/decks.html, products/notes.html, products/database.html, products/forms.html, products/lists.html, products/planner.html, products/to-do.html, and products/workspace.html.
- assets/css/site.css — local styling.

No other output file or folder is permitted. Architecture, development, security, release and maintainer material stays in the private repository and outside the customer site. Do not publish repository READMEs, scripts, tests, workflows, lockfiles, credentials, prompts, internal reports, logs or customer documents.

Customer output must remain static and read-only: no customer login, accounts, forms, uploads, comments, editing, administration controls, analytics scripts, ads, tracking scripts, external fonts, external images or external stylesheets. The output audit is the final authority; a deployment must not proceed when it fails.

## Privacy note

The website itself contains no Brightdesk analytics, advertising, tracking scripts, forms or customer upload mechanism. Opening Help from a desktop product sends no product documents or application data.

Cloudflare operates the hosting network and processes technical request metadata for visitors, which can include IP addresses and traffic-routing information. Do not claim that visitor IP addresses or all request metadata are never processed. See [Cloudflare's privacy policy](https://www.cloudflare.com/privacypolicy/) and [Cloudflare's Australia Privacy Act information](https://www.cloudflare.com/en-au/trust-hub/australia-privacy-act/).

## Current publication status and release

The repository build configuration is ready for Cloudflare Pages Free and the current pull-request head passed its full GitHub quality workflow. The Cloudflare account connection, GitHub App installation and Pages project still require verified account-side setup. No deployed customer URL is confirmed.

The required customer URL is **https://help.brightdesk.com**. The domain's current DNS points to Sedo parking, so domain ownership and DNS control must be established before any CNAME or nameserver changes. No purchase or DNS change is authorised yet.

Before reporting the site as live:

1. Confirm the Cloudflare GitHub App is installed for **only** conz20/Brightdesk-Wiki.
2. Confirm project build settings, production branch main, output _site and preview branch **None**.
3. Confirm the owner controls the selected `.com` domain and approves the precise DNS change.
4. In Cloudflare Pages, add `help.brightdesk.com` under **Custom domains**. For this subdomain, Cloudflare documents a CNAME record pointing `help.brightdesk.com` to the exact project `*.pages.dev` hostname; do not create the record before the Pages custom domain is registered in the dashboard.
5. Confirm a production build completes, the Cloudflare Pages output audit passes and the custom domain obtains a valid HTTPS certificate.
6. Open the homepage, Suite guide and all ten product guides. Check links, local CSS, narrow-screen layout, visible keyboard focus and reduced-motion styling.
7. Record the exact `.com` URL and deployed commit SHA. The generated `pages.dev` address is not the customer-facing URL.
8. Only after the `.com` URL is live, update the eleven in-app Help links to that exact address. Keep the existing Help-link pull requests unmerged until then.

Cloudflare's custom-domain instructions for subdomains are documented at [Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).

The Wiki remains a separate optional Help resource. It is not bundled, installed or required for offline Brightdesk use.

## Official Cloudflare documentation

- [GitHub integration](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/)
- [Git integration and branch deployment controls](https://developers.cloudflare.com/pages/configuration/git-integration/)
- [Branch deployment controls](https://developers.cloudflare.com/pages/configuration/branch-build-controls/)
- [Jekyll on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-jekyll-site/)
- [Cloudflare Pages build image and runtime versions](https://developers.cloudflare.com/pages/configuration/build-image/)
- [Cloudflare Pages Free plan limits](https://developers.cloudflare.com/pages/platform/limits/)
