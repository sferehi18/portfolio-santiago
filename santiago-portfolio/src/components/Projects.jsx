import React from 'react';

export default function Projects() {
  return (
    <section
      id="proyectos"
      className="py-24 md:py-32 border-b border-slate-900/60"
    >
      <h3 className="reveal text-xs font-bold tracking-widest uppercase text-slate-500 mb-16">
        Proyectos Destacados
      </h3>

      <div className="space-y-24">

        {/* Proyecto 1 */}
        <div className="reveal reveal-delay-1 group flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-md">
            <h4 className="text-lg font-medium text-white mb-3 group-hover:text-indigo-400 transition-colors duration-200">
              Football Predictor (Machine Learning & Big Data)
            </h4>
            <p className="text-slate-400 text-xs tracking-widest uppercase mb-4 font-light">
              Python • Pandas • Scikit-learn • Redes Neuronales
            </p>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              Modelo predictivo enfocado al análisis y pronóstico de resultados de fútbol basado en datos históricos. Implementación de procesos ETL, limpieza y transformación de datos, entrenamiento de modelos de Machine Learning y optimización de precisión mediante ajuste de hiperparámetros.
            </p>
          </div>

          <a
            href="https://github.com/sferehi18/Football-predictor-TFG"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium tracking-widest uppercase text-slate-500 hover:text-white border-b border-slate-800 hover:border-white pb-1 transition-all duration-200 shrink-0"
          >
            Ver Código
          </a>
        </div>

        {/* Proyecto 2 */}
        <div className="reveal reveal-delay-2 group flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-md">
            <h4 className="text-lg font-medium text-white mb-3 group-hover:text-indigo-400 transition-colors duration-200">
              Plataforma de Gestión de Contenidos Educativos
            </h4>
            <p className="text-slate-400 text-xs tracking-widest uppercase mb-4 font-light">
              Java (Spring Boot) • React.js • JWT • MySQL
            </p>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              Arquitectura desacoplada para la gestión jerárquica de material didáctico. Integración de seguridad robusta mediante JSON Web Tokens (JWT) para la protección de accesos, junto con una base de datos relacional optimizada para consultas y almacenamiento eficiente.
            </p>
          </div>

          <a
            href="https://github.com/sferehi18/study-app"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium tracking-widest uppercase text-slate-500 hover:text-white border-b border-slate-800 hover:border-white pb-1 transition-all duration-200 shrink-0"
          >
            Ver Código
          </a>
        </div>

      </div>
    </section>
  );
}