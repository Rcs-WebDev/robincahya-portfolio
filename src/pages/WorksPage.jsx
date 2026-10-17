import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import CarShowcase from '../components/CarShowcase';
import ParfumeShowcase from '../components/ParfumeShowcase';
import ProjectShowcase from '../components/ProjectShowcase';
import { PORTFOLIO_DATA } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned Cinematic Hero Intro for the Main Works Page Title
 * Vertically & Horizontally centered in 100vh viewport
 * Flow: 1. Main Title IN -> OUT (100% GONE) | 2. Sub-Title & Category Pills IN -> OUT (100% GONE)
 */
function WorksHeroCinematicIntro({ activeCategory, setActiveCategory, categories }) {
  const containerRef = useRef(null);
  const titleStageRef = useRef(null);
  const subStageRef = useRef(null);
  const flareRef = useRef(null);
  const flareCoreRef = useRef(null);
  const beamRef = useRef(null);

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

      // Initial States
      gsap.set(titleStageRef.current, { autoAlpha: 0, scale: 0.85, z: -140, filter: 'blur(20px)', pointerEvents: 'none' });
      gsap.set(subStageRef.current, { autoAlpha: 0, scale: 0.88, filter: 'blur(18px)', y: 45, pointerEvents: 'none' });

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
      // 2. SUB-JUDUL & FILTER PILLS IN -> HOLD -> OUT (0.35 -> 0.63)
      // (Pure Void Gap: 0.30 -> 0.35)
      // =========================================================
      // Sub-Judul IN (0.35 -> 0.47)
      tl.to(
        subStageRef.current,
        { autoAlpha: 1, scale: 1, filter: 'blur(0px)', y: 0, pointerEvents: 'auto', duration: 0.12, ease: 'power3.out' },
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
        { autoAlpha: 0, scale: 0.88, filter: 'blur(25px)', y: -45, pointerEvents: 'none', duration: 0.10, ease: 'power2.in' },
        0.53
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

      tl.to(titleStageRef.current, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 0.12 }, 0.02);
      tl.to(titleStageRef.current, { autoAlpha: 0, scale: 1.25, filter: 'blur(20px)', duration: 0.10 }, 0.20);
      tl.to(subStageRef.current, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', pointerEvents: 'auto', duration: 0.12 }, 0.35);
      tl.to(subStageRef.current, { autoAlpha: 0, scale: 0.9, filter: 'blur(20px)', pointerEvents: 'none', duration: 0.10 }, 0.53);
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="pinned-design-container" style={{ height: '360vh', background: '#060608' }}>
      <div className="pinned-design-viewport" style={{ background: 'radial-gradient(circle at 50% 50%, #110f1a 0%, #060608 85%)' }}>
        {/* Ambient Glows */}
        <div className="design-ambient-glow" style={{ background: '#ff007f', opacity: 0.18, top: '20%', left: '-80px' }} />
        <div className="design-ambient-glow" style={{ background: '#8a2be2', opacity: 0.15, bottom: '15%', right: '-80px' }} />

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

        {/* =========================================================
            PHASE 2: SUB-JUDUL & CATEGORY PILLS (CENTERED)
            ========================================================= */}
        <div ref={subStageRef} className="cinematic-phase-sub">
          <div className="cinematic-manifesto-card" style={{ maxWidth: '920px' }}>
            <div className="cinematic-manifesto-badge font-mono" style={{ color: '#ff007f' }}>
              <span className="cinema-badge-dot" style={{ backgroundColor: '#ff007f', color: '#ff007f' }} />
              <span>DIGITAL ARCHITECTURES // STATEMENT</span>
            </div>

            <h3 className="cinematic-manifesto-text font-display" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.4rem)' }}>
              "DIGITAL ARCHITECTURES CRAFTED WITH OBSESSIVE ATTENTION TO DETAIL AND KINETIC ENERGY."
            </h3>

            {/* Centered Filter Pills */}
            <div className="category-filter-bar" style={{ justifyContent: 'center', marginTop: '1.8rem', pointerEvents: 'auto' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-pill font-mono ${activeCategory === cat ? 'filter-active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div ref={beamRef} className="cinema-beam-divider" style={{ maxWidth: '420px', margin: '1.5rem auto 0 auto' }}>
              <div className="cinema-beam-line" />
              <span className="cinema-beam-symbol font-mono" style={{ fontSize: '0.7rem' }}>● SCROLL DOWN TO EXPLORE ACTS ●</span>
              <div className="cinema-beam-line" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function WorksPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const categories = ['ALL', 'TECHNOLOGY', 'EDITORIAL', 'HARDWARE & IOT', 'LOGISTICS'];

  return (
    <div className="works-page-root">
      {/* =========================================================
          HERO ACT: MAIN WORKS PAGE TITLE (VERTICALLY CENTERED 100VH)
          Flow:
          1. Judul Utama IN -> OUT (100% GONE)
          2. Sub-Judul & Filter Pills IN -> OUT (100% GONE)
          ========================================================= */}
      <section className="showcase-section-breakout">
        <WorksHeroCinematicIntro
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
        />
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
