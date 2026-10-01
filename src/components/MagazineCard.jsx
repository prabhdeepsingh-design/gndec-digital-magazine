import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function MagazineCard({ magazine }) {
  const isComingSoon = magazine.comingSoon;

  return (
    <div className={`magazine-card ${isComingSoon ? 'coming-soon' : ''}`}>
      <div className="card-image-wrapper">
        <img 
          src={magazine.coverImage} 
          alt={`${magazine.title} Cover`} 
          className={`card-image ${isComingSoon ? 'blurred-cover' : ''}`} 
          loading="lazy" 
        />
        {isComingSoon && (
          <div className="coming-soon-overlay">
            <span className="coming-soon-badge">COMING SOON</span>
          </div>
        )}
      </div>
      <div className="card-content">
        <h4 className="card-title">{magazine.title}</h4>
        <p className="card-year">{magazine.year} • {magazine.totalPages} Pages</p>
        {isComingSoon ? (
          <span className="btn-secondary card-btn coming-soon-btn">Coming Soon</span>
        ) : (
          <Link to={magazine.path} className="btn-secondary card-btn">Read Now</Link>
        )}
      </div>
    </div>
  );
}
