import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { VIDEOS } from '../data/videos';
import { 
  Play, Download, ShieldCheck, Cpu, ArrowUpRight, 
  Tv2, TrendingUp, Sparkles, ArrowRight
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const featuredVideo = VIDEOS[0];
  const topStreams = VIDEOS.slice(1, 7);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 pt-6 flex flex-col gap-8">
        
        {/* TOP HERO DASHBOARD BANNER */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/15 rounded-full filter blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold w-fit">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                ENTERPRISE MEDIA HUB
              </div>

              <h1 className="font-['Bebas_Neue'] text-5xl sm:text-7xl tracking-wider leading-none">
                BROADCAST-READY <br />
                <span className="text-red-500">NEWS & SPORTS</span> DISTRIBUTION
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-xl">
                High-speed media wire for newsrooms and agencies. Download cleared 4K & 1080p footage with instant timestamps and multi-ratio exports.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/feed"
                  className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all hover:scale-105"
                >
                  <Tv2 size={16} /> Access Live Media Feed <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Featured Live Preview Widget */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs text-slate-300 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> Featured Wire Asset
                </span>
                <span className="text-red-400">4K HDR</span>
              </div>

              <div 
                onClick={() => navigate(`/video/${featuredVideo.id}`)}
                className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-white/10 group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 group-hover:scale-110 transition-transform shadow-lg">
                  <Play size={20} fill="currentColor" className="ml-0.5" />
                </div>
                <div className="absolute bottom-3 left-3 right-3 z-20">
                  <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded uppercase tracking-wider">
                    {featuredVideo.category}
                  </span>
                  <h4 className="text-xs font-bold text-white mt-1 line-clamp-1">
                    {featuredVideo.title}
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono text-slate-300">
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="block text-slate-400 text-[9px] uppercase">Duration</span>
                  {featuredVideo.duration}
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="block text-slate-400 text-[9px] uppercase">Markers</span>
                  {featuredVideo.timestamps.length} Shots
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="block text-slate-400 text-[9px] uppercase">Format</span>
                  {featuredVideo.formats[0]}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* METRICS & CAPABILITIES BAR */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <Tv2 size={24} />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900 font-mono">10,000+</div>
              <div className="text-xs text-slate-500 font-semibold">Active Distribution Assets</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Cpu size={24} />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900 font-mono">&lt; 3 Secs</div>
              <div className="text-xs text-slate-500 font-semibold">Instant Stream Ingest</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900 font-mono">100% Cleared</div>
              <div className="text-xs text-slate-500 font-semibold">Global Broadcast Rights</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Sparkles size={24} />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900 font-mono">Multi-Crop</div>
              <div className="text-xs text-slate-500 font-semibold">16:9 • 9:16 • 1:1 Formats</div>
            </div>
          </div>
        </div>

        {/* RECENT ASSETS WIRE GRID */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp size={18} className="text-red-600" /> Recent Wire Releases
              </h2>
              <p className="text-xs text-slate-500">Fresh footage uploaded directly from news bureaus & events</p>
            </div>
            <Link
              to="/feed"
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              View Full Studio Feed <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {topStreams.map((video) => (
              <div
                key={video.id}
                onClick={() => navigate(`/video/${video.id}`)}
                className="bg-white border border-slate-200 rounded-2xl p-4 hover:border-red-500/40 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="flex flex-col gap-3">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent z-10" />
                    <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 group-hover:scale-110 transition-transform shadow">
                      <Play size={16} fill="currentColor" className="ml-0.5" />
                    </div>
                    <span className="absolute top-2 left-2 z-20 text-[9px] font-bold bg-slate-900/80 backdrop-blur text-white px-2 py-0.5 rounded uppercase">
                      {video.category}
                    </span>
                    <span className="absolute bottom-2 right-2 z-20 text-[10px] font-mono text-white bg-black/70 px-1.5 py-0.5 rounded">
                      {video.duration}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {video.title}
                  </h3>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono">{video.date}</span>
                  <span className="font-bold text-slate-700 flex items-center gap-1 group-hover:text-red-600">
                    <Download size={13} /> {video.formats[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
