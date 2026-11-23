/**
 * Vite plugin for the Markdown blog in src/content/blog/.
 *
 * - `import { posts, loaders } from "virtual:blog"` gives the app every
 *   post's details (checked here) and a lazy loader for each post's body,
 *   so post text only downloads on the post page.
 * - Bad frontmatter fails `npm run build` with a message naming the file.
 * - Drafts appear in `npm run dev` only and are never bundled into a build.
 * - Writes /rss.xml at build time (and serves it in dev).
 */
import fs from "node:fs";
import path from "node:path";
import type { Plugin, ResolvedConfig } from "vite";
import { blogTeams, people } from "../src/content/team";
import { site } from "../src/content/site";
import type { PostMeta } from "../src/blog/types";
import { FrontmatterError, parseFrontmatter, type FrontmatterValue } from "./frontmatter";

const VIRTUAL_ID = "virtual:blog";
const RESOLVED_ID = "\0virtual:blog";
const BODY_QUERY = "?blog-body";
const FILE_PATTERN = /^(\d{4}-\d{2}-\d{2})-([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/;
const ID_LIKE = /^[a-z0-9]+(?:-[a-z0-9]+)+$/;
const KNOWN_FIELDS = new Set(["title", "date", "author", "teams", "summary", "cover", "coverAlt", "draft"]);
const WORDS_PER_MINUTE = 200;

const teamIds = new Set<string>(blogTeams.map((t) => t.id));
const peopleById = new Map(people.map((p) => [p.id, p]));

export class BlogError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BlogError";
    // The message already says which file and what to fix; a stack trace only adds noise.
    this.stack = `${this.name}: ${message}`;
  }
}

function isPostFile(name: string): boolean {
  return name.endsWith(".md") && !name.startsWith("_") && name.toLowerCase() !== "readme.md";
}

function asString(v: FrontmatterValue | undefined): string | undefined {
  if (typeof v === "string") return v.trim() === "" ? undefined : v.trim();
  return undefined;
}

function validDate(s: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().startsWith(s);
}

