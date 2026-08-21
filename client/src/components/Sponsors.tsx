import React from "react";
import { Mail, CheckCircle2, Award, Zap, Users, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
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
          badge="INDUSTRY PARTNERS"
          title="Our Sponsors &"
          titleGradient="Corporate Partners"
          subtitle="Empowering student engineering innovation through cutting-edge software, hardware, and sponsorship support."
        />

        {/* Current Sponsors Grid */}
        <div className="ds-current-sponsors-section">
          <Card variant="glass" padding="xl" className="ds-sponsor-spotlight-card">
            <div className="ds-sponsor-badge-row">
              <Badge variant="purple" size="sm" dot>OFFICIAL RTOS & EMBEDDED PARTNER</Badge>
              <Badge variant="cyan" size="sm">TIER 1 SPONSOR</Badge>
            </div>

            <div className="ds-sponsor-logo-box">
              <img src={BlackberryQNX} alt="BlackBerry QNX" className="ds-sponsor-img" />
            </div>

            <div className="ds-sponsor-details">
              <h3>BlackBerry QNX</h3>
              <p>
                Providing industry-standard deterministic real-time operating systems (RTOS) and embedded developer toolchains
                to power our vehicle safety architecture and low-latency drive-by-wire controller stack.
              </p>
            </div>
          </Card>
        </div>

        {/* Why Sponsor Us Grid */}
        <div className="ds-why-sponsor-section">
          <SectionHeading
            badge="VALUE & IMPACT"
            title="Why Partner with"
            titleGradient="Western AutoPilot?"
            subtitle="Collaborate with Western's top engineering talent on high-impact autonomous vehicle challenges."
          />

          <div className="ds-benefits-grid">
            <Card variant="glass" padding="lg" className="ds-benefit-card">
              <div className="ds-benefit-icon-box ds-icon-purple">
                <Users size={24} />
              </div>
              <h4>Direct Access to Top Talent</h4>
              <p>
                Connect directly with passionate software, computer, electrical, and mechanical engineering students with hands-on robotics experience.
              </p>
            </Card>

            <Card variant="glass" padding="lg" className="ds-benefit-card">
              <div className="ds-benefit-icon-box ds-icon-cyan">
                <Zap size={24} />
              </div>
              <h4>Technology Integration</h4>
              <p>
                Have your developer tools, sensors, compute kits, or hardware deployed and battle-tested on an active self-driving vehicle platform.
              </p>
            </Card>

            <Card variant="glass" padding="lg" className="ds-benefit-card">
              <div className="ds-benefit-icon-box ds-icon-emerald">
                <Award size={24} />
              </div>
              <h4>Prominent Brand Visibility</h4>
              <p>
                Showcase your logo on our vehicle chassis, team apparel, recruitment events, technical workshops, and digital media channels.
              </p>
            </Card>

            <Card variant="glass" padding="lg" className="ds-benefit-card">
              <div className="ds-benefit-icon-box ds-icon-blue">
                <ShieldCheck size={24} />
              </div>
              <h4>Support STEM Innovation</h4>
              <p>
                Help student engineers gain invaluable experience in automotive safety, deep learning, and advanced manufacturing.
              </p>
            </Card>
          </div>
        </div>

        {/* Contact & Sponsorship Packages Card */}
        <div className="ds-sponsor-cta-section">
          <Card variant="glass" padding="xl" className="ds-sponsor-cta-card">
            <div className="ds-sponsor-cta-content">
              <Badge variant="purple" size="sm" dot pulse>SPONSORSHIP PACKAGES 2026</Badge>
              <h2 className="ds-sponsor-cta-title">Become an Official Sponsor</h2>
              <p className="ds-sponsor-cta-desc">
                We offer customizable sponsorship tiers tailored to your organization's recruitment and technological goals.
                Get in touch with our finance and executive team today.
              </p>

              <div className="ds-sponsor-contact-box">
                <div className="ds-contact-rep-info">
                  <span className="ds-rep-name">Ethan Greene</span>
                  <span className="ds-rep-role">VP Finance & Corporate Relations</span>
                </div>
                <Button
                  href="mailto:egreene4@uwo.ca"
                  variant="glow"
                  size="md"
                  leftIcon={<Mail size={16} />}
                >
                  Contact Sponsorship Team
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
