import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Feed from './pages/Feed';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="min-h-screen bg-[#080808] text-neutral-100 flex flex-col justify-between selection:bg-[#e63946] selection:text-white">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/feed"
              element={<Feed searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
