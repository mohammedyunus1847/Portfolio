import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/BrandIcons";
import { hero, links, profile } from "../data/siteData";
import "./Hero.css";

const socials = [
  { label: "GitHub", href: links.github, Icon: GithubIcon },
  { label: "LinkedIn", href: links.linkedin, Icon: LinkedinIcon },
  { label: "Email", href: `mailto:${links.email}`, Icon: Mail },
];

export default function Hero() {
  /* If the photo file is missing we show the monogram instead of a broken image */
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section id="home" className="hero">
      <div className="hero__atmosphere" aria-hidden="true">
        <span className="hero__orb hero__orb--1" />
        <span className="hero__orb hero__orb--2" />
        <span className="hero__orb hero__orb--3" />
      </div>

      <div className="container hero__inner">
        {/* ---------------- Introduction ---------------- */}
        <div className="hero__content">
          <div className="hero__eyebrow">
            <span className="hero__status">
              <span className="hero__status-dot" aria-hidden="true" />
              {hero.availability}
            </span>
            <span className="hero__eyebrow-sep" aria-hidden="true" />
            <span className="hero__location">{hero.photoCaption}</span>
          </div>

          <h1 className="hero__title">
            <span className="hero__greeting">{hero.greeting}</span>
            <span className="hero__name">
              {hero.displayName}
              <span className="hero__name-dot" aria-hidden="true">
                .
              </span>
            </span>
          </h1>

          <p className="hero__role">
            {hero.rolePrimary}
            <span className="hero__role-sep" aria-hidden="true">
              /
            </span>
            <span className="hero__role-accent">{hero.roleSecondary}</span>
          </p>

          <p className="hero__description">{hero.description}</p>

          <ul className="tag-row hero__stack" aria-label="Core technologies">
            {hero.stack.map((tech) => (
              <li key={tech} className="tag">
                {tech}
              </li>
            ))}
          </ul>

          <div className="hero__actions">
            <a href={hero.primaryCta.href} className="btn btn-primary">
              {hero.primaryCta.label}
              <ArrowRight className="arrow" aria-hidden="true" />
            </a>
            <a href={hero.secondaryCta.href} className="btn btn-ghost" download>
              <Download aria-hidden="true" />
              {hero.secondaryCta.label}
            </a>
          </div>

          <div className="hero__footer">
            <ul className="hero__socials" aria-label="Social links">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="hero__social"
                  >
                    <Icon size={16} aria-hidden="true" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <a href="#contact" className="hero__contact-link">
              Let's talk
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* ---------------- Portrait ---------------- */}
        <figure className="hero__portrait">
          <div className="hero__portrait-glow" aria-hidden="true" />

          <div className="hero__portrait-frame">
            {photoFailed ? (
              <span className="hero__portrait-fallback" aria-hidden="true">
                {profile.logo}
              </span>
            ) : (
              <img
                className="hero__portrait-img"
                src={profile.profileImage}
                alt={profile.profileAlt}
                width="960"
                height="698"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                onError={() => setPhotoFailed(true)}
              />
            )}

            <span className="hero__portrait-tag">
              <span className="hero__portrait-tag-dot" aria-hidden="true" />
              MERN Stack
            </span>
          </div>

          <figcaption className="hero__portrait-caption">
            <span>{hero.photoCaption}</span>
            <span className="hero__portrait-line" aria-hidden="true" />
          </figcaption>
        </figure>
      </div>

      <a href="#quick-scan" className="hero__scroll" aria-label={hero.scrollLabel}>
        <span className="hero__scroll-mouse" aria-hidden="true">
          <span />
        </span>
        <span className="hero__scroll-label">{hero.scrollLabel}</span>
        <ArrowDown size={13} className="hero__scroll-arrow" aria-hidden="true" />
      </a>
    </section>
  );
}
