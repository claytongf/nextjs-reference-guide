import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllQuizzes, getQuizBySlug } from "@/lib/quiz/loader";
import { QuizRunner } from "@/components/quiz/quiz-runner";

// Quizzes are a fixed, build-time set — any other slug is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllQuizzes().map((quiz) => ({ slug: quiz.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);
  if (!quiz) return { title: "Quiz not found" };
  return { title: quiz.title, description: quiz.description };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);
  if (!quiz) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Link
        href="/quizzes"
        className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1 text-sm transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        All quizzes
      </Link>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{quiz.title}</h1>
        <p className="text-muted-foreground mt-2">{quiz.description}</p>
      </header>
      <QuizRunner quiz={quiz} />
    </div>
  );
}
