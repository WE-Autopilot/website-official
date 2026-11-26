/**
 * The 2025–26 team: everyone who appears on /team, and the groups they belong to.
 *
 * To add a headshot: put the photo in public/photos/headshots/ (run
 * `npm run images -- --headshots --in <folder>`), then add
 * `photo: "/photos/headshots/<file>.webp"` to the person below.
 */
import type { DoodleName } from "./types";

export type GroupId =
  | "exec"
  | "planning-and-control"
  | "perception"
  | "localization"
  | "build"
  | "comms-events";

export interface Group {
  id: GroupId;
  /** Name used on the Team page tabs and member cards. */
  label: string;
  /** Doodle on the placeholder card for people in this group. */
  doodle: DoodleName;
}

/** Order here is the order of the Team page tabs. */
export const groups: Group[] = [
  { id: "exec", label: "Executive", doodle: "check" },
  { id: "planning-and-control", label: "Planning & Control", doodle: "wheel" },
  { id: "perception", label: "Perception", doodle: "eye" },
  { id: "localization", label: "Mapping & Localization", doodle: "pin" },
  { id: "build", label: "Build", doodle: "wrench" },
  { id: "comms-events", label: "Comms & Events", doodle: "phone" },
];

export interface Role {
  title: string;
  group: GroupId;
}

export interface Person {
  /** Lowercase name with dashes. Blog posts use it as `author`. Don't change it once posts use it. */
  id: string;
  name: string;
  /** Most people have one role. List the main one first. */
  roles: Role[];
  /** Optional headshot, for example "/photos/headshots/aly-ashour.webp". */
  photo?: string;
  /** Optional full LinkedIn URL. */
  linkedin?: string;
}

export const people: Person[] = [
  {
    id: "aly-ashour",
    name: "Aly Ashour",
    roles: [
      { title: "President", group: "exec" },
      { title: "Planning & Control Lead", group: "planning-and-control" },
    ],
  },
  {
    id: "yousef-elkady",
    name: "Yousef Elkady",
    roles: [{ title: "Finance Lead", group: "exec" }],
  },
  {
    id: "tygo-crawley",
    name: "Tygo Crawley",
    roles: [{ title: "Perception Lead", group: "perception" }],
  },
  {
    id: "hamza-elkababji",
    name: "Hamza Elkababji",
    roles: [{ title: "Mapping & Localization Co-Lead", group: "localization" }],
  },
  {
    id: "ali-elgalad",
    name: "Ali Elgalad",
    roles: [{ title: "Mapping & Localization Co-Lead", group: "localization" }],
  },
  {
    id: "omran-rinawi",
    name: "Omran Rinawi",
    roles: [{ title: "Build Co-Lead", group: "build" }],
  },
  {
    id: "abdulrahman-almazlom",
    name: "Abdulrahman Almazlom",
    roles: [{ title: "Build Co-Lead", group: "build" }],
  },
  {
    id: "danya-abbas",
    name: "Danya Abbas",
    roles: [{ title: "Comms & Events Co-Lead", group: "comms-events" }],
  },
  {
    id: "cadence-mcgillicuddy",
    name: "Cadence McGillicuddy",
    roles: [{ title: "Comms & Events Co-Lead", group: "comms-events" }],
  },
];

/**
 * Teams a blog post can be tagged with (the `teams:` line in a post).
 * "club" is for posts about the whole club.
 */
export const blogTeams = [
  { id: "club", label: "Club" },
  { id: "planning-and-control", label: "Planning & Control" },
  { id: "perception", label: "Perception" },
  { id: "localization", label: "Mapping & Localization" },
  { id: "build", label: "Build" },
  { id: "comms-events", label: "Comms & Events" },
] as const;

export type BlogTeamId = (typeof blogTeams)[number]["id"];
