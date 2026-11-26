import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "../content/types";
import { galleryPage } from "../content/pages";
import { resolvePhoto } from "../lib/photos";
import { useFocusTrap } from "../hooks/useFocusTrap";
import "./Lightbox.css";

export interface LightboxProps {
  title: string;
  photos: Photo[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}

/**
 * Full-screen white sheet showing one photo at a time. Arrow keys move
 * between photos, Escape closes, focus is trapped while open and goes back
 * to the photo that opened it. The alt text is shown as the caption.
 */
export function Lightbox({ title, photos, index, onIndexChange, onClose }: LightboxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useFocusTrap(ref, true, onClose, closeRef);

  const count = photos.length;
  const photo = photos[index]!;
  const resolved = resolvePhoto(photo.src);
  const prev = () => onIndexChange((index - 1 + count) % count);
  const next = () => onIndexChange((index + 1) % count);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onIndexChange((index - 1 + count) % count);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onIndexChange((index + 1) % count);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, count, onIndexChange]);

  // Warm the cache for the neighbours.
  useEffect(() => {
    for (const i of [index - 1, index + 1]) {
      const p = photos[(i + count) % count];
      if (p) new Image().src = resolvePhoto(p.src).large;
    }
  }, [index, count, photos]);

  return (
    <div ref={ref} className="lightbox" role="dialog" aria-modal="true" aria-label={title}>
      <div className="lightbox__bar container">
        <p className="lightbox__title">
          <strong>{title}</strong>
          <span className="caption" aria-live="polite">
            {galleryPage.lightbox.counter(index + 1, count)}
          </span>
        </p>
        <button ref={closeRef} type="button" className="icon-btn" onClick={onClose} aria-label={galleryPage.lightbox.close}>
          <X size={28} aria-hidden="true" />
        </button>
      </div>

      <figure className="lightbox__stage container">
        <span className="photo-frame lightbox__frame">
          <img
            key={resolved.large}
            src={resolved.large}
            srcSet={resolved.srcSet}
            sizes="100vw"
            width={resolved.width}
            height={resolved.height}
            alt={photo.alt}
          />
        </span>
        <figcaption className="lightbox__caption">{photo.alt}</figcaption>
      </figure>

      {count > 1 && (
        <div className="lightbox__nav container">
          <button type="button" className="btn sketch btn--secondary" onClick={prev}>
            <ChevronLeft size={20} aria-hidden="true" />
            <span>{galleryPage.lightbox.previous}</span>
          </button>
          <button type="button" className="btn sketch btn--secondary" onClick={next}>
            <span>{galleryPage.lightbox.next}</span>
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Lightbox;
