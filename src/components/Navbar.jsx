import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { 
  Search, LayoutDashboard, MonitorPlay, Heart, ShoppingBag, 
  Globe, Bell, Shield, Sparkles, FileText, CalendarDays, Receipt, UserCheck
} from 'lucide-react';

export default function Navbar({ searchQuery, setSearchQuery, favoritesCount }) {
  const location = useLocation();
  const { userRole, setUserRole, language, setLanguage, cart, isSubscriber, notifications } = useUser();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const t = {
    overview: language === 'ar' ? 'الرئيسية' : 'Overview',
    library: language === 'ar' ? 'مكتبة الوسائط' : 'Media Library',
    scripts: language === 'ar' ? 'الأخبار والسكريبتات' : 'Scripts',
    planner: language === 'ar' ? 'جدول التغطيات' : 'Planner',
    favorites: language === 'ar' ? 'المفضلة' : 'Favorites',
    subscriber: language === 'ar' ? 'حساب مشترك' : 'Subscriber',
    adhoc: language === 'ar' ? 'مشتري فردي' : 'Ad-hoc Buyer'
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] bg-slate-900 border-b border-slate-800 text-slate-100 px-6 py-2.5 flex items-center justify-between shadow-md">
      {/* Brand & Left Navigation */}
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2.5 decoration-none">
          <div>
            <span className="font-['Bebas_Neue'] text-2xl tracking-wider text-white leading-none block">
              RED<span className="text-red-500">WIRE</span>
            </span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block -mt-1">
              Client Portal
            </span>
          </div>
        </Link>

        {/* Primary Dashboard Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
          <Link
            to="/"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              location.pathname === '/'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutDashboard size={14} className={location.pathname === '/' ? 'text-red-500' : ''} />
            {t.overview}
          </Link>
          <Link
            to="/feed"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              location.pathname === '/feed'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MonitorPlay size={14} className={location.pathname === '/feed' ? 'text-red-500' : ''} />
            {t.library}
          </Link>
          <Link
            to="/scripts"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              location.pathname === '/scripts'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText size={14} className={location.pathname === '/scripts' ? 'text-red-500' : ''} />
            {t.scripts}
          </Link>
          <Link
            to="/planner"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              location.pathname === '/planner'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CalendarDays size={14} className={location.pathname === '/planner' ? 'text-red-500' : ''} />
            {t.planner}
          </Link>
        </nav>
      </div>

      {/* Global Search */}
      <div className="hidden xl:flex items-center flex-1 max-w-sm mx-6">
        <div className="w-full flex items-center bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-1.5">
          <Search size={14} className="text-slate-400 mr-2 shrink-0" />
          <input
            type="text"
            placeholder={language === 'ar' ? 'بحث شامل، وسائط، رياضة...' : 'Search media, sports, keywords...'}
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-xs font-medium text-white placeholder-slate-400 w-full"
          />
        </div>
      </div>

      {/* User Role Switcher, Cart, Lang & Notifications */}
      <div className="flex items-center gap-3">
        {/* Role Toggle Button (Simulator) */}
        <button
          onClick={() => setUserRole(isSubscriber ? 'adhoc' : 'subscriber')}
          className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
            isSubscriber
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
              : 'bg-amber-950/80 text-amber-300 border-amber-700/60'
          }`}
          title="Switch User Experience Simulator"
        >
          <UserCheck size={13} />
          {isSubscriber ? t.subscriber : t.adhoc}
        </button>


        {/* Cart Link (for Ad-hoc buyers) */}
        {!isSubscriber && (
          <Link
            to="/cart"
            className="relative flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-700"
          >
            <ShoppingBag size={14} className="text-amber-400" />
            {cart.length > 0 && (
              <span className="bg-amber-500 text-slate-950 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                {cart.length}
              </span>
            )}
          </Link>
        )}


        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 relative transition-colors cursor-pointer"
          >
            <Bell size={15} />
            {unreadNotifs > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-4 z-50 flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-white">Notifications</span>
                <span className="text-[10px] text-slate-400">{unreadNotifs} unread</span>
              </div>
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs">
                    <div className="font-bold text-white mb-0.5">{language === 'ar' ? n.titleAr : n.title}</div>
                    <div className="text-[11px] text-slate-400 leading-tight">{n.message}</div>
                    <div className="text-[9px] text-slate-500 mt-1 font-mono">{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
