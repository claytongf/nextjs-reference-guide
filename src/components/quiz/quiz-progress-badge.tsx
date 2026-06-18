"use client";

import { useSyncExternalStore } from "react";
import { getQuizResult, subscribe } from "@/lib/quiz/progress";

/**
 * Shows the visitor's best score for a quiz, read from localStorage via
 * useSyncExternalStore. The server snapshot is `null`, so the badge hydrates
 * cleanly and then fills in client-only progress.
 */
export function QuizProgressBadge({ slug }: { slug: string }) {
  const result = useSyncExternalStore(
    subscribe,
    () => getQuizResult(slug) ?? null,
    () => null,
  );

  if (!result) {
    return (
      <span className="text-muted-foreground text-xs font-medium">
        Not started
      </span>
    );
  }

  const pct = Math.round((result.bestScore / result.total) * 100);
  return (
    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
      Best {result.bestScore}/{result.total} ({pct}%)
    </span>
  );
}
