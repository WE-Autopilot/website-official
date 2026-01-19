import "../stylesheets/Home.css";
import Roadmap from "./Roadmap";
<<<<<<< HEAD
=======
import Teams from "./Teams";
>>>>>>> feat/RoadMap

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
          <a href="/Team">
            <span>Meet the Teams</span>
          </a>
        </div>
      </div>

      <div className="About-Us">
        <h2>About Us</h2>
        <p>
          The Western Enineering Autopilot Club (WEAP) enpowers students to
          develop real-world autonomous vehicles. Our mission is to foster
          creative, driven enineers through hands-on experience, research, and
          innovation in autonomous mobility. We bridge the gap between students
          and leading companies, cultivating a community of curious and
          collaboratuve problem-solvers.
        </p>

        <button className="See-More-Button">
          <a href="/AboutUs">
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
