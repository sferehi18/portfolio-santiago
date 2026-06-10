import React from 'react';

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/70 backdrop-blur-md font-sans">
      <div className="mx-auto flex max-w-6xl h-16 items-center justify-between px-6">
        
        {/* Logo */}
        <div className="text-sm font-semibold tracking-wider text-white select-none">
          Santiago<span className="text-indigo-400">.Ehimatie</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8 text-xs font-medium tracking-widest uppercase text-slate-400">
          <a href="#perfil" className="transition-colors duration-200 hover:text-white">
            Perfil
          </a>
          <a href="#proyectos" className="transition-colors duration-200 hover:text-white">
            Proyectos
          </a>
          <a href="#competencias" className="transition-colors duration-200 hover:text-white">
            Tecnologías
          </a>
          <a href="#formacion" className="transition-colors duration-200 hover:text-white">
            Educación
          </a>

          {/* BOTÓN CV */}
          <a
            href="/CV_Santiago_FE.pdf"
            download
            className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-semibold tracking-widest uppercase shadow-lg shadow-indigo-600/20 transition-all duration-200"
          >
            Descargar CV
          </a>
        </div>

      </div>
    </nav>
  );
}