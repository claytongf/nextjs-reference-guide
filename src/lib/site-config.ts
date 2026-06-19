export const siteConfig = {
  name: "Next.js Reference Guide",
  description:
    "The interactive React & Next.js learning center and reference — from Junior to Tech Lead. Searchable docs, study tracks, and knowledge tests for React 19 and Next.js 16.",
  // Canonical site URL. Override per environment with NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Primary navigation shown in the header.
  nav: [
    { title: "Docs", href: "/docs" },
    { title: "Tracks", href: "/tracks" },
    { title: "Quizzes", href: "/quizzes" },
  ],
  links: {
    github: "https://github.com/claytongf/nextjs-reference-guide",
  },
} as const;

export type SiteConfig = typeof siteConfig;
