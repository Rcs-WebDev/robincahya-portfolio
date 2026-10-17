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

  // Duplicate clients array to create infinite seamless loop
  const marqueeClients = [...PORTFOLIO_DATA.clients, ...PORTFOLIO_DATA.clients];

  return (
    <section ref={sectionRef} className="stats-section">
      {/* 4-Column Metric Numbers with Scramble Animation */}
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

      {/* Infinite Seamless Marquee of Client Brands */}
      <div className="marquee-container">
        <div className="marquee-track">
          {marqueeClients.map((client, index) => (
            <div key={`${client.name}-${index}`} className="client-logo-card">
              <span>{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
