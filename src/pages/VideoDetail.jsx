import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MEDIA_ITEMS } from '../data/mediaData';
import { useUser } from '../context/UserContext';
import { 
  ArrowLeft, Play, Pause, Download, Check, Layers, Heart, Sparkles, LogIn, Lock, Calendar, Clock, FileText, Shield
} from 'lucide-react';

export default function VideoDetail({ favorites, toggleFavorite }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, language } = useUser();
  const isAr = language === 'ar';

  const item = MEDIA_ITEMS.find((v) => v.id === parseInt(id, 10));
  const isFav = favorites?.includes(item?.id);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedRes, setSelectedRes] = useState('4K');
  const [selectedAspect, setSelectedAspect] = useState('16:9');
  const [selectedFmt, setSelectedFmt] = useState('MP4');
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Custom Watermark / Logo Overlay States
  const [customLogo, setCustomLogo] = useState(false);
  const [logoType, setLogoType] = useState('redwire'); // 'redwire' | 'custom'
  const [customLogoUrl, setCustomLogoUrl] = useState('');
  const [logoPos, setLogoPos] = useState('top-right');

  const parseDuration = (d) => {
    if (!d) return 300;
    const parts = d.split(':');
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  };

  const totalSecs = parseDuration(item?.duration);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalSecs) {
            setIsPlaying(false);
            return totalSecs;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, totalSecs]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSeek = (timeStr) => {
    const parts = timeStr.split(':');
    const secs = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    setCurrentTime(secs);
    setIsPlaying(true);
  };

  const handleTimelineClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setCurrentTime(pct * totalSecs);
  };

  const getEstimatedSize = () => {
    const sizes = {
      '4K': { '16:9': '4.2 GB', '9:16': '4.5 GB', '1:1': '3.8 GB', '4:3': '4.0 GB' },
      '1080p': { '16:9': '1.1 GB', '9:16': '1.2 GB', '1:1': '980 MB', '4:3': '1.05 GB' },
      '720p': { '16:9': '480 MB', '9:16': '510 MB', '1:1': '420 MB', '4:3': '460 MB' }
    };
    return sizes[selectedRes]?.[selectedAspect] || '1.1 GB';
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans pt-16 pb-16">
      <div className="w-full px-6 md:px-12 pt-6 flex flex-col gap-6">
        
        {/* Top Back Breadcrumb Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/feed')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Media Library
          </button>

          <button
            onClick={() => toggleFavorite(item.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              isFav
                ? 'bg-red-50 text-red-600 border-red-200'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:text-slate-900'
            }`}
          >
            <Heart size={14} className={isFav ? 'fill-red-600 text-red-600' : ''} />
            {isFav ? 'Saved to Favorites' : 'Add to Favorites'}
          </button>
        </div>

        {/* Main Grid Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Player & Rights Details */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Header Title & Enriched Metadata */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-3.5">
              <div className="flex items-center gap-2">
                <span className="bg-red-100 text-red-600 border border-red-200 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md">
                  {item.category}
                </span>
                {item.formats.map((fmt) => (
                  <span
                    key={fmt}
                    className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded font-mono"
                  >
                    {fmt}
                  </span>
                ))}
              </div>

              <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {item.title}
              </h1>

              {/* Metadata Row: Date, Duration, Timestamps */}
              <div className="flex items-center flex-wrap gap-3 text-xs text-slate-500 font-mono">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-slate-400" />
                  {item.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-slate-400" />
                  {item.duration || '0:00'}
                </span>
                {item.timestamps && item.timestamps.length > 0 && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Layers size={14} className="text-slate-400" />
                      {item.timestamps.length} timestamps
                    </span>
                  </>
                )}
              </div>

              {/* Tags Badges */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Cinema Video Player / Preview Screen */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-900 h-64 sm:h-auto sm:aspect-video flex flex-col justify-between p-4 shadow-2xl group">
              {/* Clean Standard Centered REDWIRE Watermark Overlay */}
              <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none">
                <div className="flex items-center gap-2 sm:gap-2.5 opacity-25">
                  <img src="/logo.png" alt="REDWIRE Logo" className="h-7 sm:h-9 md:h-11 w-auto object-contain filter drop-shadow-lg opacity-80" />
                  <span className="font-['Montserrat'] font-extrabold tracking-wider text-base sm:text-xl md:text-3xl leading-none drop-shadow-xl text-white">
                    RED<span className="text-red-500">WIRE</span>
                  </span>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center relative z-30">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer"
                >
                  {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                </button>
              </div>

              {/* Player Controls - High Contrast */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex flex-col gap-2.5 shadow-2xl">
                <div
                  className="h-2 bg-slate-800 hover:h-2.5 rounded-full cursor-pointer transition-all relative overflow-hidden"
                  onClick={handleTimelineClick}
                >
                  <div
                    className="h-full bg-red-600 rounded-full"
                    style={{ width: `${(currentTime / (totalSecs || 1)) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <div className="flex items-center gap-3 text-white">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-red-500 transition-colors cursor-pointer">
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <span className="text-white text-xs font-bold font-mono tracking-wide">
                      {formatTime(currentTime)} / {item.duration || '0:00'}
                    </span>
                  </div>
                  <span className="text-white text-xs font-bold font-mono tracking-wide">
                    {selectedRes} • {selectedAspect}
                  </span>
                </div>
              </div>
            </div>

            {/* UNIFIED ASSET METADATA & SHOTLIST CONTAINER CARD */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-7">
              
              {/* SECTION 1: Asset Specifications */}
              <div className="flex flex-col gap-4">
                <h3 className="text-xs uppercase font-bold tracking-wider text-slate-500 flex items-center gap-2">
                  <FileText size={15} className="text-red-600" /> Asset Specifications & Metadata
                </h3>

                <div className="bg-slate-50/70 rounded-xl border border-slate-200 p-4 font-sans text-xs flex flex-col gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 border-b border-slate-200/80 pb-2.5">
                    <span className="sm:col-span-3 font-bold text-slate-500">Slug:</span>
                    <span className="sm:col-span-9 font-semibold text-slate-900 font-mono select-all">
                      {item.contentId || `RW-ASSET-${item.id}`} {item.title}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 border-b border-slate-200/80 pb-2.5">
                    <span className="sm:col-span-3 font-bold text-slate-500">Arrival Date:</span>
                    <span className="sm:col-span-9 font-semibold text-slate-900 font-mono">
                      {item.date} 1:46 PM
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 border-b border-slate-200/80 pb-2.5">
                    <span className="sm:col-span-3 font-bold text-slate-500">Creation Date:</span>
                    <span className="sm:col-span-9 font-semibold text-slate-900 font-mono">
                      {item.date} 1:46 PM
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 border-b border-slate-200/80 pb-2.5">
                    <span className="sm:col-span-3 font-bold text-slate-500">Duration:</span>
                    <span className="sm:col-span-9 font-semibold text-slate-900 font-mono">
                      {item.duration || '0:39'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 border-b border-slate-200/80 pb-2.5">
                    <span className="sm:col-span-3 font-bold text-slate-500">Video ID:</span>
                    <span className="sm:col-span-9 font-semibold text-slate-900 font-mono">
                      5377999{item.id}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 border-b border-slate-200/80 pb-2.5">
                    <span className="sm:col-span-3 font-bold text-slate-500">Type:</span>
                    <span className="sm:col-span-9 font-semibold text-slate-900 font-mono uppercase">
                      {item.type || 'VOSOT'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 border-b border-slate-200/80 pb-2.5">
                    <span className="sm:col-span-3 font-bold text-slate-500">Usage:</span>
                    <span className="sm:col-span-9 font-semibold text-slate-900">
                      Newsroom Ready
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 border-b border-slate-200/80 pb-2.5">
                    <span className="sm:col-span-3 font-bold text-slate-500">Restriction:</span>
                    <div className="sm:col-span-9 flex flex-col gap-1 text-slate-700">
                      <p>{item.restrictions || 'No additional restrictions beyond those terms outlined in your license agreement.'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 border-b border-slate-200/80 pb-2.5">
                    <span className="sm:col-span-3 font-bold text-slate-500">Source:</span>
                    <span className="sm:col-span-9 font-semibold text-slate-900">
                      {item.source || 'ASSOCIATED PRESS / REDWIRE'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 border-b border-slate-200/80 pb-2.5">
                    <span className="sm:col-span-3 font-bold text-slate-500">Location:</span>
                    <span className="sm:col-span-9 font-semibold text-slate-900">
                      {item.location || 'New York, USA'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 border-b border-slate-200/80 pb-2.5">
                    <span className="sm:col-span-3 font-bold text-slate-500">Subjects:</span>
                    <span className="sm:col-span-9 font-semibold text-red-600">
                      {item.tags ? item.tags.join(', ') : 'Sports, News'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 border-b border-slate-200/80 pb-2.5">
                    <span className="sm:col-span-3 font-bold text-slate-500">People Mentioned:</span>
                    <span className="sm:col-span-9 font-semibold text-slate-900">
                      {item.peopleMentioned ? item.peopleMentioned.join(', ') : 'Travis Kelce, Ryan Reynolds, Hugh Jackman, Blake Lively, Sophie Turner, Taylor Swift'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 border-b border-slate-200/80 pb-2.5">
                    <span className="sm:col-span-3 font-bold text-slate-500">Friendly Key:</span>
                    <span className="sm:col-span-9 font-semibold text-slate-900 font-mono">
                      4940436438
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-0.5">
                    <span className="sm:col-span-3 font-bold text-slate-500">Copyright:</span>
                    <span className="sm:col-span-9 font-semibold text-slate-700">
                      Copyright 2025 REDWIRE / Associated Press. All rights reserved.
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Shotlist */}
              <div className="border-t border-slate-200 pt-6 flex flex-col gap-6">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-slate-500 flex items-center gap-2 font-mono">
                    <Layers size={15} className="text-red-600" /> Shotlist
                  </h3>
                </div>

                {/* Broadcast Story Summary */}
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-2">Broadcast Story Summary</h4>
                  <p className="text-slate-600 text-xs leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 font-sans">
                    {item.script || item.desc}
                  </p>
                </div>

                {/* Shot Markers & Timestamps */}
                {item.timestamps && item.timestamps.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                       Shot Markers & Timestamps
                    </h4>
                    <div className="flex flex-col gap-2">
                      {item.timestamps.map((ts, i) => {
                        const tsSecs = parseInt(ts.t.split(':')[0], 10) * 60 + parseInt(ts.t.split(':')[1], 10);
                        const isActive = Math.abs(currentTime - tsSecs) < 15;
                        return (
                          <div
                            key={i}
                            onClick={() => handleSeek(ts.t)}
                            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                              isActive
                                ? 'bg-red-50/80 border-red-300 text-red-900 shadow-xs'
                                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border ${
                                isActive
                                  ? 'bg-red-600 text-white border-red-600'
                                  : 'bg-red-50 text-red-600 border-red-200'
                              }`}>
                                {ts.t}
                              </span>
                              <span className="text-xs font-semibold">{ts.d}</span>
                            </div>
                            <Play size={13} className={isActive ? 'text-red-600 fill-red-600' : 'text-slate-400 opacity-0 group-hover:opacity-100'} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 3: STORYLINE */}
              <div className="border-t border-slate-200 pt-6">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-2 font-mono">
                  STORYLINE:
                </h4>
                <p className="text-slate-800 text-xs font-semibold leading-relaxed bg-slate-100/80 p-4 rounded-xl border border-slate-200/90 font-sans select-all">
                  {item.desc || item.script}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Export / Download Workspace */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-20">
            
            {/* Download Workspace Box */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Download size={16} className="text-red-600" /> Download & Export
                </h3>
              </div>

              {/* Resolution Picker */}
              <div>
                <label className="text-xs text-slate-500 font-bold block mb-2">Resolution Quality</label>
                <div className="grid grid-cols-3 gap-2 sm:gap-1.5">
                  {item.formats.map((res) => (
                    <button
                      key={res}
                      onClick={() => setSelectedRes(res)}
                      className={`py-3 sm:py-2.5 rounded-xl text-xs sm:text-xs font-bold transition-all cursor-pointer ${
                        selectedRes === res
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      {res}
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio Crop */}
              <div>
                <label className="text-xs text-slate-500 font-bold block mb-2">Aspect Crop Ratio</label>
                <div className="grid grid-cols-3 gap-2 sm:gap-1.5">
                  {['16:9', '9:16', '1:1'].map((aspect) => (
                    <button
                      key={aspect}
                      onClick={() => setSelectedAspect(aspect)}
                      className={`py-3 sm:py-2.5 rounded-xl text-xs sm:text-xs font-bold transition-all cursor-pointer ${
                        selectedAspect === aspect
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      {aspect}
                    </button>
                  ))}
                </div>
              </div>

              {/* File Format Picker */}
              <div>
                <label className="text-xs text-slate-500 font-bold block mb-2">File Container Format</label>
                <div className="grid grid-cols-4 gap-2 sm:gap-1.5">
                  {['MP4', 'MOV', 'ProRes', 'MXF'].map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setSelectedFmt(fmt)}
                      className={`py-3 sm:py-2 rounded-xl text-xs sm:text-xs font-bold transition-all cursor-pointer ${
                        selectedFmt === fmt
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* ACTION TRIGGER */}
              <div className="flex flex-col gap-2 pt-1">
                {isLoggedIn ? (
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className={`w-full py-3.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md leading-snug ${
                      downloadSuccess
                        ? 'bg-emerald-600 text-white'
                        : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/20'
                    }`}
                  >
                    {downloading ? (
                      <span className="flex items-center gap-1.5">⏳ Exporting Master File...</span>
                    ) : downloadSuccess ? (
                      <span className="flex items-center gap-1.5">
                        <Check size={16} className="shrink-0" /> Asset Downloaded Successfully!
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-1.5 text-center flex-wrap">
                        <Download size={16} className="shrink-0" />
                        <span>Export Master Package</span>
                        <span className="bg-red-700/80 px-2 py-0.5 rounded text-[10px] font-mono tracking-normal normal-case">
                          {selectedRes} • {selectedAspect} • {selectedFmt}
                        </span>
                      </span>
                    )}
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => navigate('/login')}
                      className="w-full py-4 sm:py-3.5 rounded-xl text-xs sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white transition-all cursor-pointer shadow-lg shadow-red-600/20"
                    >
                      <LogIn size={16} /> Sign In Required to Export & Download
                    </button>
                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
                      <Lock size={13} className="text-amber-500" /> Export features locked for guest users
                    </div>
                  </div>
                )}

                {isLoggedIn && (
                  <div className="text-center text-[11px] text-slate-400 font-mono">
                    Estimated Export Size: ~{getEstimatedSize()}
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
