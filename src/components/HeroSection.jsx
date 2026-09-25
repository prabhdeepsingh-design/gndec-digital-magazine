import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">GNDEC Digital Magazine</h1>
        <p className="hero-subtitle">
          Stories, achievements, creativity and memories from the GNDEC community.
        </p>
        <div className="hero-actions">
          <a href="#magazines" className="btn-primary">Explore Magazines</a>
          <Link to="/magazine/harmony-2025" className="btn-secondary">Read Harmony 2025</Link>
        </div>
      </div>
    </section>
  );
}
