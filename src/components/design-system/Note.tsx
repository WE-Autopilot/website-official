import type { ReactNode } from "react";
import { useDrawIn } from "../../hooks/useInView";
import "./Note.css";

export type ArrowDirection =
  | "right"
  | "left"
  | "down"
  | "up"
  | "down-right"
  | "down-left"
  | "up-right"
  | "up-left";

/** A hand-drawn curved arrow in purple. Points right before rotation. */
export function PenArrow({ direction = "right", className = "" }: { direction?: ArrowDirection; className?: string }) {
  const { ref, pending } = useDrawIn<SVGSVGElement>();
  return (
    <svg
      ref={ref}
      className={`pen-arrow pen-arrow--${direction} draw ${pending ? "is-pending" : ""} ${className}`}
      viewBox="0 0 64 40"
      width="64"
      height="40"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 30 C 16 10, 38 5, 56 17" pathLength={1} />
      <path d="M45 9.5 L 57 17.5 L 44.5 23" pathLength={1} />
    </svg>
  );
}

export interface NoteProps {
  children: ReactNode;
  /** Where the arrow points. Omit for a note without an arrow. */
  arrow?: ArrowDirection;
  className?: string;
  as?: "p" | "span" | "div";
}

/**
 * A short handwritten note in purple (Kalam). 12 words or fewer, pointing at
 * something real. Never for paragraphs, dates, prices or buttons.
 */
export function Note({ children, arrow, className = "", as: Tag = "p" }: NoteProps) {
  return (
    <Tag className={`note ${arrow ? `note--${arrow}` : ""} ${className}`}>
      <span className="note__text">{children}</span>
      {arrow && <PenArrow direction={arrow} />}
    </Tag>
  );
}

export default Note;
