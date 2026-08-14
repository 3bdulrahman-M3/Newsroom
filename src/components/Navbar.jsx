import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { 
  Search, LayoutDashboard, MonitorPlay, Bell, LogIn, LogOut, Menu, X
} from 'lucide-react';

export default function Navbar({ searchQuery, setSearchQuery }) {
  const location = useLocation();
  const { user, isLoggedIn, logoutUser, notifications } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] bg-white border-b border-slate-200 text-slate-900 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
      {/* Brand & Left Navigation */}
      <div className="flex items-center gap-4 sm:gap-8">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-red-600 cursor-pointer"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link to="/" className="flex items-center no-underline">
          <img src="/logo.png" alt="REDWIRE Logo" className="h-9 sm:h-12 w-auto object-contain" />
          <div>
            <span className="font-['Montserrat'] text-base sm:text-xl font-extrabold tracking-tight text-slate-900 leading-none block">
              RED<span className="text-red-600">WIRE</span>
            </span>
            <span className="text-[8px] sm:text-[9px] text-slate-400 font-bold uppercase tracking-widest block -mt-0.5 sm:-mt-1 font-mono">
              Media Distribution Wire
            </span>
          </div>
        </Link>

        {/* Primary Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-slate-50 p-1 rounded-2xl border border-slate-200">
          <Link
            to="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              location.pathname === '/'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <LayoutDashboard size={15} className={location.pathname === '/' ? 'text-white' : 'text-slate-500'} />
            Overview
          </Link>
          <Link
            to="/feed"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              location.pathname === '/feed'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <MonitorPlay size={15} className={location.pathname === '/feed' ? 'text-white' : 'text-slate-500'} />
            Media Library
          </Link>
        </nav>
      </div>

      {/* Global Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-xs sm:max-w-sm mx-4">
        <div className="w-full flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 focus-within:ring-2 focus-within:ring-red-500/20 focus-within:bg-white focus-within:border-slate-300 transition-all shadow-xs">
          <Search size={14} className="text-slate-400 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search media..."
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-xs font-semibold text-slate-900 placeholder-slate-400 w-full"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {isLoggedIn && user ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-slate-50 text-slate-900 p-1 pr-2.5 sm:pr-3 rounded-xl border border-slate-200">
              <div className="w-7 h-7 !rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                {user.avatar || 'AA'}
              </div>
              <span className="text-xs font-bold hidden sm:inline text-slate-900">{user.name}</span>
            </div>

            <button
              onClick={logoutUser}
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-2.5 sm:px-3 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl transition-all shadow-md shadow-red-600/20"
          >
            <LogIn size={15} /> Sign In
          </Link>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-4 shadow-xl flex flex-col gap-3 lg:hidden">
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            <Search size={15} className="text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search media..."
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs font-semibold text-slate-900 w-full"
            />
          </div>

          <div className="flex flex-col gap-1 pt-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold ${
                location.pathname === '/' ? 'bg-red-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard size={16} /> Overview
            </Link>
            <Link
              to="/feed"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold ${
                location.pathname === '/feed' ? 'bg-red-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <MonitorPlay size={16} /> Media Library
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
