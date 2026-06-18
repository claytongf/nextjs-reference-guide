import { describe, it, expect } from "vitest";
import { getAllQuizzes, getQuizBySlug, getQuizzesByTrack } from "./loader";

describe("quiz loader", () => {
  it("loads and validates every quiz without throwing", () => {
    const quizzes = getAllQuizzes();
    expect(quizzes.length).toBeGreaterThan(0);
  });

  it("has unique slugs", () => {
    const slugs = getAllQuizzes().map((q) => q.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every answerIndex points at a real option", () => {
    for (const quiz of getAllQuizzes()) {
      for (const q of quiz.questions) {
        expect(q.answerIndex).toBeGreaterThanOrEqual(0);
        expect(q.answerIndex).toBeLessThan(q.options.length);
      }
    }
  });

  it("has unique question ids within each quiz", () => {
    for (const quiz of getAllQuizzes()) {
      const ids = quiz.questions.map((q) => q.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("resolves a quiz by slug and returns undefined for unknown", () => {
    const first = getAllQuizzes()[0];
    expect(getQuizBySlug(first.slug)).toEqual(first);
    expect(getQuizBySlug("does-not-exist")).toBeUndefined();
  });

  it("groups every quiz under a track exactly once", () => {
    const sections = getQuizzesByTrack();
    const grouped = sections.reduce((n, s) => n + s.quizzes.length, 0);
    expect(grouped).toBe(getAllQuizzes().length);
  });
});
