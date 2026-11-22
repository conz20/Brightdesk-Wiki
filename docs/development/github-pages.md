# GitHub Pages publication gate (maintainer-only)

**Status: not configured and not deployed.** GitHub Pages is the only approved future publishing target for Brightdesk Help. No GitHub Pages configuration, production deployment, deployed commit or public customer URL is verified.

## Source privacy and account-plan gate

The source of truth is `conz20/Brightdesk-Wiki`. The live repository is currently public, which conflicts with the permanent requirement that all 27 Brightdesk repositories remain private. Do not change repository visibility, permissions or settings in this task. Report the discrepancy; public source is not approval to publish.

If the owner later authorises the source repository to be private, a public GitHub Pages site published from that private repository requires an eligible GitHub Pro or higher plan. The linked account's current plan has not been verified. Do not buy, trial, renew, upgrade or activate a paid plan. Do not make the repository public to bypass this gate.

## Publication boundary

- GitHub Pages is the only approved publishing platform.
- Do not create, connect, configure or use Cloudflare Pages or any other external hosting provider.
- Do not configure GitHub Pages, create a deployment workflow, grant deployment permissions, publish or deploy without the owner's explicit authorisation for the specific implementation and action.
- Keep the source in this repository while publication remains blocked.
- Do not advertise a customer URL or claim the Help site is live until a successful production deployment, public URL and deployed commit are independently verified.
- The site is separate from Brightdesk Suite and its ten products. It is never installed, bundled, linked into product UI or required for offline product use.

## Customer output

The approved public output, once separately authorised, is limited to one Help homepage, one Suite getting-started guide and exactly ten product guides: Pages, Sheets, Decks, Notes, Database, Forms, Lists, Planner, To Do and Workspace. Only local CSS and strictly necessary customer-help navigation may accompany those pages.

Do not publish engineering, architecture, development, security, release, maintainer, owner-operation, repository or administration material. The generated site must remain static and read-only, with no accounts, sign-in, uploads, comments, editing, forms, analytics, tracking, ads, remote AI or customer-data collection.

## Privacy disclosure

GitHub Pages processes visitor IP addresses and other technical request metadata for security and service delivery. Do not claim visitor metadata is never processed. Brightdesk must not add analytics, tracking or unnecessary data collection.

## Verification before any future publication

1. Confirm the source repository is private without changing its visibility in this task.
2. Confirm the existing account plan meets GitHub's private-source Pages requirement without buying or upgrading a plan.
3. Obtain explicit owner authorisation for the exact GitHub Pages build, permission and deployment implementation.
4. Review the public-output allowlist and privacy audit.
5. Require a successful exact-head quality workflow and production deployment from the approved `main` commit.
6. Verify the public URL and exact deployed commit, then inspect the homepage, Suite guide and all ten product guides.

Official references: [GitHub Pages publishing sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) and [GitHub Pages plan limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).
