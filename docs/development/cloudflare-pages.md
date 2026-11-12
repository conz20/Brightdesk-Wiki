# Maintainer setup: separate public help website

## Approved implementation

The owner approved **Cloudflare Pages Free with Jekyll** for the Brightdesk customer-help website. This approval is limited to the Brightdesk-Wiki repository and does not authorise hosting any other Brightdesk repository or product runtime.

The GitHub repository remains private. Cloudflare Pages builds the static customer site from the `docs/` source directory. Jekyll excludes the maintainer, architecture, security and release documentation. `scripts/check-public-site.mjs` audits the generated output before it can be treated as ready.

## Cloudflare Pages project settings

When the owner connects the Cloudflare account:

- Create a Pages project using the Git integration.
- Install/authorise the **Cloudflare Workers & Pages** GitHub App for **only** `conz20/Brightdesk-Wiki`. Do not grant access to all repositories.
- Select `conz20/Brightdesk-Wiki` and set the production branch to `main`.
- Keep the root directory at the repository root (`/`).
- Build command: `bundle exec jekyll build`.
- Build output directory: `_site`.
- Set `RUBY_VERSION=3.4.4` in both preview and production environments. The root `.ruby-version` file also records the same version.
- Use the Cloudflare-provided `*.pages.dev` hostname initially. Do not add or purchase a custom domain without separate owner approval.

Official setup references:

- [Cloudflare Pages Jekyll guide](https://developers.cloudflare.com/pages/framework-guides/deploy-a-jekyll-site/)
- [Cloudflare Pages build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/)
- [Cloudflare Pages GitHub integration and repository access](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/)
- [Cloudflare Pages Free limits](https://developers.cloudflare.com/pages/platform/limits/)

## Privacy and scope controls

- Keep `Brightdesk-Wiki` private. A public website does not require a public source repository.
- Scope the Cloudflare GitHub App to this repository only.
- Publish only the customer-facing material in `docs/index.md`, `docs/customer-start-here.md` and `docs/products/`.
- Do not publish `docs/architecture/`, `docs/development/`, `docs/security/`, `docs/releases/`, private logs, credentials, internal prompts or build artefacts.
- Do not add Pages Functions, forms, databases, accounts, analytics, tracking scripts, advertising, embedded third-party fonts or external JavaScript.
- The public site is read-only and has no customer document upload or login feature.
- A static site cannot provide private access controls for individual pages. Anything included in `_site` must be safe for the public internet.
- Hosting providers may process connection metadata to deliver and protect the site; do not describe the hosting layer as collecting no data whatsoever.

## Verification before production deployment

1. Check that only the intended customer pages are generated.
2. Run `npm test`, `npm run links`, `bundle exec jekyll build` and `npm run check:site`.
3. Inspect the generated `_site/` directory and Cloudflare preview URL for accidental internal material, broken links, mobile-width overflow, keyboard navigation, focus visibility and reduced-motion behaviour.
4. Confirm that the GitHub repository remains private and the Cloudflare GitHub App has access only to this repository.
5. Confirm the Cloudflare project is on the Free plan and has no paid add-ons, Workers, Functions or analytics enabled.
6. The production site is not considered live until a successful deployment has been confirmed and its public URL has been checked.

Do not use a paid tier, buy a domain, change GitHub repository visibility, or deploy from a draft PR. Preview deployments and production deployment are separate states.
