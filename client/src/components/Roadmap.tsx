import React, { useState } from "react";
import "../stylesheets/Roadmap.css";

interface RoadmapItem {
  id: number;
  title: string;
  summary: string;
  description: string;
  status: "completed" | "in-progress" | "upcoming";
  links?: { label: string; url: string }[];
}

const roadmapData: RoadmapItem[] = [
  {
    id: 1,
    title: "Team Formation",
    summary: "Assembled our founding team",
    description:
      "Recruited passionate engineering students across multiple disciplines including software, electrical, and mechanical engineering. Established club structure and leadership roles.",
    status: "completed",
    links: [{ label: "Meet the Team", url: "/about" }],
  },
  {
    id: 2,
    title: "Research Phase",
    summary: "Deep dive into AV technology",
    description:
      "Conducted extensive research on autonomous vehicle systems, sensor fusion, computer vision, and path planning algorithms. Partnered with faculty advisors for guidance.",
    status: "completed",
    links: [{ label: "Our Research", url: "/about#research" }],
  },
  {
    id: 3,
    title: "Prototype Development",
    summary: "Building our first autonomous platform",
    description:
      "Currently developing our first prototype vehicle with LiDAR, camera systems, and custom control software. Integrating ROS2 for real-time processing.",
    status: "in-progress",
    links: [
      { label: "Join Development", url: "/join" },
      { label: "GitHub", url: "https://github.com" },
    ],
  },
  {
    id: 4,
    title: "Testing & Validation",
    summary: "Rigorous testing protocols",
    description:
      "Comprehensive testing phase including simulation, closed-course testing, and safety validation. Iterating on designs based on real-world performance data.",
    status: "upcoming",
  },
  {
    id: 5,
    title: "Competition Ready",
    summary: "Enter autonomous vehicle competitions",
    description:
      "Prepare and compete in national autonomous vehicle competitions. Showcase our innovations and represent Western Engineering on the national stage.",
    status: "upcoming",
    links: [{ label: "Competitions", url: "/competition" }],
  },
];

const Roadmap: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const currentStageIndex = roadmapData.findIndex(
    (item) => item.status === "in-progress"
  );

  const handleNodeClick = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getNodeClass = (status: string) => {
    switch (status) {
      case "completed":
        return "node-completed";
      case "in-progress":
        return "node-in-progress";
      default:
        return "node-upcoming";
    }
  };

  return (
    <section className="Roadmap" id="Roadmap">
      <h2 className="roadmap-title">Our Roadmap</h2>
      <div className="roadmap-container">
        <div className="roadmap-track">
          {/* Road line */}
          <div className="road-line">
            <div
              className="road-progress"
              style={{
                width: `${((currentStageIndex + 0.5) / roadmapData.length) * 100}%`,
              }}
            />
          </div>

          {/* Car indicator */}
          <div
            className="car-indicator"
            style={{
              left: `${((currentStageIndex + 0.5) / roadmapData.length) * 100}%`,
            }}
          >
            <svg
              viewBox="0 0 64 32"
              className="car-svg"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Car body */}
              <path
                d="M10 20 L14 10 L28 8 L42 8 L50 14 L54 20 L54 24 L10 24 Z"
                fill="#FFDE38"
                stroke="#6A037B"
                strokeWidth="1.5"
              />
              {/* Windshield */}
              <path
                d="M28 10 L26 18 L40 18 L44 14 L42 10 Z"
                fill="#102854"
                opacity="0.7"
              />
              {/* Wheels */}
              <circle cx="20" cy="24" r="5" fill="#333" />
              <circle cx="20" cy="24" r="2.5" fill="#666" />
              <circle cx="44" cy="24" r="5" fill="#333" />
              <circle cx="44" cy="24" r="2.5" fill="#666" />
              {/* Headlight */}
              <rect x="52" y="16" width="3" height="4" rx="1" fill="#FFE561" />
              {/* Sensor dome (autonomous car touch) */}
              <ellipse cx="32" cy="6" rx="6" ry="3" fill="#6A037B" />
              <circle cx="32" cy="5" r="1.5" fill="#00ff88" className="sensor-light" />
            </svg>
          </div>

          {/* Nodes */}
          <div className="nodes-container">
            {roadmapData.map((item, index) => (
              <div
                key={item.id}
                className="node-wrapper"
                style={{ left: `${((index + 0.5) / roadmapData.length) * 100}%` }}
              >
                {/* Tooltip on hover */}
                {hoveredId === item.id && expandedId !== item.id && (
                  <div className="node-tooltip">
                    <span className="tooltip-title">{item.title}</span>
                    <span className="tooltip-summary">{item.summary}</span>
                  </div>
                )}

                {/* Node dot */}
                <button
                  className={`node-dot ${getNodeClass(item.status)} ${
                    expandedId === item.id ? "expanded" : ""
                  }`}
                  onClick={() => handleNodeClick(item.id)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  aria-expanded={expandedId === item.id}
                  aria-label={`${item.title} - ${item.status}`}
                >
                  {item.status === "completed" && (
                    <svg viewBox="0 0 24 24" className="check-icon">
                      <path
                        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                  {item.status === "in-progress" && (
                    <div className="pulse-ring" />
                  )}
                </button>

                {/* Stage label */}
                <span className={`node-label ${getNodeClass(item.status)}`}>
                  {item.title}
                </span>

                {/* Expanded content */}
                {expandedId === item.id && (
                  <div className="node-expanded">
                    <div className="expanded-content">
                      <h3>{item.title}</h3>
                      <span className={`status-badge ${item.status}`}>
                        {item.status.replace("-", " ")}
                      </span>
                      <p>{item.description}</p>
                      {item.links && item.links.length > 0 && (
                        <div className="expanded-links">
                          {item.links.map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link.url}
                              className="expanded-link"
                              target={
                                link.url.startsWith("http") ? "_blank" : undefined
                              }
                              rel={
                                link.url.startsWith("http")
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                      <button
                        className="close-expanded"
                        onClick={() => setExpandedId(null)}
                        aria-label="Close details"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
