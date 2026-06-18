import type { Quiz } from "@/lib/quiz/schema";
import { reactFundamentals } from "./react-fundamentals";
import { hooksAndState } from "./hooks-and-state";
import { nextjsAppRouter } from "./nextjs-app-router";
import { renderingAndPerformance } from "./rendering-and-performance";
import { architectureAndLeadership } from "./architecture-and-leadership";
import { testingEssentials } from "./testing-essentials";
import { webSecurity } from "./web-security";

/** Every quiz, in the order they should appear within their track. */
export const quizzes: Quiz[] = [
  reactFundamentals,
  hooksAndState,
  nextjsAppRouter,
  renderingAndPerformance,
  architectureAndLeadership,
  testingEssentials,
  webSecurity,
];
