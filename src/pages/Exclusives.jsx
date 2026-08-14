import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MEDIA_ITEMS } from '../data/mediaData';
import { useUser } from '../context/UserContext';
import { 
  Search, Play, Download, Grid, List, Star, Lock, ShoppingBag, ShieldCheck, Heart
} from 'lucide-react';

export default function Exclusives({ favorites, toggleFavorite }) {
  const navigate = useNavigate();
  const { isSubscriber, addToCart, language } = useUser();
  const isAr = language === 'ar';

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  // Filter only exclusive items
  const exclusiveItems = useMemo(() => {
    let result = MEDIA_ITEMS.filter((v) => v.exclusive);

    if (selectedCategory !== 'all') {
      result = result.filter((v) => v.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.desc.toLowerCase().includes(q) ||
          (v.tags && v.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-6">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900 border border-amber-800/60 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-500/30">
              {isAr ? 'المحتوى الحصري' : 'Exclusive Masters Pool'}
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              {isAr ? 'التغطيات والأصول الحصرية' : 'Exclusives Only'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {isAr ? 'استعراض وتحميل الأصول الإعلامية المتاحة حائطة النشر والحصرية فقط.' : 'Premium exclusive broadcast footage, match highlights, and red carpet masters.'}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 w-full md:w-80">
            <Search size={15} className="text-slate-500 mr-2 shrink-0" />
            <input
              type="text"
              placeholder={isAr ? 'بحث في التغطيات الحصرية...' : 'Search exclusive assets...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-white w-full placeholder-slate-500 font-medium"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center gap-2 overflow-x-auto">
            {['all', 'sports', 'politics', 'entertainment', 'breaking'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat === 'all' ? (isAr ? 'كل الحصريات' : 'All Exclusives') : cat}
              </button>
            ))}
          </div>

          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
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

        {/* Content Display */}
        {exclusiveItems.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-16 text-center flex flex-col items-center justify-center gap-3">
            <Star size={32} className="text-amber-500" />
            <h3 className="text-base font-bold text-white">No exclusive assets match your query</h3>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exclusiveItems.map((item) => {
              const isFav = favorites?.includes(item.id);
              const isCleared = item.rightsStatus === 'cleared';
              return (
                <div
                  key={item.id}
                  className="bg-slate-900 border border-amber-800/40 rounded-2xl overflow-hidden hover:border-amber-500 transition-all flex flex-col justify-between group relative shadow-md"
                >
                  <div onClick={() => navigate(`/video/${item.id}`)} className="cursor-pointer">
                    <div className="relative aspect-video bg-slate-950 overflow-hidden">
                      <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 group-hover:scale-110 transition-transform shadow">
                        <Play size={16} fill="currentColor" className="ml-0.5" />
                      </div>
                      <span className="absolute top-3 left-3 bg-amber-400 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded uppercase">
                        ⭐ EXCLUSIVE
                      </span>
                      {item.duration && (
                        <span className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                          {item.duration}
                        </span>
                      )}
                    </div>

                    <div className="p-4 flex flex-col gap-2">
                      <h3 className="font-bold text-sm text-white line-clamp-2 group-hover:text-amber-400 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono">
                        <span>{item.date}</span>
                        <span>•</span>
                        <span className="text-amber-400 font-bold">{item.formats.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-slate-800 mt-2 flex items-center justify-between">
                    {isSubscriber ? (
                      <button
                        onClick={() => navigate(`/video/${item.id}`)}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Download size={13} /> View & Export Master
                      </button>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <ShoppingBag size={13} /> Buy Exclusive • ${item.price}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Formats</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {exclusiveItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-850 transition-colors">
                    <td onClick={() => navigate(`/video/${item.id}`)} className="p-4 font-bold text-white cursor-pointer">
                      <span className="line-clamp-1">{item.title}</span>
                    </td>
                    <td className="p-4 text-amber-400 uppercase font-bold">{item.category}</td>
                    <td className="p-4 font-mono text-slate-400">{item.duration}</td>
                    <td className="p-4 font-mono font-bold text-white">{item.formats.join(', ')}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => navigate(`/video/${item.id}`)} className="bg-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg">
                        Export
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
