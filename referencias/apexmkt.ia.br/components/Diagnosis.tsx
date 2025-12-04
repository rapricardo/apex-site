import React from 'react';
import { Database, MousePointerClick, Lock, FileJson } from 'lucide-react';
import { Button } from './Button';

export const Diagnosis: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-apex-dark border-t border-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Nós usamos nossa própria máquina para encontrar você.</h2>
          <p className="text-gray-400">Transparência radical sobre nosso processo de aquisição.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
          
          {/* Block 1 - Data Driven */}
          <div className="md:col-span-2 bg-gray-900/40 border border-gray-800 p-8 rounded-xl hover:border-apex-accent/50 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <Database className="text-apex-accent w-8 h-8" />
              <span className="font-mono text-xs text-gray-500">SOURCE_ID: 8832A</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Inferência de CNAE & Tráfego</h3>
            <p className="text-gray-400">
              Provavelmente chegamos até você porque nossos agentes cruzaram seu CNAE público com o tráfego digital recente da sua empresa, identificando um gap de eficiência em aquisição.
            </p>
          </div>

          {/* Block 2 - The Hook */}
          <div className="bg-gray-900/40 border border-gray-800 p-8 rounded-xl hover:border-apex-accent/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <MousePointerClick className="text-blue-500 w-8 h-8" />
              <span className="font-mono text-xs text-gray-500">DYNAMIC_CONTENT</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Conteúdo Modular</h3>
            <p className="text-gray-400">
              Este site foi gerado modularmente. Se você fosse de outro setor (ex: Varejo), a headline lá em cima seria drasticamente diferente.
            </p>
          </div>

           {/* Block 3 - Privacy */}
           <div className="bg-gray-900/40 border border-gray-800 p-8 rounded-xl hover:border-apex-accent/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <Lock className="text-gray-400 w-8 h-8" />
              <span className="font-mono text-xs text-gray-500">LGPD_COMPLIANT</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Zero PII Leaks</h3>
            <p className="text-gray-400">
              Utilizamos dados públicos e enriquecidos. Nenhuma informação pessoal sensível foi processada sem consentimento prévio.
            </p>
          </div>

          {/* Block 4 - CTA */}
          <div className="md:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <FileJson className="w-32 h-32" />
            </div>
            <div className="relative z-10">
               <h3 className="text-xl font-semibold text-white mb-2">Quer ver o que sabemos sobre o seu negócio?</h3>
               <p className="text-gray-400 text-sm">Geramos um dossiê técnico preliminar baseado na sua pegada digital.</p>
            </div>
            <div className="relative z-10">
              <Button variant="secondary">
                Ver meu Dossiê
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};