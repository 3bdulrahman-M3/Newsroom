import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, LayoutDashboard, MonitorPlay, Sparkles, User, Heart } from 'lucide-react';

export default function Navbar({ searchQuery, setSearchQuery, favoritesCount }) {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] bg-white border-b border-slate-200/80 px-6 py-3 flex items-center justify-between shadow-2xs">
      {/* Brand Logo & Tag */}
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-3 decoration-none">
          <div>
            <span className="font-['Bebas_Neue'] text-2xl tracking-wider text-slate-900 leading-none block">
              RED<span className="text-red-600">WIRE</span>
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block -mt-1">
              Broadcast Studio
            </span>
          </div>
        </Link>

        {/* Primary Dashboard Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
          <Link
            to="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              location.pathname === '/'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard size={15} className={location.pathname === '/' ? 'text-red-600' : ''} />
            Overview
          </Link>
          <Link
            to="/feed"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              location.pathname === '/feed'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <MonitorPlay size={15} className={location.pathname === '/feed' ? 'text-red-600' : ''} />
            Media Feed
          </Link>
          <Link
            to="/favorites"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              location.pathname === '/favorites'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Heart size={15} className={location.pathname === '/favorites' ? 'text-red-600 fill-red-600' : ''} />
            Favorites
            {favoritesCount > 0 && (
              <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                {favoritesCount}
              </span>
            )}
          </Link>
        </nav>
      </div>

      {/* Global Dashboard Search */}
      <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
        <div className="w-full flex items-center bg-slate-100/90 border border-slate-200 rounded-xl px-3.5 py-2 focus-within:ring-2 focus-within:ring-red-500/20 focus-within:bg-white transition-all">
          <Search size={16} className="text-slate-400 mr-2.5 shrink-0" />
          <input
            type="text"
            placeholder="Search broadcast assets, news tags, high-res footage..."
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-xs font-medium text-slate-800 placeholder-slate-400 w-full"
          />
        </div>
      </div>

      {/* Status & Quick Action Buttons */}
      <div className="flex items-center gap-3">
        <Link
          to="/favorites"
          className="md:hidden flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1.5 rounded-xl text-xs font-bold border border-red-200"
        >
          <Heart size={14} className="fill-red-600" /> ({favoritesCount})
        </Link>

        <Link
          to="/login"
          className="border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-2xs flex items-center gap-1.5"
        >
          <User size={14} /> Sign In
        </Link>

        <Link
          to="/feed"
          className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-2"
        >
          <Sparkles size={14} className="text-red-400" /> Studio Console
        </Link>
      </div>
    </header>
  );
}
