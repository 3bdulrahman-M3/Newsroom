import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 py-8 px-6 text-center text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-['Bebas_Neue'] text-xl tracking-widest text-white">
            RED<span className="text-red-500">WIRE</span>
          </span>
          <span className="text-slate-700">|</span>
          <span>© 2026 Enterprise Broadcast Distribution Platform</span>
        </div>
        <div>
          Client Portal & Newsroom Media Wire
        </div>
      </div>
    </footer>
  );
}
