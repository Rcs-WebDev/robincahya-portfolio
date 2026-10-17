import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function FooterCTA({ onNavigate }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const navLinks = [
    { id: 'home', label: 'HOMEPAGE', title: 'ROBIN CAHYA STUDIO' },
    { id: 'about', label: 'ABOUT', title: 'ABOUT ROBIN CAHYA' },
    { id: 'works', label: 'WORKS', title: 'SELECTED WORKS' },
    { id: 'contact', label: 'CONTACT', title: 'GET IN TOUCH' }
  ];

  return (
    <footer id="contact-footer" className="footer-cta-section">
      {/* Colossal Footer Manifesto with interactive tap & hover */}
      <motion.h2 
        className="footer-mega-title font-display"
        onClick={() => onNavigate && onNavigate('contact', 'GET IN TOUCH')}
        whileTap={{ scale: 0.98 }}
        style={{ cursor: 'pointer' }}
        title="Click to initiate dialogue"
      >
        LET'S MAKE SOMETHING GREAT TOGETHER
      </motion.h2>

      {/* Accordion / List Links with Touch & Hover Animation */}
      <ul className="footer-nav-list">
        {navLinks.map((link) => (
          <motion.li 
            key={link.label} 
            className="footer-nav-item"
            whileTap={{ x: 8 }}
          >
            <a 
              href={`#${link.id}`} 
              className="footer-nav-link"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate(link.id, link.title);
              }}
            >
              <span>{link.label}</span>
              <span className="link-dot" />
            </a>
          </motion.li>
        ))}
      </ul>

      {/* Direct Quick Contact Action Buttons */}
      <div className="footer-actions-group">
        <button 
          className="explore-now-btn footer-action-copy-btn"
          onClick={handleCopyEmail}
          title="Click to copy email"
        >
          <span className="btn-arrow-box">
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </span>
          <span className="btn-main-label">
            {copied ? 'EMAIL COPIED!' : 'COPY EMAIL'}
          </span>
          <span className="btn-email-address font-mono">
            {PORTFOLIO_DATA.email}
          </span>
        </button>

        <button 
          onClick={() => onNavigate && onNavigate('contact', 'GET IN TOUCH')}
          className="explore-now-btn footer-action-inquire-btn"
        >
          <span>INQUIRE COMMISSION</span>
          <ArrowUpRight size={18} />
        </button>
      </div>

      {/* Bottom Metadata & Socials */}
      <div className="footer-bottom-meta">
        <div className="footer-social-row">
          <span className="footer-social-label font-mono">FOLLOW :</span>
          <div className="footer-social-chips">
            {PORTFOLIO_DATA.socials.map((s) => (
              <a 
                key={s.name} 
                href={s.url} 
                target="_blank" 
                rel="noreferrer" 
                className="social-chip font-mono"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-meta-credit font-mono">
          <span>CREATED BY {PORTFOLIO_DATA.name} · ALL RIGHTS RESERVED</span>
        </div>

        <div className="footer-meta-region font-mono">
          <span className="status-ping-dot" />
          <span>INDONESIA 2026</span>
        </div>
      </div>

      {/* Copy Toast Alert */}
      {copied && (
        <div className="toast-notice">
          ✓ {PORTFOLIO_DATA.email} copied to clipboard!
        </div>
      )}
    </footer>
  );
}
