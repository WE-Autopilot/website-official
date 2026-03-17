import "../stylesheets/Home.css";
import Roadmap from "./Roadmap";
import Teams from "./Teams";
import React from "react";




function Home() {
  const [isPaused, setIsPaused] = React.useState(false);
  return (
    <>
      <div className="logo-card">
        <div className="logo-align">
          <div className="logo">
            <h2>WE</h2>
            <img src="Logo_trimmed.svg" id="Logo" alt="Logo" />
            <h2>AUTOPILOT</h2>
          </div>

          <div className="line"></div>
          <div className="logo-align">
            <p>Western Engineering AutoPilot Club</p>
          </div>
        </div>
      </div>

      <div className="TeamPhoto" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <div className={`carousel-container ${isPaused ? 'paused' : ""}`}>
          <img src="/FirstEverAGM.jpeg" alt="First Ever AGM Meeting" />
          <img src="/LastYearsExecs.png" alt="Last Year's Executives" />
          <img src="/TeamPhoto1.webp" alt="Team Photo" />
          <img src="/MINSTWorkshop.JPG" alt="MINST Workshop" />
          <img src="/RCCars.jpeg" alt="RC Cars" />
          <img src="/ThisYearsExecs.JPG" alt="This Year's Executives" />
          <img src="/ThisYearsAGM.JPG" alt="This Year's AGM Meeting" />

          <img src="/FirstEverAGM.jpeg" alt="First Ever AGM Meeting" />
          <img src="/LastYearsExecs.png" alt="Last Year's Executives" />
          <img src="/TeamPhoto1.webp" alt="Team Photo" />
          <img src="/MINSTWorkshop.JPG" alt="MINST Workshop" />
          <img src="/RCCars.jpeg" alt="RC Cars" />
          <img src="/ThisYearsExecs.JPG" alt="This Year's Executives" />
          <img src="/ThisYearsAGM.JPG" alt="This Year's AGM Meeting" />
        </div>
      </div>

      <div className="Buttons">
        <div className="RoadmapButton">
          <a href="#Roadmap">
            <span>Explore Our RoadMap</span>
          </a>
        </div>
        <div className="TeamsButtons">
          <a href="/Team">
            <span>Meet the Team</span>
          </a>
        </div>
      </div>

      <div className="About-Us">
        <h2>About Us</h2>
        <p>
          The Western Engineering Autopilot Club (WEAP) enpowers students to
          develop real-world autonomous vehicles. Our mission is to foster
          creative, driven engineers through hands-on experience, research, and
          innovation in autonomous mobility. We bridge the gap between students
          and leading companies, cultivating a community of curious and
          collaborative problem-solvers.
        </p>

        <button className="See-More-Button">
          <a href="/UnderConstruction">
            <span>Learn More</span>
          </a>
        </button>
      </div>

      <Roadmap />
      <Teams />

      {/* <section className="join-section">
        <div className="ready-to-join">
          <h2 className="join-title">Ready to Join?</h2>
          <div className="join-button">
            <a href="/join">
              <span>Join Now!</span>
            </a>
          </div>
        </div>
      </section> */}
    </>
  );
}

export default Home;
