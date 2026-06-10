import React, { useState } from 'react';

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/70 backdrop-blur-md font-sans">
      
      <div className="mx-auto flex max-w-6xl h-16 items-center justify-between px-6">

        {/* Logo */}
        <div className="text-sm font-semibold tracking-wider text-white select-none">
          Santiago<span className="text-indigo-400">.Ehimatie</span>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8 text-xs font-medium tracking-widest uppercase text-slate-400">
          <a href="#perfil" className="hover:text-white">Perfil</a>
          <a href="#proyectos" className="hover:text-white">Proyectos</a>
          <a href="#competencias" className="hover:text-white">Tecnologías</a>
          <a href="#formacion" className="hover:text-white">Educación</a>

          <a
            href="/CV_Santiago_FE.pdf"
            download
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-semibold"
          >
            CV
          </a>
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-xs uppercase tracking-widest text-slate-300 bg-slate-900/90">
          <a onClick={() => setOpen(false)} href="#perfil">Perfil</a>
          <a onClick={() => setOpen(false)} href="#proyectos">Proyectos</a>
          <a onClick={() => setOpen(false)} href="#competencias">Tecnologías</a>
          <a onClick={() => setOpen(false)} href="#formacion">Educación</a>

          <a
            href="/CV_Santiago_FE.pdf"
            download
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-center"
          >
            Descargar CV
          </a>
        </div>
      )}
    </nav>
  );
}