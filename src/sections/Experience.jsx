import { MapPin } from "lucide-react";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import { experience } from "../data/siteData";
import "./Experience.css";

export default function Experience() {
  return (
    <Section
      id="experience"
      kicker="Experience"
      title="Training & Internship"
      subtitle="Hands-on training and internship focused on building practical web applications."
    >
      <ol className="timeline">
        {experience.map((item, index) => (
          <Reveal as="li" key={item.id} className="timeline__item" delay={index * 100}>
            <span className="timeline__node" aria-hidden="true" />

            <article className="timeline__card">
              <div className="timeline__head">
                {item.period ? (
                  <span className="timeline__period">{item.period}</span>
                ) : null}
                <span className="timeline__type">{item.type}</span>
              </div>

              <h3 className="timeline__role">{item.role}</h3>

              <p className="timeline__company">
                <span className="timeline__company-name">{item.company}</span>
                <span className="timeline__sep" aria-hidden="true" />
                <span className="timeline__location">
                  <MapPin size={13} aria-hidden="true" />
                  {item.location}
                </span>
              </p>

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
