import ProjectCard from "../components/ProjectCard";
import Section from "../components/Section";
import { projects } from "../data/siteData";
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
      kicker="01 — SELECTED WORK"
      title="Selected Projects"
      subtitle="Practical applications built while developing my full-stack engineering skills."
      alt
    >
      {featured && <ProjectCard project={featured} variant="featured" />}

      <div className="projects__grid">
        {rest.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            variant="default"
            delay={index * 90}
          />
        ))}
      </div>
    </Section>
  );
}
