import type { Quiz } from "@/lib/quiz/schema";

export const nextjsAppRouter: Quiz = {
  slug: "nextjs-app-router",
  title: "Next.js App Router",
  description:
    "Server vs Client Components, routing, Server Actions, and Next.js 16 conventions.",
  track: "mid",
  questions: [
    {
      id: "default-component-type",
      prompt: "In the App Router, components are by default…",
      options: [
        "Client Components",
        "Server Components",
        "Static HTML only",
        "Edge functions",
      ],
      answerIndex: 1,
      explanation:
        'Components are Server Components by default — they run on the server and ship no JS. Add `"use client"` to opt a subtree into the client.',
    },
    {
      id: "use-client-meaning",
      prompt: 'What does the `"use client"` directive do?',
      options: [
        "Disables server rendering for the whole app",
        "Marks a boundary; the file and its imported tree run on the client",
        "Forces static generation",
        "Imports React on the client",
      ],
      answerIndex: 1,
      explanation:
        "It marks a client boundary at the entry file. Components imported into it become part of the client bundle automatically.",
    },
    {
      id: "params-async",
      prompt: "In Next.js 16, how do you read `params` in a page?",
      options: [
        "Access params.slug directly — it's a plain object",
        "await params — it's a Promise",
        "Call useParams() in the server component",
        "Read it from process.env",
      ],
      answerIndex: 1,
      explanation:
        "In Next.js 16 `params` and `searchParams` are Promises; you must await them (or use() them in a Client Component). This is a breaking change.",
    },
    {
      id: "server-action-security",
      prompt: "What must you always do inside a Server Action?",
      options: [
        "Trust the form input since the UI validated it",
        "Authenticate, authorize, and validate — it is a public endpoint",
        "Avoid touching the database",
        "Return JSX",
      ],
      answerIndex: 1,
      explanation:
        "A Server Action is a public HTTP endpoint anyone can call with any arguments. Always re-check auth and validate input on the server.",
    },
    {
      id: "loading-file",
      prompt: "What does adding a `loading.tsx` to a segment do?",
      options: [
        "Nothing without configuration",
        "Wraps the segment in a Suspense boundary with that fallback",
        "Disables streaming",
        "Creates a new route at /loading",
      ],
      answerIndex: 1,
      explanation:
        "`loading.tsx` automatically wraps the segment in <Suspense>, showing the fallback instantly while the server content streams in.",
    },
    {
      id: "revalidate-after-write",
      prompt: "After a mutation, how do you refresh cached data?",
      options: [
        "Reload the whole site",
        "revalidatePath() or revalidateTag()",
        "Clear the browser cache",
        "Restart the server",
      ],
      answerIndex: 1,
      explanation:
        "Call revalidatePath('/posts') for a route or revalidateTag('posts') for tagged data so the next request re-fetches fresh content.",
    },
  ],
};
