# Maintainer setup: GitHub Pages for Brightdesk Help

## Customer price promise and separation

Brightdesk Suite, the ten approved desktop products and the Brightdesk Wiki/customer help centre are free for every customer. Customers must never be charged to use the products or read the help guides. There is no paywall, subscription, paid customer tier, trial, licence fee or customer account requirement.

Brightdesk Help is a separate, static, read-only website. It is not a customer product, desktop application, Suite component, installer payload, App Centre item or runtime dependency.

**No paid hosting plan, paid GitHub plan, hosting subscription, trial or upgrade may be purchased to publish or maintain the Wiki.** The source repository `conz20/Brightdesk-Wiki` must remain private. The public website, if it can be published using an approved no-cost GitHub Pages entitlement, is readable without charge and without a customer sign-in.

## Current publication status

Not configured or deployed. The existing account's no-cost eligibility for publishing Pages from a private repository has not been verified. Do not describe the site as public, live or available to customers until a permitted no-cost publishing path, exact output checks and successful deployment have all been verified.

## No-cost GitHub Pages gate

GitHub Pages plan rules may prevent a GitHub Free account from publishing a site from a private source repository. A public Pages site generated from a private source repository is still public on the internet.

The owner requires the source repository and all Brightdesk repositories to remain private, and does not authorise any paid plan, purchase, trial, renewal or upgrade.

- Check the existing account entitlement only; do not buy or activate a plan.
- If the current no-cost GitHub arrangement permits Pages from this private repository, that no-cost route may be considered after all review gates pass.
- If the current no-cost arrangement does not permit Pages from a private repository, stop and leave the customer website unpublished.
- Do not make this repository public, create a public replacement repository, use a paid plan, or switch to another hosting provider.
- Do not change repository permissions, visibility or settings to work around the restriction.

The customer help content remains intended to be free regardless of publication status. A free customer promise does not justify exposing private source material or incurring a paid hosting cost.

## Intended site source and output

- Repository: `conz20/Brightdesk-Wiki` (private).
- Production branch: `main`.
- Build tool: pinned Jekyll.
- Source directory: `docs/`.
- Generated output: `_site/`.
- The public site must contain only:
  - `index.html` — customer help homepage.
  - `customer-start-here.html` — customer product chooser and guide labels.
  - The ten pages under `products/`.
  - The local `assets/css/site.css` stylesheet.
- Exclude `architecture/`, `development/`, `security/` and `releases/` from generated output.
- Do not include the repository README, package files, lockfiles, scripts, tests, GitHub workflow files, private prompts, credentials, internal reports, logs or customer documents.
- Keep product guide statuses honest. Current product pages are marked **Needs review** until real end-to-end workflows are verified.

The existing `_config.yml` and customer-output checker are draft build inputs. A successful source test does not prove a real Jekyll build or generated-site privacy review.

## GitHub Pages configuration

Do not configure or deploy Pages while the no-cost entitlement, exact build/privacy verification and publication review are outstanding. Do not add deployment permissions or a production deploy workflow to this draft branch.

Only after a qualifying no-cost private-source route is verified, the current-head build and output review pass, and the owner explicitly authorises production publication:

1. Open the private `conz20/Brightdesk-Wiki` repository.
2. Open **Settings → Pages**.
3. Select **GitHub Actions** as the build and deployment source when the approved Pages workflow is ready.
4. Keep the source repository private. Do not change repository visibility.
5. Keep production publication restricted to the reviewed `main` branch.
6. Do not enable branch/PR preview deployments from the draft Wiki PR.
7. Do not add a custom domain unless a separate owner instruction authorises it.

GitHub recommends custom Actions workflows for automated builds. A Pages deployment job needs at least `pages: write` and `id-token: write` permissions. Do not add those deployment permissions or a production deploy workflow to this draft branch.

## Privacy, security and visitor data

- GitHub Pages makes the generated website public. Never put anything in the generated output that should remain private.
- Publish only the ten approved customer products: Pages, Sheets, Decks, Notes, Database, Forms, Lists, Planner, To Do and Workspace.
- Keep Brightdesk-AI and every engineering/supporting repository private and out of customer documentation.
- The site is static and read-only. No customer login, account, document upload, support form, database, analytics, advertising, tracking script, external JavaScript, third-party font or remote image is approved.
- Use only local CSS, local links and static content.
- GitHub processes visitor IP addresses and other connection information for service operation and security. Do not claim that no visitor metadata is processed.
- The website is optional customer help. A simple **Help** link is being added to the Suite and each of the ten product interfaces. The Suite link opens the help homepage; each product link opens its matching guide.
- Help opens in the customer's normal browser and is restricted by the desktop app to the approved public Brightdesk Help host and path. It does not open the private source repository.
- Brightdesk remains local-first. The Wiki is not required to install, launch or use the Suite or any product; no documents or app data are sent when a customer opens Help.
- The product links must not be released as usable customer links until the approved public site is deployed and its exact URL is verified.

## Verification required before production

1. Confirm the existing GitHub account has a **no-cost** entitlement that supports Pages from a private repository. Do not infer this from repository permissions.
2. Confirm `Brightdesk-Wiki` is still private.
3. Build the site with the pinned Jekyll/Ruby toolchain on the approved no-cost runner.
4. Run all Node checks and tests, the Markdown link checker, Jekyll build and generated-output audit on the same exact commit.
5. Inspect the actual `_site/` directory to prove it contains only the 12 intended HTML pages and the local stylesheet, with no internal documentation, unexpected files, external resources or private GitHub links.
6. Check the generated site's navigation, accessibility, keyboard/focus behaviour, responsive layout and reduced-motion behaviour.
7. Keep the Wiki PR draft and unmerged until exact-head CI and review are complete.
8. Production publication can occur only from the approved `main` branch after review and explicit owner authorisation for that action.
9. Verify the published URL and deployed commit before reporting that customers can access the help website.

## Official GitHub documentation

- [Creating a GitHub Pages site with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll)
- [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Pages limits and plan availability](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [GitHub Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
