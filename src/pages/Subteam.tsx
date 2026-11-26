import { Link, useParams } from "react-router-dom";
import { subteams } from "../content/subteams";
import { subteamPage } from "../content/pages";
import { site } from "../content/site";
import {
  Button,
  Card,
  Chip,
  Doodle,
  MarkedText,
  Note,
  PhotoFrame,
  SectionHeading,
  SketchBox,
  StepCircle,
} from "../components/design-system";
import { PostCard } from "../components/PostCard";
import { peopleInGroup, postsForTeam, roleTitles, subteamBySlug } from "../lib/team";
import { initials } from "../lib/text";
import { usePageMeta } from "../hooks/usePageMeta";
import "./Subteam.css";

function NotFound() {
  return (
    <div className="page container">
      <SectionHeading level="h1" title={subteamPage.notFound.title} note={subteamPage.notFound.note} lead={subteamPage.notFound.body} />
      <ul className="subteam-others">
        {subteams.map((t) => (
          <li key={t.slug}>
            <Card title={t.name} doodle={t.doodle} to={`/teams/${t.slug}`} headingLevel="h2">
              <p>{t.summary}</p>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Subteam() {
  const { slug = "" } = useParams();
  const team = subteamBySlug.get(slug);
  usePageMeta(team?.name ?? subteamPage.notFound.title, team?.summary);
  if (!team) return <NotFound />;

  const leads = peopleInGroup(team.group);
  const posts = postsForTeam(team.slug).slice(0, 3);
  const others = subteams.filter((t) => t.slug !== team.slug);

  return (
    <div className="page container subteam">
      <header className="subteam__header">
        <Doodle name={team.doodle} size={96} className="subteam__doodle" />
        <div className="subteam__heading">
          <h1>
            <MarkedText text={team.name} />
          </h1>
          <Note arrow="left">{team.note}</Note>
        </div>
        <p className="lead subteam__lead">{team.description}</p>
      </header>

      <div className="subteam__grid">
        <section aria-labelledby="leads-title" className="subteam__leads">
          <h2 id="leads-title" className="subteam__h2">
            {subteamPage.leadsHeading}
          </h2>
          <ul className="lead-list">
            {leads.map((p) => (
              <li key={p.id}>
                <Link to={`/team#${p.id}`} className="lead-list__person">
                  {p.photo ? (
                    <img src={p.photo} alt="" width={56} height={70} className="lead-list__photo" />
                  ) : (
                    <span className="lead-list__initials sketch sketch--lavender" aria-hidden="true">
                      {initials(p.name)}
                    </span>
                  )}
                  <span>
                    <strong>{p.name}</strong>
                    <span className="lead-list__role">{roleTitles(p, team.group)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Button to={site.joinButton.to} arrow className="subteam__join">
            {subteamPage.joinButton}
          </Button>
        </section>

        <div className="subteam__photos">
          {team.photos.map((p, i) => (
            <PhotoFrame key={p.src} src={p.src} alt={p.alt} eager={i === 0} sizes="(min-width: 960px) 55vw, 100vw" />
          ))}
        </div>
      </div>

      <section aria-labelledby="focus-title">
        <h2 id="focus-title" className="subteam__h2">
          {subteamPage.focusHeading}
        </h2>
        <ul className="focus-list">
          {team.focusAreas.map((f) => (
            <li key={f.label}>
              <SketchBox padding="sm" className="focus-list__item">
                <h3>{f.label}</h3>
                <p>{f.description}</p>
              </SketchBox>
            </li>
          ))}
        </ul>
      </section>

      <div className="subteam__grid subteam__grid--even">
        <section aria-labelledby="milestones-title">
          <h2 id="milestones-title" className="subteam__h2">
            {subteamPage.milestonesHeading}
          </h2>
          <ol className="timeline">
            {team.milestones.map((m, i) => (
              <li key={m.label} className={`timeline__item timeline__item--${m.status}`}>
                <StepCircle n={i + 1} size="sm" fill={m.status === "in-progress" ? "lavender" : "paper"} />
                <div>
                  <p className="timeline__label">{m.label}</p>
                  <p className="timeline__status caption">{subteamPage.status[m.status]}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="tech-title">
          <h2 id="tech-title" className="subteam__h2">
            {subteamPage.techHeading}
          </h2>
          <dl className="tech">
            {team.techStack.map((group) => (
              <div key={group.category} className="tech__group">
                <dt>{group.category}</dt>
                <dd>
                  <ul className="chip-list">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Chip>{item}</Chip>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      {posts.length > 0 && (
        <section aria-labelledby="team-posts-title">
          <SectionHeading
            id="team-posts-title"
            title={subteamPage.postsHeading}
            action={{ label: subteamPage.allPostsLink, to: `/blog?team=${team.slug}` }}
          />
          <ul className="post-grid">
            {posts.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav aria-labelledby="others-title">
        <h2 id="others-title" className="subteam__h2">
          {subteamPage.otherTeamsHeading}
        </h2>
        <ul className="subteam-others">
          {others.map((t) => (
            <li key={t.slug}>
              <Card title={t.name} doodle={t.doodle} to={`/teams/${t.slug}`} headingLevel="h3">
                <p>{t.summary}</p>
              </Card>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Subteam;
