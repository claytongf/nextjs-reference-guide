export const siteConfig = {
  name: "React/Next Reference",
  description:
    "The interactive React & Next.js learning center and reference — from Junior to Tech Lead. Docs, live playgrounds, and knowledge tests.",
  // Primary navigation shown in the header.
  nav: [
    { title: "Docs", href: "/docs" },
    { title: "Tracks", href: "/tracks" },
    { title: "Quizzes", href: "/quizzes" },
  ],
  links: {
    github: "https://github.com/claytongf/nextjs-cheatsheet",
  },
} as const;

export type SiteConfig = typeof siteConfig;
