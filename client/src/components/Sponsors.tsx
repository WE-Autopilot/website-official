import React from "react";
import { Mail, Award, Zap, Users, ShieldCheck } from "lucide-react";
import SectionHeading from "./design-system/SectionHeading";
import Badge from "./design-system/Badge";
import Card from "./design-system/Card";
import Button from "./design-system/Button";
import TechGridBackground from "./design-system/TechGridBackground";
import BlackberryQNX from "../assets/BlackberryQNXSponsor.png";
import "../stylesheets/Sponsors.css";

export const Sponsors: React.FC = () => {
  return (
    <TechGridBackground variant="both" glowColor="both" className="ds-sponsors-root">
      <div className="ds-sponsors-container">
        
        {/* Header */}
        <SectionHeading
          badge="SPONSORS"
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
            badge="PARTNERSHIP"
            title="Why Sponsor"
            titleGradient="autopilot/?"
            subtitle="Support hands-on student engineering and connect with Western undergraduates."
          />

          <div className="ds-benefits-grid">
            <Card variant="glass" padding="lg" className="ds-benefit-card">
              <div className="ds-benefit-icon-box ds-icon-purple">
                <Users size={24} />
              </div>
              <h4>Connect with Students</h4>
              <p>
                Meet passionate software, electrical, mechatronics, and mechanical engineering students who build real extracurricular projects.
              </p>
            </Card>

            <Card variant="glass" padding="lg" className="ds-benefit-card">
              <div className="ds-benefit-icon-box ds-icon-cyan">
                <Zap size={24} />
              </div>
              <h4>Tool & Hardware Usage</h4>
              <p>
                Get your sensors, development boards, software tools, or hardware platforms into the hands of student developers.
              </p>
            </Card>

            <Card variant="glass" padding="lg" className="ds-benefit-card">
              <div className="ds-benefit-icon-box ds-icon-emerald">
                <Award size={24} />
              </div>
              <h4>Logo Visibility</h4>
              <p>
                Your brand featured on our vehicle chassis, team apparel, technical workshop slides, and club website.
              </p>
            </Card>

            <Card variant="glass" padding="lg" className="ds-benefit-card">
              <div className="ds-benefit-icon-box ds-icon-blue">
                <ShieldCheck size={24} />
              </div>
              <h4>Support Student Engineering</h4>
              <p>
                Help fund vehicle parts, microcontrollers, mechanical materials, and workshop equipment for students.
              </p>
            </Card>
          </div>
        </div>

        {/* Contact Card */}
        <div className="ds-sponsor-cta-section">
          <Card variant="glass" padding="xl" className="ds-sponsor-cta-card">
            <div className="ds-sponsor-cta-content">
              <Badge variant="purple" size="sm" dot>GET IN TOUCH</Badge>
              <h2 className="ds-sponsor-cta-title">Interested in Sponsoring?</h2>
              <p className="ds-sponsor-cta-desc">
                We'd love to discuss sponsorship packages or hardware donations. Contact our VP Finance to connect.
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
