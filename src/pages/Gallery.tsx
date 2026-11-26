import { useCallback, useState } from "react";
import { galleryEvents, type GalleryEvent } from "../content/gallery";
import { galleryPage } from "../content/pages";
import { SectionHeading } from "../components/design-system";
import { Lightbox } from "../components/Lightbox";
import { resolvePhoto } from "../lib/photos";
import { formatDate } from "../lib/text";
import { usePageMeta } from "../hooks/usePageMeta";
import "./Gallery.css";

const events = [...galleryEvents].sort((a, b) => b.date.localeCompare(a.date));

function EventSection({ event, onOpen }: { event: GalleryEvent; onOpen: (event: GalleryEvent, index: number) => void }) {
  return (
    <section id={event.id} className="gallery-event" aria-labelledby={`${event.id}-title`}>
      <header className="gallery-event__header">
        <h2 id={`${event.id}-title`}>{event.title}</h2>
        <p className="gallery-event__meta">
          <time dateTime={event.date}>{formatDate(event.date)}</time>
          <span className="caption"> · {galleryPage.photoCount(event.photos.length)}</span>
        </p>
        <p className="gallery-event__caption">{event.caption}</p>
      </header>
      <ul className="gallery-grid">
        {event.photos.map((photo, i) => {
          const r = resolvePhoto(photo.src);
          return (
            <li key={photo.src}>
              <button
                type="button"
                className="gallery-grid__button"
                onClick={() => onOpen(event, i)}
                aria-label={galleryPage.openPhoto(photo.alt)}
              >
                <span className="photo-frame">
                  <img
                    src={r.src}
                    srcSet={r.srcSet}
                    sizes="(min-width: 1100px) 25vw, (min-width: 640px) 33vw, 50vw"
                    width={r.width}
                    height={r.height}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function Gallery() {
  usePageMeta(galleryPage.title);
  const [open, setOpen] = useState<{ event: GalleryEvent; index: number } | null>(null);

  const onOpen = useCallback((event: GalleryEvent, index: number) => setOpen({ event, index }), []);
  const onIndexChange = useCallback((index: number) => setOpen((o) => (o ? { ...o, index } : o)), []);
  const onClose = useCallback(() => setOpen(null), []);

  return (
    <div className="page container gallery">
      <SectionHeading level="h1" title={galleryPage.title} note={galleryPage.note} noteArrow="down" />
      {events.map((event) => (
        <EventSection key={event.id} event={event} onOpen={onOpen} />
      ))}
      {open && (
        <Lightbox
          title={open.event.title}
          photos={open.event.photos}
          index={open.index}
          onIndexChange={onIndexChange}
          onClose={onClose}
        />
      )}
    </div>
  );
}

export default Gallery;
