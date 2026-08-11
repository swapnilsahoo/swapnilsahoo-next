import type { MetadataRoute } from "next";

import { researchBranches } from "@/features/research/data/researchAgenda";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.swapnilsahoo.com";

const researchBranchRoutes = researchBranches.map((branch) => ({
  path: `/research/${branch.slug}`,
  changeFrequency: "monthly" as const,
  priority: 0.82,
}));

const routes = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/research", changeFrequency: "monthly", priority: 0.9 },
  ...researchBranchRoutes,
  { path: "/teaching/1-year-mba", changeFrequency: "monthly", priority: 0.9 },
  { path: "/teaching/2-year-mba", changeFrequency: "monthly", priority: 0.9 },
  { path: "/teaching/karma-yoga", changeFrequency: "monthly", priority: 0.9 },
  {
    path: "/teaching/karma-yoga/b-schools",
    changeFrequency: "monthly",
    priority: 0.88,
  },
  {
    path: "/teaching/karma-yoga/india",
    changeFrequency: "monthly",
    priority: 0.88,
  },
  { path: "/teaching/business-simulation", changeFrequency: "monthly", priority: 0.9 },
  { path: "/teaching/ai-hackathon", changeFrequency: "monthly", priority: 0.85 },
  { path: "/placements", changeFrequency: "monthly", priority: 0.8 },
  { path: "/placements/industry-analysis", changeFrequency: "monthly", priority: 0.78 },
  { path: "/placements/case-study-preparation", changeFrequency: "monthly", priority: 0.8 },
  { path: "/spirituality", changeFrequency: "monthly", priority: 0.7 },
  {
    path: "/spirituality/bhagavad-gita",
    changeFrequency: "monthly",
    priority: 0.72,
  },
  {
    path: "/spirituality/ramcharitmanas",
    changeFrequency: "weekly",
    priority: 0.72,
  },
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
  { path: "/mythology/immortals", changeFrequency: "monthly", priority: 0.72 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    changeFrequency,
    priority,
  }));
}
