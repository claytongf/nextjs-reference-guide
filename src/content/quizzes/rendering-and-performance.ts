import type { Quiz } from "@/lib/quiz/schema";

export const renderingAndPerformance: Quiz = {
  slug: "rendering-and-performance",
  title: "Rendering & Performance",
  description:
    "Reconciliation, re-renders, Suspense, concurrent features, and React 19 APIs.",
  track: "senior",
  questions: [
    {
      id: "render-vs-commit",
      prompt: "What is a 'render' in React?",
      options: [
        "Writing changes to the real DOM",
        "Calling components to produce an element tree (a description)",
        "A network request for data",
        "Mounting the app once",
      ],
      answerIndex: 1,
      explanation:
        "Render builds the element tree; the separate commit phase applies the minimal DOM changes. A component can render many times with no DOM change.",
    },
    {
      id: "rerender-causes",
      prompt: "Which does NOT, by itself, cause a component to re-render?",
      options: [
        "Its state changes",
        "Its parent re-renders",
        "A context it consumes changes",
        "A ref it holds changes",
      ],
      answerIndex: 3,
      explanation:
        "Mutating ref.current never triggers a re-render. State changes, parent renders, and consumed context changes all do.",
    },
    {
      id: "memo-purpose",
      prompt: "What does React.memo do?",
      options: [
        "Caches a computed value",
        "Skips re-rendering a component when its props are unchanged by reference",
        "Memoizes a function identity",
        "Prevents the component from mounting",
      ],
      answerIndex: 1,
      explanation:
        "React.memo bails out of re-rendering when props are referentially equal — pair it with useCallback/useMemo for stable prop references.",
    },
    {
      id: "suspense-streaming",
      prompt: "What does Suspense enable during server rendering?",
      options: [
        "Blocking the page until all data loads",
        "Streaming: send the shell first, stream each boundary as its data resolves",
        "Client-only rendering",
        "Disabling JavaScript",
      ],
      answerIndex: 1,
      explanation:
        "Suspense lets React stream HTML progressively — the static shell arrives immediately and slow boundaries stream in independently.",
    },
    {
      id: "transition-purpose",
      prompt: "What problem does useTransition solve?",
      options: [
        "It makes expensive computations run faster",
        "It marks an update as non-urgent so it can be interrupted, keeping input responsive",
        "It caches network requests",
        "It animates route changes",
      ],
      answerIndex: 1,
      explanation:
        "Transitions mark updates as low-priority and interruptible. They don't speed up the work — they stop it from blocking urgent interactions.",
    },
    {
      id: "use-hook",
      prompt: "What is special about React 19's use() hook?",
      options: [
        "It can only be called in Server Components",
        "It unwraps a promise (suspending) and may be called conditionally",
        "It replaces useState",
        "It runs effects",
      ],
      answerIndex: 1,
      explanation:
        "use() reads a promise (suspending until it resolves) or context, and — unlike other hooks — is allowed inside conditions and loops.",
    },
  ],
};
