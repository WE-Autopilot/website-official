import { useParams, Link } from "react-router-dom";
import "../stylesheets/TeamPage.css";

import AlyImg from "../assets/Aly.webp";
import ObaidImg from "../assets/Obaid.webp";
import TygoImg from "../assets/Tygo.webp";
import IanImg from "../assets/Ian.webp";
import ZainImg from "../assets/Zain.webp";
import BenjImg from "../assets/Benjamin.webp";
interface TeamInfo {
  name: string;
  description: string;
  teamLeads: {name: string, imageURL?: string}[];
  technologies?: string[] | {label: string, description: string}[];
  focusAreas: string[] | {label: string, description: string}[];
  keymilestones?: string[] | {label: string, description: string}[];
  visuals?: string[];
  
}

const teamData: Record<string, TeamInfo> = {
  "planning-and-control": {
    name: "Planning and Control",
    teamLeads: [
      {name: "Aly Ashour", imageURL: AlyImg},
      {name: "Obaid Mohiud", imageURL: ObaidImg}
    ],
    description:
      "We design and implement motion planning, trajectory generation, and control algorithms that allow the car to make decisions and exectute them in the real world!",
focusAreas: [
      {label: "Path Planning", description: "Use algorithms to navigate through nodes and sketch paths between them."},
      {label: "State Estimation", description: "Determine and keep track of the car's overall state and use that to make system-level decisions."},
      {label: "Feedback Control", description: "Use feedback from the car's sensors to adjust its trajectory and ensure it follows the planned path accurately."},
      {label: "Console", description: "We also created the system console, through which we interact with AP1. This includes visuals and comands we can use to control and debug the entire system."},
      {label: "Simulation", description: "We create custom simulations to test the car from scratch."},
      {label: "System Safety", description: "We design system safety features. Namely constrain enforcement and fault handling between planning and control."}
    ],
keymilestones: [
    {label: "Completed", description: "Closed loop navigation"},
    {label: "Completed", description: "Closed loop control (PID)"},
    {label: "Completed", description: "Linear simulation completed"},
    {label: "In Progress", description: "Sign handling state machine"},
    {label: "In Progress", description: "Closed loop control 2 (MPC)"},
    {label: "In Progress", description: "Control RTOS (QNX) migration"},
    {label: "In Progress", description: "Full simulation complete with visualizer"},
    {label: "Planned", description: "Intersection navigation"},
    {label: "Planned", description: "Debugging and logging tools (cross-team)"},
    ],
    technologies: [
        {label: "Languages", description: "C++ for control algorithms, Python for simulation and tooling"},
        {label: "Frameworks", description: "ROS2 Jazzy and Gazebo Harmonic"},
        {label: "RTOS", description: "QNX for real-time control implementation"},
        {label: "Graphics Programming", description: "OpenGL for visualization and rendering"},
        {label: "Automated Testing", description: "GitHub Actions for continuous integration and testing"}
    ],
  },
  perception: {
    name: "Perception",
    description:
      "We interface with the sensors on the vehicle including: depth camera and inertial measurement unit (IMU). We then develop and train models to extract meaningful infromation such as lane lines, objects detected, and distances in 3D space, which allows the vehicle to 'perceive' the surrounding world",
    teamLeads: [
      {name: "Tygo Crawley", imageURL: TygoImg},
      {name: "Ian Tan", imageURL: IanImg}
    ],
    focusAreas: [
      {label: "Sensor data ingestion and calibration", description: "Enable successful use of sensors, performant ingestion of that data, and calibration of the sensors so that they work together to create a rich percieved environment"},
      {label: "Lane detection", description: "Enable detection of left and right lane lines so that the vehicle knows its boundaries."},
      {label: "Sign detection", description: "Enable detection of traffic signs via depth camera. Classification of the sign and distance from the vehicle are the main outputs that allow the vehicle to navigate correctly when encounting traffic signs"},
    ],
    keymilestones: [
      {label: "Completed", description: "Lane detection model"},
      {label: "Completed", description: "Stop sign detection model"},
      {label: "Completed", description: "Train and test dataset"},
      {label: "In Progress", description: "Simulated depth camera enviornment"},
      {label: "In Progress", description: "Coordinate space mappings between 2D and 3D camera data"},
      {label: "In Progress", description: "Information pipeline"},
      {label: "Planned", description: "Real-world inference testing with depth camera"},
      {label: "Planned", description: "Whole system integration (cross-team system)"}
    ],
    technologies: [
      {label: "Languages", description: "Python for model development and testing"},
      {label: "Frameworks", description: "PyTorch, and openCV for model development, ROS2 Jazzy for real-time implementation"},
      {label: "Models", description: "yolo11, ultra-fast-lane-detection2"},
      {label: "Hardware", description: "Depth camera, IMU"}
    ],
  },
  localization: {
    name: "Localization",
    description:
      "The Localization Team is responsible for creating accurate maps and ensuring that our autonomous vehicles can determine their position within those maps. They work with various sensors and algorithms to achieve precise localization in diverse environments.",
    teamLeads: [
      {name: "Zain Syed", imageURL: ZainImg},
      {name: "Benjamin Namayandeh", imageURL: BenjImg}
    ],
    focusAreas: [
      "HD map creation",
      "GPS and IMU integration",
      "Simultaneous Localization and Mapping (SLAM)",
    ],
  },
  build: {
    name: "Build",
    description:
      "The Build Team handles the physical design, fabrication, and integration of hardware systems on our autonomous vehicle platform. They ensure all mechanical and electrical components work together reliably.",
    teamLeads: [
      {name: "Ritwick Vemula"},
      {name: "Nathanael Cadman-Neu"}
    ],
    focusAreas: [
      "Vehicle platform integration",
      "Sensor mounting and wiring",
      "Hardware prototyping and testing",
    ],
  },
};

