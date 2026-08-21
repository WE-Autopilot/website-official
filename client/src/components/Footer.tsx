import React, { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, MessageSquare, ExternalLink } from "lucide-react";
import Logo from "./design-system/Logo";
import "../stylesheets/Footer.css";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="ds-footer">
      <div className="ds-footer-top-line" />

      <div className="ds-footer-container">
        <div className="ds-footer-grid">
          {/* Brand Col */}
          <div className="ds-footer-brand-col">
            <Logo size="lg" punctuation="/" animateOnHover linkToHome />
            <p className="ds-footer-tagline">
              An undergraduate engineering club at Western University building an autonomous vehicle platform from scratch.
            </p>
          </div>

          {/* Navigation Col */}
          <div className="ds-footer-nav-col">
            <h4 className="ds-footer-heading">Navigation</h4>
            <ul className="ds-footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/team">Our Team</Link></li>
              <li><Link to="/sponsors">Sponsors</Link></li>
              <li><Link to="/join">Join the Club</Link></li>
              <li><Link to="/design-system">Design System</Link></li>
            </ul>
          </div>

          {/* Sub-teams Col */}
          <div className="ds-footer-nav-col">
            <h4 className="ds-footer-heading">Sub-teams</h4>
            <ul className="ds-footer-links">
              <li><Link to="/teams/planning-and-control">Planning & Control</Link></li>
              <li><Link to="/teams/perception">Perception</Link></li>
              <li><Link to="/teams/localization">Localization & Mapping</Link></li>
              <li><Link to="/teams/build">Build & Mechanical</Link></li>
            </ul>
          </div>

          {/* Socials & Connect Col */}
          <div className="ds-footer-social-col">
            <h4 className="ds-footer-heading">Connect With Us</h4>
            <p className="ds-footer-social-desc">
              Follow our projects, open-source repositories, and club announcements.
            </p>
            <div className="ds-footer-social-icons">
              <a
                href="https://github.com/WE-Autopilot"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="ds-social-icon-btn ds-social-github"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/we-autopilot/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="ds-social-icon-btn ds-social-linkedin"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/we.autopilot"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="ds-social-icon-btn ds-social-instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://discord.com/invite/HuJCHCSVB2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="ds-social-icon-btn ds-social-discord"
              >
                <MessageSquare size={18} />
              </a>
              <a
                href="https://linktr.ee/we.autopilot"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkTree"
                className="ds-social-icon-btn ds-social-linktree"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="ds-footer-bottom">
          <div className="ds-footer-copy">
            © {new Date().getFullYear()} Western Engineering AutoPilot (WEAP). Western University.
          </div>

          <button className="ds-back-to-top" onClick={scrollToTop} aria-label="Back to top">
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
