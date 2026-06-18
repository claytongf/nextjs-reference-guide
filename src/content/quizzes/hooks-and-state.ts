import type { Quiz } from "@/lib/quiz/schema";

export const hooksAndState: Quiz = {
  slug: "hooks-and-state",
  title: "Hooks & State",
  description:
    "useState, useEffect, useRef, context, and memoization — and the rules that govern them.",
  track: "mid",
  questions: [
    {
      id: "updater-form",
      prompt:
        "Why prefer `setCount((c) => c + 1)` over `setCount(count + 1)` for sequential updates?",
      options: [
        "It is faster to type",
        "It avoids stale values when updates batch or run async",
        "It re-renders fewer times",
        "It is required by TypeScript",
      ],
      answerIndex: 1,
      explanation:
        "The updater form receives the latest pending state, so multiple updates in one tick compose correctly instead of all reading the same stale value.",
    },
    {
      id: "effect-purpose",
      prompt: "What is useEffect actually for?",
      options: [
        "Transforming data for rendering",
        "Synchronizing with external systems (subscriptions, timers, the DOM)",
        "Replacing event handlers",
        "Fetching data in Server Components",
      ],
      answerIndex: 1,
      explanation:
        "Effects synchronize with things outside React. Deriving data, handling events, and server-side fetching should not use effects.",
    },
    {
      id: "effect-cleanup",
      prompt: "When does an effect's cleanup function run?",
      options: [
        "Only once, when the app closes",
        "Before the next effect run and on unmount",
        "After every render, always",
        "Never, unless you call it manually",
      ],
      answerIndex: 1,
      explanation:
        "Cleanup runs before the effect re-runs (deps changed) and when the component unmounts, preventing leaks like duplicate listeners.",
    },
    {
      id: "ref-vs-state",
      prompt: "Which is true of useRef?",
      options: [
        "Changing ref.current triggers a re-render",
        "It persists a mutable value across renders without causing re-renders",
        "It can only hold DOM nodes",
        "It resets to its initial value every render",
      ],
      answerIndex: 1,
      explanation:
        "A ref is a stable { current } box that survives renders and does NOT re-render on change — ideal for timers, previous values, or DOM nodes.",
    },
    {
      id: "context-rerender",
      prompt: "What happens when a context value changes?",
      options: [
        "Only the provider re-renders",
        "Nothing re-renders automatically",
        "Every component consuming that context re-renders",
        "The whole app remounts",
      ],
      answerIndex: 2,
      explanation:
        "All consumers re-render on value change. For high-frequency state this is a performance trap — split contexts or use a dedicated store.",
    },
    {
      id: "usememo-purpose",
      prompt: "What does useMemo do?",
      options: [
        "Caches a computed value, recomputing only when dependencies change",
        "Prevents a component from ever re-rendering",
        "Memoizes a function's identity",
        "Replaces useState for derived data",
      ],
      answerIndex: 0,
      explanation:
        "useMemo caches a computed value keyed on its deps. useCallback memoizes a function identity; React.memo skips a component's re-render.",
    },
  ],
};
