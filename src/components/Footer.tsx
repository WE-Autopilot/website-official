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
              {import.meta.env.MODE === "design" && (
                <li><Link to="/design-system">Design System</Link></li>
              )}
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
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
