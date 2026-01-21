import React, { useState, useMemo } from "react";
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
    title: "Club Formation & Chartering",
    summary: "Assembled our founding team",
    description:
      "WEAP was officially ratified in 2024 and established as Western University’s first software-engineering-focused autonomous systems club. The founding AGM formalized the club’s mission to develop real-world autonomous vehicle applications through hands-on engineering.",
    status: "completed",
    links: [{ label: "Meet the Team", url: "/about" }],
  },
  {
    id: 2,
    title: "MNIST Workshop",
    summary: "First technical Workshop on ML basics",
    description:
      "WEAP hosted its first technical workshop introducing core machine learning and computer vision concepts through hands-on development of an image classifier using the MNIST dataset, a standard benchmark of handwritten digits (0–9) used to evaluate image recognition models.",
    status: "completed",
    links: [{ label: "See Workshop", url: "/about#research" }],
  },
  {
    id: 3,
    title: "Autonomous Driving Simulation Competition",
    summary: "First autonomous driving challenge",
    description:
      "Teams (Red vs Black) developed and evaluated autonomous driving software in a constrained simulation environment using the F1Tenth Gym, focusing on perception abstraction, path planning, and control under real-time constraints",
    status: "completed",
    links: [{ label: "Our Sponsors", url: "/sponsors" }],
  },
  {
    id: 4,
    title: "Physical RC Car Competition",
    summary: "First physical autonomous vehicle challenge",
    description:
      "Software developed in simulation (previous competition) was transferred to physical RC cars, where teams implemented real-time perception, sensor fusion, and autonomous control on actual hardware.",
    status: "completed",
    links: [{ label: "Event Highlights", url: "/about#events" }],
  },
  {
    id: 5,
    title: "Autonomous Golf Cart (Simulation Phase)",
    summary: "Developing software for full-scale autonomous vehicle",
    description:
      "Technical teams adapt our current autonomy software for RC to a simulated golf cart, introducing higher speeds, and more complex planning and control challenges.",
    status: "in-progress",
    
  },
  {
    id: 6,
    title: "Autonomous Golf Cart (Physical Testing)",
    summary: "Real-world vehicle testing",
    description:
      "The golf cart autonomy system is brought out of simulation and onto a physical vehicle where the out club focuses on safety, reliability, and real-world sensor integration",
    status: "upcoming",
  },
  {
    id: 7,
    title: "Stage 4 Autonomous Vehicle",
    summary: "Advanced autonomy features",
    description:
      "The long-term objective of WEAP is to develop a Stage 4 autonomous vehicle capable of independent navigation, lane changes, parking, and traffic signal response without human intervention under defined operating conditions.",
    status: "upcoming",
  },
];

