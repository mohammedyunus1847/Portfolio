import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { navLinks, profile } from "../data/siteData";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  /* Solid glass background after scrolling */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* Lock page scroll while the mobile menu is open */
  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
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
          aria-label="Yunus Mohammed — home"
        >
          <span className="navbar__logo-mark">{profile.logo}</span>
          <span className="navbar__logo-text">{profile.name}</span>
        </a>

        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link ${active === link.href ? "is-active" : ""}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
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

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`navbar__mobile ${open ? "is-open" : ""}`}
        onClick={() => setOpen(false)}
      >
        <div className="navbar__mobile-inner" onClick={(e) => e.stopPropagation()}>
          <ul className="navbar__mobile-list">
            {navLinks.map((link, i) => (
              <li key={link.href} style={{ transitionDelay: `${i * 45}ms` }}>
                <a
                  href={link.href}
                  className={`navbar__mobile-link ${active === link.href ? "is-active" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

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
