import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { site } from "../../content/site";
import { subteams } from "../../content/subteams";
import { ui } from "../../content/pages";
import { Button, Logo } from "../design-system";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { SocialIcon } from "./SocialIcon";
import "./Header.css";

function SubteamsDropdown() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const wrapRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const { pathname } = useLocation();
  const active = pathname.startsWith("/teams/");

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const openNow = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 180);
  };

  return (
    <li
      ref={wrapRef}
      className="nav-dropdown"
      onPointerEnter={(e) => e.pointerType === "mouse" && openNow()}
      onPointerLeave={(e) => e.pointerType === "mouse" && closeSoon()}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className={`nav-link nav-dropdown__toggle ${active ? "is-active" : ""}`}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
      >
        {site.subteamsMenu.label}
        <ChevronDown size={16} aria-hidden="true" className="nav-dropdown__chevron" />
      </button>
      <ul id={menuId} className="nav-dropdown__menu sketch" hidden={!open}>
        {subteams.map((t) => (
          <li key={t.slug}>
            <NavLink to={`/teams/${t.slug}`} className="nav-dropdown__item">
              {t.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useFocusTrap(sheetRef, true, onClose, closeRef);

  return (
    <div ref={sheetRef} className="mobile-menu" role="dialog" aria-modal="true" aria-label={site.name}>
      <div className="mobile-menu__top container">
        <Logo width={92} linkHome />
        <button ref={closeRef} type="button" className="icon-btn" onClick={onClose} aria-label={ui.closeMenu}>
          <X size={28} aria-hidden="true" />
        </button>
      </div>
      <nav className="mobile-menu__nav container" aria-label={ui.mainNav}>
        <ul className="mobile-menu__list">
          {site.nav.slice(0, site.subteamsMenu.after).map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className="mobile-menu__link">
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <span className="mobile-menu__group">{site.subteamsMenu.label}</span>
            <ul className="mobile-menu__sublist">
              {subteams.map((t) => (
                <li key={t.slug}>
                  <NavLink to={`/teams/${t.slug}`} className="mobile-menu__sublink">
                    {t.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
          {site.nav.slice(site.subteamsMenu.after).map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className="mobile-menu__link">
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <Button to={site.joinButton.to} size="lg" arrow className="mobile-menu__join">
          {site.joinButton.label}
        </Button>
        <ul className="mobile-menu__socials">
          {site.socials.map((s) => (
            <li key={s.id}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label={`${s.label} ${ui.opensInNewTab}`}>
                <SocialIcon id={s.id} />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setMenuOpen(false), [pathname]);

  const before = site.nav.slice(0, site.subteamsMenu.after);
  const after = site.nav.slice(site.subteamsMenu.after);

  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <Logo width={104} linkHome className="site-header__logo" />

        <nav className="site-nav" aria-label={ui.mainNav}>
          <ul className="site-nav__list">
            {before.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className="nav-link">
                  {item.label}
                </NavLink>
              </li>
            ))}
            <SubteamsDropdown />
            {after.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className="nav-link">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Button to={site.joinButton.to} className="site-nav__join">
            {site.joinButton.label}
          </Button>
        </nav>

        <div className="site-header__mobile">
          <Link to={site.joinButton.to} className="site-header__mobile-join">
            {site.joinButton.label}
          </Link>
          <button
            type="button"
            className="icon-btn"
            aria-expanded={menuOpen}
            aria-label={ui.openMenu}
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={28} aria-hidden="true" />
          </button>
        </div>
      </div>
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </header>
  );
}

export default Header;
