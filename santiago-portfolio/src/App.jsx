import { useState } from 'react'
import './index.css'
import React from 'react';
import Navbar from './components/NavBar';
import ChatBot from './components/ChatBot';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Footer from './components/Footer';
import { useReveal } from "./hooks/useReveal";
export default function App() {
  useReveal();
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      
      <Navbar />

      <main className="mx-auto max-w-4xl px-8">
        <Hero />
        <Projects />
        <Skills />
        <Education />
      </main>

      <ChatBot />
      <Footer />
    </div>

  );
}
