import { z } from "zod";
import { TRACKS } from "@/lib/content/schema";

/** A single multiple-choice question. */
export const quizQuestionSchema = z
  .object({
    /** Stable id, unique within its quiz. */
    id: z.string().min(1),
    prompt: z.string().min(1),
    /** Answer choices in display order; at least two. */
    options: z.array(z.string().min(1)).min(2),
    /** Index into `options` of the correct choice. */
    answerIndex: z.number().int().nonnegative(),
    /** Shown after answering, explaining why the answer is correct. */
    explanation: z.string().min(1),
  })
  .refine((q) => q.answerIndex < q.options.length, {
    message: "answerIndex is out of range for options",
    path: ["answerIndex"],
  });

/** A quiz: a set of questions tied to a learning track. */
export const quizSchema = z.object({
  /** URL slug under /quizzes. */
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  /** The learning track this quiz reinforces. */
  track: z.enum(TRACKS),
  questions: z.array(quizQuestionSchema).min(1),
});

export type QuizQuestion = z.infer<typeof quizQuestionSchema>;
export type Quiz = z.infer<typeof quizSchema>;
