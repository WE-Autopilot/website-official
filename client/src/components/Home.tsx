import React, { useState } from "react";
import { ArrowRight, Cpu, Eye, Car, BookOpen, Layers, Users } from "lucide-react";
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
  { src: "/MINSTWorkshop.JPG", label: "Computer Vision ML Workshop" },
  { src: "/RCCars.jpeg", label: "RC Autonomous Vehicle Testing" },
  { src: "/ThisYearsExecs.JPG", label: "2025/2026 Executive Team" },
  { src: "/ThisYearsAGM.JPG", label: "Annual General Assembly" },
];

export const Home: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="ds-home-root">
      {/* 1. HERO & METRICS AREA (Covered seamlessly by Antigravity Grid) */}
      <TechGridBackground className="ds-hero-metrics-wrapper">
        <section className="ds-hero-section">
          <div className="ds-hero-content-wrapper">

            {/* Main Title */}
            <h1 className="ds-home-hero-title">
              Engineering a self-driving car at <span className="ds-gradient-text">WesternU.</span>
            </h1>

            {/* Subtitle */}
            <p className="ds-home-hero-desc">
              We're an undergraduate engineering club at Western University building an autonomous vehicle — from perception models and path planning to drive-by-wire mechanics.
            </p>

            {/* Hero CTAs */}
            <div className="ds-hero-cta-group">
              <Button
                variant="glow"
                size="lg"
                href="#Teams"
                rightIcon={<ArrowRight size={18} />}
              >
                Explore Sub-teams
              </Button>
              <Button
                variant="secondary"
                size="lg"
                to="/team"
              >
                Meet the Team
              </Button>
            </div>

          </div>
        </section>

        {/* 2. KEY METRICS STATS BAR (40+ Student Members Area) */}
        <section className="ds-metrics-bar-section">
          <div className="ds-home-container">
            <div className="ds-home-metrics-grid">
              <MetricCard
                value="40+"
                label="Student Members"
                sublabel="Software, Electrical & Mechanical"
                icon={<Users size={20} />}
              />
              <MetricCard
                value="4"
                label="Engineering Sub-teams"
                sublabel="Planning, Perception, Localization, Build"
                icon={<Layers size={20} />}
              />
              <MetricCard
                value="Full Scale"
                label="Vehicle Platform"
                sublabel="Physical vehicle build & testing"
                icon={<Car size={20} />}
              />
              <MetricCard
                value="100%"
                label="Student-Run"
                sublabel="Hands-on extracurricular team"
                icon={<BookOpen size={20} />}
              />
            </div>
          </div>
        </section>
      </TechGridBackground>

      {/* 3. PHOTO / WORKSHOP CAROUSEL */}
      <section className="ds-carousel-section">
        <div className="ds-home-container">
          <div className="ds-carousel-header">
            <Badge variant="cyan" size="sm" dot>
              OUR WORK
            </Badge>
            <h3 className="ds-carousel-title">Workshops, Projects & Testing</h3>
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

      {/* 4. ABOUT US & WHAT WE DO */}
      <section className="ds-about-section">
        <div className="ds-home-container">
          <SectionHeading
            title="Hands-on Autonomous Vehicle"
            titleGradient="Engineering"
            subtitle="We give undergraduate students practical experience designing, coding, and building real autonomous systems."
          />

          <div className="ds-mission-grid">
            <Card variant="glass" padding="lg" className="ds-mission-card">
              <div className="ds-mission-icon-box ds-icon-purple">
                <Cpu size={24} />
              </div>
              <h4 className="ds-mission-card-title">Autonomous Software Stack</h4>
              <p className="ds-mission-card-desc">
                We develop our entire autonomy stack in-house from scratch. We build and test software in iterative cycles—from path planners to control algorithms—working towards a complete self-driving system.
              </p>
            </Card>

            <Card variant="glass" padding="lg" className="ds-mission-card">
              <div className="ds-mission-icon-box ds-icon-cyan">
                <Eye size={24} />
              </div>
              <h4 className="ds-mission-card-title">Computer Vision</h4>
              <p className="ds-mission-card-desc">
                We train custom vision models and process live depth camera feeds and 3D LiDAR point clouds to detect lane markings, identify obstacles, and recognize traffic signs in real time.
              </p>
            </Card>

            <Card variant="glass" padding="lg" className="ds-mission-card">
              <div className="ds-mission-icon-box ds-icon-emerald">
                <Car size={24} />
              </div>
              <h4 className="ds-mission-card-title">Hardware Testing</h4>
              <p className="ds-mission-card-desc">
                Your work won't just stay in simulation. We mount sensors and computers onto our physical vehicle and golf cart platform, deploying code and validating algorithms in real outdoor testing environments.
              </p>
            </Card>

            <Card variant="glass" padding="lg" className="ds-mission-card">
              <div className="ds-mission-icon-box ds-icon-blue">
                <BookOpen size={24} />
              </div>
              <h4 className="ds-mission-card-title">Workshops & Mentorship</h4>
              <p className="ds-mission-card-desc">
                Come learn about computer vision, AI, control systems, and robotics at our club workshops! You can also connect with industry partners and alumni at our partnered events.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. SUB-TEAMS SHOWCASE */}
      <Teams />

      {/* 6. JOIN CTA */}
      <section className="ds-join-cta-section">
        <div className="ds-home-container">
          <div className="ds-join-cta-card">
            <div className="ds-cta-ambient-glow" />
            <div className="ds-cta-inner">
              <Badge variant="purple" size="sm" dot>
                JOIN THE TEAM
              </Badge>
              <h2 className="ds-join-cta-title">
                Interested in joining our club?
              </h2>
              <p className="ds-join-cta-desc">
                We recruit each term across software, electrical, mechatronics, and mechanical engineering. No prior self-driving vehicle experience is needed.
              </p>
              <div className="ds-join-cta-btns">
                <Button to="/join" variant="glow" size="lg" rightIcon={<ArrowRight size={18} />}>
                  Apply to Join
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
