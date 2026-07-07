import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Terminal,
  ChevronRight,
  ChevronDown,
  FileText,
  Scissors,
  Database,
  Sparkles,
  MessageSquare,
  MapPin,
  Navigation,
  Map,
  Table2,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

const FONT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');

  .pf-root {
    --bg: #E7EDF1;
    --grid: #D3DCE2;
    --panel: #F4F7F9;
    --ink: #16232C;
    --ink-soft: #4C5E68;
    --amber: #B4650B;
    --teal: #285E68;
    --rule: #C3CDD3;
    font-family: 'Inter', sans-serif;
    background-color: var(--bg);
    background-image:
      linear-gradient(var(--grid) 1px, transparent 1px),
      linear-gradient(90deg, var(--grid) 1px, transparent 1px);
    background-size: 32px 32px;
    color: var(--ink);
  }
  .pf-display { font-family: 'Space Grotesk', sans-serif; }
  .pf-mono { font-family: 'JetBrains Mono', monospace; }

  .pf-panel {
    background: var(--panel);
    border: 1px solid var(--rule);
  }

  .pf-caret::after {
    content: "▌";
    animation: pf-blink 1s step-start infinite;
    color: var(--amber);
  }
  @keyframes pf-blink { 50% { opacity: 0; } }

  .pf-node {
    transition: transform 0.15s ease, border-color 0.15s ease;
    cursor: pointer;
  }
  .pf-node:hover { transform: translateY(-2px); }
  .pf-node.active { border-color: var(--amber) !important; }

  @media (prefers-reduced-motion: reduce) {
    .pf-caret::after { animation: none; }
  }
