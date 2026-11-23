import { Link } from "react-router-dom";
import { posts } from "virtual:blog";
import { home } from "../content/home";
import { site } from "../content/site";
import { subteams } from "../content/subteams";
import { sponsors } from "../content/sponsors";
import {
  Button,
  Card,
  DetectionLabel,
  Doodle,
  MarkedText,
  Note,
  PenArrow,
  PhotoFrame,
  SectionHeading,
  SketchBox,
  StepCircle,
} from "../components/design-system";
import { JoinSteps } from "../components/JoinSteps";
import { PostCard } from "../components/PostCard";
import { subteamBySlug } from "../lib/team";
import { usePageMeta } from "../hooks/usePageMeta";
import "./Home.css";

function Hero() {
  const { hero, currentProject } = home;
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero__text">
        <h1 id="hero-title">
          <MarkedText text={hero.title} />
        </h1>
        <p className="lead">{hero.lead}</p>
        <div className="hero__ctas">
          <Button to={site.discordUrl} size="lg">
            {hero.primaryButton}
          </Button>
          <Button to={hero.secondaryButton.to} variant="secondary" size="lg" arrow>
            {hero.secondaryButton.label}
          </Button>
        </div>
      </div>
      <div className="hero__art">
        <Note arrow="down-right" className="hero__note">
          {currentProject.note}
        </Note>
        <DetectionLabel label={currentProject.detectionLabel}>
          <img
            src={currentProject.image.src}
            width={currentProject.image.width}
            height={currentProject.image.height}
            alt={currentProject.image.alt}
            fetchPriority="high"
          />
        </DetectionLabel>
      </div>
    </section>
  );
}

function Flow() {
  const { flow } = home;
  return (
    <section className="section container" aria-labelledby="flow-title">
      <SectionHeading id="flow-title" title={flow.title} />
      <ol className="flow">
        {flow.steps.map((step, i) => {
          const owners = (Array.isArray(step.subteam) ? step.subteam : [step.subteam]).map((s) => subteamBySlug.get(s)!);
          return (
            <li key={step.title} className="flow__step">
              <SketchBox className="flow__box" padding="sm">
                <Doodle name={step.doodle} size={48} />
                <h3 className="flow__title">{step.title}</h3>
                <p className="flow__body">{step.body}</p>
                <p className="flow__owner caption">
                  {flow.ownedBy}:{" "}
                  {owners.map((t, j) => (
                    <span key={t.slug}>
                      {j > 0 && " + "}
                      <Link to={`/teams/${t.slug}`}>{t.name}</Link>
                    </span>
                  ))}
                </p>
              </SketchBox>
              {i < flow.steps.length - 1 && <PenArrow direction="right" className="flow__arrow" />}
            </li>
          );
        })}
      </ol>
      <Note arrow="up-left" className="flow__loop">
        {flow.note}
      </Note>
    </section>
  );
}

function Road() {
  const { road } = home;
  return (
    <section className="section container" aria-labelledby="road-title">
      <SectionHeading id="road-title" title={road.title} />
      <ol className="road">
        {road.steps.map((step, i) => (
          <li key={step.title} className={`road__step ${i === 1 ? "is-now" : ""}`}>
            {i === 1 && (
              <Note arrow="down-left" className="road__note" as="span">
                {road.note}
              </Note>
            )}
            <StepCircle n={i + 1} size="lg" fill={i === 1 ? "lavender" : "paper"} />
            <p className="road__when">{step.when}</p>
            <h3 className="road__title">{step.title}</h3>
            <p className="road__body">{step.body}</p>
          </li>
        ))}
      </ol>
      <ul className="stats">
        {road.stats.map((s) => (
          <li key={s.label}>
            <SketchBox className="stat" padding="sm">
              <span className="stat__value">{s.value}</span>
              <span className="stat__label">{s.label}</span>
            </SketchBox>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Highlights() {
  const { highlights } = home;
  return (
    <section className="section container" aria-labelledby="highlights-title">
      <SectionHeading
        id="highlights-title"
        title={highlights.title}
        action={{ label: highlights.galleryLink, to: "/gallery" }}
      />
      <ul className="highlights">
        {highlights.photos.map((p) => (
          <li key={p.src}>
            <PhotoFrame
              src={p.src}
              alt={p.alt}
              caption={p.caption}
              captionStyle="note"
              sizes="(min-width: 1100px) 25vw, (min-width: 560px) 50vw, 100vw"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

function LatestPosts() {
  const latest = posts.slice(0, 3);
  if (latest.length === 0) return null;
  return (
    <section className="section container" aria-labelledby="latest-title">
      <SectionHeading
        id="latest-title"
        title={home.latestPosts.title}
        action={{ label: home.latestPosts.allPostsLink, to: "/blog" }}
      />
      <ul className="post-grid">
        {latest.map((p) => (
          <li key={p.slug}>
            <PostCard post={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function PickATeam() {
  const { pickATeam } = home;
  return (
    <section className="section container" aria-labelledby="teams-title">
      <SectionHeading id="teams-title" title={pickATeam.title} note={pickATeam.note} />
      <ul className="team-cards">
        {subteams.map((t) => (
          <li key={t.slug}>
            <Card title={t.name} doodle={t.doodle} to={`/teams/${t.slug}`} linkLabel={pickATeam.cardLink}>
              <p>{t.summary}</p>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SponsorStrip() {
  const { sponsorStrip } = home;
  return (
    <section className="container" aria-label={sponsorStrip.lead}>
      <div className="sponsor-strip">
        <p className="sponsor-strip__lead">{sponsorStrip.lead}</p>
        <ul className="sponsor-strip__logos">
          {sponsors.map((s) => (
            <li key={s.id}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="sponsor-strip__sponsor">
                <img src={s.logo.src} width={s.logo.width} height={s.logo.height} alt="" loading="lazy" />
                <span>{s.name}</span>
              </a>
            </li>
          ))}
        </ul>
        <Link to={sponsorStrip.link.to} className="sponsor-strip__link">
          {sponsorStrip.link.label} →
        </Link>
      </div>
    </section>
  );
}

function JoinCta() {
  const { joinCta } = home;
  return (
    <section className="section container" aria-labelledby="join-title">
      <Note arrow="down" className="join-cta__note">
        {joinCta.note}
      </Note>
      <SketchBox fill="lavender" padding="lg" className="join-cta">
        <div className="join-cta__intro">
          <h2 id="join-title">{joinCta.title}</h2>
          <Button to={site.discordUrl} size="lg" className="join-cta__button">
            {joinCta.button}
          </Button>
        </div>
        <JoinSteps />
      </SketchBox>
    </section>
  );
}

export function Home() {
  usePageMeta(undefined);
  return (
    <div className="home">
      <Hero />
      <Flow />
      <Road />
      <Highlights />
      <LatestPosts />
      <PickATeam />
      <SponsorStrip />
      <JoinCta />
    </div>
  );
}

export default Home;
