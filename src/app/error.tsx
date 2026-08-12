"use client";

import { useEffect } from "react";

import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container
      id="main-content"
      role="main"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center"
    >
      <Typography as="h1" variant="h2">
        Something went wrong
      </Typography>
      <Typography variant="body">
        Something broke while loading this page. A refresh usually clears it.
      </Typography>
      <button onClick={() => unstable_retry()} className="btn-primary">
        Try again
      </button>
    </Container>
  );
}
