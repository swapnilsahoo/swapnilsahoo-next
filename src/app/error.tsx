"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/Button";
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
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <Typography as="h1" variant="h2">
        Something went wrong
      </Typography>
      <Typography variant="body">An unexpected error occurred. Please try again.</Typography>
      <Button onClick={() => unstable_retry()}>Try again</Button>
    </Container>
  );
}
