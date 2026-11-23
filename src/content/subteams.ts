/**
 * The four technical sub-teams. Each one gets a page at /teams/<slug>.
 * Leads come from team.ts (everyone with a role in the matching group).
 */
import type { GroupId } from "./team";
import type { DoodleName, Photo } from "./types";

export type MilestoneStatus = "done" | "in-progress" | "planned";

export interface Subteam {
  /** The URL: /teams/<slug>. Don't change it; people link to these. */
  slug: string;
  /** Group in team.ts whose members are this sub-team's leads. */
  group: GroupId;
  name: string;
  doodle: DoodleName;
  /** One line, used on cards. */
  summary: string;
  /** Handwritten note under the title. 12 words or fewer. */
  note: string;
  /** A short paragraph at the top of the page. */
  description: string;
  focusAreas: { label: string; description: string }[];
  milestones: { status: MilestoneStatus; label: string }[];
  techStack: { category: string; items: string[] }[];
  /** One or two photos. */
  photos: Photo[];
}

export const subteams: Subteam[] = [
  {
    slug: "planning-and-control",
    group: "planning-and-control",
    name: "Planning & Control",
    doodle: "wheel",
    summary: "Picks a safe path, then turns it into steering, throttle and braking.",
    note: "we decide where the car goes next",
    description:
      "We write the motion planners, state machines and feedback controllers in ROS 2 that take the car from waypoint to waypoint, steer around obstacles and keep the ride smooth.",
    focusAreas: [
      { label: "Path planning", description: "Finding paths through a track that are safe and actually drivable." },
      { label: "State machines", description: "Deciding what to do at stops, intersections and when something unexpected shows up." },
      { label: "Feedback control", description: "PID and model predictive control (MPC) to hold the target speed and steering angle." },
      { label: "Simulation", description: "Testing in Gazebo and our own ROS 2 sims before anything runs on the vehicle." },
      { label: "Safety", description: "Safety checks and an emergency stop, so testing stays boring in the good way." },
    ],
    milestones: [
      { status: "done", label: "Closed-loop waypoint navigation" },
      { status: "done", label: "PID feedback control" },
      { status: "done", label: "Linear simulation test setup" },
      { status: "in-progress", label: "Traffic sign state machine" },
      { status: "in-progress", label: "MPC tuning" },
      { status: "in-progress", label: "BlackBerry QNX integration" },
      { status: "planned", label: "Navigating complex intersections" },
    ],
    techStack: [
      { category: "Languages", items: ["C++20", "Python 3.10+"] },
      { category: "Frameworks and simulation", items: ["ROS 2 Jazzy", "Gazebo Harmonic", "RViz2"] },
      { category: "Real-time OS", items: ["BlackBerry QNX", "POSIX real-time threads"] },
      { category: "Tooling", items: ["Git and GitHub Actions", "Docker", "colcon"] },
    ],
    photos: [
      {
        src: "/photos/events/mnist-workshop/mnist-speaker",
        alt: "A member presenting in front of a slide titled Define basic structure, data flow and outputs.",
      },
      {
        src: "/photos/events/red-team-meeting/red-team-presentation",
        alt: "A member standing at the front of a classroom presenting to their team.",
      },
    ],
  },
  {
    slug: "perception",
    group: "perception",
    name: "Perception",
    doodle: "eye",
    summary: "Turns camera and LiDAR data into lanes, signs and obstacles.",
    note: "we teach the car to see",
    description:
      "We work with the cameras and LiDAR on the vehicle and train vision models that find lane lines, read traffic signs and spot obstacles in real time.",
    focusAreas: [
      { label: "Sensor feeds", description: "Reliable data pipelines from the stereo camera, LiDAR and IMU." },
      { label: "Lane detection", description: "Finding track edges and working out how far the car is from the lane centre." },
      { label: "Traffic signs", description: "YOLO models that recognise stop signs, speed limits and other cues." },
      { label: "LiDAR obstacles", description: "Separating the ground from real obstacles to get clean point clouds." },
    ],
    milestones: [
      { status: "done", label: "Lane detection model trained and checked" },
      { status: "done", label: "Stop sign classifier" },
      { status: "done", label: "Training datasets collected and labelled" },
      { status: "in-progress", label: "Distance estimates from the depth camera" },
      { status: "in-progress", label: "LiDAR point cloud clustering" },
      { status: "planned", label: "Real-time inference on the onboard Jetson" },
    ],
    techStack: [
      { category: "Languages", items: ["Python", "C++"] },
      { category: "Vision and ML", items: ["PyTorch", "OpenCV", "TensorRT", "CUDA"] },
      { category: "Models", items: ["YOLOv8 and YOLOv11", "Ultra-Fast-Lane-Detection"] },
      { category: "Compute and sensors", items: ["NVIDIA Jetson AGX Orin", "Stereo depth camera", "3D LiDAR"] },
    ],
    photos: [
      {
        src: "/photos/events/mnist-workshop/mnist-defining-problem",
        alt: "A presenter next to a slide titled Defining the problem, showing a handwritten digit on a pixel grid.",
      },
    ],
  },
  {
    slug: "localization",
    group: "localization",
    name: "Mapping & Localization",
    doodle: "pin",
    summary: "Works out exactly where the car is, and maps where it drives.",
    note: "we keep the car from getting lost",
    description:
      "We estimate the vehicle's position, heading and speed by fusing GPS, IMU and wheel data with Extended Kalman Filters, and we build the maps the planners drive on.",
    focusAreas: [
      { label: "Sensor fusion", description: "Combining wheel encoders, IMU and GPS fixes with an Extended Kalman Filter." },
      { label: "Mapping", description: "Building maps of our test areas so planning has coordinates to work with." },
      { label: "SLAM", description: "Testing simultaneous localization and mapping for positioning we can trust." },
    ],
    milestones: [
      { status: "done", label: "Wheel odometry and IMU data pipeline" },
      { status: "done", label: "Extended Kalman Filter in simulation" },
      { status: "in-progress", label: "RTK-GPS for centimetre-level positioning" },
      { status: "in-progress", label: "LiDAR SLAM mapping" },
      { status: "planned", label: "Maps fed straight into the path planner" },
    ],
    techStack: [
      { category: "Languages", items: ["C++", "Python"] },
      { category: "Estimation and SLAM", items: ["robot_localization (EKF)", "Cartographer", "Nav2"] },
      { category: "Sensors", items: ["RTK-GPS", "9-axis IMU", "Optical wheel encoders"] },
      { category: "Tools", items: ["ROS 2 bags", "Foxglove Studio", "RViz2"] },
    ],
    photos: [
      {
        src: "/photos/events/red-team-meeting/red-team-meeting",
        alt: "Members working on laptops around tables during a team meeting.",
      },
    ],
  },
  {
    slug: "build",
    group: "build",
    name: "Build & Mechanical",
    doodle: "wrench",
    summary: "Mounts the sensors, wires the power and makes the car drivable by computer.",
    note: "if it bolts on, it starts here",
    description:
      "We design brackets and sensor mounts, wire power distribution, and fit the steering and braking actuators that let software drive the vehicle.",
    focusAreas: [
      { label: "Sensor mounts", description: "CAD and 3D-printed mounts for the LiDAR, cameras and GPS antennas that don't shake loose." },
      { label: "Drive-by-wire", description: "Motors and controllers for electronic steering and braking." },
      { label: "Power and wiring", description: "Tidy harnesses, fuse blocks, emergency stop switches and 12 V/48 V step-downs." },
      { label: "Chassis work", description: "Racks that hold the onboard computers and their cooling safely." },
    ],
    milestones: [
      { status: "done", label: "1/10-scale RC car test platform" },
      { status: "done", label: "3D-printed sensor brackets" },
      { status: "in-progress", label: "Steering actuator mount and linkage" },
      { status: "in-progress", label: "Power distribution for onboard compute" },
      { status: "planned", label: "Full drive-by-wire on the vehicle" },
    ],
    techStack: [
      { category: "CAD", items: ["SolidWorks", "Fusion 360", "Onshape"] },
      { category: "Electronics and power", items: ["CAN bus", "STM32 and ESP32", "Relays and fuse distribution"] },
      { category: "Drive-by-wire", items: ["Steering actuators", "Electronic throttle DAC", "Braking servos"] },
      { category: "Fabrication", items: ["3D printing (PETG, carbon fibre)", "Laser cutting", "Wire harnesses"] },
    ],
    photos: [
      {
        src: "/photos/events/cars/rc-cars",
        alt: "Two 1/10-scale RC cars on a workbench, one with its electronics exposed.",
      },
      {
        src: "/photos/events/build-night/build-night-team",
        alt: "Members huddled around a standing table with a laptop at build night.",
      },
    ],
  },
];
