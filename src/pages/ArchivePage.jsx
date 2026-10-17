import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function ArchivePage() {
  const archiveItems = [
    { year: '2024', title: 'YTSHORTCLIPPER WEB APP', client: 'Rcs-WebDev Open Source', role: 'Creator & Lead Dev', category: 'AI Video / Web App', award: 'github.com/Rcs-WebDev/YTShortClipper' },
    { year: '2024', title: 'WHATSAPP SAAS AUTOMATION', client: 'Rcs-WebDev SaaS', role: 'Backend & Automation Lead', category: 'Node.js / SaaS Engine', award: 'github.com/Rcs-WebDev/automation-wa-saas' },
    { year: '2024', title: 'BIEN MOBILE POS APP', client: 'Bien Retail & Cafe Co.', role: 'Mobile App Architect', category: 'Mobile App / Dart & Flutter', award: 'github.com/Rcs-WebDev/bien_pos_app' },
    { year: '2024', title: 'VUE.JS POS & INVENTORY DASHBOARD', client: 'Rcs-WebDev Commercial', role: 'Frontend & UI Architect', category: 'Vue.js / Web Dashboard', award: 'github.com/Rcs-WebDev/vue_pos_app' },
    { year: '2024', title: 'RCS E-COMMERCE STOREFRONT', client: 'Rcs-WebDev Commerce', role: 'Full-Stack Developer', category: 'JavaScript / Modern Commerce', award: 'github.com/Rcs-WebDev/rcs-ecommerce' },
    { year: '2026', title: 'ROBIN CAHYA STUDIO 2.0', client: 'Self-Initiated', role: 'Full Concept & Dev', category: 'Portfolio / WebGL', award: 'Awwwards Nominee' },
    { year: '2025', title: 'NEO-SAIGON CYBER WEAR', client: 'Fashion Label', role: 'E-Commerce & 3D', category: 'Fashion Tech', award: 'CSSDA Special Kudos' },
    { year: '2024', title: 'PANGO CDP ENTERPRISE', client: 'Pango Inc.', role: 'Head of Product Design', category: 'SaaS Platform', award: 'Behance Featured' },
    { year: '2024', title: 'EYE ON DESIGN EXHIBIT', client: 'Design Museum', role: 'Exhibition Direction', category: 'Typography / 3D', award: 'Awwwards Honors' },
    { year: '2024', title: 'THE MASTER CHANNEL', client: 'Master Channel', role: 'Design Systems Lead', category: 'Marketing Hub', award: 'Muzli Feature' }
  ];

  return (
    <div className="page-container archive-page-root">
      <div className="archive-header">
        <span className="section-eyebrow font-mono">● CHRONOLOGICAL VAULT · 2020 — 2026</span>
        <h1 className="archive-giant-title font-display">ARCHIVE & LABS</h1>
        <p className="archive-sub font-mono">
          A COMPREHENSIVE REPOSITORY OF COMMERCIAL PRODUCTIONS, EXPERIMENTAL SHADERS, AND ARCHITECTURAL SCHEMATICS.
        </p>
      </div>

      <div className="archive-table">
        <div className="archive-table-header font-mono">
          <span>YEAR</span>
          <span>PROJECT TITLE</span>
          <span>CLIENT</span>
          <span>CATEGORY</span>
          <span>ACCOLADE</span>
        </div>

        {archiveItems.map((item, idx) => (
          <div key={idx} className="archive-table-row">
            <span className="archive-col-year font-mono">{item.year}</span>
            <span className="archive-col-title font-display">
              {item.title} <ArrowUpRight size={14} className="row-arrow" />
            </span>
            <span className="archive-col-client font-mono">{item.client}</span>
            <span className="archive-col-cat font-mono">{item.category}</span>
            <span className="archive-col-award font-mono">{item.award}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
