import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Cpu, Eye, Compass, Wrench, CheckCircle2, Clock } from "lucide-react";
import Badge from "./design-system/Badge";
import Card from "./design-system/Card";
import Button from "./design-system/Button";
import TechGridBackground from "./design-system/TechGridBackground";
import "../stylesheets/TeamPage.css";

import AlyImg from "../assets/Aly.webp";
import ObaidImg from "../assets/Obaid.webp";
import TygoImg from "../assets/Tygo.webp";
import IanImg from "../assets/Ian.webp";
import ZainImg from "../assets/Zain.webp";
import BenjImg from "../assets/Benjamin.webp";

interface TechGroup {
  category: string;
  items: string[];
}

interface TeamInfo {
  name: string;
  tagline: string;
  description: string;
  badgeVariant: "planning" | "perception" | "localization" | "build";
  icon: React.ReactNode;
  teamLeads: { name: string; imageURL?: string; role?: string }[];
  technologies: TechGroup[];
  focusAreas: { label: string; description: string }[];
  keymilestones: { label: string; description: string }[];
}

const allSubteams = [
  { slug: "planning-and-control", label: "Planning & Control" },
  { slug: "perception", label: "Perception" },
  { slug: "localization", label: "Localization & Mapping" },
  { slug: "build", label: "Build & Mechanical" },
];

