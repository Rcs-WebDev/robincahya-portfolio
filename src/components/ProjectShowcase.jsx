import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, X, ExternalLink, ChevronLeft, ChevronRight, Laptop, Smartphone } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

function GithubIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export default function ProjectShowcase() {
  const containerRef = useRef(null);
  const titleStageRef = useRef(null);
  const subStageRef = useRef(null);
  const flareRef = useRef(null);
  const flareCoreRef = useRef(null);
  const beamRef = useRef(null);
  const showcaseStageRef = useRef(null);
  const trackRef = useRef(null);

  // Active Project Modal State
  const [activeProject, setActiveProject] = useState(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const projects = PORTFOLIO_DATA.featuredProjects;

  // Open Modal
  const handleOpenModal = (project, idx) => {
    setActiveProject(project);
    setActiveIdx(idx);
    document.body.style.overflow = 'hidden';
  };

  // Close Modal
  const handleCloseModal = () => {
    setActiveProject(null);
    document.body.style.overflow = '';
  };

  // Modal navigation
  const handlePrevProject = (e) => {
    e?.stopPropagation();
    const nextIdx = (activeIdx - 1 + projects.length) % projects.length;
    setActiveIdx(nextIdx);
    setActiveProject(projects[nextIdx]);
  };

  const handleNextProject = (e) => {
    e?.stopPropagation();
    const nextIdx = (activeIdx + 1) % projects.length;
    setActiveIdx(nextIdx);
    setActiveProject(projects[nextIdx]);
  };

  // Keyboard navigation for Modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeProject) return;
      if (e.key === 'Escape') handleCloseModal();
      if (e.key === 'ArrowLeft') handlePrevProject();
      if (e.key === 'ArrowRight') handleNextProject();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject, activeIdx]);

  // Master Cinematic Sequential Scrubbing Animation
  // 1. Judul IN -> HOLD -> OUT (100% GONE)
  // 2. Pure Void Gap
  // 3. Sub-Judul IN -> HOLD -> OUT (100% GONE)
  // 4. Pure Void Gap
  // 5. Project Showcase GRAND CINEMATIC TRANSITION IN FROM PROJECT 1 (YTShortClipper)
  // 6. Showcase HOLD -> Horizontal Scrub Through All 5 Projects!
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.1,
        },
      });

      // Initial States: showcase stage is completely hidden with autoAlpha: 0 in deep blur & depth
      gsap.set(titleStageRef.current, { autoAlpha: 0, scale: 0.85, z: -140, filter: 'blur(20px)', pointerEvents: 'none' });
      gsap.set(subStageRef.current, { autoAlpha: 0, scale: 0.88, filter: 'blur(18px)', y: 45, pointerEvents: 'none' });
      gsap.set(showcaseStageRef.current, { autoAlpha: 0, scale: 0.78, y: 80, filter: 'blur(30px)', pointerEvents: 'none' });
      gsap.set(trackRef.current, { x: '0%' }); // Starts exactly from Project 1

      // =========================================================
      // 1. JUDUL UTAMA CINEMATIC IN -> HOLD -> OUT (0.00 -> 0.30)
      // =========================================================
      if (flareRef.current && flareCoreRef.current) {
        tl.fromTo(
          flareRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1.5, opacity: 1, duration: 0.12, ease: 'power3.in' },
          0.01
        );
        tl.fromTo(
          flareCoreRef.current,
          { scale: 0, x: -160 },
          { scale: 2.2, x: 160, duration: 0.14, ease: 'power2.inOut' },
          0.01
        );
        tl.to([flareRef.current, flareCoreRef.current], { opacity: 0, duration: 0.08, ease: 'power2.out' }, 0.14);
      }

      // Judul IN (0.02 -> 0.14)
      tl.to(
        titleStageRef.current,
        { autoAlpha: 1, scale: 1, z: 0, filter: 'blur(0px)', duration: 0.12, ease: 'power3.out' },
        0.02
      );

      // Judul HOLD: 0.14 -> 0.20
      // Judul OUT: 0.20 -> 0.30 (100% GONE AT 0.30)
      tl.to(
        titleStageRef.current,
        { autoAlpha: 0, scale: 1.38, z: 150, filter: 'blur(30px)', duration: 0.10, ease: 'power2.in' },
        0.20
      );

      // =========================================================
      // 2. SUB-JUDUL CINEMATIC IN -> HOLD -> OUT (0.35 -> 0.63)
      // (Pure Void Gap: 0.30 -> 0.35)
      // =========================================================
      // Sub-Judul IN (0.35 -> 0.47)
      tl.to(
        subStageRef.current,
        { autoAlpha: 1, scale: 1, filter: 'blur(0px)', y: 0, duration: 0.12, ease: 'power3.out' },
        0.35
      );

      if (beamRef.current) {
        tl.fromTo(
          beamRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.10, ease: 'power2.out' },
          0.37
        );
      }

      // Sub-Judul HOLD: 0.47 -> 0.53
      // Sub-Judul OUT: 0.53 -> 0.63 (COMPLETELY 100% GONE AT 0.63)
      tl.to(
        subStageRef.current,
        { autoAlpha: 0, scale: 0.88, filter: 'blur(25px)', y: -45, duration: 0.10, ease: 'power2.in' },
        0.53
      );

      // =========================================================
      // 3. PROJECT SHOWCASE GRAND CINEMATIC TRANSITION IN (0.68 -> 0.78)
      // (Pure Void Gap: 0.63 -> 0.68 ensures sub-title & blur are 100% GONE)
      // =========================================================
      tl.to(
        showcaseStageRef.current,
        { autoAlpha: 1, scale: 1, y: 0, filter: 'blur(0px)', pointerEvents: 'auto', duration: 0.10, ease: 'power3.out' },
        0.68
      );

      // Showcase Orientation Hold: 0.78 -> 0.82

      // 4. Scrub through ALL 5 Projects horizontally (Starts ONLY after transition IN: 0.82 -> 1.00)
      if (trackRef.current) {
        tl.to(
          trackRef.current,
          { x: '-76%', duration: 0.18, ease: 'none' },
          0.82
        );
      }
    });

    mm.add('(max-width: 768px)', () => {
      // Set explicit initial states on mobile to ensure strict sequence
      gsap.set(titleStageRef.current, { autoAlpha: 0, scale: 0.85, filter: 'blur(16px)', pointerEvents: 'none' });
      gsap.set(subStageRef.current, { autoAlpha: 0, scale: 0.88, filter: 'blur(16px)', y: 35, pointerEvents: 'none' });
      gsap.set(showcaseStageRef.current, { autoAlpha: 0, scale: 0.82, y: 50, filter: 'blur(20px)', pointerEvents: 'none' });
      if (trackRef.current) gsap.set(trackRef.current, { x: '0%' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      // 1. Judul IN -> HOLD -> OUT (0.00 -> 0.32)
      tl.to(titleStageRef.current, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 0.14, ease: 'power2.out' }, 0.02);
      tl.to(titleStageRef.current, { autoAlpha: 0, scale: 1.25, filter: 'blur(20px)', duration: 0.12, ease: 'power2.in' }, 0.20);

      // 2. Sub-Judul IN -> HOLD -> OUT (0.36 -> 0.64)
      tl.to(subStageRef.current, { autoAlpha: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 0.14, ease: 'power2.out' }, 0.36);
      tl.to(subStageRef.current, { autoAlpha: 0, scale: 0.9, filter: 'blur(20px)', y: -30, duration: 0.12, ease: 'power2.in' }, 0.52);

      // 3. Showcase Grand Transition IN (0.68 -> 0.78)
      tl.to(showcaseStageRef.current, { autoAlpha: 1, scale: 1, y: 0, filter: 'blur(0px)', pointerEvents: 'auto', duration: 0.10, ease: 'power2.out' }, 0.68);

      // 4. Horizontal Scrubbing Across Projects (0.80 -> 1.00)
      if (trackRef.current) {
        tl.to(trackRef.current, { x: '-82%', duration: 0.20, ease: 'none' }, 0.80);
      }
    });

    return () => mm.revert();
  }, []);

  // Quick jump to card on click of dock navigator
  const handleJumpToProject = (idx) => {
    if (!trackRef.current) return;
    const offsetPercent = (idx / (projects.length - 1)) * 76;
    gsap.to(trackRef.current, {
      x: `-${offsetPercent}%`,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  return (
    <section ref={containerRef} id="project-showcase" className="pinned-design-container" style={{ height: '700vh', background: '#060608' }}>
      {/* Pinned Sticky Viewport */}
      <div
        className="pinned-design-viewport"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #0d121f 0%, #060608 85%)',
          overflow: 'hidden',
          position: 'sticky',
          top: 0,
        }}
      >
        {/* Background Ambient Glows & Grid */}
        <div className="design-ambient-glow" style={{ background: '#00f2fe', opacity: 0.16, top: '15%', left: '-80px' }} />
        <div className="design-ambient-glow" style={{ background: '#25D366', opacity: 0.12, bottom: '15%', right: '-80px' }} />
        <div className="design-grid-lines" />

        {/* 35mm Viewfinder HUD Reticles */}
        <div className="cinema-viewfinder-reticle cinema-reticle-tl" />
        <div className="cinema-viewfinder-reticle cinema-reticle-tr" />
        <div className="cinema-viewfinder-reticle cinema-reticle-bl" />
        <div className="cinema-viewfinder-reticle cinema-reticle-br" />

        {/* Anamorphic Optical Flare Light Streak */}
        <div ref={flareRef} className="cinema-anamorphic-flare" style={{ '--flare-color': '#00f2fe' }}>
          <div ref={flareCoreRef} className="cinema-flare-core" />
        </div>

        {/* =========================================================
            PHASE 1: JUDUL UTAMA CINEMATIC IN -> OUT (CENTERED)
            ========================================================= */}
        <div ref={titleStageRef} className="cinematic-phase-title">
          <div className="cinema-slate-meta font-mono" style={{ marginBottom: '1.2rem' }}>
            <span className="meta-live">
              <span className="cinema-badge-dot" style={{ backgroundColor: '#00f2fe', color: '#00f2fe' }} />
              <span>REC</span>
            </span>
            <span>TC 00:03:45:18</span>
            <span>·</span>
            <span>2.39:1 CINEMASCOPE</span>
          </div>

          <div className="cinema-act-badge font-mono">
            <span className="cinema-badge-dot" style={{ backgroundColor: '#00f2fe', color: '#00f2fe' }} />
            <span>● 03 / PROJECT SHOWCASE · 05 CORE PRODUCTIONS</span>
          </div>

          <div className="cinema-headline-stage">
            <h2 className="cinema-headline font-display">
              <span className="cinema-word">
                {'PROJECT'.split('').map((c, i) => (
                  <span key={i} className="cinema-char">{c}</span>
                ))}
              </span>
              <span className="cinema-word">
                {'SHOWCASE'.split('').map((c, i) => (
                  <span key={i} className="cinema-char">{c}</span>
                ))}
              </span>
              <span className="cinema-word">
                {'LABS'.split('').map((c, i) => (
                  <span key={i} className="cinema-char">{c}</span>
                ))}
              </span>
            </h2>
          </div>

          <div className="cinema-beam-divider">
            <div className="cinema-beam-line" />
            <span className="cinema-beam-symbol font-mono">✦ ACT 03 ✦</span>
            <div className="cinema-beam-line" />
          </div>
        </div>

        {/* =========================================================
            PHASE 2: SUB-JUDUL MANIFESTO CINEMATIC IN -> OUT (CENTERED)
            ========================================================= */}
        <div ref={subStageRef} className="cinematic-phase-sub">
          <div className="cinematic-manifesto-card">
            <div className="cinematic-manifesto-badge font-mono" style={{ color: '#00f2fe' }}>
              <span className="cinema-badge-dot" style={{ backgroundColor: '#00f2fe', color: '#00f2fe' }} />
              <span>DIGITAL ARCHITECTURES // ACT 03</span>
            </div>

            <h3 className="cinematic-manifesto-text font-display">
              "FULL-STACK SAAS ENGINES, AI MEDIA AUTOMATIONS & ENTERPRISE INTERFACES."
            </h3>

            <div ref={beamRef} className="cinema-beam-divider" style={{ maxWidth: '380px', margin: '1rem auto 0 auto' }}>
              <div className="cinema-beam-line" />
              <span className="cinema-beam-symbol font-mono" style={{ fontSize: '0.7rem' }}>● SCROLL TO UNVEIL EXHIBITION ●</span>
              <div className="cinema-beam-line" />
            </div>
          </div>
        </div>

        {/* =========================================================
            PHASE 3: SHOWCASE ITSELF TRANSITION IN FROM PROJECT 1
            ========================================================= */}
        <div
          ref={showcaseStageRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '0',
            willChange: 'transform, opacity, filter',
          }}
        >
          {/* Top Cinema HUD metadata bar */}
          <div
            style={{
              width: '100%',
              padding: '0 8vw',
              marginBottom: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            <div className="cinema-slate-meta font-mono" style={{ margin: 0 }}>
              <span className="meta-live">
                <span className="cinema-badge-dot" style={{ backgroundColor: '#00f2fe', color: '#00f2fe' }} />
                <span>PROJECT SHOWCASE</span>
              </span>
              <span>05 FLAGSHIP PRODUCTIONS</span>
            </div>
            <div className="font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)' }}>
              ● SCROLL TO SCRUB TIMELINE · CLICK CARD TO INSPECT
            </div>
          </div>

          {/* Horizontal Project Track starting from Project 1 */}
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: '3rem',
              alignItems: 'center',
              width: 'max-content',
              padding: '0 8vw',
              willChange: 'transform',
            }}
          >
            {projects.map((project, idx) => {
              const isMobile = project.deviceType === 'mobile';
              return (
                <article
                  key={project.id}
                  className="project-card cinematic-deck-card"
                  style={{
                    width: 'clamp(380px, 46vw, 680px)',
                    height: 'clamp(420px, 62vh, 580px)',
                    flexShrink: 0,
                    cursor: 'pointer',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    position: 'relative',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85)',
                    transition: 'transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
                  }}
                  onClick={() => handleOpenModal(project, idx)}
                >
                  <div className="card-media-wrapper" style={{ height: '100%', position: 'relative' }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="card-media-img"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />

                    <div
                      className="card-gradient-overlay"
                      style={{
                        background: 'linear-gradient(180deg, rgba(6,6,8,0.3) 0%, rgba(6,6,8,0.15) 40%, rgba(6,6,8,0.95) 90%)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '1.8rem',
                      }}
                    >
                      {/* Top Bar: Device Badge, Counter & Highlight */}
                      <div className="card-top-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
                        <span className={`project-device-badge ${isMobile ? 'mobile' : 'laptop'}`}>
                          {isMobile ? <Smartphone size={13} /> : <Laptop size={13} />}
                          <span>{project.deviceLabel || (isMobile ? 'SMARTPHONE / MOBILE' : 'LAPTOP / WEB')}</span>
                        </span>

                        <span className="highlight-badge font-mono" style={{ color: 'var(--text-white)', borderColor: 'rgba(255,255,255,0.2)' }}>
                          {(idx + 1).toString().padStart(2, '0')} / {projects.length.toString().padStart(2, '0')}
                        </span>

                        <span className="highlight-badge font-mono" style={{ color: project.colorTheme || '#00f2fe', borderColor: project.colorTheme || '#00f2fe' }}>
                          {project.highlight}
                        </span>

                        <span className="highlight-badge font-mono">
                          {project.year}
                        </span>
                      </div>

                      {/* Bottom Bar: Title, Subtitle, GitHub link & Action Cue */}
                      <div className="card-bottom-info">
                        <div className="card-title-group">
                          <span className="font-mono" style={{ fontSize: '0.78rem', color: project.colorTheme || '#00f2fe', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                            {project.subtitle}
                          </span>
                          <h3 style={{ fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)', margin: '0.25rem 0 0.4rem 0', fontWeight: 800 }}>
                            {project.title}
                          </h3>
                          <div className="card-github-tag">
                            <GithubIcon size={14} />
                            <span>{project.githubDisplay}</span>
                          </div>
                        </div>

                        <div className="card-action-cue" style={{ marginTop: '0.8rem' }}>
                          <span>EXPLORE CASE STUDY</span>
                          <ArrowUpRight size={18} />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Quick Dock Navigator at bottom */}
          <div className="showcase-dock-nav">
            <span className="font-mono" style={{ fontSize: '0.66rem', color: 'rgba(255,255,255,0.4)', padding: '0 0.4rem' }}>
              JUMP TO:
            </span>
            {projects.map((p, idx) => (
              <button
                key={p.id}
                className="dock-pill-btn"
                onClick={() => handleJumpToProject(idx)}
                aria-label={`Jump to ${p.title}`}
              >
                <span>{`0${idx + 1}`}</span>
                <span>{p.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      {activeProject && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div
            className="modal-content-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            style={{ maxWidth: '960px' }}
          >
            {/* Modal Controls Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <div className="modal-header-tag font-mono" style={{ margin: 0 }}>
                <span className={`project-device-badge ${activeProject.deviceType === 'mobile' ? 'mobile' : 'laptop'}`} style={{ marginRight: '0.5rem' }}>
                  {activeProject.deviceType === 'mobile' ? <Smartphone size={13} /> : <Laptop size={13} />}
                  <span>{activeProject.deviceLabel}</span>
                </span>
                <span>{activeProject.category}</span>
                <span>·</span>
                <span style={{ color: activeProject.colorTheme || 'var(--accent-pink)' }}>{activeProject.highlight}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  className="lightbox-ctrl-btn"
                  onClick={handlePrevProject}
                  aria-label="Previous project"
                  style={{ width: '36px', height: '36px' }}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  className="lightbox-ctrl-btn"
                  onClick={handleNextProject}
                  aria-label="Next project"
                  style={{ width: '36px', height: '36px' }}
                >
                  <ChevronRight size={18} />
                </button>
                <button
                  className="modal-close-btn"
                  onClick={handleCloseModal}
                  aria-label="Close Modal"
                  style={{ position: 'static' }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <span className="font-mono" style={{ color: activeProject.colorTheme || '#00f2fe', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {activeProject.subtitle}
              </span>
              <h2 className="modal-title font-display" style={{ marginTop: '0.2rem' }}>{activeProject.title}</h2>
            </div>

            <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)' }}>
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="modal-hero-img"
                style={{ width: '100%', maxHeight: '440px', objectFit: 'cover' }}
              />
            </div>

            <div className="modal-body-grid" style={{ marginTop: '2rem' }}>
              <div>
                <h4 className="font-mono" style={{ color: 'var(--text-white)', marginBottom: '0.75rem' }}>
                  PROJECT OVERVIEW
                </h4>
                <p className="modal-desc-p" style={{ fontSize: '1rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.85)' }}>
                  {activeProject.description}
                </p>

                <h4 className="font-mono" style={{ color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
                  DELIVERABLES & ARCHITECTURAL SCOPE
                </h4>
                <div className="deliverables-list">
                  {activeProject.deliverables.map((item) => (
                    <span key={item} className="deliverable-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', borderLeft: '1px solid var(--border-subtle)', paddingLeft: '2rem' }}>
                <div>
                  <span className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>CLIENT / PUBLISHER</span>
                  <p style={{ fontWeight: 600, marginTop: '0.2rem' }}>{activeProject.client}</p>
                </div>

                <div>
                  <span className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>YEAR</span>
                  <p style={{ fontWeight: 600, marginTop: '0.2rem' }}>{activeProject.year}</p>
                </div>

                <div>
                  <span className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>KEY IMPACT / METRIC</span>
                  <p style={{ color: activeProject.colorTheme || 'var(--accent-red)', fontWeight: 700, fontSize: '1.3rem', marginTop: '0.2rem', fontFamily: 'var(--font-display)' }}>
                    {activeProject.metric}
                  </p>
                </div>

                {/* Direct GitHub Link Button */}
                {activeProject.github && (
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-github-action-btn"
                  >
                    <GithubIcon size={18} />
                    <span>VIEW REPOSITORY ON GITHUB</span>
                    <ExternalLink size={15} />
                  </a>
                )}

                <a
                  href={`mailto:${PORTFOLIO_DATA.email}?subject=Inquiry about ${activeProject.title}`}
                  className="explore-now-btn"
                  style={{ textAlign: 'center', justifyContent: 'center', fontSize: '0.95rem', padding: '0.75rem 1.25rem' }}
                >
                  <span>INQUIRE SIMILAR BUILD</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
