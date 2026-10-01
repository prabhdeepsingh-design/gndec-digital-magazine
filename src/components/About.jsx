import React from 'react';
import MagazineHeader from './MagazineHeader';
import MagazineFooter from './MagazineFooter';
import './Home.css'; // Reusing Home styles for sections

export default function About() {
  return (
    <div className="home-page">
      <MagazineHeader />
      <main>
        <section className="about-section" style={{ paddingTop: '100px' }}>
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
          </div>
        </section>

        <section className="about-section">
          <div className="container">
            <h2 className="section-title">ABOUT COLLEGE</h2>
            <div className="about-content">
              <p className="about-text">
                Guru Nanak Dev Engineering College (GNDEC), Ludhiana, is one of the oldest and most premier engineering institutions of northern India. The college has been playing a pivotal role in shaping the careers of young engineers and technologists since its inception. It continues to be a center of excellence, fostering a spirit of innovation, research, and holistic development among its students.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="container">
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
      </main>
      <MagazineFooter />
    </div>
  );
}