`;

const TERMINAL_LINES = {
  help: "Commands: whoami, skills, projects, experience, education, contact, clear",
  whoami:
    "Pranjal Gupta — Full-Stack & AI Developer.\nBuilds scalable web apps, local RAG pipelines, and LLM-driven tools.\nBased in Ahmedabad, Gujarat.",
  skills:
    "Languages: Python, TypeScript, JavaScript, C++\nBackend: FastAPI, Django, Flask, SQLAlchemy\nFrontend: Next.js 14, React, Tailwind CSS\nAI/ML: Gemini API, ChromaDB, Sentence-Transformers, NumPy, Pandas\nData: SQLite, Git, GitHub, REST APIs",
  projects:
    "StudyAI — full-stack local RAG pipeline, PDF Q&A, auto quiz generation.\nDistance Calc — Flask geolocation app with real-time map tracking.\nLedger  — turns your CSV data into AI-explained business insights, with all the number-crunching done locally so the AI never hallucinates.\nScroll down, both have full breakdowns below.",
  experience:
    "Freelance Python & AI/ML Developer (Jul 2025–Present)\nNSS Volunteer, Indrashil University (2024–2025)",
  education:
    "BCA in Artificial Intelligence, Indrashil University, Gujarat (Expected 2027)",
  contact:
    "pranjalgupta1410@gmail.com\n7988936751\nlinkedin.com/in/pranjal-gupta-2aa192332\ngithub.com/Pranjalgupta666",
};

const skillGroups = [
  { key: "lang", label: "Languages", items: ["Python", "TypeScript", "JavaScript", "C++"] },
  { key: "backend", label: "Backend", items: ["FastAPI", "Django", "Flask", "SQLAlchemy"] },
  { key: "frontend", label: "Frontend", items: ["Next.js 14", "React", "Tailwind CSS", "HTML5/CSS3"] },
  {
    key: "ai",
    label: "AI, ML & Vector DBs",
    items: ["Gemini API", "ChromaDB", "Sentence-Transformers", "NumPy", "Pandas", "Supervised/Unsupervised ML"],
  },
  { key: "data", label: "Databases & Tools", items: ["SQLite", "Git", "GitHub", "RESTful APIs"] },
];

const pipelines = {
  StudyAI: [
    { icon: FileText, label: "Upload", detail: "User uploads a PDF. No cloud storage required — everything stays local." },
    { icon: Scissors, label: "Chunk & Embed", detail: "Document is split and converted to vectors locally via Sentence-Transformers." },
    { icon: Database, label: "ChromaDB", detail: "Embeddings are stored and indexed in a local ChromaDB vector database." },
    { icon: Sparkles, label: "Gemini 1.5 Flash", detail: "Retrieved chunks are passed to Gemini to ground the answer — no hallucination." },
    { icon: MessageSquare, label: "Page-Referenced Answer", detail: "Response returns with the exact page it came from, plus quizzes & summaries." },
  ],
  "Distance Calc": [
    { icon: MapPin, label: "Input Coordinates", detail: "User enters two locations (latitude/longitude) into the Flask frontend." },
    { icon: Navigation, label: "Flask Backend", detail: "Coordinates are sent to the Flask server for processing." },
    { icon: Table2, label: "Geolocation API", detail: "External Geolocation and map-rendering APIs resolve and validate location data." },
    { icon: BarChart3, label: "Distance Calculation", detail: "Backend computes the geographical distance between the two coordinate pairs." },
    { icon: Map, label: "Real-Time Map View", detail: "Result is rendered back to the frontend with a live visual map and tracking." },
  ],
  Ledger: [
    { icon: FileText, label: "CSV Upload", detail: "User uploads a raw CSV dataset — no predefined schema required." },
    { icon: Table2, label: "Data Profiling Engine", detail: "TypeScript engine auto-detects column types: date, numeric, or categorical." },
    { icon: BarChart3, label: "Client-Side Stats", detail: "Aggregates, trends, and anomaly detection are all computed client-side first — before any LLM involvement." },
    { icon: Sparkles, label: "Gemini API", detail: "Structured summaries (not raw data) are passed to Gemini for an executive summary and grounded Q&A chat." },
    { icon: CheckCircle2, label: "Verified Dashboard", detail: "Recharts renders the results — every AI response stays consistent with the underlying computed data." },
  ],
};

const projects = [
  {
    name: "StudyAI",
    tag: "AI-Powered Study Assistant · 2026",
    summary: "A full-stack, open-source RAG pipeline for querying PDFs locally, without hallucinations.",
    stack: ["FastAPI", "ChromaDB", "Sentence-Transformers", "Gemini 1.5 Flash", "Next.js 14", "TypeScript", "SQLAlchemy"],
    points: [
      "Engineered a FastAPI backend with ChromaDB as a local vector store and sentence-transformers for local embeddings.",
      "Integrated Gemini 1.5 Flash to power an automated MCQ quiz generator, instant summaries, and page-referenced Q&A.",
      "Built a production-ready Next.js 14 + TypeScript + Tailwind frontend, with relational data mapped through SQLite/SQLAlchemy.",
    ],
  },
  {
    name: "Distance Calc",
    tag: "Location-Based Web Application · 2025",
    summary: "A Flask app calculating geographical distance between coordinates in real time.",
    stack: ["Flask", "Geolocation API", "Map Rendering"],
    points: [
      "Calculated distance between coordinates using latitude/longitude via Flask.",
      "Integrated external map rendering and Geolocation APIs for real-time visual tracking.",
      "Handled seamless backend-to-frontend data processing.",
    ],
  },
  {
    name: "Ledger",
    tag: "AI-Powered Business Analytics Dashboard · 2026",
    summary: "A full-stack analytics platform that ingests CSV datasets and generates automated business insights, computing all statistics client-side to eliminate AI hallucination.",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Recharts", "Framer Motion", "Gemini API"],
    points: [
      "Architected a full-stack analytics platform that ingests CSV datasets and generates automated business insights, computing all statistical analysis (aggregates, trends, anomaly detection) client-side before passing structured summaries to the LLM.",
      "Engineered a dynamic data-profiling engine in TypeScript that auto-detects column types (date, numeric, categorical) and generates time-series and category-based aggregations without a predefined schema.",
      "Integrated the Google Gemini API to power a natural-language executive summary generator and a grounded Q&A chat interface, keeping AI responses consistent with the underlying computed data.",
      "Designed a responsive, production-ready frontend using Next.js 15, TypeScript, and Tailwind CSS, with Recharts for data visualization and Framer Motion for interaction design; deployed on Vercel.",
    ],
  },
];

function useTyped(text, speed = 28) {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text]);
  return out;
}

function Terminal_() {
  const [history, setHistory] = useState([
    { cmd: null, out: "Type 'help' to see available commands." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === "clear") {
      setHistory([]);
      return;
    }
    const out = TERMINAL_LINES[cmd] || `command not found: ${cmd} (try 'help')`;
    setHistory((h) => [...h, { cmd: raw, out }]);
  };

  return (
    <div className="pf-panel pf-mono rounded-md p-5 text-sm">
      <div className="flex items-center gap-2 mb-3 pb-3 border-b" style={{ borderColor: "var(--rule)" }}>
        <Terminal size={14} style={{ color: "var(--amber)" }} />
        <span className="text-xs tracking-widest uppercase" style={{ color: "var(--ink-soft)" }}>
          pranjal@portfolio ~ %
        </span>
      </div>
      <div className="h-40 overflow-y-auto pr-1 space-y-2">
        {history.map((h, i) => (
          <div key={i}>
            {h.cmd && (
              <div style={{ color: "var(--ink)" }}>
                <span style={{ color: "var(--amber)" }}>&gt;</span> {h.cmd}
              </div>
            )}
            <div className="whitespace-pre-wrap" style={{ color: "var(--ink-soft)" }}>
              {h.out}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(input);
          setInput("");
        }}
        className="flex items-center gap-2 mt-3 pt-3 border-t"
        style={{ borderColor: "var(--rule)" }}
      >
        <span style={{ color: "var(--amber)" }}>&gt;</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="try: whoami"
          className="flex-1 bg-transparent outline-none pf-mono text-sm"
          style={{ color: "var(--ink)" }}
        />
      </form>
      <div className="flex flex-wrap gap-2 mt-3">
        {["whoami", "skills", "projects", "contact"].map((c) => (
          <button
            key={c}
            onClick={() => run(c)}
            className="text-xs px-2 py-1 rounded pf-mono"
            style={{ background: "var(--bg)", border: "1px solid var(--rule)", color: "var(--ink-soft)" }}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

function Section({ id, index, title, children }) {
  return (
    <section id={id} className="max-w-4xl mx-auto px-6 md:px-10 py-16 border-t" style={{ borderColor: "var(--rule)" }}>
      <div className="flex items-baseline gap-4 mb-10">
        <span className="pf-mono text-xs tracking-widest" style={{ color: "var(--amber)" }}>
          {index}
        </span>
        <div className="flex-1 h-px" style={{ background: "var(--rule)" }} />
      </div>
      <h2 className="pf-display text-3xl md:text-4xl font-semibold mb-8">{title}</h2>
      {children}
    </section>
  );
}

function ProjectCard({ p }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="pf-panel rounded-md p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="pf-display text-xl font-semibold">{p.name}</h3>
          <p className="text-xs uppercase tracking-wide mt-1" style={{ color: "var(--amber)" }}>
            {p.tag}
          </p>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="shrink-0 flex items-center gap-1 text-xs pf-mono px-2 py-1 rounded"
          style={{ border: "1px solid var(--rule)", color: "var(--ink-soft)" }}
        >
          {open ? "Hide" : "Breakdown"}
          {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </button>
      </div>
      <p className="text-sm mt-4" style={{ color: "var(--ink-soft)" }}>
        {p.summary}
      </p>
      <div className="flex flex-wrap gap-2 mt-4">
        {p.stack.map((s) => (
          <span
            key={s}
            className="pf-mono text-[11px] px-2 py-1 rounded"
            style={{ background: "var(--bg)", border: "1px solid var(--rule)", color: "var(--teal)" }}
          >
            {s}
          </span>
        ))}
      </div>
      {open && (
        <ul className="mt-4 pt-4 border-t space-y-2 text-sm" style={{ borderColor: "var(--rule)", color: "var(--ink-soft)" }}>
          {p.points.map((pt, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--amber)" }} />
              {pt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function App() {
  const [activeSkill, setActiveSkill] = useState(null);
  const [activeProject, setActiveProject] = useState("StudyAI");
  const [activeStage, setActiveStage] = useState(0);
  const activeStages = pipelines[activeProject];
  const typedTagline = useTyped("Full-Stack & AI Developer", 32);

  return (
    <div className="pf-root min-h-screen w-full">
      <style>{FONT_STYLES}</style>

      {/* HERO */}
      <header className="max-w-4xl mx-auto px-6 md:px-10 pt-20 pb-14">
        <p className="pf-mono text-xs tracking-widest uppercase mb-6" style={{ color: "var(--teal)" }}>
          Ahmedabad, Gujarat · Portfolio
        </p>
        <h1 className="pf-display text-5xl md:text-6xl font-semibold leading-[1.05] mb-3">
          Pranjal Gupta
        </h1>
        <p className="pf-mono text-lg md:text-xl mb-8 pf-caret" style={{ color: "var(--amber)" }}>
          {typedTagline}
        </p>
        <p className="text-base md:text-lg max-w-2xl mb-10" style={{ color: "var(--ink-soft)" }}>
          Builds scalable web applications, local RAG pipelines, and
          data-driven solutions — combining LLMs and vector databases with
          production-ready Next.js and Python backends.
        </p>

        <Terminal_ />

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm pf-mono mt-8" style={{ color: "var(--ink-soft)" }}>
          <a href="mailto:pranjalgupta1410@gmail.com" className="flex items-center gap-2 hover:opacity-70">
            <Mail size={14} /> pranjalgupta1410@gmail.com
          </a>
          <a href="tel:7988936751" className="flex items-center gap-2 hover:opacity-70">
            <Phone size={14} /> 7988936751
          </a>
          <a href="https://linkedin.com/in/pranjal-gupta-2aa192332" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:opacity-70">
            <Linkedin size={14} /> LinkedIn
          </a>
          <a href="https://github.com/Pranjalgupta666" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:opacity-70">
            <Github size={14} /> GitHub
          </a>
        </div>
      </header>

      {/* SKILLS */}
      <Section id="skills" index="01 — Stack" title="Technical Skills">
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveSkill(null)}
            className="pf-mono text-xs px-3 py-1.5 rounded"
            style={{
              background: activeSkill === null ? "var(--amber)" : "var(--panel)",
              color: activeSkill === null ? "var(--bg)" : "var(--ink-soft)",
              border: "1px solid var(--rule)",
            }}
          >
            All
          </button>
          {skillGroups.map((g) => (
            <button
              key={g.key}
              onClick={() => setActiveSkill(g.key)}
              className="pf-mono text-xs px-3 py-1.5 rounded"
              style={{
                background: activeSkill === g.key ? "var(--amber)" : "var(--panel)",
                color: activeSkill === g.key ? "var(--bg)" : "var(--ink-soft)",
                border: "1px solid var(--rule)",
              }}
            >
              {g.label}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {skillGroups
            .filter((g) => !activeSkill || g.key === activeSkill)
            .map((g) => (
              <div key={g.key} className="pf-panel rounded-md p-5">
                <h3 className="font-medium text-base mb-3" style={{ color: "var(--teal)" }}>
                  {g.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="pf-mono text-xs px-2 py-1 rounded"
                      style={{ background: "var(--bg)", border: "1px solid var(--rule)" }}
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </Section>

      {/* PIPELINES — interactive signature element */}
      <Section id="architecture" index="02 — Architecture" title="Project Pipelines">
        <p className="text-sm mb-5" style={{ color: "var(--ink-soft)" }}>
          Pick a project, then click a stage to see what happens under the hood.
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.keys(pipelines).map((name) => (
            <button
              key={name}
              onClick={() => {
                setActiveProject(name);
                setActiveStage(0);
              }}
              className="pf-mono text-xs px-3 py-1.5 rounded"
              style={{
                background: activeProject === name ? "var(--amber)" : "var(--panel)",
                color: activeProject === name ? "var(--bg)" : "var(--ink-soft)",
                border: "1px solid var(--rule)",
              }}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mb-6">
          {activeStages.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setActiveStage(i)}
              className={`pf-node pf-panel rounded-md px-4 py-3 flex items-center gap-2 ${activeStage === i ? "active" : ""}`}
              style={{ borderWidth: 1 }}
            >
              <s.icon size={16} style={{ color: "var(--amber)" }} />
              <span className="pf-mono text-xs">{s.label}</span>
              {i < activeStages.length - 1 && (
                <ChevronRight size={14} className="ml-1 hidden md:inline" style={{ color: "var(--rule)" }} />
              )}
            </button>
          ))}
        </div>
        <div className="pf-panel rounded-md p-5 text-sm" style={{ color: "var(--ink-soft)" }}>
          <span className="pf-mono text-xs uppercase tracking-widest block mb-2" style={{ color: "var(--teal)" }}>
            {activeStages[activeStage].label}
          </span>
          {activeStages[activeStage].detail}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" index="03 — Build" title="Key Projects">
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" index="04 — Record" title="Experience">
        <div className="space-y-8">
          <div className="grid md:grid-cols-[180px_1fr] gap-4 md:gap-8">
            <p className="pf-mono text-xs tracking-widest" style={{ color: "var(--amber)" }}>
              Jul 2025 — Present
            </p>
            <div>
              <h3 className="pf-display text-xl font-semibold mb-1">Freelance Python &amp; AI/ML Developer</h3>
              <p className="text-sm mb-3" style={{ color: "var(--teal)" }}>Self-Employed · Remote</p>
              <ul className="space-y-2 text-[15px]" style={{ color: "var(--ink-soft)" }}>
                <li className="flex gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--rule)" }} />
                  Designed and deployed scalable web applications using Flask and Django.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--rule)" }} />
                  Used Pandas and NumPy for data preprocessing, feature engineering, and statistical analysis pipelines.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--rule)" }} />
                  Applied supervised and unsupervised learning to build real-world automated solutions.
                </li>
              </ul>
            </div>
          </div>
          <div className="grid md:grid-cols-[180px_1fr] gap-4 md:gap-8">
            <p className="pf-mono text-xs tracking-widest" style={{ color: "var(--amber)" }}>
              2025 — Present
            </p>
            <div>
              <h3 className="pf-display text-xl font-semibold mb-1">NSS Volunteer</h3>
              <p className="text-sm mb-3" style={{ color: "var(--teal)" }}>National Service Scheme · Indrashil University</p>
              <ul className="space-y-2 text-[15px]" style={{ color: "var(--ink-soft)" }}>
                <li className="flex gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--rule)" }} />
                  Led college-level social service initiatives, including awareness campaigns and blood donation drives.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--rule)" }} />
                  Managed cross-functional volunteer teams for community development projects.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* EDUCATION */}
      <Section id="education" index="05 — Foundation" title="Education & Certifications">
        <div className="pf-panel rounded-md p-6 mb-5">
          <h3 className="pf-display text-lg font-semibold mb-1">
            Bachelor of Computer Applications (BCA)
          </h3>
          <p className="text-sm" style={{ color: "var(--teal)" }}>
            Indrashil University, Gujarat · Expected 2027
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="pf-panel rounded-md p-5">
            <p className="pf-mono text-xs uppercase tracking-widest mb-1" style={{ color: "var(--amber)" }}>Jul 2025</p>
            <p className="text-sm">AI &amp; Data Scientist Certificate</p>
            <p className="text-xs" style={{ color: "var(--ink-soft)" }}>OneRoadmap</p>
          </div>
          <div className="pf-panel rounded-md p-5">
            <p className="pf-mono text-xs uppercase tracking-widest mb-1" style={{ color: "var(--amber)" }}>Jul 2025</p>
            <p className="text-sm">Python Programming Certificate</p>
            <p className="text-xs" style={{ color: "var(--ink-soft)" }}>OneRoadmap</p>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="max-w-4xl mx-auto px-6 md:px-10 py-14 border-t" style={{ borderColor: "var(--rule)" }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="pf-display text-2xl font-semibold mb-2">Let's build something.</p>
            <p className="text-sm max-w-md" style={{ color: "var(--ink-soft)" }}>
              Open to full-stack and AI/ML engineering roles — especially anything touching LLMs, RAG, or data pipelines.
            </p>
          </div>
          <a
            href="mailto:pranjalgupta1410@gmail.com"
            className="pf-mono text-sm px-4 py-2 rounded"
            style={{ background: "var(--amber)", color: "var(--bg)" }}
          >
            Get in touch →
          </a>
        </div>
      </footer>
    </div>
  );
}
