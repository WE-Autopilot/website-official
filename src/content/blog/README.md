# Writing a blog post

Any lead can publish a post on [weautopilot.com/blog](https://www.weautopilot.com/blog). A post is one text file in this folder. You don't need to touch any code.

## The short version

1. Copy `_template.md` and rename the copy to `YYYY-MM-DD-short-slug.md`, for example `2026-11-20-lidar-cones.md`.
   - The part after the date becomes the link: `weautopilot.com/blog/lidar-cones`.
   - Use lowercase letters, numbers and dashes only.
2. Fill in the frontmatter (the part between the `---` lines). See below.
3. Write the post underneath in Markdown.
4. Put any images in `public/blog/<short-slug>/` (WebP, under 300 KB each).
5. Preview it with `npm run dev` and open <http://localhost:5173/blog>.
6. Open a pull request. Every PR needs a review from @alyashour before it goes live.

For a text-only post you can do the whole thing in GitHub's web editor. Open this folder on GitHub, click **Add file → Create new file**, paste the template in, and GitHub will offer to open a pull request for you.

## The frontmatter

```yaml
---
title: How our LiDAR sees cones
date: 2026-11-20
author: tygo-crawley
teams: [perception]
summary: One or two sentences for cards and link previews.
cover: /blog/lidar-cones/cover.webp
coverAlt: Point cloud of three cones in the parking lot
draft: false
---
```

| Field | Required | What to put |
| --- | --- | --- |
| `title` | yes | Sentence case, under eight words. Wrap a word in `==double equals==` to put it on the lavender marker; otherwise the last word gets it. |
| `date` | yes | `YYYY-MM-DD`. Posts are listed newest first. |
| `author` | yes | Your `id` from `src/content/team.ts` (like `danya-abbas`). For a guest, write their full name instead (`Jane Doe`). |
| `teams` | yes | One or more of `club`, `planning-and-control`, `perception`, `localization`, `build`, `comms-events`, in square brackets. Use `club` for posts about the whole club. |
| `summary` | yes | One or two sentences. |
| `cover` | no | A picture for the blog card, like `/blog/lidar-cones/cover.webp`. |
| `coverAlt` | if `cover` is set | What's in the cover picture, for people who can't see it. |
| `draft` | no | `true` keeps the post out of the live site. It still shows in `npm run dev`. |

If something's wrong (a missing summary, a team that doesn't exist, a cover with no `coverAlt`), `npm run build` stops and tells you which file and what to fix. The PR's Vercel check will fail the same way.

## Writing the post

Markdown basics: `## Heading`, `**bold**`, `*italic*`, `- list item`, `[link text](https://example.com)`.

A few extras match the club's look:

- **Photos** get a hand-drawn frame. The alt text becomes the caption, so make it describe the photo:
  `![Three cones lit up in the LiDAR point cloud](/blog/lidar-cones/cones.webp)`
  You can also write just the file name (`![...](cones.webp)`) and it will look in `public/blog/<your-slug>/`.
- **Handwritten notes:** start a quote with `note:` and it becomes a purple handwritten aside. Keep it to 12 words or fewer.
  `> note: this took us three tries`
- **Code** goes in fenced blocks with the language name (`python`, `cpp`, `bash`, `yaml`, `json`, `typescript`) for light highlighting.
- **Tables** work too.

Keep it friendly, specific and short, like a teammate telling a friend what they built. Skip the hype words.

## Images

- WebP, under 300 KB each. Photos straight off a phone are usually 3 MB or more.
- To convert: put your photos in a folder, then run
  `npm run images -- --blog lidar-cones --in path/to/your/photos`
  and they land in `public/blog/lidar-cones/` as WebP. It warns you if any file is still over 300 KB.
- Ask before posting someone's face.

## Checklist before you open the PR

- [ ] The file name is `YYYY-MM-DD-short-slug.md`
- [ ] `npm run dev` shows the post at `/blog/<short-slug>`
- [ ] Every image has alt text that says what's in it
- [ ] `draft: false` if you want it live once merged
