import type { Quiz } from "@/lib/quiz/schema";

export const testingEssentials: Quiz = {
  slug: "testing-essentials",
  title: "Testing Essentials",
  description:
    "Testing strategy, React Testing Library queries, mocking, and reliable E2E.",
  track: "testing",
  questions: [
    {
      id: "what-to-test",
      prompt: "What is the guiding principle of good tests?",
      options: [
        "Assert on internal state and private methods",
        "The more tests resemble how the software is used, the more confidence they give",
        "Maximize the line-coverage number",
        "Snapshot everything",
      ],
      answerIndex: 1,
      explanation:
        "Test behavior the way users experience it, not implementation details — those break on refactors without catching real bugs.",
    },
    {
      id: "rtl-query-priority",
      prompt: "Which query should you prefer in React Testing Library?",
      options: [
        "getByTestId",
        "querySelector with a CSS class",
        "getByRole with an accessible name",
        "Finding the React component instance",
      ],
      answerIndex: 2,
      explanation:
        "Prefer accessible queries like getByRole. If you can't select an element by role, neither can a screen reader — a sign to fix the markup.",
    },
    {
      id: "query-absence",
      prompt: "Which query do you use to assert an element is NOT present?",
      options: ["getBy*", "queryBy*", "findBy*", "renderBy*"],
      answerIndex: 1,
      explanation:
        "queryBy* returns null instead of throwing when nothing matches, so it works with .not.toBeInTheDocument(). findBy* waits for appearance.",
    },
    {
      id: "mock-boundary",
      prompt: "Where is the best place to mock for realistic tests?",
      options: [
        "Mock all of your own internal functions",
        "Mock at the network boundary (e.g. MSW)",
        "Mock React itself",
        "Never mock anything",
      ],
      answerIndex: 1,
      explanation:
        "Mocking the network (MSW) keeps your real code under test and only fakes the edge — far more realistic than stubbing internal modules.",
    },
    {
      id: "e2e-flakiness",
      prompt: "What is the #1 cause of flaky, slow E2E tests?",
      options: [
        "Using getByRole",
        "Fixed sleeps like waitForTimeout(2000)",
        "Running in CI",
        "Testing user journeys",
      ],
      answerIndex: 1,
      explanation:
        "Fixed sleeps are brittle and slow. Wait for a condition (toBeVisible, toHaveURL) and let Playwright auto-retry until it's true.",
    },
  ],
};
