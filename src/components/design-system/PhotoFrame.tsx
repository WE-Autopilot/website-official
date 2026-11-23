import type { ReactNode } from "react";
import { resolvePhoto } from "../../lib/photos";

export interface PhotoFrameProps {
  /** Content photo path without the size suffix, e.g. "/photos/events/agm-2025/agm-2025-crowd-group". */
  src: string;
  alt: string;
  /** Shown under the photo. */
  caption?: ReactNode;
  /** "note" = short purple handwriting; "plain" = small grey caption. */
  captionStyle?: "note" | "plain";
  /** Layout width hint for the browser, e.g. "(min-width: 960px) 50vw, 100vw". */
  sizes?: string;
  /** Load straight away (above the fold) instead of lazily. */
  eager?: boolean;
  className?: string;
}

/** A real, unfiltered photo inside a hand-drawn frame. */
export function PhotoFrame({
  src,
  alt,
  caption,
  captionStyle = "plain",
  sizes = "(min-width: 960px) 50vw, 100vw",
  eager = false,
  className = "",
}: PhotoFrameProps) {
  const photo = resolvePhoto(src);
  const img = (
    <span className="photo-frame">
      <img
        src={photo.src}
        srcSet={photo.srcSet}
        sizes={sizes}
        width={photo.width}
        height={photo.height}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    </span>
  );

  if (!caption) return <div className={className}>{img}</div>;

  return (
    <figure className={`photo-figure ${className}`}>
      {img}
      <figcaption className={captionStyle === "note" ? "hand" : "caption"}>{caption}</figcaption>
    </figure>
  );
}

export default PhotoFrame;
