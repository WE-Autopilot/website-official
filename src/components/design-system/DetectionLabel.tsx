import type { ReactNode } from "react";
import "./DetectionLabel.css";

/**
 * A purple detection box with a label chip, like the title slide
 * ("crew_25_26 0.99"). Use sparingly: the hero and maybe one photo.
 * The chip is decorative, so screen readers skip it.
 */
export function DetectionLabel({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={`detect ${className}`}>
      <span className="detect__chip" aria-hidden="true">
        {label}
      </span>
      {children}
    </div>
  );
}

export default DetectionLabel;
