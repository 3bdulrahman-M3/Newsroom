import React, { useState } from 'react';
import { SCRIPTS } from '../data/mediaData';
import { useUser } from '../context/UserContext';
import { FileText, Calendar, User, Search, ArrowRight, Share2, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Scripts() {
  const { language } = useUser();
  const isAr = language === 'ar';
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filteredScripts = SCRIPTS.filter((s) => {
    const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.titleAr.includes(search) ||
      s.contentEn.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pt-20 pb-16">
      <div className="w-full px-6 md:px-12 flex flex-col gap-6">
        
        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
              <FileText size={14} /> {isAr ? 'الأخبار والسكريبتات المنشورة' : 'Newsroom Wire Scripts'}
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              {isAr ? 'أحدث التقرير والأخبار المصاحبة للوسائط' : 'Latest Scripts & Newsroom Releases'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {isAr ? 'عرض وتنزيل السكريبتات الجاهزة للبث الإخباري باللغتين العربية والإنجليزية.' : 'Editorial copy, broadcast scripts, and transcriptions matching released media assets.'}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 w-full md:w-72">
            <Search size={15} className="text-slate-500 mr-2 shrink-0" />
            <input
              type="text"
              placeholder={isAr ? 'بحث في الأخبار والسكريبتات...' : 'Search scripts...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-white w-full placeholder-slate-500"
            />
          </div>
        </div>

        {/* Scripts List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredScripts.map((script) => (
            <div key={script.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between gap-4 shadow-sm">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono border-b border-slate-800 pb-3">
                  <span className="text-red-400 font-bold uppercase bg-red-950/60 border border-red-800 px-2 py-0.5 rounded">
                    {script.category}
                  </span>
                  <span className="flex items-center gap-1"><Calendar size={13} /> {script.date}</span>
                </div>

                <h2 className="text-lg font-bold text-white">
                  {isAr ? script.titleAr : script.title}
                </h2>

                <div className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-850 font-sans">
                  {isAr ? script.contentAr : script.contentEn}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                <span className="text-slate-400 flex items-center gap-1 font-mono">
                  <User size={13} /> {script.author}
                </span>

                {script.relatedMediaId && (
                  <Link
                    to={`/video/${script.relatedMediaId}`}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <BookOpen size={14} /> {isAr ? 'مشاهدة الفيديو المرفق' : 'View Related Media'}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
