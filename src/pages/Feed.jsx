import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MEDIA_ITEMS } from '../data/mediaData';
import { useUser } from '../context/UserContext';
import { 
  Search, Play, Download, Grid, List, FolderKanban, Heart, Lock, Calendar, Clock, Layers
} from 'lucide-react';

export default function Feed({ searchQuery, setSearchQuery, favorites, toggleFavorite }) {
  const navigate = useNavigate();
  const { isSubscriber, language } = useUser();
  const isAr = language === 'ar';

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcat, setSelectedSubcat] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [sortOrder, setSortOrder] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'all', label: 'All Media', count: MEDIA_ITEMS.length },
    { id: 'sports', label: 'Sports Wire', count: MEDIA_ITEMS.filter(v => v.category === 'sports').length },
    { id: 'politics', label: 'Politics & Gov', count: MEDIA_ITEMS.filter(v => v.category === 'politics').length },
    { id: 'entertainment', label: 'Hollywood & Arts', count: MEDIA_ITEMS.filter(v => v.category === 'entertainment').length },
    { id: 'breaking', label: 'Breaking News', count: MEDIA_ITEMS.filter(v => v.category === 'breaking').length }
  ];

  const subcategoriesMap = {
    sports: [
      { id: 'all', label: 'All Sports' },
      { id: 'football', label: 'Football' },
      { id: 'tennis', label: 'Tennis' },
      { id: 'motorsport', label: 'Motorsport / F1' }
    ],
    politics: [
      { id: 'all', label: 'All Topics' },
      { id: 'summits', label: 'Summits & G7' },
      { id: 'elections', label: 'Elections' },
      { id: 'policy', label: 'AI & Policy' }
    ],
    entertainment: [
      { id: 'all', label: 'All Genres' },
      { id: 'cinema', label: 'Movies & Oscars' },
      { id: 'music', label: 'Music Festivals' },
      { id: 'redcarpet', label: 'Red Carpet' }
    ],
    breaking: [
      { id: 'all', label: 'All Wire Alerts' },
      { id: 'urgent', label: 'Urgent Bulletins' },
      { id: 'global', label: 'Global News' }
    ]
  };

  const filteredItems = useMemo(() => {
    let result = [...MEDIA_ITEMS];

    if (selectedCategory !== 'all') {
      result = result.filter((v) => v.category === selectedCategory);
    }

    if (selectedSubcat !== 'all') {
      result = result.filter((v) => 
        v.sport === selectedSubcat || 
        (v.tags && v.tags.some(t => t.toLowerCase().includes(selectedSubcat.toLowerCase())))
      );
    }

    if (selectedFormat === '4k') result = result.filter((v) => v.formats.includes('4K'));
    if (selectedFormat === '1080p') result = result.filter((v) => v.formats.includes('1080p'));
    if (selectedFormat === 'exclusive') result = result.filter((v) => v.exclusive);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.desc.toLowerCase().includes(q) ||
          (v.tags && v.tags.some((t) => t.toLowerCase().includes(q)))
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
  }, [selectedCategory, selectedSubcat, selectedFormat, searchQuery, sortOrder]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setSelectedSubcat('all');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans pt-16 flex">
      
      {/* ENTERPRISE MEDIA SIDEBAR */}
      <aside className="w-64 bg-slate-50 border-r border-slate-200 p-5 hidden md:flex flex-col gap-6 shrink-0 shadow-xs">
        {/* Categories (Main Sections in Sidebar) */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3 px-2 flex items-center gap-2">
            <FolderKanban size={14} className="text-red-600" /> Media Categories
          </div>
          <div className="flex flex-col gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-white text-red-600 border border-slate-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                  selectedCategory === cat.id ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Master Format Filter */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3 px-2">
            Master Format
          </div>
          <div className="flex flex-col gap-1">
            {[
              { id: 'all', label: 'All Resolutions' },
              { id: '4k', label: '4K Ultra HD' },
              { id: '1080p', label: '1080p Full HD' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFormat(f.id)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedFormat === f.id
                    ? 'text-red-600 font-bold bg-white border border-slate-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* MAIN WORKSPACE CONTENT */}
      <main className="flex-1 p-6 md:p-8 w-full flex flex-col gap-6 bg-white">
        
        {/* TOP TAXONOMY HORIZONTAL BAR (Rendered for current active category) */}
        {selectedCategory !== 'all' && subcategoriesMap[selectedCategory] && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none bg-slate-50 p-2.5 rounded-2xl border border-slate-200 shadow-xs">
            {subcategoriesMap[selectedCategory].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubcat(sub.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedSubcat === sub.id
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}

        {/* TOOLBAR & SEARCH */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          
          {/* Search Input */}
          <div className="w-full sm:w-80 flex items-center bg-white border border-slate-200 rounded-xl px-3.5 py-2">
            <Search size={15} className="text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search media, sports, tags..."
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs font-medium text-slate-900 w-full placeholder-slate-400"
            />
          </div>

          {/* View Toggle & Sorting */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs font-mono text-slate-500">
              <strong className="text-slate-900">{filteredItems.length}</strong> assets
            </span>

            <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2 outline-none cursor-pointer"
              >
                <option value="latest">Sort: Newest</option>
                <option value="oldest">Sort: Oldest</option>
                <option value="az">Sort: Title A-Z</option>
              </select>

              <div className="flex bg-white p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'grid' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-400'
                  }`}
                >
                  <Grid size={15} />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'table' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-400'
                  }`}
                >
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ASSET DISPLAY */}
        {filteredItems.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-16 text-center flex flex-col items-center justify-center gap-3">
            <Search size={32} className="text-slate-400" />
            <h3 className="text-base font-bold text-slate-900">No media items match your search</h3>
            <p className="text-xs text-slate-500">Try adjusting your filters or keywords</p>
          </div>
        ) : viewMode === 'grid' ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isFav = favorites?.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 transition-all flex flex-col justify-between group relative shadow-xs"
                >
                  <div>
                    <div className="relative aspect-video bg-slate-100 overflow-hidden cursor-pointer" onClick={() => navigate(`/video/${item.id}`)}>
                      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                        <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow">
                          <Play size={16} fill="currentColor" className="ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-slate-900 text-[9px] font-bold px-2 py-0.5 rounded border border-slate-200 uppercase">
                        {item.category}
                      </span>
                      {item.duration && (
                        <span className="absolute bottom-3 right-3 bg-white/95 text-slate-900 text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-xs border border-slate-200">
                          {item.duration}
                        </span>
                      )}

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item.id);
                        }}
                        className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center shadow transition-transform hover:scale-110 border ${
                          isFav ? 'bg-white text-red-600 border-red-200' : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white hover:text-red-600'
                        }`}
                      >
                        <Heart size={15} className={isFav ? 'fill-red-600' : ''} />
                      </button>
                    </div>

                    <div className="p-4 flex flex-col gap-3 cursor-pointer" onClick={() => navigate(`/video/${item.id}`)}>
                      <h3 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
                        {item.title}
                      </h3>

                      {/* Metadata Row: Date, Duration, Timestamps */}
                      <div className="flex items-center flex-wrap gap-2 text-[11px] text-slate-500 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-slate-400" />
                          {item.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} className="text-slate-400" />
                          {item.duration || '0:00'}
                        </span>
                        {item.timestamps && item.timestamps.length > 0 && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Layers size={12} className="text-slate-400" />
                              {item.timestamps.length} timestamps
                            </span>
                          </>
                        )}
                      </div>

                      {/* Tags Badges */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200"
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
                    <div className="flex items-center gap-1.5">
                      {item.formats.map((fmt) => (
                        <span
                          key={fmt}
                          className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded font-mono"
                        >
                          {fmt}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => navigate(`/video/${item.id}`)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer border border-slate-200 transition-colors"
                    >
                      <Download size={13} className="text-red-600" /> Download
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Fav</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Formats</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((item) => {
                  const isFav = favorites?.includes(item.id);
                  return (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <button onClick={() => toggleFavorite(item.id)} className="text-slate-400 hover:text-red-600">
                          <Heart size={15} className={isFav ? 'text-red-600 fill-red-600' : ''} />
                        </button>
                      </td>
                      <td onClick={() => navigate(`/video/${item.id}`)} className="p-4 font-bold text-slate-900 cursor-pointer">
                        <span className="line-clamp-1">{item.title}</span>
                      </td>
                      <td className="p-4 text-slate-500 uppercase font-semibold">{item.category}</td>
                      <td className="p-4 font-mono text-red-600 font-bold">{item.formats.join(', ')}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => navigate(`/video/${item.id}`)} className="bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer">
                          Export
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
