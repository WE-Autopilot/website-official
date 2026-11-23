import type { ElementType, HTMLAttributes, ReactNode } from "react";
import "./SketchBox.css";

export interface SketchBoxProps extends HTMLAttributes<HTMLElement> {
  /** Lavender marker fill (details boxes). */
  fill?: "none" | "lavender";
  /** Lavender fill on hover/focus, for clickable boxes. */
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  as?: ElementType;
  children?: ReactNode;
}

/** A box drawn in black pen. The outline wobbles; the content doesn't. */
export function SketchBox({
  fill = "none",
  interactive = false,
  padding = "md",
  as: Tag = "div",
  className = "",
  children,
  ...rest
}: SketchBoxProps) {
  const classes = [
    "sketch",
    "sketch-box",
    `sketch-box--pad-${padding}`,
    fill === "lavender" && "sketch--lavender",
    interactive && "sketch--interactive",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}

export default SketchBox;
