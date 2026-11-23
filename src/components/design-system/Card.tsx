import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { DoodleName } from "../../content/types";
import { Doodle } from "./Doodle";
import "./Card.css";

export interface CardProps {
  title: ReactNode;
  children?: ReactNode;
  doodle?: DoodleName;
  /** Makes the whole card a link to this path. */
  to?: string;
  /** Text shown at the bottom of a linked card. */
  linkLabel?: string;
  headingLevel?: "h2" | "h3" | "h4";
  fill?: "none" | "lavender";
  /** Extra content under the body (chips, meta). */
  footer?: ReactNode;
  className?: string;
}

/**
 * A pen-outlined card. Linked cards fill with lavender on hover and focus;
 * the title is the link, stretched over the whole card.
 */
export function Card({
  title,
  children,
  doodle,
  to,
  linkLabel,
  headingLevel: H = "h3",
  fill = "none",
  footer,
  className = "",
}: CardProps) {
  const classes = [
    "card",
    "sketch",
    fill === "lavender" && "sketch--lavender",
    to && "sketch--interactive card--link",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={classes}>
      {doodle && <Doodle name={doodle} size={56} className="card__doodle" />}
      <H className="card__title">
        {to ? (
          <Link to={to} className="card__link">
            {title}
          </Link>
        ) : (
          title
        )}
      </H>
      {children && <div className="card__body">{children}</div>}
      {footer && <div className="card__footer">{footer}</div>}
      {to && linkLabel && (
        <span className="card__more" aria-hidden="true">
          {linkLabel} <ArrowRight size={16} />
        </span>
      )}
    </article>
  );
}

export default Card;
