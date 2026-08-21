import React from "react";
import { Mail, ArrowUpRight, Heart } from "lucide-react";
import SectionHeading from "./design-system/SectionHeading";
import Card from "./design-system/Card";
import Button from "./design-system/Button";
import TechGridBackground from "./design-system/TechGridBackground";
import BlackberryQNX from "../assets/BlackberryQNX.png";
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
          subtitle="We're proud to be supported by industry leaders who believe in student engineering."
        />

        {/* Traditional Sponsor Showcase with a Personalized Twist */}
        <div className="ds-traditional-sponsors-section">
          <div className="ds-sponsor-hero-box">
            
            {/* Logo Display Pedestal */}
            <a
              href="https://blackberry.qnx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ds-sponsor-logo-pedestal"
              aria-label="Visit BlackBerry QNX"
            >
              <img
                src={BlackberryQNX}
                alt="BlackBerry QNX"
                className="ds-qnx-logo-img"
              />
            </a>

            {/* Personalized Note */}
            <div className="ds-sponsor-personalized-note">
              <div className="ds-sponsor-note-header">
                <span className="ds-sponsor-heart-icon">❤️</span>
                <h3 className="ds-sponsor-note-title">A special thank you to BlackBerry QNX</h3>
              </div>
              <p className="ds-sponsor-note-text">
                A massive thank you to <strong>BlackBerry QNX</strong> for believing in our club and supporting our engineering team! Through their generous support, our students get access to better tools and sensors as well as the same real-time operating system used in mission-critical automotive systems worldwide.
              </p>
              <p className="ds-sponsor-note-text">
                Having access to QNX technology lets our software and control sub-teams learn, build, and test production-grade embedded code right here on campus.
              </p>
              
              <div className="ds-sponsor-action-row">
                <a
                  href="https://blackberry.qnx.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ds-sponsor-visit-link"
                >
                  <span>Visit BlackBerry QNX</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

          </div>
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
