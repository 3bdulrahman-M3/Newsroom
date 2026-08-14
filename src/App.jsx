import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Feed from './pages/Feed';
import VideoDetail from './pages/VideoDetail';
import Favorites from './pages/Favorites';
import Login from './pages/Login';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Favorites State (stored in localStorage)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('redwire_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('redwire_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (videoId) => {
    setFavorites((prev) =>
      prev.includes(videoId) ? prev.filter((id) => id !== videoId) : [...prev, videoId]
    );
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-red-600 selection:text-white">
        <Navbar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          favoritesCount={favorites.length}
        />
        <div className="flex-1">
          <Routes>
            <Route 
              path="/" 
              element={<Home favorites={favorites} toggleFavorite={toggleFavorite} />} 
            />
            <Route
              path="/feed"
              element={
                <Feed 
                  searchQuery={searchQuery} 
                  setSearchQuery={setSearchQuery}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
            <Route 
              path="/video/:id" 
              element={<VideoDetail favorites={favorites} toggleFavorite={toggleFavorite} />} 
            />
            <Route 
              path="/favorites" 
              element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />} 
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
