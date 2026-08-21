import React from 'react';
import { Cpu, Eye, Compass, Wrench } from 'lucide-react';
import SectionHeading from './design-system/SectionHeading';
import TechCard from './design-system/TechCard';
import '../stylesheets/Teams.css';

const teamsData = [
  {
    title: "Planning & Control",
    subtitle: "// SUB-TEAM 01",
    description: "Responsible for route planning, state machines, obstacle avoidance, and steering/throttle feedback controllers.",
    badge: "Active",
    badgeVariant: "planning" as const,
    accentColor: "planning" as const,
    tags: ["ROS 2", "MPC / PID", "C++", "Path Planning"],
    icon: <Cpu size={22} />,
    link: "/teams/planning-and-control",
  },
  {
    title: "Perception",
    subtitle: "// SUB-TEAM 02",
    description: "Processes camera feeds and LiDAR point clouds to detect road lanes, traffic signs, and obstacles around the vehicle.",
    badge: "Active",
    badgeVariant: "perception" as const,
    accentColor: "perception" as const,
    tags: ["LiDAR", "YOLO", "PyTorch", "Computer Vision"],
    icon: <Eye size={22} />,
    link: "/teams/perception",
  },
  {
    title: "Localization & Mapping",
    subtitle: "// SUB-TEAM 03",
    description: "Tracks vehicle position and generates maps of test tracks using sensor fusion (EKF), GPS, and IMU telemetry.",
    badge: "Active",
    badgeVariant: "localization" as const,
    accentColor: "localization" as const,
    tags: ["SLAM", "EKF Fusion", "RTK-GPS", "State Estimation"],
    icon: <Compass size={22} />,
    link: "/teams/localization",
  },
  {
    title: "Build & Mechanical",
    subtitle: "// SUB-TEAM 04",
    description: "Designs and 3D prints sensor mounts, fabricates chassis modifications, and wires vehicle power distribution.",
    badge: "Active",
    badgeVariant: "build" as const,
    accentColor: "build" as const,
    tags: ["SolidWorks", "CAN Bus", "Wiring", "Fabrication"],
    icon: <Wrench size={22} />,
    link: "/teams/build",
  },
];

export const Teams: React.FC = () => {
  return (
    <section className="ds-teams-section" id="Teams">
      <div className="ds-teams-container">
        <SectionHeading
          badge="SUB-TEAMS"
          title="Our 4 Technical"
          titleGradient="Sub-teams"
          subtitle="Our club is organized into four engineering divisions focused on software, AI, state estimation, and physical fabrication."
        />

        <div className="ds-teams-grid">
          {teamsData.map((team) => (
            <TechCard
              key={team.title}
              title={team.title}
              subtitle={team.subtitle}
              description={team.description}
              badge={team.badge}
              badgeVariant={team.badgeVariant}
              accentColor={team.accentColor}
              tags={team.tags}
              icon={team.icon}
              to={team.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teams;
