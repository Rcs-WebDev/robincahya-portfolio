import React, { useState, useEffect } from 'react';
import { X, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function FullscreenMenu({ isOpen, onClose, isSoundOn, onToggleSound, onNavigate }) {
  const [saigonTime, setSaigonTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setSaigonTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  const navLinks = [
    { id: 'home', label: 'HOMEPAGE', title: 'SUN HUNG STUDIO' },
    { id: 'about', label: 'ABOUT', title: 'ABOUT SUN HUNG' },
    { id: 'works', label: 'WORKS', title: 'SELECTED WORKS' },
    { id: 'archive', label: 'ARCHIVE', title: 'PROJECT ARCHIVE' },
    { id: 'contact', label: 'CONTACT', title: 'GET IN TOUCH' }
  ];

  const handleLinkClick = (id, title) => {
    onClose();
    if (onNavigate) {
      onNavigate(id, title);
    }
  };

  return (
    <div className="fullscreen-menu-overlay" role="dialog" aria-modal="true">
      {/* Overlay Header */}
      <div className="menu-overlay-header">
        <div className="font-mono">
          <span style={{ color: 'var(--accent-pink)' }}>●</span> NAVIGATION
        </div>

        <button
          className="menu-close-btn"
          onClick={onClose}
          aria-label="Close Menu"
        >
          <X size={24} />
        </button>
      </div>

      {/* Main Nav Links */}
      <nav>
        <ul className="menu-nav-links">
          {navLinks.map((item, index) => (
            <li key={item.label}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id, item.title);
                }}
              >
                <span style={{ fontSize: '0.45em', verticalAlign: 'middle', marginRight: '1rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  0{index + 1}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Overlay Footer */}
      <div className="menu-overlay-footer">
        <div>
          <span>JAKARTA (GMT+7) : </span>
          <span style={{ color: 'var(--text-white)' }}>{saigonTime}</span>
        </div>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {/* <button
            onClick={onToggleSound}
            style={{
              background: 'none',
              border: 'none',
              color: isSoundOn ? 'var(--accent-pink)' : 'var(--text-dim)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem'
            }}
          >
            {isSoundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>{isSoundOn ? 'AUDIO ON' : 'AUDIO MUTED'}</span>
          </button> */}

          <a
            href={`mailto:${PORTFOLIO_DATA.email}`}
            style={{ color: 'var(--text-white)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          >
            {PORTFOLIO_DATA.email} <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
