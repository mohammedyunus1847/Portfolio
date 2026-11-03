import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "../components/BrandIcons";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import { links, projects } from "../data/siteData";
import "./Projects.css";

/**
 * The whole section is driven by the `projects` array in src/data/siteData.js.
 * The first project marked `featured: true` becomes the large card and every
 * remaining project is rendered in the same grid so adding a project to the
 * array is the only change needed to show a new card here.
 */
export default function Projects() {
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const rest = projects.filter((project) => project !== featured);

  return (
    <Section
      id="projects"
      kicker="Selected work"
      title="Projects I've built"
      subtitle="Practical, full-stack applications built to solve real problems and sharpen my engineering skills."
      alt
    >
      {featured && (
        <ProjectCard project={featured} variant="featured" index={0} />
      )}

      <div className="projects__grid">
        {rest.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            variant="default"
            index={index}
            delay={index * 90}
          />
        ))}
      </div>

      <Reveal className="projects__footer">
        <p className="projects__footnote">
          More experiments and repositories are available on GitHub.
        </p>

        <a
          href={links.github}
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost"
        >
          <GithubIcon size={16} aria-hidden="true" />
          View GitHub profile
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </Reveal>
    </Section>
  );
}
