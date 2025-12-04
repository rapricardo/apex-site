import React from 'react';
import { Shield } from 'lucide-react';

export const Authority: React.FC = () => {
  return (
    <section className="bg-black border-y border-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-8">
          Infraestrutura Enterprise
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Text-based logos for simplicity and speed without external assets */}
          <span className="text-2xl font-bold text-white font-sans tracking-tighter">OpenAI <span className="font-light text-gray-400">Enterprise</span></span>
          <span className="text-2xl font-bold text-white font-serif">Anthropic</span>
          <span className="text-2xl font-bold text-white font-sans">Google Cloud</span>
          <span className="text-2xl font-bold text-white font-mono">Next.js</span>
          <span className="text-xl font-bold text-white font-sans border border-white/40 px-2 py-1 rounded">n8n Certified</span>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-xs text-gray-600">
          <Shield className="w-4 h-4" />
          <span>Seus dados não treinam nossos modelos públicos. Ambientes isolados e compliance total.</span>
        </div>
      </div>
    </section>
  );
};