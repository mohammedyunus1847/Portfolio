import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import QuickScan from "./sections/QuickScan";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import GithubSection from "./sections/GithubSection";
import Opportunity from "./sections/Opportunity";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <QuickScan />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <GithubSection />
        <Opportunity />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
