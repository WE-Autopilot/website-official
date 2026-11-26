import { Link } from "react-router-dom";
import type { PostMeta } from "../blog/types";
import { blogPage } from "../content/pages";
import { groupById, blogTeamLabel } from "../lib/team";
import { formatDate, plainText } from "../lib/text";
import { Chip, Doodle } from "./design-system";
import type { DoodleName } from "../content/types";
import type { GroupId } from "../content/team";
import "./PostCard.css";

function doodleFor(post: PostMeta): DoodleName {
  const team = post.teams[0];
  if (team && team !== "club") return groupById.get(team as GroupId)?.doodle ?? "pencil";
  return "pencil";
}

/** A blog post card: cover (or team doodle), title, author, date, teams, summary. */
export function PostCard({ post, headingLevel: H = "h3" }: { post: PostMeta; headingLevel?: "h2" | "h3" }) {
  return (
    <article className="post-card sketch sketch--interactive">
      {post.cover ? (
        <span className="photo-frame post-card__cover">
          <img src={post.cover} alt={post.coverAlt} width={800} height={450} loading="lazy" decoding="async" />
        </span>
      ) : (
        <div className="post-card__cover post-card__doodle" aria-hidden="true">
          <Doodle name={doodleFor(post)} size={88} />
        </div>
      )}
      <div className="post-card__body">
        <H className="post-card__title">
          <Link to={`/blog/${post.slug}`} className="card__link">
            {plainText(post.title)}
          </Link>
        </H>
        <p className="post-card__meta">
          {post.author.name} · <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
          {blogPage.minRead(post.readingMinutes)}
        </p>
        <p className="post-card__summary">{post.summary}</p>
        <ul className="chip-list post-card__teams">
          {post.teams.map((t) => (
            <li key={t}>
              <Chip to={`/blog?team=${t}`}>{blogTeamLabel(t)}</Chip>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default PostCard;
