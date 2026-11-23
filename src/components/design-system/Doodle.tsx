import type { DoodleName } from "../../content/types";

const svgDoodles: DoodleName[] = ["pin", "wrench"];

/** One of the hand-drawn doodles in public/brand/doodles/. Decorative. */
export function Doodle({ name, size = 56, className = "" }: { name: DoodleName; size?: number; className?: string }) {
  const ext = svgDoodles.includes(name) ? "svg" : "png";
  return (
    <img
      className={`doodle ${className}`}
      src={`/brand/doodles/${name}.${ext}`}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
    />
  );
}

export default Doodle;
