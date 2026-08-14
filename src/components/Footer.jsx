import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 px-6 text-center">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-['Bebas_Neue'] text-xl tracking-widest text-slate-900">
            RED<span className="text-[#e63946]">WIRE</span>
          </span>
          <span className="text-slate-300">|</span>
          <span>© 2026 Premium Video Distribution Platform</span>
        </div>
        <div>
          Prototype designed & built for <span className="text-[#e63946] font-semibold">REDWIRE</span>
        </div>
      </div>
    </footer>
  );
}
