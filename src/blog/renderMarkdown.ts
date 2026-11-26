/**
 * Markdown → safe HTML for blog posts, with the sketch-style extras:
 * framed photos (alt text as caption), `> note:` asides, outlined code
 * blocks with light highlighting. Only the post page imports this file, so
 * none of it ships with the rest of the site.
 */
import { Marked, type Tokens } from "marked";
import DOMPurify from "dompurify";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import cpp from "highlight.js/lib/languages/cpp";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import python from "highlight.js/lib/languages/python";
import typescript from "highlight.js/lib/languages/typescript";
import yaml from "highlight.js/lib/languages/yaml";

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("python", python);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("yaml", yaml);
hljs.registerAliases(["sh", "shell", "zsh"], { languageName: "bash" });
hljs.registerAliases(["c++", "c", "h", "hpp"], { languageName: "cpp" });
hljs.registerAliases(["js"], { languageName: "javascript" });
hljs.registerAliases(["ts"], { languageName: "typescript" });
hljs.registerAliases(["py"], { languageName: "python" });
hljs.registerAliases(["yml"], { languageName: "yaml" });

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const isExternal = (href: string) => /^https?:\/\//.test(href);

/** "photo.webp" in post "lidar-cones" → "/blog/lidar-cones/photo.webp" */
function resolveImage(href: string, slug: string) {
  if (href.startsWith("/") || /^[a-z]+:/i.test(href)) return href;
  return `/blog/${slug}/${href.replace(/^\.\//, "")}`;
}

export function renderMarkdown(markdown: string, slug: string): string {
  const marked = new Marked({ gfm: true });
  const usedIds = new Set<string>();

  const figure = ({ href, text }: Tokens.Image) =>
    `<figure class="photo-figure post-figure"><span class="photo-frame"><img src="${escapeHtml(resolveImage(href, slug))}" alt="${escapeHtml(text)}" loading="lazy" decoding="async"></span>${
      text ? `<figcaption class="caption">${escapeHtml(text)}</figcaption>` : ""
    }</figure>\n`;

  marked.use({
    renderer: {
      // The post title is the page's only h1, so body headings start at h2.
      heading({ tokens, depth }) {
        const level = Math.min(Math.max(depth, 2), 4);
        const html = this.parser.parseInline(tokens);
        let id = slugify(html) || "section";
        while (usedIds.has(id)) id += "-";
        usedIds.add(id);
        return `<h${level} id="${id}">${html}</h${level}>\n`;
      },

      // An image on its own line becomes a framed photo with its alt text as caption.
      paragraph(token) {
        const only = token.tokens.length === 1 ? token.tokens[0] : undefined;
        if (only?.type === "image") return figure(only as Tokens.Image);
        return false;
      },

      image({ href, text }) {
        return `<img class="post-inline-img" src="${escapeHtml(resolveImage(href, slug))}" alt="${escapeHtml(text)}" loading="lazy" decoding="async">`;
      },

      // "> note: ..." becomes a purple handwritten aside with an arrow.
      blockquote({ tokens, text }) {
        if (!/^\s*note:/i.test(text)) return false;
        const inner = this.parser.parse(tokens).replace(/<p>\s*note:\s*/i, "<p>");
        return `<aside class="post-note">${inner}</aside>\n`;
      },

      code({ text, lang }) {
        const language = (lang ?? "").trim().split(/\s+/)[0]?.toLowerCase() ?? "";
        const known = language && hljs.getLanguage(language);
        const body = known ? hljs.highlight(text, { language, ignoreIllegals: true }).value : escapeHtml(text);
        const cls = known ? ` class="hljs language-${escapeHtml(language)}"` : "";
        return `<pre class="post-code"><code${cls}>${body}</code></pre>\n`;
      },

      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const t = title ? ` title="${escapeHtml(title)}"` : "";
        const ext = isExternal(href) ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `<a href="${escapeHtml(href)}"${t}${ext}>${text}</a>`;
      },
    },
    hooks: {
      postprocess(html) {
        return html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, "</table></div>");
      },
    },
  });

  const html = marked.parse(markdown, { async: false });
  return DOMPurify.sanitize(html, { ADD_ATTR: ["target"] });
}
