import React, { useState } from 'react';

export default function Footer() {
  const [copiado, setCopiado] = useState(false);

  const copiarEmail = async () => {
    await navigator.clipboard.writeText("Sferehi18@gmail.com");

    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <footer className="w-full border-t border-slate-900/60 bg-[#0b0f19] font-sans py-12 mt-16">
      <div className="mx-auto flex flex-col md:flex-row max-w-4xl items-center justify-between px-8 gap-6 text-xs tracking-widest text-slate-500 uppercase">

        {/* Copyright */}
        <div>
          © {new Date().getFullYear()} santiago
          <span className="text-slate-400"> Fernández Ehimatie</span>
        </div>

        {/* Contacto */}
        <div className="flex items-center gap-5 font-medium">

          <a
            href="mailto:Sferehi18@gmail.com"
            className="hover:text-white transition-colors duration-200"
          >
            Email
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/sferehi18"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            GitHub
          </a>

          {/* 👇 ÚLTIMA OPCIÓN (COPIAR EMAIL) */}
          <button
            onClick={copiarEmail}
            className="ml-2 px-3 py-1 rounded-md border border-slate-800 text-indigo-400 hover:text-white hover:border-indigo-500/40 hover:bg-slate-900/40 transition-all duration-200 cursor-pointer"
          >
            {copiado ? "✓ Copiado" : "Copiar email"}
          </button>

        </div>

      </div>
    </footer>
  );
}