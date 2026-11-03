import { MapPin } from "lucide-react";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import { experience } from "../data/siteData";
import "./Experience.css";

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function Experience() {
  return (
    <Section
      id="experience"
      kicker="Experience"
      title="Training & internship"
      subtitle="Hands-on training and internship work focused on building and shipping practical web applications."
    >
      <ol className="timeline">
        {experience.map((item, index) => (
          <Reveal as="li" key={item.id} className="timeline__item" delay={index * 100}>
            <span className="timeline__node" aria-hidden="true" />

            <article className="timeline__card">
              <div className="timeline__top">
                <div className="timeline__top-left">
                  <span className="timeline__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="timeline__type">{item.type}</span>
                </div>

                {item.period ? (
                  <span className="timeline__period">{item.period}</span>
                ) : null}
              </div>

              <div className="timeline__main">
                <span className="timeline__mark" aria-hidden="true">
                  {initials(item.company)}
                </span>

                <div className="timeline__heading">
                  <h3 className="timeline__role">{item.role}</h3>
                  <p className="timeline__company">
                    <span className="timeline__company-name">{item.company}</span>
                    <span className="timeline__sep" aria-hidden="true" />
                    <span className="timeline__location">
                      <MapPin size={13} aria-hidden="true" />
                      {item.location}
                    </span>
                  </p>
                </div>
              </div>

              <p className="timeline__desc">{item.description}</p>

              {item.points && item.points.length > 0 && (
                <div className="tag-row">
                  {item.points.map((point) => (
                    <span key={point} className="tag">
                      {point}
                    </span>
                  ))}
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
