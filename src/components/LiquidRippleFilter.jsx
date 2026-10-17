import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LiquidRippleFilter({ isActive, onRippleComplete }) {
  const dispRef = useRef(null);
  const turbRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const disp = dispRef.current;
    const turb = turbRef.current;
    if (!disp || !turb) return;

    // Reset initial scale to dramatic aquatic refraction level
    disp.setAttribute('scale', '60');

    const rippleData = { scale: 60, freqX: 0.015, freqY: 0.025 };

    // GSAP tween settling the water waves smoothly to complete calm
    const tween = gsap.to(rippleData, {
      scale: 0,
      freqX: 0.045,
      freqY: 0.065,
      duration: 2.1,
      ease: 'power2.out',
      onUpdate: () => {
        if (disp) disp.setAttribute('scale', rippleData.scale.toFixed(1));
        if (turb) {
          turb.setAttribute(
            'baseFrequency',
            `${rippleData.freqX.toFixed(4)} ${rippleData.freqY.toFixed(4)}`
          );
        }
      },
      onComplete: () => {
        if (disp) disp.setAttribute('scale', '0');
        if (onRippleComplete) onRippleComplete();
      }
    });

    return () => {
      tween.kill();
    };
  }, [isActive, onRippleComplete]);

  return (
    <>
      {/* SVG Liquid Ripple Filter Definition */}
      <svg
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: -1
        }}
        aria-hidden="true"
      >
        <defs>
          {/* Main Hero Ripple Filter */}
          <filter
            id="hero-liquid-ripple"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.015 0.025"
              numOctaves="3"
              result="rippleNoise"
            >
              <animate
                attributeName="baseFrequency"
                dur="3s"
                values="0.01 0.02; 0.025 0.045; 0.04 0.06; 0.015 0.025"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="rippleNoise"
              scale={isActive ? 60 : 0}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Alias for water-ripple ID in case referenced elsewhere */}
          <filter
            id="water-ripple"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.02"
              numOctaves="3"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="3s"
                values="0.01 0.02; 0.03 0.05; 0.015 0.02"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={isActive ? 60 : 0}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Visual Ripple Waves Caustic Ring Overlay while Rippling */}
      {isActive && (
        <div
          className="liquid-ripple-waves-overlay"
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 25,
            overflow: 'hidden'
          }}
        >
          <div className="water-ripple-ring ring-1" />
          <div className="water-ripple-ring ring-2" />
          <div className="water-ripple-ring ring-3" />
        </div>
      )}
    </>
  );
}
