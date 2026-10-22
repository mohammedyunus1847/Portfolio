import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
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
      <div className="container hero__inner">
        {/* ---------------- Introduction ---------------- */}
        <div className="hero__content">
          <p className="hero__label">
            <span className="hero__label-dot" aria-hidden="true" />
            {hero.label}
          </p>

          <h1 className="hero__title">
            <span className="hero__title-name">{profile.name}</span>
            <span className="hero__role">
              {hero.roleLead} {hero.roleStack}{" "}
              <span className="hero__role-accent">{hero.roleAccent}</span>
            </span>
          </h1>

          <p className="hero__headline">{hero.headline}</p>
          <p className="hero__description">{hero.description}</p>

          <ul className="tag-row hero__stack">
            {hero.stack.map((tech) => (
              <li key={tech} className="tag">
                {tech}
              </li>
            ))}
          </ul>

          <div className="hero__actions">
            <a href={hero.primaryCta.href} className="btn btn-primary">
              {hero.primaryCta.label}
              <ArrowRight aria-hidden="true" />
            </a>
            <a href={hero.secondaryCta.href} className="btn btn-ghost" download>
              {hero.secondaryCta.label}
            </a>
            <a href={hero.tertiaryCta.href} className="btn btn-outline">
              {hero.tertiaryCta.label}
            </a>
          </div>

          <ul className="hero__socials">
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
        </div>

        {/* ---------------- Portrait ---------------- */}
        <figure className="hero__portrait">
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
                onError={() => setPhotoFailed(true)}
              />
            )}
          </div>
          <figcaption className="hero__portrait-caption">{hero.photoCaption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
