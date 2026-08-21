import React, { useState, useRef, memo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Sparkles, Menu, X } from "lucide-react";
import onClickOutside from "../hooks/onClickOutside";
import Logo from "./design-system/Logo";
import Button from "./design-system/Button";
import "../stylesheets/Header.css";

interface HeaderProps {
  className?: string;
}

const teamLinks = [
  { label: "Planning & Control", path: "/teams/planning-and-control" },
  { label: "Perception", path: "/teams/perception" },
  { label: "Mapping & Localization", path: "/teams/localization" },
  { label: "Build & Mechanical", path: "/teams/build" },
];

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const [isMenu, setMenu] = useState<boolean>(false);
  const [isTeamsOpen, setTeamsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClose = () => {
    setMenu(false);
    setTeamsOpen(false);
  };

  const handleMouseEnter = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    setTeamsOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setTeamsOpen(false);
    }, 200);
  };

  onClickOutside(navRef, () => {
    if (isMenu) handleMenuClose();
    if (isTeamsOpen) setTeamsOpen(false);
  });

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`ds-header ${scrolled ? "ds-header-scrolled" : ""} ${className}`}>
      <div className="ds-header-inner">
        {/* Logo */}
        <div className="ds-header-logo-wrap">
          <Logo size="md" punctuation="/" linkToHome animateOnHover />
        </div>

        {/* Desktop Nav Links */}
        <nav ref={navRef} className={`ds-header-nav ${isMenu ? "ds-nav-open" : ""}`}>
          <ul className="ds-nav-list">
            <li>
              <Link
                className={`ds-nav-link ${isActive("/") ? "ds-nav-link-active" : ""}`}
                to="/"
                onClick={handleMenuClose}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={`ds-nav-link ${isActive("/team") ? "ds-nav-link-active" : ""}`}
                to="/team"
                onClick={handleMenuClose}
              >
                Our Team
              </Link>
            </li>

            {/* Sub-teams Dropdown */}
            <li
              className="ds-dropdown"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`ds-nav-link ds-dropdown-toggle ${location.pathname.startsWith("/teams/") ? "ds-nav-link-active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setTeamsOpen((prev) => !prev);
                }}
                aria-expanded={isTeamsOpen}
                aria-haspopup="true"
              >
                <span>Sub-teams</span>
                <ChevronDown size={14} className={`ds-dropdown-arrow ${isTeamsOpen ? "ds-arrow-rotated" : ""}`} />
              </button>

              {isTeamsOpen && (
                <div
                  className="ds-dropdown-menu"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {teamLinks.map((team) => (
                    <Link
                      key={team.path}
                      className="ds-dropdown-item"
                      to={team.path}
                      onClick={handleMenuClose}
                    >
                      <span className="ds-dropdown-item-label">{team.label}</span>
                      <span className="ds-dropdown-item-indicator" />
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li>
              <Link
                className={`ds-nav-link ${isActive("/sponsors") ? "ds-nav-link-active" : ""}`}
                to="/sponsors"
                onClick={handleMenuClose}
              >
                Sponsors
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right CTA & Mobile Hamburger */}
        <div className="ds-header-actions">
          <div className="ds-header-cta-desktop">
            <Button to="/join" variant="glow" size="sm" leftIcon={<Sparkles size={14} />}>
              Join Club
            </Button>
          </div>

          <button
            className="ds-mobile-menu-btn"
            onClick={() => setMenu(!isMenu)}
            aria-expanded={isMenu}
            aria-label={isMenu ? "Close menu" : "Open menu"}
          >
            {isMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMenu && <div className="ds-drawer-overlay" onClick={handleMenuClose} />}
    </header>
  );
};

export default memo(Header);