function TeamPage() {
  const { teamSlug } = useParams<{ teamSlug: string }>();
  const team = teamSlug ? teamData[teamSlug] : undefined;

  if (!team) {
    return (
      <div className="team-page">
        <div className="team-page-content">
          <h1>Team Not Found</h1>
          <p>
            The team you're looking for doesn't exist.{" "}
            <Link to="/">Go back home</Link>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="team-page">
      <div className="team-page-content">
        {/* Hero section */}
        <section className="team-page-hero">
          <h1 className="team-page-title">{team.name}</h1>
          <hr className="team-page-divider" />
          <p className="team-page-description">{team.description}</p>
        </section>

        {/* Team Leads */}
        {team.teamLeads && team.teamLeads.length > 0 && (
          <section className="team-page-section">
            <h2 className="team-page-subtitle">Team Leads</h2>
            <div className="team-leads-grid">
              {team.teamLeads.map((lead) => (
                <div key={lead.name} className="team-lead-card">
                  <div className="team-lead-avatar">
                    {lead.imageURL ? (
                      <img src={lead.imageURL} alt={lead.name} className="team-lead-avatar-image" />
                    ) : (
                      lead
                        .name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    )}
                  </div>
                  <span className="team-lead-name">{lead.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Focus Areas */}
        <section className="team-page-section">
          <h2 className="team-page-subtitle">What We Work On</h2>
          <div className="focus-areas-grid">
            {team.focusAreas.map((item, index) => (
              <div
                key={typeof item === "string" ? item : item.label}
                className="focus-card"
              >
                <span className="focus-card-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {typeof item === "string" ? (
                  <h3 className="focus-card-title">{item}</h3>
                ) : (
                  <>
                    <h3 className="focus-card-title">{item.label}</h3>
                    <p className="focus-card-desc">{item.description}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Milestones Timeline */}
        {team.keymilestones && team.keymilestones.length > 0 && (
          <section className="team-page-section">
            <h2 className="team-page-subtitle">Key Milestones</h2>
            <div className="milestones-timeline">
              {team.keymilestones.map((item, index) => {
                const label =
                  typeof item === "string" ? "" : item.label.toLowerCase();
                const statusClass = label.includes("completed")
                  ? "completed"
                  : label.includes("in progress")
                  ? "in-progress"
                  : "planned";
                return (
                  <div
                    key={index}
                    className={`milestone-item milestone-${statusClass}`}
                  >
                    <div className="milestone-dot" />
                    <div className="milestone-content">
                      {typeof item === "string" ? (
                        <p className="milestone-text">{item}</p>
                      ) : (
                        <>
                          <span className={`milestone-badge badge-${statusClass}`}>
                            {item.label}
                          </span>
                          <p className="milestone-text">{item.description}</p>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Technologies */}
        {team.technologies && team.technologies.length > 0 && (
          <section className="team-page-section">
            <h2 className="team-page-subtitle">Technologies We Use</h2>
            <div className="tech-grid">
              {team.technologies.map((item) => (
                <div
                  key={typeof item === "string" ? item : item.label}
                  className="tech-card"
                >
                  {typeof item === "string" ? (
                    <span className="tech-label">{item}</span>
                  ) : (
                    <>
                      <span className="tech-label">{item.label}</span>
                      <span className="tech-desc">{item.description}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default TeamPage;
