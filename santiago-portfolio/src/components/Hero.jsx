import React from 'react';

export default function Hero() {
  return (
   // Cambia la etiqueta de inicio por esta:
<section id="perfil" className="scroll-mt-28 pt-32 pb-24 md:pt-40 md:pb-32 flex flex-col justify-center border-b border-slate-900/60">

      <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-4">
        Buscando nuevos retos en los que emplear mis conocimientos
      </p>
      <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-6">
        Santiago Fernández
      </h1>
      <h2 className="text-xl md:text-2xl text-slate-400 font-light mb-8 max-w-2xl leading-relaxed">
        Desarrollador <span className="text-slate-200 font-normal">Full Stack Junior</span> especializado en <span className="text-indigo-300 font-normal">IA & Big Data</span>
      </h2>
      <p className="text-slate-400 text-sm max-w-2xl leading-relaxed font-light mb-10">
        Técnico Superior en DAW con especialización en Inteligencia Artificial. Experiencia práctica en entorno un entorno corporativo aplicando el ecosistema Java (Spring Boot), React, Python para análisis de datos y n8n para la automatización de procesos.
      </p>
      <div className="flex gap-6 text-xs font-medium tracking-widest uppercase">
      <a 
  href="https://www.linkedin.com/in/santiago-fernandez-ehimatie-0716a8307/" 
  target="_blank" 
  rel="noreferrer" 
  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-lg shadow-indigo-600/10"
>
  Contacto directo
</a>

        <a href="https://github.com/sferehi18" target="_blank" rel="noreferrer" className="border border-slate-800 hover:border-slate-600 text-slate-300 px-6 py-3 rounded-lg transition-all duration-200">
          GitHub
        </a>
         {/* EMAIL BUTTON */}
        <a 
          href="mailto:Sferehi18@gmail.com"
          className="border border-indigo-500 text-indigo-300 hover:bg-indigo-500 hover:text-white px-6 py-3 rounded-lg transition-all duration-200"
        >
          Email
        </a>
      </div>
    </section>
  );
}
