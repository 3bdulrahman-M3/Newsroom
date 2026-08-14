import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Feed from './pages/Feed';
import VideoDetail from './pages/VideoDetail';
import Favorites from './pages/Favorites';
import Exclusives from './pages/Exclusives';
import Scripts from './pages/Scripts';
import Planner from './pages/Planner';
import Cart from './pages/Cart';
import Purchases from './pages/Purchases';
import Login from './pages/Login';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Favorites State
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('redwire_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (videoId) => {
    setFavorites((prev) => {
      const updated = prev.includes(videoId) ? prev.filter((id) => id !== videoId) : [...prev, videoId];
      localStorage.setItem('redwire_favorites', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-red-600 selection:text-white">
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
              <Route path="/scripts" element={<Scripts />} />
              <Route path="/planner" element={<Planner />} />
              <Route path="/exclusives" element={<Exclusives favorites={favorites} toggleFavorite={toggleFavorite} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}
