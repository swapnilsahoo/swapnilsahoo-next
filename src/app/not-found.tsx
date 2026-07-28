import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { buttonClassName } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container
      id="main-content"
      role="main"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center"
    >
      <Typography as="h1" variant="h2">
        Page not found
      </Typography>
      <Typography variant="body">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </Typography>
      <Link href="/" className={buttonClassName()}>
        Back to home
      </Link>
    </Container>
  );
}
