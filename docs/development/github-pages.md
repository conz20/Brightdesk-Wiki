> **Superseded 13 November 2026:** The active, owner-approved publishing path is [Cloudflare Pages Free](cloudflare-pages.md). This file is retained as historical record of the earlier GitHub Pages investigation. Do not follow its old Pages setup steps or change GitHub Pages settings.
>
> GitHub Settings later showed that private-source Pages publication was unavailable under the account's current setup. The owner chose Cloudflare Pages Free instead. The Wiki repository remains private and the customer Help site remains unpublished until the Cloudflare GitHub App is installed for this repository only, the production project is configured and a successful deployment is verified.

---

# Maintainer setup: GitHub Pages for Brightdesk Help

## Customer promise and site boundary

Brightdesk Suite, the ten approved desktop products and Brightdesk Help are free for every customer. There are no subscriptions, paid customer tiers, trials, licence fees, customer accounts, sign-ins, passwords, paywalls or advertising.

Brightdesk Help is a separate, static, read-only public website. It is not a customer product, desktop application, Suite component, installer payload, App Centre item or runtime dependency. It does not receive customer documents or product data.

The generated website is public on the internet. The source repository `conz20/Brightdesk-Wiki` must remain private. The public output must contain only the customer homepage, Suite start page, exactly ten product guides and the local CSS file.

## Confirmed publication decision

- The owner has explicitly authorised publication of the public, read-only Help website at `https://conz20.github.io/Brightdesk-Wiki/`.
- The owner confirmed the existing GitHub account has an eligible plan for Pages from a private source repository.
- No additional paid plan, purchase, trial, renewal, upgrade or third-party hosting service is authorised or required.
- The source repository and all Brightdesk repositories remain private.
- Customers are not charged for the Suite, the ten products or the Help website.

GitHub Pages supports public websites from private source repositories on eligible GitHub Pro, Team and Enterprise plans. The published site remains public even though its source repository is private. Do not confuse this with private publishing of a Pages website, which has different plan requirements.

## Current production setup

The Wiki source repository is private and its source/output validation has passed on the current draft revision. The repository has not yet been configured to publish through GitHub Pages, and the production site has not yet been deployed.

The remaining repository setting is **Settings → Pages → Build and deployment → Source → GitHub Actions**. Select GitHub Actions and save. Do not change repository visibility, permissions, billing, hosting or any other setting.

## Source and generated output

- Repository: `conz20/Brightdesk-Wiki` (private).
- Production branch: `main`.
- Build tool: pinned Jekyll 4.4.1 and Ruby 3.4.4.
- Source directory: `docs/`.
- Generated output: `_site/`.
- Public output allowlist:
  - `index.html` — Brightdesk Help homepage.
  - `customer-start-here.html` — Suite getting-started guide.
  - Exactly ten pages under `products/`.
  - `assets/css/site.css` — local stylesheet.
- Exclude `architecture/`, `development/`, `security/` and `releases/` from generated output.
- Do not publish the repository README, package files, lockfiles, scripts, tests, GitHub workflow files, private prompts, credentials, internal reports, logs or customer documents.
- Product guides retain their truthful evidence labels. A guide marked **Needs review** is not represented as runtime-verified.

## Automated publication controls

The production workflow is part of `.github/workflows/quality.yml`.

1. Pull requests run the full documentation checks, tests, Markdown link scan, Jekyll build and public-output audit. Pull requests never deploy.
2. A push to `main` repeats the full checks and builds the site using the project base path `/Brightdesk-Wiki`.
3. The Pages artifact is uploaded only after the generated-output audit passes.
4. Deployment runs only after the quality job succeeds, from `main`, using the `github-pages` environment.
5. The deployment job runs on the existing private macOS ARM64 runner and uses pinned official GitHub Actions.
6. A manual workflow run requires an explicit `confirm_publication` input. The default is false.
7. No preview deployment is enabled for pull requests or other branches.

The deploy job requests only the permissions it needs: `actions: read`, `contents: read`, `pages: write` and `id-token: write`. The quality job retains read-only repository access and only Pages read access.

## Privacy and read-only requirements

- The Wiki website is public, static and read-only.
- No customer login, account, document upload, support form, comments, editing or administration controls.
- No analytics, advertising, tracking, external JavaScript, third-party fonts, remote images or external stylesheet dependencies.
- Keep Brightdesk-AI and engineering/maintainer material private and outside the generated website.
- GitHub processes visitor IP addresses and other connection information for service operation and security; do not claim otherwise.
- The site is optional customer help and is not required to install or use Brightdesk offline.
- Opening Help from a desktop product sends no documents or application data.

## Verification and release

Before reporting that customers can access the website:

1. Keep the source repository private and confirm the Pages source is GitHub Actions.
2. Merge the reviewed Wiki PR to `main` only after its exact-head quality workflow succeeds.
3. Confirm the main-branch production workflow completes the Jekyll build, output audit, artifact upload and deployment.
4. Verify the published URL is exactly `https://conz20.github.io/Brightdesk-Wiki/`.
5. Verify the deployed commit matches the approved `main` revision.
6. Open the homepage, Suite start page and each of the ten guides; check local CSS, navigation, mobile layout, focus visibility and reduced motion.
7. Only after the deployment URL is confirmed may the eleven desktop Help-link PRs be considered ready for release. The Help links must not be released against an unpublished site.

## Official GitHub documentation

- [Configuring a publishing source for GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Pages limits and plan availability](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
