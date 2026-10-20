import { buildWeeklyNotesFeed } from "@/features/learning-lab/weekly-notes";

export const dynamic = "force-dynamic";

export function GET() {
  return new Response(buildWeeklyNotesFeed(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
