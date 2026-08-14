import React, { useState, useMemo } from 'react';
import { VIDEOS } from '../data/videos';
import VideoModal from '../components/VideoModal';
import { Search, Filter, Play, Download, Calendar, Layers, Star, SlidersHorizontal } from 'lucide-react';

export default function Feed({ searchQuery, setSearchQuery }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [sortOrder, setSortOrder] = useState('latest');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const categories = [
    { id: 'all', label: 'All Content', icon: '⚡' },
    { id: 'sports', label: 'Sports', icon: '⚽' },
    { id: 'politics', label: 'Politics', icon: '🏛️' },
    { id: 'entertainment', label: 'Entertainment', icon: '🎬' },
    { id: 'breaking', label: 'Breaking News', icon: '🔴' },
    { id: 'business', label: 'Business', icon: '💼' }
  ];

  const formatPills = [
    { id: 'all', label: 'All Formats' },
    { id: '4k', label: '4K Ultra HD' },
    { id: '1080p', label: '1080p HD' },
    { id: '720p', label: '720p SD' },
    { id: 'exclusive', label: '⭐ Exclusives Only' }
  ];

  const filteredVideos = useMemo(() => {
    let result = [...VIDEOS];

    if (selectedCategory !== 'all') {
      result = result.filter((v) => v.category === selectedCategory);
    }

    if (selectedFormat === '4k') result = result.filter((v) => v.formats.includes('4K'));
    if (selectedFormat === '1080p') result = result.filter((v) => v.formats.includes('1080p'));
    if (selectedFormat === '720p') result = result.filter((v) => v.formats.includes('720p'));
    if (selectedFormat === 'exclusive') result = result.filter((v) => v.exclusive);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.desc.toLowerCase().includes(q) ||
          v.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (sortOrder === 'latest') {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOrder === 'oldest') {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOrder === 'az') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [selectedCategory, selectedFormat, searchQuery, sortOrder]);

  const thumbGradients = {
    sports: 'from-red-950 via-neutral-900 to-black',
    politics: 'from-blue-950 via-neutral-900 to-black',
    entertainment: 'from-purple-950 via-neutral-900 to-black',
    breaking: 'from-amber-950 via-neutral-900 to-black',
    business: 'from-emerald-950 via-neutral-900 to-black'
  };

  return (
    <div className="min-h-screen bg-[#080808] text-neutral-100 font-sans pt-20 flex flex-col md:flex-row">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-[#0d0d0d] border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-col gap-6 shrink-0">
        <div>
          <h3 className="text-xs uppercase font-bold tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
            <Filter size={14} className="text-[#e63946]" /> Categories
          </h3>
          <div className="flex md:flex-col gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#e63946] text-white shadow-[0_4px_15px_rgba(230,57,70,0.3)]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span>{cat.icon}</span> {cat.label}
                </span>
                {selectedCategory === cat.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Info Box */}
        <div className="hidden md:block mt-auto bg-neutral-900/60 border border-white/5 rounded-xl p-4 text-xs text-neutral-400">
          <div className="font-bold text-white mb-1">Need custom feeds?</div>
          <p className="text-[11px] leading-relaxed">
            Contact Hassan for dedicated live stream feeds or custom API ingest solutions.
          </p>
        </div>
      </aside>

      {/* MAIN FEED CONTENT */}
      <main className="flex-1 p-6 md:p-10 flex flex-col gap-6 max-w-7xl">
        {/* Top Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#111] border border-white/10 rounded-2xl p-4">
          {/* Format Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {formatPills.map((pill) => (
              <button
                key={pill.id}
                onClick={() => setSelectedFormat(pill.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedFormat === pill.id
                    ? 'bg-white text-black font-bold'
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Sort & Count */}
          <div className="flex items-center justify-between sm:justify-end gap-4 border-t lg:border-t-0 border-white/5 pt-3 lg:pt-0">
            <span className="text-xs text-neutral-400 font-mono">
              <strong className="text-white">{filteredVideos.length}</strong> clips found
            </span>

            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-neutral-400" />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-neutral-900 border border-white/10 text-neutral-200 text-xs font-medium rounded-lg px-3 py-1.5 outline-none cursor-pointer"
              >
                <option value="latest">Sort by: Newest</option>
                <option value="oldest">Sort by: Oldest</option>
                <option value="az">Sort by: Title A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        {filteredVideos.length === 0 ? (
          <div className="bg-[#111] border border-white/10 rounded-2xl p-16 text-center flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-neutral-500">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-white">No video clips match your criteria</h3>
            <p className="text-neutral-400 text-sm max-w-md">
              Try adjusting your search query or reset category filters to view all available distribution feeds.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedFormat('all');
                if (setSearchQuery) setSearchQuery('');
              }}
              className="bg-[#e63946] text-white text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-[#ff3a4a] transition-all mt-2"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-[#e63946]/60 hover:shadow-[0_10px_30px_rgba(230,57,70,0.15)] transition-all duration-300 flex flex-col cursor-pointer group"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video bg-neutral-900 overflow-hidden flex items-center justify-center">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      thumbGradients[video.category] || 'from-neutral-800 to-black'
                    } group-hover:scale-105 transition-transform duration-500`}
                  />

                  {/* Play Button */}
                  <div className="w-12 h-12 rounded-full bg-[#e63946]/90 text-white flex items-center justify-center z-10 shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={20} fill="currentColor" className="ml-0.5" />
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 text-[10px] font-bold">
                    <span className="bg-black/70 backdrop-blur text-white px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/10">
                      {video.category}
                    </span>
                    {video.exclusive && (
                      <span className="bg-yellow-400/90 text-black px-2 py-0.5 rounded shadow">
                        ⭐ EXCLUSIVE
                      </span>
                    )}
                  </div>

                  {/* Bottom Duration Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur text-white text-[11px] font-mono font-semibold px-2 py-0.5 rounded border border-white/10">
                    {video.duration}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-base text-white line-clamp-2 group-hover:text-[#e63946] transition-colors leading-snug">
                      {video.title}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-neutral-400 mt-2 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {video.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Layers size={12} /> {video.timestamps.length} markers
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {video.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-white/5 text-neutral-300 px-2 py-0.5 rounded border border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer Bar */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <div className="flex gap-1">
                      {video.formats.map((fmt) => (
                        <span
                          key={fmt}
                          className="text-[10px] font-mono bg-[#e63946]/10 text-[#e63946] px-1.5 py-0.5 rounded border border-[#e63946]/20 font-bold"
                        >
                          {fmt}
                        </span>
                      ))}
                    </div>

                    <button className="text-xs font-bold text-white hover:text-[#e63946] flex items-center gap-1 transition-colors">
                      <Download size={14} /> Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Video Modal Popup */}
      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </div>
  );
}
