import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { CAR_POSTERS } from '../data/carShowcaseData';

gsap.registerPlugin(ScrollTrigger);

export default function CarShowcase() {
  const containerRef = useRef(null);
  const titleStageRef = useRef(null);
  const subStageRef = useRef(null);
  const flareRef = useRef(null);
  const flareCoreRef = useRef(null);
  const beamRef = useRef(null);
  const parallaxStageRef = useRef(null);

  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);
  const col4Ref = useRef(null);
  const col5Ref = useRef(null);

  // Lightbox Modal state
  const [activePoster, setActivePoster] = useState(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Open Lightbox
  const handleOpenPoster = (poster, idx) => {
    setActivePoster(poster);
    setActiveIdx(idx);
    document.body.style.overflow = 'hidden';
  };

  // Close Lightbox
  const handleClosePoster = () => {
    setActivePoster(null);
    document.body.style.overflow = '';
  };

  // Lightbox Next/Prev
  const handlePrev = (e) => {
    e?.stopPropagation();
    const nextIdx = (activeIdx - 1 + CAR_POSTERS.length) % CAR_POSTERS.length;
    setActiveIdx(nextIdx);
    setActivePoster(CAR_POSTERS[nextIdx]);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    const nextIdx = (activeIdx + 1) % CAR_POSTERS.length;
    setActiveIdx(nextIdx);
    setActivePoster(CAR_POSTERS[nextIdx]);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activePoster) return;
      if (e.key === 'Escape') handleClosePoster();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePoster, activeIdx]);

  // Master Cinematic Sequential Scrubbing
  // Strict Order:
  // 1. Judul IN -> HOLD -> OUT (100% GONE)
  // 2. Pure Void Gap
  // 3. Sub-Judul IN -> HOLD -> OUT (100% GONE)
  // 4. Pure Void Gap
  // 5. CarShowcase GRAND CINEMATIC TRANSITION IN DARI AWAL (Scale & Focus from void)
  // 6. Showcase HOLD -> PARALLAX SCRUBBING
  useEffect(() => {
    const mm = gsap.matchMedia();

    // Set baseline initial states for all viewports immediately
    gsap.set(titleStageRef.current, { autoAlpha: 0, scale: 0.85, z: -140, filter: 'blur(20px)', pointerEvents: 'none' });
    gsap.set(subStageRef.current, { autoAlpha: 0, scale: 0.88, filter: 'blur(18px)', y: 45, pointerEvents: 'none' });
    gsap.set(parallaxStageRef.current, { autoAlpha: 0, scale: 0.78, y: 80, filter: 'blur(30px)', pointerEvents: 'none' });

    mm.add('(min-width: 769px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.1,
        },
      });

      // Initial States: parallax stage is completely hidden with autoAlpha: 0 in deep blur & depth
      gsap.set(titleStageRef.current, { autoAlpha: 0, scale: 0.85, z: -140, filter: 'blur(20px)', pointerEvents: 'none' });
      gsap.set(subStageRef.current, { autoAlpha: 0, scale: 0.88, filter: 'blur(18px)', y: 45, pointerEvents: 'none' });
      gsap.set(parallaxStageRef.current, { autoAlpha: 0, scale: 0.78, y: 80, filter: 'blur(30px)', pointerEvents: 'none' });

      // Initial Column Positions (Pristine starting layout from the very top)
      gsap.set(col1Ref.current, { y: 120 });
      gsap.set(col2Ref.current, { y: -2200 });
      gsap.set(col3Ref.current, { y: 160 });
      gsap.set(col4Ref.current, { y: -2000 });
      gsap.set(col5Ref.current, { y: 100 });

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
        parallaxStageRef.current,
        { autoAlpha: 1, scale: 1, y: 0, filter: 'blur(0px)', pointerEvents: 'auto', duration: 0.10, ease: 'power3.out' },
        0.68
      );

      // Showcase Orientation Hold: 0.78 -> 0.82 (All images 100% sharp and visible)

      // 4. Parallax Columns Scrubbing (Starts ONLY after transition IN: 0.82 -> 1.00)
      if (col1Ref.current) {
        tl.to(col1Ref.current, { y: -2200, duration: 0.18, ease: 'none' }, 0.82);
      }
      if (col2Ref.current) {
        tl.to(col2Ref.current, { y: 120, duration: 0.18, ease: 'none' }, 0.82);
      }
      if (col3Ref.current) {
        tl.to(col3Ref.current, { y: -2300, duration: 0.18, ease: 'none' }, 0.82);
      }
      if (col4Ref.current) {
        tl.to(col4Ref.current, { y: 120, duration: 0.18, ease: 'none' }, 0.82);
      }
      if (col5Ref.current) {
        tl.to(col5Ref.current, { y: -2000, duration: 0.18, ease: 'none' }, 0.82);
      }
    });

    mm.add('(max-width: 768px)', () => {
      // Set explicit initial states on mobile
      gsap.set(titleStageRef.current, { autoAlpha: 0, scale: 0.85, filter: 'blur(16px)', pointerEvents: 'none' });
      gsap.set(subStageRef.current, { autoAlpha: 0, scale: 0.88, filter: 'blur(16px)', y: 35, pointerEvents: 'none' });
      gsap.set(parallaxStageRef.current, { autoAlpha: 0, scale: 0.82, y: 50, filter: 'blur(20px)', pointerEvents: 'none' });

      // Initial Column Positions on Mobile (All 3 columns start filled with posters, no empty gap)
      if (col1Ref.current) gsap.set(col1Ref.current, { y: 20 });
      if (col2Ref.current) gsap.set(col2Ref.current, { y: 50 });
      if (col3Ref.current) gsap.set(col3Ref.current, { y: 20 });

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
      tl.to(parallaxStageRef.current, { autoAlpha: 1, scale: 1, y: 0, filter: 'blur(0px)', pointerEvents: 'auto', duration: 0.10, ease: 'power2.out' }, 0.68);

      // 4. Parallax Columns Scrubbing (0.80 -> 1.00)
      if (col1Ref.current) {
        tl.to(col1Ref.current, { y: -1900, duration: 0.20, ease: 'none' }, 0.80);
      }
      if (col2Ref.current) {
        tl.to(col2Ref.current, { y: -1500, duration: 0.20, ease: 'none' }, 0.80);
      }
      if (col3Ref.current) {
        tl.to(col3Ref.current, { y: -2000, duration: 0.20, ease: 'none' }, 0.80);
      }
    });

    return () => mm.revert();
  }, []);

  // Split all 39 images across 5 columns
  const col1 = CAR_POSTERS.slice(0, 8);
  const col2 = CAR_POSTERS.slice(8, 16);
  const col3 = CAR_POSTERS.slice(16, 24);
  const col4 = CAR_POSTERS.slice(24, 32);
  const col5 = CAR_POSTERS.slice(32, 39);

  return (
    <section ref={containerRef} id="car-showcase" className="pinned-design-container" style={{ height: '700vh' }}>
      {/* Pinned Sticky Stage */}
      <div className="pinned-design-viewport">
        {/* Neutral Background Ambient Lighting - No red tint to preserve true car poster colors */}
        <div className="design-ambient-glow" style={{ background: 'rgba(255, 255, 255, 0.02)', opacity: 0.05, top: '15%', left: '-100px' }} />
        <div className="design-ambient-glow" style={{ background: 'rgba(56, 198, 209, 0.04)', opacity: 0.05, bottom: '10%', right: '-100px' }} />
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

          <div className="cinema-act-badge font-mono">
            <span className="cinema-badge-dot" style={{ backgroundColor: '#ff003c', color: '#ff003c' }} />
            <span> 01 / AUTOMOTIVE POSTER LAB · 39 ARTIFACTS</span>
          </div>

          <div className="cinema-headline-stage">
            <h2 className="cinema-headline font-display">
              <span className="cinema-word">
                {'AUTOMOTIVE'.split('').map((c, i) => (
                  <span key={i} className="cinema-char">{c}</span>
                ))}
              </span>
              <span className="cinema-word">
                {'POSTER'.split('').map((c, i) => (
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
            <span className="cinema-beam-symbol font-mono">✦ ACT 01 ✦</span>
            <div className="cinema-beam-line" />
          </div>
        </div>

        {/* =========================================================
            PHASE 2: SUB-JUDUL MANIFESTO CINEMATIC IN -> OUT (CENTERED)
            ========================================================= */}
        <div ref={subStageRef} className="cinematic-phase-sub">
          <div className="cinematic-manifesto-card">
            <div className="cinematic-manifesto-badge font-mono" style={{ color: '#ff003c' }}>
              <span className="cinema-badge-dot" style={{ backgroundColor: '#ff003c', color: '#ff003c' }} />
              <span>MOTORSPORT VISUAL LAB // ACT 01</span>
            </div>

            <h3 className="cinematic-manifesto-text font-display">
              "HIGH-OCTANE AUTOMOTIVE POSTERS AND VISUAL DISRUPTION ARCHIVE."
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
        <div
          ref={parallaxStageRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            willChange: 'transform, opacity, filter',
          }}
        >
          <div className="design-parallax-stage">
            {/* Column 1 */}
            <div ref={col1Ref} className="design-parallax-col col-1">
              {col1.map((item) => {
                const globalIdx = CAR_POSTERS.findIndex((w) => w.id === item.id);
                return (
                  <div
                    key={item.id}
                    className="design-card car-poster-card"
                    onClick={() => handleOpenPoster(item, globalIdx)}
                  >
                    <div className="design-card-img-wrap">
                      <img src={item.src} alt={item.alt || 'Automotive Poster'} loading="lazy" />
                      <div className="design-card-overlay">
                        <Maximize2 size={18} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Column 2 */}
            <div ref={col2Ref} className="design-parallax-col col-2">
              {col2.map((item) => {
                const globalIdx = CAR_POSTERS.findIndex((w) => w.id === item.id);
                return (
                  <div
                    key={item.id}
                    className="design-card car-poster-card"
                    onClick={() => handleOpenPoster(item, globalIdx)}
                  >
                    <div className="design-card-img-wrap">
                      <img src={item.src} alt={item.alt || 'Automotive Poster'} loading="lazy" />
                      <div className="design-card-overlay">
                        <Maximize2 size={18} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Column 3 */}
            <div ref={col3Ref} className="design-parallax-col col-3">
              {col3.map((item) => {
                const globalIdx = CAR_POSTERS.findIndex((w) => w.id === item.id);
                return (
                  <div
                    key={item.id}
                    className="design-card car-poster-card"
                    onClick={() => handleOpenPoster(item, globalIdx)}
                  >
                    <div className="design-card-img-wrap">
                      <img src={item.src} alt={item.alt || 'Automotive Poster'} loading="lazy" />
                      <div className="design-card-overlay">
                        <Maximize2 size={18} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Column 4 */}
            <div ref={col4Ref} className="design-parallax-col col-4">
              {col4.map((item) => {
                const globalIdx = CAR_POSTERS.findIndex((w) => w.id === item.id);
                return (
                  <div
                    key={item.id}
                    className="design-card car-poster-card"
                    onClick={() => handleOpenPoster(item, globalIdx)}
                  >
                    <div className="design-card-img-wrap">
                      <img src={item.src} alt={item.alt || 'Automotive Poster'} loading="lazy" />
                      <div className="design-card-overlay">
                        <Maximize2 size={18} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Column 5 */}
            <div ref={col5Ref} className="design-parallax-col col-5">
              {col5.map((item) => {
                const globalIdx = CAR_POSTERS.findIndex((w) => w.id === item.id);
                return (
                  <div
                    key={item.id}
                    className="design-card car-poster-card"
                    onClick={() => handleOpenPoster(item, globalIdx)}
                  >
                    <div className="design-card-img-wrap">
                      <img src={item.src} alt={item.alt || 'Automotive Poster'} loading="lazy" />
                      <div className="design-card-overlay">
                        <Maximize2 size={18} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Clean Lightbox Modal */}
      {activePoster && (
        <div className="design-lightbox-backdrop" onClick={handleClosePoster}>
          <div
            className="design-lightbox-container clean-lightbox"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lightbox-header">
              <div className="lightbox-counter font-mono">
                <span className="accent-text">{(activeIdx + 1).toString().padStart(2, '0')}</span>
                <span> / </span>
                <span>{CAR_POSTERS.length.toString().padStart(2, '0')}</span>
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
                  onClick={handleClosePoster}
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
                  src={activePoster.src}
                  alt={activePoster.alt || 'Car Poster Showcase'}
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
    </section>
  );
}
