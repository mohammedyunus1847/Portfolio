import { ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { opportunity } from "../data/siteData";
import "./Opportunity.css";

export default function Opportunity() {
  return (
    <section id="opportunity" className="opportunity">
      <div className="container">
        <Reveal className="opportunity__panel">
          <span className="opportunity__decor" aria-hidden="true" />

          <div className="opportunity__content">
            <span className="opportunity__eyebrow">
              <span className="opportunity__pulse" aria-hidden="true" />
              Open to work
            </span>

            <h2 className="opportunity__title">{opportunity.title}</h2>
            <p className="opportunity__desc">{opportunity.description}</p>

            <ul className="opportunity__tags">
              {opportunity.tags.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>

            <a href={opportunity.cta.href} className="btn btn-primary opportunity__cta">
              {opportunity.cta.label}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
