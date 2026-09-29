import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import MagazineViewer from './components/MagazineViewer';
import Home from './components/Home';
import { magazines } from './data/magazines';
import './App.css';

function MagazineWrapper() {
  const { id } = useParams();
  const magazine = magazines.find(m => m.id === id);
  
  if (!magazine) {
    return (
      <div className="not-found-container">
        <h2>Magazine Not Found</h2>
        <p>The publication you are looking for does not exist or has been removed.</p>
        <a href="/" className="btn-primary">Return to Library</a>
      </div>
    );
  }
  
  return <MagazineViewer magazine={magazine} />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/magazine/:id" element={<MagazineWrapper />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
