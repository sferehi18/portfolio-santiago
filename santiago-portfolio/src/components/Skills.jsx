import React from 'react';

export default function Skills() {
  return (
    <section id="competencias" className="py-24 md:py-32 border-b border-slate-900/60">
      <h3 className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-16">
        Stack Tecnológico
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 text-sm font-light">
        <div>
          <span className="block font-medium text-slate-300 mb-2">Desarrollo de Software</span>
          <p className="text-slate-400 leading-relaxed">Java (Spring Boot), JavaScript (React.js), PHP (Laravel), C++, HTML5, CSS3.</p>
        </div>
        <div>
          <span className="block font-medium text-slate-300 mb-2">Inteligencia Artificial & Datos</span>
          <p className="text-slate-400 leading-relaxed">Python, Jupyter Notebook, R, n8n, Procesamiento de datos masivos (Big Data).</p>
        </div>
        <div>
          <span className="block font-medium text-slate-300 mb-2">Cloud & Infraestructura</span>
          <p className="text-slate-400 leading-relaxed">Amazon Web Services (AWS) para despliegues escalables y automatización.</p>
        </div>
        <div>
          <span className="block font-medium text-slate-300 mb-2">Bases de Datos & Flujo</span>
          <p className="text-slate-400 leading-relaxed">MySQL, PostgreSQL, Gestión de arquitecturas colaborativas con Git y GitHub.</p>
        </div>
      </div>
    </section>
  );
}
