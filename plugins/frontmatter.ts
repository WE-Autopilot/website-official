/**
 * A tiny parser for the frontmatter at the top of a blog post. It understands
 * the small slice of YAML the posts use:
 *
 *   title: How our LiDAR sees cones      # comments after values are ignored
 *   teams: [perception, build]           # or a "- item" list on the next lines
 *   draft: false
 *   summary: "Quoted values work too"
 */

export type FrontmatterValue = string | boolean | string[];

export interface ParsedPost {
  data: Record<string, FrontmatterValue>;
  body: string;
}

export class FrontmatterError extends Error {}

function unquote(raw: string): string {
  const v = raw.trim();
  if (v.length >= 2 && ((v[0] === '"' && v.endsWith('"')) || (v[0] === "'" && v.endsWith("'")))) {
    const inner = v.slice(1, -1);
    return v[0] === '"' ? inner.replace(/\\"/g, '"').replace(/\\\\/g, "\\") : inner.replace(/''/g, "'");
  }
  return v;
}

/** Removes a trailing `# comment` that isn't inside quotes. */
function stripComment(raw: string): string {
  let quote: string | null = null;
  for (let i = 0; i < raw.length; i++) {
    const c = raw[i];
    if (quote) {
      if (c === quote) quote = null;
    } else if (c === '"' || c === "'") {
      quote = c;
    } else if (c === "#" && (i === 0 || /\s/.test(raw[i - 1]))) {
      return raw.slice(0, i).trimEnd();
    }
  }
  return raw.trimEnd();
}

function parseValue(raw: string): FrontmatterValue {
  const v = stripComment(raw).trim();
  if (v.startsWith("[") && v.endsWith("]")) {
    const inner = v.slice(1, -1).trim();
    return inner === "" ? [] : inner.split(",").map((s) => unquote(s)).filter((s) => s !== "");
  }
  if (v === "true") return true;
  if (v === "false") return false;
  return unquote(v);
}

export function parseFrontmatter(source: string): ParsedPost {
  const text = source.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
  if (!text.startsWith("---\n")) {
    throw new FrontmatterError("the file must start with a line of three dashes (---) followed by the frontmatter");
  }
  const end = text.indexOf("\n---", 3);
  if (end === -1) {
    throw new FrontmatterError("the frontmatter never ends: add a line of three dashes (---) after it");
  }
  const lines = text.slice(4, end).split("\n");
  const afterFence = text.indexOf("\n", end + 1);
  const body = afterFence === -1 ? "" : text.slice(afterFence + 1);

  const data: Record<string, FrontmatterValue> = {};
  let listKey: string | null = null;

  lines.forEach((line, i) => {
    const lineNo = i + 2;
    if (line.trim() === "" || line.trim().startsWith("#")) return;

    const item = line.match(/^\s+-\s+(.*)$/);
    if (item) {
      if (!listKey) throw new FrontmatterError(`line ${lineNo}: a "- item" line needs a key above it`);
      (data[listKey] as string[]).push(unquote(stripComment(item[1])));
      return;
    }

    const kv = line.match(/^([A-Za-z][\w-]*)\s*:\s*(.*)$/);
    if (!kv) throw new FrontmatterError(`line ${lineNo}: expected "key: value", got "${line.trim()}"`);
    const [, key, rest] = kv;
    if (key in data) throw new FrontmatterError(`line ${lineNo}: "${key}" appears twice`);

    if (stripComment(rest).trim() === "") {
      data[key] = [];
      listKey = key;
    } else {
      data[key] = parseValue(rest);
      listKey = null;
    }
  });

  return { data, body };
}
