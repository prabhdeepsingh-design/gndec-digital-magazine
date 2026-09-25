import React from 'react';
import MagazineCard from './MagazineCard';
import './Home.css';

export default function MagazineGrid({ magazines }) {
  return (
    <section id="magazines" className="grid-section">
      <div className="container">
        <h2 className="section-title">All Magazines</h2>
        <div className="magazine-grid">
          {magazines.map(mag => (
            <MagazineCard key={mag.id} magazine={mag} />
          ))}
        </div>
      </div>
    </section>
  );
}
