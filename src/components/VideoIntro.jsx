import React, { useRef, useEffect, useState } from 'react';

export default function VideoIntro({ onComplete }) {
  const videoRef = useRef(null);
  const baseUrl = (import.meta.env.BASE_URL || '/').endsWith('/')
    ? (import.meta.env.BASE_URL || '/')
    : `${import.meta.env.BASE_URL}/`;
  const desktopSrc = `${baseUrl}videos/intro.mp4`;
  const mobileSrc = `${baseUrl}videos/intro-mobile.mp4`;

  const [isPortrait, setIsPortrait] = useState(false);
  const [videoSrc, setVideoSrc] = useState(desktopSrc);
  const [fitMode, setFitMode] = useState('cover');

  // Detect orientation and select optimal video
  useEffect(() => {
    const checkOrientation = () => {
      const portrait = window.matchMedia('(orientation: portrait)').matches || window.innerWidth <= 768;
      setIsPortrait(portrait);

      if (portrait) {
        // If portrait mode, prioritize portrait video file if available
        setVideoSrc(mobileSrc);
        setFitMode('cover');
      } else {
        setVideoSrc(desktopSrc);
        setFitMode('cover');
      }
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, [desktopSrc, mobileSrc]);

  // Handle fallback if intro-mobile.mp4 is not found
  const handleVideoError = () => {
    if (videoSrc === mobileSrc) {
      // Fallback to desktop intro.mp4, but use 'contain' so it won't get cropped on mobile!
      setVideoSrc(desktopSrc);
      setFitMode('contain');
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try playing with sound first; fallback to muted if browser blocks audio autoplay
    video.muted = false;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy prevented audio, play muted silently
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, [videoSrc]);

  // Keyboard shortcut: ESC to skip
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (onComplete) onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  return (
    <div
      onClick={onComplete}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: '#000000',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      title="Klik untuk lewati video"
    >
      {/* Pure Fullscreen Video without any player chrome or controls */}
      <video
        ref={videoRef}
        key={videoSrc}
        src={videoSrc}
        playsInline
        autoPlay
        onError={handleVideoError}
        onEnded={onComplete}
        style={{
          width: '100%',
          height: '100%',
          objectFit: fitMode,
          display: 'block',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