const teamData: Record<string, TeamInfo> = {
  "planning-and-control": {
    name: "Planning & Control",
    tagline: "Path Planning, State Machines & Feedback Control",
    badgeVariant: "planning",
    icon: <Cpu size={28} />,
    teamLeads: [
      { name: "Aly Ashour", imageURL: AlyImg, role: "Planning & Control Lead" },
      { name: "Obaid Mohiuddin", imageURL: ObaidImg, role: "Planning & Control Lead" }
    ],
    description:
      "We design and write motion planning algorithms, decision state machines, and feedback controllers in ROS 2 that let the car navigate waypoints, avoid obstacles, and execute smooth steering and throttle commands.",
    focusAreas: [
      { label: "Path Planning", description: "Designing algorithms to generate feasible, collision-free paths through waypoint tracks." },
      { label: "State Machines", description: "Writing logic to handle stops, track intersections, and unexpected obstacle events." },
      { label: "Feedback Controllers", description: "Implementing PID and Model Predictive Control (MPC) to closely follow target speed and steering angles." },
      { label: "Simulation Testing", description: "Using Gazebo and custom ROS 2 simulations to test algorithms before testing on the physical vehicle." },
      { label: "Safety Constraints", description: "Building safety checks and emergency stop logic to keep testing safe." }
    ],
    keymilestones: [
      { label: "Completed", description: "Closed-loop waypoint navigation pipeline" },
      { label: "Completed", description: "Closed-loop feedback control (PID)" },
      { label: "Completed", description: "Linear simulation testing environment" },
      { label: "In Progress", description: "Traffic sign state machine logic" },
      { label: "In Progress", description: "Model Predictive Control (MPC) tuning" },
      { label: "In Progress", description: "BlackBerry QNX RTOS integration" },
      { label: "Planned", description: "Complex intersection navigation" },
    ],
    technologies: [
      { category: "Languages", items: ["C++20", "Python 3.10+"] },
      { category: "Frameworks & Simulation", items: ["ROS 2 Jazzy", "Gazebo Harmonic", "Rviz2"] },
      { category: "Real-Time OS", items: ["BlackBerry QNX RTOS", "POSIX Real-Time Threads"] },
      { category: "Tooling & CI", items: ["Git & GitHub Actions", "Docker", "colcon build"] }
    ],
  },
  perception: {
    name: "Perception",
    tagline: "Computer Vision, LiDAR Scans & Object Detection",
    badgeVariant: "perception",
    icon: <Eye size={28} />,
    description:
      "We interface with cameras and LiDAR sensors on the car, training vision models to detect lanes, recognize traffic signs, and identify obstacles in real time.",
    teamLeads: [
      { name: "Tygo Crawley", imageURL: TygoImg, role: "Perception Co-Lead" },
      { name: "Ian Tan", imageURL: IanImg, role: "Perception Co-Lead" }
    ],
    focusAreas: [
      { label: "Sensor Drivers & Feeds", description: "Setting up reliable data pipelines from stereo cameras, LiDAR, and IMUs." },
      { label: "Lane Detection", description: "Training models to detect track boundaries and calculate the vehicle's offset from lane centers." },
      { label: "Traffic Sign Detection", description: "Using YOLO models to recognize stop signs, speed markers, and traffic cues." },
      { label: "LiDAR Obstacle Filtering", description: "Segmenting ground returns from actual obstacles to create clean point clouds." }
    ],
    keymilestones: [
      { label: "Completed", description: "Lane detection model trained and verified" },
      { label: "Completed", description: "Stop sign classification model" },
      { label: "Completed", description: "Collected and annotated training datasets" },
      { label: "In Progress", description: "Depth camera 3D distance estimation" },
      { label: "In Progress", description: "LiDAR point cloud clustering pipeline" },
      { label: "Planned", description: "Real-time edge inference on onboard Jetson" }
    ],
    technologies: [
      { category: "Languages", items: ["Python", "C++"] },
      { category: "Vision & ML Frameworks", items: ["PyTorch", "OpenCV", "TensorRT", "CUDA"] },
      { category: "Models & Architectures", items: ["YOLOv8 / YOLOv11", "Ultra-Fast-Lane-Detection"] },
      { category: "Compute & Sensors", items: ["NVIDIA Jetson AGX Orin", "Stereo Depth Camera", "3D LiDAR"] }
    ],
  },
  localization: {
    name: "Localization & Mapping",
    tagline: "State Estimation, SLAM & Sensor Fusion",
    badgeVariant: "localization",
    icon: <Compass size={28} />,
    description:
      "We build systems that estimate the vehicle's exact position, heading, and velocity on the track using sensor fusion (Extended Kalman Filters), GPS, and IMU data.",
    teamLeads: [
      { name: "Zain Syed", imageURL: ZainImg, role: "Localization Lead" },
      { name: "Benjamin Namayandeh", imageURL: BenjImg, role: "Localization Lead" }
    ],
    focusAreas: [
      { label: "Sensor Fusion (EKF)", description: "Fusing wheel encoders, IMU angular rates, and GPS fixes using Extended Kalman Filters." },
      { label: "Track Mapping", description: "Building maps of testing areas and tracks to provide reference coordinates to planning." },
      { label: "SLAM Integration", description: "Testing simultaneous localization and mapping for reliable positioning." }
    ],
    keymilestones: [
      { label: "Completed", description: "Wheel odometry & IMU data pipeline" },
      { label: "Completed", description: "Extended Kalman Filter simulation" },
      { label: "In Progress", description: "RTK-GPS centimeter positioning integration" },
      { label: "In Progress", description: "LiDAR SLAM track mapping" },
      { label: "Planned", description: "Full map integration with path planner" }
    ],
    technologies: [
      { category: "Languages", items: ["C++", "Python"] },
      { category: "Estimation & SLAM", items: ["Robot Localization (EKF)", "Cartographer SLAM", "Nav2"] },
      { category: "Sensors & Hardware", items: ["RTK-GPS (Centimeter accuracy)", "9-Axis IMU", "Optical Wheel Encoders"] },
      { category: "Simulation & Tools", items: ["ROS 2 bag analysis", "Foxglove Studio", "Rviz2"] }
    ]
  },
  build: {
    name: "Build & Mechanical",
    tagline: "Chassis Modifications, Sensor Mounts & Electrical Wiring",
    badgeVariant: "build",
    icon: <Wrench size={28} />,
    description:
      "We design custom mechanical brackets, fabricate mounts for sensors, wire power distribution boards, and integrate steering and braking actuators on the vehicle platform.",
    teamLeads: [
      { name: "Ritwick Vemula", role: "Build & Mechanical Lead" },
      { name: "Nathanael Cadman-Neu", role: "Chassis & Integration Lead" }
    ],
    focusAreas: [
      { label: "Sensor Mounts in CAD", description: "Designing and 3D printing vibration-resistant mounts for LiDAR, cameras, and GPS antennas." },
      { label: "Drive-by-Wire Actuation", description: "Integrating electric motors and controllers for electronic steering and braking control." },
      { label: "Power & Wiring Harnesses", description: "Routing clean wiring, fuse blocks, emergency switches, and 12V/48V step-downs." },
      { label: "Chassis Fabrication", description: "Custom mounting racks to safely hold the onboard computers and cooling fans." }
    ],
    keymilestones: [
      { label: "Completed", description: "1/10th scale RC car testing platform" },
      { label: "Completed", description: "Custom 3D printed sensor brackets" },
      { label: "In Progress", description: "Steering actuator mounting and linkage" },
      { label: "In Progress", description: "Onboard compute power distribution" },
      { label: "Planned", description: "Full vehicle drive-by-wire integration" }
    ],
    technologies: [
      { category: "CAD & Modeling", items: ["SolidWorks", "Autodesk Fusion 360", "Onshape"] },
      { category: "Electronics & Power", items: ["CAN Bus Network", "Microcontrollers (STM32/ESP32)", "Relays & Fuse Distribution"] },
      { category: "Drive-by-Wire Hardware", items: ["Steering Actuators", "Electronic Throttle DAC", "Braking Servos"] },
      { category: "Fabrication", items: ["3D Printing (PETG/Carbon Fiber)", "Laser Cutting", "Custom Wire Harnesses"] }
    ]
  },
};

