import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import ScrambleText from './ScrambleText';

function StatCard({ stat, index, inView }) {
  const [hoverCount, setHoverCount] = useState(0);
  const isHovered = hoverCount > 0;

  return (
    <div
      className="stat-item"
      onMouseEnter={() => setHoverCount((c) => c + 1)}
      style={{ cursor: 'pointer' }}
    >
      <div className="stat-number">
        <ScrambleText
          key={`val-${hoverCount}`}
          text={stat.value}
          trigger={inView}
          delay={isHovered ? 0 : index * 140}
          speed={28}
        />
      </div>
      <div className="stat-label">
        <ScrambleText
          key={`lbl-${hoverCount}`}
          text={stat.label}
          trigger={inView}
          delay={isHovered ? 60 : index * 140 + 100}
          speed={24}
        />
      </div>
      <div className="stat-detail font-mono">
        <ScrambleText
          key={`dtl-${hoverCount}`}
          text={stat.detail}
          trigger={inView}
          delay={isHovered ? 120 : index * 140 + 180}
          speed={18}
        />
      </div>
    </div>
  );
}

// Master Tech Stack & Creative Skills Data
const TECH_STACK_ITEMS = [
  {
    name: 'React.js',
    role: 'Frontend Framework',
    color: '#61DAFB',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="1.6">
        <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
      </svg>
    )
  },
  {
    name: 'Node.js',
    role: 'Backend Automation',
    color: '#539E43',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" stroke="#539E43" strokeWidth="1.8" strokeLinejoin="round" fill="rgba(83, 158, 67, 0.15)" />
        <path d="M12 7V17M12 12L17 9.5M12 12L7 9.5" stroke="#539E43" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: 'JavaScript',
    role: 'Core Language',
    color: '#F7DF1E',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#F7DF1E" />
        <path d="M7 16.5C7.5 17.5 8.5 18 9.5 18C10.8 18 11.5 17.2 11.5 15.5V9H10V15.3C10 16 9.7 16.5 9 16.5C8.3 16.5 8 16 7.8 15.5L7 16.5ZM13.5 16.2C14 17.4 15.2 18 16.5 18C18 18 19 17.2 19 15.8C19 14.5 18 13.9 16.8 13.4L16.2 13.1C15.5 12.8 15 12.4 15 11.7C15 11 15.6 10.5 16.5 10.5C17.3 10.5 17.8 10.9 18.2 11.6L19.2 10.9C18.6 9.8 17.7 9.2 16.5 9.2C15 9.2 13.8 10.1 13.8 11.7C13.8 13 14.7 13.7 15.8 14.1L16.4 14.4C17.2 14.7 17.8 15.1 17.8 15.9C17.8 16.7 17.2 17.2 16.4 17.2C15.4 17.2 14.7 16.6 14.3 15.7L13.5 16.2Z" fill="#000000" />
      </svg>
    )
  },
  {
    name: 'Vue.js',
    role: 'Frontend Reactive',
    color: '#42B883',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M2 3H6.5L12 12.5L17.5 3H22L12 21L2 3Z" fill="#42B883" />
        <path d="M6 3H9.5L12 7.5L14.5 3H18L12 14L6 3Z" fill="#35495E" />
      </svg>
    )
  },
  {
    name: 'Dart',
    role: 'Mobile Architecture',
    color: '#00B4AB',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 4L11 4L19 12L12 19L4 19L4 4Z" fill="#00B4AB" />
        <path d="M12 4L20 12L12 20L8 16L16 8L12 4Z" fill="#0175C2" />
        <path d="M4 12L12 20L4 20L4 12Z" fill="#01579B" />
      </svg>
    )
  },
  {
    name: 'Flutter',
    role: 'Cross-Platform App',
    color: '#02569B',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M13.5 2L5 10.5L7.5 13L18.5 2H13.5Z" fill="#54C5F8" />
        <path d="M13.5 12L8.5 17L13.5 22H18.5L13.5 17L18.5 12H13.5Z" fill="#02569B" />
        <path d="M11 14.5L8.5 17L11 19.5L13.5 17L11 14.5Z" fill="#01579B" />
      </svg>
    )
  },
  {
    name: 'Adobe Photoshop',
    role: 'Poster & Visual Design',
    color: '#31A8FF',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" fill="#001E36" stroke="#31A8FF" strokeWidth="1.6" />
        <text x="5.5" y="16.5" fill="#31A8FF" fontSize="12" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif">Ps</text>
      </svg>
    )
  },
  {
    name: 'Adobe Illustrator',
    role: 'Vector & Identity',
    color: '#FF9A00',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" fill="#330000" stroke="#FF9A00" strokeWidth="1.6" />
        <text x="6" y="16.5" fill="#FF9A00" fontSize="12" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif">Ai</text>
      </svg>
    )
  },
  {
    name: 'CapCut',
    role: 'Reels & Video Editing',
    color: '#00F2FE',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" fill="#0c0e14" stroke="#00F2FE" strokeWidth="1.6" />
        <path d="M6.5 7.5L11.5 12L6.5 16.5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17.5 7.5L12.5 12L17.5 16.5" stroke="#00F2FE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    name: 'Canva',
    role: 'Content & Visuals',
    color: '#00C4CC',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="url(#canvaGradLoop)" />
        <defs>
          <linearGradient id="canvaGradLoop" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00C4CC" />
            <stop offset="1" stopColor="#7D2AE8" />
          </linearGradient>
        </defs>
        <path d="M15 9.5C14.2 8.2 13 8 12 8C9.5 8 7.8 9.8 7.8 12.5C7.8 15.2 9.5 16.5 12 16.5C13.2 16.5 14.4 15.8 15.2 14.5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: 'Three.js',
    role: '3D WebGL Worlds',
    color: '#FFFFFF',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.6">
        <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" />
        <path d="M12 2V12M12 12L21 7M12 12L3 7M12 12V22M12 12L21 17M12 12L3 17" />
      </svg>
    )
  },
  {
    name: 'GSAP',
    role: 'Cinematic Animation',
    color: '#88CE02',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" fill="#0d1406" stroke="#88CE02" strokeWidth="1.6" />
        <path d="M15.5 8.5C14.6 7.5 13.4 7 12 7C9.2 7 7 9.2 7 12C7 14.8 9.2 17 12 17C14.5 17 16.2 15.5 16.5 13.2H12V11.2H18.5C18.7 15.8 15.5 19 12 19C8.1 19 5 15.9 5 12C5 8.1 8.1 5 12 5C14 5 16 5.8 17.5 7.2L15.5 8.5Z" fill="#88CE02" />
      </svg>
    )
  },
  {
    name: 'Tailwind CSS',
    role: 'Utility Styling',
    color: '#38BDF8',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6 9C7.5 6 10 5.5 12 7C13.5 8.2 14.5 9 16.5 9C18.5 9 20 7.8 21 6C19.5 9 17 9.5 15 8C13.5 6.8 12.5 6 10.5 6C8.5 6 7 7.2 6 9ZM3 15C4.5 12 7 11.5 9 13C10.5 14.2 11.5 15 13.5 15C15.5 15 17 13.8 18 12C16.5 15 14 15.5 12 14C10.5 12.8 9.5 12 7.5 12C5.5 12 4 13.2 3 15Z" fill="#38BDF8" />
      </svg>
    )
  },
  {
    name: 'HTML5 & CSS3',
    role: 'Modern Web Standard',
    color: '#E44D26',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 2L5.8 19.5L12 21.5L18.2 19.5L20 2H4Z" fill="#E44D26" />
        <path d="M12 3.8V19.6L16.6 18.2L18.1 3.8H12Z" fill="#F16529" />
        <path d="M7.5 7H16.5L16.2 9.5H10.5L10.8 12.5H15.8L15.4 16.5L12 17.5L8.6 16.5L8.4 14.2H10.3L10.5 15.3L12 15.8L13.5 15.3L13.7 13.8H7.2L7.5 7Z" fill="#FFFFFF" />
      </svg>
    )
  }
];

export default function StatsAndClients() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Duplicate tech stack items array for smooth, infinite marquee loop
  const marqueeItems = [...TECH_STACK_ITEMS, ...TECH_STACK_ITEMS];

  return (
    <section ref={sectionRef} className="stats-section">
      {/* 3-Column Metric Numbers with Scramble Animation (Centered on Desktop) */}
      <div className="stats-grid">
        {PORTFOLIO_DATA.stats.map((stat, idx) => (
          <StatCard
            key={idx}
            stat={stat}
            index={idx}
            inView={inView}
          />
        ))}
      </div>

      {/* Infinite Seamless Marquee of Project Tech Stacks & Creative Skills */}
      <div className="marquee-container" aria-label="Tech Stack and Creative Skills Marquee">
        <div className="marquee-track">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="tech-marquee-card"
              style={{ '--accent-color': item.color }}
            >
              <div className="tech-marquee-icon">{item.icon}</div>
              <div className="tech-marquee-info">
                <span className="tech-marquee-name">{item.name}</span>
                <span className="tech-marquee-role font-mono">{item.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
