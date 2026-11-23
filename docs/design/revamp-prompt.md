# WEAP website revamp: build brief for Claude Code

You're rebuilding the WE AutoPilot (WEAP) club site in this repo to match the club's new design guide. Do the whole revamp in one pass: import the photos, restructure content, rebuild the design system and every page, add a blog, clean up, and verify. Don't stop to ask unless something below is impossible. Where you need a fact you can't find (a name, a role, a sponsor), leave a clearly marked `TODO(content)` in the content files and list it in your final report rather than inventing it.

## 1. Read first

- `docs/design/AutoPilot-Design-Guide.pptx`, with every slide rendered as `docs/design/slides/slide-NN.png`. Look at the slide images, not just the text. The key ones: 4 (logo), 5 (colour), 6 (contrast pairs), 7 (type), 10 (six sketch ingredients), 11 (do and don't), 12 (drawing the look), 14 (anatomy of a post), 15 (photos), 16 (writing), 22–23 (layouts: highlights, flow, cards), 27 (accessibility).
- `docs/design/photo-manifest.md`: what each new photo shows and where it fits.
- The current code: `src/App.tsx`, `src/components/*`, `src/components/design-system/*`, `src/stylesheets/*`, `design-system.css`, `tokens.ts`, `vercel.json`, `CODEOWNERS`, `docs/deployment.md`.

## 2. Ground rules

- Work on a new branch, `redesign/sketchbook`, created from `main`. Commit in logical steps (photos, content files, design system, each page, cleanup).
- Do not `git push`. Hamza pushes after reviewing locally, and that push creates the Vercel preview.
- Don't add `Co-Authored-By` or `Claude-Session` trailers to commits. They go out as Hamza's.
- Keep these no matter what:
  - `vercel.json` and its SPA rewrite
  - `<Analytics />` from `@vercel/analytics/react` in `App.tsx`
  - every existing URL: `/`, `/team` (and `/Team`), `/teams/:slug` for `planning-and-control`, `perception`, `localization` and `build`, `/join`, `/contact` → `/join` redirect, `/sponsors`, `/gallery`
  - the Discord invite and every footer social link (GitHub, LinkedIn, Instagram, Discord, Linktree). Copy the exact URLs from the current code.
  - a sponsorship `mailto:` link, now pointing to `yelkady2@uwo.ca` (Yousef Elkady, Finance Lead)
  - the `npm run design` showcase mode, which never ships in production builds

## 3. Import the photos (do this first)

The photos picked from the club Drive are in `weap-photos.zip`. Look for it in the repo root first, then in `~/Downloads/`. It contains `weap-photos/events/<event>/<name>.jpg` (29 photos) and `weap-photos/headshots/*.jpg`. **Ignore the headshots folder.** New headshots are being taken soon, so don't import any of these.

1. Add `sharp` as a devDependency and write `scripts/optimize-images.mjs`. It converts the JPEGs to WebP (quality ~78), strips metadata, and outputs two widths (800 and 1600). Output to `public/photos/events/<event>/<name>-800.webp` / `-1600.webp`. Give it an optional headshot mode (600 px, cropped to 4:5 around the centre-top, output to `public/photos/headshots/`) for when the new headshots arrive, but don't run it now. Add an `npm run images` script.
2. Run it, then delete the extracted JPEGs and make sure the zip is never committed (add `*.zip` to `.gitignore`).
3. If the zip can't be found, stop and tell me. Everything else depends on these photos.

## 4. Move content into data files

### What the club is (this shapes every page)

WE AutoPilot is Western Engineering's self-driving vehicle design team. **The long-term goal is competing in SAE's AutoDrive Challenge.** The autonomous golf cart (project "AP1") is this year's platform, and maybe next year's; before that the club raced 1/10-scale RC cars. So the site's identity is the team and the AutoDrive goal, not the golf cart. The cart is the current project, featured prominently but kept in the content files (`currentProject` in `home.ts`) so it can be swapped for the next vehicle without touching layout. Don't write copy that says the club is a golf cart club.

### The 2025–26 team (replaces the current `membersList` entirely)

| Name | Role | Group |
|---|---|---|
| Aly Ashour | President | Executive |
| Aly Ashour | Planning & Control Lead | Planning & Control |
| Hamza Elkababji | Mapping & Localization Co-Lead | Mapping & Localization |
| Ali Elgalad | Mapping & Localization Co-Lead | Mapping & Localization |
| Tygo Crawley | Perception Lead | Perception |
| Omran Rinawi | Build Co-Lead | Build |
| Abdulrahman Almazlom | Build Co-Lead | Build |
| Yousef Elkady | Finance Lead | Executive |
| Danya Abbas | Comms & Events Co-Lead | Comms & Events |
| Cadence McGillicuddy | Comms & Events Co-Lead | Comms & Events |

- Aly holds two roles: show him once per group he belongs to, with the right title in each, and once in "All" with both titles.
- Everyone else on the current site (Ethan Greene, Dev Chaudhari, Obaid Mohiuddin, Ian Patrick Tan, Zain Syed, Benjamin Namayandeh, Ritwick Vemula, Nathanael Cadman-Neu, Kierstin Griffith) comes off the site.
- **No headshots for anyone for now.** New ones are being taken soon. Delete every headshot in `src/assets/` (all the person-named `.webp` files) and give every member the doodle placeholder card. Keep `photo` as an optional field in `team.ts` so headshots can be dropped in later without touching layout, and explain how in `src/content/README.md`.
- Team page filter tabs: All, Executive, Planning & Control, Perception, Mapping & Localization, Build, Comms & Events.
- The sponsorship `mailto:` goes to `yelkady2@uwo.ca` (Yousef Elkady, Finance Lead). Put it in `site.ts`.

### Content files

Every piece of text, every name and every link currently hard-coded in components moves into typed files under `src/content/`:

- `site.ts`: club name, tagline, Discord URL, social links, sponsorship email, nav items
- `team.ts`: the roster above. Each person has `name`, a list of `roles` (each a title plus a group), an optional `photo` and an optional `linkedin`.
- `subteams.ts`: the four technical sub-teams (focus areas, milestones and tech stack come from `teamData` in `TeamPage.tsx`; leads come from the roster above): slug, display name, one-line summary, focus areas, milestones, tech stack, doodle icon and photo
- `sponsors.ts`: QNX now. Leave Digikey and RobotShop out unless something in the repo shows they're current.
- `gallery.ts`: events in reverse date order (from `MILESTONES` in `Gallery.tsx`, plus the new events from the photo manifest), each with a title, date, short caption and photos with alt text
- `home.ts`: hero copy, stats and section copy
- `blog/`: the blog posts as Markdown files (see the Blog page section below)

Components render these files and contain no copy of their own. Put a short `src/content/README.md` explaining to club members how to update each file.

Headshots: none for now (see above). Everyone gets the doodle placeholder, so make it look intentional, not like a missing image: a drawn frame with a doodle that varies by group and the person's initials in Montserrat.

## 5. The new design system

The guide's one-line version: **white page, black pen, lavender marker, purple notes, real photos.** It replaces the current dark, neon, multi-colour look completely.

Tokens (replace `design-system.css` and `tokens.ts`, keep the two in sync):

| Token | Value | Use |
|---|---|---|
| `--ink` | `#191919` | text, pen lines, logo |
| `--purple` | `#7C5CDB` | the only accent: links, notes, labels, arrows, focus rings |
| `--lavender` | `#EAE4FA` | the marker: fills, highlights, details boxes |
| `--lilac` | `#BEAEED` | quiet lines and dividers; never text |
| `--paper` | `#FFFFFF` | the page |
| `--grey` | `#5D5A66` | small captions only |

- Roughly 60% white, 25% ink, 10% lavender and 5% purple.
- Contrast rules from slide 6: small text on lavender is ink, never purple. Purple on ink is large text only. Lilac is never text.
- Drop the per-sub-team colours (violet, cyan, blue, emerald). Sub-teams are told apart by their doodle and name, not by colour.
- Light theme only. Remove the dark theme.

Type:
- Montserrat (400, 500, 700, 800) and Kalam (400, 700) only, self-hosted with `@fontsource/montserrat` and `@fontsource/kalam`. Remove all the other font links in `index.html`.
- Titles are Montserrat ExtraBold in sentence case, one per section. Body text is Montserrat Regular/Medium. Kalam is only for short purple notes of 12 words or fewer, never for paragraphs, dates, prices or buttons.
- No ALL CAPS, no letter-spaced labels anywhere.
- Body text is at least 16 px. Use fluid type with `clamp()`.

The six sketch ingredients (slide 10). Use two or three per section, never all six:
1. **Pen outlines.** Black, 2–3 px, slightly wobbly, for boxes, frames, cards, buttons and arrows. Build this as a reusable SVG approach (for example an `<svg>` filter with `feTurbulence` + `feDisplacementMap` applied only to a border layer, or `roughjs` if you prefer; keep the dependency small). The wobble goes on outlines only; text always stays crisp (slide 11).
2. **Lavender marker.** The only fill: behind key words in titles (a slightly uneven highlighter stroke), behind the details box, and as the card/button hover fill.
3. **Handwritten notes.** Kalam in purple, with a hand-drawn curved SVG arrow pointing at something real.
4. **Numbered circles.** Hand-drawn circles with numbers, only for real steps (Join: scan the code / pick a team / come to a meeting).
5. **Framed photos.** Real, unfiltered photos inside a drawn frame. No filters, overlays, duotones or gradients on photos.
6. **Detection labels.** Purple box with a label chip, like the title slide (`crew_25_26 0.99`, `golf_cart`). Use sparingly: the hero and maybe one photo.

Never use drop shadows, gradients, glows, blur, glassmorphism, neon or 3D effects. Delete the `AntigravityGrid` canvas.

Logo: use `public/brand/logo-black.png` (and `logo-white.png` on an ink or purple background), top-left in the header, at least 60 px wide, with clear space of half the logo's height. Never place it on a busy photo. It replaces the old `autopilot/` text logo and its cycling punctuation. Make a new favicon from the logo mark (the "AUTO" lettering) as SVG or PNG.

Components (rebuild `src/components/design-system/` around these): `SketchBox` (wobbly outline container), `Marker` (highlight span), `Note` (Kalam text + arrow, with direction props), `StepCircle`, `PhotoFrame` (drawn frame + optional caption, `srcset` from the two WebP widths, `loading="lazy"`, width/height set), `DetectionLabel`, `Button` (primary: ink outline with lavender fill; secondary: outline only; visible purple focus ring), `Card`, `SectionHeading`, `Logo` and `Doodle` (renders the PNGs in `public/brand/doodles/`). Update the `npm run design` showcase to show all of them on the new tokens.

Motion: keep it minimal. A gentle draw-in of outlines or arrows on scroll is fine. Everything respects `prefers-reduced-motion`.

## 6. Pages

Layout patterns come from slides 14 and 22–23: four to six things per section, about 6% clear margin on each side, a generous white background, and title top-left in the same place on every page. Mobile first; most visitors are on a phone.

**Header**: logo top-left; links to Team, Sub-teams (dropdown of the four), Blog, Gallery, Sponsors; "Join us" button. The mobile menu is a full-screen white sheet with large links. Keep it keyboard and screen-reader accessible (`aria-expanded`, Escape closes it, focus trapped while open).

**Home (`/`)**, modelled on slides 1, 19 and 22–23:
1. Hero: a short, specific title about building self-driving vehicles at Western (for example "We build cars that drive themselves", with "drive themselves" on a lavender marker). One line under it: a student team working toward SAE's AutoDrive Challenge. Show the current project, `public/brand/cart-illustration.png`, with detection labels and a Kalam note ("this year: a golf cart that drives itself"). Add primary (Join us on Discord) and secondary (Meet the team) buttons.
2. "How a car drives itself": a five-step flow (see → where am I → what's around → where to → go), each step a SketchBox with a doodle linking to the sub-team that owns it (Perception, Mapping & Localization, Perception, Planning & Control, Planning & Control and Build). Keep it vehicle-agnostic; it applies to the cart now and to an AutoDrive car later.
3. "The road so far": a short horizontal path from RC cars (competitions 1 and 2) to the golf cart (now) to SAE AutoDrive (the goal), drawn as a pen line with numbered circles. The steps live in `home.ts`.
4. Stats: the existing four stat cards, restyled as simple SketchBoxes with big Montserrat numbers.
5. "Year two, so far": a highlights grid of four framed photos (AGM lecture hall, MNIST presenter, build night group, competition award winners), each with a one-line Kalam caption, plus a link to the gallery.
6. "Pick a team": the four sub-team cards from `subteams.ts`.
7. Sponsor strip: "Supported by BlackBerry QNX", with a link to `/sponsors`.
8. Join CTA: the three numbered steps and the Discord button, in a lavender details box.

That's eight sections. If it feels long on a phone, merge stats into "the road so far" rather than cramming.

**Team (`/team`)**: a framed whole-club photo at the top (`agm-2025-crowd-group` or `build-night-group`; not the 2025 exec photo, whose lineup is out of date); members grouped by sub-team (keep the filter tabs, restyled as outlined pills with a lavender active state); each person as a drawn-frame card with the doodle placeholder, name (Montserrat Bold) and role. The card switches to a framed headshot automatically once `photo` is set.

**Sub-team pages (`/teams/:slug`)**: one template. Doodle and title, a one-line Kalam note, leads, focus areas as a SketchBox list, milestones as a hand-drawn vertical timeline with numbered circles, tech stack as outlined chips (all one colour), and one or two framed photos. Unknown slugs show a friendly not-found message. Display names: Planning & Control, Perception, Mapping & Localization (slug stays `localization`), Build & Mechanical. Also add a `/teams/mapping-and-localization` alias that redirects to `/teams/localization`.

**Join (`/join`)**: the three numbered steps (join the Discord / pick a team / come to a meeting), a "no experience needed" note over the MNIST workshop room photo, benefit cards and the Discord button. No form.

**Sponsors (`/sponsors`)**: QNX feature with logo and a short "what they help us build" line, the "why sponsor" cards, a framed competition photo, and the `mailto:` button to Yousef (`yelkady2@uwo.ca`).

**Gallery (`/gallery`)**: now a real page linked from the header and footer. Events in reverse date order, each with a title, date, short caption and a grid of framed photos. Clicking a photo opens an accessible lightbox (keyboard arrows, Escape, focus return, alt text shown as the caption). Use the existing WebP gallery photos plus the new events.

**Blog (`/blog`, `/blog/:slug`)**: a big part of the site. Any lead should be able to publish a post (Tygo writing something small about perception, say, or Comms writing about the club as a whole) by adding one Markdown file, with no React or CSS involved.

- **Where posts live**: one Markdown file per post in `src/content/blog/`, named `YYYY-MM-DD-short-slug.md`. The slug in the URL is the file name without the date. Images go in `public/blog/<slug>/`.
- **Frontmatter**:
  ```yaml
  title: How our LiDAR sees cones
  date: 2026-11-20
  author: tygo-crawley        # id from team.ts; or a plain name for guest authors
  teams: [perception]         # one or more of: club, planning-and-control, perception, localization, build, comms-events
  summary: One or two sentences for cards and link previews.
  cover: /blog/lidar-cones/cover.webp   # optional
  coverAlt: Point cloud of three cones in the parking lot   # required if cover is set
  draft: false                # drafts show in `npm run dev` only, never in production
  ```
- **Loading**: use `import.meta.glob('/src/content/blog/*.md', { query: '?raw', import: 'default', eager: true })`, a tiny frontmatter parser (or `gray-matter` if it bundles cleanly for the browser; otherwise write a small one) and a small Markdown renderer (`marked` or `markdown-it`; sanitize the output). Validate frontmatter at build time. A post with a missing title, date, author, team or summary, an unknown team or author id, or a cover without `coverAlt` should fail `npm run build` with a clear message naming the file. Compute reading time.
- **Markdown extras that map to the sketch style**: `##`/`###` headings in Montserrat; images rendered as framed photos with their alt text as the caption; a blockquote that starts with `note:` rendered as a purple Kalam aside with an arrow; code blocks in a plain ink-outlined box on white (light syntax highlighting is fine if it adds little to the bundle; load it only on post pages); tables, lists and links styled from the tokens.
- **`/blog` index**: title and a one-line Kalam note, team filter pills (All, Club, the four sub-teams, Comms & Events) synced to `?team=` so filtered views are linkable, then post cards (cover in a drawn frame or a team doodle if no cover, title, author, date, team chips, summary), newest first, paginated or "load more" after 12.
- **Post page**: title with a marker highlight on a key word, author name and role (linked to their entry on `/team`), date, reading time, team chips (link back to the filtered index), the body at a comfortable reading width (about 68 characters), and "more from <team>" with two or three related posts at the bottom. Set `document.title` and the meta description per post.
- **Elsewhere on the site**: "Blog" goes in the header nav (next to Team) and the footer; Home gets a "Latest from the team" section with the three newest posts (it slots in before "Pick a team"; merge or trim another Home section so the page doesn't get longer than about eight sections); each sub-team page shows its latest posts; each person on `/team` links to their posts if they have any.
- **RSS**: generate `/rss.xml` at build time with a small Vite plugin, and link it in the blog index and `index.html`.
- **Seed content**: one real post, "Welcome to the WEAP blog", authored by Comms & Events (`danya-abbas`) and tagged `club`. It explains what the blog is for and that any team can post; keep it short and friendly, and invent no club facts. Add `src/content/blog/_template.md` (ignored by the loader) as a copy-and-fill starting point.
- **How-to**: `src/content/blog/README.md` explains, for a non-web person, how to write a post. Copy the template, rename it, fill the frontmatter, put images in `public/blog/<slug>/` (WebP, under 300 KB; `npm run images` can convert them), preview with `npm run dev`, then open a PR. GitHub's web editor is enough for a text-only post. Note that every PR needs @alyashour's review.

**Footer**: logo, one-line tagline, social links (icons with accessible names), and nav links, on white with a pen line above.

**404**: add a catch-all route with a small doodle, a Kalam note and a link home. Delete `/UnderConstruction`.

Writing (slide 16): friendly, specific and short, like a teammate telling a friend. Rewrite all copy in that voice. No hype ("Exciting autonomous demos!"), no press-release tone. Keep facts the same.

## 7. Clean up

- Remove unused dependencies: `i18next`, `react-i18next`, `i18next-scanner`, `@tanstack/react-query`, `react-toastify`, `react-error-boundary`, `workbox-window`, `react-scroll-parallax` (and its provider in `App.tsx`), `clsx`, `tailwind-merge`. Check `@vitejs/plugin-legacy` is actually configured; remove it if not.
- Delete unused files: everything in `src/utils/` that nothing imports, `Roadmap.tsx` (unless the new showcase uses it), `AntigravityGrid`, the old dark-theme styles, and `src/assets/Gradient.*`.
- In `public/`: delete the original full-size JPEG/PNG files that already have WebP copies (all of `public/Gallery/*.jpeg|png|JPG`, including the 62 MB `RedTeamLookinSmart.jpeg`), `public/home/`, `Globe.png`, `Wip.png`, `vite.svg`, the old logo files, and any other file nothing references. Use `grep` to confirm each one is unreferenced before deleting. Target: `public/` under 15 MB.
- Delete `CNAME`. It's left over from GitHub Pages (it only contains `weautopilot.com`). Vercel ignores it; the domain is set in the Vercel dashboard.
- Update `README.md`: stack, scripts (`dev`, `build`, `design`, `images`), how to update content and write a blog post, the branch → preview → merge flow, and a pointer to the design guide.

## 8. Verify before you report

1. `npm install`, `npm run lint` and `npm run build` all pass with no errors or new warnings. `tsc` is clean.
2. Run `npm run preview` and load every route directly by URL (deep links), including `/Team`, `/contact`, `/teams/mapping-and-localization` and a bad URL for the 404.
3. Screenshot every page at 390 px and 1440 px wide (use Playwright via `npx playwright` if you have no browser tool) and compare against the slide images. Check: only palette colours, only Montserrat and Kalam, no shadows or gradients, no all-caps, logo top-left, the wobble only on outlines, and four to six things per section.
4. Accessibility: every `<img>` has real alt text (from the content files), tab order is sensible, focus is visible, colour pairs match slide 6, and the lightbox and mobile menu work with the keyboard. Run `npx @axe-core/cli` (or similar) on each route and fix anything serious.
5. Blog: the seed post renders, a draft is hidden in `npm run build`, a post with bad frontmatter fails the build with a clear message, `?team=` filtering works, and `/rss.xml` is valid.
6. Check the size of `public/` and the JS bundle (the blog's Markdown renderer and highlighter shouldn't load on non-blog pages). Confirm `<Analytics />` is still mounted and `vercel.json` is unchanged.

## 9. Final report

Finish with:
- what changed, by area
- the branch name and the commit list
- before and after for `public/` size and bundle size
- every `TODO(content)` left, with file and line
- anything you decided that Hamza should double-check
- the exact commands Hamza runs next: review locally with `npm run dev`, then `git push -u origin redesign/sketchbook`, then open the PR for the Vercel preview (@alyashour is the required reviewer)
