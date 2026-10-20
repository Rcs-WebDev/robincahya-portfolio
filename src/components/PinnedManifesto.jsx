import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function PinnedManifesto() {
  const sectionRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop & Tablet Parallax Scrubbing Animation
    mm.add('(min-width: 769px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      // Card 1: Left teaching workshop photo
      tl.fromTo(
        card1Ref.current,
        { y: 350, x: -40, rotate: -6, opacity: 0.2 },
        { y: -380, x: 20, rotate: 4, opacity: 1, ease: 'none' },
        0
      );

      // Card 2: Top-center conference speaker photo
      tl.fromTo(
        card2Ref.current,
        { y: 550, scale: 0.85, opacity: 0.3 },
        { y: -260, scale: 1.05, opacity: 1, ease: 'none' },
        0.1
      );

      // Card 3: Right designer portrait photo
      tl.fromTo(
        card3Ref.current,
        { y: 480, x: 60, rotate: 6, opacity: 0.3 },
        { y: -340, x: -30, rotate: -4, opacity: 1, ease: 'none' },
        0.05
      );

      // Card 4: Bottom right blue exhibition tile
      tl.fromTo(
        card4Ref.current,
        { y: 650, x: -80, rotate: 8, opacity: 0 },
        { y: -450, x: 40, rotate: -6, opacity: 1, ease: 'none' },
        0.15
      );
    });

    // Mobile Parallax Scrubbing Animation (Exact same pinning & floating cards, mobile-proportioned)
    mm.add('(max-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      // Card 1: Left photo
      tl.fromTo(
        card1Ref.current,
        { y: 240, x: -20, rotate: -6, opacity: 0.25 },
        { y: -260, x: 15, rotate: 4, opacity: 0.95, ease: 'none' },
        0
      );

      // Card 2: Top-center photo
      tl.fromTo(
        card2Ref.current,
        { y: 320, scale: 0.82, opacity: 0.2 },
        { y: -200, scale: 1.02, opacity: 0.9, ease: 'none' },
        0.1
      );

      // Card 3: Right photo
      tl.fromTo(
        card3Ref.current,
        { y: 280, x: 25, rotate: 6, opacity: 0.25 },
        { y: -240, x: -15, rotate: -4, opacity: 0.95, ease: 'none' },
        0.05
      );

      // Card 4: Bottom exhibition tile
      tl.fromTo(
        card4Ref.current,
        { y: 360, x: -30, rotate: 7, opacity: 0.1 },
        { y: -280, x: 20, rotate: -5, opacity: 0.9, ease: 'none' },
        0.15
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={sectionRef} className="pinned-manifesto-container">
      <div className="pinned-sticky-viewport">
        {/* Floating Parallax Card 1 (Left Workshop) */}
        <div ref={card1Ref} className="floating-photo-card photo-card-left">
          <div className="photo-card-stripes-frame">
            <img src="/images/photo-workshop.jpg" alt="Teaching UIUX Design Workshop" />
          </div>
          <span className="photo-caption font-mono"> Robin WEBDEV</span>
        </div>

        {/* Floating Parallax Card 2 (Conference Speaker) */}
        <div ref={card2Ref} className="floating-photo-card photo-card-center-top">
          <div className="photo-card-stripes-frame">
            <img src="/images/photo-conference.jpg" alt="Keynote Design Speaker" />
          </div>
          <span className="photo-caption font-mono"> BEST POSTER DESIGN 2  </span>
        </div>

        {/* Floating Parallax Card 3 (Right Studio Portrait) */}
        <div ref={card3Ref} className="floating-photo-card photo-card-right">
          <div className="photo-card-stripes-frame">
            <img src="/images/hero-designer.jpg" alt="Sun Hung Head of Design" />
          </div>
          <span className="photo-caption font-mono">RCSGRAPHICSTUDIO</span>
        </div>

        {/* Floating Parallax Card 4 (Exhibition Tile) */}
        <div ref={card4Ref} className="floating-photo-card photo-card-bottom-left">
          <div className="photo-card-stripes-frame">
            <img src="/images/eye-on-design.jpg" alt="Exhibition Curation" />
          </div>
          <span className="photo-caption font-mono">BEST POSTER DESIGN 1</span>
        </div>

        {/* Pinned Colossal Headline */}
        <div className="pinned-headline-wrapper">
          <h2 className="statement-headline font-display">
            {PORTFOLIO_DATA.manifestoLines.map((line, idx) => (
              <span key={idx} className="statement-line">
                {line}
              </span>
            ))}
          </h2>

        </div>
      </div>
    </div>
  );
}
