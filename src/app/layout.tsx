import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Footer } from "@/features/profile/components/Footer";
import { StickyNav } from "@/features/profile/components/StickyNav";
import { TopUtilityBar } from "@/features/profile/components/TopUtilityBar";
import { profile } from "@/features/profile/data/profile";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.swapnilsahoo.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Dr. Swapnil Sahoo — Strategy, Entrepreneurship & Innovation | Great Lakes Institute of Management, Gurgaon",
    template: "%s | Dr. Swapnil Sahoo",
  },
  description:
    "Academic and professional portfolio of Dr. Swapnil Sahoo (Ph.D., XLRI Jamshedpur). Assistant Professor of Strategy at Great Lakes Institute of Management, Gurgaon. Research on entrepreneurial resourcefulness, family business, frugal innovation, and AI in management education.",
  authors: [{ name: profile.name }],
  creator: profile.name,
  publisher: profile.name,
  category: "Education",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  keywords: [
    "Swapnil Sahoo",
    "Strategy",
    "Entrepreneurship",
    "Family Business Resourcefulness",
    "Frugal Innovation",
    "Effectuation",
    "Bricolage",
    "Great Lakes Gurgaon",
    "GLIM",
    "XLRI",
    "AI in Management Education",
    "Karma Yoga",
    "PhD supervisor",
    "BAM 2025",
    "AOM 2025",
  ],
  openGraph: {
    type: "profile",
    locale: "en_IN",
    title: "Dr. Swapnil Sahoo — Strategy & Entrepreneurship",
    description:
      "Faculty, researcher, and PhD supervisor working on entrepreneurial resourcefulness, family business, and AI-enabled management education.",
    images: [profile.profileImage],
    url: siteUrl,
    siteName: "Dr. Swapnil Sahoo",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@swapnilsahoo",
    title: "Dr. Swapnil Sahoo — Strategy & Entrepreneurship",
    description: "Assistant Professor in Strategy at Great Lakes Institute of Management, Gurgaon.",
    images: [profile.profileImage],
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fbff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Assistant Professor, Strategy",
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Great Lakes Institute of Management, Gurgaon",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "XLRI Jamshedpur" },
    { "@type": "CollegeOrUniversity", name: "Xavier Institute of Management, Bhubaneswar" },
    { "@type": "CollegeOrUniversity", name: "Utkal University (ITER)" },
  ],
  url: siteUrl,
  sameAs: [
    "https://www.linkedin.com/in/swapnilsahoo/",
    "https://x.com/swapnilsahoo",
    "https://www.instagram.com/swapnilsahoo/",
    "https://www.greatlakes.edu.in/gurgaon/swapnil-sahoo/",
  ],
  knowsAbout: [
    "Strategy",
    "Entrepreneurship",
    "Family Business Resourcefulness",
    "Frugal Innovation",
    "Effectuation",
    "Neurodiversity",
    "AI in Management Education",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <ScrollProgress />
          <TopUtilityBar />
          <StickyNav />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
