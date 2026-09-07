import { belovedChildOfVraja } from "@/features/writing/data/posts/beloved-child-of-vraja";
import type { BlogPost } from "@/features/writing/types";

// Newest first — the order this list is declared in is the order the
// index page and the sitemap render posts in.
export const blogPosts: readonly BlogPost[] = [belovedChildOfVraja];

export const blogPostBySlug: Record<string, BlogPost> = Object.fromEntries(
  blogPosts.map((post) => [post.slug, post])
);

export const blogSlugs: readonly string[] = blogPosts.map((post) => post.slug);

export function isBlogSlug(slug: string): boolean {
  return slug in blogPostBySlug;
}
