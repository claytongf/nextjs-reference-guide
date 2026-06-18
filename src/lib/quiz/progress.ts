/**
 * Local-only quiz progress, persisted in localStorage. No accounts, no network —
 * progress lives in the visitor's browser. All functions are SSR-safe (they
 * no-op without `window`).
 */

const STORAGE_KEY = "nrg.quiz-progress.v1";

/** Fires when progress changes so React components can re-read it. */
export const PROGRESS_EVENT = "nrg:quiz-progress";

export interface QuizResult {
  /** Best score achieved (number of correct answers). */
  bestScore: number;
  /** Number of questions in the quiz at the time of the attempt. */
  total: number;
  /** Total number of attempts. */
  attempts: number;
  /** ISO timestamp of the most recent attempt. */
  lastAttempt: string;
}

type ProgressMap = Record<string, QuizResult>;

// Cache the parsed map keyed on the raw string so repeated reads return a
// stable reference. useSyncExternalStore requires getSnapshot to be referentially
// stable when nothing changed, otherwise it loops.
let snapshotRaw: string | null | undefined;
let snapshotMap: ProgressMap = {};

function read(): ProgressMap {
  if (typeof window === "undefined") return {};
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return snapshotMap;
  }
  if (raw === snapshotRaw) return snapshotMap;
  snapshotRaw = raw;
  try {
    snapshotMap = raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    snapshotMap = {};
  }
  return snapshotMap;
}

function write(map: ProgressMap): void {
  if (typeof window === "undefined") return;
  try {
    const raw = JSON.stringify(map);
    window.localStorage.setItem(STORAGE_KEY, raw);
    snapshotRaw = raw;
    snapshotMap = map;
    window.dispatchEvent(new Event(PROGRESS_EVENT));
  } catch {
    // storage full or blocked — progress is best-effort, so ignore
  }
}

/** Subscribe to progress changes (this tab and others). Returns an unsubscribe. */
export function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(PROGRESS_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(PROGRESS_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function getAllProgress(): ProgressMap {
  return read();
}

export function getQuizResult(slug: string): QuizResult | undefined {
  return read()[slug];
}

/** Record an attempt, keeping the best score seen for the quiz. */
export function recordResult(
  slug: string,
  score: number,
  total: number,
): QuizResult {
  const prev = read()[slug];
  const result: QuizResult = {
    bestScore: prev ? Math.max(prev.bestScore, score) : score,
    total,
    attempts: (prev?.attempts ?? 0) + 1,
    lastAttempt: new Date().toISOString(),
  };
  // New object reference so subscribers detect the change.
  write({ ...read(), [slug]: result });
  return result;
}

export function resetProgress(slug?: string): void {
  if (slug) {
    const next = { ...read() };
    delete next[slug];
    write(next);
    return;
  }
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  snapshotRaw = null;
  snapshotMap = {};
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}
