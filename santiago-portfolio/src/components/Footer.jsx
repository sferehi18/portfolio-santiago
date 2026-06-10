import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-900/60 bg-[#0b0f19] font-sans py-12 mt-16">
      <div className="mx-auto flex flex-col md:flex-row max-w-4xl items-center justify-between px-8 gap-4 text-xs tracking-widest text-slate-500 uppercase">
        
        {/* Copyright / Identidad izquierda */}
        <div>
          © {new Date().getFullYear()} santiago<span className="text-slate-400">Fernández Ehimatie</span>
        </div>

        {/* Enlaces de contacto y redes derechos */}
        <div className="flex items-center gap-6 font-medium">
          <a href="mailto:Sferehi18@gmail.com" className="transition-colors duration-200 hover:text-white">
            Email
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="transition-colors duration-200 hover:text-white">
            LinkedIn
          </a>
          <a href="https://github.com/sferehi18" target="_blank" rel="noreferrer" className="transition-colors duration-200 hover:text-white">
            GitHub
          </a>
        </div>

      </div>
    </footer>
  );
}
