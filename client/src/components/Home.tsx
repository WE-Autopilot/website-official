import React, { useState } from "react";
import { ArrowRight, Cpu, Eye, Compass, Wrench, Shield, Zap, Sparkles, Layers, Award } from "lucide-react";
import { Link } from "react-router-dom";
import Roadmap from "./Roadmap";
import Teams from "./Teams";
import Badge from "./design-system/Badge";
import Button from "./design-system/Button";
import Card from "./design-system/Card";
import MetricCard from "./design-system/MetricCard";
import SectionHeading from "./design-system/SectionHeading";
import TechGridBackground from "./design-system/TechGridBackground";
import "../stylesheets/Home.css";

const teamPhotos = [
  { src: "/FirstEverAGM.jpeg", label: "First Ever AGM Meeting" },
  { src: "/LastYearsExecs.png", label: "Executive Leadership Team" },
  { src: "/TeamPhoto1.webp", label: "General Team Photo" },
  { src: "/MINSTWorkshop.JPG", label: "Autonomous ML Workshop" },
  { src: "/RCCars.jpeg", label: "Physical RC Autonomous Testing" },
  { src: "/ThisYearsExecs.JPG", label: "2025/2026 Executive Team" },
  { src: "/ThisYearsAGM.JPG", label: "Annual General Assembly" },
];

