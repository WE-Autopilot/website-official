import type { BlogTeamId } from "../content/team";

/** A blog post's details, checked at build time by plugins/blog.ts. */
export interface PostMeta {
  /** URL slug: /blog/<slug>. The file name without the date. */
  slug: string;
  /** File name in src/content/blog/. */
  file: string;
  /** May contain ==marker== highlights. */
  title: string;
  /** YYYY-MM-DD */
  date: string;
  /** `id` is set when the author is on team.ts; guests only have a name. */
  author: { id?: string; name: string };
  teams: BlogTeamId[];
  summary: string;
  cover?: string;
  coverAlt?: string;
  draft: boolean;
  readingMinutes: number;
}
