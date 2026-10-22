import { GraduationCap, MapPin, School } from "lucide-react";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import { education } from "../data/siteData";
import "./Education.css";

function EducationCard({ data, icon: Icon, delay = 0, primary = false }) {
  return (
    <Reveal
      className={`education__card ${primary ? "education__card--primary" : ""}`.trim()}
      delay={delay}
    >
      <div className="education__head">
        <span className="icon-badge" aria-hidden="true">
          <Icon size={19} />
        </span>
        {data.period && <span className="education__period">{data.period}</span>}
      </div>

      <h3 className="education__title">{data.title}</h3>
      <p className="education__institution">{data.institution}</p>
      <p className="education__location">
        <MapPin size={13} aria-hidden="true" />
        {data.location}
      </p>

      {data.score && (
        <div className="education__score">
          <span className="education__score-value">{data.score.split("/")[0].trim()}</span>
          <span className="education__score-label">
            {data.scoreLabel}
            <br />
            out of {data.score.split("/")[1].trim()}
          </span>
        </div>
      )}
    </Reveal>
  );
}

export default function Education() {
  return (
    <Section
      id="education"
      kicker="Education"
      title="Education"
      subtitle="Academic background in computer applications."
      alt
    >
      <div className="education__grid">
        <EducationCard data={education.degree} icon={GraduationCap} primary />
      </div>
    </Section>
  );
}
