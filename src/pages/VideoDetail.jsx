import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { VIDEOS } from '../data/videos';
import { 
  ArrowLeft, Play, Pause, Download, Check, Calendar, Clock, Monitor, 
  Layers, Tag, Heart
} from 'lucide-react';

export default function VideoDetail({ favorites, toggleFavorite }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const video = VIDEOS.find((v) => v.id === parseInt(id, 10));

  const isFav = favorites?.includes(video?.id);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedRes, setSelectedRes] = useState('4K');
  const [selectedAspect, setSelectedAspect] = useState('16:9');
  const [selectedFmt, setSelectedFmt] = useState('MP4');
  const [watermarkOn, setWatermarkOn] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    if (video) {
      setSelectedRes(video.formats[0] || '4K');
      setSelectedAspect('16:9');
      setSelectedFmt('MP4');
      setWatermarkOn(false);
      setIsPlaying(false);
      setCurrentTime(0);
      setDownloading(false);
      setDownloadSuccess(false);
    }
  }, [video]);

  if (!video) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-12 flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Asset Not Found</h2>
        <p className="text-xs text-slate-500 mb-6">The requested broadcast video asset does not exist or has been archived.</p>
        <Link to="/feed" className="bg-red-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold">
          Back to Media Studio Feed
        </Link>
      </div>
    );
  }

  const parseDuration = (d) => {
    if (!d) return 300;
    const parts = d.split(':');
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  };

  const totalSecs = parseDuration(video.duration);

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

  const relatedVideos = VIDEOS.filter((v) => v.id !== video.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-6 pt-6 flex flex-col gap-6">
        
        {/* Top Back Breadcrumb Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/feed')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 px-3.5 py-2 rounded-xl transition-all shadow-2xs cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Studio Feed
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleFavorite(video.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isFav
                  ? 'bg-red-50 text-red-600 border-red-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <Heart size={14} className={isFav ? 'fill-red-600' : ''} />
              {isFav ? 'Saved to Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>

        {/* Main Grid Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Player & Metadata */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Header Title Block */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="bg-red-50 text-red-600 border border-red-200 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md">
                  {video.category}
                </span>
                {video.exclusive && (
                  <span className="bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md">
                    ⭐ Exclusive Master
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {video.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono border-t border-slate-100 pt-3 mt-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar size={13} className="text-red-600" /> Released: {video.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock size={13} className="text-red-600" /> Duration: {video.duration}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Monitor size={13} className="text-red-600" /> Available: {video.formats.join(', ')}
                </span>
              </div>
            </div>

            {/* Full Cinema Player Screen */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-300 aspect-video flex flex-col justify-between p-4 shadow-lg group">
              {watermarkOn && (
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur border border-white/20 px-3 py-1 rounded text-xs font-black tracking-widest text-red-500">
                  REDWIRE WATERMARK
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

              {/* Player Timeline Controls */}
              <div className="bg-black/80 backdrop-blur-md rounded-xl p-3 flex flex-col gap-2 border border-white/10">
                <div
                  className="h-2 bg-white/20 hover:h-3 rounded-full cursor-pointer transition-all relative overflow-hidden"
                  onClick={handleTimelineClick}
                >
                  <div
                    className="h-full bg-red-600 rounded-full"
                    style={{ width: `${(currentTime / totalSecs) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-white">
                      {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                    <span>
                      {formatTime(currentTime)} / {video.duration}
                    </span>
                  </div>
                  <span>{selectedRes} • {selectedAspect} • {selectedFmt}</span>
                </div>
              </div>
            </div>

            {/* Asset Description & Timestamps */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col gap-6">
              <div>
                <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Description & Context</h3>
                <p className="text-slate-700 text-sm leading-relaxed">{video.desc}</p>
              </div>

              <div>
                <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <Layers size={14} className="text-red-600" /> Shot Markers & Key Timestamps
                </h3>
                <div className="flex flex-col gap-2">
                  {video.timestamps.map((ts, i) => (
                    <div
                      key={i}
                      onClick={() => handleSeek(ts.t)}
                      className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 hover:bg-red-50/50 border border-slate-200 hover:border-red-200 cursor-pointer transition-all"
                    >
                      <span className="text-xs font-mono font-bold text-red-600 bg-red-100/80 px-2.5 py-1 rounded-md">
                        {ts.t}
                      </span>
                      <span className="text-xs font-semibold text-slate-800">{ts.d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold text-slate-400 mr-2 flex items-center gap-1">
                  <Tag size={12} /> Tags:
                </span>
                {video.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Export Studio Configurator */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-20">
            
            {/* Download Studio Box */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Download size={16} className="text-red-600" /> Export Console
                </h3>
                <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-bold">
                  STUDIO v2
                </span>
              </div>

              {/* Resolution Picker */}
              <div>
                <label className="text-xs text-slate-500 font-bold block mb-2">Master Resolution</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {video.formats.map((res) => (
                    <button
                      key={res}
                      onClick={() => setSelectedRes(res)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedRes === res
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      {res}
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio Picker */}
              <div>
                <label className="text-xs text-slate-500 font-bold block mb-2">Aspect Crop Ratio</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {['16:9', '9:16', '1:1', '4:3'].map((aspect) => (
                    <button
                      key={aspect}
                      onClick={() => setSelectedAspect(aspect)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedAspect === aspect
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      {aspect}
                    </button>
                  ))}
                </div>
              </div>

              {/* Format Container */}
              <div>
                <label className="text-xs text-slate-500 font-bold block mb-2">Container Format</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['MP4', 'MOV', 'MXF'].map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setSelectedFmt(fmt)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedFmt === fmt
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Watermark Switch */}
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Apply Watermark</span>
                  <span className="text-[10px] text-slate-500">Embed REDWIRE logo</span>
                </div>
                <input
                  type="checkbox"
                  checked={watermarkOn}
                  onChange={(e) => setWatermarkOn(e.target.checked)}
                  className="w-4 h-4 accent-red-600 cursor-pointer"
                />
              </div>

              {/* Trigger Button */}
              <div className="flex flex-col gap-2 pt-2">
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
                    <span>⏳ Preparing Master Package...</span>
                  ) : downloadSuccess ? (
                    <>
                      <Check size={16} /> Asset Package Downloaded!
                    </>
                  ) : (
                    <>
                      <Download size={16} /> Download Asset ({selectedRes} • {selectedAspect})
                    </>
                  )}
                </button>
                <div className="text-center text-[11px] text-slate-500 font-mono">
                  Estimated Export Size: ~{getEstimatedSize()}
                </div>
              </div>
            </div>

            {/* Related Broadcast Wire Assets */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Related Studio Assets
              </h4>
              <div className="flex flex-col gap-3">
                {relatedVideos.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/video/${rel.id}`}
                    className="flex gap-3 items-center hover:bg-slate-50 p-2 rounded-xl transition-colors group"
                  >
                    <div className="w-16 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-white shrink-0 relative overflow-hidden">
                      <Play size={12} fill="currentColor" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
                        {rel.title}
                      </h5>
                      <span className="text-[10px] text-slate-400 font-mono">{rel.duration} • {rel.category}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
