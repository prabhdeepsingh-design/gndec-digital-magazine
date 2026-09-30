import React from 'react';
import MagazineHeader from './MagazineHeader';
import MagazineFooter from './MagazineFooter';
import './DigitalTeam.css';

export default function DigitalTeam() {
  return (
    <div className="home-page">
      <MagazineHeader />
      <main className="digital-team-main">
        <section className="digital-team-section">
          <div className="container">
            <header className="team-header">
              <h1 className="team-title">DIGITAL TEAM</h1>
              <p className="team-subtitle">
                The team behind the digital experience of HARMONY
              </p>
            </header>
            
            <div className="team-grid">
              <div className="team-card">
                <div className="team-image-wrapper">
                  <img 
                    src="/images/ishmeet%20singh.jpeg" 
                    alt="Ishmeet Singh — Digital Team" 
                    className="team-image"
                  />
                </div>
                <h3 className="team-name">Ishmeet Singh</h3>
              </div>
              
              <div className="team-card">
                <div className="team-image-wrapper">
                  <img 
                    src="/images/Prabhdeepsingh.png" 
                    alt="Prabhdeep Singh — Digital Team" 
                    className="team-image"
                  />
                </div>
                <h3 className="team-name">Prabhdeep Singh</h3>
              </div>
              
              <div className="team-card">
                <div className="team-image-wrapper">
                  <img 
                    src="/images/armaanjot.png" 
                    alt="Armaanjot Singh — Digital Team" 
                    className="team-image"
                  />
                </div>
                <h3 className="team-name">Armaanjot Singh</h3>
              </div>
            </div>
            
            <footer className="team-footer">
              <p>Bringing HARMONY to the digital space.</p>
            </footer>
          </div>
        </section>
      </main>
      <MagazineFooter />
    </div>
  );
}
