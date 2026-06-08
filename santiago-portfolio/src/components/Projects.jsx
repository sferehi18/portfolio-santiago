import React from 'react';

export default function Projects() {
  return (
    <section id="proyectos" className="py-24 md:py-32 border-b border-slate-900/60">
      <h3 className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-16">
        Proyectos Destacados
      </h3>
      
      <div className="space-y-24">

        {/* Proyecto 2 */}
        <div className="group flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-md">
            <h4 className="text-lg font-medium text-white mb-3 group-hover:text-indigo-400 transition-colors duration-200">
              Plataforma de Gestión de Contenidos Educativos
            </h4>
            <p className="text-slate-400 text-xs tracking-widest uppercase mb-4 font-light">
              Java (Spring Boot) • React.js • JWT • MySQL
            </p>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              Arquitectura desacoplada para la gestión jerárquica de material didáctico. Integración de seguridad robusta mediante cifrado y JSON Web Tokens para la protección de accesos, complementado con el almacenamiento optimizado en bases de datos relacionales.
            </p>
          </div>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-xs font-medium tracking-widest uppercase text-slate-500 hover:text-white border-b border-slate-800 hover:border-white pb-1 transition-all duration-200 shrink-0">
            Ver Código ↗
          </a>
        </div>
      </div>
    </section>
  );
}
