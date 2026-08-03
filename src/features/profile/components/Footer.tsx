import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { InstagramIcon, LinkedInIcon, SubstackIcon, XIcon } from "@/components/icons/SocialIcons";

const footerLinks = [
  { label: "About", href: "/#about" },
  { label: "Research", href: "/#research" },
  { label: "Publications", href: "/#publications" },
  { label: "PhD supervision", href: "/#phd" },
];

const socials = [
  { label: "X", href: "https://x.com/swapnilsahoo", Icon: XIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/swapnilsahoo/", Icon: LinkedInIcon },
  { label: "Instagram", href: "https://www.instagram.com/swapnilsahoo/", Icon: InstagramIcon },
  { label: "Substack", href: "https://swapnilsahoo.substack.com/", Icon: SubstackIcon },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-ink-200 dark:border-ink-800 mt-12 border-t">
      <Container className="grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl font-semibold">Dr. Swapnil Sahoo</p>
          <p className="text-ink-600 dark:text-ink-300 mt-1 text-sm">
            Assistant Professor · Strategy · GLIM Gurgaon
          </p>
        </div>
        <div>
          <p className="eyebrow mb-3">Site</p>
          <nav aria-label="Footer navigation">
            <ul className="space-y-1.5 text-sm">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="link-underline inline-flex min-h-11 items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div>
          <p className="eyebrow mb-3">Elsewhere</p>
          <div className="flex items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Swapnil Sahoo on ${label}`}
                className="bg-ink-100 dark:bg-ink-800 hover:bg-ink-200 dark:hover:bg-ink-700 flex h-11 w-11 items-center justify-center rounded-lg transition-colors"
              >
                <Icon className="h-4 w-4" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        </div>
      </Container>
      <Container className="text-ink-500 dark:text-ink-400 flex flex-wrap items-center justify-between gap-2 pb-8 text-xs">
        <p>© {year} Dr. Swapnil Sahoo. Except where a source or licence states otherwise.</p>
        <p className="font-mono">Research, teaching and field notes.</p>
      </Container>
    </footer>
  );
}
