import "../stylesheets/Home.css";
import Roadmap from "./Roadmap";


function Home() {
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
      <div className="TeamPhoto">
        <img src="/WEAP_Photo.png" alt="WEAP Team Photo 2024" />
      </div>
      <div className="Buttons">
        <div className="RoadmapButton">
          <a href="#Roadmap">
            <span>Explore Our RoadMap</span>
          </a>
        </div>
        <div className="TeamsButtons">
          <a href="/BuildTeams">
            <span>Meet the Teams</span>
          </a>
        </div>
      </div>

      <Roadmap />

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