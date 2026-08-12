import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";

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
        That page doesn&apos;t exist, or it moved when the site was restructured. Try Research,
        Teaching, or head back to the homepage.
      </Typography>
      <Link href="/" className="btn-primary">
        Back to home
      </Link>
    </Container>
  );
}
