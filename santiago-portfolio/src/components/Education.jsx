import React from 'react';

export default function Education() {
  return (
    <section id="formacion" className="py-24 md:py-32 mb-16">
      <h3 className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-16">
        Trayectoria Académica
      </h3>
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-2">
          <div>
            <h4 className="text-base font-medium text-white">Curso de Especialización en Inteligencia Artificial y Big Data</h4>
            <p className="text-slate-400 text-sm font-light">IES Zaidín Vergeles</p>
          </div>
          <span className="text-xs font-medium tracking-widest uppercase text-slate-500">2026</span>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start gap-2">
          <div>
            <h4 className="text-base font-medium text-white">Técnico Superior en Desarrollo de Aplicaciones Web (DAW)</h4>
            <p className="text-slate-400 text-sm font-light">IES Kursaal</p>
          </div>
          <span className="text-xs font-medium tracking-widest uppercase text-slate-500">2025</span>

          
        </div>

         <div className="flex flex-col md:flex-row justify-between items-start gap-2">
          <div>
            <h4 className="text-base font-medium text-white">Bachillerato en Ciencias y Tecnología</h4>
            <p className="text-slate-400 text-sm font-light">IES Isla Verde</p>
          </div>
          <span className="text-xs font-medium tracking-widest uppercase text-slate-500">2022</span>

          
        </div>

        
      </div>
    </section>
  );
}
