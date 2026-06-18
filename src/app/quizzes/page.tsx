import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getQuizzesByTrack } from "@/lib/quiz/loader";
import { QuizProgressBadge } from "@/components/quiz/quiz-progress-badge";

export const metadata: Metadata = {
  title: "Quizzes",
  description:
    "Test your React & Next.js knowledge with quizzes across every track — from fundamentals to security. Progress is saved in your browser.",
};

export default function QuizzesPage() {
  const sections = getQuizzesByTrack();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Quizzes</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Check your understanding with quick multiple-choice quizzes. Each
          question explains the answer, and your best score is saved locally in
          your browser.
        </p>
      </header>

      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section.track}>
            <h2 className="text-muted-foreground mb-3 text-sm font-semibold tracking-wide uppercase">
              {section.label}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {section.quizzes.map((quiz) => (
                <Link
                  key={quiz.slug}
                  href={`/quizzes/${quiz.slug}`}
                  className="border-border hover:bg-muted group flex flex-col rounded-lg border p-6 transition-colors"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {quiz.title}
                    </h3>
                    <ArrowRight className="text-muted-foreground h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-muted-foreground flex-1 text-sm">
                    {quiz.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-muted-foreground text-xs font-medium">
                      {quiz.questions.length} questions
                    </span>
                    <QuizProgressBadge slug={quiz.slug} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
