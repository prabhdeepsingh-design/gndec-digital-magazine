import React from 'react';
import MagazineHeader from './MagazineHeader';
import FeaturedMagazine from './FeaturedMagazine';
import MagazineGrid from './MagazineGrid';
import MagazineFooter from './MagazineFooter';
import { magazines } from '../data/magazines';
import './Home.css';

export default function Magazines() {
  const featured = magazines[0];

  return (
    <div className="home-page">
      <MagazineHeader />
      <main>
        <FeaturedMagazine magazine={featured} />
        <MagazineGrid magazines={magazines} />
      </main>
      <MagazineFooter />
    </div>
  );
}
