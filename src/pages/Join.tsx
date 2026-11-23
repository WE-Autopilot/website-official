import { joinPage } from "../content/join";
import { site } from "../content/site";
import { Button, Card, Note, PhotoFrame, SectionHeading, SketchBox } from "../components/design-system";
import { JoinSteps } from "../components/JoinSteps";
import { usePageMeta } from "../hooks/usePageMeta";
import "./Join.css";

export function Join() {
  usePageMeta(joinPage.title, joinPage.lead);
  return (
    <div className="page container join">
      <div className="join__intro">
        <div className="join__text">
          <SectionHeading level="h1" title={joinPage.title} lead={joinPage.lead} />
          <Button to={site.discordUrl} size="lg">
            {joinPage.discordButton}
          </Button>
        </div>
        <figure className="join__photo">
          <figcaption>
            <Note arrow="down-right">{joinPage.photoNote}</Note>
          </figcaption>
          <PhotoFrame src={joinPage.photo.src} alt={joinPage.photo.alt} eager sizes="(min-width: 960px) 50vw, 100vw" />
        </figure>
      </div>

      <section aria-labelledby="steps-title">
        <SketchBox fill="lavender" padding="lg">
          <h2 id="steps-title" className="join__steps-title">
            {joinPage.stepsTitle}
          </h2>
          <JoinSteps size="lg" />
        </SketchBox>
      </section>

      <section aria-labelledby="benefits-title">
        <SectionHeading id="benefits-title" title={joinPage.benefitsTitle} />
        <ul className="join__benefits">
          {joinPage.benefits.map((b) => (
            <li key={b.title}>
              <Card title={b.title} doodle={b.doodle}>
                <p>{b.body}</p>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Join;
