import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function AwardsSection() {
  return (
    <section id="awards" className="awards-section">
      <span className="section-eyebrow font-mono">
        ● RECOGNITIONS & INDUSTRY ACCLAIM
      </span>
      
      <h2 className="section-heading-big font-display">
        HONORS & AWARDS
      </h2>

      <div className="awards-table">
        {PORTFOLIO_DATA.awards.map((item, idx) => (
          <div key={idx} className="award-row">
            <span className="award-year">{item.year}</span>
            <span className="award-title">{item.title}</span>
            <span className="award-org">{item.org}</span>
            <span className="award-project">{item.project}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
