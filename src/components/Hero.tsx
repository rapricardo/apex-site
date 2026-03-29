import React from 'react';
import { Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 md:pt-32 overflow-hidden" id="demo">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="max-w-5xl w-full mx-auto text-center relative z-10 space-y-8">
        <div className="inline-flex items-center space-x-2 bg-gray-900/50 border border-gray-800 rounded-full px-4 py-1.5">
          <Sparkles className="w-4 h-4 text-apex-accent" />
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Operações de Marketing Assistidas por IA</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
          A agência onde cada pessoa
          <br />
          tem um <span className="text-apex-accent">assistente de IA</span>.
        </h1>

        <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Tu decides. A IA executa, organiza e sugere. Menos burocracia, mais throughput, mais qualidade por ciclo.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <a href="#diagnostico" className="inline-flex items-center justify-center h-14 px-8 font-semibold tracking-wide uppercase text-sm bg-apex-accent text-black hover:bg-emerald-400 rounded-sm transition-all">
            Fazer Diagnóstico Grátis
          </a>
          <a href="#como-funciona" className="inline-flex items-center justify-center h-14 px-8 font-semibold tracking-wide uppercase text-sm border border-gray-600 text-gray-200 hover:border-apex-accent hover:text-apex-accent rounded-sm transition-all">
            Como Funciona
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
