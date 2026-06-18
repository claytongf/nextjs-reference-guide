import { describe, it, expect, beforeEach } from "vitest";
import {
  getQuizResult,
  recordResult,
  resetProgress,
  getAllProgress,
} from "./progress";

describe("quiz progress", () => {
  beforeEach(() => {
    resetProgress();
  });

  it("records a result and reads it back", () => {
    recordResult("demo", 4, 6);
    const result = getQuizResult("demo");
    expect(result).toMatchObject({ bestScore: 4, total: 6, attempts: 1 });
    expect(result?.lastAttempt).toBeTypeOf("string");
  });

  it("keeps the best score across attempts and counts them", () => {
    recordResult("demo", 3, 6);
    recordResult("demo", 5, 6);
    recordResult("demo", 2, 6);
    const result = getQuizResult("demo");
    expect(result?.bestScore).toBe(5);
    expect(result?.attempts).toBe(3);
  });

  it("resets a single quiz", () => {
    recordResult("a", 1, 2);
    recordResult("b", 2, 2);
    resetProgress("a");
    expect(getQuizResult("a")).toBeUndefined();
    expect(getQuizResult("b")).toBeDefined();
  });

  it("resets all progress", () => {
    recordResult("a", 1, 2);
    recordResult("b", 2, 2);
    resetProgress();
    expect(getAllProgress()).toEqual({});
  });
});
