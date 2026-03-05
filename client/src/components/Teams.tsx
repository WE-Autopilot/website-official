import React from 'react';
import '../stylesheets/Teams.css';

const teamsData = [
  {
    name: "Mapping and Localization",
    summary: "Develops the systems that allow our vehicles to understand and navigate their environment.",
    description: "The Mapping and Localization Team is responsible for creating accurate maps and ensuring that our autonomous vehicles can determine their position within those maps. They work with various sensors and algorithms to achieve precise localization in diverse environments.",
    link: "/UnderConstruction"
  },
  {
    name: "Planning and Control",
    summary: "Designs the algorithms that enable our vehicles to make decisions and control their movements.",
    description: "The Planning and Control Team develops the algorithms that allow our vehicles to plan routes, make decisions, and control their movements safely and efficiently. They work on path planning, motion control, and decision-making systems.",
    link: "/UnderConstruction"
  },
  {
    name: "Perception",
    summary: "Builds the systems that allow our vehicles to perceive and interpret their surroundings.",
    description: "The Perception Team develops the algorithms and systems that enable our vehicles to detect, classify, and understand objects and events in their environment. They work with sensors such as cameras, LiDAR, and radar to create a comprehensive perception system.",
    link: "/UnderConstruction"
  },
  {
    name: "Build",
    summary: "Constructs the physical vehicles and ensures they are ready for testing and competition.",
    description: "The Build Team is responsible for constructing the physical autonomous vehicles. They work on the mechanical design, fabrication, and assembly of the vehicles, ensuring that they meet the specifications and are ready for testing and competition.",
    link: "/UnderConstruction"
  }
];

function Teams(): JSX.Element {
  return (
    <div className="teams-page">
      <div className="teams-background"></div>
      <div className="teams-content">
        <h1 className="teams-title">Meet the Teams</h1>
        <div className="teams-container">
          {teamsData.map((team, index) => (
            <div key={index} className="team-card-wrapper">
              <div className="team-card">
                <div className="team-card-front">
                  <h2 className="team-name">{team.name}</h2>
                  <p className="team-summary">{team.summary}</p>
                </div>
                <div className="team-card-back">
                  <p className="team-description">{team.description}</p>
                  <a href={team.link} className="team-link-button">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Teams;