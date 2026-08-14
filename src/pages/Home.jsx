import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { MEDIA_ITEMS } from '../data/mediaData';
import { 
  Play, Pause, Download, ArrowRight, Sparkles, TrendingUp, Heart, Flame, Calendar, Clock, Layers
} from 'lucide-react';

export default function Home({ favorites, toggleFavorite }) {
  const navigate = useNavigate();
  const { isSubscriber, language } = useUser();
  const isAr = language === 'ar';
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const featuredItem = MEDIA_ITEMS[0];
  const latestMedia = MEDIA_ITEMS.slice(1, 5);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans pt-16 pb-16">
      <div className="w-full px-6 md:px-12 pt-6 flex flex-col gap-8">
        
        {/* TOP HERO USER WELCOME BANNER */}
        <div className="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-200 relative overflow-hidden shadow-xs">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-600 text-xs font-bold w-fit">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                Client Media Wire
              </div>

              <h1 className="font-['Bebas_Neue'] text-5xl sm:text-7xl tracking-wider leading-none text-slate-900">
                BROADCAST WIRE & MEDIA HUB
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-xl">
                Instant access to broadcast-ready sports highlights, breaking news footage, and high-resolution media packages.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/feed"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-md transition-all hover:scale-105"
                >
                  <Sparkles size={16} /> Browse Media Library <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Featured Item Preview */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-4 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-2 text-slate-900">
                  <Flame size={14} className="text-red-600" /> Featured Asset
                </span>
                <span className="text-red-600 font-mono font-bold">4K HDR</span>
              </div>

              <div 
                className="relative h-56 sm:h-auto sm:aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800 group shadow-sm"
              >
                {playingVideoId === featuredItem.id ? (
                  <div className="relative w-full h-full bg-slate-950 flex flex-col justify-between p-3 shadow-2xl group/cardplayer">
                    {/* Actual HTML5 Video Element */}
                    <video
                      src={featuredItem.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
                      controls
                      autoPlay
                      className="absolute inset-0 w-full h-full object-cover z-0"
                    />

                    {/* Transparent Watermark overlay on real video */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none">
                      <div className="flex items-center gap-2 opacity-25">
                        <img src="/logo.png" alt="REDWIRE Logo" className="h-8 w-auto object-contain filter drop-shadow-md opacity-80" />
                        <span className="font-['Montserrat'] font-extrabold tracking-wider text-base leading-none drop-shadow-lg text-white">
                          RED<span className="text-red-500">WIRE</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div 
                      onClick={() => navigate(`/video/${featuredItem.id}`)}
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 cursor-pointer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayingVideoId(featuredItem.id);
                        }}
                        className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg pl-0.5 cursor-pointer pointer-events-auto"
                        title="Play Video directly"
                      >
                        <Play size={20} fill="currentColor" />
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Title & Navigation Link (Directly Below Video) */}
              <div 
                onClick={() => navigate(`/video/${featuredItem.id}`)}
                className="flex flex-col gap-2 p-1 cursor-pointer group/title"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold bg-red-600 text-white px-2 py-0.5 rounded uppercase tracking-wider">
                    {featuredItem.category}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 font-mono">
                    {featuredItem.date}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-sm font-bold text-slate-900 group-hover/title:text-red-600 transition-colors line-clamp-2 leading-snug">
                    {featuredItem.title}
                  </h4>
                  <div className="shrink-0 bg-slate-100 group-hover/title:bg-red-600 group-hover/title:text-white text-slate-700 p-2 rounded-xl border border-slate-200 transition-all flex items-center gap-1 text-xs font-bold">
                    <span>View Asset</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-[11px] font-mono text-slate-700 pt-1">
                <div className="bg-slate-100 p-2 rounded-lg border border-slate-200">
                  <span className="block text-slate-400 text-[9px] uppercase font-bold">Duration</span>
                  {featuredItem.duration}
                </div>
                <div className="bg-slate-100 p-2 rounded-lg border border-slate-200">
                  <span className="block text-slate-400 text-[9px] uppercase font-bold">Source</span>
                  REDWIRE
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RECENT MEDIA ASSETS GRID */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp size={18} className="text-red-600" /> Recent Released Assets
            </h2>
            <Link to="/feed" className="text-xs font-bold text-red-600 hover:underline">
              View Full Media Library
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {latestMedia.map((item) => {
              const isFav = favorites?.includes(item.id);
              const isPlaying = playingVideoId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 transition-all flex flex-col justify-between group shadow-xs"
                >
                  <div onClick={() => navigate(`/video/${item.id}`)} className="cursor-pointer">
                    <div 
                      className="relative aspect-video bg-slate-100 overflow-hidden cursor-pointer"
                    >
                      {isPlaying ? (
                        <div className="relative w-full h-full bg-slate-950 flex flex-col justify-between p-2 shadow-2xl group/cardplayer">
                          {/* Actual HTML5 Video Element */}
                          <video
                            src={item.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
                            controls
                            autoPlay
                            className="absolute inset-0 w-full h-full object-cover z-0"
                          />

                          {/* Transparent Watermark overlay on real video */}
                          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none">
                            <div className="flex items-center gap-1.5 opacity-25">
                              <img src="/logo.png" alt="REDWIRE Logo" className="h-6 w-auto object-contain filter drop-shadow-md opacity-80" />
                              <span className="font-['Montserrat'] font-extrabold tracking-wider text-xs leading-none drop-shadow-lg text-white">
                                RED<span className="text-red-500">WIRE</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="absolute inset-0 flex items-center justify-center z-10">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setPlayingVideoId(item.id);
                              }}
                              className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow pl-0.5 cursor-pointer"
                              title="Play Video"
                            >
                              <Play size={16} fill="currentColor" />
                            </button>
                          </div>
                          <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur text-slate-900 text-[9px] font-bold px-2 py-0.5 rounded border border-slate-200 uppercase">
                            {item.category}
                          </span>
                          {item.duration && (
                            <span className="absolute bottom-2.5 right-2.5 bg-white/95 text-slate-900 text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-xs border border-slate-200">
                              {item.duration}
                            </span>
                          )}

                          {/* Favorite button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(item.id);
                            }}
                            className="absolute top-2.5 right-2.5 z-20 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow border border-slate-200"
                          >
                            <Heart size={14} className={isFav ? 'text-red-600 fill-red-600' : ''} />
                          </button>
                        </>
                      )}
                    </div>

                    <div className="p-4 flex flex-col gap-3 cursor-pointer" onClick={() => navigate(`/video/${item.id}`)}>
                      <h3 className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
                        {item.title}
                      </h3>

                      {/* Metadata Row: Date, Duration, Timestamps */}
                      <div className="flex items-center flex-wrap gap-2 text-[10px] text-slate-500 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} className="text-slate-400" />
                          {item.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} className="text-slate-400" />
                          {item.duration || '0:00'}
                        </span>
                        {item.timestamps && item.timestamps.length > 0 && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Layers size={11} className="text-slate-400" />
                              {item.timestamps.length} timestamps
                            </span>
                          </>
                        )}
                      </div>

                      {/* Tags Badges */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {item.tags.slice(0, 2).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action & Formats Bar */}
                  <div className="p-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      {item.formats.map((fmt) => (
                        <span
                          key={fmt}
                          className="text-[9px] font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded font-mono"
                        >
                          {fmt}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => navigate(`/video/${item.id}`)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-900 text-[11px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 cursor-pointer border border-slate-200 transition-colors"
                    >
                      <Download size={12} className="text-red-600" /> Download
                    </button>
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
