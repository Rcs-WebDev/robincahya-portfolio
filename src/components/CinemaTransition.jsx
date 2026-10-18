import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CinemaTransition({
  isActive,
  onCinemaComplete,
}) {
  const containerRef = useRef(null);
  const flareRef = useRef(null);
  const flareCoreRef = useRef(null);
  const titleStageRef = useRef(null);
  const beamRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onCinemaComplete) {
            onCinemaComplete();
          }
        },
      });

      // Set initial states
      gsap.set(titleStageRef.current, {
        autoAlpha: 0,
        scale: 0.82,
        z: -120,
        filter: 'blur(22px)',
      });

      if (flareRef.current && flareCoreRef.current) {
        gsap.set(flareRef.current, { scaleX: 0, opacity: 0 });
        gsap.set(flareCoreRef.current, { scale: 0, x: -160 });
      }

      // 1. Anamorphic Optical Flare Light Streak (0.0s -> 0.45s)
      if (flareRef.current && flareCoreRef.current) {
        tl.to(flareRef.current, {
          scaleX: 1.5,
          opacity: 1,
          duration: 0.35,
          ease: 'power3.in',
        }, 0.05);

        tl.to(flareCoreRef.current, {
          scale: 2.2,
          x: 160,
          duration: 0.4,
          ease: 'power2.inOut',
        }, 0.05);

        tl.to([flareRef.current, flareCoreRef.current], {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out',
        }, 0.42);
      }

      // 2. Judul Cinematic IN (0.15s -> 0.85s)
      tl.to(titleStageRef.current, {
        autoAlpha: 1,
        scale: 1,
        z: 0,
        filter: 'blur(0px)',
        duration: 0.7,
        ease: 'power3.out',
      }, 0.15);

      if (beamRef.current) {
        tl.fromTo(beamRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power2.out' },
          0.35
        );
      }

      // 3. Judul HOLD sejenak (0.85s -> 1.25s)

      // 4. Judul OUT: Zoom through void (1.25s -> 1.75s)
      tl.to(titleStageRef.current, {
        autoAlpha: 0,
        scale: 1.35,
        z: 140,
        filter: 'blur(28px)',
        duration: 0.5,
        ease: 'power2.in',
      }, 1.25);

      // 5. Fade out transition backdrop to reveal Homepage smoothly (1.6s -> 2.1s)
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      }, 1.6);

    }, containerRef);

    return () => ctx.revert();
  }, [isActive, onCinemaComplete]);

  if (!isActive) return null;

  const words = ['ROBIN', 'CAHYA', 'SURYANTO'];

  return (
    <div
      ref={containerRef}
      className="car-showcase-transition-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99998,
        background: 'radial-gradient(circle at 50% 50%, #0e0d16 0%, #060608 85%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1400px',
        transformStyle: 'preserve-3d',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Ambient Lighting & Grid */}
      <div
        className="design-ambient-glow"
        style={{
          position: 'absolute',
          background: 'rgba(56, 198, 209, 0.08)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          filter: 'blur(140px)',
          top: '20%',
          left: '10%',
          pointerEvents: 'none',
        }}
      />
      <div
        className="design-ambient-glow"
        style={{
          position: 'absolute',
          background: 'rgba(255, 0, 127, 0.06)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          filter: 'blur(160px)',
          bottom: '15%',
          right: '10%',
          pointerEvents: 'none',
        }}
      />
      <div className="design-grid-lines" />

      {/* 35mm Viewfinder HUD Reticles */}
      <div className="cinema-viewfinder-reticle cinema-reticle-tl" />
      <div className="cinema-viewfinder-reticle cinema-reticle-tr" />
      <div className="cinema-viewfinder-reticle cinema-reticle-bl" />
      <div className="cinema-viewfinder-reticle cinema-reticle-br" />

      {/* Anamorphic Optical Flare Light Streak */}
      <div
        ref={flareRef}
        className="cinema-anamorphic-flare"
        style={{ '--flare-color': '#00f2fe' }}
      >
        <div ref={flareCoreRef} className="cinema-flare-core" />
      </div>

      {/* Phase 1: Judul Utama Cinematic */}
      <div
        ref={titleStageRef}
        className="cinematic-phase-title"
        style={{
          opacity: 0,
          visibility: 'visible',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="cinema-act-badge font-mono">
          <span
            className="cinema-badge-dot"
            style={{ backgroundColor: '#00f2fe', color: '#00f2fe' }}
          />
          <span> PORTFOLIO </span>
        </div>

        <div className="cinema-headline-stage">
          <h1 className="cinema-headline font-display">
            {words.map((word, wIdx) => (
              <span key={wIdx} className="cinema-word">
                {word.split('').map((char, cIdx) => (
                  <span key={cIdx} className="cinema-char">
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>
        </div>

        <div ref={beamRef} className="cinema-beam-divider">
          <div className="cinema-beam-line" />
          <span className="cinema-beam-symbol font-mono">
            ✦ CREATIVE DEVELOPER & DESIGNER ✦
          </span>
          <div className="cinema-beam-line" />
        </div>
      </div>
    </div>
  );
}
