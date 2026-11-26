import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { loaders, posts } from "virtual:blog";
import { blogPage } from "../content/pages";
import { Chip, MarkedText, SectionHeading } from "../components/design-system";
import { PostCard } from "../components/PostCard";
import { renderMarkdown } from "../blog/renderMarkdown";
import { blogTeamLabel, personById, roleTitles } from "../lib/team";
import { formatDate, withDefaultMarker } from "../lib/text";
import { usePageMeta } from "../hooks/usePageMeta";
import "./BlogPost.css";

export function BlogPost() {
  const { slug = "" } = useParams();
  const post = posts.find((p) => p.slug === slug);
  usePageMeta(post?.title ?? blogPage.notFound.title, post?.summary);

  const [body, setBody] = useState<{ slug: string; html: string } | null>(null);

  useEffect(() => {
    const load = loaders[slug];
    if (!load) return;
    let cancelled = false;
    load().then((md) => {
      if (!cancelled) setBody({ slug, html: renderMarkdown(md, slug) });
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!post) {
    return (
      <div className="page container">
        <SectionHeading
          level="h1"
          title={blogPage.notFound.title}
          note={blogPage.notFound.note}
          action={{ label: blogPage.backToBlog, to: "/blog" }}
        />
      </div>
    );
  }

  const author = post.author.id ? personById.get(post.author.id) : undefined;
  const mainTeam = post.teams[0]!;
  const related = posts.filter((p) => p.slug !== post.slug && (p.teams as string[]).includes(mainTeam)).slice(0, 3);
  const html = body?.slug === slug ? body.html : null;

  return (
    <div className="page container post">
      <article>
        <header className="post__header">
          <Link to="/blog" className="post__back">
            <ArrowLeft size={18} aria-hidden="true" />
            {blogPage.backToBlog}
          </Link>
          <ul className="chip-list">
            {post.teams.map((t) => (
              <li key={t}>
                <Chip to={`/blog?team=${t}`}>{blogTeamLabel(t)}</Chip>
              </li>
            ))}
          </ul>
          <h1 className="post__title">
            <MarkedText text={withDefaultMarker(post.title)} />
          </h1>
          <p className="post__summary lead">{post.summary}</p>
          <p className="post__meta">
            <span>
              {blogPage.by}{" "}
              {author ? (
                <Link to={`/team#${author.id}`}>
                  <strong>{author.name}</strong>
                </Link>
              ) : (
                <strong>{post.author.name}</strong>
              )}
              {author && <span className="post__role">, {roleTitles(author)}</span>}
            </span>
            <span className="caption">
              <time dateTime={post.date}>{formatDate(post.date)}</time> · {blogPage.minRead(post.readingMinutes)}
            </span>
          </p>
        </header>

        {post.cover && (
          <span className="photo-frame post__cover">
            <img src={post.cover} alt={post.coverAlt} />
          </span>
        )}

        <div className="prose" aria-busy={html === null}>
          {html !== null && <div dangerouslySetInnerHTML={{ __html: html }} />}
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="post__related">
          <SectionHeading
            id="related-title"
            title={blogPage.moreFrom(blogTeamLabel(mainTeam))}
            action={{ label: blogPage.backToBlog, to: `/blog?team=${mainTeam}` }}
          />
          <ul className="post-grid">
            {related.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default BlogPost;
