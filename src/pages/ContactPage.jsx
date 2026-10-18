import React, { useState } from 'react';
import { Copy, Check, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Website & UI/UX',
    budget: '$10k - $25k',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff007f', '#e60026', '#38c6d1', '#ffffff']
    });
  };

  return (
    <div className="page-container contact-page-root">
      <div className="contact-page-header">
        <h1 className="contact-giant-title font-display">
          START A PROJECT
        </h1>
      </div>

      <div className="contact-grid-wrap">
        {/* Contact Information & Metadata */}
        <div className="contact-meta-card">
          <div className="contact-box-item">
            <span className="font-mono label">DIRECT ELECTRONIC MAIL</span>
            <div className="contact-email-row">
              <span className="email-highlight">{PORTFOLIO_DATA.email}</span>
              <button
                onClick={handleCopyEmail}
                className="copy-mini-btn font-mono"
                title="Copy Email"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
          </div>

          <div className="contact-box-item">
            <span className="font-mono label">LOCATION & COORDINATES</span>
            <p className="meta-val">JAKARTA, INDONESIA</p>
            <p className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
              {PORTFOLIO_DATA.coordinates}
            </p>
          </div>

          <div className="contact-box-item">
            <span className="font-mono label">SOCIAL CONNECTIVITY</span>
            <div className="contact-socials-row">
              {PORTFOLIO_DATA.socials.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="contact-social-pill font-mono">
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Project Inquiry Form */}
        <div className="contact-form-container">
          {isSubmitted ? (
            <div className="contact-success-box">
              <span className="success-star font-display">✱</span>
              <h3 className="font-display" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                TRANSMISSION RECEIVED
              </h3>
              <p className="bio-text">
                Thank you for reaching out, {formData.name || 'friend'}. Robin Cahya will review your brief and respond within 24 hours.
              </p>
              <button
                className="explore-now-btn"
                style={{ marginTop: '2rem' }}
                onClick={() => setIsSubmitted(false)}
              >
                <span>SEND ANOTHER MESSAGE</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="inquiry-form">
              <div className="form-group">
                <label className="font-mono">01 · YOUR NAME / COMPANY</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera, Studio Lead"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="font-mono">02 · YOUR EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  placeholder="alex@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label className="font-mono">03 · PROJECT SCOPE</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  >
                    <option>Website & UI/UX</option>
                    <option>Design System Architecture</option>
                    <option>3D & WebGL Experience</option>
                    <option>Branding & Creative Direction</option>
                    <option>Design Advisory & Workshop</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="font-mono">04 · ANTICIPATED BUDGET</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  >
                    <option>$5k — $10k</option>
                    <option>$10k — $25k</option>
                    <option>$25k — $50k</option>
                    <option>$50k+</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="font-mono">05 · PROJECT OBJECTIVES & DETAILS</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your vision, timeline, and key deliverables..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="explore-now-btn" style={{ width: '100%', justifyContent: 'center' }}>
                <span className="btn-arrow-box">
                  <Send size={18} />
                </span>
                <span>SUBMIT INQUIRY TRANSMISSION</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
