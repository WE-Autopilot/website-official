import React from "react";
import { Mail } from "lucide-react";
import SectionHeading from "./design-system/SectionHeading";
import Badge from "./design-system/Badge";
import Card from "./design-system/Card";
import Button from "./design-system/Button";
import TechGridBackground from "./design-system/TechGridBackground";
import BlackberryQNX from "../assets/BlackberryQNXSponsor.png";
import "../stylesheets/Sponsors.css";

const benefitItems = [
  {
    num: "01",
    title: "Connect with Students",
    description: (
      <>
        Meet <strong>passionate software, electrical, mechatronics, and mechanical engineering students</strong> who build real extracurricular robotics projects.
      </>
    ),
  },
  {
    num: "02",
    title: "Hardware & Tool Integration",
    description: (
      <>
        Put your <strong>sensors, development boards, software toolchains, or compute kits</strong> directly into the hands of active student developers.
      </>
    ),
  },
  {
    num: "03",
    title: "Logo Visibility",
    description: (
      <>
        <strong>Your brand</strong> featured on our <strong>vehicle chassis, team apparel, technical workshop slides, and club website</strong>.
      </>
    ),
  },
  {
    num: "04",
    title: "Growing Club Support",
    description: (
      <>
        As a rapidly growing student club, <strong>any kind of support</strong>—whether financial sponsorship, hardware donations, or technical mentorship—makes a huge difference for our team!
      </>
    ),
  },
];

export const Sponsors: React.FC = () => {
  return (
    <TechGridBackground variant="both" glowColor="both" className="ds-sponsors-root">
      <div className="ds-sponsors-container">
        
        {/* Header */}
        <SectionHeading
          title="Our Sponsors &"
          titleGradient="Partners"
          subtitle="Thank you to the companies and organizations that support undergraduate engineering at Western."
        />

        {/* Current Sponsors Grid */}
        <div className="ds-current-sponsors-section">
          <Card variant="glass" padding="xl" className="ds-sponsor-spotlight-card">
            <div className="ds-sponsor-badge-row">
              <Badge variant="purple" size="sm" dot>OFFICIAL PARTNER</Badge>
            </div>

            <div className="ds-sponsor-logo-box">
              <img src={BlackberryQNX} alt="BlackBerry QNX" className="ds-sponsor-img" />
            </div>

            <div className="ds-sponsor-details">
              <h3>BlackBerry QNX</h3>
              <p>
                Providing real-time operating system (RTOS) licenses and embedded development tools
                to support our vehicle control and system software.
              </p>
            </div>
          </Card>
        </div>

        {/* Why Sponsor Us Grid */}
        <div className="ds-why-sponsor-section">
          <SectionHeading
            title="Why Sponsor"
            titleGradient="autopilot?"
            subtitle="Support hands-on student engineering and connect with Western undergraduates."
          />

          <div className="ds-benefits-grid">
            {benefitItems.map((item) => (
              <Card key={item.num} variant="glass" padding="lg" className="ds-benefit-card">
                <span className="ds-mono ds-benefit-num">{item.num}</span>
                <h4 className="ds-benefit-title">{item.title}</h4>
                <p className="ds-benefit-desc">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Card */}
        <div className="ds-sponsor-cta-section">
          <Card variant="glass" padding="xl" className="ds-sponsor-cta-card">
            <div className="ds-sponsor-cta-content">
              <h2 className="ds-sponsor-cta-title">Interested in Sponsoring?</h2>
              <p className="ds-sponsor-cta-desc">
                We'd love to discuss sponsorship packages, hardware donations, or mentorship opportunities. Reach out to our VP Finance to connect.
              </p>

              <div className="ds-sponsor-contact-box">
                <div className="ds-contact-rep-info">
                  <span className="ds-rep-name">Ethan Greene</span>
                  <span className="ds-rep-role">VP Finance</span>
                </div>
                <Button
                  href="mailto:egreene4@uwo.ca"
                  variant="glow"
                  size="md"
                  leftIcon={<Mail size={16} />}
                >
                  Contact VP Finance
                </Button>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </TechGridBackground>
  );
};

export default Sponsors;
