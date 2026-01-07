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