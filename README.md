# Next.js Reference Guide

The interactive **React & Next.js learning center and reference** — from Junior
to Tech Lead, plus dedicated **Testing** and **Security** tracks. Searchable
documentation covering React core, hooks, the App Router, caching, testing
strategy, and the common web vulnerabilities (with fixes), built on
**Next.js 16** and **React 19**.

> This is a work in progress, built in phases. See
> [the build plan](#roadmap) below for what's done and what's next.

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **TypeScript** (strict), **Tailwind CSS v4**
- **MDX** content (`@next/mdx`) authored in-repo under `content/`
- **next-themes** dark/light, shadcn-style UI primitives (`src/components/ui`)
- **Vitest** + React Testing Library (unit), **Playwright** (e2e)
- **Prettier**, **ESLint 9**, **Husky** + **lint-staged**
- **GitHub Actions** CI (typecheck, lint, tests, build); **Docker** for self-hosting

## Getting started

```bash
npm install
npm run dev
# open http://localhost:3000
```

### Scripts

| Script               | Purpose                              |
| -------------------- | ------------------------------------ |
| `npm run dev`        | Start the dev server                 |
| `npm run build`      | Production build (standalone output) |
| `npm run start`      | Run the production build             |
| `npm run lint`       | ESLint                               |
| `npm run typecheck`  | `tsc --noEmit`                       |
| `npm run format`     | Prettier write                       |
| `npm run test`       | Vitest unit/component tests          |
| `npm run test:e2e`   | Playwright end-to-end tests          |

## Running with Docker

```bash
docker compose up --build
# open http://localhost:3000
```

## Continuous integration

GitHub Actions runs the full test pipeline on every push and pull request —
typecheck, lint, unit/component tests, and a production build. See
[.github/workflows/ci.yml](.github/workflows/ci.yml).

## Deployment

A Docker setup is included for self-hosting (`docker compose up --build`). The
production deployment workflow is intentionally left open for now — pick a target
later.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add lessons and quizzes and run
the project checks.

## Project structure

```text
src/
  app/          # App Router routes, layouts, error/loading boundaries
  components/   # ui/ primitives, layout/, mdx/ (lesson components)
  lib/          # utilities, site config, content/search/progress (later phases)
content/        # MDX learning tracks + reference docs
scripts/        # content + search-index build scripts (later phases)
```

## Roadmap

- **Phase 0 — Foundations & deploy pipeline** ✅ src/ layout, tooling, UI shell,
  theme toggle, testing, Docker + CI/CD.
- **Phase 1 — Content engine** — MDX pipeline, docs routes, sidebar/TOC.
- **Phase 2 — Search** — build-time index + ⌘K palette.
- **Phase 3 — Content & learning tracks** — Junior→Tech Lead lessons plus
  Testing and Security tracks (57+ lessons); live playgrounds next.
- **Phase 4 — Knowledge tests** ✅ quiz runner with per-track quizzes, answer
  explanations, scoring, and local (localStorage) progress.
- **Phase 5 — Production hardening** — a11y, perf/caching, SEO, contributor docs.

Built with [Claude Code](https://claude.com/claude-code).
