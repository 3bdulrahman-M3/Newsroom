import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ExternalLink, Play } from 'lucide-react';

export default function Navbar({ searchQuery, setSearchQuery, onSearchSubmit }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isFeed = location.pathname === '/feed';

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && onSearchSubmit) {
      onSearchSubmit();
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-6 md:px-14 py-3 bg-[#080808]/90 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="flex items-center gap-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col justify-center gap-1.5 p-2 rounded-lg border border-white/10 text-neutral-400 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link to="/" className="flex items-center gap-2.5 text-decoration-none">
          <div className="w-8 h-8 rounded-lg bg-[#e63946] flex items-center justify-center font-black text-white font-['Bebas_Neue'] text-xl tracking-widest shadow-[0_0_15px_rgba(230,57,70,0.4)]">
            R
          </div>
          <span className="font-['Bebas_Neue'] text-2xl tracking-widest text-white">
            RED<span className="text-[#e63946]">WIRE</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0 ml-4">
          <li>
            <Link
              to="/"
              className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                location.pathname === '/' ? 'text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/feed"
              className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                location.pathname === '/feed' ? 'text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Content Feed
            </Link>
          </li>
        </ul>
      </div>

      {/* Middle Search (Feed view only) */}
      {isFeed && setSearchQuery && (
        <div className="hidden sm:flex items-center bg-[#111] border border-white/15 rounded-lg overflow-hidden w-80 max-w-full">
          <input
            type="text"
            placeholder="Search feed..."
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="bg-transparent border-none outline-none text-neutral-100 text-sm px-3.5 py-2 w-full placeholder-neutral-500"
          />
          <button
            onClick={onSearchSubmit}
            className="bg-transparent border-none px-3 text-neutral-400 hover:text-[#e63946] transition-colors cursor-pointer"
          >
            <Search size={16} />
          </button>
        </div>
      )}

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        <a
          href="https://hassan-gallery.site"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center gap-1 text-xs font-semibold text-[#e63946] hover:underline"
        >
          hassan <ExternalLink size={12} />
        </a>

        {!isFeed ? (
          <Link
            to="/feed"
            className="bg-[#e63946] hover:bg-[#ff4757] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-all shadow-[0_4px_20px_rgba(230,57,70,0.3)] hover:scale-[1.02] flex items-center gap-1.5"
          >
            <Play size={14} fill="currentColor" /> Open Feed
          </Link>
        ) : (
          <Link
            to="/"
            className="border border-white/20 hover:border-[#e63946] text-neutral-300 hover:text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        )}
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0d0d0d] border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-neutral-300 hover:text-white text-sm font-semibold uppercase tracking-wider py-1"
          >
            Home
          </Link>
          <Link
            to="/feed"
            onClick={() => setIsOpen(false)}
            className="text-neutral-300 hover:text-white text-sm font-semibold uppercase tracking-wider py-1"
          >
            Content Feed
          </Link>
          <a
            href="https://hassan-gallery.site"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e63946] text-sm font-semibold flex items-center gap-1 py-1"
          >
            hassan <ExternalLink size={14} />
          </a>
        </div>
      )}
    </nav>
  );
}
