import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Home.css';

export default function MagazineHeader() {
  return (
    <header className="magazine-header">
      <div className="header-container">
        <Link to="/" className="header-brand">
          <div className="brand-logo">
            <span className="brand-title" style={{ fontFamily: "serif, 'Times New Roman', Times", fontSize: '1.75rem', fontWeight: 800, letterSpacing: '0.1em', color: '#722F37' }}>HARMONY</span>
            <span className="brand-subtitle">Annual College Magazine</span>
          </div>
        </Link>
        <nav className="header-nav">
          <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>About</NavLink>
          <NavLink to="/magazines" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Magazine</NavLink>
          <NavLink to="/digital-team" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Team</NavLink>
        </nav>
      </div>
    </header>
  );
}
