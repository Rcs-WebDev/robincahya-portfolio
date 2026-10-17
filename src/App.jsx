import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ThreeCanvas from './components/ThreeCanvas';
import Navbar from './components/Navbar';
import IntroPreloader from './components/IntroPreloader';
import LiquidRippleFilter from './components/LiquidRippleFilter';
import PageTransition from './components/PageTransition';
import CustomCursor from './components/CustomCursor';
import FullscreenMenu from './components/FullscreenMenu';

// Home Page Sections
import HeroSection from './components/HeroSection';
import MarqueeScrub from './components/MarqueeScrub';
import PinnedManifesto from './components/PinnedManifesto';
import WorkStarburst from './components/WorkStarburst';
import CarShowcase from './components/CarShowcase';
import ParfumeShowcase from './components/ParfumeShowcase';
import ProjectShowcase from './components/ProjectShowcase';
import StatsAndClients from './components/StatsAndClients';
import FooterCTA from './components/FooterCTA';

// Dedicated Subpages
import AboutPage from './pages/AboutPage';
import WorksPage from './pages/WorksPage';
import ContactPage from './pages/ContactPage';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Intro Sequence Stages: 'curtain' -> 'ripple' -> 'scramble' -> 'done'
  const [introStage, setIntroStage] = useState('curtain');
  const [hasIntroCompleted, setHasIntroCompleted] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTitle, setTransitionTitle] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [heroReturnCount, setHeroReturnCount] = useState(1);
  const lenisRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Deterministic 3-Step Intro Sequence Orchestration
  useEffect(() => {
    if (hasIntroCompleted) return;

    // Step 1: Curtain holds for 1200ms -> triggers Step 2: Ripple at 1300ms
    const rippleTimer = setTimeout(() => {
      setIntroStage('ripple');
    }, 1300);

    // Step 2: Ripple settles after panels reveal -> triggers Step 3: Scramble text decode
    const scrambleTimer = setTimeout(() => {
      setIntroStage('scramble');
    }, 3300);

    // Step 3: Scramble completes -> intro is done
    const doneTimer = setTimeout(() => {
      setIntroStage('done');
      setHasIntroCompleted(true);
    }, 5200);

    return () => {
      clearTimeout(rippleTimer);
      clearTimeout(scrambleTimer);
      clearTimeout(doneTimer);
    };
  }, [hasIntroCompleted]);

  // Smooth Scroll Setup with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animFrame = requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(animFrame);
      lenis.destroy();
    };
  }, []);

  // Web Audio Context Synthesis for Brutalist Click/Hover Sounds
  const playSfx = (type = 'click') => {
    if (!isSoundOn) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.015, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else {
        osc.type = 'square';
        osc.frequency.setValueAtTime(160, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch (e) {
      // Audio not permitted without gesture
    }
  };

  const handleToggleSound = () => {
    const nextState = !isSoundOn;
    setIsSoundOn(nextState);
    if (nextState) {
      setTimeout(() => playSfx('click'), 50);
    }
  };

  // Seamless Page Transitions
  const handleNavigate = (pageKey, targetTitle = '') => {
    if (pageKey === currentPage) {
      if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: false });
      return;
    }

    playSfx('click');
    setTransitionTitle(targetTitle || pageKey.toUpperCase());
    setIsTransitioning(true);

    // After shutter curtain covers screen, swap page component
    setTimeout(() => {
      setCurrentPage(pageKey);
      if (pageKey === 'home') {
        setHeroReturnCount((prev) => prev + 1);
      }
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }, 600);

    // End transition shutter after curtain opens
    setTimeout(() => {
      setIsTransitioning(false);
      ScrollTrigger.refresh();
    }, 1300);
  };

  return (
    <div className="portfolio-app-root">
      {/* Intro Preloader: Step 1 - Brutalist Gate Curtain */}
      {!hasIntroCompleted && (
        <IntroPreloader
          onComplete={() => {
            setIntroStage('ripple');
            setHasIntroCompleted(true);
          }}
        />
      )}

      {/* SVG Liquid Ripple Filter: Step 2 - Fluid Wave Distortion */}
      <LiquidRippleFilter
        isActive={introStage === 'ripple'}
        onRippleComplete={() => {
          setIntroStage('scramble');
        }}
      />

      {/* Page Transition Shutter Curtain */}
      <PageTransition
        isActive={isTransitioning}
        targetTitle={transitionTitle}
      />

      {/* Film Grain Noise & Ambient Vignette */}
      <div className="noise-overlay" />
      <div className="vignette-ambient" />

      {/* WebGL Three.js Particle and Spotlight Canvas */}
      <ThreeCanvas />

      {/* Custom Precision Magnetic Cursor */}
      <CustomCursor />

      {/* Top Header Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      {/* Dynamic View Rendering */}
      <main>
        {currentPage === 'home' && (
          <>
            <HeroSection
              isRippling={introStage === 'ripple'}
              startScramble={introStage === 'scramble' || introStage === 'done' || hasIntroCompleted}
              returnTrigger={heroReturnCount}
            />
            <MarqueeScrub />
            <PinnedManifesto />
            <WorkStarburst onExplore={() => handleNavigate('works', 'SELECTED WORKS')} />
            <CarShowcase />
            <ParfumeShowcase />
            <ProjectShowcase />
            <StatsAndClients />
          </>
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'works' && (
          <WorksPage />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Mega Footer with Contact Actions */}
      <FooterCTA onNavigate={handleNavigate} />

      {/* Fullscreen Brutalist Navigation Overlay */}
      <FullscreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isSoundOn={isSoundOn}
        onToggleSound={handleToggleSound}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
