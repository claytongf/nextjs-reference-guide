"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // TODO(Phase 5): forward to an error-reporting service.
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <p className="text-muted-foreground text-sm">
        An unexpected error occurred while rendering this page.
      </p>
      <Button onClick={() => unstable_retry()}>Try again</Button>
    </div>
  );
}
