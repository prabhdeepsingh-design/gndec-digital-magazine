import React from 'react';
import MagazineViewer from './components/MagazineViewer';
import { magazines } from './data/magazines';
import './App.css';

function App() {
  const magazine = magazines[0]; // Load Harmony 2025

  return (
    <div className="App">
      <MagazineViewer magazine={magazine} />
    </div>
  );
}

export default App;
