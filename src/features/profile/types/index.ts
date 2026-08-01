export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  children?: NavLink[];
}

export interface NavDropdown {
  label: string;
  href: string;
  items: NavLink[];
}

export interface StatItem {
  value: string;
  suffix?: string;
  label: string;
}

export interface ResearchStream {
  index: string;
  title: string;
  description: string;
  icon: "bricolage" | "compass" | "spark" | "network";
}

export type PublicationCategory = "journal" | "chapter" | "case" | "essay" | "press";

export interface Publication {
  title: string;
  meta: string;
  year: string;
  href: string;
  category: PublicationCategory;
  badge?: string;
}

export interface ConferenceEntry {
  venue: string;
  location?: string;
  badge?: string;
  title: string;
  subtitle?: string;
  highlight?: boolean;
}

export interface TeachingLink {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  external?: boolean;
}

export interface MdpModule {
  index: string;
  title: string;
  items: string[];
}

export interface MdpProgram {
  venue: string;
  audience: string;
  title: string;
  description: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  description?: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  sourceUrl?: string;
}

export interface ContactCard {
  title: string;
  description: string;
  href: string;
  external?: boolean;
  icon: "mail" | "calendar" | "rss" | "briefcase";
}
