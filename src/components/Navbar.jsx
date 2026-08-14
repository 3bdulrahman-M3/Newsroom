import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { 
  Search, LayoutDashboard, MonitorPlay, Bell, LogIn, LogOut
} from 'lucide-react';

export default function Navbar({ searchQuery, setSearchQuery }) {
  const location = useLocation();
  const { user, isLoggedIn, logoutUser, notifications } = useUser();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] bg-white border-b border-slate-200 text-slate-900 px-6 py-3 flex items-center justify-between shadow-xs">
      {/* Brand & Left Navigation */}
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center no-underline">
          <img src="/logo.png" alt="REDWIRE Logo" className="h-12 w-auto object-contain" />
          <div>
            <span className="font-['Montserrat'] text-xl font-extrabold tracking-tight text-slate-900 leading-none block">
              RED<span className="text-red-600">WIRE</span>
            </span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block -mt-1 font-mono">
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
      <div className="hidden xl:flex items-center flex-1 max-w-sm mx-6">
        <div className="w-full flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 focus-within:ring-2 focus-within:ring-red-500/20 focus-within:bg-white focus-within:border-slate-300 transition-all shadow-xs">
          <Search size={15} className="text-slate-400 mr-2.5 shrink-0" />
          <input
            type="text"
            placeholder="Search media, sports, tags..."
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-xs font-semibold text-slate-900 placeholder-slate-400 w-full"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">

        {/* User Account & Direct Sign Out Button */}
        {isLoggedIn && user ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-slate-50 text-slate-900 p-1 pr-3 rounded-xl border border-slate-200">
              <div className="w-7 h-7 !rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                {user.avatar || 'US'}
              </div>
              <span className="text-xs font-bold hidden sm:inline text-slate-900">{user.name}</span>
            </div>

            <button
              onClick={logoutUser}
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={14} />
              <span className="hidden md:inline">Sign Out</span>
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-2xl transition-all shadow-md shadow-red-600/20"
          >
            <LogIn size={15} /> Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
