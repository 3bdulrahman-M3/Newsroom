import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { MEDIA_ITEMS, SCRIPTS, UPCOMING_EVENTS } from '../data/mediaData';
import { 
  Play, Download, ArrowRight, Sparkles, FileText, CalendarDays, 
  TrendingUp, Radio, ShieldCheck, Heart, ShoppingBag, Eye, Layers, Lock, Flame
} from 'lucide-react';

export default function Home({ favorites, toggleFavorite }) {
  const navigate = useNavigate();
  const { isSubscriber, language, addToCart } = useUser();
  const isAr = language === 'ar';

  const featuredItem = MEDIA_ITEMS[0];
  const latestMedia = MEDIA_ITEMS.slice(1, 5);
  const latestScripts = SCRIPTS.slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pt-16 pb-16">
      <div className="w-full px-6 md:px-12 pt-6 flex flex-col gap-8">
        
        {/* TOP HERO USER WELCOME BANNER */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 rounded-3xl p-8 md:p-10 border border-slate-800 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full filter blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold w-fit">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                {isSubscriber ? (isAr ? 'حساب مشترك نشط' : 'Active Subscriber Portal') : (isAr ? 'بوابة الشراء المباشر' : 'Ad-hoc Marketplace')}
              </div>

              <h1 className="font-['Bebas_Neue'] text-5xl sm:text-7xl tracking-wider leading-none">
                {isAr ? 'بوابة التوزيع والتغطيات الإعلامية' : 'BROADCAST WIRE & MEDIA HUB'}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-xl">
                {isAr
                  ? 'منصة الوصول الفوري للتغطيات الرياضية والأخبار العاجلة والسكريبتات الجاهزة للإنتاج والتصدير.'
                  : 'Instant access to broadcast-ready sports highlights, breaking news footage, scripts, and coverage schedules.'}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/feed"
                  className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all hover:scale-105"
                >
                  <Sparkles size={16} /> {isAr ? 'تصفح مكتبة الوسائط' : 'Browse Media Library'} <ArrowRight size={16} />
                </Link>
                <Link
                  to="/planner"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border border-slate-700 transition-all"
                >
                  <CalendarDays size={16} className="inline mr-2" /> {isAr ? 'جدول التغطيات' : 'Sports Planner'}
                </Link>
              </div>
            </div>

            {/* Featured Item Preview */}
            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-2">
                  <Flame size={14} className="text-red-500" /> {isAr ? 'أبرز التغطيات الحالية' : 'Featured Asset'}
                </span>
                <span className="text-red-400 font-mono">4K HDR</span>
              </div>

              <div 
                onClick={() => navigate(`/video/${featuredItem.id}`)}
                className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800 group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 group-hover:scale-110 transition-transform shadow-lg">
                  <Play size={20} fill="currentColor" className="ml-0.5" />
                </div>
                <div className="absolute bottom-3 left-3 right-3 z-20">
                  <span className="text-[9px] font-bold bg-red-600 text-white px-2 py-0.5 rounded uppercase tracking-wider">
                    {featuredItem.category}
                  </span>
                  <h4 className="text-xs font-bold text-white mt-1 line-clamp-1">
                    {featuredItem.title}
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono text-slate-300">
                <div className="bg-slate-800/60 p-2 rounded-lg">
                  <span className="block text-slate-500 text-[9px] uppercase">{isAr ? 'المدة' : 'Duration'}</span>
                  {featuredItem.duration}
                </div>
                <div className="bg-slate-800/60 p-2 rounded-lg">
                  <span className="block text-slate-500 text-[9px] uppercase">{isAr ? 'المصدر' : 'Source'}</span>
                  REDWIRE
                </div>
                <div className="bg-slate-800/60 p-2 rounded-lg">
                  <span className="block text-slate-500 text-[9px] uppercase">{isAr ? 'الحالة' : 'Rights'}</span>
                  <span className="text-emerald-400 font-bold">Cleared</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LATEST SCRIPTS & UPCOMING EVENTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Latest Scripts Widget */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileText size={18} className="text-red-500" /> {isAr ? 'أحدث الأخبار والسكريبتات' : 'Latest Scripts & News Wire'}
              </h2>
              <Link to="/scripts" className="text-xs font-bold text-red-500 hover:underline">
                {isAr ? 'عرض الكل' : 'View All Scripts'}
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {latestScripts.map((script) => (
                <div key={script.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span className="text-red-400 font-bold uppercase">{script.category}</span>
                    <span>{script.date}</span>
                  </div>
                  <h3 className="font-bold text-sm text-white">
                    {isAr ? script.titleAr : script.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {isAr ? script.contentAr : script.contentEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Sports Events Planner Widget */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CalendarDays size={18} className="text-red-500" /> {isAr ? 'الأحداث الرياضية القادمة' : 'Upcoming Sports Coverage'}
              </h2>
              <Link to="/planner" className="text-xs font-bold text-red-500 hover:underline">
                {isAr ? 'الجدول الكامل' : 'Full Planner'}
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {UPCOMING_EVENTS.map((event) => (
                <div key={event.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded uppercase">
                      {event.date} • {event.time}
                    </span>
                    <h4 className="font-bold text-xs text-white mt-1.5">
                      {isAr ? event.eventAr : event.event}
                    </h4>
                    <span className="text-[10px] text-slate-400">{event.location}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-1 rounded">
                    {event.coverageStatus}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RECENT MEDIA ASSETS GRID */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp size={18} className="text-red-500" /> {isAr ? 'أحدث الوسائط المتاحة' : 'Recent Released Assets'}
            </h2>
            <Link to="/feed" className="text-xs font-bold text-red-500 hover:underline">
              {isAr ? 'تصفح كل الوسائط' : 'View Full Media Library'}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {latestMedia.map((item) => {
              const isFav = favorites?.includes(item.id);
              const isCleared = item.rightsStatus === 'cleared';
              return (
                <div
                  key={item.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between group"
                >
                  <div onClick={() => navigate(`/video/${item.id}`)} className="cursor-pointer">
                    <div className="relative aspect-video bg-slate-950 overflow-hidden">
                      <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 group-hover:scale-110 transition-transform shadow">
                        <Play size={16} fill="currentColor" className="ml-0.5" />
                      </div>
                      <span className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                        {item.category}
                      </span>
                      {item.duration && (
                        <span className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                          {item.duration}
                        </span>
                      )}

                      {/* Favorite button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item.id);
                        }}
                        className="absolute top-2.5 right-2.5 z-20 w-7 h-7 rounded-full bg-black/60 hover:bg-slate-900 text-white flex items-center justify-center"
                      >
                        <Heart size={14} className={isFav ? 'text-red-500 fill-red-500' : ''} />
                      </button>
                    </div>

                    <div className="p-4 flex flex-col gap-2">
                      <h3 className="font-bold text-xs text-white line-clamp-2 group-hover:text-red-400 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                        <span>{item.date}</span>
                        <span>•</span>
                        <span className={isCleared ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                          {item.rightsStatus.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-slate-800/80 mt-2 flex items-center justify-between">
                    {isSubscriber ? (
                      isCleared ? (
                        <button
                          onClick={() => navigate(`/video/${item.id}`)}
                          className="w-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1"
                        >
                          <Download size={13} /> {isAr ? 'تصدير وتحميل' : 'Export & Download'}
                        </button>
                      ) : (
                        <button
                          disabled
                          className="w-full bg-slate-900 text-slate-500 text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 border border-slate-800 opacity-60 cursor-not-allowed"
                        >
                          <Lock size={13} /> {isAr ? 'حقوق مقيدة' : 'Restricted Rights'}
                        </button>
                      )
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1"
                      >
                        <ShoppingBag size={13} /> ${item.price} • Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
