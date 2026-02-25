import { useParams, Link } from "react-router-dom";
import "../stylesheets/TeamPage.css";

interface TeamInfo {
  name: string;
  description: string;
  teamLeads?: string[];
  technologies?: string[] | {label: string, description: string}[];
  focusAreas: string[] | {label: string, description: string}[];
  keymilestones?: string[] | {label: string, description: string}[];
  visuals?: string[];
  
}

const teamData: Record<string, TeamInfo> = {
  "planning-and-control": {
    name: "Planning and Control",
    teamLeads: ["Aly Ashour", "Obaid Mohiud"],
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
        {label: "RTOS", description: "QNX for real-time control implementation"}
    ],
  },
  perception: {
    name: "Perception",
    description:
      "The Perception Team develops the algorithms and systems that enable our vehicles to detect, classify, and understand objects and events in their environment. They work with sensors such as cameras, LiDAR, and radar to create a comprehensive perception system.",
    focusAreas: [
      "Object detection and classification",
      "Sensor fusion (camera, LiDAR, radar)",
      "Scene understanding",
    ],
  },
  localization: {
    name: "Localization",
    description:
      "The Localization Team is responsible for creating accurate maps and ensuring that our autonomous vehicles can determine their position within those maps. They work with various sensors and algorithms to achieve precise localization in diverse environments.",
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
        <h1 className="team-page-title">{team.name}</h1>
        <hr className="team-page-divider" />
        <p className="team-page-description">{team.description}</p>

        <div className="team-page-highlights">
          <h2 className="team-page-subtitle">What We Work On</h2>
          <ul className="team-page-list">
            {team.focusAreas.map((item) => (
              <li key={typeof item === 'string' ? item : item.label}>
                {typeof item === 'string' ? item : (
                  <>
                    <strong>{item.label}</strong>: {item.description}
                  </>
                )}
              </li>
            ))}
          </ul>
          <h2 className="team-page-subtitle">Key Milestones</h2>
          <ul className="team-page-list">
            {team.keymilestones && team.keymilestones.map((item) => (
              <li key={typeof item === 'string' ? item : item.label}>
                {typeof item === 'string' ? item : (
                  <>
                    <strong>{item.label}</strong>: {item.description}
                  </>
                )}
              </li>
            ))}
          </ul>
            <h2 className="team-page-subtitle">Technologies We Use</h2>
            <ul className="team-page-list">
              {team.technologies && team.technologies.map((item) => (
                <li key={typeof item === 'string' ? item : item.label}>
                  {typeof item === 'string' ? item : (
                    <>
                      <strong>{item.label}</strong>: {item.description}
                    </>
                  )}
                </li>
              ))}
            </ul>
        </div>
      </div>
    </div>
  );
}

export default TeamPage;
