/**
 * The /join page, and the three join steps that also appear at the bottom of the home page.
 */
import type { Photo } from "./types";

/** Real steps, in order. They get numbered circles. */
export const joinSteps = [
  { title: "Join our Discord", body: "It's where every announcement, meeting time and team chat lives." },
  { title: "Pick a team", body: "Planning & Control, Perception, Mapping & Localization or Build. You can switch later." },
  { title: "Come to a meeting", body: "Say hi to the leads and pick up your first task." },
];

export const joinPage = {
  title: "Come build ==with us==",
  lead: "We take new members every term from software, electrical, mechatronics and mechanical engineering.",
  stepsTitle: "Three steps in",
  discordButton: "Join us on Discord",
  photo: {
    src: "/photos/events/mnist-workshop/mnist-workshop-room",
    alt: "A room full of members working on laptops during the MNIST workshop.",
  } satisfies Photo,
  photoNote: "no experience needed, we teach as we go",
  benefitsTitle: "What you ==get out of it==",
  benefits: [
    {
      title: "Real hardware",
      body: "Work on the vehicle itself: LiDAR, stereo cameras and the onboard computer.",
      doodle: "wrench" as const,
    },
    {
      title: "Tools the industry uses",
      body: "ROS 2, PyTorch, C++, Gazebo and CAD, learned by building something real.",
      doodle: "pencil" as const,
    },
    {
      title: "Your people",
      body: "Make friends across software, electrical, mechatronics and mechanical.",
      doodle: "check" as const,
    },
  ],
};
