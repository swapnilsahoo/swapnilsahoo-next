import assert from "node:assert/strict";
import { mkdir, writeFile, appendFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { pathToFileURL } from "node:url";

// This independent monitor intentionally has no application dependencies or credentials.
export const campaignReleases = [
  ["the-discount-that-needs-more-capacity", "2026-10-23T09:00:00+05:30"],
  ["give-your-ai-brief-a-missing-fact-rule", "2026-10-30T09:00:00+05:30"],
  ["ask-about-the-last-time", "2026-11-06T09:00:00+05:30"],
  ["what-would-you-decline", "2026-11-13T09:00:00+05:30"],
];

export async function runCampaignHealth({
  now = Date.now(),
  baseUrl = "https://www.swapnilsahoo.com",
  fetchImpl = fetch,
} = {}) {
  assert.ok(Number.isFinite(now), "The check requires a valid time.");
  const report = {
    checkedAt: new Date(now).toISOString(),
    scope:
      "Automated public HTTP and release checks only; not visits, learner completion, private records, browser interaction or email delivery.",
    results: [],
    passed: true,
  };
  const paths = [
    ["/learning-lab", 200],
    ["/learning-lab/weekly-notes", 200],
    ["/learning-lab/pilot", 200],
    ...[
      "read-your-unit-economics",
      "write-an-ai-task-brief",
      "ask-better-customer-questions",
      "make-a-strategic-tradeoff",
    ].map((slug) => [`/learning-lab/free-courses/${slug}`, 200]),
    ...campaignReleases.map(([slug, date]) => [
      `/learning-lab/weekly-notes/${slug}`,
      now >= Date.parse(date) ? 200 : 404,
    ]),
    ["/learning-lab/weekly-notes/feed.xml", 200],
  ];
  for (const [path, expectedStatus] of paths) {
    try {
      const response = await fetchImpl(new URL(path, baseUrl), {
        headers: { "User-Agent": "LearningLabPublicHealth/1.0", "Cache-Control": "no-cache" },
        signal: AbortSignal.timeout(20000),
        redirect: "error",
      });
      assert.equal(
        response.status,
        expectedStatus,
        `Expected HTTP ${expectedStatus}, received ${response.status}.`
      );
      const body = await response.text();
      if (path.endsWith("feed.xml")) {
        assert.match(response.headers.get("content-type") || "", /application\/rss\+xml/i);
        assert.match(body, /<rss\b/);
        const dates = [...body.matchAll(/<pubDate>(.*?)<\/pubDate>/g)].map((match) =>
          Date.parse(match[1])
        );
        const expected = campaignReleases.filter(([, date]) => now >= Date.parse(date));
        assert.equal(
          dates.length,
          expected.length,
          "RSS item count must match the released notes."
        );
        assert.ok(
          dates.every((date) => Number.isFinite(date) && date <= now),
          "RSS cannot publish a future item."
        );
        for (const [slug] of expected)
          assert.ok(body.includes(`/weekly-notes/${slug}`), `Missing released note: ${slug}`);
      } else if (expectedStatus === 200) {
        assert.match(body, /<h1\b/, "Public reading page must include a server-rendered heading.");
      }
      report.results.push({ path, expectedStatus, status: response.status, passed: true });
    } catch (error) {
      report.passed = false;
      report.results.push({
        path,
        expectedStatus,
        passed: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
  return report;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const now = Date.now();
  const insideCampaign =
    now >= Date.parse("2026-10-20T00:00:00+05:30") &&
    now <= Date.parse("2026-11-18T23:59:59.999+05:30");
  const scheduledOutsideCampaign = process.env.GITHUB_EVENT_NAME === "schedule" && !insideCampaign;
  const report = scheduledOutsideCampaign
    ? {
        checkedAt: new Date(now).toISOString(),
        skipped: true,
        reason: "The dated campaign has ended; no public requests made.",
      }
    : await runCampaignHealth({
        now,
        baseUrl: process.env.CAMPAIGN_BASE_URL || "https://www.swapnilsahoo.com",
      });
  const target = resolve(
    process.env.CAMPAIGN_REPORT_PATH || "artifacts/learning-lab/campaign-health.json"
  );
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify(report, null, 2));
  if (process.env.GITHUB_STEP_SUMMARY) {
    const lines = report.skipped
      ? [`Campaign check skipped: ${report.reason}`]
      : [
          "# Learning Lab public campaign check",
          `Checked ${report.checkedAt}. ${report.passed ? "Passed" : "Failed"}.`,
          "",
          report.scope,
          "",
          ...report.results.map(
            (item) =>
              `- ${item.passed ? "PASS" : "FAIL"} ${item.path}: ${item.status ?? item.error}`
          ),
        ];
    await appendFile(process.env.GITHUB_STEP_SUMMARY, lines.join("\n") + "\n");
  }
  if ("passed" in report && !report.passed) process.exitCode = 1;
}
