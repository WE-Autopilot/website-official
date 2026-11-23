import { joinSteps } from "../content/join";
import { StepCircle } from "./design-system";
import "./JoinSteps.css";

/** The three real steps to join, with hand-drawn numbered circles. */
export function JoinSteps({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <ol className={`join-steps join-steps--${size}`}>
      {joinSteps.map((step, i) => (
        <li key={step.title} className="join-steps__item">
          <StepCircle n={i + 1} size={size === "lg" ? "lg" : "md"} />
          <div>
            <h3 className="join-steps__title">{step.title}</h3>
            <p className="join-steps__body">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default JoinSteps;
