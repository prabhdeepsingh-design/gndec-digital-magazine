import React from 'react';
import './Home.css';

export default function MagazineFooter() {
  return (
    <footer className="magazine-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <h3>Guru Nanak Dev Engineering College</h3>
          <p>Ludhiana, Punjab</p>
          <p className="footer-subtitle">Digital Magazine Platform</p>
        </div>
        <div className="footer-links">
          <a href="https://www.gndec.ac.in/" target="_blank" rel="noopener noreferrer" className="footer-link">Official Website</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Guru Nanak Dev Engineering College. All rights reserved.</p>
      </div>
    </footer>
  );
}
