import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Navbar({ currentPage, onNavigate, onOpenMenu }) {
  return (
    <header className="navbar-wrapper">
      {/* Brand Logo */}
      <a
        href="#home"
        className="brand-logo"
        onClick={(e) => {
          e.preventDefault();
          onNavigate('home', 'HOMEPAGE');
        }}
        aria-label="Sun Hung Home"
      >
        <span>ROBIN</span>
        <span className="brand-asterisk">✱</span>
        <span>CAHYA</span>
      </a>

      {/* Metadata headers in monospace
      <div className="nav-metadata font-mono">
        <div className="meta-column">
          <span className="highlight">UIUX DESIGNER</span>
          <span>WEBSITE DESIGNER</span>
        </div>

        <div className="meta-column">
          <span className="highlight">PROGRESS ISN'T A GOAL</span>
          <span>IT'S A CONSTANT</span>
        </div>
      </div> */}

      {/* 2x2 Dots Menu Button */}
      <button
        className="menu-dot-button"
        onClick={onOpenMenu}
        aria-label="Toggle Fullscreen Menu"
        title="Open Navigation Menu"
      >
        <div className="dot-grid">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>
      </button>
    </header>
  );
}
