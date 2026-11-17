<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Website Workflow and Publication

Read `docs/website-two-laptops.md` before working on the website. Preserve unfinished work and use the shared `laptop-sync` workflow.

When the owner says "live", "go live" or "publish live" in the context of a website change, treat that as explicit authorization to publish the requested change. Proceed without another publication confirmation. Complete the relevant checks, review the release diff, merge through a pull request to `main`, deploy to the existing Vercel project, and verify the canonical live website.

Complete the housekeeping: preserve unrelated pending work, keep credentials and local data out of Git and deployment uploads, return the working checkout to `laptop-sync`, restore automatic source sync, run a final sync, and report the deployed commit, verified cloud commit and any pending work. Resolve actual authentication or merge blockers without bypassing them. Ordinary editing does not authorize publication.

### Fast Publication

The owner prioritizes fast publication. Prepare and validate the requested change while editing so that "live" can trigger the reviewed release promptly. Use the existing GitHub-to-Vercel production pipeline and authenticated CLI. Do not repeat laptop setup, plugin installation or MCP troubleshooting during a working release.

Scale validation to the change. For an isolated copy change, reuse the passing scoped checks and exact-head Vercel preview checks; do not install another dependency tree or repeat a full local production build solely for that copy change. Broaden checks when behavior, dependencies, shared configuration or the release diff warrants it. Preserve unrelated work when selecting the release.

Merge the reviewed exact head through its pull request, then observe the single production deployment triggered by `main`. Do not start a duplicate CLI deployment. Announce the live URL as soon as the matching production deployment is READY, the canonical domains are assigned, and a targeted public read verifies the requested result. Complete housekeeping afterward without delaying that live-status update.

A production build that is already prepared and verified can be promoted promptly. Do not substitute a Preview build's environment for Production or skip required checks to claim instant publication. Be clear about measured build/queue time; do not promise that an unbuilt code change can go live in seconds.
