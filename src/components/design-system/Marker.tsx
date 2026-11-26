import type { ReactNode } from "react";
import { splitMarked } from "../../lib/text";

/** Lavender highlighter behind a few key words. */
export function Marker({ children }: { children: ReactNode }) {
  return <span className="marker">{children}</span>;
}

/** Renders a content string, putting ==these words== on the marker. */
export function MarkedText({ text }: { text: string }) {
  return (
    <>
      {splitMarked(text).map((part, i) =>
        part.marked ? <Marker key={i}>{part.text}</Marker> : <span key={i}>{part.text}</span>,
      )}
    </>
  );
}

export default Marker;
