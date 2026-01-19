import "../stylesheets/Sponsors.css";

function Sponsors() {
  return (
    <section className="Sponsors">
      <div className="sponsors-container">
        <h1 className="heading">Our Sponsors</h1>
        <div className="logos">
          <div className="sponsor">
            <img
              src="/sponsors.svg/ROBOSHOP_V2 1.svg"
              alt="RobotShop Logo"
              className="roboshop-logo"
            />
          </div>
          <div className="sponsor">
            <img
              src="/sponsors.svg/digikey 1.svg"
              alt="Digikey Logo"
              className="digikey-logo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sponsors;
