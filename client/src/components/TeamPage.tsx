import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Cpu, Eye, Compass, Wrench, CheckCircle2, Clock, Sparkles } from "lucide-react";
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

interface TeamInfo {
  name: string;
  tagline: string;
  description: string;
  badgeVariant: "planning" | "perception" | "localization" | "build";
  icon: React.ReactNode;
  teamLeads: { name: string; imageURL?: string; role?: string }[];
  technologies?: string[] | { label: string; description: string }[];
  focusAreas: string[] | { label: string; description: string }[];
  keymilestones?: string[] | { label: string; description: string }[];
}

const teamData: Record<string, TeamInfo> = {
  "planning-and-control": {
    name: "Planning & Control",
    tagline: "Autonomous Decision Making & Motion Control",
    badgeVariant: "planning",
    icon: <Cpu size={28} />,
    teamLeads: [
      { name: "Aly Ashour", imageURL: AlyImg, role: "Sub-team Co-Lead" },
      { name: "Obaid Mohiud", imageURL: ObaidImg, role: "Sub-team Co-Lead" }
    ],
    description:
      "We design and implement motion planning, trajectory generation, and control algorithms that allow the vehicle to make split-second driving decisions and execute them accurately on drive-by-wire hardware.",
    focusAreas: [
      { label: "Path Planning", description: "Design graph search and optimization algorithms to generate collision-free trajectories between map waypoints." },
      { label: "State Estimation", description: "Track vehicle velocity, heading, and wheel odometry to feed real-time telemetry to system controllers." },
      { label: "Model Predictive Control", description: "Implement closed-loop MPC and PID feedback controllers to execute steering and throttle inputs with high precision." },
      { label: "Mission Control Console", description: "Engineered our custom mission control HUD to monitor telemetry, sensor inputs, and debug algorithms live." },
      { label: "Physics Simulation", description: "Created high-fidelity simulation environments in Gazebo and ROS 2 to validate algorithms before track deployment." },
      { label: "System Safety & Failsafes", description: "Architected deterministic constraint enforcement, emergency brake triggers, and fault handling systems." }
    ],
    keymilestones: [
      { label: "Completed", description: "Closed-loop waypoint navigation pipeline" },
      { label: "Completed", description: "Closed-loop feedback control (PID)" },
      { label: "Completed", description: "Linear kinematics simulation environment" },
      { label: "In Progress", description: "Traffic sign & obstacle handling state machine" },
      { label: "In Progress", description: "Model Predictive Controller (MPC) deployment" },
      { label: "In Progress", description: "BlackBerry QNX RTOS real-time control migration" },
      { label: "In Progress", description: "Full vehicle visualizer & telemetry stream" },
      { label: "Planned", description: "Multi-lane intersection navigation" },
    ],
    technologies: [
      { label: "Languages", description: "C++20 for real-time controllers, Python for simulation & tooling" },
      { label: "Frameworks", description: "ROS 2 Jazzy, Gazebo Harmonic, Nav2" },
      { label: "RTOS", description: "BlackBerry QNX for deterministic real-time execution" },
      { label: "Graphics & UI", description: "OpenGL and modern web telemetry visualizers" },
      { label: "CI/CD", description: "GitHub Actions automated test suite & linting" }
    ],
  },
  perception: {
    name: "Perception",
    tagline: "3D Spatial Intelligence & Computer Vision",
    badgeVariant: "perception",
    icon: <Eye size={28} />,
    description:
      "We interface with the multi-modal sensors on the vehicle including 3D LiDAR, stereoscopic depth cameras, and IMUs. We train deep vision models to detect lanes, classify objects, and construct 3D spatial representations.",
    teamLeads: [
      { name: "Tygo Crawley", imageURL: TygoImg, role: "Sub-team Co-Lead" },
      { name: "Ian Tan", imageURL: IanImg, role: "Sub-team Co-Lead" }
    ],
    focusAreas: [
      { label: "Sensor Ingestion & Calibration", description: "Performant multi-threaded ingestion of high-bandwidth camera and LiDAR point cloud streams with extrinsic calibration." },
      { label: "Lane Boundary Detection", description: "Deep learning models to estimate driveable road boundaries and lane centers under varying lighting conditions." },
      { label: "3D Object Detection", description: "Real-time YOLOv8/11 bounding box inference and 3D depth bounding for vehicles, pedestrians, and traffic signs." },
      { label: "LiDAR Point Cloud Segmentation", description: "Filtering ground planes and clustering obstacle point clouds for occupancy grid mapping." }
    ],
    keymilestones: [
      { label: "Completed", description: "Custom lane detection model deployment" },
      { label: "Completed", description: "Traffic sign detection & classification model" },
      { label: "Completed", description: "Annotated synthetic & real-world training dataset" },
      { label: "In Progress", description: "Simulated depth camera & point cloud environment" },
      { label: "In Progress", description: "2D camera to 3D coordinate space mappings" },
      { label: "In Progress", description: "Multi-sensor fusion perception pipeline" },
      { label: "Planned", description: "Real-world onboard Jetson edge inference testing" }
    ],
    technologies: [
      { label: "Languages", description: "Python, C++ for CUDA-accelerated inference" },
      { label: "Frameworks", description: "PyTorch, OpenCV, Point Cloud Library (PCL), ROS 2" },
      { label: "Models", description: "YOLOv8/11, Ultra-Fast-Lane-Detection-v2" },
      { label: "Hardware", description: "Stereo Depth Cameras, 128-beam LiDAR, NVIDIA Jetson" }
    ],
  },
  localization: {
    name: "Localization & Mapping",
    tagline: "High-Precision Pose & Environment Estimation",
    badgeVariant: "localization",
    icon: <Compass size={28} />,
    description:
      "The Localization Team creates high-definition spatial maps and ensures our autonomous vehicles can accurately determine their position and orientation in real-time using SLAM, Extended Kalman Filters, and RTK-GPS.",
    teamLeads: [
      { name: "Zain Syed", imageURL: ZainImg, role: "Sub-team Co-Lead" },
      { name: "Benjamin Namayandeh", imageURL: BenjImg, role: "Sub-team Co-Lead" }
    ],
    focusAreas: [
      { label: "HD Map Generation", description: "Creating dense, centimeter-accurate feature maps of test tracks and campus driving routes." },
      { label: "Multi-Sensor Fusion (EKF)", description: "Fusing wheel odometry, IMU angular velocity, and GPS coordinates via Extended Kalman Filtering." },
      { label: "LiDAR SLAM", description: "Simultaneous Localization and Mapping for GPS-denied environments using scan-matching algorithms." }
    ],
    keymilestones: [
      { label: "Completed", description: "Wheel odometry & IMU data pipeline" },
      { label: "Completed", description: "Extended Kalman Filter simulation" },
      { label: "In Progress", description: "RTK-GPS centimeter-accuracy integration" },
      { label: "In Progress", description: "Cartographer LiDAR SLAM mapping" },
      { label: "Planned", description: "HD map vector layer integration for global path planning" }
    ],
    technologies: [
      { label: "Languages", description: "C++, Python" },
      { label: "Frameworks", description: "Robot Localization (EKF), Cartographer SLAM, ROS 2" },
      { label: "Hardware", description: "RTK-GPS, High-precision 9-axis IMU, Wheel Encoders" }
    ]
  },
  build: {
    name: "Build & Mechanical",
    tagline: "Chassis Fabrication, Drive-by-Wire & Power Systems",
    badgeVariant: "build",
    icon: <Wrench size={28} />,
    description:
      "The Build Team handles the physical mechanical engineering, structural mounting, power distribution, thermal cooling, and electrical wiring harnesses of our autonomous vehicle platforms.",
    teamLeads: [
      { name: "Ritwick Vemula", role: "Mechanical Lead" },
      { name: "Nathanael Cadman-Neu", role: "Chassis & Hardware Lead" }
    ],
    focusAreas: [
      { label: "Drive-by-Wire Integration", description: "Designing electronic actuators for steering, braking, and throttle control." },
      { label: "Sensor Rigs & Vibration Dampening", description: "CAD designing and 3D printing custom mounts for LiDAR, cameras, and GPS antennas." },
      { label: "Power Distribution & Safety", description: "Custom power distribution boards, fused battery systems, and physical emergency stop switches." },
      { label: "Chassis Modification & Packaging", description: "Mechanical chassis alterations to securely house compute racks and cooling fans." }
    ],
    keymilestones: [
      { label: "Completed", description: "1/10th scale physical RC car platform" },
      { label: "Completed", description: "Sensor mounting brackets CAD design" },
      { label: "In Progress", description: "Full-scale golf cart steering actuator assembly" },
      { label: "In Progress", description: "Isolated power distribution unit for onboard compute" },
      { label: "Planned", description: "Full drive-by-wire track testing & calibration" }
    ],
    technologies: [
      { label: "CAD & CAM", description: "SolidWorks, Autodesk Fusion 360" },
      { label: "Electrical", description: "CAN Bus, Custom PCB Design, 12V/48V Power Distribution" },
      { label: "Fabrication", description: "3D Printing, Laser Cutting, CNC Milling, TIG Welding" }
    ]
  },
};

