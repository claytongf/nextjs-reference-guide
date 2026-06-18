import { quizzes as rawQuizzes } from "@/content/quizzes";
import { quizSchema, type Quiz } from "./schema";
import { TRACKS, TRACK_META, type Track } from "@/lib/content/schema";

let cache: Quiz[] | null = null;

/**
 * Validate every quiz once per process. Invalid data (bad answer index,
 * duplicate slug, empty fields) throws so CI catches it before deploy.
 */
export function getAllQuizzes(): Quiz[] {
  if (cache) return cache;

  const seen = new Set<string>();
  cache = rawQuizzes.map((raw, i) => {
    const parsed = quizSchema.safeParse(raw);
    if (!parsed.success) {
      throw new Error(
        `Invalid quiz at index ${i}:\n` +
          parsed.error.issues
            .map(
              (issue) =>
                `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`,
            )
            .join("\n"),
      );
    }
    if (seen.has(parsed.data.slug)) {
      throw new Error(`Duplicate quiz slug: ${parsed.data.slug}`);
    }
    seen.add(parsed.data.slug);

    const ids = parsed.data.questions.map((q) => q.id);
    if (new Set(ids).size !== ids.length) {
      throw new Error(`Duplicate question id in quiz "${parsed.data.slug}"`);
    }
    return parsed.data;
  });
  return cache;
}

export function getQuizBySlug(slug: string): Quiz | undefined {
  return getAllQuizzes().find((q) => q.slug === slug);
}

export interface QuizSection {
  track: Track;
  label: string;
  quizzes: Quiz[];
}

/** Quizzes grouped by track, in track order. */
export function getQuizzesByTrack(): QuizSection[] {
  const all = getAllQuizzes();
  return TRACKS.map((track) => ({
    track,
    label: TRACK_META[track].label,
    quizzes: all.filter((q) => q.track === track),
  })).filter((section) => section.quizzes.length > 0);
}
