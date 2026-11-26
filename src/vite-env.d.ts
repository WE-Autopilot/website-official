/// <reference types="vite/client" />

declare module "virtual:blog" {
  import type { PostMeta } from "@/blog/types";
  /** Every published post (plus drafts in `npm run dev`), newest first. */
  export const posts: PostMeta[];
  /** Loads a post's Markdown body (without frontmatter) by slug. */
  export const loaders: Record<string, () => Promise<string>>;
}