const Roadmap: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  // Refs for animation
  const pathRef = React.useRef<SVGPathElement>(null);
  const carRef = React.useRef<HTMLDivElement>(null);
  const animationRef = React.useRef<number>();
  const roadmapRef = React.useRef<HTMLElement>(null);

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
  // 7 positions for 7 milestones - positioned inward to prevent curve clipping
  const trackPositions = useMemo(() => [
    { x: 20, y: 22 },   // 1 - Club Formation (top left)
    { x: 50, y: 22 },   // 2 - MNIST Workshop (top center)
    { x: 80, y: 22 },   // 3 - Simulation Competition (top right)
    { x: 80, y: 52 },   // 4 - Physical RC Car (right middle)
    { x: 50, y: 52 },   // 5 - Golf Cart Simulation (center) - IN PROGRESS
    { x: 20, y: 52 },   // 6 - Golf Cart Physical (left middle)
    { x: 20, y: 82 },   // 7 - Stage 4 Autonomous (bottom left)
  ], []);

  // SVG path - zigzag connecting 7 nodes with curves at turns
  const trackPath = useMemo(() => `
    M ${trackPositions[0].x} ${trackPositions[0].y}
    L ${trackPositions[1].x} ${trackPositions[1].y}
    L ${trackPositions[2].x} ${trackPositions[2].y}
    A 15 15 0 0 1 ${trackPositions[3].x} ${trackPositions[3].y}
    L ${trackPositions[4].x} ${trackPositions[4].y}
    L ${trackPositions[5].x} ${trackPositions[5].y}
    A 15 15 0 0 0 ${trackPositions[6].x} ${trackPositions[6].y}
  `, [trackPositions]);

  // IntersectionObserver to trigger animation on scroll
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldAnimate) {
            setShouldAnimate(true);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the roadmap is visible
        rootMargin: '0px'
      }
    );

    if (roadmapRef.current) {
      observer.observe(roadmapRef.current);
    }

    return () => {
      if (roadmapRef.current) {
        observer.unobserve(roadmapRef.current);
      }
    };
  }, [shouldAnimate]);

  // Animate car along the path
  React.useEffect(() => {
    if (!pathRef.current || !carRef.current || !shouldAnimate) return;

    const path = pathRef.current;
    const car = carRef.current;
    
    // Accurate distances for the 7-node track path geometry
    // 0->1, 1->2 are 30 units (Horizontal)
    // 2->3 is quarter-circle arc (Radius 15) -> 15 * PI/2
    // 3->4, 4->5 are 30 units (Horizontal)
    // 5->6 is quarter-circle arc (Radius 15) -> 15 * PI/2
    const segmentLengths = [
      0,                  // Node 0 (Start)
      30,                 // 0->1
      30,                 // 1->2
      30,                 //  2->3
      30 * Math.PI / 2,   // 3->4 (Curve down)
      30,                 // 4->5
      30,                 // 5->6
      30 * Math.PI / 2,   // 6->7 (Curve down)
    ];

    // Calculate exact target length based on nodes passed
    let targetLength = 0;
    for (let i = 1; i <= currentStageIndex && i < segmentLengths.length; i++) {
      targetLength += segmentLengths[i];
    }
    
    // If at the starting position, still show a small animation to the first node
    if (currentStageIndex === 0 && segmentLengths.length > 1) {
      targetLength = segmentLengths[1];
    }
    
    // Animation settings
    const duration = 4000; // ms
    const startTime = performance.now();
    const pathLength = path.getTotalLength();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutCubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentLen = Math.min(targetLength * easeProgress, pathLength);
      const point = path.getPointAtLength(currentLen);
      
      // Calculate rotation
      // Look slightly behind to determine tangent
      // Use adaptive delta based on current position
      const delta = Math.min(2, Math.max(0.1, currentLen * 0.01));
      const prevPoint = path.getPointAtLength(Math.max(0, currentLen - delta));
      
      const angleRad = Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x);
      let angleDeg = angleRad * (180 / Math.PI);
      
      // Normalize angle to 0-360
      if (angleDeg < 0) angleDeg += 360;
      
      // Determining if we need to flip the car vertically (scaleY -1)
      // Car sprite faces right by default.
      // If moving left (angles around 180), we need to flip it.
      const isFacingLeft = angleDeg > 90 && angleDeg < 270;
      const scaleY = isFacingLeft ? -1 : 1;

      // Apply styles
      car.style.left = `${point.x}%`;
      car.style.top = `${point.y}%`;
      car.style.setProperty('--car-rotation', `${angleDeg}deg`);
      car.style.setProperty('--car-scale-y', `${scaleY}`);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentStageIndex, shouldAnimate]); 


  return (
    <section className="Roadmap" id="Roadmap" ref={roadmapRef}>
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
              ref={pathRef}
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
              ref={carRef}
              className="car-indicator"
              // Initial position at start line (Node 1) to avoid FOUC (Flash of Unstyled Content)
              style={{
                left: `${trackPositions[0].x}%`,
                top: `${trackPositions[0].y}%`,
                ['--car-rotation' as string]: "0deg",
                ['--car-scale-y' as string]: "1"
              } as React.CSSProperties}
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
