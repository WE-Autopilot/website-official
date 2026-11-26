import { Link } from "react-router-dom";
import type { GroupId, Person } from "../content/team";
import { teamPage, ui } from "../content/pages";
import { Doodle } from "./design-system";
import { groupById, postsBy, roleTitles } from "../lib/team";
import { initials } from "../lib/text";
import "./PersonCard.css";

export interface PersonCardProps {
  person: Person;
  /** When the Team page is filtered to one group, show only that group's title. */
  group?: GroupId;
}

/**
 * A team member in a drawn frame. Until `photo` is set in team.ts, the frame
 * holds a placeholder: their initials and their group's doodle.
 */
export function PersonCard({ person, group }: PersonCardProps) {
  const doodleGroup = group ?? person.roles[0]!.group;
  const doodle = groupById.get(doodleGroup)!.doodle;
  const posts = postsBy(person.id);

  return (
    <article id={person.id} className="person-card">
      {person.photo ? (
        <span className="photo-frame person-card__frame">
          <img src={person.photo} alt={person.name} width={600} height={750} loading="lazy" decoding="async" />
        </span>
      ) : (
        <div className="person-card__frame person-placeholder sketch" aria-hidden="true">
          <span className="person-placeholder__initials">{initials(person.name)}</span>
          <Doodle name={doodle} size={72} className="person-placeholder__doodle" />
        </div>
      )}
      <h3 className="person-card__name">{person.name}</h3>
      <p className="person-card__role">{roleTitles(person, group)}</p>
      {(posts.length > 0 || person.linkedin) && (
        <p className="person-card__links">
          {posts.length > 0 && (
            <Link to={`/blog?author=${person.id}`}>
              {teamPage.postsLink} ({posts.length})
            </Link>
          )}
          {person.linkedin && (
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
              {teamPage.linkedinLabel}
              <span className="visually-hidden"> {ui.opensInNewTab}</span>
            </a>
          )}
        </p>
      )}
    </article>
  );
}

export default PersonCard;
