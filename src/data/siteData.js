import {
  Atom,
  Boxes,
  Braces,
  CircleDot,
  CodeXml,
  Cylinder,
  Database,
  GitBranch,
  GraduationCap,
  Mail,
  MapPin,
  Network,
  Palette,
  Phone,
  Send,
  Server,
  SquareCode,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/BrandIcons";

/* ---------------------------------------------------------
   Profile / links  (edit these values to update the site)
   --------------------------------------------------------- */

export const profile = {
  name: "Yunus.A",
  logo: "Y",
  role: "Full Stack Developer",
  resumeUrl: "/resume.pdf",
  /* Portrait shown in the hero. The file lives in /public, so it is served
     from the site root as "/profile.jpg".
     The crop (how the picture is framed inside the hero card) is set with
     object-fit / object-position in src/sections/Hero.css. */
  profileImage: "/profile.jpg",
  profileAlt: "Portrait of Yunus Mohammed, Full Stack Developer",
};

export const links = {
  github: "https://github.com/mohammedyunus1847",
  linkedin: "https://www.linkedin.com/in/yunus-mohammed-b3052b2ba",
  email: "mohammedyunus1847@gmail.com",
  phone: "63835 33133",
  phoneRaw: "6383533133",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

/* ---------------------------------------------------------
   Hero
   --------------------------------------------------------- */

export const hero = {
  label: "Available for software development opportunities",
  /* The main statement shown under the name */
  headline: "I build web applications that solve real problems.",
  roleLead: "Full Stack",
  roleStack: "/ MERN",
  roleAccent: "Developer",
  description:
    "I design, build and ship responsive web applications — from database design and REST APIs to clean, accessible React interfaces.",
  /* Supporting technologies listed under the introduction */
  stack: ["React", "Node.js", "Express.js", "MongoDB"],
  primaryCta: { label: "View Projects", href: "#projects" },
  secondaryCta: { label: "Download Resume", href: profile.resumeUrl },
  tertiaryCta: { label: "Contact Me", href: "#contact" },
  photoCaption: "Chennai, Tamil Nadu",

  /* Optional code snippet. It is not rendered anywhere at the moment —
     keep it here if you ever want to bring back the code window. */
  file: "developer.js",
  code: [
    { t: "kw", v: "const" },
    { t: "plain", v: " developer " },
    { t: "op", v: "=" },
    { t: "plain", v: " {" },
    { nl: true },
    { t: "key", v: "  name:" },
    { t: "str", v: ' "Yunus Mohammed",' },
    { nl: true },
    { t: "key", v: "  role:" },
    { t: "str", v: ' "Full Stack Developer",' },
    { nl: true },
    { t: "key", v: "  stack:" },
    { t: "plain", v: " [" },
    { nl: true },
    { t: "str", v: '    "React",' },
    { nl: true },
    { t: "str", v: '    "Node.js",' },
    { nl: true },
    { t: "str", v: '    "Express",' },
    { nl: true },
    { t: "str", v: '    "MongoDB"' },
    { nl: true },
    { t: "plain", v: "  ]," },
    { nl: true },
    { t: "key", v: "  status:" },
    { t: "str", v: ' "Open to opportunities"' },
    { nl: true },
    { t: "plain", v: "};" },
  ],
};

/* ---------------------------------------------------------
   Recruiter quick-scan strip (directly below the hero)
   --------------------------------------------------------- */

export const quickScan = [
  "BCA Graduate",
  "MERN Stack",
  "Full Stack Development",
  "REST APIs",
  "MongoDB + MySQL",
  "Open to Opportunities",
];

/* ---------------------------------------------------------
   About
   --------------------------------------------------------- */

export const about = {
  paragraphs: [
    "I'm Yunus Mohammed, a BCA graduate and aspiring Full Stack Developer who enjoys turning ideas into practical web applications. I work across the frontend and backend, building responsive user interfaces, REST APIs, authentication flows, and database-driven features.",
    "I'm strengthening my development skills through hands-on projects using React, Node.js, Express.js, MongoDB, and MySQL. I enjoy learning how the different parts of an application connect, troubleshooting integration issues, and building features that solve real problems.",
  ],
  summary: [
    { label: "Education", value: "BCA — C. Abdul Hakeem College", icon: GraduationCap },
    { label: "Focus", value: "MERN Stack / Full Stack Development", icon: CodeXml },
    { label: "Location", value: "Chennai, Tamil Nadu", icon: MapPin },
    { label: "Availability", value: "Open to Software Developer Opportunities", icon: CircleDot },
  ],
};

/* ---------------------------------------------------------
   Skills
   --------------------------------------------------------- */

export const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", icon: Atom },
      { name: "JavaScript", icon: Braces },
      { name: "HTML5", icon: CodeXml },
      { name: "CSS3", icon: Palette },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: Server },
      { name: "Express.js", icon: Boxes },
      { name: "REST APIs", icon: Network },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MongoDB", icon: Database },
      { name: "MySQL", icon: Cylinder },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: GitBranch },
      { name: "GitHub", icon: GithubIcon },
      { name: "Postman", icon: Send },
      { name: "VS Code", icon: SquareCode },
    ],
  },
];

