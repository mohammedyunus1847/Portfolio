import Reveal from "./Reveal";

/**
 * Shared section shell: heading + content, with consistent spacing.
 */
export default function Section({ id, kicker, title, subtitle, center = false, alt = false, children }) {
  return (
    <section id={id} className={`section ${alt ? "section-alt" : ""}`.trim()}>
      <div className="container">
        <Reveal className={`section-heading ${center ? "center" : ""}`.trim()}>
          <span className="section-kicker">{kicker}</span>
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </Reveal>

        {children}
      </div>
    </section>
  );
}
