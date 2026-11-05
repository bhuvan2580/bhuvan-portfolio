import { useEffect, useState } from "react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin, Mail, MapPin,
  Menu, X, Code2, Database, BrainCircuit, Layers3, BriefcaseBusiness,
  GraduationCap, Award, ExternalLink, Send, CheckCircle2, Sparkles
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "";

const projects = [
  {
    number: "01",
    title: "Receivables Intelligence",
    type: "FULL-STACK · MACHINE LEARNING",
    description: "A cash-flow and risk prediction platform that estimates incoming and outgoing cash, scores invoice risk, and recommends the next action.",
    result: "ROC-AUC 0.83 · 79.8% accuracy",
    stack: ["Python", "Random Forest", "Flask", "React", "PostgreSQL"],
    link: "https://github.com/bhuvan2580/Receivables-Intelligence",
    accent: "mint",
    icon: "brain"
  },
  {
    number: "02",
    title: "IT Asset Management",
    type: "FULL-STACK · BUSINESS AUTOMATION",
    description: "A company asset workflow that brings registration, employee assignments, returns, history and dashboards into one place, replacing a manual process.",
    result: "Designed and built independently in 1 week",
    stack: ["React", "Flask", "PostgreSQL"],
    link: "https://github.com/bhuvan2580/Assets-Management-System",
    accent: "blue",
    icon: "layers"
  },
  {
    number: "03",
    title: "Vyomrakshak AI",
    type: "AI · DECISION SUPPORT",
    description: "An emergency landing assistance recommender that evaluates 5–15 candidate landing sites using live factors such as fuel, terrain and weather.",
    result: "Recommendations in under 5 seconds",
    stack: ["Python", "scikit-learn", "Flask"],
    link: "https://github.com/bhuvan2580/Datathon-2025-new",
    accent: "orange",
    icon: "spark"
  },
  {
    number: "04",
    title: "AI Waiter System",
    type: "AUTOMATION · COMPUTER VISION",
    description: "A restaurant ordering workflow connecting customer menu selection to kitchen notification and robot delivery.",
    result: "90–95% order recognition in testing",
    stack: ["Python", "OpenCV", "TensorFlow", "IoT"],
    link: "https://github.com/bhuvan2580",
    accent: "pink",
    icon: "code"
  }
];

const skills = [
  { title: "Programming", icon: Code2, items: ["Python", "JavaScript", "SQL", "Java", "C", "OOP"] },
  { title: "Backend & APIs", icon: Layers3, items: ["Flask", "REST APIs", "Authentication", "Authorization"] },
  { title: "Frontend", icon: Code2, items: ["React", "Vite", "HTML", "CSS", "Tailwind CSS"] },
  { title: "Databases & Tools", icon: Database, items: ["PostgreSQL", "MySQL", "MongoDB", "Git", "Docker", "AWS"] },
  { title: "Data, ML & IoT", icon: BrainCircuit, items: ["Pandas", "NumPy", "scikit-learn", "Power BI", "OpenCV", "ESP32", "Arduino"] }
];

const experience = [
  {
    period: "AUG 2026 — PRESENT",
    role: "Graduate Engineer Trainee",
    company: "Abylle Solutions Pvt. Ltd.",
    area: "Data Science & Web Development",
    points: [
      "Analysed March–July General Ledger tax variances and built an interactive Power BI dashboard to help identify discrepancies.",
      "Independently designed, developed and debugged a full-stack IT Asset Management system using React, Flask and PostgreSQL."
    ]
  },
  {
    period: "MAR 2026 — MAY 2026",
    role: "AI & Embedded Systems Intern",
    company: "Government Tool Room and Training Centre (GTTC)",
    area: "Artificial Intelligence · IoT",
    points: [
      "Developed an AI interview assessment system using a pretrained mini-XCEPTION model for facial-expression analysis and PDF reporting.",
      "Built an ESP32 smart parking monitor with ultrasonic sensors and a Flask web application, plus an IoT home automation system."
    ]
  },
  {
    period: "SEP 2025 — OCT 2025",
    role: "IT Intern",
    company: "Hindustan Aeronautics Limited (HAL)",
    area: "Helicopter Division",
    points: [
      "Developed a Python-based inventory management project and gained practical exposure to enterprise networking and IT operations."
    ]
  }
];

function SectionHeading({ eyebrow, title, note }) {
  return <div className="section-heading">
    <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>
    {note && <p>{note}</p>}
  </div>;
}

