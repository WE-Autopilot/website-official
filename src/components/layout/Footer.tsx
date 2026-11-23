import { Link } from "react-router-dom";
import { Rss } from "lucide-react";
import { site } from "../../content/site";
import { subteams } from "../../content/subteams";
import { ui } from "../../content/pages";
import { Logo } from "../design-system";
import { SocialIcon } from "./SocialIcon";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="pen-rule" aria-hidden="true" />
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Logo width={128} linkHome />
            <p className="site-footer__tagline">{site.tagline}</p>
            <h2 className="visually-hidden">{site.footer.socialHeading}</h2>
            <ul className="site-footer__socials">
              {site.socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-btn"
                    aria-label={`${s.label} ${ui.opensInNewTab}`}
                    title={s.label}
                  >
                    <SocialIcon id={s.id} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-explore">
            <h2 id="footer-explore" className="site-footer__heading">
              {site.footer.exploreHeading}
            </h2>
            <ul className="site-footer__links">
              {site.footer.explore.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-subteams">
            <h2 id="footer-subteams" className="site-footer__heading">
              {site.footer.subteamsHeading}
            </h2>
            <ul className="site-footer__links">
              {subteams.map((t) => (
                <li key={t.slug}>
                  <Link to={`/teams/${t.slug}`}>{t.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p className="caption">
            © {new Date().getFullYear()} {site.footer.copyright}
          </p>
          <a className="site-footer__rss" href="/rss.xml">
            <Rss size={16} aria-hidden="true" />
            {site.footer.rssLabel}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
