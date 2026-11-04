import { useState } from "react";
import { AlertCircle, ArrowUpRight, Check, Copy, Mail, Send } from "lucide-react";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import { contact, links } from "../data/siteData";
import "./Contact.css";

const emptyForm = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const updateField = (event) =>
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  /* Posts the message to FormSubmit, which forwards it to the inbox in
     contact.formEndpoint. No backend or API key required. */
  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus("sending");
    setErrorMsg("");

    try {
      const response = await fetch(contact.formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio enquiry from ${form.name}`,
          _template: "table",
          _captcha: "false",
          _honey: "",
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false || data.success === "false") {
        throw new Error(
          data.message || "Your message could not be sent. Please try again.",
        );
      }

      setStatus("sent");
      setForm(emptyForm);
    } catch (error) {
      setStatus("error");
      setErrorMsg(
        error.message ||
          `Something went wrong. Please email me directly at ${links.email}.`,
      );
    }
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

          <div className="contact__email">
            <span className="contact__email-label">Direct email</span>
            <div className="contact__email-row">
              <a href={`mailto:${links.email}`} className="contact__email-link">
                {links.email}
              </a>

              <button
                type="button"
                className="contact__copy"
                onClick={copyEmail}
                aria-label={copied ? "Email address copied" : "Copy email address"}
              >
                {copied ? (
                  <Check size={14} aria-hidden="true" />
                ) : (
                  <Copy size={14} aria-hidden="true" />
                )}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <span className="sr-only" aria-live="polite">
              {copied ? "Email address copied to clipboard" : ""}
            </span>
          </div>

          <ul>
            {contact.channels
              .filter(({ id }) => id !== "email")
              .map(({ id, label, value, href, icon: Icon }) => (
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
                    <ArrowUpRight
                      size={15}
                      className="contact__channel-arrow"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
          </ul>
        </Reveal>

        <Reveal className="contact__form-card" delay={100}>
          {status === "sent" ? (
            <div className="contact__success" role="status">
              <span className="contact__success-icon" aria-hidden="true">
                <Check size={22} />
              </span>
              <h3>Message sent — thank you!</h3>
              <p>
                Your message has been delivered to <strong>{links.email}</strong>. I'll
                get back to you as soon as I can.
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
                    setStatus("idle");
                    setErrorMsg("");
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

              {status === "error" && (
                <p className="contact__error" role="alert">
                  <AlertCircle size={15} aria-hidden="true" />
                  <span>{errorMsg}</span>
                </p>
              )}

              <button
                type="submit"
                className="btn btn-primary contact__submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send Message"}
                <Send size={16} aria-hidden="true" />
              </button>

              <p className="contact__hint">
                Delivered straight to my inbox — I usually reply within a day.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
