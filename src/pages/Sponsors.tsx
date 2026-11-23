import { sponsors, sponsorsPage } from "../content/sponsors";
import { site } from "../content/site";
import { Button, Card, Note, PhotoFrame, SectionHeading, SketchBox } from "../components/design-system";
import { personById } from "../lib/team";
import { usePageMeta } from "../hooks/usePageMeta";
import { ui } from "../content/pages";
import "./Sponsors.css";

export function Sponsors() {
  usePageMeta(sponsorsPage.title, sponsorsPage.contactBody);
  const contact = personById.get(site.sponsorship.personId);

  return (
    <div className="page container sponsors">
      <SectionHeading level="h1" title={sponsorsPage.title} note={sponsorsPage.note} noteArrow="down" />

      {sponsors.map((s) => (
        <section key={s.id} className="sponsor-feature" aria-labelledby={`sponsor-${s.id}`}>
          <SketchBox padding="lg" className="sponsor-feature__logo">
            <a href={s.url} target="_blank" rel="noopener noreferrer">
              <img src={s.logo.src} width={s.logo.width} height={s.logo.height} alt={`${s.name} ${ui.opensInNewTab}`} />
            </a>
          </SketchBox>
          <div className="sponsor-feature__text">
            <h2 id={`sponsor-${s.id}`}>{sponsorsPage.featuredHeading}</h2>
            <p className="lead">{s.helpsUsBuild}</p>
            {s.thanks.map((t) => (
              <p key={t}>{t}</p>
            ))}
            <p>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {sponsorsPage.visitLabel} {s.name}
                <span className="visually-hidden"> {ui.opensInNewTab}</span>
              </a>
            </p>
          </div>
        </section>
      ))}

      <section aria-labelledby="why-title">
        <SectionHeading id="why-title" title={sponsorsPage.whyTitle} />
        <ul className="sponsors__why">
          {sponsorsPage.why.map((w) => (
            <li key={w.title}>
              <Card title={w.title}>
                <p>{w.body}</p>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section className="sponsors__contact" aria-labelledby="contact-title">
        <figure className="sponsors__photo">
          <PhotoFrame src={sponsorsPage.photo.src} alt={sponsorsPage.photo.alt} sizes="(min-width: 960px) 50vw, 100vw" />
          <figcaption>
            <Note arrow="up-right">{sponsorsPage.photoNote}</Note>
          </figcaption>
        </figure>
        <SketchBox fill="lavender" padding="lg" className="sponsors__contact-box">
          <h2 id="contact-title">{sponsorsPage.contactTitle}</h2>
          <p>{sponsorsPage.contactBody}</p>
          {contact && (
            <p className="sponsors__person">
              <strong>{contact.name}</strong>
              <span>{contact.roles[0]!.title}</span>
              <span>{site.sponsorship.email}</span>
            </p>
          )}
          <Button to={`mailto:${site.sponsorship.email}`} size="lg" className="sponsors__email">
            {sponsorsPage.contactButton}
          </Button>
        </SketchBox>
      </section>
    </div>
  );
}

export default Sponsors;
