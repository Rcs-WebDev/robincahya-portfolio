import React from 'react';

export default function PageTransition({ isActive, targetTitle }) {
  if (!isActive) return null;

  return (
    <div className="page-transition-curtain">
      {/* Top and bottom scanline stripes */}
      <div className="curtain-stripes-top" />
      
      {/* Center Colossal Banner with Page Title */}
      <div className="curtain-center-banner">
        <h2 className="curtain-page-title font-display">
          {targetTitle || 'SUN HUNG'}
        </h2>
      </div>

      <div className="curtain-stripes-bottom" />
    </div>
  );
}
