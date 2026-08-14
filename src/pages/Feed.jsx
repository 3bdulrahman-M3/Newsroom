import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { VIDEOS } from '../data/videos';
import { 
  Search, Play, Download, Grid, List, FolderKanban, Heart
} from 'lucide-react';

export default function Feed({ searchQuery, setSearchQuery, favorites, toggleFavorite }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [sortOrder, setSortOrder] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'all', label: 'All Feeds', count: VIDEOS.length },
    { id: 'sports', label: 'Sports Wire', count: VIDEOS.filter(v => v.category === 'sports').length },
    { id: 'politics', label: 'Politics & Gov', count: VIDEOS.filter(v => v.category === 'politics').length },
    { id: 'entertainment', label: 'Hollywood / Arts', count: VIDEOS.filter(v => v.category === 'entertainment').length },
    { id: 'breaking', label: 'Breaking News', count: VIDEOS.filter(v => v.category === 'breaking').length },
    { id: 'business', label: 'Finance & Tech', count: VIDEOS.filter(v => v.category === 'business').length }
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-16 flex">
      
      {/* PROFESSIONAL DASHBOARD SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 p-5 hidden md:flex flex-col gap-6 shrink-0 shadow-2xs">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 px-2 flex items-center gap-2">
            <FolderKanban size={14} className="text-red-600" /> Wire Categories
          </div>
          <div className="flex flex-col gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                  selectedCategory === cat.id ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Quality Filter Group */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">
            Asset Resolution
          </div>
          <div className="flex flex-col gap-1">
            {[
              { id: 'all', label: 'All Resolutions' },
              { id: '4k', label: '4K Master Files' },
              { id: '1080p', label: '1080p Full HD' },
              { id: 'exclusive', label: '⭐ Exclusives Only' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFormat(f.id)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedFormat === f.id
                    ? 'text-red-600 font-bold bg-red-50 border border-red-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* MAIN DASHBOARD STUDIO WORKSPACE */}
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* TOP WORKSPACE TOOLBAR */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          
          {/* Search Field */}
          <div className="w-full sm:w-80 flex items-center bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2">
            <Search size={15} className="text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search wire clips by keyword..."
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs font-medium text-slate-800 w-full"
            />
          </div>

          {/* View Toggle & Sorting */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs font-mono text-slate-500">
              Showing <strong className="text-slate-900">{filteredVideos.length}</strong> assets
            </span>

            <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2 outline-none cursor-pointer"
              >
                <option value="latest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="az">Sort: Title A-Z</option>
              </select>

              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'grid' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400'
                  }`}
                >
                  <Grid size={15} />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'table' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400'
                  }`}
                >
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ASSET DISPLAY (GRID OR TABLE) */}
        {filteredVideos.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center flex flex-col items-center justify-center gap-3">
            <Search size={32} className="text-slate-300" />
            <h3 className="text-base font-bold text-slate-900">No broadcast assets match your query</h3>
            <p className="text-xs text-slate-500">Try clearing filters or search terms</p>
          </div>
        ) : viewMode === 'grid' ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => {
              const isFav = favorites?.includes(video.id);
              return (
                <div
                  key={video.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-red-500/50 hover:shadow-md transition-all flex flex-col justify-between group relative"
                >
                  <div>
                    <div className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer" onClick={() => navigate(`/video/${video.id}`)}>
                      <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 group-hover:scale-110 transition-transform shadow">
                        <Play size={16} fill="currentColor" className="ml-0.5" />
                      </div>
                      <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                        {video.category}
                      </span>
                      <span className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                        {video.duration}
                      </span>

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(video.id);
                        }}
                        className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center shadow transition-transform hover:scale-110 ${
                          isFav ? 'bg-white text-red-600' : 'bg-black/60 text-white hover:bg-white hover:text-red-600'
                        }`}
                        title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart size={15} className={isFav ? 'fill-red-600' : ''} />
                      </button>
                    </div>

                    <div className="p-4 flex flex-col gap-2 cursor-pointer" onClick={() => navigate(`/video/${video.id}`)}>
                      <h3 className="font-bold text-sm text-slate-900 line-clamp-2 group-hover:text-red-600 transition-colors">
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                        <span>{video.date}</span>
                        <span>•</span>
                        <span>{video.timestamps.length} Shot Markers</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">
                      {video.formats[0]}
                    </span>
                    <button
                      onClick={() => navigate(`/video/${video.id}`)}
                      className="text-xs font-bold text-slate-700 hover:text-red-600 flex items-center gap-1"
                    >
                      <Download size={13} /> Export
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* TABLE WORKSPACE VIEW */
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Fav</th>
                  <th className="p-4">Asset Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Formats</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredVideos.map((video) => {
                  const isFav = favorites?.includes(video.id);
                  return (
                    <tr
                      key={video.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="p-4">
                        <button
                          onClick={() => toggleFavorite(video.id)}
                          className="text-slate-400 hover:text-red-600"
                        >
                          <Heart size={16} className={isFav ? 'text-red-600 fill-red-600' : ''} />
                        </button>
                      </td>
                      <td 
                        onClick={() => navigate(`/video/${video.id}`)}
                        className="p-4 font-bold text-slate-900 flex items-center gap-3 cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
                          <Play size={12} fill="currentColor" />
                        </div>
                        <span className="line-clamp-1">{video.title}</span>
                      </td>
                      <td className="p-4">
                        <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-[10px] font-bold uppercase">
                          {video.category}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-slate-500">{video.duration}</td>
                      <td className="p-4">
                        <span className="text-red-600 font-mono font-bold">{video.formats.join(', ')}</span>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => navigate(`/video/${video.id}`)}
                          className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-600 transition-colors"
                        >
                          View & Export
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>

    </div>
  );
}
