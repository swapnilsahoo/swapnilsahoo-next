import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.swapnilsahoo.com";

const routes = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/teaching/1-year-mba", changeFrequency: "monthly", priority: 0.9 },
  { path: "/teaching/2-year-mba", changeFrequency: "monthly", priority: 0.9 },
  { path: "/teaching/karma-yoga", changeFrequency: "monthly", priority: 0.9 },
  { path: "/teaching/business-simulation", changeFrequency: "monthly", priority: 0.9 },
  { path: "/teaching/ai-hackathon", changeFrequency: "monthly", priority: 0.85 },
  { path: "/case-study-preparation", changeFrequency: "monthly", priority: 0.8 },
  { path: "/placements", changeFrequency: "monthly", priority: 0.8 },
  { path: "/spirituality", changeFrequency: "monthly", priority: 0.7 },
  {
    path: "/spirituality/hanuman-chalisa",
    changeFrequency: "monthly",
    priority: 0.72,
  },
  {
    path: "/spirituality/vishnu-sahasranama",
    changeFrequency: "monthly",
    priority: 0.72,
  },
  {
    path: "/spirituality/lalita-sahasranama",
    changeFrequency: "monthly",
    priority: 0.72,
  },
  {
    path: "/spirituality/shiva-tandava-stotram",
    changeFrequency: "monthly",
    priority: 0.72,
  },
  { path: "/comics", changeFrequency: "monthly", priority: 0.7 },
  { path: "/mythology", changeFrequency: "monthly", priority: 0.7 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    changeFrequency,
    priority,
  }));
}
