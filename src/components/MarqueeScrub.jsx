import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MarqueeScrub() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        x: '-35%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="marquee-scrub-section">
      <div ref={textRef} className="marquee-scrub-track font-display">
        <span>RISE & SHINE</span>
        <span className="marquee-star">✱</span>
        <span>RISE & SHINE</span>
        <span className="marquee-star">✱</span>
        <span>RISE & SHINE</span>
        <span className="marquee-star">✱</span>
        <span>RISE & SHINE</span>
        <span className="marquee-star">✱</span>
        <span>RISE & SHINE</span>
      </div>
    </section>
  );
}
