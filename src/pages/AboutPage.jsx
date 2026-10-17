import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function AboutPage({ onNavigate }) {
  const experiences = [
    { period: '2023 — PRESENT', role: 'HEAD OF DESIGN & CREATIVE DIRECTOR', place: 'Independent Studio / Saigon', desc: 'Leading high-impact digital experiences, web design systems, and 3D web architectures for global brands.' },
    { period: '2021 — 2023', role: 'EX-HEAD OF FACULTY & SENIOR LECTURER', place: 'Saigon Creative Academy', desc: 'Trained over 500+ aspiring designers in Design Systems, advanced UI/UX architecture, and interactive prototyping.' },
    { period: '2019 — 2021', role: 'LEAD PRODUCT & DESIGN SYSTEM DESIGNER', place: 'Enterprise SaaS & Tech Labs', desc: 'Architected scalable multi-platform design tokens, component libraries, and telemetry consoles.' },
    { period: '2016 — 2019', role: 'SENIOR UI/UX & INTERACTION DESIGNER', place: 'Digital Agencies', desc: 'Crafted award-winning marketing platforms, identity branding, and e-commerce portals.' }
  ];

  const pillars = [
    { num: '01', title: 'BOLD IDENTITY', desc: 'Rejecting cookie-cutter templates in favor of aggressive, distinctive visual languages that command industry respect.' },
    { num: '02', title: 'PERFORMANCE FIRST', desc: 'High-speed 60fps rendering, physics-based smooth scrolling, and accessible semantic architecture.' },
    { num: '03', title: 'SYSTEMIC RIGOR', desc: 'Building comprehensive design token libraries and reusable React components that scale effortlessly.' },
    { num: '04', title: 'PEDAGOGY & CRAFT', desc: 'Actively teaching, mentoring, and giving keynote lectures to advance the UI/UX design community in Vietnam and beyond.' }
  ];

  return (
    <div className="page-container about-page-root">
      {/* Editorial Hero Banner */}
      <div className="about-hero-banner">
        <div className="about-banner-media">
          <img src="/images/hero-designer.jpg" alt="Sun Hung" className="about-banner-img" />
          <div className="about-banner-overlay" />
        </div>

        <div className="about-hero-content">
          <span className="section-eyebrow font-mono">● BIOGRAPHY & PRACTICE</span>
          <h1 className="about-giant-headline font-display">
            ROBIN CAHYA IS A MULTI DISCIPLINARY DESIGNER AND WEB DEVELOPER.
          </h1>
          <p className="about-lead-sub font-mono">
            BASED IN JAKARTA, INDONESIA. PASSIONATE ABOUT CREATING IMMERSIVE VISUAL EXPERIENCES. WITH MORE THAN 8 YEARS OF EXPERIENCE IN A VARIETY OF DOMAINS.
          </p>
        </div>
      </div>

      {/* Narrative Section with Editorial Workshop Photo */}
      <section className="about-narrative-section">
        <div className="narrative-grid">
          <div className="narrative-photo-wrap">
            <img src="/images/photo-workshop.jpg" alt="Sun Hung Workshop" className="narrative-img" />
            <div className="photo-corner-tag font-mono"></div>
          </div>

          <div className="narrative-text-wrap">
            <h3 className="narrative-headline font-display">
              BRIDGING BOLD INNOVATION WITH STRUCTURED ENTERPRISE STRATEGY.
            </h3>
            <p className="bio-text" style={{ marginBottom: '1.5rem' }}>
              A person who loves traveling and doing sports. I have experience in multiple organization so I have a good
              teamworking ability. I have outstanding knowledge in general aspects so my high school and worker friends often
              call me Bin-pedia. I never see failures as a negative thing, I’d rather see it as an opportunity to become a better
              person. I want to concentrate on being the best that I can be and make people around me happy to have a social
              connection with me. I’d love to travel around the world, exchanging experiences and knowledge between me and
              foreigners. I enjoy expanding social connection and having new connections always been a pleasure for me.
            </p>
          </div>
        </div>
      </section>

      {/* Core Design Pillars */}
      <section className="about-pillars-section">
        <span className="section-eyebrow font-mono">● CORE DESIGN PHILOSOPHY</span>
        <h2 className="section-heading-big font-display">THE FOUR PILLARS</h2>

        <div className="pillars-grid">
          {pillars.map((p) => (
            <div key={p.num} className="pillar-card">
              <span className="pillar-num font-mono">{p.num}</span>
              <h3 className="pillar-title font-display">{p.title}</h3>
              <p className="pillar-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Action Bar */}
      <div className="about-bottom-cta">
        <button
          className="explore-now-btn"
          onClick={() => onNavigate('works')}
        >
          <span>VIEW SELECTED WORKS</span>
          <ArrowUpRight size={20} />
        </button>

        <button
          className="explore-now-btn"
          style={{ background: 'transparent', color: '#fff', border: '1px solid var(--border-subtle)' }}
          onClick={() => onNavigate('contact')}
        >
          <span>START A PROJECT</span>
          <ArrowUpRight size={20} />
        </button>
      </div>
    </div>
  );
}