export const TeamPage: React.FC = () => {
  const { teamSlug } = useParams<{ teamSlug: string }>();
  const team = teamSlug ? teamData[teamSlug] : undefined;

  if (!team) {
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

        {/* Hero Section */}
        <section className="ds-team-page-hero">
          <div className="ds-team-page-badge-row">
            <Badge variant={team.badgeVariant} size="md" icon={team.icon}>
              AUTONOMOUS DIVISION
            </Badge>
            <Badge variant="cyan" size="sm" dot pulse>
              ACTIVE PROJECT
            </Badge>
          </div>

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

        {/* Focus Areas */}
        <section className="ds-team-page-section">
          <h3 className="ds-team-section-heading">Core Engineering Focus Areas</h3>
          <div className="ds-focus-grid">
            {team.focusAreas.map((item, index) => {
              const label = typeof item === "string" ? item : item.label;
              const desc = typeof item === "string" ? "" : item.description;
              return (
                <Card key={label} variant="glass" padding="lg" className="ds-focus-card">
                  <div className="ds-focus-card-top">
                    <span className="ds-mono ds-focus-index">{String(index + 1).padStart(2, "0")}</span>
                    <Sparkles size={16} className="ds-focus-sparkle" />
                  </div>
                  <h4 className="ds-focus-title">{label}</h4>
                  {desc && <p className="ds-focus-desc">{desc}</p>}
                </Card>
              );
            })}
          </div>
        </section>

        {/* Milestones */}
        {team.keymilestones && team.keymilestones.length > 0 && (
          <section className="ds-team-page-section">
            <h3 className="ds-team-section-heading">Division Milestones & Roadmap</h3>
            <div className="ds-milestones-grid">
              {team.keymilestones.map((item, index) => {
                const label = typeof item === "string" ? "Planned" : item.label;
                const desc = typeof item === "string" ? item : item.description;
                const isCompleted = label.toLowerCase().includes("completed");
                const isInProgress = label.toLowerCase().includes("in progress");

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
                      <p className="ds-milestone-text">{desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Technologies Used */}
        {team.technologies && team.technologies.length > 0 && (
          <section className="ds-team-page-section">
            <h3 className="ds-team-section-heading">Technologies, Tooling & Stack</h3>
            <div className="ds-tech-stack-grid">
              {team.technologies.map((item, index) => {
                const label = typeof item === "string" ? `Tech ${index + 1}` : item.label;
                const desc = typeof item === "string" ? item : item.description;
                return (
                  <Card key={label} variant="glass" padding="md" className="ds-tech-stack-card">
                    <span className="ds-tech-category">{label}</span>
                    <p className="ds-tech-details">{desc}</p>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Bottom Navigation to other teams */}
        <section className="ds-other-teams-section">
          <h4 className="ds-other-teams-title">Explore Other Sub-teams</h4>
          <div className="ds-other-teams-buttons">
            <Button to="/teams/planning-and-control" variant="secondary" size="sm">Planning & Control</Button>
            <Button to="/teams/perception" variant="secondary" size="sm">Perception</Button>
            <Button to="/teams/localization" variant="secondary" size="sm">Localization</Button>
            <Button to="/teams/build" variant="secondary" size="sm">Build</Button>
          </div>
        </section>

      </div>
    </TechGridBackground>
  );
};

export default TeamPage;
