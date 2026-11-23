import "./StepCircle.css";

/**
 * A hand-drawn circle with a number. Only for real steps (Join, the road map),
 * usually as the marker of an <ol> item, so the number itself is hidden from
 * screen readers (the list already announces it).
 */
export function StepCircle({ n, size = "md", fill = "paper" }: { n: number; size?: "sm" | "md" | "lg"; fill?: "paper" | "lavender" }) {
  return (
    <span className={`step-circle step-circle--${size} step-circle--${fill}`} aria-hidden="true">
      <svg viewBox="0 0 44 44" focusable="false">
        <path d="M23 3.5 C34 3 41.5 11.5 40.5 23 C39.5 34 30.5 41 20.5 40.5 C9.5 40 3 31 3.5 21 C4 11 11.5 4 24.5 4.5" />
      </svg>
      <span className="step-circle__n">{n}</span>
    </span>
  );
}

export default StepCircle;
