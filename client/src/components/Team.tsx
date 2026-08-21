import React, { useState } from "react";
import SectionHeading from "./design-system/SectionHeading";
import Badge from "./design-system/Badge";
import Card from "./design-system/Card";
import Tabs from "./design-system/Tabs";
import TechGridBackground from "./design-system/TechGridBackground";
import "../stylesheets/Team.css";

import Member1 from "../assets/Ali.webp";
import Member2 from "../assets/Ethan.webp";
import Member3 from "../assets/Aly.webp";
import Member4 from "../assets/Kierstin.webp";
import Member5 from "../assets/Zain.webp";
import Danya from "../assets/Danya.webp";
import Tygo from "../assets/Tygo.webp";
import Obaid from "../assets/Obaid.webp";
import Ben from "../assets/Benjamin.webp";
import Dev from "../assets/Dev.webp";
import BlackTeamLead from "../assets/Ian.webp";

interface TeamMemberData {
  id: string;
  name: string;
  role: string;
  category: "exec" | "planning" | "perception" | "localization" | "build" | "web";
  subteamName: string;
  image?: string;
}

const membersList: TeamMemberData[] = [
  // Executive Leadership
  { id: "exec-1", name: "Ali Elgalad", role: "President & Founder", category: "exec", subteamName: "Executive Leadership", image: Member1 },
  { id: "exec-4", name: "Ethan Greene", role: "VP Finance", category: "exec", subteamName: "Executive Leadership", image: Member2 },
  { id: "exec-5", name: "Danya Abbas", role: "VP Communications", category: "exec", subteamName: "Executive Leadership", image: Danya },
  { id: "exec-6", name: "Dev Chaudhari", role: "VP Education", category: "exec", subteamName: "Executive Leadership", image: Dev },

  // Planning & Control
  { id: "lead-aly", name: "Aly Ashour", role: "Planning & Control Lead", category: "planning", subteamName: "Planning & Control", image: Member3 },
  { id: "lead-obaid", name: "Obaid Mohiuddin", role: "Planning & Control Lead", category: "planning", subteamName: "Planning & Control", image: Obaid },

  // Perception
  { id: "lead-tygo", name: "Tygo Crawley", role: "Perception Co-Lead", category: "perception", subteamName: "Perception", image: Tygo },
  { id: "lead-ian", name: "Ian Patrick Tan", role: "Perception Co-Lead", category: "perception", subteamName: "Perception", image: BlackTeamLead },

  // Localization & Mapping
  { id: "lead-zain", name: "Zain Syed", role: "Localization Lead", category: "localization", subteamName: "Localization & Mapping", image: Member5 },
  { id: "lead-ben", name: "Benjamin Namayandeh", role: "Localization Lead", category: "localization", subteamName: "Localization & Mapping", image: Ben },

  // Build & Mechanical
  { id: "lead-ritwick", name: "Ritwick Vemula", role: "Build & Mechanical Lead", category: "build", subteamName: "Build & Hardware" },
  { id: "lead-nathanael", name: "Nathanael Cadman-Neu", role: "Chassis & Integration Lead", category: "build", subteamName: "Build & Hardware" },

  // Web & Infrastructure
  { id: "lead-kierstin", name: "Kierstin Griffith", role: "Web & Infrastructure Lead", category: "web", subteamName: "Web & Telemetry", image: Member4 },
];

export const Team: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filterTabs = [
    { id: "all", label: "All Members", count: membersList.length },
    { id: "exec", label: "Executive", count: membersList.filter(m => m.category === "exec").length },
    { id: "planning", label: "Planning & Control", count: membersList.filter(m => m.category === "planning").length },
    { id: "perception", label: "Perception", count: membersList.filter(m => m.category === "perception").length },
    { id: "localization", label: "Localization", count: membersList.filter(m => m.category === "localization").length },
    { id: "build", label: "Build", count: membersList.filter(m => m.category === "build").length },
    { id: "web", label: "Web", count: membersList.filter(m => m.category === "web").length },
  ];

  const filteredMembers = activeFilter === "all"
    ? membersList
    : membersList.filter(m => m.category === activeFilter);

  const getBadgeVariant = (category: string) => {
    switch (category) {
      case "exec": return "purple";
      case "planning": return "planning";
      case "perception": return "perception";
      case "localization": return "localization";
      case "build": return "build";
      default: return "cyan";
    }
  };

  return (
    <TechGridBackground variant="both" glowColor="both" className="ds-team-root">
      <div className="ds-team-container">
        
        {/* Section Heading */}
        <SectionHeading
          badge="LEADERSHIP & TALENT"
          title="The Engineers Behind"
          titleGradient="Western AutoPilot"
          subtitle="A multidisciplinary collective of passionate software engineers, roboticists, electrical builders, and researchers."
        />

        {/* Filter Tabs */}
        <div className="ds-team-tabs-row">
          <Tabs
            tabs={filterTabs}
            activeTab={activeFilter}
            onChange={setActiveFilter}
          />
        </div>

        {/* Members Grid */}
        <div className="ds-members-grid">
          {filteredMembers.map((member) => (
            <Card key={member.id} variant="glass" padding="lg" className="ds-member-card">
              <div className="ds-member-photo-box">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="ds-member-photo"
                    loading="lazy"
                  />
                ) : (
                  <div className="ds-member-fallback">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </div>
                )}
                <div className="ds-member-photo-sheen" />
              </div>

              <div className="ds-member-details">
                <Badge variant={getBadgeVariant(member.category)} size="sm">
                  {member.subteamName}
                </Badge>
                <h3 className="ds-member-name">{member.name}</h3>
                <span className="ds-member-role">{member.role}</span>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </TechGridBackground>
  );
};

export default Team;
