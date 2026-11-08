# Development setup

## Required runtime versions

- Node.js **24.22.2** for JavaScript tooling and desktop application workflows.
- The Rust toolchain version declared by the relevant repository's workflow and toolchain file. Do not substitute a global or unpinned version.
- Product repositories define their own Electron and packaging configuration. Check the product's current package.json and workflow before building.

## General workflow

1. Check the repository's README and contribution instructions.
2. Use the exact Node.js and Rust versions declared by that repository.
3. Install from the committed lock file; do not regenerate it during an ordinary test run.
4. Run the focused test related to the change, then the repository's complete required test command.
5. Update the root README in the same change when code, tests, UI, assets, configuration, dependencies or release workflows change.
6. Keep changes on a review branch. Do not publish or install a release candidate as a side effect of testing.

## Brightdesk Wiki commands

~~~sh
npm ci --no-audit --no-fund
npm run check:node
npm run check
npm test
npm run links
~~~

The Wiki link checker verifies local Markdown links and image paths only. It does not validate feature behavior, remote URLs or heading anchors.

## Verification records

A completed check should identify the exact repository, branch or commit, runtime version, command, exit status and any skipped work. Never claim a workflow passed when it is queued, skipped, unavailable or run against a different commit.
