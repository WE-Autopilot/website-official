import dimensions from "../content/photo-dimensions.json";

const dims: Record<string, number[] | undefined> = dimensions;

export interface ResolvedPhoto {
  src: string;
  srcSet: string;
  /** Full-size URL, for the lightbox. */
  large: string;
  width: number;
  height: number;
}

/**
 * Turns a content photo path ("/photos/events/agm-2025/agm-2025-crowd-group")
 * into the two WebP sizes made by `npm run images`, with its real size so
 * the browser can save space for it.
 */
export function resolvePhoto(base: string): ResolvedPhoto {
  const size = dims[base];
  if (!size && import.meta.env.DEV) {
    console.warn(`[photos] No size for ${base}. Run \`npm run images\` or check the path.`);
  }
  const [width = 1600, height = 1200] = size ?? [];
  return {
    src: `${base}-800.webp`,
    srcSet: `${base}-800.webp 800w, ${base}-1600.webp 1600w`,
    large: `${base}-1600.webp`,
    width,
    height,
  };
}
