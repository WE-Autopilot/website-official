# Updating the website's content

Everything you read on the site lives in this folder, so you can change words, names, links and photos without touching any layout code. Open a file, change the text inside the quotes, then preview with `npm run dev`.

| To change… | Edit |
| --- | --- |
| Club name, Discord link, social links, header and footer links, sponsorship email | `site.ts` |
| Who's on the team, their roles, headshots and LinkedIn links | `team.ts` |
| A sub-team's page: summary, focus areas, milestones, tech stack, photos | `subteams.ts` |
| The home page, including the current vehicle (`currentProject`) | `home.ts` |
| The join page and the three join steps | `join.ts` |
| Sponsors and the sponsors page | `sponsors.ts` |
| Gallery events and their photos | `gallery.ts` |
| Titles and small labels on Team, Gallery, Blog and the 404 page | `pages.ts` |
| Blog posts | `blog/`; see [blog/README.md](blog/README.md) |

## A few conventions

- **Marker highlight in titles:** wrap words in `==double equals==`, like `"Meet the ==team=="`. Use it on one or two words per title.
- **Notes** (any field called `note`) are drawn in purple handwriting. Keep them to 12 words or fewer.
- **Sentence case** everywhere, no ALL CAPS.
- **Voice:** friendly, specific and short. "Come see what we built", not "Exciting autonomous demos!"

## People and headshots

Each person in `team.ts` has an `id` (their name in lowercase with dashes), a list of `roles`, and optional `photo` and `linkedin`.

- Someone with two roles (like Aly: President and Planning & Control Lead) gets two entries in `roles`. They show once under each group's tab, and once under "All" with both titles.
- Until a person has a `photo`, they get a drawn placeholder card with their initials and their group's doodle.

To add headshots once they're taken:

1. Rename each photo to the person's id, for example `aly-ashour.jpg`.
2. Run `npm run images -- --headshots --in path/to/the/folder`. This makes 600 px WebP files cropped to 4:5 in `public/photos/headshots/`.
3. Add `photo: "/photos/headshots/aly-ashour.webp",` to that person in `team.ts`.

The card switches from the placeholder to the photo on its own.

## Photos

Event photos live in `public/photos/events/<event>/` as two WebP sizes (`-800.webp` and `-1600.webp`). In content files you refer to a photo by its path **without** the size, plus alt text:

```ts
{ src: "/photos/events/agm-2025/agm-2025-lecture-hall", alt: "A packed lecture hall…" }
```

To add new event photos:

1. Put the JPEGs in `weap-photos/events/<event-name>/` at the root of the repo. That folder is ignored by git.
2. Run `npm run images`. It writes the WebP files and records each photo's size in `photo-dimensions.json` (don't edit that file by hand).
3. Add the event and its photos to `gallery.ts`.
4. Delete the JPEGs.

Alt text should say what's in the photo and repeat any words in it.

## Sponsors

Add the logo to `public/sponsors/` (WebP or PNG) and a new entry to `sponsors` in `sponsors.ts`. The home page strip and the sponsors page pick it up.

## Changing the current vehicle

`home.ts` → `currentProject` holds the vehicle shown in the home page hero (picture, note and label). When the next vehicle arrives, swap those fields and the road map steps in `home.ts` → `road`.