function readingMinutes(body: string): number {
  const words = body.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** Reads, checks and sorts every post. Throws one error listing every problem. */
export function readPosts(blogDir: string, publicDir: string): PostMeta[] {
  const problems: string[] = [];
  const posts: PostMeta[] = [];
  const rel = (f: string) => path.posix.join("src/content/blog", f);
  const files = fs.existsSync(blogDir) ? fs.readdirSync(blogDir).filter(isPostFile).sort() : [];

  for (const file of files) {
    const fail = (msg: string) => problems.push(`  ${rel(file)}: ${msg}`);
    const nameMatch = file.match(FILE_PATTERN);
    if (!nameMatch) {
      fail('the file name must look like YYYY-MM-DD-short-slug.md (lowercase letters, numbers and dashes)');
      continue;
    }

    let data: Record<string, FrontmatterValue>;
    let body: string;
    try {
      ({ data, body } = parseFrontmatter(fs.readFileSync(path.join(blogDir, file), "utf8")));
    } catch (err) {
      fail(err instanceof FrontmatterError ? err.message : String(err));
      continue;
    }

    const before = problems.length;
    for (const key of Object.keys(data)) {
      if (!KNOWN_FIELDS.has(key)) fail(`unknown field "${key}" (allowed: ${[...KNOWN_FIELDS].join(", ")})`);
    }

    const title = asString(data.title);
    if (!title) fail('missing "title"');

    const date = asString(data.date);
    if (!date) fail('missing "date" (YYYY-MM-DD)');
    else if (!validDate(date)) fail(`"date" must be a real date written YYYY-MM-DD, got "${date}"`);

    const authorRaw = asString(data.author);
    let author: PostMeta["author"] | undefined;
    if (!authorRaw) {
      fail('missing "author" (an id from src/content/team.ts, or a guest\'s full name)');
    } else if (peopleById.has(authorRaw)) {
      author = { id: authorRaw, name: peopleById.get(authorRaw)!.name };
    } else if (ID_LIKE.test(authorRaw)) {
      fail(
        `unknown author id "${authorRaw}". Use an id from src/content/team.ts (${[...peopleById.keys()].join(", ")}), or write a guest's full name, like "Jane Doe"`,
      );
    } else {
      author = { name: authorRaw };
    }

    const teamsRaw = data.teams;
    const teams = Array.isArray(teamsRaw) ? teamsRaw : typeof teamsRaw === "string" ? [teamsRaw] : [];
    if (teams.length === 0) fail(`missing "teams" (one or more of: ${[...teamIds].join(", ")})`);
    for (const t of teams) {
      if (!teamIds.has(t)) fail(`unknown team "${t}" (use one or more of: ${[...teamIds].join(", ")})`);
    }

    const summary = asString(data.summary);
    if (!summary) fail('missing "summary" (one or two sentences for cards and link previews)');

    const cover = asString(data.cover);
    const coverAlt = asString(data.coverAlt);
    if (cover) {
      if (!cover.startsWith("/")) fail(`"cover" must start with /blog/..., got "${cover}"`);
      else if (!fs.existsSync(path.join(publicDir, cover))) fail(`"cover" file not found: public${cover}`);
      if (!coverAlt) fail('"cover" is set, so "coverAlt" is required: say what is in the picture');
    }

    let draft = false;
    if (data.draft !== undefined) {
      if (typeof data.draft === "boolean") draft = data.draft;
      else fail(`"draft" must be true or false, got "${String(data.draft)}"`);
    }

    if (problems.length > before) continue;

    const slug = nameMatch[2];
    const clash = posts.find((p) => p.slug === slug);
    if (clash) {
      fail(`another post (${clash.file}) already uses the slug "${slug}". Rename one of them.`);
      continue;
    }

    posts.push({
      slug,
      file,
      title: title!,
      date: date!,
      author: author!,
      teams: teams as PostMeta["teams"],
      summary: summary!,
      ...(cover ? { cover, coverAlt } : {}),
      draft,
      readingMinutes: readingMinutes(body),
    });
  }

  if (problems.length > 0) {
    throw new BlogError(
      `Blog post problems (see src/content/blog/README.md):\n${problems.join("\n")}`,
    );
  }

  return posts.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

const xml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
const plainTitle = (t: string) => t.replace(/==/g, "");
const rfc822 = (date: string) => new Date(`${date}T12:00:00Z`).toUTCString();

export function buildRss(posts: PostMeta[]): string {
  const blogUrl = `${site.url}/blog`;
  const items = posts
    .map((p) => {
      const url = `${blogUrl}/${p.slug}`;
      return [
        "    <item>",
        `      <title>${xml(plainTitle(p.title))}</title>`,
        `      <link>${xml(url)}</link>`,
        `      <guid isPermaLink="true">${xml(url)}</guid>`,
        `      <pubDate>${rfc822(p.date)}</pubDate>`,
        `      <dc:creator>${xml(p.author.name)}</dc:creator>`,
        ...p.teams.map((t) => `      <category>${xml(blogTeams.find((b) => b.id === t)!.label)}</category>`),
        `      <description>${xml(p.summary)}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${xml(site.name)} blog</title>
    <link>${xml(blogUrl)}</link>
    <atom:link href="${xml(site.url)}/rss.xml" rel="self" type="application/rss+xml"/>
    <description>${xml(`What ${site.name} is building, written by the team.`)}</description>
    <language>en-ca</language>${posts[0] ? `\n    <lastBuildDate>${rfc822(posts[0].date)}</lastBuildDate>` : ""}
${items}
  </channel>
</rss>
`;
}

export function blogPlugin(): Plugin {
  let config: ResolvedConfig;
  let blogDir = "";

  const load = () => {
    const all = readPosts(blogDir, config.publicDir);
    // Drafts only exist on the dev server; a build never sees them.
    return config.command === "serve" ? all : all.filter((p) => !p.draft);
  };

  return {
    name: "weap-blog",

    configResolved(resolved) {
      config = resolved;
      blogDir = path.join(resolved.root, "src/content/blog");
    },

    buildStart() {
      // Fail fast with the full list of problems.
      if (config.command === "build") load();
    },

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
      return undefined;
    },

    load(id) {
      if (id === RESOLVED_ID) {
        const posts = load();
        for (const p of posts) this.addWatchFile(path.join(blogDir, p.file));
        const loaders = posts
          .map(
            (p) =>
              `  ${JSON.stringify(p.slug)}: () => import(${JSON.stringify(`/src/content/blog/${p.file}${BODY_QUERY}`)}).then((m) => m.default),`,
          )
          .join("\n");
        return `export const posts = ${JSON.stringify(posts, null, 2)};\nexport const loaders = {\n${loaders}\n};\n`;
      }
      if (id.endsWith(BODY_QUERY)) {
        const file = id.slice(0, -BODY_QUERY.length);
        const { body } = parseFrontmatter(fs.readFileSync(file, "utf8"));
        return `export default ${JSON.stringify(body)};`;
      }
      return undefined;
    },

    configureServer(server) {
      const onChange = (file: string) => {
        if (!file.startsWith(blogDir) || !file.endsWith(".md")) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      };
      server.watcher.add(blogDir);
      server.watcher.on("add", onChange);
      server.watcher.on("unlink", onChange);
      server.watcher.on("change", onChange);

      server.middlewares.use("/rss.xml", (_req, res) => {
        try {
          const body = buildRss(load());
          res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
          res.end(body);
        } catch (err) {
          res.statusCode = 500;
          res.end(err instanceof Error ? err.message : String(err));
        }
      });
    },

    generateBundle() {
      this.emitFile({ type: "asset", fileName: "rss.xml", source: buildRss(load()) });
    },
  };
}
