import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WorkStarburst({ onExplore }) {
  const containerRef = useRef(null);
  const starburstRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Rotate starburst based on scroll position with smooth scrub
      gsap.to(starburstRef.current, {
        rotation: 180,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleExplore = () => {
    if (onExplore) {
      onExplore();
    } else {
      const worksList = document.getElementById('work-list');
      if (worksList) {
        worksList.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Generate 18 radial polygon rays
  const numRays = 18;
  const rays = Array.from({ length: numRays }).map((_, i) => {
    const angle1 = (i * 360) / numRays;
    const angle2 = ((i + 0.5) * 360) / numRays;
    return (
      <path
        key={i}
        d={`M 600 600 L ${600 + 900 * Math.cos((angle1 * Math.PI) / 180)} ${
          600 + 900 * Math.sin((angle1 * Math.PI) / 180)
        } L ${600 + 900 * Math.cos((angle2 * Math.PI) / 180)} ${
          600 + 900 * Math.sin((angle2 * Math.PI) / 180)
        } Z`}
        fill={i % 2 === 0 ? '#ff007f' : '#070708'}
      />
    );
  });

  return (
    <section ref={containerRef} id="work" className="work-transition-section">
      {/* Dynamic Animated Starburst SVG with ScrollTrigger Scrub */}
      <div ref={starburstRef} className="starburst-container">
        <svg
          viewBox="0 0 1200 1200"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          {rays}
        </svg>
      </div>

      {/* Centerpiece Content */}
      <div className="starburst-center-content">
        <h2 className="work-giant-title">WORK</h2>

        <p className="work-subtitle-banner">
          EXPLORE A COLLECTION OF HIGH-QUALITY, INNOVATIVE DESIGNS CRAFTED TO ELEVATE BRANDS AND CAPTIVATE AUDIENCES. EACH PROJECT REFLECTS OUR COMMITMENT TO CREATIVITY AND EXCELLENCE.
        </p>

        <button
          className="explore-now-btn"
          onClick={handleExplore}
          aria-label="Explore Projects"
        >
          <span className="btn-arrow-box">
            <ArrowRight size={22} />
          </span>
          <span>EXPLORE NOW</span>
        </button>
      </div>
    </section>
  );
}
