import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
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
  const [previewVideo, setPreviewVideo] = useState(null);
  
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
    <ThemeProvider>
      <UserProvider>
        <Router>
          <div className="min-h-screen flex flex-col justify-between selection:bg-red-600 selection:text-white relative">
          <Navbar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            favoritesCount={favorites.length}
          />
          <div className="flex-1">
            <Routes>
              <Route 
                path="/" 
                element={<Home favorites={favorites} toggleFavorite={toggleFavorite} onPlayPreview={(item) => setPreviewVideo(item)} />} 
              />
              <Route
                path="/feed"
                element={
                  <Feed 
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    onPlayPreview={(item) => setPreviewVideo(item)}
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

          {/* Quick External Video Preview Modal */}
          {previewVideo && (
            <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative flex flex-col">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
                  <h3 className="text-sm font-bold text-white line-clamp-1">{previewVideo.title}</h3>
                  <button 
                    onClick={() => setPreviewVideo(null)}
                    className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                  <video 
                    controls 
                    autoPlay 
                    src={previewVideo.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Router>
    </UserProvider>
  </ThemeProvider>
  );
}
