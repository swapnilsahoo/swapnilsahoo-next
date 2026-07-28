"use client";

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-ink-600 dark:text-ink-300">
            A critical error occurred. Please try again.
          </p>
          <button
            onClick={() => unstable_retry()}
            className="bg-brand-600 hover:bg-brand-700 min-h-11 rounded-md px-5 py-2 text-white"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
