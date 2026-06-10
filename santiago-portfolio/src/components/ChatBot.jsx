import React, { useState } from 'react';
import { MessageCircle, X } from "lucide-react";
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "¡Hola! Soy el asistente IA de Santiago. ¿Qué te gustaría saber sobre su experiencia o proyectos?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Definimos las preguntas recomendadas/base
const sugerencias = [
  "¿Cuáles son los proyectos principales de Santiago?",
  "¿Como es la personalidad de Santiago?",
  "¿En qué destaca Santiago como desarrollador?",
  "¿Cuál es la experiencia laboral de Santiago?",
  "¿Tiene experiencia en Inteligencia Artificial Santiago?",
];

  // 2. Lógica centralizada para enviar mensajes (reutilizable)
  const sendMessage = async (textToSend) => {
    if (!textToSend.trim() || loading) return;

    setMessages(prev => [...prev, { text: textToSend, isBot: false }]);
    setLoading(true);

    try {const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pregunta: textToSend })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { text: data.respuesta, isBot: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Lo siento, hubo un problema de conexión con mi servidor backend. Puedes contactar con Santiago en Sferehi18@gmail.com.", isBot: true }]);
    } finally {
      setLoading(false);
    }
  };

  // Handler para el formulario tradicional
  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(input);
    setInput(""); // Limpiar input
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 h-[480px] bg-chat-bg rounded-2xl shadow-2xl border border-chat-border flex flex-col overflow-hidden transition-all duration-300 transform scale-100">
          
          {/* Cabecera */}
          <div className="bg-brand-primary p-4 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
              <h3 className="font-semibold tracking-wide">Santiago IA Bot</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:bg-brand-hover p-1.5 rounded-lg transition-colors text-white font-bold"
            >
              ✕
            </button>
          </div>

          {/* Cuerpo del chat */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.isBot 
                    ? 'bg-chat-bg text-chat-text rounded-tl-none border border-chat-border' 
                    : 'bg-brand-primary text-white rounded-tr-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-chat-bg text-gray-400 p-3 rounded-2xl rounded-tl-none border border-chat-border text-sm flex gap-1 items-center shadow-sm">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          {/* 3. Bloque de Preguntas Recomendadas (Chips) */}
          <div className="px-3 pt-2 pb-1 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-1.5">
            {sugerencias.map((sugerencia, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(sugerencia)}
                disabled={loading}
                className="text-xs bg-white hover:bg-gray-100 text-gray-700 font-medium py-1 px-2.5 rounded-full border border-gray-200 shadow-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-left"
              >
                {sugerencia}
              </button>
            ))}
          </div>

          {/* Formulario de Input */}
          <form onSubmit={handleSend} className="p-3 bg-chat-bg border-t border-chat-border flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pregúntame sobre sus proyectos..."
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-focus focus:ring-1 focus:ring-brand-focus placeholder-gray-400 text-slate-900"
            />
            <button 
              type="submit" 
              className="bg-brand-primary hover:bg-brand-hover text-white font-medium px-4 py-2 rounded-xl text-sm transition-colors shadow-sm"
            >
              Enviar
            </button>
          </form>
        </div>
      )}

      {/* Botón flotante para abrir/cerrar */}
      {/* Botón flotante para abrir/cerrar */}
<button
  onClick={() => setIsOpen(!isOpen)}
  className="w-14 h-14 bg-brand-primary hover:bg-brand-hover text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 duration-200 relative"
>
  {isOpen ? (
    <X className="w-6 h-6" />
  ) : (
    <>
      <MessageCircle className="w-6 h-6" />

      {/* punto online */}
      <span className="absolute top-3 right-3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
    </>
  )}
</button>
    </div>
  );
}