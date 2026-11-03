import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import "./ThemeToggle.css";

const STORAGE_KEY = "portfolio-theme";

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* localStorage can be unavailable in private mode — fall through */
  }

  if (window.matchMedia?.("(prefers-color-scheme: light)").matches) return "light";
  return "dark";
}

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const isLight = theme === "light";

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", isLight ? "#f5f6fb" : "#08090d");

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore persistence errors */
    }
  }, [theme, isLight]);

  return (
    <button
      type="button"
      className={`theme-toggle ${isLight ? "is-light" : ""} ${className}`.trim()}
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      title={`Switch to ${isLight ? "dark" : "light"} mode`}
    >
      <span className="theme-toggle__track">
        <Sun className="theme-toggle__icon theme-toggle__icon--sun" size={15} aria-hidden="true" />
        <Moon className="theme-toggle__icon theme-toggle__icon--moon" size={15} aria-hidden="true" />
        <span className="theme-toggle__thumb" aria-hidden="true" />
      </span>
    </button>
  );
}
