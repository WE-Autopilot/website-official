import type { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { isExternal } from "../../lib/text";
import { ui } from "../../content/pages";
import "./Button.css";

export interface ButtonProps {
  children: ReactNode;
  /** Internal path ("/team") or external URL. Omit for a <button>. */
  to?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  /** primary: pen outline + lavender fill. secondary: pen outline only. */
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  /** Arrow after the label. External links get an up-right arrow automatically. */
  arrow?: boolean;
  icon?: ReactNode;
  type?: "button" | "submit";
  className?: string;
  "aria-pressed"?: boolean;
}

export function Button({
  children,
  to,
  onClick,
  variant = "primary",
  size = "md",
  arrow = false,
  icon,
  type = "button",
  className = "",
  ...aria
}: ButtonProps) {
  const mail = to !== undefined && /^(mailto|tel):/.test(to);
  const external = to !== undefined && !mail && isExternal(to);
  const classes = `btn sketch btn--${variant} btn--${size} ${className}`;
  const trailing = external ? (
    <ArrowUpRight className="btn__icon" size={18} aria-hidden="true" />
  ) : arrow ? (
    <ArrowRight className="btn__icon" size={18} aria-hidden="true" />
  ) : null;
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {trailing}
      {external && <span className="visually-hidden"> {ui.opensInNewTab}</span>}
    </>
  );

  if (to === undefined) {
    return (
      <button type={type} className={classes} onClick={onClick} {...aria}>
        {content}
      </button>
    );
  }
  if (mail) {
    return (
      <a className={classes} href={to} onClick={onClick}>
        {content}
      </a>
    );
  }
  if (external) {
    return (
      <a className={classes} href={to} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <Link className={classes} to={to} onClick={onClick}>
      {content}
    </Link>
  );
}

export default Button;
