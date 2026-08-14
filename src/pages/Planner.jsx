import React, { useState } from 'react';
import { UPCOMING_EVENTS } from '../data/mediaData';
import { useUser } from '../context/UserContext';
import { CalendarDays, ShieldCheck, MapPin, Clock, Trophy, Radio, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Planner() {
  const { language } = useUser();
  const isAr = language === 'ar';
  const [filter, setFilter] = useState('all');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pt-20 pb-16">
      <div className="w-full px-6 md:px-12 flex flex-col gap-6">
        
        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Radio size={14} /> {isAr ? 'مخطط التغطيات الرياضية والأحداث' : 'Sports & Events Coverage Planner'}
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              {isAr ? 'جدول التغطيات والبث المباشر القادم' : 'Upcoming Satellite & Live Ingest Schedule'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {isAr ? 'تابع المواعيد القادمة للبطولات والأحداث المجدولة للبث والتصدير.' : 'Plan ahead for global sports tournaments, press conferences, and satellite feeds.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {['all', 'Today', 'Tomorrow', 'This Week'].map((timeFrame) => (
              <button
                key={timeFrame}
                onClick={() => setFilter(timeFrame)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filter === timeFrame
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                {timeFrame === 'all' ? (isAr ? 'الكل' : 'All Dates') : timeFrame}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule List Timeline */}
        <div className="flex flex-col gap-4">
          {UPCOMING_EVENTS.filter((e) => filter === 'all' || e.date === filter).map((evt) => (
            <div
              key={evt.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:border-slate-700 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 text-red-500 flex items-center justify-center shrink-0">
                  <Trophy size={22} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-[11px] font-mono">
                    <span className="bg-red-950 text-red-400 font-bold px-2 py-0.5 rounded border border-red-800 uppercase">
                      {evt.date} • {evt.time}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <MapPin size={12} /> {evt.location}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mt-1">
                    {isAr ? evt.eventAr : evt.event}
                  </h3>

                  <span className="text-xs text-slate-400 font-medium">
                    {isAr ? 'بطولة:' : 'Competition:'} <strong className="text-slate-200">{evt.competition}</strong>
                  </span>
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-2 shrink-0 border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-lg flex items-center gap-1.5">
                  <ShieldCheck size={14} /> {evt.coverageStatus}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {evt.rights}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
