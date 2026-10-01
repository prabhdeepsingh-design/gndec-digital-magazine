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

            <div className="team-intro">
              <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Team's Message</h2>
              <p className="team-message" style={{ marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem', lineHeight: '1.8' }}>
                Welcome to the digital home of HARMONY. We are proud to present the vibrant creativity, thoughtful articles, and artistic expressions of our student community in an accessible, modern digital format. Our endeavor is to bring the timeless tradition of our college magazine to screens everywhere.
              </p>

              <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Team's Goal</h2>
              <p className="team-goal" style={{ marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem', lineHeight: '1.8' }}>
                Our goal is simple: to make HARMONY accessible digitally, preserve student creativity for future generations, and provide a clean, professional platform for the college magazine that reflects the excellence of Guru Nanak Dev Engineering College.
              </p>
            </div>
            
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
