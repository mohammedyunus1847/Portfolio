import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { links, profile } from "../data/siteData";
import "./Footer.css";

const socials = [
  { label: "GitHub", href: links.github, Icon: GithubIcon },
  { label: "LinkedIn", href: links.linkedin, Icon: LinkedinIcon },
  { label: "Email", href: `mailto:${links.email}`, Icon: Mail },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <a href="#home" className="footer__brand">
          <span className="footer__logo-mark" aria-hidden="true">
            {profile.logo}
          </span>
          <span className="footer__brand-text">
            <strong>{profile.name}</strong>
            <small>{profile.role}</small>
          </span>
        </a>

        <ul className="footer__links">
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
      </div>

      <div className="container footer__bottom">
        <p>© 2026 {profile.name}</p>
        <p className="footer__built">Built with React</p>
      </div>
    </footer>
  );
}
