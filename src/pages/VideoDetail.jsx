import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MEDIA_ITEMS } from '../data/mediaData';
import { useUser } from '../context/UserContext';
import { 
  ArrowLeft, Play, Pause, Download, Check, Calendar, Clock, Monitor, 
  Layers, Tag, Heart, Lock, ShieldCheck, ShoppingBag, Sliders, Image, Sparkles
} from 'lucide-react';

export default function VideoDetail({ favorites, toggleFavorite }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSubscriber, addToCart, language } = useUser();
  const isAr = language === 'ar';

  const item = MEDIA_ITEMS.find((v) => v.id === parseInt(id, 10));
  const isFav = favorites?.includes(item?.id);
  const isCleared = item?.rightsStatus === 'cleared';

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedRes, setSelectedRes] = useState('4K');
  const [selectedAspect, setSelectedAspect] = useState('16:9');
  const [selectedFmt, setSelectedFmt] = useState('MP4');
  const [watermarkOn, setWatermarkOn] = useState(!isCleared); // Watermark default ON if restricted/unlicensed
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Subscription Feature States
  const [customLogo, setCustomLogo] = useState(false);
  const [logoPos, setLogoPos] = useState('top-right');
  const [includeCaptions, setIncludeCaptions] = useState(true);

  useEffect(() => {
    if (item) {
      setSelectedRes(item.formats[0] || '4K');
      setSelectedAspect('16:9');
      setSelectedFmt('MP4');
      setWatermarkOn(item.rightsStatus !== 'cleared');
      setIsPlaying(false);
      setCurrentTime(0);
      setDownloading(false);
      setDownloadSuccess(false);
    }
  }, [item]);

  if (!item) {
    return (
      <div className="min-h-screen bg-slate-950 pt-24 pb-12 flex flex-col items-center justify-center text-center p-6 text-slate-100">
        <h2 className="text-xl font-bold mb-2">Media Asset Not Found</h2>
        <Link to="/feed" className="bg-red-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold">
          Back to Media Library
        </Link>
      </div>
    );
  }

  const parseDuration = (d) => {
    if (!d) return 300;
    const parts = d.split(':');
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  };

  const totalSecs = parseDuration(item.duration);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSeek = (timeStr) => {
    const parts = timeStr.split(':');
    const secs = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    setCurrentTime(secs);
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pt-16 pb-16">
      <div className="w-full px-6 md:px-12 pt-6 flex flex-col gap-6">
        
        {/* Top Back Breadcrumb Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/feed')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
          >
            <ArrowLeft size={14} /> {isAr ? 'العودة لمكتبة الوسائط' : 'Back to Media Library'}
          </button>

          <button
            onClick={() => toggleFavorite(item.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              isFav
                ? 'bg-red-950/80 text-red-400 border-red-800'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
            }`}
          >
            <Heart size={14} className={isFav ? 'fill-red-500 text-red-500' : ''} />
            {isFav ? 'Saved to Favorites' : 'Add to Favorites'}
          </button>
        </div>

        {/* Main Grid Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Player & Rights Details */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Header Title & Rights Badge */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="bg-red-950 text-red-400 border border-red-800 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md">
                  {item.category}
                </span>
                <span className={`font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                  isCleared
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                    : 'bg-amber-950 text-amber-400 border-amber-800'
                }`}>
                  Rights Status: {item.rightsStatus.toUpperCase()}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {item.title}
              </h1>

              {/* Restrictions notice */}
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs text-slate-400 font-mono">
                <strong className="text-slate-200 block mb-0.5">Rights & Restrictions Metadata:</strong>
                {item.restrictions}
              </div>
            </div>

            {/* Cinema Video Player / Preview Screen */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 aspect-video flex flex-col justify-between p-4 shadow-xl group">
              {/* Watermark Overlay Indicator */}
              {watermarkOn && (
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur border border-white/20 px-3 py-1 rounded text-xs font-black tracking-widest text-red-500 z-30">
                  REDWIRE WATERMARKED PREVIEW
                </div>
              )}

              {/* Custom Logo Overlay (Subscription Feature) */}
              {customLogo && isSubscriber && (
                <div className={`absolute ${logoPos === 'top-right' ? 'top-4 right-4' : 'top-4 left-4'} bg-red-600 text-white font-black text-xs px-3 py-1.5 rounded-lg shadow-lg z-30`}>
                  NETWORK BRAND LOGO
                </div>
              )}

              <div className="flex-1 flex items-center justify-center relative">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer"
                >
                  {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                </button>
              </div>

              {/* Player Controls */}
              <div className="bg-black/80 backdrop-blur-md rounded-xl p-3 flex flex-col gap-2 border border-white/10">
                <div
                  className="h-2 bg-white/20 hover:h-3 rounded-full cursor-pointer transition-all relative overflow-hidden"
                  onClick={handleTimelineClick}
                >
                  <div
                    className="h-full bg-red-600 rounded-full"
                    style={{ width: `${(currentTime / (totalSecs || 1)) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-white">
                      {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                    <span>{formatTime(currentTime)} / {item.duration || '0:00'}</span>
                  </div>
                  <span>{selectedRes} • {selectedAspect}</span>
                </div>
              </div>
            </div>

            {/* Script & Transcripts Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col gap-6">
              <div>
                <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Broadcast Script & Story</h3>
                <p className="text-slate-300 text-sm leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-850 font-sans">
                  {item.script}
                </p>
              </div>

              {item.transcript && (
                <div>
                  <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Audio Transcript & Speakers</h3>
                  <pre className="text-xs text-slate-400 whitespace-pre-wrap font-mono bg-slate-950 p-4 rounded-xl border border-slate-850">
                    {item.transcript}
                  </pre>
                </div>
              )}

              {/* Timestamps */}
              {item.timestamps && item.timestamps.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <Layers size={14} className="text-red-500" /> Shot Markers & Timestamps
                  </h3>
                  <div className="flex flex-col gap-2">
                    {item.timestamps.map((ts, i) => (
                      <div
                        key={i}
                        onClick={() => handleSeek(ts.t)}
                        className="flex items-center gap-4 p-3 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 cursor-pointer transition-all"
                      >
                        <span className="text-xs font-mono font-bold text-red-400 bg-red-950/80 border border-red-800 px-2.5 py-1 rounded-md">
                          {ts.t}
                        </span>
                        <span className="text-xs font-semibold text-slate-200">{ts.d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Export / Download Workspace & Subscription Features */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-20">
            
            {/* Download Workspace Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Download size={16} className="text-red-500" /> Download & Export
                </h3>
                <span className="text-[10px] font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-bold">
                  {isSubscriber ? 'Subscriber Unlocked' : 'Ad-hoc Licensing'}
                </span>
              </div>

              {/* Resolution Picker */}
              <div>
                <label className="text-xs text-slate-400 font-bold block mb-2">Resolution Quality</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {item.formats.map((res) => (
                    <button
                      key={res}
                      onClick={() => setSelectedRes(res)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedRes === res
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {res}
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio Crop (Subscriber Unlimited vs Standard) */}
              <div>
                <label className="text-xs text-slate-400 font-bold block mb-2">Aspect Crop Ratio</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['16:9', '9:16', '1:1'].map((aspect) => (
                    <button
                      key={aspect}
                      onClick={() => setSelectedAspect(aspect)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedAspect === aspect
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {aspect}
                    </button>
                  ))}
                </div>
              </div>

              {/* SUBSCRIPTION-ONLY FEATURES BLOCK */}
              <div className="border-t border-b border-slate-800 py-4 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-amber-400" /> Custom Network Logo Overlay
                  </span>
                  {!isSubscriber && (
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                      Subscriber Feature
                    </span>
                  )}
                </div>

                {isSubscriber ? (
                  <div className="flex flex-col gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                      <span>Enable Custom Logo</span>
                      <input
                        type="checkbox"
                        checked={customLogo}
                        onChange={(e) => setCustomLogo(e.target.checked)}
                        className="w-4 h-4 accent-red-600"
                      />
                    </label>

                    {customLogo && (
                      <div className="flex gap-2 pt-2 border-t border-slate-800">
                        <button
                          onClick={() => setLogoPos('top-right')}
                          className={`text-[10px] font-bold px-2 py-1 rounded ${logoPos === 'top-right' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                        >
                          Top Right
                        </button>
                        <button
                          onClick={() => setLogoPos('top-left')}
                          className={`text-[10px] font-bold px-2 py-1 rounded ${logoPos === 'top-left' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                        >
                          Top Left
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 text-[11px] text-slate-500 flex items-center gap-2">
                    <Lock size={14} className="text-amber-500 shrink-0" />
                    <span>Logo overlay & custom aspect ratio branding is available for active subscribers.</span>
                  </div>
                )}
              </div>

              {/* ACTION TRIGGER: Subscriber Download vs Ad-hoc Purchase */}
              <div className="flex flex-col gap-2 pt-1">
                {isSubscriber ? (
                  isCleared ? (
                    <button
                      onClick={handleDownload}
                      disabled={downloading}
                      className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                        downloadSuccess
                          ? 'bg-emerald-600 text-white'
                          : 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/20'
                      }`}
                    >
                      {downloading ? (
                        <span>⏳ Exporting Master File...</span>
                      ) : downloadSuccess ? (
                        <>
                          <Check size={16} /> Asset Downloaded Successfully!
                        </>
                      ) : (
                        <>
                          <Download size={16} /> Export Master Package ({selectedRes} • {selectedAspect})
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 bg-slate-950 text-slate-500 border border-slate-800 cursor-not-allowed opacity-60"
                    >
                      <Lock size={16} /> Download Disabled (Rights Restricted)
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md cursor-pointer"
                  >
                    <ShoppingBag size={16} /> Buy Commercial License • ${item.price}
                  </button>
                )}

                <div className="text-center text-[11px] text-slate-500 font-mono">
                  Estimated Export Size: ~{getEstimatedSize()}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
