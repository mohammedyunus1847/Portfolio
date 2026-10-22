import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import Reveal from "./Reveal";
import "./ProjectCard.css";

/* Builds a short monogram for the placeholder cover, e.g. "Job Portal" -> "JP" */
function toMonogram(title) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

/* A link is only rendered when it points somewhere real */
function isUsableLink(url) {
  return typeof url === "string" && url.trim().length > 0;
}

/* How many key features a supporting card shows before it points at the rest */
const SUPPORTING_FEATURE_LIMIT = 3;

/**
 * Reusable project card.
 *
 * Props
 *   project : one object from the `projects` array in src/data/siteData.js
 *   variant : "featured" (large, side-by-side) or "default" (grid card)
 *   delay   : ms used to stagger the reveal animation
 *
 * The card renders whatever the project object contains:
 * missing GitHub / demo links are hidden and a missing image falls back
 * to a designed CSS placeholder, so no card ever shows a broken element.
 */
export default function ProjectCard({ project, variant = "default", delay = 0 }) {
  const [imageFailed, setImageFailed] = useState(false);

  const hasImage = isUsableLink(project.image) && !imageFailed;
  const hasGithub = isUsableLink(project.github);
  const hasDemo = isUsableLink(project.demo);

  /* The featured card carries the full detail; the supporting cards stay
     short and equal in height and point at the remaining features. */
  const isFeatured = variant === "featured";
  const features = project.features ?? [];
  const visibleFeatures = isFeatured
    ? features
    : features.slice(0, SUPPORTING_FEATURE_LIMIT);
  const hiddenFeatures = features.length - visibleFeatures.length;

  return (
    <Reveal className="pcard-wrap" delay={delay}>
      <article className={`pcard pcard--${variant}`}>
        {/* Preview ------------------------------------------------------ */}
        <div className="pcard__cover">
          {hasImage ? (
            <img
              className="pcard__image"
              src={project.image}
              alt={`${project.title} — ${project.category} project preview`}
              loading="lazy"
              decoding="async"
              width="960"
              height="600"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="pcard__placeholder" aria-hidden="true">
              <span className="pcard__placeholder-index">{project.number}</span>
              <span className="pcard__monogram">{toMonogram(project.title)}</span>
              <span className="pcard__placeholder-meta">{project.category}</span>
            </div>
          )}
        </div>

        {/* Content ------------------------------------------------------ */}
        <div className="pcard__body">
          <div className="pcard__meta">
            <span className="pcard__index">{project.number}</span>

            <div className="pcard__labels">
              {project.featured && (
                <span className="pcard__badge">Featured</span>
              )}
              <span className="pcard__category">{project.category}</span>
            </div>
          </div>

          <h3 className="pcard__title">{project.title}</h3>
          <p className="pcard__desc">{project.description}</p>

          {visibleFeatures.length > 0 && (
            <div className="pcard__features">
              <p className="pcard__features-label">
                Key features
                {hiddenFeatures > 0 && (
                  <span className="pcard__more">+{hiddenFeatures} more</span>
                )}
              </p>
              <ul className="feature-list">
                {visibleFeatures.map((feature) => (
                  <li key={feature}>
                    <Check aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.technologies?.length > 0 && (
            <ul className="tag-row pcard__tags">
              {project.technologies.map((tech) => (
                <li key={tech} className="tag">
                  {tech}
                </li>
              ))}
            </ul>
          )}

          {/* Actions — a button only appears when the URL exists ---------- */}
          <div className="pcard__actions">
            {hasGithub && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost btn-sm"
                aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
              >
                <GithubIcon size={15} aria-hidden="true" />
                GitHub
              </a>
            )}

            {hasDemo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-sm"
                aria-label={`${project.title} live demo (opens in a new tab)`}
              >
                Live Demo
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}

            {!hasGithub && !hasDemo && (
              <span className="pcard__note">Source code not published</span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
