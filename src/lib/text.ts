/** Splits "We build cars that ==drive themselves==" into plain and marked parts. */
export function splitMarked(text: string): { text: string; marked: boolean }[] {
  return text
    .split(/(==[^=]+==)/g)
    .filter((part) => part !== "")
    .map((part) =>
      part.startsWith("==") && part.endsWith("==") && part.length > 4
        ? { text: part.slice(2, -2), marked: true }
        : { text: part, marked: false },
    );
}

/** The title without ==marker== syntax, for document titles and alt text. */
export function plainText(text: string): string {
  return text.replace(/==/g, "");
}

/** If a title has no ==marker==, put the marker on its last word. */
export function withDefaultMarker(title: string): string {
  if (title.includes("==")) return title;
  const match = title.match(/^(.*\s)?(\S+)$/);
  const head = match?.[1] ?? "";
  const last = match?.[2];
  if (!last) return title;
  const trailing = last.match(/[.!?…]+$/)?.[0] ?? "";
  const word = trailing ? last.slice(0, -trailing.length) : last;
  return `${head}==${word}==${trailing}`;
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0]!.toUpperCase())
    .slice(0, 2)
    .join("");
}

const dateFormat = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

/** "2025-09-23" → "September 23, 2025" */
export function formatDate(iso: string): string {
  return dateFormat.format(new Date(`${iso}T00:00:00Z`));
}

export const isExternal = (href: string) => !href.startsWith("/") && !href.startsWith("#");
