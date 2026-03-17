import React, { useState, useRef, memo } from "react";
import { Link } from "react-router-dom";
import onClickOutside from "../hooks/onClickOutside";
import "../stylesheets/Header.css";

interface HeaderProps {
  className?: string;
}

const teamLinks = [
  { label: "Planning and Control", path: "/teams/planning-and-control" },
  { label: "Perception", path: "/teams/perception" },
  { label: "Localization", path: "/teams/localization" },
  { label: "Build", path: "/teams/build" },
];

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const [isMenu, setMenu] = useState<boolean>(false);
  const [isTeamsOpen, setTeamsOpen] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);

  const handleMenuClose = () => {
    setMenu(false);
  };

  onClickOutside(navRef, () => {
    if (isMenu) handleMenuClose();
  });

  return (
    <header className={`Header ${className}`}>
      <Link to="/" className="logo-link" aria-label="Home">
        <img src="/headerlogo.png" alt="Logo" className="logo" />
      </Link>

      <div className="menu-icon">
        <button
          className="fimenu"
          onClick={() => {
            setMenu(!isMenu);
          }}
          aria-expanded={isMenu}
          aria-label={isMenu ? "Close menu" : "Open menu"}
        >
          {isMenu ? (
            <svg
              className={`menu-icon menuRotate ${isMenu ? "active" : ""}`}
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                className="line1"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3"
                d="M3,3 L21,21 M3,21 L21,3"
              ></path>
            </svg>
          ) : (
            <svg
              className={`menu-icon menuRotate ${isMenu ? "active" : ""}`}
              stroke="#ffffff"
              fill="none"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1.5em"
              width="1.5em"
              aria-hidden="true"
            >
              <line x1={3} y1={12} x2={21} y2={12} />
              <line x1={3} y1={6} x2={21} y2={6} />
              <line x1={3} y1={18} x2={21} y2={18} />
            </svg>
          )}
        </button>
      </div>

      {isMenu && <div className="drawer-overlay" onClick={handleMenuClose} />}

      <nav ref={navRef} className={`nav ${isMenu ? "open" : ""}`}>
        <ul className="links">
          <li>
            <Link className="nav-link" to="/" onClick={handleMenuClose}>
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/team" onClick={handleMenuClose}>
              Our Team
            </Link>
          </li>
          <li
            className="dropdown"
            onMouseEnter={() => setTeamsOpen(true)}
            onMouseLeave={() => setTeamsOpen(false)}
          >
            <button
              className="nav-link dropdown-toggle"
              onClick={() => setTeamsOpen((prev) => !prev)}
              aria-expanded={isTeamsOpen}
              aria-haspopup="true"
            >
              Teams
            </button>
            {isTeamsOpen && (
              <ul className="dropdown-menu">
                {teamLinks.map((team) => (
                  <li key={team.path}>
                    <Link
                      className="dropdown-item"
                      to={team.path}
                      onClick={() => {
                        setTeamsOpen(false);
                        handleMenuClose();
                      }}
                    >
                      {team.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          {/* <li> 
            <Link className="nav-link" to="/gallery" onClick={handleMenuClose}>
            Gallery</Link> 
            </li> */}
          <li>
            <Link to="/sponsors" onClick={handleMenuClose}>
              Sponsor Us
            </Link>
          </li>
          {/* <li>
            <Link to="/competition" onClick={handleMenuClose}>
              Competition
            </Link>
          </li> */}
          {/* <li className="application-link">
            <Link to="/contact" onClick={handleMenuClose}>
              Application
            </Link>
          </li> */}
        </ul>
      </nav>
      <img
        id="headervector"
        src="/vectors/HeaderVector.svg"
        alt="Decorative header element"
      />
    </header>
  );
};

export default memo(Header);
