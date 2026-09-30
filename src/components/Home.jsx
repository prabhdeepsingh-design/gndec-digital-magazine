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
            <h2 className="section-title">ABOUT HARMONY</h2>
            <div className="about-content">
              <p className="about-text">
                HARMONY is a celebration of creativity, imagination and the diverse voices of our student community. It brings together ideas, experiences, achievements and artistic expressions that reflect the vibrant spirit of our college.
              </p>
              <p className="about-text">
                As technology continues to evolve, HARMONY aims to preserve the importance of human creativity and original thought. Each edition is shaped by the dedication of students, contributors, the editorial team, creating a platform to inspire, connect and showcase the talent within our community.
              </p>
            </div>

            <h3 className="editorial-heading">EDITORIAL LEADERSHIP</h3>
            
            <div className="editorial-profile">
              <div className="profile-image-wrapper">
                <img
                  src="/images/chief-editor.png"
                  alt="Dr. Harpreet Kaur Grewal, President of the College Magazine"
                  className="profile-image"
                />
              </div>
              <div className="profile-details">
                <h3 className="profile-name">Dr. Harpreet Kaur Grewal</h3>
                <p className="profile-designation">President – College Magazine</p>
                <p className="profile-department">Head – Department of Applied Sciences</p>
                <p className="profile-college">Guru Nanak Dev Engineering College, Ludhiana</p>
              </div>
            </div>
          </div>
        </section>
        <MagazineGrid magazines={magazines} />
      </main>
      <MagazineFooter />
    </div>
  );
}
