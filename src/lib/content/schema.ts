import { z } from "zod";

/**
 * Learning tracks (audience levels) plus the standalone API reference.
 * The order here is the order sections appear in the sidebar.
 */
export const TRACKS = [
  "junior",
  "mid",
  "senior",
  "tech-lead",
  "testing",
  "security",
  "reference",
] as const;

export type Track = (typeof TRACKS)[number];

export const TRACK_META: Record<Track, { label: string; description: string }> =
  {
    junior: {
      label: "Junior",
      description: "Foundations of React & Next.js.",
    },
    mid: {
      label: "Mid-level",
      description: "Data, rendering, and routing in depth.",
    },
    senior: {
      label: "Senior",
      description: "Architecture, performance, and caching.",
    },
    "tech-lead": {
      label: "Tech Lead",
      description: "Scaling teams, standards, and trade-offs.",
    },
    testing: {
      label: "Testing",
      description: "Unit, component, and end-to-end testing strategy.",
    },
    security: {
      label: "Security",
      description: "Common vulnerabilities and how to fix them.",
    },
    reference: {
      label: "Reference",
      description: "API reference for directives, functions, and conventions.",
    },
  };

/** YAML frontmatter contract every lesson/reference MDX file must satisfy. */
export const docFrontmatterSchema = z.object({
  title: z.string().min(1),
  summary: z.string().optional(),
  track: z.enum(TRACKS),
  /** Sort order within its sidebar section. Lower comes first. */
  order: z.number().default(0),
  tags: z.array(z.string()).default([]),
  /** Slugs (relative to /docs) a reader should complete first. */
  prerequisites: z.array(z.string()).default([]),
  /** Hidden from navigation and static generation when true. */
  draft: z.boolean().default(false),
});

export type DocFrontmatter = z.infer<typeof docFrontmatterSchema>;
