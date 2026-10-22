import { useEffect, useState } from "react";
import { ArrowUpRight, LoaderCircle, Star } from "lucide-react";
import { GithubIcon } from "../components/BrandIcons";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import { githubSection, links } from "../data/siteData";
import "./GithubSection.css";

const API_URL = `https://api.github.com/users/${githubSection.username}/repos?sort=updated&per_page=6`;

export default function GithubSection() {
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        setRepos(Array.isArray(data) ? data : []);
        setStatus("ready");
      })
      .catch(() => setStatus("error"))
      .finally(() => clearTimeout(timer));

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  return (
    <Section
      id="github"
      kicker="GitHub"
      title={githubSection.title}
      subtitle={githubSection.description}
      center
    >
      <Reveal className="github__cta">
        <a href={links.github} target="_blank" rel="noreferrer" className="btn btn-primary">
          <GithubIcon size={17} aria-hidden="true" />
          {githubSection.cta}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </Reveal>

      {status === "loading" && (
        <p className="github__status">
          <LoaderCircle size={16} className="github__spinner" aria-hidden="true" />
          Loading repositories…
        </p>
      )}

      {status === "ready" && repos.length > 0 && (
        <div className="github__grid">
          {repos.map((repo, index) => (
            <Reveal key={repo.id} delay={index * 70}>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="github__repo"
              >
                <div className="github__repo-head">
                  <GithubIcon size={16} aria-hidden="true" />
                  <h3>{repo.name}</h3>
                  <ArrowUpRight size={15} className="github__repo-arrow" aria-hidden="true" />
                </div>

                <p className="github__repo-desc">
                  {repo.description || "No description provided for this repository."}
                </p>

                <div className="github__repo-meta">
                  {repo.language && (
                    <span className="github__lang">
                      <span className="github__lang-dot" aria-hidden="true" />
                      {repo.language}
                    </span>
                  )}
                  <span>
                    <Star size={13} aria-hidden="true" /> {repo.stargazers_count}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
