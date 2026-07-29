import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { InstagramIcon, LinkedInIcon, XIcon } from "@/components/icons/SocialIcons";
import { socialLinks } from "@/features/profile/data/navigation";

const socialIcons = {
  X: XIcon,
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
};

export function TopUtilityBar() {
  const year = new Date().getFullYear();

  return (
    <div className="relative z-10">
      <Container className="flex items-center justify-end py-3 text-xs sm:justify-between">
        <p className="text-ink-500 dark:text-ink-300 hidden font-mono tracking-wider sm:block">
          © Dr. Swapnil Sahoo · {year}
        </p>
        <div className="flex items-center gap-1 sm:gap-3">
          {socialLinks.map((social) => {
            const Icon = socialIcons[social.label];
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="hover:bg-ink-100 dark:hover:bg-ink-800 flex h-11 w-11 items-center justify-center rounded-full transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
          <ThemeToggle />
        </div>
      </Container>
    </div>
  );
}
