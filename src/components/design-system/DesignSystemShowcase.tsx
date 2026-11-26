/**
 * `npm run design` → /design-system. Every token and component on one page.
 * Only loaded in design mode; never part of a production build.
 */
import { useState } from "react";
import { colors, contrastPairs, fontSizes } from "../../styles/tokens";
import type { DoodleName } from "../../content/types";
import {
  Button,
  Card,
  Chip,
  DetectionLabel,
  Doodle,
  FilterPills,
  Logo,
  MarkedText,
  Marker,
  Note,
  PhotoFrame,
  SectionHeading,
  SketchBox,
  StepCircle,
  type ArrowDirection,
} from "./index";
import "./DesignSystemShowcase.css";

const doodles: DoodleName[] = ["eye", "pin", "wheel", "wrench", "phone", "check", "pencil"];
const arrows: ArrowDirection[] = ["right", "left", "down", "up", "down-right", "down-left", "up-right", "up-left"];

export function DesignSystemShowcase() {
  const [pill, setPill] = useState("all");

  return (
    <div className="page container showcase">
      <SectionHeading
        level="h1"
        title="Design ==system=="
        note="white page, black pen, lavender marker"
        noteArrow="down"
        lead="Tokens and components from the AutoPilot design guide. Use two or three sketch ingredients per section, never all six."
      />

      <section>
        <h2>Colour</h2>
        <ul className="showcase__swatches">
          {Object.entries(colors).map(([name, hex]) => (
            <li key={name}>
              <SketchBox padding="none" className="showcase__swatch" style={{ ["--sketch-fill" as string]: hex }} />
              <strong>{name}</strong>
              <span className="caption">{hex}</span>
            </li>
          ))}
        </ul>
        <h3 className="showcase__h3">Contrast pairs (slide 6)</h3>
        <ul className="showcase__pairs">
          {contrastPairs.map((p) => (
            <li
              key={`${p.fg}-${p.bg}`}
              style={{ background: colors[p.bg], color: colors[p.fg], borderColor: colors.lilac }}
            >
              <span className="showcase__aa">Aa</span>
              <span>
                {p.fg} on {p.bg} · {p.ratio}:1 · {p.use}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Type</h2>
        <div className="showcase__type">
          {(["h1", "h2", "h3"] as const).map((k) => (
            <p key={k} style={{ fontSize: fontSizes[k], fontWeight: k === "h3" ? 700 : 800, lineHeight: 1.15 }}>
              Watch a golf cart drive itself <span className="caption">({k})</span>
            </p>
          ))}
          <p className="lead">Lead: Thursday, Nov 27 · 6 pm · Engineering atrium</p>
          <p>Body: Montserrat Regular for anything people must read exactly. At least 16 px.</p>
          <p className="caption">Caption: grey, small captions only.</p>
          <Note>bring a friend</Note>
        </div>
      </section>

      <section>
        <h2>Logo</h2>
        <div className="showcase__logos">
          <SketchBox padding="lg">
            <Logo width={160} />
          </SketchBox>
          <div className="showcase__logo-ink">
            <Logo width={160} color="white" />
          </div>
          <div className="showcase__logo-purple">
            <Logo width={160} color="white" />
          </div>
          <SketchBox fill="lavender" padding="lg">
            <Logo width={160} />
          </SketchBox>
        </div>
      </section>

      <section>
        <h2>The six ingredients</h2>
        <div className="showcase__grid">
          <SketchBox>
            <h3>1. Pen outlines</h3>
            <p>Wobbly border, crisp text. SketchBox, Card and Button all use it.</p>
          </SketchBox>
          <SketchBox>
            <h3>
              2. <Marker>Lavender marker</Marker>
            </h3>
            <p>
              <MarkedText text="Wrap ==key words== in double equals in content files." />
            </p>
          </SketchBox>
          <SketchBox>
            <h3>3. Handwritten notes</h3>
            <div className="showcase__arrows">
              {arrows.map((a) => (
                <Note key={a} arrow={a}>
                  {a}
                </Note>
              ))}
            </div>
          </SketchBox>
          <SketchBox>
            <h3>4. Numbered circles</h3>
            <ol className="showcase__steps">
              <li>
                <StepCircle n={1} /> scan the code
              </li>
              <li>
                <StepCircle n={2} fill="lavender" /> pick a team
              </li>
              <li>
                <StepCircle n={3} size="lg" /> come to a meeting
              </li>
            </ol>
          </SketchBox>
          <SketchBox>
            <h3>5. Framed photos</h3>
            <PhotoFrame
              src="/photos/events/agm-2025/agm-2025-members-qr"
              alt="Three members smiling in front of the sign-up QR code slide."
              caption="close-ups: two or three people"
              captionStyle="note"
            />
          </SketchBox>
          <SketchBox>
            <h3>6. Detection labels</h3>
            <DetectionLabel label="crew_25_26 0.99">
              <PhotoFrame
                src="/photos/events/agm-2025/agm-2025-crowd-group"
                alt="Everyone at AGM 2025 lined up for a group photo."
              />
            </DetectionLabel>
          </SketchBox>
        </div>
      </section>

      <section>
        <h2>Components</h2>
        <div className="showcase__row">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button arrow to="/team">
            Internal link
          </Button>
          <Button to="https://github.com/WE-Autopilot" variant="secondary">
            External link
          </Button>
        </div>
        <div className="showcase__row">
          <Chip>ROS 2</Chip>
          <Chip>PyTorch</Chip>
          <Chip to="/blog?team=perception">Perception</Chip>
        </div>
        <FilterPills
          label="Example filter"
          value={pill}
          onChange={setPill}
          options={[
            { id: "all", label: "All", count: 9 },
            { id: "perception", label: "Perception", count: 1 },
            { id: "build", label: "Build", count: 2 },
          ]}
        />
        <div className="showcase__grid">
          <Card title="Card" doodle="eye">
            <p>A pen-outlined card with a doodle.</p>
          </Card>
          <Card title="Linked card" doodle="wrench" to="/teams/build" linkLabel="Visit the team">
            <p>Hover or focus fills it with lavender.</p>
          </Card>
          <Card title="Details box" fill="lavender">
            <p>Thu, Nov 27 · 6 pm. Small text on lavender is always ink.</p>
          </Card>
        </div>
        <h3 className="showcase__h3">Doodles</h3>
        <ul className="showcase__doodles">
          {doodles.map((d) => (
            <li key={d}>
              <Doodle name={d} size={72} />
              <span className="caption">{d}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default DesignSystemShowcase;
