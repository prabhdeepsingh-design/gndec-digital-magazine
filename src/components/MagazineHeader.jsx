import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function MagazineHeader() {
  return (
    <header className="magazine-header">
      <div className="header-container">
        <Link to="/" className="header-brand">
          <div className="brand-logo">
            <span className="brand-title">Guru Nanak Dev Engineering College</span>
            <span className="brand-subtitle">Digital Magazine</span>
          </div>
        </Link>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>
          <a href="#magazines" className="nav-link">Magazines</a>
          <a href="#about" className="nav-link">About</a>
        </nav>
      </div>
    </header>
  );
}
