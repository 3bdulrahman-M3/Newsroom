import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Check, Download, Layers, Calendar, Clock, Monitor } from 'lucide-react';

export default function VideoModal({ video, onClose }) {
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

  if (!video) return null;

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

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div
        className="bg-white border border-slate-200 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto text-slate-900 shadow-2xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-200 p-4 px-6 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <span className="text-[#e63946] font-bold text-xs uppercase tracking-widest bg-[#e63946]/10 px-2.5 py-1 rounded">
              {video.category}
            </span>
            {video.exclusive && (
              <span className="text-amber-700 font-bold text-xs bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                ⭐ EXCLUSIVE
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Video Title */}
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
            {video.title}
          </h2>

          {/* Interactive Player Preview */}
          <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200 aspect-video flex flex-col justify-between p-4 group">
            {/* Watermark overlay */}
            {watermarkOn && (
              <div className="absolute top-4 right-4 bg-black/75 backdrop-blur border border-white/20 px-3 py-1 rounded text-xs font-black tracking-widest text-[#e63946]">
                REDWIRE PREVIEW
              </div>
            )}

            <div className="flex-1 flex items-center justify-center relative">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-[#e63946] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
              >
                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
              </button>
            </div>

            {/* Custom Control Bar */}
            <div className="bg-black/80 backdrop-blur-md rounded-lg p-3 flex flex-col gap-2 border border-white/10">
              <div
                className="h-2 bg-white/20 hover:h-3 rounded-full cursor-pointer transition-all relative overflow-hidden"
                onClick={handleTimelineClick}
              >
                <div
                  className="h-full bg-[#e63946] rounded-full"
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
                <span>{selectedRes} • {selectedAspect}</span>
              </div>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs">
            <div>
              <span className="text-slate-500 block mb-1">Release Date</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Calendar size={13} className="text-[#e63946]" /> {video.date}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Duration</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Clock size={13} className="text-[#e63946]" /> {video.duration}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Formats</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Monitor size={13} className="text-[#e63946]" /> {video.formats.join(', ')}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Timestamps</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Layers size={13} className="text-[#e63946]" /> {video.timestamps.length} markers
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-2">Description</h3>
            <p className="text-slate-700 text-sm leading-relaxed">{video.desc}</p>
          </div>

          {/* Timestamps */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-3">Shot List & Timestamps</h3>
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
              {video.timestamps.map((ts, i) => (
                <div
                  key={i}
                  onClick={() => handleSeek(ts.t)}
                  className="flex items-center gap-4 p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors"
                >
                  <span className="text-xs font-mono font-bold text-[#e63946] bg-[#e63946]/10 px-2 py-1 rounded">
                    {ts.t}
                  </span>
                  <span className="text-xs text-slate-700 font-medium">{ts.d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Download Configurator */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col gap-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Download size={16} className="text-[#e63946]" /> Export & Download Configuration
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-slate-500 block mb-2 font-semibold">Resolution</label>
                <div className="flex flex-wrap gap-1.5">
                  {video.formats.map((res) => (
                    <button
                      key={res}
                      onClick={() => setSelectedRes(res)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                        selectedRes === res
                          ? 'bg-[#e63946] text-white shadow-xs'
                          : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      {res}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-500 block mb-2 font-semibold">Aspect Ratio</label>
                <div className="flex flex-wrap gap-1.5">
                  {['16:9', '9:16', '1:1', '4:3'].map((aspect) => (
                    <button
                      key={aspect}
                      onClick={() => setSelectedAspect(aspect)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                        selectedAspect === aspect
                          ? 'bg-[#e63946] text-white shadow-xs'
                          : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      {aspect}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-500 block mb-2 font-semibold">Format</label>
                <div className="flex flex-wrap gap-1.5">
                  {['MP4', 'MOV', 'MXF'].map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setSelectedFmt(fmt)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                        selectedFmt === fmt
                          ? 'bg-[#e63946] text-white shadow-xs'
                          : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Watermark Toggle */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <div>
                <span className="text-xs font-semibold text-slate-900 block">Overlay Watermark</span>
                <span className="text-[11px] text-slate-500">Embed REDWIRE branding on exported footage</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={watermarkOn}
                  onChange={(e) => setWatermarkOn(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e63946]"></div>
              </label>
            </div>

            {/* Download Trigger */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className={`w-full py-3.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  downloadSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#e63946] hover:bg-[#d62839] text-white shadow-md'
                }`}
              >
                {downloading ? (
                  <span>⏳ Preparing High-Res Stream...</span>
                ) : downloadSuccess ? (
                  <>
                    <Check size={18} /> Ready! Download Started
                  </>
                ) : (
                  <>
                    <Download size={18} /> Download Package ({selectedRes} • {selectedAspect} • {selectedFmt})
                  </>
                )}
              </button>
              <div className="text-center text-[11px] text-slate-500 font-medium">
                Estimated File Size: ~{getEstimatedSize()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
