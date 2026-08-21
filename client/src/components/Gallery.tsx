import React, { useEffect, useState } from "react";
import SectionHeading from "./design-system/SectionHeading";
import Badge from "./design-system/Badge";
import Card from "./design-system/Card";
import TechGridBackground from "./design-system/TechGridBackground";
import Tabs from "./design-system/Tabs";
import "../stylesheets/Gallery.css";

interface GalleryImage {
  src: string;
  caption: string;
}

interface Milestone {
  id: string;
  title: string;
  phase: string;
  timeframe: string;
  status: "completed" | "in progress" | "planned";
  summary: string;
  images: GalleryImage[];
}

const MILESTONES: Milestone[] = [
  {
    id: "workshop-1",
    title: "First MNIST Machine Learning Workshop",
    phase: "Technical Workshop",
    status: "completed",
    timeframe: "January 2025",
    summary: "Hands-on introduction to neural networks, computer vision datasets, and ROS 2 control pipelines.",
    images: [
      { src: "/Gallery/WebP/MNISTNumbers.webp", caption: "The MNIST dataset contains 70,000 images of handwritten digits (0-9) used to train neural networks." },
      { src: "/Gallery/WebP/PresentationPanOut.webp", caption: "Workshop attendees learning initial convolutional neural net architecture." },
      { src: "/Gallery/WebP/Presentation.webp", caption: "Planning & Control Lead Aly Ashour presenting closed-loop feedback controllers." },
    ],
  },
  {
    id: "sim-rc",
    title: "RC Autonomous Simulation Challenge",
    phase: "Simulation Competition",
    status: "completed",
    timeframe: "March 2025",
    summary: "Competitive evaluation of perception algorithms and Model Predictive Controllers in high-fidelity simulation.",
    images: [
      { src: "/Gallery/WebP/BlackTeamGroupPic.webp", caption: "Group picture of the Black team." },
      { src: "/Gallery/WebP/RedTeamGroupPic.webp", caption: "Group picture of the Red team." },
      { src: "/Gallery/WebP/AwardWinners.webp", caption: "Award recipients from both competitive teams." },
      { src: "/Gallery/WebP/BlackTeamAwardIan.webp", caption: "Ian Tan receiving an award for outstanding perception stack contributions." },
      { src: "/Gallery/WebP/RedTeamAwardBen.webp", caption: "Benjamin Namayandeh receiving an award for exceptional codebase commits." },
      { src: "/Gallery/WebP/RedTeamAwardCady.webp", caption: "Cadence McGillicuddy receiving an award for technical dedication." },
      { src: "/Gallery/WebP/BlackTeamAwardLogan.webp", caption: "Logan Ouellette receiving an award for systems integration." },
    ],
  },
  {
    id: "race-rc",
    title: "Physical RC Autonomous Racing",
    phase: "Physical Testing",
    status: "completed",
    timeframe: "May 2025",
    summary: "Deploying autonomous software stacks onto physical 1/10th scale RC vehicles on real test tracks.",
    images: [
      { src: "/Gallery/WebP/TrackAbove.webp", caption: "Overhead view of the physical obstacle track configured in 3 distinct layouts." },
      { src: "/Gallery/WebP/TheCars2.webp", caption: "Autonomous RC vehicles equipped with microcontrollers, camera rigs, and battery systems." },
      { src: "/Gallery/WebP/Comp2GroupPic.webp", caption: "Members, competitors, and attendees at the annual RC Autonomous Challenge." },
      { src: "/Gallery/WebP/TheTrackScenic.webp", caption: "Race Results: Black Team achieved 1st place with 60 pts; Red Team achieved 20 pts." },
    ],
  },
];

export const Gallery: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState("all");

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const section = document.getElementById(hash);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const tabs = [
    { id: "all", label: "All Events" },
    { id: "workshop-1", label: "ML Workshop" },
    { id: "sim-rc", label: "Simulation Challenge" },
    { id: "race-rc", label: "Physical Racing" },
  ];

  const visibleMilestones = selectedMilestone === "all"
    ? MILESTONES
    : MILESTONES.filter(m => m.id === selectedMilestone);

  return (
    <TechGridBackground variant="both" glowColor="both" className="ds-gallery-root">
      <div className="ds-gallery-container">
        
        <SectionHeading
          badge="MEDIA & ARCHIVE"
          title="Engineering Gallery &"
          titleGradient="Event Archive"
          subtitle="A visual chronicle of our team workshops, racing competitions, and vehicle testing."
        />

        {/* Filter Tabs */}
        <div className="ds-gallery-tabs-row">
          <Tabs
            tabs={tabs}
            activeTab={selectedMilestone}
            onChange={setSelectedMilestone}
          />
        </div>

        {/* Milestones Sections */}
        <div className="ds-gallery-sections">
          {visibleMilestones.map((m) => (
            <div key={m.id} id={m.id} className="ds-gallery-event-block">
              <div className="ds-gallery-event-header">
                <div className="ds-event-badge-row">
                  <Badge variant="purple" size="sm">{m.phase}</Badge>
                  <Badge variant="success" size="sm" dot>Completed</Badge>
                  <span className="ds-event-timeframe">{m.timeframe}</span>
                </div>
                <h3 className="ds-event-title">{m.title}</h3>
                <p className="ds-event-summary">{m.summary}</p>
              </div>

              <div className="ds-event-photo-grid">
                {m.images.map((img, i) => (
                  <Card key={i} variant="glass" padding="none" className="ds-event-photo-card">
                    <div className="ds-photo-wrapper">
                      <img src={img.src} alt={img.caption} loading="lazy" />
                    </div>
                    <div className="ds-photo-info">
                      <p className="ds-photo-desc">{img.caption}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </TechGridBackground>
  );
};

export default Gallery;
