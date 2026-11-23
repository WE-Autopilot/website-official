import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { MarkedText } from "./Marker";
import { Note, type ArrowDirection } from "./Note";
import "./SectionHeading.css";

export interface SectionHeadingProps {
  /** Sentence case. ==Words== go on the marker. */
  title: string;
  /** h1 for a page title, h2 for a section. */
  level?: "h1" | "h2";
  id?: string;
  /** A short handwritten note (12 words or fewer). */
  note?: string;
  noteArrow?: ArrowDirection;
  /** A paragraph under the title. */
  lead?: ReactNode;
  /** A link on the right, like "All posts". */
  action?: { label: string; to: string };
}

/** Title top-left, in the same place on every page and section. */
export function SectionHeading({ title, level = "h2", id, note, noteArrow, lead, action }: SectionHeadingProps) {
  const H = level;
  return (
    <header className={`section-heading section-heading--${level}`}>
      <div className="section-heading__main">
        <H id={id}>
          <MarkedText text={title} />
        </H>
        {note && <Note arrow={noteArrow}>{note}</Note>}
        {lead && <div className="lead section-heading__lead">{lead}</div>}
      </div>
      {action && (
        <Link className="section-heading__action" to={action.to}>
          {action.label}
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      )}
    </header>
  );
}

export default SectionHeading;
