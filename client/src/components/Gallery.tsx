import React, { useEffect } from "react";
import "../stylesheets/Gallery.css";

type MilestoneStatus = "completed" | "in progress" | "planned";
type MilestonePhase =
  | "simulation"
  | "physical testing"
  | "competition"
  | "development"
  | "integration";

interface GalleryImage {
  src: string;
  caption: string;
}

  interface Milestone {
  id: string;
  title: string;
  phase: MilestonePhase;
  timeframe: string;
  status: MilestoneStatus;
  summary: string;
  images: GalleryImage[];
}

const MILESTONES: Milestone[] = [
  /*{
    id: "agm-1",
    title: "First AGM",
    phase: "development",
    status: "completed",
    timeframe: "December 2024",
    summary:
      "Formalized the club’s structure and established its technical direction.",
    images: [
      //These are placeholders - replace later with actual AGM photos
      { src: "/agm/meeting.jpg", caption: "Initial general body meeting" },
      { src: "/agm/team.jpg", caption: "Founding members and exec team" },
    ],
  },*/
  {
    id: "workshop-1",
    title: "First MNST Workshop",
    phase: "integration",
    status: "completed",
    timeframe: "January 2025",
    summary:
      "Hands-on introduction to simulation environments and control pipelines.",
    images: [
      { src: "/Gallery/MNISTNumbers.png", 
        caption: "The MNIST dataset contains 70,000 images of handwritten digits (0-9), used to train neural networks." },
      //{ src: "/Gallery/NeutralNetworkLayers.png", caption: "blurb about neutral network layers." },
      { src: "/Gallery/PresentationPanOut.jpeg", caption: "View of the workshop attendees engaged in the initial presentation." },
      { src: "/Gallery/Presentation.JPG", caption: "Our Planning and Control lead Aly Ashour leading his portion of the workshop." },
    ],
  },
  {
    id: "sim-rc",
    title: "RC Car Simulation Competition",
    phase: "simulation",
    status: "completed",
    timeframe: "March 2025",
    summary:
      "Competitive evaluation of perception and planning stacks in simulation.",
    images: [
      { src: "/Gallery/BlackTeamGroupPic.png", caption: "Group picture of the Black team." },
      { src: "/Gallery/RedTeamGroupPic.png", caption: "Group picture of the Red team." },
      { src: "/Gallery/AwardWinners.png", caption: "Group picture of the award winners from each team." },
      { src: "/Gallery/BlackTeamAwardIan.png", caption: "Ian Tan, leader of the Black team recieving an award for his outstanding contributions." },
      { src: "/Gallery/RedTeamAwardBen.png", caption: "Ben Namayandeh, leader of the Red team recieving an award for contributing the most lines of code." },
      { src: "/Gallery/RedTeamAwardCady.jpeg", caption: "Cadence McGillicuddy, recieving an award for her exceptional dedication to the red team." },
      { src: "/Gallery/BlackTeamAwardLogan.png", caption: "Logan Ouellette, recieving an award for his outstanding contributions to the black team." },
    ],
  },
  {
    id: "race-rc",
    title: "RC Car Racing Competition",
    phase: "competition",
    status: "completed",
    timeframe: "May 2025",
    summary:
      "Transition from simulation to real-world autonomous racing conditions.",
    images: [
      { src: "/Gallery/TrackAbove.png", caption: "An overhead view of the race track used in the competition, the track was set up in 3 different ways." },
      { src: "/Gallery/TheCars2.jpeg", caption: "The 2 RC cars built and coded by each of the teams." },
      { src: "/Gallery/Comp2GroupPic.png", caption: "Group photo of those who attended WEAP's RC competition." },
      { src: "/Gallery/TheTrackScenic.jpeg", caption: "Race Results: With an average time of 45 seconds, the Black team came out on top with 60 pts! \n The Red team trailed behind with a total of 20 pts for completing 2 of the 3 tracks." },
    ],
  },
];

export default function Gallery() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const section = document.getElementById(hash);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <main className="gallery-page">
      {MILESTONES.map((m) => (
        <section key={m.id} id={m.id} className="gallery-section">
          {/* Metadata Overlay */}
          <header className="hero-section">
            <h2 className="hero-title">{m.title}</h2>
            <p className="hero-summary">{m.summary}</p>

            <div className="meta">
              <span className={`phase ${m.phase}`}>{m.phase}</span>
              <span className={`status ${m.status}`}>{m.status}</span>
              <span>{m.timeframe}</span>
            </div>
          </header>

          {/* VISUALS ARE THE SECTION */}
          <div className="image-grid">
            {m.images.map((img, i) => (
              <figure key={i} className="gallery-item">
                <img src={img.src} alt={img.caption} />
                <figcaption>{img.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

//function Gallery() {
//  return (
//    <div className="gallery-container">
//      <h2>Come back soon to see all of the photos of our club!</h2>
//      <div className="Work-in-progress">
//        <img src="/Wip.png" alt="Work in progress Image" />
//        
//      </div>
//    </div>
//  );
//}

//export default Gallery;