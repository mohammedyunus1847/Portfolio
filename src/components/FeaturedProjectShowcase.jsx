import { ArrowUpRight, Check } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import LiveBrowserPreview from "./LiveBrowserPreview";
import Reveal from "./Reveal";
import "./FeaturedProjectShowcase.css";

function isUsableLink(url) {
  return typeof url === "string" && url.trim().length > 0;
}

/**
 * Large editorial showcase for the main featured project.
 * The browser preview is reusable and handles live embeds plus fallbacks.
 */
export default function FeaturedProjectShowcase({ project }) {
  const features = project.features ?? [];
  const technologies = project.technologies ?? [];
  const hasGithub = isUsableLink(project.github);
  const hasDemo = isUsableLink(project.demo);

  return (
    <Reveal className="showcase">
      <article
        className="showcase__panel"
        aria-labelledby={`project-${project.id}-title`}
      >
        <header className="showcase__header">
          <div className="showcase__copy">
            <div className="showcase__meta">
              <span className="showcase__index">{project.number}</span>
              <span className="showcase__badge">Featured project</span>
              <span className="showcase__category">{project.category}</span>
            </div>

            <h3 className="showcase__title" id={`project-${project.id}-title`}>
              {project.title}
            </h3>
            <p className="showcase__desc">{project.description}</p>
          </div>

          <div className="showcase__actions">
            {hasDemo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                aria-label={`Open the live ${project.title} demo in a new tab`}
              >
                Open Live Demo
                <ArrowUpRight className="arrow" size={16} aria-hidden="true" />
              </a>
            )}

            {hasGithub && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
                aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
              >
                <GithubIcon size={16} aria-hidden="true" />
                GitHub
              </a>
            )}
          </div>
        </header>

        {hasDemo && (
          <div className="showcase__preview">
            <LiveBrowserPreview
              url={project.demo}
              title={project.title}
              embeddable={project.preview?.embeddable}
              blockedReason={project.preview?.blockedReason}
              fallbackImage={project.image}
            />
          </div>
        )}

        {(features.length > 0 || technologies.length > 0) && (
          <div className="showcase__details">
            {features.length > 0 && (
              <div className="showcase__detail-block">
                <p className="showcase__label">Key features</p>
                <ul className="feature-list showcase__features">
                  {features.map((feature) => (
                    <li key={feature}>
                      <Check aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {technologies.length > 0 && (
              <div className="showcase__detail-block">
                <p className="showcase__label">Built with</p>
                <ul className="tag-row" aria-label="Technologies used">
                  {technologies.map((tech) => (
                    <li key={tech} className="tag">
                      {tech}
                    </li>
                  ))}
                </ul>
                <p className="showcase__note">
                  Full-stack MERN application with protected API routes and role-based access.
                </p>
              </div>
            )}
          </div>
        )}
      </article>
    </Reveal>
  );
}
