# Maintainer recovery: Brightdesk Wiki build validation

**Internal maintainer instructions — never publish.** This file belongs under `docs/development/` and must stay outside the generated customer website.

## Primary validation route

The current Wiki quality workflow uses a standard GitHub-hosted `ubuntu-latest` runner. It keeps the exact Node.js `24.22.2` and Ruby `3.4.4` pins and runs the full source, link, Jekyll and generated-output checks.

A job that completes with no steps and `runner_id: 0` has not started. Do not describe it as a test failure or a successful validation. The exact-head run #494 had this state: GitHub recorded a failed job before the first step, with no runner or job logs.

## Independent Cloudflare Pages validation route

The existing Pages project, `brightdesk-help`, uses the repository build command:

~~~sh
npm run build:cloudflare
~~~

That command independently runs the full validation sequence in the Cloudflare build environment:

1. Install the locked Node dependencies.
2. Check Node.js `24.22.2`.
3. Check validation-script syntax.
4. Run all Node regression tests.
5. Check authored Markdown links.
6. Install the pinned Jekyll dependency.
7. Build the Jekyll site into `_site/`.
8. Run the exact generated-output privacy and allowlist audit.

A successful Cloudflare Pages check for the exact PR head is therefore valid evidence that this build sequence completed, even when a GitHub Actions runner could not start. It does not replace manual review, platform checks, genuine product screenshots or approval of the final visual design. Never claim a successful build or preview until the exact-head Cloudflare check is successful and the preview URL serves the expected content.

Do not weaken `build:cloudflare`, skip tests, skip the output audit, relax the exact file allowlist or publish private maintainer files to make a build pass.

## Optional owner-operated Mac runner fallback

If both GitHub-hosted Actions and the independent Cloudflare build route are unavailable, the owner may choose to restore the repository-scoped Apple-silicon Mac runner path. This is optional and is not required when the exact-head Cloudflare build has passed.

Brightdesk-Suite maintains the approved setup script:

- Repository: [conz20/Brightdesk-suite](https://github.com/conz20/Brightdesk-suite)
- Script: [`tools/runner-setup/macos/Start-Brightdesk-Mac-Foundation-Runners.sh`](https://github.com/conz20/Brightdesk-suite/blob/main/tools/runner-setup/macos/Start-Brightdesk-Mac-Foundation-Runners.sh)
- Instructions: [`tools/runner-setup/macos/README.txt`](https://github.com/conz20/Brightdesk-suite/blob/main/tools/runner-setup/macos/README.txt)

The script covers **nine** private repositories, not just Brightdesk-Wiki. It requires an Apple-silicon Mac, GitHub CLI installed and authenticated as `conz20`, administrator access to all nine repositories, and explicit typing of `REGISTER`. It downloads and checksum-verifies the official runner, checks for existing registrations and starts the repository-scoped runners. It does not change repository permissions, secrets, workflows, visibility, branch protection or release settings.

This is not a one-click action for a user who does not already have the prerequisites. Do not ask the owner to run it merely to fix a single Wiki preview when Cloudflare can validate the PR independently. Never request or accept GitHub credentials or runner registration tokens in chat.

## Version and publication safeguards

- Keep Node.js pinned to `24.22.2` and Ruby pinned to `3.4.4` across package metadata, workflow, tests and documentation.
- Do not downgrade runtimes or skip the quality commands to accommodate a runner.
- Do not purchase hosted runners or other services, increase a billing budget, change repository visibility, enable GitHub Pages or change DNS/nameservers.
- Keep PR #6 draft and unmerged until the exact-head build evidence, privacy review, genuine product screenshots, platform verification, accessibility review and owner approval are complete.
- The production website must not change as part of runner recovery.

## Latest exact-head runner observation — 15 November 2026

GitHub Actions run [#528](https://github.com/conz20/Brightdesk-Wiki/actions/runs/43603624569) checked commit `22a2a8df79ff1bd371979366acaa982163300c79`. GitHub recorded the only job with label `ubuntu-latest`, `runner_id: 0`, an empty `steps` array, no runner name and no job logs. The job started and failed within approximately one second. This confirms that the job did not reach the workflow's first checkout step; it does **not** identify why GitHub failed to provision or assign the runner, and it does not indicate a source-code test failure.

The workflow still contains the normal GitHub-hosted `ubuntu-latest` configuration and keeps all required validation commands. Do not change the workflow, relax the checks, or move to paid runners based on this evidence alone. Check the exact-head Cloudflare Pages build separately; as of this note, its comment for commit `22a2a8d` reports **Build in progress**, not success.