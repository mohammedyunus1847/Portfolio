import { ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { opportunity } from "../data/siteData";
import "./Opportunity.css";

export default function Opportunity() {
  return (
    <section id="opportunity" className="opportunity">
      <div className="container">
        <Reveal className="opportunity__panel">
          <span className="section-kicker">Open to work</span>
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
            <ArrowRight aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