function App() {
  const [profile, setProfile] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState({ loading: false, message: "", error: false });

  useEffect(() => {
    fetch(`${API_URL}/api/profile`)
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setProfile)
      .catch(() => setProfile({
        name: "Bhuvan S.", role: "Python Developer",
        email: "bhuvansudhakar80@gmail.com",
        phone: "+91 78927 94170", location: "Bengaluru, India",
        linkedin: "https://linkedin.com/in/bhuvan-s-8310591bb",
        github: "https://github.com/bhuvan2580",
        availability: "Open to Python Development · Data Science · AI/ML · Full Stack · Web Development"
      }));
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const updateField = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submitContact(e) {
    e.preventDefault();
    setFormState({ loading: true, message: "", error: false });
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong.");
      setForm({ name: "", email: "", message: "" });
      setFormState({ loading: false, message: data.message, error: false });
    } catch (err) {
      setFormState({ loading: false, message: err.message || "Could not send message. Please email me directly.", error: true });
    }
  }

  return <div className="site-shell">
    <header className="topbar">
      <a className="brand" href="#home" onClick={closeMenu}><span className="brand-mark">B.</span><span>BHUVAN S.</span></a>
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? "nav-links open" : "nav-links"}>
        {[["About", "#about"], ["Experience", "#experience"], ["Projects", "#projects"], ["Skills", "#skills"], ["Contact", "#contact"]].map(([label, href]) =>
          <a key={label} href={href} onClick={closeMenu}>{label}</a>
        )}
        <a className="nav-resume" href="mailto:bhuvansudhakar80@gmail.com?subject=Resume%20request">Let's talk <ArrowUpRight size={15} /></a>
      </nav>
    </header>

    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <div className="availability"><span className="status-dot" /> {profile?.availability || "Open to opportunities"}</div>
          <p className="hero-kicker">HELLO, I'M BHUVAN <span className="wave">✳</span></p>
          <h1>Turning ideas<br />into <span className="accent-text">useful software.</span></h1>
          <p className="hero-description">I'm a Python developer who enjoys building thoughtful web applications, solving real problems and bringing machine learning into practical use.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">Explore my work <ArrowUpRight size={17} /></a>
            <a className="button button-quiet" href="#contact">Get in touch <ArrowDown size={16} /></a>
          </div>
          <div className="hero-socials">
            <a href="https://github.com/bhuvan2580" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
            <a href="https://linkedin.com/in/bhuvan-s-8310591bb" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a>
            <span><MapPin size={16} /> Bengaluru, India</span>
          </div>
        </div>
        <div className="hero-art profile-art">

          <div className="profile-orbit profile-orbit-one"></div>
          <div className="profile-orbit profile-orbit-two"></div>

          <div className="profile-photo-frame">
            <img
              src="/profile.jpg"
              alt="Bhuvan"
              className="profile-photo"
            />
          </div>

          <div className="floating-chip chip-python">
            <span>Py</span> Python Developer
          </div>

          <div className="floating-chip chip-react">
            <span>⚛</span> React + Flask
          </div>

          <div className="profile-caption">
            <span className="status-dot"></span>
            BUILD · LEARN · REPEAT
          </div>

        </div>

        <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><div className="scroll-line" /><span>01 / 05</span></div>
      </section>

      <section className="intro-strip">
        <div className="section-wrap strip-inner"><span>WHAT I DO</span><p>Backend development <b>✳</b> Full-stack applications <b>✳</b> Applied machine learning <b>✳</b> Data-driven solutions</p></div>
      </section>

      <section className="section-wrap section-block" id="about">
        <SectionHeading eyebrow="A LITTLE ABOUT ME" title={<>Curious by nature.<br /><span className="muted-title">Developer by choice.</span></>} note="I like understanding how things work, then building something useful with what I learn." />
        <div className="about-grid">
          <div className="about-main"><p className="lead">I'm a Computer Science graduate specialising in Artificial Intelligence and Machine Learning. My strongest interest is Python development, especially building applications from the backend to the user interface.</p><p>From automating an internal asset workflow to developing a machine-learning platform for receivables, I enjoy taking ownership of a problem, working through the details and delivering a working solution.</p><p>I'm comfortable learning new tools, debugging tricky issues and collaborating with people across teams.</p><a className="text-link" href="mailto:bhuvansudhakar80@gmail.com">Let's connect <ArrowUpRight size={16} /></a></div>
          <div className="stat-grid">
            <div className="stat-card"><strong>0.83</strong><span>ROC-AUC on a risk prediction model</span><small>MODEL PERFORMANCE</small></div>
            <div className="stat-card"><strong>01 <small>week</small></strong><span>To build an end-to-end asset management system</span><small>BUILD SPRINT</small></div>
            <div className="stat-card stat-wide"><strong>2 / 2</strong><span>GATE 2026: qualified in CS and DA</span><small>ACADEMIC MILESTONE</small></div>
          </div>
        </div>
      </section>

      <section className="section-block dark-section" id="experience">
        <div className="section-wrap">
          <SectionHeading eyebrow="WHERE I'VE LEARNED" title={<>Experience that<br /><span className="dark-muted">builds perspective.</span></>} note="A mix of software development, data analysis, AI and hands-on engineering." />
          <div className="timeline">{experience.map((item, i) => <article className="timeline-item" key={item.company}>
            <div className="timeline-date">{item.period}</div><div className="timeline-marker"><span /></div>
            <div className="timeline-content"><div className="timeline-title"><div><h3>{item.role}</h3><h4>{item.company}</h4></div><span className="experience-index">0{i + 1}</span></div><p className="timeline-area">{item.area}</p><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul></div>
          </article>)}</div>
        </div>
      </section>

      <section className="section-wrap section-block" id="projects">
        <SectionHeading eyebrow="SELECTED WORK" title={<>Things I've <span className="muted-title">built.</span></>} note="A few projects where I turned a challenge into a working application." />
        <div className="project-grid">{projects.map((project) => <article className={`project-card ${project.accent}`} key={project.number}>
          <div className="project-top"><span className="project-number">{project.number} / PROJECT</span><a href={project.link} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`}><ArrowUpRight size={19} /></a></div>
          <div className="project-visual">
            {project.icon === "brain" && <div className="visual-brain"><BrainCircuit size={76} strokeWidth={1.1} /><span className="visual-orbit" /><span className="visual-orbit orbit-small" /></div>}
            {project.icon === "layers" && <div className="visual-layers"><div /><div /><div /><span>ASSET / TRACK / MANAGE</span></div>}
            {project.icon === "spark" && <div className="visual-map"><span className="map-route" /><span className="map-pin pin-a">A</span><span className="map-pin pin-b">B</span><span className="map-pin pin-c">C</span><span className="map-label">SAFE LANDING</span></div>}
            {project.icon === "code" && <div className="visual-code"><span>01</span> order = customer.select()<br /><span>02</span> kitchen.notify(order)<br /><span>03</span> robot.deliver(order)<i>_</i></div>}
          </div>
          <p className="project-type">{project.type}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p>
          <p className="project-result"><CheckCircle2 size={15} /> {project.result}</p>
          <div className="tag-list">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <a className="project-link" href={project.link} target="_blank" rel="noreferrer">View on GitHub <ArrowUpRight size={16} /></a>
        </article>)}</div>
      </section>

      <section className="skills-section section-block" id="skills"><div className="section-wrap">
        <SectionHeading eyebrow="MY TOOLKIT" title={<>Tools I use to<br /><span className="muted-title">make things happen.</span></>} note="The technologies and concepts I work with across the stack." />
        <div className="skills-grid">{skills.map(({ title, icon: Icon, items }, i) => <div className="skill-card" key={title}><div className="skill-card-head"><span className="skill-icon"><Icon size={19} /></span><span>0{i + 1}</span></div><h3>{title}</h3><div className="skill-tags">{items.map((item) => <span key={item}>{item}</span>)}</div></div>)}</div>
      </div></section>

      <section className="section-wrap section-block more-section">
        <div className="more-grid">
          <div><span className="eyebrow">EDUCATION</span><div className="credential"><GraduationCap size={22} /><div><h3>B.E. Computer Science & Engineering</h3><p>Artificial Intelligence and Machine Learning</p><span>Global Academy of Technology · 2022–2026</span></div></div><div className="credential-note">CGPA <strong>7.93 / 10</strong></div></div>
          <div><span className="eyebrow">BEYOND THE CODE</span><div className="credential"><Award size={22} /><div><h3>Achievements & leadership</h3><p>GATE 2026 qualified in CS and DA.</p><p>NCC ‘B’ Certificate (A grade) and ‘C’ Certificate (B grade).</p><p>Main Student Convener, VTU Youth Fest – Interact 2025.</p><span>Also competed in IBM Datathon, Code Breaker Challenge and Hack A League 2.0.</span></div></div></div>
        </div>
      </section>

      <section className="contact-section" id="contact"><div className="section-wrap contact-grid">
        <div className="contact-copy"><span className="eyebrow">HAVE A PROJECT OR OPPORTUNITY?</span><h2>Let's make<br /><span>something matter.</span></h2><p>I'm open to conversations about Python development, full-stack projects and junior developer opportunities.</p>
          <a className="contact-email" href="mailto:bhuvansudhakar80@gmail.com"><Mail size={18} /> bhuvansudhakar80@gmail.com <ArrowUpRight size={16} /></a>
          <div className="contact-social"><a href="https://github.com/bhuvan2580" target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a><a href="https://linkedin.com/in/bhuvan-s-8310591bb" target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn</a></div>
        </div>
        <form className="contact-form" onSubmit={submitContact}><div className="form-heading"><span>01 — SAY HELLO</span><h3>Send me a message</h3></div>
          <label>Your name<input name="name" value={form.name} onChange={updateField} placeholder="What should I call you?" required maxLength="100" /></label>
          <label>Email address<input name="email" type="email" value={form.email} onChange={updateField} placeholder="you@example.com" required maxLength="254" /></label>
          <label>Your message<textarea name="message" value={form.message} onChange={updateField} placeholder="Tell me a little about it..." rows="4" required maxLength="5000" /></label>
          <button className="button button-primary send-button" disabled={formState.loading}>{formState.loading ? "Sending..." : "Send message"} <Send size={16} /></button>
          {formState.message && <p className={formState.error ? "form-feedback error" : "form-feedback"}>{formState.message}</p>}
        </form>
      </div></section>
    </main>

    <footer className="footer"><div className="section-wrap footer-inner"><a className="brand" href="#home"><span className="brand-mark">B.</span><span>BHUVAN S.</span></a><span>Designed & built with curiosity. © {new Date().getFullYear()} Bhuvan S.</span><a href="#home" className="back-top">BACK TO TOP ↑</a></div></footer>
  </div>;
}

export default App;