export const TeamPage: React.FC = () => {
  const { teamSlug } = useParams<{ teamSlug: string }>();
  const team = teamSlug ? teamData[teamSlug] : undefined;

  if (!team || !teamSlug) {
    return (
      <TechGridBackground variant="both" className="ds-team-page-root">
        <div className="ds-team-page-container ds-not-found-box">
          <h2>Sub-team Not Found</h2>
          <p>The sub-team you are looking for does not exist.</p>
          <Button to="/" variant="primary" leftIcon={<ArrowLeft size={16} />}>
            Back to Home
          </Button>
        </div>
      </TechGridBackground>
    );
  }

  // Filter out the current team from other subteams
  const otherTeams = allSubteams.filter((t) => t.slug !== teamSlug);

  return (
    <TechGridBackground variant="both" glowColor="both" className="ds-team-page-root">
      <div className="ds-team-page-container">
        
        {/* Back Link */}
        <div className="ds-team-page-back">
          <Link to="/team" className="ds-back-link">
            <ArrowLeft size={16} />
            <span>All Teams & Leadership</span>
          </Link>
        </div>

        {/* Hero Section (Removed Engineering sub-team pill) */}
        <section className="ds-team-page-hero">
          <h1 className="ds-team-page-title">{team.name}</h1>
          <p className="ds-team-page-tagline">{team.tagline}</p>
          <p className="ds-team-page-desc">{team.description}</p>
        </section>

        {/* Team Leads */}
        {team.teamLeads && team.teamLeads.length > 0 && (
          <section className="ds-team-page-section">
            <h3 className="ds-team-section-heading">Sub-team Leadership</h3>
            <div className="ds-team-leads-grid">
              {team.teamLeads.map((lead) => (
                <Card key={lead.name} variant="glass" padding="md" className="ds-team-lead-card">
                  <div className="ds-lead-avatar-wrap">
                    {lead.imageURL ? (
                      <img src={lead.imageURL} alt={lead.name} className="ds-lead-avatar-img" />
                    ) : (
                      <div className="ds-lead-avatar-fallback">
                        {lead.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                    )}
                  </div>
                  <div className="ds-lead-info">
                    <h4 className="ds-lead-name">{lead.name}</h4>
                    <span className="ds-lead-role">{lead.role || "Team Lead"}</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Focus Areas (Inline title with number, sparkle removed) */}
        <section className="ds-team-page-section">
          <h3 className="ds-team-section-heading">What We Work On</h3>
          <div className="ds-focus-grid">
            {team.focusAreas.map((item, index) => (
              <Card key={item.label} variant="glass" padding="lg" className="ds-focus-card">
                <div className="ds-focus-header-inline">
                  <span className="ds-mono ds-focus-index">{String(index + 1).padStart(2, "0")}</span>
                  <h4 className="ds-focus-title">{item.label}</h4>
                </div>
                {item.description && <p className="ds-focus-desc">{item.description}</p>}
              </Card>
            ))}
          </div>
        </section>

        {/* Milestones */}
        {team.keymilestones && team.keymilestones.length > 0 && (
          <section className="ds-team-page-section">
            <h3 className="ds-team-section-heading">Sub-team Milestones</h3>
            <div className="ds-milestones-grid">
              {team.keymilestones.map((item, index) => {
                const isCompleted = item.label.toLowerCase().includes("completed");
                const isInProgress = item.label.toLowerCase().includes("in progress");

                return (
                  <div key={index} className="ds-milestone-row">
                    <div className="ds-milestone-status-col">
                      {isCompleted ? (
                        <Badge variant="success" size="sm" icon={<CheckCircle2 size={12} />}>Completed</Badge>
                      ) : isInProgress ? (
                        <Badge variant="purple" size="sm" dot pulse icon={<Clock size={12} />}>In Progress</Badge>
                      ) : (
                        <Badge variant="outline" size="sm">Planned</Badge>
                      )}
                    </div>
                    <div className="ds-milestone-text-col">
                      <p className="ds-milestone-text">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Technologies Used (Rendered as lists instead of paragraphs) */}
        {team.technologies && team.technologies.length > 0 && (
          <section className="ds-team-page-section">
            <h3 className="ds-team-section-heading">Tools & Technologies</h3>
            <div className="ds-tech-stack-grid">
              {team.technologies.map((tech) => (
                <Card key={tech.category} variant="glass" padding="md" className="ds-tech-stack-card">
                  <span className="ds-tech-category">{tech.category}</span>
                  <ul className="ds-tech-items-list">
                    {tech.items.map((item, idx) => (
                      <li key={idx} className="ds-tech-list-item">
                        <span className="ds-tech-bullet" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Navigation (Current sub-team excluded) */}
        <section className="ds-other-teams-section">
          <h4 className="ds-other-teams-title">Explore Other Sub-teams</h4>
          <div className="ds-other-teams-buttons">
            {otherTeams.map((t) => (
              <Button key={t.slug} to={`/teams/${t.slug}`} variant="secondary" size="sm">
                {t.label}
              </Button>
            ))}
          </div>
        </section>

      </div>
    </TechGridBackground>
  );
};

export default TeamPage;
