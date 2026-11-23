/**
 * Words and pictures on the home page, top to bottom.
 *
 * In titles, wrap a few words in ==double equals== to put them on the
 * lavender marker. Notes (`note`) are handwritten, so keep them to 12 words or fewer.
 */
import type { DoodleName, Photo } from "./types";

export const home = {
  hero: {
    title: "We build cars that ==drive themselves==",
    lead: "A student team at Western Engineering, working toward SAE's AutoDrive Challenge.",
    primaryButton: "Join us on Discord",
    secondaryButton: { label: "Meet the team", to: "/team" },
  },

  /**
   * The vehicle we're working on right now. Swap this out when the next
   * vehicle arrives; nothing else on the page needs to change.
   */
  currentProject: {
    name: "AP1",
    note: "this year: a golf cart that drives itself",
    image: {
      src: "/brand/cart-illustration.webp",
      width: 535,
      height: 435,
      alt: "Sketch of our golf cart with a LiDAR on the roof and detection boxes around a stop sign, a person, two cones and a speed limit sign, with the planned path drawn ahead.",
    },
    /** The little purple tag on the box around the picture. */
    detectionLabel: "ap1_golf_cart 0.99",
  },

  flow: {
    title: "How a car ==drives itself==",
    note: "…and around again, many times a second",
    steps: [
      { title: "See", body: "Cameras and LiDAR take in everything around the car.", doodle: "eye", subteam: "perception" },
      { title: "Where am I?", body: "Match what we see to our map to pin down where we are.", doodle: "pin", subteam: "localization" },
      { title: "What's around?", body: "Spot people, cones, signs and other cars.", doodle: "eye", subteam: "perception" },
      { title: "Where to?", body: "Pick a safe path to follow.", doodle: "wheel", subteam: "planning-and-control" },
      { title: "Go", body: "Steer, throttle and brake to follow it.", doodle: "wrench", subteam: ["planning-and-control", "build"] },
    ] satisfies { title: string; body: string; doodle: DoodleName; subteam: string | string[] }[],
    ownedBy: "who owns it",
  },

  road: {
    title: "The road ==so far==",
    note: "we're on step two",
    steps: [
      { title: "RC cars", when: "2025", body: "Two competitions: a simulator race in March, a real track race in May." },
      { title: "The golf cart", when: "Now", body: "AP1, our first full-size vehicle." },
      { title: "SAE AutoDrive", when: "The goal", body: "Compete in SAE's university self-driving car competition." },
    ],
    stats: [
      { value: "40+", label: "members across software, electrical and mechanical" },
      { value: "4", label: "technical sub-teams" },
      { value: "Full-size", label: "vehicle we build and test" },
      { value: "100%", label: "student-run" },
    ],
  },

  highlights: {
    title: "Highlights ==so far==",
    galleryLink: "See every photo",
    photos: [
      {
        src: "/photos/events/agm-2025/agm-2025-lecture-hall",
        alt: "A packed lecture hall seen from the side, with the club's slides on the projector.",
        caption: "AGM 2025: a real lecture hall this time",
      },
      {
        src: "/photos/events/mnist-workshop/mnist-presenter",
        alt: "A presenter pointing at a handwritten digit drawn on a pixel grid, next to the equations behind it.",
        caption: "MNIST workshop: teaching a computer to read",
      },
      {
        src: "/photos/events/build-night/build-night-group",
        alt: "A large group photo with everyone visible, some sitting on the floor in front.",
        caption: "build night, everyone in one shot",
      },
      {
        src: "/photos/events/competition-1/comp1-award-winners",
        alt: "Seven award winners standing in a row, each holding a certificate.",
        caption: "competition 1 winners, certificates and all",
      },
    ] satisfies (Photo & { caption: string })[],
  },

  latestPosts: {
    title: "Latest from the ==team==",
    allPostsLink: "All posts",
  },

  pickATeam: {
    title: "Pick a ==team==",
    note: "four teams, one car",
    cardLink: "Visit the team",
  },

  sponsorStrip: {
    lead: "Supported by",
    link: { label: "Why sponsor us", to: "/sponsors" },
  },

  joinCta: {
    title: "Want in? Pick a team",
    note: "no experience needed",
    button: "Join us on Discord",
  },
};
