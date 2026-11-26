/**
 * Club-wide details: name, links, nav and footer.
 */
import type { LinkItem } from "./types";

export type SocialId = "github" | "linkedin" | "instagram" | "discord" | "linktree";

export interface SocialLink {
  id: SocialId;
  label: string;
  href: string;
}

export const site = {
  name: "WE AutoPilot",
  longName: "Western Engineering AutoPilot",
  shortName: "WEAP",
  school: "Western University",
  tagline: "Western Engineering's self-driving car team.",
  description:
    "WE AutoPilot is a student design team at Western Engineering building self-driving vehicles, working toward SAE's AutoDrive Challenge.",
  /** Used for links in the RSS feed. */
  url: "https://www.weautopilot.com",

  discordUrl: "https://discord.com/invite/HuJCHCSVB2",

  /** The "how to write a post" guide, linked from an empty blog. */
  blogHowToUrl: "https://github.com/WE-Autopilot/website-official/blob/main/src/content/blog/README.md",

  /** Who sponsors should email. `personId` is their id in team.ts. */
  sponsorship: {
    email: "yelkady2@uwo.ca",
    personId: "yousef-elkady",
  },

  socials: [
    { id: "github", label: "GitHub", href: "https://github.com/WE-Autopilot" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/we-autopilot/posts/?feedView=all" },
    { id: "instagram", label: "Instagram", href: "https://www.instagram.com/we.autopilot" },
    { id: "discord", label: "Discord", href: "https://discord.com/invite/HuJCHCSVB2" },
    { id: "linktree", label: "Linktree", href: "https://linktr.ee/we.autopilot" },
  ] satisfies SocialLink[],

  /**
   * Header links. "Sub-teams" is filled in from subteams.ts as a dropdown and
   * sits where `subteamsMenu` says (after this many links).
   */
  nav: [
    { label: "Team", to: "/team" },
    { label: "Blog", to: "/blog" },
    { label: "Gallery", to: "/gallery" },
    { label: "Sponsors", to: "/sponsors" },
  ] satisfies LinkItem[],
  subteamsMenu: { label: "Sub-teams", after: 2 },
  joinButton: { label: "Join us", to: "/join" } satisfies LinkItem,

  footer: {
    exploreHeading: "Explore",
    explore: [
      { label: "Home", to: "/" },
      { label: "Team", to: "/team" },
      { label: "Blog", to: "/blog" },
      { label: "Gallery", to: "/gallery" },
      { label: "Sponsors", to: "/sponsors" },
      { label: "Join us", to: "/join" },
    ] satisfies LinkItem[],
    subteamsHeading: "Sub-teams",
    socialHeading: "Follow along",
    rssLabel: "Blog RSS feed",
    copyright: "WE AutoPilot · Western University",
  },
};
