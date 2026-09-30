import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content editorial-hero">
        <div className="hero-top-label">GNDEC DIGITAL MAGAZINE</div>
        <hr className="hero-divider" />
        
        <h1 className="hero-main-title">HARMONY</h1>
        
        <hr className="hero-divider" />
        
        <div className="hero-supporting-group">
          <p className="hero-keywords">Ideas · Creativity · Achievement · Expression</p>
          <p className="hero-description">
            A celebration of creativity, imagination, achievements, and the diverse voices of our student community.
          </p>
          <div className="hero-cta-wrapper">
            <a href="/#magazines" className="btn-explore-magazines">EXPLORE MAGAZINES</a>
          </div>
        </div>
        
        <div className="hero-college-id">Guru Nanak Dev Engineering College, Ludhiana</div>
      </div>
    </section>
  );
}
