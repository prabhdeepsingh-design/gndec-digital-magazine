import React from 'react';
import MagazineHeader from './MagazineHeader';
import HeroSection from './HeroSection';
import FeaturedMagazine from './FeaturedMagazine';
import MagazineGrid from './MagazineGrid';
import MagazineFooter from './MagazineFooter';
import { magazines } from '../data/magazines';
import './Home.css';

export default function Home() {
  const featured = magazines[0];
  
  return (
    <div className="home-page">
      <MagazineHeader />
      <main>
        <HeroSection />
        <FeaturedMagazine magazine={featured} />
        <section id="about" className="about-section">
          <div className="container">
            <h2 className="section-title">About the Platform</h2>
            <p className="about-text">
              GNDEC Digital Magazine is a digital publication platform for preserving and presenting the college's annual magazines, achievements, activities, creativity and campus memories.
            </p>
          </div>
        </section>
        <MagazineGrid magazines={magazines} />
      </main>
      <MagazineFooter />
    </div>
  );
}
