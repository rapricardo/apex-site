import React from 'react';
import { Hero } from './components/Hero';
import { Thesis } from './components/Thesis';
import { Diagnosis } from './components/Diagnosis';
import { Process } from './components/Process';
import { Authority } from './components/Authority';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-apex-dark text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-apex-dark/80 backdrop-blur-md border-b border-gray-800 h-16 flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="font-bold text-xl tracking-tighter flex items-center gap-1">
            APEX<span className="text-apex-accent">MKT</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">A Tese</a>
            <a href="#" className="hover:text-white transition-colors">Diagnóstico</a>
            <a href="#" className="hover:text-white transition-colors">Processo</a>
          </div>
          <button className="text-xs font-mono border border-gray-700 px-3 py-1 rounded hover:border-apex-accent hover:text-apex-accent transition-colors">
            LOGIN_CLIENTE
          </button>
        </div>
      </nav>

      <main>
        <Hero />
        <Thesis />
        <Diagnosis />
        <Process />
        <Authority />
      </main>

      <Footer />
    </div>
  );
}

export default App;