import type { Quiz } from "@/lib/quiz/schema";

export const architectureAndLeadership: Quiz = {
  slug: "architecture-and-leadership",
  title: "Architecture & Leadership",
  description:
    "Rendering strategy, boundaries, state classification, and technical decision-making.",
  track: "tech-lead",
  questions: [
    {
      id: "what-makes-dynamic",
      prompt: "Which of these forces a route to render dynamically?",
      options: [
        "Importing a large component",
        "Reading cookies(), headers(), or searchParams",
        "Using Tailwind CSS",
        "Having more than 10 components",
      ],
      answerIndex: 1,
      explanation:
        "Reading request-time data (cookies, headers, searchParams, connection) opts a route out of static rendering because output depends on the request.",
    },
    {
      id: "ppr",
      prompt: "What does Partial Prerendering (PPR) give you?",
      options: [
        "A fully client-rendered page",
        "A static shell served instantly with dynamic parts streamed inside Suspense",
        "Disabled caching",
        "Server-only rendering with no streaming",
      ],
      answerIndex: 1,
      explanation:
        "PPR combines static and dynamic: the prerendered shell is instant, and personalized/dynamic holes stream in behind Suspense boundaries.",
    },
    {
      id: "state-classification",
      prompt: "Where do shareable filters and pagination state belong?",
      options: [
        "A global Redux store",
        "The URL (searchParams)",
        "localStorage",
        "A React ref",
      ],
      answerIndex: 1,
      explanation:
        "URL state is shareable, bookmarkable, survives refresh, and works with the back button — ideal for filters, sorting, and pagination.",
    },
    {
      id: "reversible-decisions",
      prompt: "How should you treat reversible vs irreversible decisions?",
      options: [
        "Deliberate slowly on both",
        "Move fast on reversible ones; invest carefully in irreversible ones",
        "Move fast on both",
        "Avoid making irreversible decisions entirely",
      ],
      answerIndex: 1,
      explanation:
        "Reversible choices (libraries, folder layout) can change later, so decide quickly. Irreversible ones (data model, public API, auth) deserve more rigor.",
    },
    {
      id: "client-boundary-security",
      prompt: "Why is the server/client boundary also a security concern?",
      options: [
        "Client Components run faster",
        "Anything reachable from a Client Component ships to the browser",
        "Server Components can't access the database",
        "It only affects bundle size",
      ],
      answerIndex: 1,
      explanation:
        "Data and modules reachable from client code are exposed to the browser. Keep secrets and data access server-side; pass only safe, serializable data down.",
    },
  ],
};
