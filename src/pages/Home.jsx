import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Radio, Shield, Globe, Cpu, Download, CheckCircle2, Star, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080808] text-neutral-100 font-sans pt-20">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 py-20 overflow-hidden text-center">
        {/* Background Glowing Gradients & Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(230,57,70,0.18)_0%,transparent_65%),radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(230,57,70,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        {/* Hero Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e63946]/10 border border-[#e63946]/30 text-[#e63946] text-xs font-bold uppercase tracking-widest mb-8 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-[#e63946]" />
          Next-Gen Broadcast Distribution
        </div>

        {/* Hero Title */}
        <h1 className="font-['Bebas_Neue'] text-6xl sm:text-8xl md:text-9xl tracking-wider leading-[0.95] max-w-5xl text-white">
          THE ULTRA-FAST <br />
          <span className="text-[#e63946]">VIDEO WIRE</span> FOR MEDIA
        </h1>

        <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mt-6 leading-relaxed">
          Instantly source, edit, brand, and license broadcast-ready video content across sports, breaking news, politics, and global entertainment.
        </p>

        {/* Hero CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <Link
            to="/feed"
            className="w-full sm:w-auto bg-[#e63946] hover:bg-[#ff3a4a] text-white text-base font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-3 shadow-[0_12px_40px_rgba(230,57,70,0.4)] hover:-translate-y-0.5 transition-all group"
          >
            Launch Content Feed <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto border border-white/10 hover:border-white/30 text-neutral-300 hover:text-white font-medium px-8 py-4 rounded-xl transition-all"
          >
            Explore Platform Features
          </a>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mt-16 pt-12 border-t border-white/10 max-w-4xl w-full">
          <div>
            <div className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-white tracking-wider">
              10K<span className="text-[#e63946]">+</span>
            </div>
            <div className="text-[11px] text-neutral-400 uppercase tracking-widest mt-1">Daily Clips</div>
          </div>
          <div>
            <div className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-white tracking-wider">
              4K<span className="text-[#e63946]"> HDR</span>
            </div>
            <div className="text-[11px] text-neutral-400 uppercase tracking-widest mt-1">Master Quality</div>
          </div>
          <div>
            <div className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-white tracking-wider">
              &lt; 5<span className="text-[#e63946]">s</span>
            </div>
            <div className="text-[11px] text-neutral-400 uppercase tracking-widest mt-1">Ingest Latency</div>
          </div>
          <div>
            <div className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-white tracking-wider">
              100<span className="text-[#e63946]">%</span>
            </div>
            <div className="text-[11px] text-neutral-400 uppercase tracking-widest mt-1">Rights Cleared</div>
          </div>
        </div>
      </section>

      {/* TICKER MARQUEE */}
      <div className="bg-[#e63946] py-3.5 overflow-hidden whitespace-nowrap flex select-none">
        <div className="flex animate-marquee gap-10 text-xs font-black uppercase tracking-widest text-white">
          <span>🔴 BREAKING NEWS FEEDS</span> • <span>⚽ CHAMPIONS LEAGUE EXCLUSIVES</span> • <span>🎬 HOLLYWOOD PREMIERES</span> • <span>⚡ REAL-TIME AI TRANSCRIPTION</span> • <span>📡 SATELLITE DIRECT INGEST</span> • <span>🔴 BREAKING NEWS FEEDS</span> • <span>⚽ CHAMPIONS LEAGUE EXCLUSIVES</span>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-[#e63946] text-xs font-bold uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <Zap size={14} /> Built For Broadcasters & Media Agencies
          </div>
          <h2 className="font-['Bebas_Neue'] text-5xl sm:text-6xl text-white tracking-wide">
            ENTERPRISE VIDEO DISTRIBUTION
          </h2>
          <p className="text-neutral-400 text-base mt-4">
            Everything your newsroom or creative team needs to publish broadcast-ready video instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-8 hover:border-[#e63946]/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#e63946]/10 border border-[#e63946]/30 text-[#e63946] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Radio size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Live Feed Ingestion</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Real-time streams directly from global news bureaus, sports stadiums, and entertainment red carpets with sub-second turnaround.
            </p>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-2xl p-8 hover:border-[#e63946]/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#e63946]/10 border border-[#e63946]/30 text-[#e63946] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Cpu size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">AI Timestamping & Tags</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Automated scene detection generates shot lists, spoken word transcripts, and face recognition markers in seconds.
            </p>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-2xl p-8 hover:border-[#e63946]/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#e63946]/10 border border-[#e63946]/30 text-[#e63946] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Instant Watermarking</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Export in multi-aspect formats (16:9, 9:16, 1:1) with custom network logos or REDWIRE verified digital signatures.
            </p>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 px-6 relative overflow-hidden bg-neutral-900 border-t border-b border-white/10 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,57,70,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="font-['Bebas_Neue'] text-5xl sm:text-7xl text-white tracking-wide mb-6">
            READY TO EXPLORE THE FEED?
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Browse thousands of professionally sourced video clips across sports, news, politics, and entertainment. Download in any format, any quality.
          </p>
          <Link
            to="/feed"
            className="inline-flex items-center gap-3 bg-[#e63946] hover:bg-[#ff3a4a] text-white text-lg font-bold px-10 py-4 rounded-xl shadow-[0_10px_35px_rgba(230,57,70,0.5)] hover:scale-105 transition-all"
          >
            Launch Content Feed <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
