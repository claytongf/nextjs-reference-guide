"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, X, ArrowRight, RotateCcw } from "lucide-react";
import type { Quiz } from "@/lib/quiz/schema";
import { recordResult } from "@/lib/quiz/progress";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Answer {
  selectedIndex: number;
  correct: boolean;
}

export function QuizRunner({ quiz }: { quiz: Quiz }) {
  const total = quiz.questions.length;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [finished, setFinished] = useState(false);

  const question = quiz.questions[index];
  const isLast = index === total - 1;
  const score = useMemo(
    () => answers.filter((a) => a.correct).length,
    [answers],
  );

  function check() {
    if (selected === null || revealed) return;
    setRevealed(true);
  }

  function next() {
    if (selected === null) return;
    const answer: Answer = {
      selectedIndex: selected,
      correct: selected === question.answerIndex,
    };
    const updated = [...answers, answer];
    setAnswers(updated);

    if (isLast) {
      recordResult(quiz.slug, updated.filter((a) => a.correct).length, total);
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setRevealed(false);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setAnswers([]);
    setFinished(false);
  }

  if (finished) {
    const pct = Math.round((score / total) * 100);
    const passed = pct >= 70;
    return (
      <div className="space-y-6">
        <div className="border-border rounded-lg border p-6 text-center">
          <p className="text-muted-foreground text-sm font-medium">
            Your score
          </p>
          <p className="mt-1 text-4xl font-bold tracking-tight">
            {score} / {total}
          </p>
          <p
            className={cn(
              "mt-2 text-lg font-semibold",
              passed
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-amber-600 dark:text-amber-400",
            )}
          >
            {pct}% —{" "}
            {passed ? "Nicely done!" : "Keep studying — you'll get it."}
          </p>
        </div>

        <ol className="space-y-3">
          {quiz.questions.map((q, i) => {
            const a = answers[i];
            return (
              <li
                key={q.id}
                className="border-border flex items-start gap-3 rounded-lg border p-4 text-sm"
              >
                <ResultIcon correct={a?.correct ?? false} />
                <div>
                  <p className="font-medium">{q.prompt}</p>
                  {!a?.correct && (
                    <p className="text-muted-foreground mt-1">
                      Correct answer: {q.options[q.answerIndex]}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <div className="flex flex-wrap gap-3">
          <Button onClick={restart}>
            <RotateCcw className="h-4 w-4" />
            Try again
          </Button>
          <Link
            href="/quizzes"
            className={buttonVariants({ variant: "outline" })}
          >
            All quizzes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="text-muted-foreground flex items-center justify-between text-sm">
          <span>
            Question {index + 1} of {total}
          </span>
          <span>{score} correct</span>
        </div>
        <div className="bg-muted h-1.5 overflow-hidden rounded-full">
          <div
            className="bg-primary h-full transition-all"
            style={{ width: `${(index / total) * 100}%` }}
          />
        </div>
      </div>

      <fieldset>
        <legend className="text-lg font-semibold tracking-tight">
          {question.prompt}
        </legend>
        <div className="mt-4 space-y-2">
          {question.options.map((option, i) => {
            const isSelected = selected === i;
            const isCorrect = i === question.answerIndex;
            return (
              <button
                key={i}
                type="button"
                aria-pressed={isSelected}
                disabled={revealed}
                onClick={() => setSelected(i)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition-colors",
                  "border-border hover:bg-muted disabled:cursor-default",
                  isSelected && !revealed && "border-primary bg-primary/5",
                  revealed &&
                    isCorrect &&
                    "border-emerald-500/50 bg-emerald-500/10",
                  revealed &&
                    isSelected &&
                    !isCorrect &&
                    "border-red-500/50 bg-red-500/10",
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs",
                    isSelected && !revealed && "border-primary",
                    revealed &&
                      isCorrect &&
                      "border-emerald-500 text-emerald-600",
                    revealed &&
                      isSelected &&
                      !isCorrect &&
                      "border-red-500 text-red-600",
                  )}
                >
                  {revealed && isCorrect ? (
                    <Check className="h-3 w-3" />
                  ) : revealed && isSelected && !isCorrect ? (
                    <X className="h-3 w-3" />
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                {option}
              </button>
            );
          })}
        </div>
      </fieldset>

      {revealed && (
        <div className="border-border text-muted-foreground border-l-primary rounded-lg border border-l-4 p-4 text-sm">
          <span className="text-foreground font-semibold">
            {selected === question.answerIndex ? "Correct. " : "Not quite. "}
          </span>
          {question.explanation}
        </div>
      )}

      <div className="flex justify-end">
        {revealed ? (
          <Button onClick={next}>
            {isLast ? "See results" : "Next question"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={check} disabled={selected === null}>
            Check answer
          </Button>
        )}
      </div>
    </div>
  );
}

function ResultIcon({ correct }: { correct: boolean }) {
  return (
    <span
      className={cn(
        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
        correct
          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
          : "bg-red-500/15 text-red-600 dark:text-red-400",
      )}
    >
      {correct ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
    </span>
  );
}
