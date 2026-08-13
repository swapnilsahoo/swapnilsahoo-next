"use client";

import dynamic from "next/dynamic";

function WidgetPlaceholder() {
  return (
    <div className="glass-card text-ink-500 dark:text-ink-400 p-8 text-sm" aria-hidden="true">
      Loading…
    </div>
  );
}

export const SelfAssessmentClient = dynamic(
  () => import("@/features/wellbeing/components/SelfAssessment").then((mod) => mod.SelfAssessment),
  { ssr: false, loading: WidgetPlaceholder }
);

export const DailyTrackerClient = dynamic(
  () => import("@/features/wellbeing/components/DailyTracker").then((mod) => mod.DailyTracker),
  { ssr: false, loading: WidgetPlaceholder }
);
