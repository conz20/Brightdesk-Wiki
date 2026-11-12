# Maintainer setup: separate Brightdesk customer-help website

## Approval

**Owner-approved implementation:** Cloudflare Pages Free with Jekyll, exclusively for the Brightdesk Wiki. The approval does not authorise changing GitHub repository visibility, publishing other repositories, adding a customer login, deploying application code or making the Wiki part of any desktop product.

The repository `conz20/Brightdesk-Wiki` stays private. The generated help website is public and read-only. Keep the source repository and the public website clearly separate.

**Deployment status:** Not deployed. The Cloudflare account connection and Pages project must be configured by an authorised account owner. Do not claim the site is live until a real deployment succeeds and its public URL is checked.

## Cloudflare Pages project settings

Use the Cloudflare Dashboard:

1. Open **Workers & Pages** and choose **Create application**, then **Pages**, then **Connect to Git**.
2. Connect the GitHub account `conz20`.
3. When GitHub asks to install the **Cloudflare Workers & Pages** GitHub App, choose **Only select repositories** and select only `conz20/Brightdesk-Wiki`. Never grant access to all Brightdesk repositories.
4. Select `conz20/Brightdesk-Wiki` and set the production branch to `main`.
5. Keep the root directory at the repository root (`/`).
6. Set the build command to `bundle exec jekyll build`.
7. Set the build output directory to `_site`.
8. Set `RUBY_VERSION=3.4.4`. The root `.ruby-version` file records the same version.
9. Start with the Cloudflare-provided `*.pages.dev` hostname. A custom domain is not part of this approval.

Do not choose a paid plan or enable paid add-ons, Workers, Pages Functions, databases, analytics or external integrations.

## Build and publication boundary

- Jekyll reads only from `docs/` and writes to `_site/`.
- The published customer pages are the help index, the customer start page, the ten approved product guides and the local stylesheet.
- `docs/architecture/`, `docs/development/`, `docs/security/` and `docs/releases/` are excluded from the public build.
- Root-level README, package files, GitHub workflows, tests and scripts are not part of the Jekyll source directory.
- The public-output audit checks required customer pages, allowed file types, internal paths, private GitHub links, JavaScript and external resources.
- The site has no login, customer document upload, form, database, analytics script, ad or tracking widget.
- Do not add public support/contact forms unless a separately approved design and privacy review authorises them.
- Do not embed third-party fonts, remote scripts, remote images or external resources.
- Cloudflare may process connection metadata to deliver and protect the website. Do not describe the hosting layer as collecting no data whatsoever.

A static public site cannot keep individual pages private. Anything generated into `_site/` must be safe for anyone on the internet to read.

## Verification and rollout

1. Keep the GitHub repository private and confirm the Cloudflare GitHub App is scoped to this repository only.
2. Verify the production branch is `main` and build settings match the configuration above.
3. Complete the exact-head GitHub quality workflow, including Node.js 24.22.2 checks, regression tests, Markdown link validation, Jekyll build and public-output audit.
4. Review the generated output and a Cloudflare preview URL for unwanted internal files, private links, incorrect pages, broken navigation, keyboard/focus issues, mobile-width overflow and reduced-motion behavior.
5. Confirm no paid service or add-on has been enabled.
6. After PR review and merge approval, the `main` deployment may be enabled. Verify the resulting public URL before describing the Wiki as available to customers.

Do not deploy from the draft pull request. A passing CI check or a preview build is not proof of a successful production deployment.

## Official references

- [Cloudflare Pages Jekyll guide](https://developers.cloudflare.com/pages/framework-guides/deploy-a-jekyll-site/)
- [Cloudflare Pages build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/)
- [Cloudflare Pages GitHub integration and repository access](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/)
- [Cloudflare Pages Free limits](https://developers.cloudflare.com/pages/platform/limits/)
