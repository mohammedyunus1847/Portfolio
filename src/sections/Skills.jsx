import Reveal from "../components/Reveal";
import Section from "../components/Section";
import { skillCategories } from "../data/siteData";
import "./Skills.css";

export default function Skills() {
  return (
    <Section
      id="skills"
      kicker="TECHNICAL TOOLKIT"
      title="Technologies I work with"
      subtitle="The languages, frameworks, databases, and tools I use to build full-stack applications."
    >
      <div className="skills__grid">
        {skillCategories.map((category, index) => (
          <Reveal key={category.title} className="skills__card" delay={index * 60}>
            <div className="skills__card-head">
              <h3 className="skills__category-title">{category.title}</h3>
            </div>

            <ul className="skills__tags">
              {category.skills.map(({ name }) => (
                <li key={name} className="skills__tag">
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
