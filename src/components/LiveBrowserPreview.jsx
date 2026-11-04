import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Lock, RefreshCw } from "lucide-react";
import "./LiveBrowserPreview.css";

const LOAD_TIMEOUT = 6000;

const MOCK_JOBS = [
  {
    role: "Frontend Developer",
    company: "Northstar Labs",
    meta: "Remote · Full time",
    tags: ["React", "TypeScript"],
  },
  {
    role: "Backend Engineer",
    company: "Lattice Works",
    meta: "Hybrid · Full time",
    tags: ["Node.js", "MongoDB"],
  },
  {
    role: "Product Designer",
    company: "Fieldnote",
    meta: "Remote · Contract",
    tags: ["Figma", "UX"],
  },
];

function formatUrl(value) {
  try {
    const url = new URL(value);
    return `${url.host}${url.pathname === "/" ? "" : url.pathname}`;
  } catch {
    return value;
  }
}

/**
 * Browser-framed live preview.
 *
 * The iframe attempts to render the real deployment while it is allowed.
 * When embedding is blocked, the frame shows an intentionally illustrated
 * fallback plus a clear explanation and a link to the live site.
 */
export default function LiveBrowserPreview({
  url,
  title,
  embeddable,
  blockedReason,
  fallbackImage = null,
}) {
  const [loadState, setLoadState] = useState("loading");
  const [reloadKey, setReloadKey] = useState(0);
  const timeoutRef = useRef(null);
  const embeddingDisabled = !url || embeddable === false;
  const status = embeddingDisabled ? "blocked" : loadState;

  const clearLoadTimer = () => {
    if (!timeoutRef.current) return;
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  };

  useEffect(() => {
    if (embeddingDisabled) {
      clearLoadTimer();
      return;
    }

    timeoutRef.current = window.setTimeout(() => setLoadState("blocked"), LOAD_TIMEOUT);

    return clearLoadTimer;
  }, [embeddingDisabled, reloadKey]);

  const handleLoad = () => {
    clearLoadTimer();
    setLoadState("live");
  };

  const handleError = () => {
    clearLoadTimer();
    setLoadState("blocked");
  };

  const handleReload = () => {
    if (embeddingDisabled) return;
    setLoadState("loading");
    setReloadKey((value) => value + 1);
  };

  const displayUrl = formatUrl(url);
  const isBlocked = status === "blocked";
  const statusLabel = isBlocked ? "Embed blocked" : status === "live" ? "Live preview" : "Connecting";

  return (
    <div className={`lbp lbp--${status}`}>
      <div className="lbp__chrome">
        <span className="lbp__traffic" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>

        <span className="lbp__address" aria-label={`Preview address: ${displayUrl}`}>
          <Lock size={12} aria-hidden="true" />
          <span className="lbp__address-text">{displayUrl}</span>
        </span>

        <span className={`lbp__status lbp__status--${status}`}>
          <span className="lbp__status-dot" aria-hidden="true" />
          <span className="lbp__status-label">{statusLabel}</span>
        </span>

        <span className="lbp__actions">
          <button
            type="button"
            className="lbp__icon-btn"
            onClick={handleReload}
            aria-label="Reload embedded preview"
            title="Reload preview"
            disabled={embeddable === false}
          >
            <RefreshCw size={14} aria-hidden="true" />
          </button>

          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="lbp__icon-btn"
            aria-label={`Open ${title} live site in a new tab`}
            title="Open live site in a new tab"
          >
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </span>
      </div>

      <div className="lbp__stage">
        {!isBlocked && (
          <>
            {status === "loading" && (
              <div className="lbp__loading" role="status">
                <span className="lbp__spinner" aria-hidden="true" />
                Connecting to the live deployment…
              </div>
            )}

            <iframe
              key={reloadKey}
              className="lbp__frame"
              src={url}
              title={`${title} live website preview`}
              aria-label={`Embedded live preview of ${title}. Scroll inside the frame to explore the website.`}
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="clipboard-write; fullscreen"
              sandbox="allow-downloads allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              onLoad={handleLoad}
              onError={handleError}
            />
          </>
        )}

        {isBlocked && (
          <div className="lbp__fallback">
            {fallbackImage ? (
              <img
                className="lbp__fallback-image"
                src={fallbackImage}
                alt={`${title} design preview`}
                width="1440"
                height="900"
              />
            ) : (
              <div className="lbp__mock" aria-hidden="true">
                <div className="lbp__mock-nav">
                  <span className="lbp__mock-brand">
                    <span>J</span>
                    JobPortal
                  </span>
                  <span className="lbp__mock-links">
                    <span>Find jobs</span>
                    <span>Companies</span>
                    <span>For recruiters</span>
                  </span>
                  <span className="lbp__mock-auth">
                    <span>Sign in</span>
                    <span className="lbp__mock-auth-cta">Get started</span>
                  </span>
                </div>

                <div className="lbp__mock-hero">
                  <span className="lbp__mock-eyebrow">Hiring made human</span>
                  <p className="lbp__mock-title">Find work that fits your ambition.</p>
                  <p className="lbp__mock-copy">
                    Explore curated roles from teams building what comes next.
                  </p>
                  <span className="lbp__mock-search">
                    <span>Search roles, skills, or companies</span>
                    <span className="lbp__mock-search-btn">Search jobs</span>
                  </span>
                </div>

                <div className="lbp__mock-jobs">
                  {MOCK_JOBS.map((job) => (
                    <div className="lbp__mock-job" key={job.role}>
                      <div className="lbp__mock-job-top">
                        <span className="lbp__mock-job-logo" />
                        <span className="lbp__mock-job-meta">{job.meta}</span>
                      </div>
                      <p className="lbp__mock-job-role">{job.role}</p>
                      <p className="lbp__mock-job-company">{job.company}</p>
                      <div className="lbp__mock-job-tags">
                        {job.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="lbp__fallback-panel">
              <span className="lbp__fallback-icon" aria-hidden="true">
                <Lock size={20} />
              </span>
              <p className="lbp__fallback-kicker">Protected deployment</p>
              <p className="lbp__fallback-title">Live embed unavailable</p>
              <p className="lbp__fallback-copy">
                {blockedReason ??
                  "This deployment does not allow iframe embedding. Open it in a new tab to explore the real website."}
              </p>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm lbp__fallback-cta"
              >
                Open Live Demo
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
