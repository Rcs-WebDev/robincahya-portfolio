import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import ScrambleText from './ScrambleText';
import fotoCv from '../assets/robin-cutout.png';

export default function HeroSection({
  isCinemaRevealing = false,
  isRippling = false,
  startScramble = true,
  returnTrigger = 1,
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [zoomCycle, setZoomCycle] = useState(1);

  // Trigger smooth zoom in - zoom out on return (without re-scrambling text)
  useEffect(() => {
    if (returnTrigger > 1) {
      setZoomCycle((c) => c + 1);
    }
  }, [returnTrigger]);

  // Re-trigger zoom in - zoom out when user scrolls back up into HeroSection
  useEffect(() => {
    let hasScrolledAway = false;
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      if (scrollY > 400) {
        hasScrolledAway = true;
      } else if (scrollY <= 50 && hasScrolledAway) {
        hasScrolledAway = false;
        setZoomCycle((c) => c + 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatIDo = [
    'Web Developer',
    'Graphic Designer',
    'Analyst',
    'Fullstack Developer',
    'Automation Engineer',
    'Mobile Developer',
  ];

  const expertiseList = [
    'System Automation',
    'Website Design',
    'Mobile Application',
    'Software as a Service / SaaS',
    'Branding Design',
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isCinemaActive = isCinemaRevealing;

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`rcs-hero-container ${isCinemaActive ? 'hero-cinema-reveal' : ''}`}
    >
      {/* Top Header Navigation Strip (Sun Hung Exact Match) */}
      <div className="rcs-hero-top-strip">
        {/* Left Header Tag */}
        <div className="rcs-header-tag">
          <div>
            <ScrambleText text="BETTER THAN" trigger={startScramble} delay={80} />
          </div>
          <div>
            <ScrambleText text="YESTERDAY" trigger={startScramble} delay={180} />
          </div>
        </div>

        {/* Right Quote Tag */}
        <div className="rcs-quote-tag">
          <div>
            <ScrambleText text="DISCIPLINE ISN'T A MOOD" trigger={startScramble} delay={150} />
          </div>
          <div>
            <ScrambleText text="IT'S A DECISION" trigger={startScramble} delay={250} />
          </div>
        </div>
      </div>

      {/* Hero Zoom In - Zoom Out Stage: Smooth cinematic breath when returning */}
      <motion.div
        key={`hero-zoom-stage-${zoomCycle}`}
        initial={{ scale: 1 }}
        animate={
          zoomCycle > 1
            ? { scale: [1, 1.08, 1] }
            : { scale: 1 }
        }
        transition={{
          duration: 2.3,
          delay: 0.2,
          times: [0, 0.4, 1],
          ease: [0.25, 1, 0.35, 1],
        }}
        className="rcs-hero-zoom-stage"
      >
        {/* Massive 3D Embossed Carved Text Background Wall */}
        <div className="rcs-carved-bg-wall">
          <h1 className="rcs-carved-title font-syne">
            DESIGN CREATE INNOVATE
          </h1>
        </div>

        {/* Center Portrait Cutout Image Standing in Front of 3D Text */}
        <div
          className="rcs-portrait-stage"
          style={{
            transform: `perspective(1000px) rotateX(${tilt.y * 0.35}deg) rotateY(${tilt.x * 0.5}deg)`,
            transition: 'transform 0.12s ease-out',
          }}
        >
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            src={fotoCv}
            alt="Robin Cahya Suryanto"
            className="rcs-portrait-img"
          />
        </div>
      </motion.div>

      {/* Bottom Specs Overlay Section (WHAT I DO & EXPERTISE + Scroll Arrow) */}
      <div className="rcs-bottom-specs-wrapper">
        {/* Bottom Left Corner Scroll Arrow Button */}
        <div className="rcs-scroll-btn-wrapper">
          <button
            onClick={() => scrollToSection('about')}
            className="rcs-scroll-arrow-btn"
            title="Scroll Down"
            aria-label="Scroll to About section"
          >
            <ArrowDown size={18} />
          </button>
        </div>

        {/* WHAT I DO & EXPERTISE Columns Flanking Center */}
        <div className="rcs-roles-across-bar">
          {/* WHAT I DO Column (Left of center image) */}
          <div className="rcs-role-col rcs-col-left">
            <div className="rcs-role-title">
              <ScrambleText text="WHAT I DO" trigger={startScramble} delay={120} />
            </div>
            <ul className="rcs-role-list">
              {whatIDo.map((item, idx) => (
                <li key={idx}>
                  <ScrambleText
                    text={item}
                    trigger={startScramble}
                    delay={200 + idx * 90}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* EXPERTISE Column (Right of center image) */}
          <div className="rcs-role-col rcs-col-right">
            <div className="rcs-role-title">
              <ScrambleText text="EXPERTISE" trigger={startScramble} delay={220} />
            </div>
            <ul className="rcs-role-list">
              {expertiseList.map((item, idx) => (
                <li key={idx}>
                  <ScrambleText
                    text={item}
                    trigger={startScramble}
                    delay={300 + idx * 90}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
