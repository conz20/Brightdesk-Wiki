# Maintainer recovery: private macOS Actions runner

**Internal maintainer instructions — never publish.** This file belongs under `docs/development/` and must stay outside the generated customer website.

## Why the Wiki checks are queued

The Wiki quality workflow requires a repository-scoped self-hosted runner with the labels `self-hosted`, `macOS` and `ARM64`. If GitHub shows a queued job with no runner ID or name, the workflow has not started. This is a runner availability issue, not a passing or failing test result.

Do not switch this workflow to a GitHub-hosted runner, use a lower Node.js/Ruby version, or remove the required build and site-output audit.

## Approved setup script

Brightdesk-Suite already maintains an Apple-silicon Mac runner setup script that includes `Brightdesk-Wiki`. Use the existing script rather than creating a second registration workflow:

- Repository: [conz20/Brightdesk-suite](https://github.com/conz20/Brightdesk-suite)
- Script: [`tools/runner-setup/macos/Start-Brightdesk-Mac-Foundation-Runners.sh`](https://github.com/conz20/Brightdesk-suite/blob/main/tools/runner-setup/macos/Start-Brightdesk-Mac-Foundation-Runners.sh)
- Setup instructions: [`tools/runner-setup/macos/README.txt`](https://github.com/conz20/Brightdesk-suite/blob/main/tools/runner-setup/macos/README.txt)

The script registers or starts repository-scoped runners for eight private Brightdesk repositories, including Brightdesk-Wiki. It does not change repository permissions, secrets, workflows, visibility, branch protection or release settings.

## What the owner needs

Run the script on the owner's Apple-silicon Mac. The Mac must be running macOS, and the following must already be available:

- GitHub CLI (`gh`), signed in to `github.com` as `conz20`.
- Administrator permission on each of the eight repositories named by the script, so GitHub can issue repository-specific runner registration tokens.
- A logged-in Mac user session while the runner is expected to process jobs.

From the Brightdesk-Suite repository root, run:

~~~sh
bash tools/runner-setup/macos/Start-Brightdesk-Mac-Foundation-Runners.sh
~~~

Read the script's security notice. It asks the owner to type `REGISTER` before it makes runner registrations. Only the owner should provide that confirmation on the Mac.

## What the setup does

- Downloads the official GitHub Actions runner v2.338.2 for macOS ARM64.
- Verifies the runner archive against the SHA-256 digest embedded in the approved script.
- Checks existing runner registrations and local folders before creating or restarting anything.
- Requests short-lived registration tokens separately for each named repository.
- Does not print or save the GitHub CLI credential or the short-lived registration token.
- Starts each configured runner in the background without installing a launch daemon or requiring administrator elevation.

The registrations are repository-scoped. They do not automatically start after logout or reboot. The Mac must be signed in; after a reboot, rerun the approved script to restart existing registrations.

## Confirm the Wiki runner

After the script completes:

1. Open the private `conz20/Brightdesk-Wiki` repository on GitHub.
2. Open **Settings → Actions → Runners**.
3. Confirm a macOS ARM64 runner is listed as **Idle** or **Online**.
4. Re-open the latest Wiki Actions run and confirm GitHub assigns the job to that runner.
5. Wait for the workflow to finish before reporting Node, test, Markdown, Jekyll or public-output audit results.

If GitHub already has an offline runner or the script reports a registration/folder mismatch, stop and inspect the named runner and local folder. Do not delete runner folders, remove registrations or create a duplicate blindly.

## Version and publication safeguards

- Keep the Wiki Node.js version pinned to `24.22.2` and Ruby to `3.4.4` unless an explicitly reviewed version change is made across the package, lock/configuration files, workflow and tests.
- Do not downgrade to the runtime versions available in an unrelated execution container.
- Do not enable GitHub Pages, change repository visibility or publish the website as part of runner recovery.
- Keep PR #3 draft and unmerged until the exact-head workflow, customer-output privacy review and owner review are complete.
- Never send GitHub CLI credentials or runner registration tokens through chat, issues or pull-request comments.

## Current limitation

ChatGPT's connected GitHub repository actions can inspect source files and workflow state, but they cannot start a process on the owner's Mac or register a self-hosted runner there. Runner setup must be carried out locally by the owner.
