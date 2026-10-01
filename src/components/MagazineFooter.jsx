import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function MagazineFooter() {
  return (
    <footer className="magazine-footer editorial-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h2 className="footer-logo">HARMONY</h2>
            <p className="footer-brand-subtitle">Annual College Magazine</p>
            <p className="footer-brand-desc">Guru Nanak Dev Engineering College, Ludhiana</p>
          </div>
          
          <div className="footer-nav-section">
            <h4 className="footer-heading">Explore</h4>
            <nav className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/about" className="footer-link">About</Link>
              <Link to="/magazines" className="footer-link">Magazine</Link>
              <Link to="/digital-team" className="footer-link">Team</Link>
            </nav>
          </div>

          <div className="footer-nav-section">
            <h4 className="footer-heading">Connect</h4>
            <nav className="footer-links">
              <a href="https://www.gndec.ac.in/" target="_blank" rel="noopener noreferrer" className="footer-link">GNDEC Website</a>
              <a href="https://gndec.ac.in/?q=node/53" target="_blank" rel="noopener noreferrer" className="footer-link">Contact GNDEC</a>
            </nav>
          </div>
        </div>
        
        <div className="footer-bottom editorial-footer-bottom">
          <p>&copy; 2026 HARMONY — Guru Nanak Dev Engineering College, Ludhiana</p>
          <p className="footer-bottom-credit">Designed & maintained by the HARMONY Digital Team</p>
        </div>
      </div>
    </footer>
  );
}
