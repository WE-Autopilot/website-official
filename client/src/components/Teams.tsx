import React from 'react';
import { Cpu, Eye, Compass, Wrench } from 'lucide-react';
import SectionHeading from './design-system/SectionHeading';
import TechCard from './design-system/TechCard';
import '../stylesheets/Teams.css';

const teamsData = [
  {
    title: "Planning & Control",
    subtitle: "// SUB-TEAM 01",
    description: "Designs state machines, path planning trajectories, model predictive controllers (MPC), and drive-by-wire actuations.",
    badge: "Active",
    badgeVariant: "planning" as const,
    accentColor: "planning" as const,
    tags: ["ROS 2", "MPC", "C++", "Motion Planning"],
    icon: <Cpu size={22} />,
    link: "/teams/planning-and-control",
  },
  {
    title: "Perception",
    subtitle: "// SUB-TEAM 02",
    description: "Extracts 3D spatial features using multi-beam LiDAR point clouds, YOLOv8 object detection cameras, and sensor fusion.",
    badge: "Active",
    badgeVariant: "perception" as const,
    accentColor: "perception" as const,
    tags: ["LiDAR 3D", "YOLOv8", "PyTorch", "Point Clouds"],
    icon: <Eye size={22} />,
    link: "/teams/perception",
  },
  {
    title: "Localization & Mapping",
    subtitle: "// SUB-TEAM 03",
    description: "Estimates vehicle pose and maps environments utilizing Extended Kalman Filters (EKF), SLAM, RTK-GPS, and IMU telemetry.",
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
    description: "Engineers mechanical chassis, custom mounting rigs, thermal cooling systems, wiring harnesses, and battery power distro.",
    badge: "Active",
    badgeVariant: "build" as const,
    accentColor: "build" as const,
    tags: ["CAD / SolidWorks", "CAN Bus", "Power Distro", "Chassis Rig"],
    icon: <Wrench size={22} />,
    link: "/teams/build",
  },
];

export const Teams: React.FC = () => {
  return (
    <section className="ds-teams-section" id="Teams">
      <div className="ds-teams-container">
        <SectionHeading
          badge="AUTONOMOUS DIVISIONS"
          title="Specialized Engineering"
          titleGradient="Sub-teams"
          subtitle="Our club is organized into four core multidisciplinary engineering sub-teams working in tight unison."
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
