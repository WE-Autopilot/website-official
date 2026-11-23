/**
 * Events on /gallery. The page sorts them newest first by `date`, so the
 * order here doesn't matter. Dates come from the photos' camera timestamps.
 */
import type { Photo } from "./types";

export interface GalleryEvent {
  /** Used in the URL: /gallery#<id> */
  id: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  /** One or two short sentences. */
  caption: string;
  photos: Photo[];
}

const p = (path: string, alt: string): Photo => ({ src: `/photos/events/${path}`, alt });

export const galleryEvents: GalleryEvent[] = [
  {
    id: "agm-2025",
    title: "AGM 2025",
    date: "2025-09-23",
    caption: "Year two started in a packed lecture hall, with pizza after.",
    photos: [
      p("agm-2025/agm-2025-lecture-hall", "A packed lecture hall seen from the side, with the club's slides on the projector."),
      p("agm-2025/agm-2025-crowd-group", "Everyone at the AGM lined up at the front of the room for a group photo."),
      p("agm-2025/agm-2025-room-wide", "Wide shot of the lecture hall from the back as members find their seats."),
      p("agm-2025/agm-2025-audience", "The audience facing the screen, which shows a slide titled Our club."),
      p("agm-2025/agm-2025-audience-2", "The audience from a second angle, watching the Our club slide."),
      p("agm-2025/agm-2025-members-qr", "Three members smiling in front of the sign-up QR code slide."),
      p("agm-2025/agm-2025-members-duo", "Two members smiling together after the talk."),
      p("agm-2025/agm-2025-mingling", "Members talking over pizza boxes after the meeting."),
      p("agm-2025/agm-2025-pizza", "A crowd around the pizza table at the back of the hall."),
      p("agm-2025/agm-2025-candid", "Members chatting and laughing near the front of the room."),
      p("agm-2025/agm-2025-exec-team", "The 2025 exec team standing in a row at the front of the room."),
    ],
  },
  {
    id: "competition-2",
    title: "Competition 2: the RC track race",
    date: "2025-05-01",
    caption:
      "The code from the simulator went onto real 1/10-scale RC cars. Black team took first with 60 points; red team scored 20.",
    photos: [
      p("competition-2/comp2-track-above", "The race track from above, laid out on the floor with black barriers."),
      p("competition-2/comp2-track", "The race track set up in a big open hall, with a screen on the far wall."),
      p("cars/rc-cars", "Two 1/10-scale RC cars on a workbench, one with its electronics exposed."),
      p("competition-2/comp2-group", "Members, competitors and guests together after the race."),
    ],
  },
  {
    id: "competition-1",
    title: "Competition 1: the simulation race",
    date: "2025-03-15",
    caption:
      "The red and black teams raced their driving code in the F1TENTH Gym simulator, then we handed out awards.",
    photos: [
      p("competition-1/comp1-award-winners", "Seven award winners standing in a row, each holding a certificate."),
      p("competition-1/comp1-group-stairs", "A big group photo on the stairs after the competition."),
      p("competition-1/comp1-group-hallway", "The red team posing together in the hallway."),
      p("competition-1/comp1-team", "The black team posing together in the hallway."),
      p("competition-1/comp1-award-handshake", "A member in a red shirt shaking hands as they receive a certificate at the whiteboard."),
      p("competition-1/comp1-award-ian", "Ian Tan receiving an award for outstanding perception work."),
      p("competition-1/comp1-award-ben", "Benjamin Namayandeh receiving an award for exceptional commits to the codebase."),
      p("competition-1/comp1-award-cadence", "Cadence McGillicuddy receiving an award for technical dedication."),
      p("competition-1/comp1-award-logan", "Logan Ouellette receiving an award for systems integration."),
      // TODO(content): full names and what the award was for. The old site only had the file names (RedTeamAwardJustin, RedTeamAwardKilhan).
      p("competition-1/comp1-award-justin", "Justin from the red team holding an award certificate."),
      p("competition-1/comp1-award-kilhan", "Kilhan from the red team holding an award certificate."),
    ],
  },
  {
    id: "mnist-workshop",
    title: "MNIST workshop",
    date: "2025-01-30",
    caption: "Our first workshop: teaching a computer to read handwritten digits.",
    photos: [
      p("mnist-workshop/mnist-presenter", "A presenter pointing at a handwritten digit drawn on a pixel grid, next to the equations behind it."),
      p("mnist-workshop/mnist-workshop-room", "A room full of members working on laptops during the workshop."),
      p("mnist-workshop/mnist-defining-problem", "A presenter next to a slide titled Defining the problem, showing a digit on a pixel grid."),
      p("mnist-workshop/mnist-rule-based", "A presenter at the podium in front of a slide titled Rule-based approach."),
      p("mnist-workshop/mnist-speaker", "A member presenting in front of a slide titled Define basic structure, data flow and outputs."),
      p("mnist-workshop/mnist-workshop-wide", "Wide shot of the workshop room with slides on two screens."),
      p("mnist-workshop/mnist-pan-out", "Members at their desks watching the workshop slides."),
      p("mnist-workshop/mnist-numbers", "Rows of handwritten digits from 0 to 9 from the MNIST dataset, white on black."),
    ],
  },
  {
    // TODO(content): confirm the name. The photo manifest calls this "Build night", but the old site captioned
    // the same group photo "First Ever AGM Meeting" (same night, January 26, 2025).
    id: "build-night",
    title: "Build night",
    date: "2025-01-26",
    caption: "Pitches, whiteboard sketches and one big group photo to end the night.",
    photos: [
      p("build-night/build-night-group", "A large group photo with everyone visible, some sitting on the floor in front."),
      p("build-night/build-night-pitch", "A member in a blazer pitching an idea, with a drawing on the whiteboard behind."),
      p("build-night/build-night-team", "Members huddled around a standing table with a laptop."),
      p("build-night/build-night-whiteboard", "Two members sketching on a whiteboard."),
    ],
  },
  {
    id: "red-team-meeting",
    title: "Red team meeting",
    date: "2025-01-24",
    caption: "The red team, one of our two competition teams, hard at work.",
    photos: [
      p("red-team-meeting/red-team-meeting", "Members working on laptops around tables during a team meeting."),
      p("red-team-meeting/red-team-presentation", "A member presenting to the team at the front of the room."),
    ],
  },
];
