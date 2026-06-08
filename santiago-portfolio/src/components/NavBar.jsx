import React from 'react';

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/70 backdrop-blur-md font-sans">
      <div className="mx-auto flex max-w-6xl h-16 items-center justify-between px-6">
        
        {/* Identidad / Logo izquierdo actualizado */}
        <div className="text-sm font-semibold tracking-wider text-white select-none">
          Santiago<span className="text-indigo-400">.ehimatie</span>
        </div>

        {/* Enlaces de navegación derechos */}
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
        </div>

      </div>
    </nav>
  );
}
