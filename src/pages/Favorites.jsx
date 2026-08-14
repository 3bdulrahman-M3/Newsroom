import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { VIDEOS } from '../data/videos';
import { Play, Download, Heart, ArrowLeft, Trash2 } from 'lucide-react';

export default function Favorites({ favorites, toggleFavorite }) {
  const navigate = useNavigate();
  const favoriteVideos = VIDEOS.filter((v) => favorites.includes(v.id));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-6 pt-6 flex flex-col gap-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Heart size={14} className="fill-red-600" /> Favorite Assets
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Saved Broadcast Media</h1>
            <p className="text-xs text-slate-500 mt-1">
              Quick access to your bookmarked news and sports video clips.
            </p>
          </div>

          <button
            onClick={() => navigate('/feed')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition-all w-fit"
          >
            <ArrowLeft size={14} /> Back to Studio Feed
          </button>
        </div>

        {/* Favorites Grid */}
        {favoriteVideos.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center flex flex-col items-center justify-center gap-4 shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
              <Heart size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No favorites added yet</h3>
            <p className="text-xs text-slate-500 max-w-sm">
              Browse the Studio Feed and click the heart icon on any video asset to save it here for fast access.
            </p>
            <Link
              to="/feed"
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all mt-2"
            >
              Explore Media Studio Feed
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-red-500/40 hover:shadow-md transition-all flex flex-col justify-between group relative"
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

                    {/* Remove Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(video.id);
                      }}
                      className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-red-600 flex items-center justify-center shadow transition-transform hover:scale-110"
                      title="Remove from favorites"
                    >
                      <Heart size={16} className="fill-red-600" />
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
                    <Download size={13} /> View & Export
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
