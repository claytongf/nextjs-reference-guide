"use client"; // global-error replaces the root layout, so it renders <html>/<body>

import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="en">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h2>Application error</h2>
        <p>A critical error occurred. Please reload the page.</p>
        <button onClick={() => unstable_retry()}>Try again</button>
      </body>
    </html>
  );
}
