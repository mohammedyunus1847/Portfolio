import { CodeXml, Database, GitBranch, Server } from "lucide-react";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import { skillCategories } from "../data/siteData";
import "./Skills.css";

const categoryIcons = {
  Frontend: CodeXml,
  Backend: Server,
  Database: Database,
  Tools: GitBranch,
};

export default function Skills() {
  return (
    <Section
      id="skills"
      kicker="Technical toolkit"
      title="Technologies I work with"
      subtitle="The languages, frameworks, databases, and tools I use to build full-stack applications."
    >
      <div className="skills__grid">
        {skillCategories.map((category, index) => {
          const CategoryIcon = categoryIcons[category.title] ?? CodeXml;

          return (
            <Reveal key={category.title} className="skills__card" delay={index * 70}>
              <div className="skills__card-head">
                <span className="skills__card-icon" aria-hidden="true">
                  <CategoryIcon size={18} />
                </span>
                <div className="skills__card-heading">
                  <h3 className="skills__category-title">{category.title}</h3>
                  <span className="skills__category-count">
                    {category.skills.length} {category.skills.length === 1 ? "tool" : "tools"}
                  </span>
                </div>
              </div>

              <ul className="skills__tags">
                {category.skills.map(({ name, icon: Icon }) => (
                  <li key={name} className="skills__tag">
                    <Icon size={14} aria-hidden="true" />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
