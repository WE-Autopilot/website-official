/**
 * WEAP design tokens: white page, black pen, lavender marker, purple notes.
 * From docs/design/AutoPilot-Design-Guide.pptx (slides 5–7).
 *
 * Keep in sync with the custom properties at the top of design-system.css.
 */

export const colors = {
  /** Text, pen lines, the logo. ~25% of a design. */
  ink: "#191919",
  /** The only accent: links, notes, labels, arrows, focus rings. ~5%. */
  purple: "#7C5CDB",
  /** The marker: fills, highlights, details boxes. The only fill. ~10%. */
  lavender: "#EAE4FA",
  /** Quiet lines and dividers. Never text. */
  lilac: "#BEAEED",
  /** The page. ~60%. */
  paper: "#FFFFFF",
  /** Small captions only. */
  grey: "#5D5A66",
} as const;

/**
 * Contrast pairs from slide 6 (WCAG ratio). "large" means 24 px, or 19 px bold.
 */
export const contrastPairs = [
  { fg: "ink", bg: "paper", ratio: 17.6, use: "any text" },
  { fg: "purple", bg: "paper", ratio: 4.8, use: "any text" },
  { fg: "paper", bg: "purple", ratio: 4.8, use: "any text" },
  { fg: "ink", bg: "lavender", ratio: 14.2, use: "any text" },
  { fg: "grey", bg: "paper", ratio: 6.7, use: "any text" },
  { fg: "purple", bg: "lavender", ratio: 3.9, use: "large text only" },
  { fg: "purple", bg: "ink", ratio: 3.7, use: "large text only" },
  { fg: "lilac", bg: "paper", ratio: 2.0, use: "never text" },
] as const;

export const fonts = {
  /** Titles (ExtraBold 800, sentence case), body (400/500), labels (700). */
  sans: "'Montserrat', system-ui, sans-serif",
  /** Short purple notes only: 12 words or fewer, never paragraphs, dates, prices or buttons. */
  hand: "'Kalam', cursive",
  weights: { regular: 400, medium: 500, bold: 700, extrabold: 800 },
} as const;

/** Fluid type sizes. Body text never drops below 16 px. */
export const fontSizes = {
  small: "0.9375rem",
  body: "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)",
  lead: "clamp(1.125rem, 1.02rem + 0.5vw, 1.375rem)",
  note: "clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)",
  h3: "clamp(1.1875rem, 1.1rem + 0.45vw, 1.5rem)",
  h2: "clamp(1.75rem, 1.35rem + 1.9vw, 2.75rem)",
  h1: "clamp(2.25rem, 1.5rem + 3.6vw, 4.5rem)",
  stat: "clamp(2.25rem, 1.8rem + 2vw, 3.5rem)",
} as const;

export const pen = {
  /** Outline width for boxes, cards and buttons (guide: 2–3 px). */
  line: "2.5px",
  /** Photo frames. */
  frame: "3px",
} as const;

export const layout = {
  /** ~6% clear margin on each side (slide 14). */
  gutter: "max(20px, 6vw)",
  contentMax: "80rem",
  readingWidth: "68ch",
  sectionGap: "clamp(4rem, 3rem + 5vw, 7.5rem)",
} as const;
