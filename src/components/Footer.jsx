import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 px-6 text-slate-600">
      <div className="w-full px-6 md:px-12 mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
        <div className="flex items-center gap-2">
          <span className="font-['Bebas_Neue'] text-xl tracking-widest text-slate-900">
            RED<span className="text-red-600">WIRE</span>
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600 font-medium">© 2026 Enterprise Broadcast Distribution Platform</span>
        </div>
        <div className="text-slate-500 font-medium font-mono text-[11px]">
          Client Portal & Newsroom Media Wire
        </div>
      </div>
    </footer>
  );
}
