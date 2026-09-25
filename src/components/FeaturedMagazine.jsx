import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function FeaturedMagazine({ magazine }) {
  if (!magazine) return null;
  
  return (
    <section className="featured-section">
      <div className="container">
        <h2 className="section-title">Featured Magazine</h2>
        <div className="featured-card">
          <div className="featured-image-wrapper">
            <img src={magazine.coverImage} alt={`${magazine.title} Cover`} className="featured-image" loading="lazy" />
          </div>
          <div className="featured-info">
            <h3 className="featured-title">{magazine.title}</h3>
            <p className="featured-subtitle">{magazine.subtitle}</p>
            <p className="featured-details">{magazine.year} • {magazine.totalPages} Pages</p>
            <p className="featured-desc">{magazine.description}</p>
            <Link to={magazine.path} className="btn-primary">Read Magazine</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
