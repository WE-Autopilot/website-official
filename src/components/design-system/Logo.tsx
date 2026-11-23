import { Link } from "react-router-dom";
import { site } from "../../content/site";
import { ui } from "../../content/pages";

export interface LogoProps {
  /** Width in px. The guide's minimum is 60 px on screen. */
  width?: number;
  /** "black" on white or lavender; "white" on ink or purple. Never on a busy photo. */
  color?: "black" | "white";
  /** Wrap in a link to the home page. */
  linkHome?: boolean;
  className?: string;
}

/** The hand-cut AUTO PILOT logo. */
export function Logo({ width = 112, color = "black", linkHome = false, className = "" }: LogoProps) {
  const w = Math.max(60, width);
  const img = (
    <img
      className={`logo ${linkHome ? "" : className}`}
      src={`/brand/logo-${color}-480.webp`}
      width={w}
      height={Math.round((w * 216) / 480)}
      alt={linkHome ? ui.homeLink : site.name}
      decoding="async"
    />
  );
  if (!linkHome) return img;
  return (
    <Link to="/" className={`logo-link ${className}`}>
      {img}
    </Link>
  );
}

export default Logo;