export const Home: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="ds-home-root">
      {/* 1. HERO SECTION */}
      <section className="ds-hero-section">
        <TechGridBackground variant="both" glowColor="both">
          <div className="ds-hero-content-wrapper">
            
            {/* Top Pill Badge */}
            <div className="ds-hero-badge-wrap">
              <Badge variant="purple" size="sm" dot pulse>
                WESTERN ENGINEERING AUTOPILOT CLUB
              </Badge>
              <Badge variant="cyan" size="sm">
                2026 VEHICLE PROGRAM
              </Badge>
            </div>

            {/* Main Title */}
            <h1 className="ds-home-hero-title">
              Engineering the Next Generation of{" "}
              <span className="ds-gradient-text">Autonomous Mobility.</span>
            </h1>

            {/* Subtitle */}
            <p className="ds-home-hero-desc">
              We are Western University students researching, designing, and manufacturing full-scale Level 2+ self-driving vehicles through hands-on multidisciplinary engineering.
            </p>

            {/* Hero CTAs */}
            <div className="ds-hero-cta-group">
              <Button
                variant="glow"
                size="lg"
                href="#Roadmap"
                rightIcon={<ArrowRight size={18} />}
              >
                Explore Our Roadmap
              </Button>
              <Button
                variant="secondary"
                size="lg"
                to="/team"
              >
                Meet the Team
              </Button>
            </div>

            {/* Telemetry Status Banner */}
            <div className="ds-hero-telemetry-strip">
              <div className="ds-telemetry-indicator-item">
                <span className="ds-pulse-dot" />
                <span className="ds-mono ds-telemetry-text">STATUS: ACTIVE IN-LAB & SIMULATION</span>
              </div>
              <div className="ds-telemetry-sep">•</div>
              <div className="ds-telemetry-indicator-item">
                <span className="ds-mono ds-telemetry-text">CURRENT PLATFORM: FULL-SCALE AUTONOMOUS GOLF CART</span>
              </div>
            </div>

          </div>
        </TechGridBackground>
      </section>

      {/* 2. KEY METRICS STATS BAR */}
      <section className="ds-metrics-bar-section">
        <div className="ds-home-container">
          <div className="ds-home-metrics-grid">
            <MetricCard
              value="45+"
              label="Student Engineers"
              sublabel="Software, Hardware & Systems"
              trend="+30% growth"
              icon={<Cpu size={20} />}
            />
            <MetricCard
              value="4"
              label="Specialized Subteams"
              sublabel="Perception, Localization, Planning, Build"
              icon={<Layers size={20} />}
            />
            <MetricCard
              value="Level 2+"
              label="Autonomy Target"
              sublabel="Waypoint navigation & obstacle avoidance"
              icon={<Zap size={20} />}
            />
            <MetricCard
              value="100%"
              label="Student Engineered"
              sublabel="From CAD chassis to MPC algorithms"
              icon={<Award size={20} />}
            />
          </div>
        </div>
      </section>

      {/* 3. PHOTO / WORKSHOP CAROUSEL */}
      <section className="ds-carousel-section">
        <div className="ds-home-container">
          <div className="ds-carousel-header">
            <Badge variant="cyan" size="sm" dot>
              LIFE AT WEAP
            </Badge>
            <h3 className="ds-carousel-title">Workshops, Testing & Team Milestones</h3>
          </div>
        </div>

        <div
          className="ds-home-photo-strip"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={`ds-photo-track ${isPaused ? "ds-track-paused" : ""}`}>
            {/* First sequence */}
            {teamPhotos.map((photo, i) => (
              <div key={`p1-${i}`} className="ds-photo-card">
                <img src={photo.src} alt={photo.label} loading="lazy" />
                <div className="ds-photo-caption">
                  <span>{photo.label}</span>
                </div>
              </div>
            ))}
            {/* Duplicated sequence for infinite scroll */}
            {teamPhotos.map((photo, i) => (
              <div key={`p2-${i}`} className="ds-photo-card">
                <img src={photo.src} alt={photo.label} loading="lazy" />
                <div className="ds-photo-caption">
                  <span>{photo.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ABOUT US & MISSION PILLARS */}
      <section className="ds-about-section">
        <div className="ds-home-container">
          <SectionHeading
            badge="OUR MISSION"
            title="Empowering the Next Wave of"
            titleGradient="Autonomous Robotics Engineers"
            subtitle="Bridging classroom theory with real-world autonomous vehicle design, testing, and production."
          />

          <div className="ds-mission-grid">
            <Card variant="glass" padding="lg" className="ds-mission-card">
              <div className="ds-mission-icon-box ds-icon-purple">
                <Cpu size={24} />
              </div>
              <h4 className="ds-mission-card-title">Real-World Autonomous Systems</h4>
              <p className="ds-mission-card-desc">
                We empower students to construct physical drive-by-wire vehicles, custom sensor rigs, and compute architectures that operate in real outdoor environments.
              </p>
            </Card>

            <Card variant="glass" padding="lg" className="ds-mission-card">
              <div className="ds-mission-icon-box ds-icon-cyan">
                <Eye size={24} />
              </div>
              <h4 className="ds-mission-card-title">Advanced Sensor Fusion & AI</h4>
              <p className="ds-mission-card-desc">
                Implementing state-of-the-art multi-beam LiDAR point cloud processing, deep vision neural nets (YOLO), and Extended Kalman Filter state estimators.
              </p>
            </Card>

            <Card variant="glass" padding="lg" className="ds-mission-card">
              <div className="ds-mission-icon-box ds-icon-emerald">
                <Shield size={24} />
              </div>
              <h4 className="ds-mission-card-title">Safety & Control Architecture</h4>
              <p className="ds-mission-card-desc">
                Developing robust failsafe emergency-stop protocols, CAN bus telemetry, and Model Predictive Control (MPC) motion trajectories for collision-free driving.
              </p>
            </Card>

            <Card variant="glass" padding="lg" className="ds-mission-card">
              <div className="ds-mission-icon-box ds-icon-blue">
                <Zap size={24} />
              </div>
              <h4 className="ds-mission-card-title">Industry Collaboration</h4>
              <p className="ds-mission-card-desc">
                Partnering with industry sponsors, automotive tech leaders, and faculty researchers to prepare members for top autonomy and robotics engineering roles.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. SUB-TEAMS SHOWCASE */}
      <Teams />

      {/* 6. ROADMAP TIMELINE */}
      <Roadmap />

      {/* 7. READY TO JOIN CTA */}
      <section className="ds-join-cta-section">
        <div className="ds-home-container">
          <div className="ds-join-cta-card">
            <div className="ds-cta-ambient-glow" />
            <div className="ds-cta-inner">
              <Badge variant="purple" size="sm" dot pulse>
                RECRUITMENT OPEN
              </Badge>
              <h2 className="ds-join-cta-title">
                Ready to Build the Future with Us?
              </h2>
              <p className="ds-join-cta-desc">
                Whether you're into Machine Learning, Embedded C++, Control Theory, or Mechanical CAD, there's a place for you on our engineering sub-teams.
              </p>
              <div className="ds-join-cta-btns">
                <Button to="/join" variant="glow" size="lg" rightIcon={<ArrowRight size={18} />}>
                  Apply to Join WEAP
                </Button>
                <Button to="/sponsors" variant="secondary" size="lg">
                  Sponsor Our Team
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
