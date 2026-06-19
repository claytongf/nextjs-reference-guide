import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getPublishedDocs } from "@/lib/content/loader";
import { getAllQuizzes } from "@/lib/quiz/loader";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}`, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/docs`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/tracks`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/quizzes`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const docRoutes: MetadataRoute.Sitemap = getPublishedDocs().map((doc) => ({
    url: `${base}/docs/${doc.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const quizRoutes: MetadataRoute.Sitemap = getAllQuizzes().map((quiz) => ({
    url: `${base}/quizzes/${quiz.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...docRoutes, ...quizRoutes];
}
