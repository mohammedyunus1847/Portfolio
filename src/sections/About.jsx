import Reveal from "../components/Reveal";
import Section from "../components/Section";
import { about } from "../data/siteData";
import "./About.css";

export default function About() {
  return (
    <Section
      id="about"
      kicker="About"
      title="A little about me"
      subtitle="BCA graduate with a focus on full-stack development, backend systems, and clean, accessible interfaces."
      alt
    >
      <div className="about__grid">
        <Reveal className="about__body">
          {about.paragraphs.map((text, index) => (
            <p key={index} className={index === 0 ? "about__lead" : undefined}>
              {text}
            </p>
          ))}

          <div className="about__focus">
            <span className="about__focus-label">Currently exploring</span>
            <ul className="tag-row">
              {about.focus.map((item) => (
                <li key={item} className="chip about__focus-chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="about__highlights">
          {about.summary.map(({ label, value, icon: Icon }, index) => (
            <Reveal
              key={label}
              className="about__highlight"
              delay={index * 80}
            >
              <span className="about__highlight-icon" aria-hidden="true">
                <Icon size={18} />
              </span>
              <span className="about__highlight-label">{label}</span>
              <span className="about__highlight-value">{value}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
