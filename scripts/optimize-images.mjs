#!/usr/bin/env node
/**
 * Converts photos to small WebP files for the site.
 *
 *   npm run images
 *     Event photos. Reads weap-photos/events/<event>/<name>.jpg (or --in <dir>)
 *     and writes public/photos/events/<event>/<name>-800.webp and -1600.webp.
 *     Also records each photo's size in src/content/photo-dimensions.json so
 *     the site can reserve space for it before it loads.
 *
 *   npm run images -- --headshots --in <folder of headshots>
 *     600 px wide, cropped to 4:5 around the top centre, written to
 *     public/photos/headshots/<name>.webp. Rename the files to the person's
 *     id from src/content/team.ts first (for example aly-ashour.jpg).
 *
 *   npm run images -- --blog <post-slug> --in <folder of images>
 *     Up to 1600 px wide, written to public/blog/<post-slug>/<name>.webp.
 *     Warns if a file ends up over 300 KB.
 *
 * Metadata (GPS, camera info) is always stripped. Photos are rotated upright
 * from their EXIF orientation first.
 */
import { readdir, mkdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const QUALITY = 78;
const EVENT_WIDTHS = [800, 1600];
const IMAGE_EXT = /\.(jpe?g|png|webp|tiff?|heic)$/i;
const DIMENSIONS_FILE = path.join(root, "src/content/photo-dimensions.json");

function parseArgs(argv) {
  const args = { mode: "events", in: null, slug: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--headshots") args.mode = "headshots";
    else if (a === "--blog") {
      args.mode = "blog";
      args.slug = argv[++i];
    } else if (a === "--in") args.in = argv[++i];
    else if (a === "--help" || a === "-h") args.mode = "help";
    else throw new Error(`Unknown option: ${a}`);
  }
  return args;
}

async function listImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && IMAGE_EXT.test(e.name) && !e.name.startsWith("."))
    .map((e) => path.join(dir, e.name));
}

const baseName = (file) =>
  path
    .basename(file)
    .replace(IMAGE_EXT, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function events(inDir) {
  const outRoot = path.join(root, "public/photos/events");
  let dims = {};
  try {
    dims = JSON.parse(await readFile(DIMENSIONS_FILE, "utf8"));
  } catch {
    /* first run */
  }

  const eventDirs = (await readdir(inDir, { withFileTypes: true })).filter((e) => e.isDirectory());
  if (eventDirs.length === 0) throw new Error(`No event folders found in ${inDir}`);

  let count = 0;
  for (const ev of eventDirs) {
    const files = await listImages(path.join(inDir, ev.name));
    const outDir = path.join(outRoot, ev.name);
    await mkdir(outDir, { recursive: true });
    for (const file of files) {
      const name = baseName(file);
      for (const width of EVENT_WIDTHS) {
        const out = path.join(outDir, `${name}-${width}.webp`);
        const info = await sharp(file)
          .rotate()
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: QUALITY })
          .toFile(out);
        if (width === EVENT_WIDTHS[EVENT_WIDTHS.length - 1]) {
          dims[`/photos/events/${ev.name}/${name}`] = [info.width, info.height];
        }
      }
      count++;
      console.log(`  ${ev.name}/${name}`);
    }
  }

  const sorted = Object.fromEntries(Object.entries(dims).sort(([a], [b]) => a.localeCompare(b)));
  await mkdir(path.dirname(DIMENSIONS_FILE), { recursive: true });
  await writeFile(DIMENSIONS_FILE, JSON.stringify(sorted, null, 2) + "\n");
  console.log(`Done: ${count} photos -> public/photos/events (sizes in src/content/photo-dimensions.json)`);
}

async function headshots(inDir) {
  const outDir = path.join(root, "public/photos/headshots");
  await mkdir(outDir, { recursive: true });
  for (const file of await listImages(inDir)) {
    const out = path.join(outDir, `${baseName(file)}.webp`);
    await sharp(file)
      .rotate()
      .resize({ width: 600, height: 750, fit: "cover", position: "north" })
      .webp({ quality: QUALITY })
      .toFile(out);
    console.log(`  ${path.relative(root, out)}`);
  }
  console.log("Done. Set photo: \"/photos/headshots/<name>.webp\" on the person in src/content/team.ts.");
}

async function blog(inDir, slug) {
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    throw new Error("--blog needs the post slug, for example: --blog lidar-cones");
  }
  const outDir = path.join(root, "public/blog", slug);
  await mkdir(outDir, { recursive: true });
  for (const file of await listImages(inDir)) {
    const out = path.join(outDir, `${baseName(file)}.webp`);
    await sharp(file)
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out);
    const { size } = await stat(out);
    const warn = size > 300 * 1024 ? "  <- over 300 KB, try a smaller or simpler photo" : "";
    console.log(`  /blog/${slug}/${path.basename(out)} (${kb(size)})${warn}`);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.mode === "help") {
    const src = await readFile(fileURLToPath(import.meta.url), "utf8");
    console.log(src.split("*/")[0]);
    return;
  }
  const inDir = path.resolve(root, args.in ?? "weap-photos/events");
  try {
    await stat(inDir);
  } catch {
    throw new Error(`Input folder not found: ${inDir}`);
  }
  if (args.mode === "headshots") await headshots(inDir);
  else if (args.mode === "blog") await blog(inDir, args.slug);
  else await events(inDir);
}

main().catch((err) => {
  console.error(`optimize-images: ${err.message}`);
  process.exit(1);
});
