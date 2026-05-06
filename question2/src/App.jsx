import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Georgia', serif; background: #0a0a0a; color: #f0ece4; min-height: 100vh; }

  nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(10,10,10,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid #222;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2.5rem; height: 64px;
  }
  .nav-logo { font-size: 1.2rem; font-weight: 700; letter-spacing: -0.02em; color: #f0ece4; text-decoration: none; }
  .nav-logo span { color: #c8a96e; }
  .nav-links { display: flex; gap: 2rem; }
  .nav-link {
    font-family: 'Courier New', monospace; font-size: 0.78rem; letter-spacing: 0.12em;
    text-transform: uppercase; color: #888; text-decoration: none;
    padding: 4px 0; border-bottom: 1px solid transparent;
    transition: color 0.2s, border-color 0.2s;
  }
  .nav-link:hover { color: #f0ece4; }
  .nav-link.active { color: #c8a96e; border-bottom-color: #c8a96e; }

  .page { animation: fadeUp 0.4s cubic-bezier(0.22,1,0.36,1); }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .home-hero {
    min-height: calc(100vh - 64px);
    display: flex; flex-direction: column; justify-content: center;
    padding: 4rem 2.5rem;
    position: relative; overflow: hidden;
    background: linear-gradient(160deg, #0a0a0a 60%, #111008 100%);
  }
  .home-hero::before {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse 60% 50% at 70% 40%, rgba(200,169,110,0.07) 0%, transparent 70%);
  }
  .eyebrow {
    font-family: 'Courier New', monospace; font-size: 0.72rem; letter-spacing: 0.2em;
    text-transform: uppercase; color: #c8a96e; margin-bottom: 1.5rem;
  }
  .hero-title {
    font-size: clamp(2.8rem, 6vw, 5.5rem); font-weight: 700; line-height: 1.04;
    letter-spacing: -0.03em; color: #f0ece4; max-width: 680px; margin-bottom: 1.5rem;
  }
  .hero-title em { font-style: italic; color: #c8a96e; }
  .hero-sub { font-size: 1.05rem; color: #888; max-width: 440px; line-height: 1.7; margin-bottom: 2.5rem; }
  .btn-group { display: flex; gap: 1rem; flex-wrap: wrap; }
  .btn-primary {
    background: #c8a96e; color: #0a0a0a; border: none;
    padding: 0.75rem 1.75rem; font-family: 'Courier New', monospace;
    font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
    cursor: pointer; font-weight: 700; transition: background 0.2s, transform 0.15s;
  }
  .btn-primary:hover { background: #dbbe88; transform: translateY(-1px); }
  .btn-ghost {
    background: transparent; color: #f0ece4; border: 1px solid #333;
    padding: 0.75rem 1.75rem; font-family: 'Courier New', monospace;
    font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
    cursor: pointer; transition: border-color 0.2s, transform 0.15s;
    text-decoration: none; display: inline-block;
  }
  .btn-ghost:hover { border-color: #888; transform: translateY(-1px); }
  .feature-strip { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid #1a1a1a; }
  .feature-item { padding: 2rem 2.5rem; border-right: 1px solid #1a1a1a; }
  .feature-item:last-child { border-right: none; }
  .feature-num { font-family: 'Courier New', monospace; font-size: 0.68rem; letter-spacing: 0.15em; color: #c8a96e; margin-bottom: 0.75rem; }
  .feature-title { font-size: 1rem; font-weight: 700; color: #f0ece4; margin-bottom: 0.5rem; }
  .feature-desc { font-size: 0.85rem; color: #666; line-height: 1.6; }

  .about-page { max-width: 860px; margin: 0 auto; padding: 5rem 2.5rem; }
  .page-tag { font-family: 'Courier New', monospace; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: #c8a96e; margin-bottom: 1rem; }
  .page-title { font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 700; letter-spacing: -0.03em; color: #f0ece4; line-height: 1.1; margin-bottom: 2rem; }
  .about-lead { font-size: 1.2rem; color: #bbb; line-height: 1.75; border-left: 3px solid #c8a96e; padding-left: 1.5rem; margin-bottom: 3rem; }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: #1a1a1a; margin-bottom: 3rem; }
  .about-card { background: #0a0a0a; padding: 1.75rem; }
  .about-card-label { font-family: 'Courier New', monospace; font-size: 0.68rem; letter-spacing: 0.15em; color: #555; text-transform: uppercase; margin-bottom: 0.5rem; }
  .about-card-val { font-size: 1.6rem; font-weight: 700; color: #f0ece4; }
  .about-card-sub { font-size: 0.82rem; color: #666; margin-top: 0.25rem; }
  .about-body { font-size: 0.95rem; color: #888; line-height: 1.8; }
  .about-body p + p { margin-top: 1rem; }

  .contact-page { max-width: 680px; margin: 0 auto; padding: 5rem 2.5rem; }
  .form-field { margin-bottom: 1.5rem; }
  .form-label { display: block; font-family: 'Courier New', monospace; font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: #666; margin-bottom: 0.5rem; }
  .form-input, .form-select, .form-textarea {
    width: 100%; background: #111; border: 1px solid #222; color: #f0ece4;
    padding: 0.75rem 1rem; font-family: 'Georgia', serif; font-size: 0.95rem;
    outline: none; transition: border-color 0.2s; appearance: none;
  }
  .form-input:focus, .form-select:focus, .form-textarea:focus { border-color: #c8a96e; }
  .form-textarea { resize: vertical; min-height: 130px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .success-toast {
    background: #0e1a10; border: 1px solid #1f4025; color: #6ecf82;
    padding: 1rem 1.25rem; font-size: 0.85rem; margin-top: 1rem;
    font-family: 'Courier New', monospace; letter-spacing: 0.05em;
  }

  @media (max-width: 600px) {
    .feature-strip { grid-template-columns: 1fr; }
    .feature-item { border-right: none; border-bottom: 1px solid #1a1a1a; }
    .about-grid { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    nav { padding: 0 1rem; }
    .nav-links { gap: 1rem; }
    .home-hero, .about-page, .contact-page { padding-left: 1rem; padding-right: 1rem; }
  }
`;

function Navbar() {
  return (
    <nav>
      <NavLink to="/" className="nav-logo">
        Folio<span>.</span>
      </NavLink>
      <div className="nav-links">
        <NavLink to="/" end className="nav-link">Home</NavLink>
        <NavLink to="/about" className="nav-link">About</NavLink>
        <NavLink to="/contact" className="nav-link">Contact</NavLink>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div className="page">
      <section className="home-hero">
        <p className="eyebrow">React SPA · Client-side Routing</p>
        <h1 className="hero-title">
          Build things<br />that <em>matter.</em>
        </h1>
        <p className="hero-sub">
          A single-page application powered by React Router. Navigate between pages
          instantly — no server round-trips, no full reloads.
        </p>
        <div className="btn-group">
          <NavLink to="/about" className="btn-primary">Learn More →</NavLink>
          <NavLink to="/contact" className="btn-ghost">Get in Touch</NavLink>
        </div>
      </section>

      <div className="feature-strip">
        {[
          { num: "01", title: "React Router", desc: "Uses BrowserRouter + Routes so the URL stays clean and bookmarkable." },
          { num: "02", title: "Animated Pages", desc: "Every route transition fades and slides in via a CSS keyframe animation." },
          { num: "03", title: "Active Links", desc: "NavLink auto-applies an active class to highlight the current page." },
        ].map((f) => (
          <div className="feature-item" key={f.num}>
            <p className="feature-num">{f.num}</p>
            <p className="feature-title">{f.title}</p>
            <p className="feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  const stats = [
    { label: "Founded",   val: "2019",  sub: "Five years running" },
    { label: "Projects",  val: "120+",  sub: "Across 18 countries" },
    { label: "Team Size", val: "12",    sub: "Humans + 3 good dogs" },
    { label: "Stack",     val: "React", sub: "TypeScript · Node · Postgres" },
  ];

  return (
    <div className="page">
      <div className="about-page">
        <p className="page-tag">Who we are</p>
        <h2 className="page-title">Crafting digital<br />experiences.</h2>

        <p className="about-lead">
          We're a small studio obsessed with the intersection of clean code and sharp design.
          Every pixel intentional. Every interaction considered.
        </p>

        <div className="about-grid">
          {stats.map((s) => (
            <div className="about-card" key={s.label}>
              <p className="about-card-label">{s.label}</p>
              <p className="about-card-val">{s.val}</p>
              <p className="about-card-sub">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="about-body">
          <p>
            Our philosophy is simple: the best interfaces are invisible. They guide users
            without friction, delight without distraction, and communicate without clutter.
          </p>
          <p>
            This SPA is built with React Router v6 — using BrowserRouter, Routes, and Route
            to keep navigation fully client-side with clean, readable URLs.
          </p>
          <p>
            NavLink automatically applies an active class to whichever link matches the
            current URL, powering the gold underline in the navbar.
          </p>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", topic: "", msg: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.msg) return;
    setSent(true);
    setForm({ name: "", email: "", topic: "", msg: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="page">
      <div className="contact-page">
        <p className="page-tag">Say hello</p>
        <h2 className="page-title">Let's work<br />together.</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Name</label>
              <input
                className="form-input"
                placeholder="Jane Smith"
                value={form.name}
                onChange={handleChange("name")}
              />
            </div>
            <div className="form-field">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={handleChange("email")}
              />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">Topic</label>
            <select
              className="form-select form-input"
              value={form.topic}
              onChange={handleChange("topic")}
            >
              <option value="">Select a topic…</option>
              <option>New project</option>
              <option>Consulting</option>
              <option>General inquiry</option>
            </select>
          </div>

          <div className="form-field">
            <label className="form-label">Message</label>
            <textarea
              className="form-textarea"
              placeholder="Tell us about your project…"
              value={form.msg}
              onChange={handleChange("msg")}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100%", padding: "0.9rem" }}
          >
            Send Message →
          </button>

          {sent && (
            <div className="success-toast">
              Message received — we'll be in touch within 24 hours.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <style>{styles}</style>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
}
