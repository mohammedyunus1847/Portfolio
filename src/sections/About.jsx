import Reveal from "../components/Reveal";
import Section from "../components/Section";
import { about } from "../data/siteData";
import "./About.css";

export default function About() {
  return (
    <Section id="about" kicker="About" title="A little about me" alt>
      <div className="about__grid">
        <Reveal className="about__text">
          {about.paragraphs.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </Reveal>

        <Reveal className="about__summary" delay={100}>
          <h3 className="about__summary-title">Profile summary</h3>
          <dl className="about__summary-list">
            {about.summary.map(({ label, value, icon: Icon }) => (
              <div className="about__summary-row" key={label}>
                <dt>
                  <span className="about__summary-icon" aria-hidden="true">
                    <Icon size={16} />
                  </span>
                  {label}
                </dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