/* ---------------------------------------------------------
   Projects

   Every project on the site comes from this one array.
   The Projects section and the ProjectCard component read it
   automatically, so a new project needs NO other code changes.

   HOW TO ADD A NEW PROJECT
   1. Copy an object below and paste it into the array.
   2. Give it a unique `id` (any short slug, e.g. "my-new-app").
      The id is the React key — it must not repeat.
   3. Set `featured: true` on only ONE project (the large card).
      Leave every other project as `featured: false`.
   4. Fill in the details:
        title        – project name shown on the card
        category     – short label, e.g. "MERN Stack"
        description  – one or two sentences for a recruiter
        technologies – array of stack tags
        features     – array of bullet points (optional, [] is fine)
        github       – repository URL, or null if it is not public
        demo         – live URL, or null if it is not deployed
        image        – screenshot path from /public, or null
                      (null renders a designed CSS placeholder instead)
   5. Leave a link empty (null) and the matching button is hidden
      automatically — no broken or dead buttons are ever rendered.
   --------------------------------------------------------- */

export const projects = [
  {
    id: "job-portal",
    number: "01",
    title: "Job Portal",
    category: "FULL STACK · MERN",
    featured: true,
    description:
      "A full-stack job portal connecting recruiters and job seekers through secure authentication, job management, and application tracking.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "bcrypt"],
    features: [
      "Separate recruiter and job seeker roles",
      "JWT authentication and role-based authorization",
      "Create, update, and delete job listings",
      "Job search and filtering",
      "Job applications and recruiter applicant management",
      "Application status updates and protected API routes",
    ],
    github: "https://github.com/mohammedyunus1847/-job-portal",
    demo: null,
    image: null,
  },
  {
    id: "student-submission",
    number: "02",
    title: "Student Submission Portal",
    category: "FULL STACK",
    featured: false,
    description:
      "A student assignment submission system with REST API integration, URL validation, and submission status management.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB"],
    features: [
      "Student submission management",
      "Assignment URL validation",
      "Pending, Graded, and Rejected statuses",
    ],
    github: "https://github.com/mohammedyunus1847/student-submission-portal",
    demo: null,
    image: null,
  },
  {
    id: "emergency-alert",
    number: "03",
    title: "Emergency Alert System",
    category: "FINAL YEAR PROJECT · TEAM LEADER",
    featured: false,
    description:
      "An emergency information and alert platform integrating news, weather/radar information, and email notifications.",
    technologies: ["PHP", "MySQL", "JavaScript", "GNews API", "Windy.com"],
    features: [
      "Emergency alert information",
      "News API integration",
      "Weather/radar information",
      "Email notifications",
    ],
    github: "https://github.com/mohammedyunus1847/EMERGENCY-ALERT-SYSTEM",
    demo: null,
    image: null,
  },
  {
    id: "food-ecommerce",
    number: "04",
    title: "Food E-commerce Website",
    category: "INTERNSHIP PROJECT",
    featured: false,
    description:
      "A Python full-stack internship project covering product browsing, cart functionality, and order flow with frontend and backend integration.",
    technologies: ["Python", "HTML", "CSS", "JavaScript", "MySQL"],
    features: [],
    github: null,
    demo: null,
    image: null,
  },
];

/* ---------------------------------------------------------
   Experience
   --------------------------------------------------------- */

export const experience = [
  {
    id: "besant",
    role: "MERN Stack Developer Trainee",
    company: "Besant Technologies",
    location: "Chennai",
    period: "2026",
    type: "Training",
    description:
      "Completed hands-on MERN stack training focused on building frontend interfaces with React, developing backend APIs with Node.js and Express.js, and working with databases.",
    points: [],
  },
  {
    id: "nextgen",
    role: "Python Full Stack Developer Intern",
    company: "NextGen Technology",
    location: "Vellore",
    period: "",
    type: "Internship",
    description:
      "Worked on a Python full-stack internship project involving a food e-commerce website and frontend-backend integration.",
    points: [],
  },
];

/* ---------------------------------------------------------
   Education
   --------------------------------------------------------- */

export const education = {
  degree: {
    id: "bca",
    title: "Bachelor of Computer Applications",
    institution: "C. Abdul Hakeem College",
    location: "Melvisharam, Tamil Nadu",
    period: "2023 — 2026",
    score: "7.0 / 10",
    scoreLabel: "CGPA",
  },
  school: {
    id: "school",
    title: "Higher Secondary Education",
    institution: "Voorhees Higher Secondary School",
    location: "Vellore, Tamil Nadu",
    period: "",
  },
};

/* ---------------------------------------------------------
   GitHub section
   --------------------------------------------------------- */

export const githubSection = {
  title: "Code is where I learn.",
  description:
    "I build projects to strengthen my understanding of frontend, backend, APIs and databases.",
  cta: "View GitHub Profile",
  username: "mohammedyunus1847",
};

/* ---------------------------------------------------------
   Opportunity CTA (before Contact)
   --------------------------------------------------------- */

export const opportunity = {
  title: "Looking for my next opportunity",
  description:
    "I'm currently looking for opportunities where I can contribute as a Software Developer, Full Stack Developer, MERN Stack Developer or React Developer while continuing to grow as an engineer.",
  tags: ["Software Developer", "Full Stack Developer", "MERN Developer", "React Developer"],
  cta: { label: "Let's Connect", href: "#contact" },
};

/* ---------------------------------------------------------
   Contact
   --------------------------------------------------------- */

export const contact = {
  title: "Let's build something together.",
  description:
    "If you're hiring for a junior developer role, have a project opportunity, or simply want to connect, I'd be happy to hear from you.",
  channels: [
    { id: "email", label: "Email", value: links.email, href: `mailto:${links.email}`, icon: Mail },
    { id: "github", label: "GitHub", value: links.github.replace("https://", ""), href: links.github, icon: GithubIcon },
    { id: "linkedin", label: "LinkedIn", value: "Yunus Mohammed", href: links.linkedin, icon: LinkedinIcon },
    { id: "phone", label: "Phone", value: links.phone, href: `tel:${links.phoneRaw}`, icon: Phone },
  ],
};
