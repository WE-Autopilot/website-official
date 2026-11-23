/**
 * Sponsors, and the words on /sponsors. Sponsor logos go in public/sponsors/.
 * The contact email lives in site.ts (site.sponsorship).
 */
import type { Photo } from "./types";

export interface Sponsor {
  id: string;
  name: string;
  url: string;
  logo: { src: string; width: number; height: number; alt: string };
  /** One line: what their support lets us build. */
  helpsUsBuild: string;
  /** A short thank-you, one or two paragraphs. */
  thanks: string[];
}

export const sponsors: Sponsor[] = [
  {
    id: "blackberry-qnx",
    name: "BlackBerry QNX",
    url: "https://blackberry.qnx.com",
    logo: { src: "/sponsors/blackberry-qnx.webp", width: 480, height: 167, alt: "QNX" },
    helpsUsBuild: "Real-time control code on the same OS that runs in production cars.",
    thanks: [
      "BlackBerry QNX believed in us and backed the team. Their support gets our students better tools and sensors, plus the real-time operating system used in safety-critical car software around the world.",
      "With QNX on campus, our planning and control team writes and tests production-grade embedded code instead of just reading about it.",
    ],
  },
];

export const sponsorsPage = {
  title: "Our ==sponsors==",
  note: "thank you for backing us",
  featuredHeading: "Thank you, BlackBerry QNX",
  visitLabel: "Visit",
  whyTitle: "Why ==sponsor us==",
  why: [
    {
      title: "Meet students who build",
      body: "Get to know software, electrical, mechatronics and mechanical students building a real self-driving vehicle.",
    },
    {
      title: "Put your tools to work",
      body: "Your sensors, dev boards, software or compute go straight into the hands of students using them every week.",
    },
    {
      title: "See your logo around",
      body: "On the vehicle, team apparel, workshop slides and this website.",
    },
    {
      title: "Every bit helps",
      body: "We're a young, growing team. Money, hardware or mentorship all make a big difference.",
    },
  ],
  photo: {
    src: "/photos/events/competition-1/comp1-award-winners",
    alt: "Seven award winners from our first competition standing in a row, each holding a certificate.",
  } satisfies Photo,
  photoNote: "what your support turns into",
  contactTitle: "Interested in sponsoring?",
  contactBody:
    "We'd love to talk about sponsorship, hardware or mentorship. Email our Finance Lead and we'll get back to you.",
  contactButton: "Email Yousef",
};
