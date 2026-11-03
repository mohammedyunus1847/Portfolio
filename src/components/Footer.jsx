import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { links, navLinks, profile } from "../data/siteData";
import "./Footer.css";

const socials = [
  { label: "GitHub", href: links.github, Icon: GithubIcon },
  { label: "LinkedIn", href: links.linkedin, Icon: LinkedinIcon },
  { label: "Email", href: `mailto:${links.email}`, Icon: Mail },
];

const currentYear = new Date().getFullYear();

function scrollToTop() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.scrollTo({
    top: 0,
    behavior: reduceMotion ? "auto" : "smooth",
  });
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand-col">
          <a href="#home" className="footer__brand">
            <span className="footer__logo-mark" aria-hidden="true">
              {profile.logo}
            </span>
            <span className="footer__brand-text">
              <strong>{profile.name}</strong>
              <small>{profile.role}</small>
            </span>
          </a>

          <p className="footer__note">
            Full-stack developer focused on building thoughtful, reliable web
            applications.
          </p>
        </div>

        <nav className="footer__col" aria-label="Footer navigation">
          <p className="footer__col-title">Navigate</p>
          <ul className="footer__nav">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <p className="footer__col-title">Connect</p>

          <ul className="footer__socials">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  <Icon size={15} aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a className="footer__email" href={`mailto:${links.email}`}>
            {links.email}
          </a>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {currentYear} {profile.name}
        </p>

        <p className="footer__built">Built with React</p>

        <button type="button" className="footer__to-top" onClick={scrollToTop}>
          Back to top
          <ArrowUp size={14} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
