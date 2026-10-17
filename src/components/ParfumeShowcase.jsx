import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { PARFUME_WORKS } from '../data/parfumeData';

gsap.registerPlugin(ScrollTrigger);

export default function ParfumeShowcase() {
  const sectionRef = useRef(null);
  const titleStageRef = useRef(null);
  const subStageRef = useRef(null);
  const flareRef = useRef(null);
  const flareCoreRef = useRef(null);
  const beamRef = useRef(null);
  const cardsStageRef = useRef(null);

  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);
  const card5Ref = useRef(null);

  // Lightbox Modal state
  const [activeItem, setActiveItem] = useState(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const handleOpenModal = (item, idx) => {
    setActiveItem(item);
    setActiveIdx(idx);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setActiveItem(null);
    document.body.style.overflow = '';
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    const nextIdx = (activeIdx - 1 + PARFUME_WORKS.length) % PARFUME_WORKS.length;
    setActiveIdx(nextIdx);
    setActiveItem(PARFUME_WORKS[nextIdx]);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    const nextIdx = (activeIdx + 1) % PARFUME_WORKS.length;
    setActiveIdx(nextIdx);
    setActiveItem(PARFUME_WORKS[nextIdx]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeItem) return;
      if (e.key === 'Escape') handleCloseModal();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem, activeIdx]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop & Tablet Sequential Scrubbing Animation
    mm.add('(min-width: 769px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.1,
        },
      });

      // Initial states: cards stage is completely hidden with autoAlpha: 0 and starts at initial floating coords
      gsap.set(titleStageRef.current, { autoAlpha: 0, scale: 0.85, z: -140, filter: 'blur(20px)', pointerEvents: 'none' });
      gsap.set(subStageRef.current, { autoAlpha: 0, scale: 0.88, filter: 'blur(18px)', y: 45, pointerEvents: 'none' });
      gsap.set(cardsStageRef.current, { autoAlpha: 0, scale: 0.78, y: 80, filter: 'blur(30px)', pointerEvents: 'none' });

      // Initial Card Positions (Pristine luxury constellation layout)
      gsap.set(card1Ref.current, { y: 360, x: -50, rotate: -8, opacity: 0.3 });
      gsap.set(card2Ref.current, { y: 420, x: 60, rotate: 7, opacity: 0.3 });
      gsap.set(card3Ref.current, { y: 540, scale: 0.88, opacity: 0.35 });
      gsap.set(card4Ref.current, { y: 600, x: -70, rotate: 9, opacity: 0.2 });
      gsap.set(card5Ref.current, { y: 480, x: 50, rotate: -6, opacity: 0.3 });

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
      // 3. SHOWCASE GRAND CINEMATIC TRANSITION IN (0.68 -> 0.78)
      // (Pure Void Gap: 0.63 -> 0.68 ensures sub-title & blur are 100% GONE)
      // =========================================================
      tl.to(
        cardsStageRef.current,
        { autoAlpha: 1, scale: 1, y: 0, filter: 'blur(0px)', pointerEvents: 'auto', duration: 0.10, ease: 'power3.out' },
        0.68
      );

      // Showcase Orientation Hold: 0.78 -> 0.82

      // 4. Floating Cards Parallax (Starts ONLY after transition IN: 0.82 -> 1.00)
      if (card1Ref.current) {
        tl.to(card1Ref.current, { y: -390, x: 25, rotate: 5, opacity: 1, duration: 0.18, ease: 'none' }, 0.82);
      }
      if (card2Ref.current) {
        tl.to(card2Ref.current, { y: -340, x: -30, rotate: -4, opacity: 1, duration: 0.18, ease: 'none' }, 0.82);
      }
      if (card3Ref.current) {
        tl.to(card3Ref.current, { y: -290, scale: 1.06, opacity: 1, duration: 0.18, ease: 'none' }, 0.82);
      }
      if (card4Ref.current) {
        tl.to(card4Ref.current, { y: -440, x: 40, rotate: -6, opacity: 1, duration: 0.18, ease: 'none' }, 0.82);
      }
      if (card5Ref.current) {
        tl.to(card5Ref.current, { y: -360, x: -20, rotate: 6, opacity: 1, duration: 0.18, ease: 'none' }, 0.82);
      }
    });

    mm.add('(max-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      // 1. Judul IN -> OUT
      tl.to(titleStageRef.current, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 0.12 }, 0.02);
      tl.to(titleStageRef.current, { autoAlpha: 0, scale: 1.25, filter: 'blur(20px)', duration: 0.10 }, 0.20);

      // 2. Sub-Judul IN -> OUT
      tl.to(subStageRef.current, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 0.12 }, 0.35);
      tl.to(subStageRef.current, { autoAlpha: 0, scale: 0.9, filter: 'blur(20px)', duration: 0.10 }, 0.53);

      // 3. Showcase Cards Grand Transition IN
      tl.to(cardsStageRef.current, { autoAlpha: 1, scale: 1, y: 0, filter: 'blur(0px)', pointerEvents: 'auto', duration: 0.10 }, 0.68);

      if (card1Ref.current) {
        tl.to(card1Ref.current, { y: -260, x: 15, rotate: 4, opacity: 0.95, duration: 0.18, ease: 'none' }, 0.82);
      }
      if (card2Ref.current) {
        tl.to(card2Ref.current, { y: -240, x: -15, rotate: -4, opacity: 0.95, duration: 0.18, ease: 'none' }, 0.82);
      }
      if (card3Ref.current) {
        tl.to(card3Ref.current, { y: -220, scale: 1.02, opacity: 0.9, duration: 0.18, ease: 'none' }, 0.82);
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={sectionRef} id="parfume-showcase" className="pinned-parfume-container" style={{ height: '700vh' }}>
      <div className="parfume-sticky-viewport">
        {/* Luxury Background Glows & Ambience */}
        <div className="parfume-ambient-glow glow-gold" />
        <div className="parfume-ambient-glow glow-rose" />
        <div className="parfume-grid-lines" />

        {/* 35mm Viewfinder HUD Reticles */}
        <div className="cinema-viewfinder-reticle cinema-reticle-tl" />
        <div className="cinema-viewfinder-reticle cinema-reticle-tr" />
        <div className="cinema-viewfinder-reticle cinema-reticle-bl" />
        <div className="cinema-viewfinder-reticle cinema-reticle-br" />

        {/* Anamorphic Optical Flare Light Streak */}
        <div ref={flareRef} className="cinema-anamorphic-flare" style={{ '--flare-color': '#ffd700' }}>
          <div ref={flareCoreRef} className="cinema-flare-core" />
        </div>

        {/* =========================================================
            PHASE 1: JUDUL UTAMA CINEMATIC IN -> OUT (CENTERED)
            ========================================================= */}
        <div ref={titleStageRef} className="cinematic-phase-title">
          <div className="cinema-slate-meta font-mono" style={{ marginBottom: '1.2rem' }}>
            <span className="meta-live">
              <span className="cinema-badge-dot" style={{ backgroundColor: '#ffd700', color: '#ffd700' }} />
              <span>REC</span>
            </span>
            <span>TC 00:02:45:08</span>
            <span>·</span>
            <span>2.39:1 ANAMORPHIC</span>
          </div>

          <div className="cinema-act-badge font-mono">
            <span className="cinema-badge-dot" style={{ backgroundColor: '#ffd700', color: '#ffd700' }} />
            <span>● 02 / OLFACTORY LAB · HAUTE PARFUMERIE</span>
          </div>

          <div className="cinema-headline-stage">
            <h2 className="cinema-headline font-display">
              <span className="cinema-word">
                {'PARFUME'.split('').map((c, i) => (
                  <span key={i} className="cinema-char">{c}</span>
                ))}
              </span>
              <span className="cinema-word">
                {'SHOWCASE'.split('').map((c, i) => (
                  <span key={i} className="cinema-char">{c}</span>
                ))}
              </span>
            </h2>
          </div>

          <div className="cinema-beam-divider">
            <div className="cinema-beam-line" />
            <span className="cinema-beam-symbol font-mono">✦ ACT 02 ✦</span>
            <div className="cinema-beam-line" />
          </div>
        </div>

        {/* =========================================================
            PHASE 2: SUB-JUDUL MANIFESTO CINEMATIC IN -> OUT (CENTERED)
            ========================================================= */}
        <div ref={subStageRef} className="cinematic-phase-sub">
          <div className="cinematic-manifesto-card">
            <div className="cinematic-manifesto-badge font-mono" style={{ color: '#ffd700' }}>
              <span className="cinema-badge-dot" style={{ backgroundColor: '#ffd700', color: '#ffd700' }} />
              <span>HAUTE PARFUMERIE // ACT 02</span>
            </div>

            <h3 className="cinematic-manifesto-text font-display">
              "SCULPTING ESSENCE INTO VISUAL AURA — ARTISANAL BESPOKE FLACONS."
            </h3>

            <div ref={beamRef} className="cinema-beam-divider" style={{ maxWidth: '380px', margin: '1rem auto 0 auto' }}>
              <div className="cinema-beam-line" />
              <span className="cinema-beam-symbol font-mono" style={{ fontSize: '0.7rem' }}>● SCROLL TO UNVEIL EXHIBITION ●</span>
              <div className="cinema-beam-line" />
            </div>
          </div>
        </div>

        {/* =========================================================
            PHASE 3: SHOWCASE ITSELF TRANSITION IN FROM BEGINNING
            ========================================================= */}
        <div ref={cardsStageRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, pointerEvents: 'auto', willChange: 'transform, opacity, filter' }}>
          {/* Top Cinema HUD metadata bar */}
          <div
            style={{
              position: 'absolute',
              top: '2.5rem',
              left: '8vw',
              right: '8vw',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            <div className="cinema-slate-meta font-mono" style={{ margin: 0 }}>
              <span className="meta-live">
                <span className="cinema-badge-dot" style={{ backgroundColor: '#ffd700', color: '#ffd700' }} />
                <span>HAUTE PARFUMERIE</span>
              </span>
              <span>05 LUXURY FLACON COMPOSITIONS</span>
            </div>
            <div className="font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)' }}>
              ● SCROLL TO FLOAT · CLICK FLACON TO EXPAND
            </div>
          </div>
          {/* Floating Parallax Card 1 (Top-Left) */}
          <div
            ref={card1Ref}
            className="floating-parfume-card parfume-card-top-left"
            onClick={() => handleOpenModal(PARFUME_WORKS[0], 0)}
          >
            <div className="parfume-card-frame">
              <img src={PARFUME_WORKS[0]?.src} alt="Parfume Showcase 1" loading="lazy" />
              <div className="parfume-card-overlay">
                <Maximize2 size={16} />
              </div>
            </div>
            <span className="parfume-caption font-mono">EDITION 01 / OBSCUR</span>
          </div>

          {/* Floating Parallax Card 2 (Top-Right) */}
          <div
            ref={card2Ref}
            className="floating-parfume-card parfume-card-top-right"
            onClick={() => handleOpenModal(PARFUME_WORKS[1], 1)}
          >
            <div className="parfume-card-frame">
              <img src={PARFUME_WORKS[1]?.src} alt="Parfume Showcase 2" loading="lazy" />
              <div className="parfume-card-overlay">
                <Maximize2 size={16} />
              </div>
            </div>
            <span className="parfume-caption font-mono">EDITION 02 / SOLARIS</span>
          </div>

          {/* Floating Parallax Card 3 (Center) */}
          <div
            ref={card3Ref}
            className="floating-parfume-card parfume-card-center"
            onClick={() => handleOpenModal(PARFUME_WORKS[2], 2)}
          >
            <div className="parfume-card-frame">
              <img src={PARFUME_WORKS[2]?.src} alt="Parfume Showcase 3" loading="lazy" />
              <div className="parfume-card-overlay">
                <Maximize2 size={16} />
              </div>
            </div>
            <span className="parfume-caption font-mono">EDITION 03 / AETHER</span>
          </div>

          {/* Floating Parallax Card 4 (Bottom-Left) */}
          <div
            ref={card4Ref}
            className="floating-parfume-card parfume-card-bottom-left"
            onClick={() => handleOpenModal(PARFUME_WORKS[3], 3)}
          >
            <div className="parfume-card-frame">
              <img src={PARFUME_WORKS[3]?.src} alt="Parfume Showcase 4" loading="lazy" />
              <div className="parfume-card-overlay">
                <Maximize2 size={16} />
              </div>
            </div>
            <span className="parfume-caption font-mono">EDITION 04 / FLORA</span>
          </div>

          {/* Floating Parallax Card 5 (Bottom-Right) */}
          <div
            ref={card5Ref}
            className="floating-parfume-card parfume-card-bottom-right"
            onClick={() => handleOpenModal(PARFUME_WORKS[4], 4)}
          >
            <div className="parfume-card-frame">
              <img src={PARFUME_WORKS[4]?.src} alt="Parfume Showcase 5" loading="lazy" />
              <div className="parfume-card-overlay">
                <Maximize2 size={16} />
              </div>
            </div>
            <span className="parfume-caption font-mono">EDITION 05 / ECLIPSE</span>
          </div>
        </div>
      </div>

      {/* Clean Lightbox Modal */}
      {activeItem && (
        <div className="design-lightbox-backdrop" onClick={handleCloseModal}>
          <div
            className="design-lightbox-container clean-lightbox"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lightbox-header">
              <div className="lightbox-counter font-mono">
                <span className="accent-text">{(activeIdx + 1).toString().padStart(2, '0')}</span>
                <span> / </span>
                <span>{PARFUME_WORKS.length.toString().padStart(2, '0')}</span>
                <span className="lightbox-tag font-mono">{activeItem.title}</span>
              </div>

              <div className="lightbox-actions">
                <button
                  className="lightbox-ctrl-btn"
                  onClick={handlePrev}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  className="lightbox-ctrl-btn"
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
                <button
                  className="lightbox-ctrl-btn close-btn"
                  onClick={handleCloseModal}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="lightbox-body">
              <button className="lightbox-nav-arrow left" onClick={handlePrev}>
                <ChevronLeft size={32} />
              </button>

              <div className="lightbox-image-wrap">
                <img
                  src={activeItem.src}
                  alt={activeItem.title}
                  className="lightbox-image"
                />
              </div>

              <button className="lightbox-nav-arrow right" onClick={handleNext}>
                <ChevronRight size={32} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
