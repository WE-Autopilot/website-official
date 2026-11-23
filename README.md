# WE AutoPilot website

The site for WE AutoPilot (WEAP), Western Engineering's self-driving car team: [weautopilot.com](https://www.weautopilot.com).

The look comes from the club's design guide: **white page, black pen, lavender marker, purple notes, real photos.** The guide is in [`docs/design/`](docs/design/) (`AutoPilot-Design-Guide.pptx`, with every slide as a PNG in `docs/design/slides/`).

## Stack

- React 18, TypeScript, Vite 6, React Router 7
- Plain CSS with design tokens (`src/styles/design-system.css`, mirrored in `src/styles/tokens.ts`)
- Montserrat and Kalam, self-hosted with Fontsource
- Blog: Markdown files, checked and bundled by a small Vite plugin (`plugins/blog.ts`), rendered with `marked` + DOMPurify
- Hosted on Vercel, with Vercel Analytics

## Scripts

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies (Node 20 or newer). |
| `npm run dev` | Local dev server at <http://localhost:5173>. Draft blog posts show here. |
| `npm run build` | Type-checks, then builds the site into `dist/`. Fails with a clear message if a blog post's frontmatter is wrong. Also writes `dist/rss.xml`. |
| `npm run preview` | Serves the built `dist/` locally, exactly as Vercel will. |
| `npm run design` | Opens the design system showcase at `/design-system`: every token and component. Never part of a production build. |
| `npm run images` | Converts photos to WebP. See [Photos](#photos). |
| `npm run lint` | ESLint. |
| `npm run typecheck` | TypeScript only. |

## Updating content

All the words, names, links and photos live in [`src/content/`](src/content/). You can change them without touching any layout code. [`src/content/README.md`](src/content/README.md) explains each file:

- `site.ts`: club name, Discord and social links, nav, sponsorship email
- `team.ts`: the roster (and where headshots go once they're taken)
- `subteams.ts`: the four sub-team pages
- `home.ts`: the home page, including the current vehicle (`currentProject`)
- `join.ts`, `sponsors.ts`, `gallery.ts`, `pages.ts`: everything else

## Writing a blog post

Any lead can post by adding one Markdown file to `src/content/blog/`. No React or CSS needed. The full how-to is in [`src/content/blog/README.md`](src/content/blog/README.md). The short version:

1. Copy `src/content/blog/_template.md` to `src/content/blog/YYYY-MM-DD-short-slug.md`.
2. Fill in the frontmatter (title, date, author id from `team.ts`, teams, summary).
3. Put images in `public/blog/<short-slug>/` (WebP, under 300 KB).
4. Check it with `npm run dev`, then open a PR.

## Photos

Event photos live in `public/photos/events/<event>/` as two WebP sizes (800 and 1600 px wide). To add more:

```bash
# put JPEGs in weap-photos/events/<event-name>/ (ignored by git), then:
npm run images
```

That writes the WebP files and records each photo's size in `src/content/photo-dimensions.json`. Then add the photos to `src/content/gallery.ts` and delete the JPEGs. Never commit original JPEGs or zip files.

Other modes:

```bash
npm run images -- --headshots --in path/to/headshots     # 600 px, 4:5 crop → public/photos/headshots/
npm run images -- --blog my-post-slug --in path/to/pics  # → public/blog/my-post-slug/
```

## Project layout

```text
.
├── docs/
│   ├── deployment.md          # Vercel setup
│   └── design/                # design guide, slides, revamp brief, photo manifest
├── plugins/                   # Vite plugin for the Markdown blog + RSS
├── public/
│   ├── brand/                 # logo, cart illustration, doodles
│   ├── photos/events/         # event photos (WebP, generated)
│   └── sponsors/              # sponsor logos
├── scripts/optimize-images.mjs
├── src/
│   ├── content/               # ← edit these to change what the site says
│   ├── components/
│   │   ├── design-system/     # SketchBox, Marker, Note, StepCircle, PhotoFrame, …
│   │   └── layout/            # header, footer
│   ├── pages/                 # one file per page
│   ├── blog/                  # Markdown rendering
│   ├── hooks/, lib/           # small helpers
│   └── styles/                # design tokens
└── vercel.json                # SPA rewrite (keep it)
```

## Branch → preview → merge

1. Work on a branch, never directly on `main`.
2. Push the branch and open a pull request. Vercel builds a **preview URL** for every PR. Check it on your phone too; most visitors are on one.
3. Every PR needs a review from @alyashour (see `.github/CODEOWNERS`).
4. Merging into `main` deploys to production automatically.

More in [`docs/deployment.md`](docs/deployment.md).
