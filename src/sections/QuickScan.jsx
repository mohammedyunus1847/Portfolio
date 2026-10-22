import { quickScan } from "../data/siteData";
import "./QuickScan.css";

/** Compact credibility strip shown directly below the hero. */
export default function QuickScan() {
  return (
    <section className="quickscan" aria-label="Profile at a glance">
      <div className="container">
        <ul className="quickscan__list">
          {quickScan.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
