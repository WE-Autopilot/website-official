/**
 * Shapes shared by the content files. You shouldn't need to edit this file
 * to update the site; see README.md in this folder.
 */

/** The hand-drawn doodles in public/brand/doodles/. */
export type DoodleName = "pencil" | "eye" | "phone" | "check" | "wheel" | "pin" | "wrench";

/**
 * A photo from public/photos/. `src` is the path without the size suffix:
 * "/photos/events/agm-2025/agm-2025-lecture-hall" means the files
 * agm-2025-lecture-hall-800.webp and agm-2025-lecture-hall-1600.webp.
 * Run `npm run images` to make those files from a JPEG.
 */
export interface Photo {
  src: string;
  /** What's in the photo, for people who can't see it. Repeat any words in it. */
  alt: string;
}

/** A link. `to` starting with "/" stays on the site; anything else opens a new tab. */
export interface LinkItem {
  label: string;
  to: string;
}
