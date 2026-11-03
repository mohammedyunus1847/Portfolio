import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { links, navLinks, profile } from "../data/siteData";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";

const [wordmarkBase, wordmarkAccent = ""] = profile.name.split(/(?=\.)/);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  /* Glass background + reading progress */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 24);
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* Highlight the section currently in view */
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-46% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* Lock page scroll while the mobile menu is open, close on Escape */
  useEffect(() => {
    document.body.classList.toggle("nav-open", open);

    if (!open) return;

    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("nav-open");
    };
  }, [open]);

  /* Close the menu if the viewport grows to desktop size */
  useEffect(() => {
    const onResize = () => window.innerWidth > 900 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className={`navbar ${scrolled || open ? "navbar--solid" : ""}`}>
      <nav className="navbar__inner container" aria-label="Main navigation">
        <a
          href="#home"
          className="navbar__logo"
          onClick={() => setOpen(false)}
          aria-label={`${profile.name} — home`}
        >
          <span className="navbar__logo-mark" aria-hidden="true">
            {profile.logo}
          </span>
          <span className="navbar__wordmark">
            {wordmarkBase}
            {wordmarkAccent && <span className="navbar__wordmark-dot">{wordmarkAccent}</span>}
          </span>
        </a>

        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link ${active === link.href ? "is-active" : ""}`}
                aria-current={active === link.href ? "page" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <ThemeToggle className="navbar__theme" />

          <a href={profile.resumeUrl} className="btn btn-primary btn-sm navbar__resume" download>
            <Download aria-hidden="true" />
            <span>Resume</span>
          </a>

          <button
            type="button"
            className="navbar__toggle"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <span
        className="navbar__progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`navbar__mobile ${open ? "is-open" : ""}`}
        onClick={() => setOpen(false)}
      >
        <div className="navbar__mobile-inner" onClick={(e) => e.stopPropagation()}>
          <ul className="navbar__mobile-list">
            {navLinks.map((link, i) => (
              <li key={link.href} style={{ transitionDelay: `${i * 40}ms` }}>
                <a
                  href={link.href}
                  className={`navbar__mobile-link ${active === link.href ? "is-active" : ""}`}
                  aria-current={active === link.href ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className="navbar__mobile-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar__mobile-theme">
            <span>Appearance</span>
            <ThemeToggle />
          </div>

          <div className="navbar__mobile-socials">
            <a href={links.github} target="_blank" rel="noreferrer">
              <GithubIcon size={15} aria-hidden="true" />
              GitHub
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer">
              <LinkedinIcon size={15} aria-hidden="true" />
              LinkedIn
            </a>
            <a href={`mailto:${links.email}`}>Email</a>
          </div>

          <a
            href={profile.resumeUrl}
            className="btn btn-primary navbar__mobile-resume"
            download
            onClick={() => setOpen(false)}
          >
            <Download aria-hidden="true" />
            Download Resume
          </a>
        </div>
      </div>
    </header>
  );
}
