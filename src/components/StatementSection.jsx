import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function StatementSection() {
  return (
    <section id="about" className="statement-section">
      {/* Colossal Manifesto Headline */}
      <h2 className="statement-headline font-display">
        {PORTFOLIO_DATA.manifestoLines.map((line, idx) => (
          <span key={idx} className="statement-line">
            {line}
          </span>
        ))}
      </h2>

      {/* Editorial Bio Statement Card */}
      <div className="statement-bio-card">
        <div className="font-mono" style={{ color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>●</span> BIOGRAPHY & VISION
        </div>
        
        <p className="bio-text">
          {PORTFOLIO_DATA.manifestoDescription}
        </p>

        <div className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.8rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
          <span>FOCUS: </span> 
          <span style={{ color: 'var(--text-white)' }}>
            DIGITAL PRODUCT ARCHITECTURE · DESIGN SYSTEMS · MOTION INTERACTIONS · WEBGL & 3D
          </span>
        </div>
      </div>
    </section>
  );
}
