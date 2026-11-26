/**
 * Titles, notes and small labels for the Team, Sub-team, Gallery, Blog and
 * 404 pages. Use ==double equals== for the marker highlight in titles.
 */
import type { Photo } from "./types";

export const teamPage = {
  title: "Meet the ==team==",
  lead: "Students from software, electrical, mechatronics and mechanical engineering, leading the 2025–26 team.",
  photo: {
    src: "/photos/events/agm-2025/agm-2025-crowd-group",
    alt: "Everyone at AGM 2025 lined up at the front of a lecture hall for a group photo.",
  } satisfies Photo,
  photoLabel: "crew_25_26 0.99",
  photoNote: "the whole crew at AGM 2025",
  cardsNote: "new headshots coming soon",
  allTab: "All",
  filterLabel: "Show people from",
  postsLink: "Posts",
  linkedinLabel: "LinkedIn",
};

export const subteamPage = {
  leadsHeading: "Leads",
  focusHeading: "What we work on",
  milestonesHeading: "Milestones",
  status: { done: "Done", "in-progress": "In progress", planned: "Planned" },
  techHeading: "Tech we use",
  postsHeading: "From the ==blog==",
  allPostsLink: "All posts from this team",
  otherTeamsHeading: "Other teams",
  joinButton: "Join this team",
  notFound: {
    title: "We couldn't find ==that team==",
    note: "maybe it's still in CAD?",
    body: "Here are the four teams we do have.",
  },
};

export const galleryPage = {
  title: "Our events, ==in photos==",
  note: "newest first",
  photoCount: (n: number) => `${n} photos`,
  openPhoto: (alt: string) => `Open photo: ${alt}`,
  lightbox: {
    close: "Close",
    previous: "Previous photo",
    next: "Next photo",
    counter: (i: number, n: number) => `${i} of ${n}`,
  },
};

export const blogPage = {
  title: "Notes from the ==team==",
  note: "any team can post here",
  lead: "What we're building, what broke and what we learned, written by the people doing it.",
  filterLabel: "Show posts from",
  allTab: "All",
  authorFilter: (name: string) => `Posts by ${name}`,
  clearAuthor: "Show everyone",
  loadMore: "Load more",
  empty: "Nothing here yet. Want to write the first one?",
  emptyLink: "How to write a post",
  rss: "RSS feed",
  minRead: (n: number) => `${n} min read`,
  by: "by",
  moreFrom: (team: string) => `More from ${team}`,
  backToBlog: "All posts",
  notFound: {
    title: "We couldn't find ==that post==",
    note: "it might still be a draft",
  },
  pageSize: 12,
};

export const notFoundPage = {
  title: "This page ==took a wrong turn==",
  note: "our planners are on it",
  body: "The link might be old, or the page moved.",
  homeButton: "Back to the home page",
};

export const ui = {
  skipLink: "Skip to content",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  mainNav: "Main",
  homeLink: "WE AutoPilot home",
  opensInNewTab: "(opens in a new tab)",
};
