<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Website Workflow and Publication

Read `docs/website-two-laptops.md` before working on the website. Preserve unfinished work and use the shared `laptop-sync` workflow.

When the owner says "live", "go live" or "publish live" in the context of a website change, treat that as explicit authorization to publish the requested change. Proceed without another publication confirmation. Complete the relevant checks, review the release diff, merge through a pull request to `main`, deploy to the existing Vercel project, and verify the canonical live website.

Complete the housekeeping: preserve unrelated pending work, keep credentials and local data out of Git and deployment uploads, return the working checkout to `laptop-sync`, restore automatic source sync, run a final sync, and report the deployed commit, verified cloud commit and any pending work. Resolve actual authentication or merge blockers without bypassing them. Ordinary editing does not authorize publication.
