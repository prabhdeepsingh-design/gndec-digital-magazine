import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function MagazineCard({ magazine }) {
  return (
    <div className="magazine-card">
      <div className="card-image-wrapper">
        <img src={magazine.coverImage} alt={`${magazine.title} Cover`} className="card-image" loading="lazy" />
      </div>
      <div className="card-content">
        <h4 className="card-title">{magazine.title}</h4>
        <p className="card-year">{magazine.year} • {magazine.totalPages} Pages</p>
        <Link to={magazine.path} className="btn-secondary card-btn">Read Now</Link>
      </div>
    </div>
  );
}
