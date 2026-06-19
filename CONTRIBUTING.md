# Contributing

Thanks for helping improve the React & Next.js reference guide. This project is a
content-driven site: most contributions are **new lessons** or **quiz
questions**, but code and docs fixes are equally welcome.

## Getting started

```bash
npm install
npm run dev
# open http://localhost:3000
```

The dev and build commands automatically rebuild the search index
(`npm run search:index`) via the `predev`/`prebuild` hooks, so new or edited
content shows up in search without extra steps.

## Before you open a pull request

Run the same checks CI runs:

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm run format      # prettier --write .
npm run test        # vitest unit/component tests
npm run build       # production build — also validates all content frontmatter
npm run test:e2e    # Playwright end-to-end tests (optional locally)
```

`npm run build` is the most important content check: frontmatter and quiz data
are validated against their schemas at build time, and an invalid file fails the
build with the offending path.

## Adding a lesson

Lessons are MDX files under `src/content/`:

- **Track lessons** live in `src/content/tracks/<track>/<slug>.mdx`
- **Reference entries** live in `src/content/reference/<area>/<slug>.mdx`

The file's path under `src/content/` becomes its URL under `/docs`. For example
`src/content/tracks/junior/components.mdx` → `/docs/tracks/junior/components`.

Every lesson needs frontmatter matching the schema in
`src/lib/content/schema.ts`:

```mdx
---
title: "Thinking in Components" # required
summary: One-line summary shown in listings and search. # optional
track: junior # required — see tracks below
order: 3 # sort order within its sidebar section (lower first); default 0
tags: [components, composition] # default []
prerequisites: [tracks/junior/what-is-react] # slugs to complete first; default []
draft: false # hidden from nav and the build when true; default false
---

Lesson content in MDX goes here.
```

**Valid `track` values:** `junior`, `mid`, `senior`, `tech-lead`, `testing`,
`security`, `reference`.

Tips:

- Set `draft: true` while a lesson is unfinished — it's excluded from navigation,
  static generation, and the sitemap.
- Code blocks support syntax highlighting via `rehype-pretty-code`.
- Keep `summary` short; it's used in listings, search results, and meta tags.

## Adding a quiz

Quizzes are TypeScript files under `src/content/quizzes/`, validated against
`src/lib/quiz/schema.ts`.

1. Create `src/content/quizzes/<slug>.ts`:

   ```ts
   import type { Quiz } from "@/lib/quiz/schema";

   export const myQuiz: Quiz = {
     slug: "my-quiz", // URL under /quizzes
     title: "My Quiz",
     description: "What this quiz reinforces.",
     track: "junior", // same track values as lessons
     questions: [
       {
         id: "stable-unique-id", // unique within this quiz
         prompt: "Question text?",
         options: ["Option A", "Option B", "Option C"], // at least two
         answerIndex: 1, // index of the correct option
         explanation: "Why the answer is correct, shown after answering.",
       },
     ],
   };
   ```

2. Register it in `src/content/quizzes/index.ts` by importing it and adding it to
   the `quizzes` array, in the order it should appear within its track.

## Pull request guidelines

- Keep PRs focused — one lesson, one quiz, or one fix per PR where practical.
- Make sure the checks above pass locally.
- Fill in the pull request template so reviewers know what changed and how you
  verified it.

## Reporting issues

Use the issue templates to report a bug or propose content. Include reproduction
steps for bugs, and the target track for content proposals.
