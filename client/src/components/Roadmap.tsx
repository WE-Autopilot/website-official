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
    title: "Sponsor Acquisition",
    summary: "Securing funding and partnerships",
    description:
      "Building relationships with industry partners and securing sponsorships to fund our autonomous vehicle development. Establishing collaborations with tech companies.",
    status: "completed",
    links: [{ label: "Our Sponsors", url: "/sponsors" }],
  },
  {
    id: 4,
    title: "Hardware Integration",
    summary: "Integrating sensors and systems",
    description:
      "Assembling LiDAR units, camera arrays, and embedded systems. Creating the physical architecture for autonomous decision-making and control.",
    status: "completed",
  },
  {
    id: 5,
    title: "Software Development",
    summary: "Building autonomous algorithms",
    description:
      "Developing perception, planning, and control software. Implementing machine learning models for object detection and path planning using ROS2.",
    status: "in-progress",
    links: [
      { label: "Join Development", url: "/join" },
      { label: "GitHub", url: "https://github.com" },
    ],
  },
  {
    id: 6,
    title: "Prototype Testing",
    summary: "Closed-course testing phase",
    description:
      "Conducting rigorous testing in controlled environments. Validating sensor accuracy, system reliability, and safety protocols.",
    status: "upcoming",
  },
  {
    id: 7,
    title: "Algorithm Optimization",
    summary: "Enhancing AI decision-making",
    description:
      "Fine-tuning machine learning models and path planning algorithms for optimal performance in real-world scenarios.",
    status: "upcoming",
  },
  {
    id: 8,
    title: "Integration Testing",
    summary: "Full system validation",
    description:
      "Testing all subsystems working together. Ensuring seamless communication between perception, planning, and control modules.",
    status: "upcoming",
  },
  {
    id: 9,
    title: "Safety Certification",
    summary: "Meeting competition standards",
    description:
      "Completing safety checks and certifications required for competition participation. Ensuring all systems meet regulatory requirements.",
    status: "upcoming",
  },
  {
    id: 10,
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

  // Calculate path along the race track curve
  // Creating a zigzag/snake pattern like a real race circuit
  const trackPositions = [
    { x: 20, y: 15 },   // 1 - Start top left
    { x: 40, y: 15 },   // 2 - Top row
    { x: 60, y: 15 },   // 3 - Top row
    { x: 80, y: 15 },   // 4 - Top right corner
    { x: 80, y: 45 },   // 5 - Right turn down
    { x: 60, y: 45 },   // 6 - Middle row (right to left)
    { x: 40, y: 45 },   // 7 - Middle row
    { x: 20, y: 45 },   // 8 - Left turn
    { x: 20, y: 75 },   // 9 - Bottom left
    { x: 40, y: 75 },   // 10 - Bottom row (left to right)
  ];

  // SVG path - simple zigzag connecting each node
  const trackPath = `
    M ${trackPositions[0].x} ${trackPositions[0].y}
    L ${trackPositions[1].x} ${trackPositions[1].y}
    L ${trackPositions[2].x} ${trackPositions[2].y}
    L ${trackPositions[3].x} ${trackPositions[3].y}
    A 15 15 0 0 1 ${trackPositions[4].x} ${trackPositions[4].y}
    L ${trackPositions[5].x} ${trackPositions[5].y}
    L ${trackPositions[6].x} ${trackPositions[6].y}
    L ${trackPositions[7].x} ${trackPositions[7].y}
    A 15 15 0 0 0 ${trackPositions[8].x} ${trackPositions[8].y}
    L ${trackPositions[9].x} ${trackPositions[9].y}
  `;

  // Calculate rotation angle for the car based on position
  const getCarRotation = (index: number) => {
    const rotations = [0, 0, 0, 0, 180, 180, 180, 180, 0, 0];
    return rotations[index] || 0;
  };

  return (
    <section className="Roadmap" id="Roadmap">
      <h2 className="roadmap-title">Our Roadmap</h2>
      <div className="roadmap-container">
        <div className="roadmap-track">
          {/* SVG Race Track */}
          <svg className="track-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Track background (outer edge) */}
            <path
              d={trackPath}
              fill="none"
              stroke="#1a2a4a"
              strokeWidth="10"
              strokeLinecap="round"
              className="track-outer"
            />
            
            {/* Track base */}
            <path
              d={trackPath}
              fill="none"
              stroke="#2a4a7a"
              strokeWidth="7"
              strokeLinecap="round"
              className="track-base"
            />
            
            {/* Dashed center line */}
            <path
              d={trackPath}
              fill="none"
              stroke="#FFDE38"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeDasharray="3 3"
              className="track-center-line"
            />
            
            {/* Progress path */}
            <path
              d={trackPath}
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="7"
              strokeLinecap="round"
              className="track-progress"
              style={{
                strokeDasharray: "1000",
                strokeDashoffset: `${1000 - (currentStageIndex / (roadmapData.length - 1)) * 1000}`,
              }}
            />
            
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFDE38" />
                <stop offset="100%" stopColor="#6A037B" />
              </linearGradient>
            </defs>
          </svg>

          {/* Car indicator */}
          {currentStageIndex >= 0 && (
            <div
              className="car-indicator"
              style={{
                left: `${trackPositions[currentStageIndex].x}%`,
                top: `${trackPositions[currentStageIndex].y}%`,
                // @ts-ignore - CSS custom properties are valid in style but not typed by default
                "--car-rotation": `${getCarRotation(currentStageIndex)}deg`,
                // @ts-ignore
                "--car-scale-y": Math.abs(getCarRotation(currentStageIndex)) === 180 ? "-1" : "1",
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
          )}

          {/* Nodes */}
          <div className="nodes-container">
            {roadmapData.map((item, index) => (
              <div
                key={item.id}
                className="node-wrapper"
                style={{ 
                  left: `${trackPositions[index].x}%`,
                  top: `${trackPositions[index].y}%`,
                  zIndex: expandedId === item.id ? 10 : 5
                }}
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
