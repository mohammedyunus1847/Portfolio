import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail, Send } from "lucide-react";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import { contact, links } from "../data/siteData";
import "./Contact.css";

const emptyForm = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateField = (event) =>
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  /* No backend: the message opens in the visitor's own email app. */
  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);

    setSent(true);
    window.location.href = `mailto:${links.email}?subject=${subject}&body=${body}`;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Section id="contact" kicker="Contact" title={contact.title} subtitle={contact.description}>
      <div className="contact__grid">
        <Reveal className="contact__channels">
          <p className="contact__label">Get in touch</p>

          <ul>
            {contact.channels.map(({ id, label, value, href, icon: Icon }) => (
              <li key={id}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="contact__channel"
                >
                  <span className="icon-badge" aria-hidden="true">
                    <Icon size={17} />
                  </span>
                  <span className="contact__channel-text">
                    <span className="contact__channel-label">{label}</span>
                    <span className="contact__channel-value">{value}</span>
                  </span>
                  <ArrowUpRight size={15} className="contact__channel-arrow" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="contact__form-card" delay={100}>
          {sent ? (
            <div className="contact__success" role="status">
              <span className="contact__success-icon" aria-hidden="true">
                <Check size={22} />
              </span>
              <h3>Your email app should be opening</h3>
              <p>
                I've prepared your message to <strong>{links.email}</strong>. If nothing
                opened, copy my address and send it directly.
              </p>

              <div className="contact__success-actions">
                <button type="button" className="btn btn-ghost btn-sm" onClick={copyEmail}>
                  {copied ? (
                    <>
                      <Check size={15} aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={15} aria-hidden="true" />
                      Copy email address
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    setSent(false);
                    setForm(emptyForm);
                  }}
                >
                  <Mail size={15} aria-hidden="true" />
                  Write another message
                </button>
              </div>

              <a className="contact__success-mail" href={`mailto:${links.email}`}>
                {links.email}
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact__form">
              <div className="contact__field">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={updateField}
                />
              </div>

              <div className="contact__field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={updateField}
                />
              </div>

              <div className="contact__field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  placeholder="Tell me about the role or project…"
                  required
                  value={form.message}
                  onChange={updateField}
                />
              </div>

              <button type="submit" className="btn btn-primary contact__submit">
                Send Message
                <Send size={16} aria-hidden="true" />
              </button>

              <p className="contact__hint">
                Opens your email app — nothing is stored on this site.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
