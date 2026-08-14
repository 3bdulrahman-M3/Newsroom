import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MEDIA_ITEMS } from '../data/mediaData';
import { useUser } from '../context/UserContext';
import { 
  Search, Play, Download, Grid, List, FolderKanban, Heart, Lock, 
  ShoppingBag, Sparkles, Filter, ShieldCheck, Check
} from 'lucide-react';

export default function Feed({ searchQuery, setSearchQuery, favorites, toggleFavorite }) {
  const navigate = useNavigate();
  const { isSubscriber, addToCart, language } = useUser();
  const isAr = language === 'ar';

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [sortOrder, setSortOrder] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');

  // Natural Language / AI Search Fake UI Indicator
  const [aiSearchActive, setAiSearchActive] = useState(false);

  const categories = [
    { id: 'all', label: isAr ? 'كل الوسائط' : 'All Media', count: MEDIA_ITEMS.length },
    { id: 'sports', label: isAr ? 'الرياضة' : 'Sports Wire', count: MEDIA_ITEMS.filter(v => v.category === 'sports').length },
    { id: 'politics', label: isAr ? 'السياسة' : 'Politics & Gov', count: MEDIA_ITEMS.filter(v => v.category === 'politics').length },
    { id: 'entertainment', label: isAr ? 'الفن والترفيه' : 'Hollywood & Arts', count: MEDIA_ITEMS.filter(v => v.category === 'entertainment').length },
    { id: 'breaking', label: isAr ? 'أخبار عاجلة' : 'Breaking News', count: MEDIA_ITEMS.filter(v => v.category === 'breaking').length }
  ];

  const sportsList = [
    { id: 'all', label: isAr ? 'جميع الألعاب' : 'All Sports' },
    { id: 'football', label: isAr ? 'كرة القدم' : 'Football' },
    { id: 'tennis', label: isAr ? 'التنس' : 'Tennis' },
    { id: 'motorsport', label: isAr ? 'فورمولا 1' : 'Motorsport / F1' }
  ];

  const filteredItems = useMemo(() => {
    let result = [...MEDIA_ITEMS];

    if (selectedCategory !== 'all') {
      result = result.filter((v) => v.category === selectedCategory);
    }

    if (selectedSport !== 'all') {
      result = result.filter((v) => v.sport === selectedSport);
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
  }, [selectedCategory, selectedSport, selectedFormat, searchQuery, sortOrder]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pt-16 flex">
      
      {/* ENTERPRISE MEDIA SIDEBAR */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-5 hidden md:flex flex-col gap-6 shrink-0 shadow-md">
        {/* Categories */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 px-2 flex items-center gap-2">
            <FolderKanban size={14} className="text-red-500" /> {isAr ? 'الأقسام والتصنيفات' : 'Media Categories'}
          </div>
          <div className="flex flex-col gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-800 text-white border border-slate-700 shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                  selectedCategory === cat.id ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Sports Taxonomy Filter */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">
            {isAr ? 'التصنيف الرياضي' : 'Sports Taxonomy'}
          </div>
          <div className="flex flex-col gap-1">
            {sportsList.map((sp) => (
              <button
                key={sp.id}
                onClick={() => setSelectedSport(sp.id)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedSport === sp.id
                    ? 'text-red-400 font-bold bg-red-950/40 border border-red-800/60'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {sp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Resolution Filter */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">
            {isAr ? 'جودة ودقة الفيديو' : 'Master Resolution'}
          </div>
          <div className="flex flex-col gap-1">
            {[
              { id: 'all', label: isAr ? 'جميع الجودات' : 'All Resolutions' },
              { id: '4k', label: '4K Ultra HD' },
              { id: '1080p', label: '1080p Full HD' },
              { id: 'exclusive', label: isAr ? 'حصرى فقط' : 'Exclusives Only' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFormat(f.id)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedFormat === f.id
                    ? 'text-red-400 font-bold bg-slate-800 border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* MAIN WORKSPACE CONTENT */}
      <main className="flex-1 p-6 md:p-8 w-full flex flex-col gap-6">
        
        {/* TOOLBAR & AI SEARCH UI */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          
          {/* Search Input */}
          <div className="w-full sm:w-80 flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2">
            <Search size={15} className="text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder={isAr ? 'بحث في الوسائط والأخبار...' : 'Search media, sports, tags...'}
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs font-medium text-white w-full placeholder-slate-500"
            />
          </div>

          {/* View Toggle & Sorting */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs font-mono text-slate-400">
              <strong className="text-white">{filteredItems.length}</strong> {isAr ? 'وسائط مادية' : 'assets'}
            </span>

            <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold rounded-xl px-3 py-2 outline-none cursor-pointer"
              >
                <option value="latest">Sort: Newest</option>
                <option value="oldest">Sort: Oldest</option>
                <option value="az">Sort: Title A-Z</option>
              </select>

              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'grid' ? 'bg-slate-800 text-white' : 'text-slate-500'
                  }`}
                >
                  <Grid size={15} />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'table' ? 'bg-slate-800 text-white' : 'text-slate-500'
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
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-16 text-center flex flex-col items-center justify-center gap-3">
            <Search size={32} className="text-slate-600" />
            <h3 className="text-base font-bold text-white">No media items match your search</h3>
            <p className="text-xs text-slate-400">Try adjusting your filters or keywords</p>
          </div>
        ) : viewMode === 'grid' ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isFav = favorites?.includes(item.id);
              const isCleared = item.rightsStatus === 'cleared';
              return (
                <div
                  key={item.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between group relative"
                >
                  <div>
                    <div className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer" onClick={() => navigate(`/video/${item.id}`)}>
                      <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 group-hover:scale-110 transition-transform shadow">
                        <Play size={16} fill="currentColor" className="ml-0.5" />
                      </div>
                      <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                        {item.category}
                      </span>
                      {item.duration && (
                        <span className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                          {item.duration}
                        </span>
                      )}

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item.id);
                        }}
                        className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center shadow transition-transform hover:scale-110 ${
                          isFav ? 'bg-white text-red-600' : 'bg-slate-900/80 text-white hover:bg-white hover:text-red-600'
                        }`}
                      >
                        <Heart size={15} className={isFav ? 'fill-red-600' : ''} />
                      </button>
                    </div>

                    <div className="p-4 flex flex-col gap-2 cursor-pointer" onClick={() => navigate(`/video/${item.id}`)}>
                      <h3 className="font-bold text-sm text-white line-clamp-2 group-hover:text-red-400 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono">
                        <span>{item.date}</span>
                        <span>•</span>
                        <span className={isCleared ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                          Rights: {item.rightsStatus.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Bar (Subscriber vs Ad-hoc Buyer) */}
                  <div className="p-4 pt-0 border-t border-slate-800/80 mt-2 flex items-center justify-between">
                    {isSubscriber ? (
                      isCleared ? (
                        <button
                          onClick={() => navigate(`/video/${item.id}`)}
                          className="w-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Download size={13} /> Export & Download
                        </button>
                      ) : (
                        <button
                          disabled
                          className="w-full bg-slate-950 text-slate-500 text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 border border-slate-850 opacity-60 cursor-not-allowed"
                          title={item.restrictions}
                        >
                          <Lock size={13} /> Rights Restricted
                        </button>
                      )
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                      >
                        <ShoppingBag size={13} /> Buy License • ${item.price}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Fav</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Rights Status</th>
                  <th className="p-4">Formats</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredItems.map((item) => {
                  const isFav = favorites?.includes(item.id);
                  const isCleared = item.rightsStatus === 'cleared';
                  return (
                    <tr key={item.id} className="hover:bg-slate-850 transition-colors">
                      <td className="p-4">
                        <button onClick={() => toggleFavorite(item.id)} className="text-slate-400 hover:text-red-500">
                          <Heart size={15} className={isFav ? 'text-red-500 fill-red-500' : ''} />
                        </button>
                      </td>
                      <td onClick={() => navigate(`/video/${item.id}`)} className="p-4 font-bold text-white cursor-pointer">
                        <span className="line-clamp-1">{item.title}</span>
                      </td>
                      <td className="p-4 text-slate-400 uppercase font-semibold">{item.category}</td>
                      <td className="p-4 font-mono font-bold">
                        <span className={isCleared ? 'text-emerald-400' : 'text-amber-400'}>
                          {item.rightsStatus.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-red-400 font-bold">{item.formats.join(', ')}</td>
                      <td className="p-4 text-right">
                        {isSubscriber ? (
                          isCleared ? (
                            <button onClick={() => navigate(`/video/${item.id}`)} className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                              Export
                            </button>
                          ) : (
                            <span className="text-slate-500 font-mono text-[10px]">Restricted</span>
                          )
                        ) : (
                          <button onClick={() => addToCart(item)} className="bg-amber-500 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold">
                            Buy ${item.price}
                          </button>
                        )}
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
