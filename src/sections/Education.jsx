import { GraduationCap, MapPin, School } from "lucide-react";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import { education } from "../data/siteData";
import "./Education.css";

function EducationCard({ data, icon: Icon, delay = 0, primary = false }) {
  const [earned, total] = (data.score ?? "").split("/").map((part) => part.trim());
  const percentage =
    earned && total
      ? Math.min(100, Math.round((parseFloat(earned) / parseFloat(total)) * 100))
      : null;

  return (
    <Reveal
      className={`education__card ${primary ? "education__card--primary" : ""}`.trim()}
      delay={delay}
    >
      <div className="education__head">
        <span className="education__icon" aria-hidden="true">
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
          <div className="education__score-head">
            <div className="education__score-figure">
              <span className="education__score-value">{earned}</span>
              <span className="education__score-out">/ {total}</span>
            </div>
            <span className="education__score-label">{data.scoreLabel}</span>
          </div>

          {percentage !== null && (
            <div
              className="education__meter"
              role="img"
              aria-label={`${data.scoreLabel} ${earned} out of ${total}`}
            >
              <span style={{ width: `${percentage}%` }} />
            </div>
          )}
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
      title="Academic background"
      subtitle="A formal foundation in computer applications and the sciences."
      alt
    >
      <div className="education__grid">
        <EducationCard data={education.degree} icon={GraduationCap} primary />
        <EducationCard data={education.school} icon={School} delay={90} />
      </div>
    </Section>
  );
}
