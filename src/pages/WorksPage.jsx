import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CarShowcase from '../components/CarShowcase';
import ParfumeShowcase from '../components/ParfumeShowcase';
import ProjectShowcase from '../components/ProjectShowcase';

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned Cinematic Hero Intro for the Main Works Page Title
 * Vertically & Horizontally centered in 100vh viewport
 * Flow: Main Title IN -> HOLD -> OUT (100% GONE), then seamless lead into Act 01
 */
function WorksHeroCinematicIntro() {
  const containerRef = useRef(null);
  const titleStageRef = useRef(null);
  const flareRef = useRef(null);
  const flareCoreRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Set initial hidden state across all screens
    gsap.set(titleStageRef.current, {
      autoAlpha: 0,
      scale: 0.85,
      z: -140,
      filter: 'blur(20px)',
      pointerEvents: 'none',
    });

    mm.add('(min-width: 769px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.1,
        },
      });

      // Anamorphic Flare
      if (flareRef.current && flareCoreRef.current) {
        tl.fromTo(
          flareRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1.5, opacity: 1, duration: 0.16, ease: 'power3.in' },
          0.01
        );
        tl.fromTo(
          flareCoreRef.current,
          { scale: 0, x: -160 },
          { scale: 2.2, x: 160, duration: 0.20, ease: 'power2.inOut' },
          0.01
        );
        tl.to([flareRef.current, flareCoreRef.current], { opacity: 0, duration: 0.12, ease: 'power2.out' }, 0.22);
      }

      // Title IN (0.02 -> 0.24)
      tl.to(
        titleStageRef.current,
        { autoAlpha: 1, scale: 1, z: 0, filter: 'blur(0px)', duration: 0.22, ease: 'power3.out' },
        0.02
      );

      // Title HOLD (0.24 -> 0.44)

      // Title OUT (0.44 -> 0.75 - 100% GONE)
      tl.to(
        titleStageRef.current,
        { autoAlpha: 0, scale: 1.35, z: 150, filter: 'blur(30px)', duration: 0.30, ease: 'power2.in' },
        0.44
      );
    });

    mm.add('(max-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      // Mobile: Ensure strict sequential state
      gsap.set(titleStageRef.current, {
        autoAlpha: 0,
        scale: 0.85,
        filter: 'blur(15px)',
        pointerEvents: 'none',
      });

      tl.to(
        titleStageRef.current,
        { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 0.22, ease: 'power2.out' },
        0.02
      );

      tl.to(
        titleStageRef.current,
        { autoAlpha: 0, scale: 1.25, filter: 'blur(20px)', duration: 0.30, ease: 'power2.in' },
        0.45
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="pinned-design-container" style={{ height: '220vh', background: '#060608' }}>
      <div className="pinned-design-viewport" style={{ background: 'radial-gradient(circle at 50% 50%, #110f1a 0%, #060608 85%)' }}>
        {/* Ambient Glows */}
        <div className="design-ambient-glow" style={{ background: '#ff007f', opacity: 0.14, top: '20%', left: '-80px' }} />
        <div className="design-ambient-glow" style={{ background: '#8a2be2', opacity: 0.12, bottom: '15%', right: '-80px' }} />

        {/* 35mm Viewfinder Reticles */}
        <div className="cinema-viewfinder-reticle cinema-reticle-tl" />
        <div className="cinema-viewfinder-reticle cinema-reticle-tr" />
        <div className="cinema-viewfinder-reticle cinema-reticle-bl" />
        <div className="cinema-viewfinder-reticle cinema-reticle-br" />

        {/* Anamorphic Flare */}
        <div ref={flareRef} className="cinema-anamorphic-flare" style={{ '--flare-color': '#ff007f' }}>
          <div ref={flareCoreRef} className="cinema-flare-core" />
        </div>

        {/* =========================================================
            PHASE 1: JUDUL UTAMA (VERTICALLY & HORIZONTALLY CENTERED)
            ========================================================= */}
        <div ref={titleStageRef} className="cinematic-phase-title">
          <div className="cinema-slate-meta font-mono" style={{ marginBottom: '1.2rem' }}>
            <span className="meta-live">
              <span className="cinema-badge-dot" style={{ backgroundColor: '#ff007f', color: '#ff007f' }} />
              <span>MASTER REEL</span>
            </span>
            <span>TC 00:00:01:00</span>
            <span>·</span>
            <span>2.39:1 CINEMASCOPE</span>
          </div>

          <div className="cinema-act-badge font-mono">
            <span className="cinema-badge-dot" style={{ backgroundColor: '#ff007f', color: '#ff007f' }} />
            <span>● ARCHIVE 2023 — 2026 · MASTER WORKS</span>
          </div>

          <div className="cinema-headline-stage">
            <h1 className="cinema-headline font-display" style={{ fontSize: 'clamp(3rem, 7.5vw, 6.6rem)' }}>
              <span className="cinema-word">
                {'PORTFOLIO'.split('').map((c, i) => (
                  <span key={i} className="cinema-char">{c}</span>
                ))}
              </span>
              <span className="cinema-word">
                {'&'.split('').map((c, i) => (
                  <span key={i} className="cinema-char">{c}</span>
                ))}
              </span>
              <span className="cinema-word">
                {'CASE'.split('').map((c, i) => (
                  <span key={i} className="cinema-char">{c}</span>
                ))}
              </span>
              <span className="cinema-word">
                {'STUDIES'.split('').map((c, i) => (
                  <span key={i} className="cinema-char">{c}</span>
                ))}
              </span>
            </h1>
          </div>

          <div className="cinema-beam-divider">
            <div className="cinema-beam-line" />
            <span className="cinema-beam-symbol font-mono">✦ EXHIBITION ARCHIVE ✦</span>
            <div className="cinema-beam-line" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function WorksPage() {
  return (
    <div className="works-page-root">
      {/* =========================================================
          HERO ACT: MAIN WORKS PAGE TITLE (VERTICALLY CENTERED 100VH)
          Flow: Judul Utama IN -> HOLD -> OUT (100% GONE)
          ========================================================= */}
      <section className="showcase-section-breakout">
        <WorksHeroCinematicIntro />
      </section>

      {/* =========================================================
          ACT 01: AUTOMOTIVE POSTER SHOWCASE
          Flow:
          1. Judul IN -> OUT (100% GONE)
          2. Sub-Judul IN -> OUT (100% GONE)
          3. CarShowcase TRANSISI IN CINEMATIC DARI AWAL -> PARALLAX
          ========================================================= */}
      <section className="showcase-section-breakout">
        <CarShowcase />
      </section>

      {/* =========================================================
          ACT 02: PARFUME SHOWCASE
          Flow:
          1. Judul IN -> OUT (100% GONE)
          2. Sub-Judul IN -> OUT (100% GONE)
          3. Parfume Floating Flacons TRANSISI IN DARI AWAL -> DRIFT
          ========================================================= */}
      <section className="showcase-section-breakout">
        <ParfumeShowcase />
      </section>

      {/* =========================================================
          ACT 03: PROJECT SHOWCASE (CINEMATIC INTRO TRANSITION)
          Flow:
          1. Judul IN -> OUT (100% GONE)
          2. Sub-Judul IN -> OUT (100% GONE)
          3. Project Showcase TRANSISI IN DARI PROJEK PERTAMA -> SCRUB ALL 5 PROJECTS
          ========================================================= */}
      <section className="showcase-section-breakout">
        <ProjectShowcase />
      </section>
    </div>
  );
}
