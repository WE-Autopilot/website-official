import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Rss } from "lucide-react";
import { posts } from "virtual:blog";
import { blogTeams } from "../content/team";
import { blogPage } from "../content/pages";
import { site } from "../content/site";
import { Button, FilterPills, SectionHeading } from "../components/design-system";
import { PostCard } from "../components/PostCard";
import { personById } from "../lib/team";
import { usePageMeta } from "../hooks/usePageMeta";
import "./Blog.css";

type TeamFilter = "all" | (typeof blogTeams)[number]["id"];

export function Blog() {
  usePageMeta(blogPage.title, blogPage.lead);
  const [params, setParams] = useSearchParams();
  const teamParam = params.get("team");
  const team: TeamFilter = blogTeams.some((t) => t.id === teamParam) ? (teamParam as TeamFilter) : "all";
  const authorId = params.get("author");
  const author = authorId ? personById.get(authorId) : undefined;

  const filtered = posts.filter(
    (p) => (team === "all" || (p.teams as string[]).includes(team)) && (!author || p.author.id === author.id),
  );

  // Reset "load more" whenever the filters change.
  const filterKey = `${team}|${author?.id ?? ""}`;
  const [paging, setPaging] = useState({ key: filterKey, count: blogPage.pageSize });
  const visibleCount = paging.key === filterKey ? paging.count : blogPage.pageSize;
  const visible = filtered.slice(0, visibleCount);

  const update = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams(params);
    for (const [k, v] of Object.entries(changes)) {
      if (v === null) next.delete(k);
      else next.set(k, v);
    }
    setParams(next, { replace: true });
  };

  const options = [
    { id: "all" as TeamFilter, label: blogPage.allTab },
    ...blogTeams.map((t) => ({ id: t.id as TeamFilter, label: t.label })),
  ];

  return (
    <div className="page container blog">
      <SectionHeading
        level="h1"
        title={blogPage.title}
        note={blogPage.note}
        noteArrow="down"
        lead={blogPage.lead}
      />

      <section aria-labelledby="posts-title">
        <h2 id="posts-title" className="visually-hidden">
          {author ? blogPage.authorFilter(author.name) : blogPage.filterLabel}
        </h2>
        <div className="blog__filters">
          <FilterPills
            label={blogPage.filterLabel}
            options={options}
            value={team}
            onChange={(id) => update({ team: id === "all" ? null : id })}
          />
          {author && (
            <p className="blog__author-filter">
              <strong>{blogPage.authorFilter(author.name)}</strong>
              <button type="button" className="blog__clear" onClick={() => update({ author: null })}>
                {blogPage.clearAuthor}
              </button>
            </p>
          )}
        </div>

        {visible.length > 0 ? (
          <ul className="post-grid">
            {visible.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} headingLevel="h3" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="blog__empty">
            {blogPage.empty}{" "}
            <a href={site.blogHowToUrl} target="_blank" rel="noopener noreferrer">
              {blogPage.emptyLink}
            </a>
          </p>
        )}

        {filtered.length > visible.length && (
          <div className="blog__more">
            <Button
              variant="secondary"
              onClick={() => setPaging({ key: filterKey, count: visibleCount + blogPage.pageSize })}
            >
              {blogPage.loadMore}
            </Button>
          </div>
        )}
      </section>

      <p className="blog__rss">
        <a href="/rss.xml">
          <Rss size={16} aria-hidden="true" />
          {blogPage.rss}
        </a>
      </p>
    </div>
  );
}

export default Blog;
