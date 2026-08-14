import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a] py-8 px-6 text-center">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="font-['Bebas_Neue'] text-xl tracking-widest text-white">
            RED<span className="text-[#e63946]">WIRE</span>
          </span>
          <span className="text-neutral-600">|</span>
          <span>© 2026 Premium Video Distribution Platform</span>
        </div>
        <div>
          Prototype designed & built by{' '}
          <a
            href="https://hassan-gallery.site"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e63946] hover:underline font-semibold"
          >
            hassan
          </a>
        </div>
      </div>
    </footer>
  );
}
