# Maintainer setup: GitHub Pages for Brightdesk Help

## Purpose and separation

Brightdesk Help is a separate, public, read-only website for customers to find instructions for the ten Brightdesk desktop products. It is not a customer product, desktop application, Suite component, installer payload, App Centre item or runtime dependency.

The GitHub source repository `conz20/Brightdesk-Wiki` must remain private. GitHub Pages can publish a public website from a private repository only when the owning account has an eligible paid plan. A public Pages website is readable on the internet even though its source repository remains private.

**Publication status:** Not configured or deployed. The account plan has not been confirmed. Do not describe the site as public, live or available to customers until the plan gate, exact output checks, repository settings and successful deployment have all been verified.

## GitHub account-plan gate

GitHub's current documentation states:

- GitHub Free supports Pages for public repositories.
- GitHub Pro, GitHub Team and GitHub Enterprise plans support Pages from private repositories.
- A Pages site published from a private repository is still publicly available on the internet.

The owner requires all 27 Brightdesk repositories to remain private and does not authorise buying, trialling or upgrading a paid plan.

Before configuring Pages, the owner must verify the existing plan under GitHub **Settings → Billing and licensing → Plans and usage**. The connected GitHub API profile does not expose the account subscription plan, so repository admin permission is not evidence of Pro entitlement.

- If the account already has GitHub Pro or an eligible higher plan, proceed with the GitHub Pages configuration below after the publishing review is complete.
- If the account has GitHub Free, stop. Do not make this repository public, create a public replacement repository, buy/activate a plan or switch to another hosting provider. Keep the source private and leave the customer website unpublished.

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

The existing `_config.yml` and customer-output checker are draft build inputs. The current quality workflow's successful result does not prove a real Jekyll build if the Ruby/Bundler steps were skipped.

## GitHub Pages configuration

Only after the account-plan gate and publication review have passed:

1. Open the private `conz20/Brightdesk-Wiki` repository.
2. Open **Settings → Pages**.
3. Select **GitHub Actions** as the build and deployment source when the approved Pages workflow is ready.
4. Keep the source repository private. Do not change repository visibility.
5. Keep production publication restricted to the reviewed `main` branch.
6. Do not enable branch/PR preview deployments from the draft Wiki PR.
7. Do not add a custom domain unless a separate owner instruction authorises it.

GitHub recommends custom Actions workflows for automated builds. A Pages deployment job needs at least `pages: write` and `id-token: write` permissions. Do not add those deployment permissions or a production deploy workflow to this draft branch. They are only appropriate after the plan gate, exact build/privacy verification, review and explicit owner authorisation for production publication.

## Privacy, security and visitor data

- GitHub Pages makes the generated website public. Never put anything in the generated output that should remain private.
- Publish only the ten approved customer products: Pages, Sheets, Decks, Notes, Database, Forms, Lists, Planner, To Do and Workspace.
- Keep Brightdesk-AI and every engineering/supporting repository private and out of customer documentation.
- The site is static and read-only. No customer login, account, document upload, support form, database, analytics, advertising, tracking script, external JavaScript, third-party font or remote image is approved.
- Use only local CSS, local links and static content.
- GitHub processes visitor IP addresses and other connection information for service operation and security. Do not claim that no visitor metadata is processed.
- The website must not be required to install, launch or use Brightdesk, and must never be linked into the Suite or product UI.

## Verification required before production

1. Confirm the existing GitHub account plan supports Pages from a private repository. Do not infer this from repository permissions.
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
