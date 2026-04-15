
import '../stylesheets/Sponsors.css'
/**
function Sponsors() {

    return (
        <div className = "Sponsors">
            <h1 className = "heading">Our Sponsors</h1>
            <div className = "logos">
                <div className = "sponsor">
                    <img src = "\sponsors.svg\ROBOSHOP_V2 1.svg" alt = "RobotShop Logo" className = "roboshop-logo"/>
                </div>
                <div className = "sponsor">
                    <img src = "\sponsors.svg\digikey 1.svg" alt = "Digikey" className = "digikey-logo"/>
                </div>
            </div>
        </div>
    )

}

export default Sponsors;
**/

const Sponsors: React.FC = () => {
    return (
        <div className="Sponsors">

            {/* Current Sponsors Section - TBD */}
            <section className="current-sponsors sponsor-animate delay-1">

            <h1 className="heading">Our Sponsors</h1>

             <div className = "logos sponsor-animate delay-2">

                <div className = "sponsor">
                    <img src = "/sponsors.svg/ROBOSHOP_V2 1.svg" alt = "RobotShop Logo" className = "roboshop-logo"/>
                </div>

                <div className = "sponsor">
                    <img src = "/sponsors.svg/digikey 1.svg" alt = "Digikey" className = "digikey-logo"/>
                </div>

            </div>

            </section>

            {/* Why Sponsor Us Section */}
            <section className="section sponsor-animate delay-3">
                <h2 className="section-title">Why Sponsor Us?</h2>

                <ul className="bullet-list">
                    <li>Support innovative, hands-on projects in autonomous mobility.</li>
                    <li>Gain exposure to engineering talent and future industry leaders.</li>
                    <li>Build connections with a rapidly growing university engineering community.</li>
                    <li>Promote your brand in high-visibility events, competitions and workshops.</li>
                </ul>
            </section>

            {/* Become a Sponsor */}
            <section className="section sponsor-animate delay-4">
                <h2 className="section-title">Become a Sponsor</h2>

                <p className="contact-text">
                    Interested in supporting WEAP? We offer flexible sponsorship packages 
                    and can tailor opportunities to your organization's goals.
                </p>

                <div className="contact-box">
                    <p><strong>Contact:</strong> Ethan Greene</p>
                    <p><strong>Email:</strong>
                        <a 
                            href="mailto:egreene4@uwo.ca"
                            style={{ 
                                color: '#007bff',
                                textDecoration: 'underline',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}>
                            egreene4@uwo.ca
                        </a>
                    </p>
                </div>
            </section>    

        </div>
    );
};

export default Sponsors;