import React from 'react';
import { Button } from './Button';
import { CalendarDays } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-apex-dark pt-24 pb-12 px-6 border-t border-gray-800">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        
        <div className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Sua concorrência ainda está contratando estagiários para fazer o trabalho de supercomputadores.
          </h2>
          <p className="text-xl text-gray-400">
            A virada tecnológica acontece devagar, e depois de repente.
          </p>
        </div>

        <div className="flex justify-center">
           <Button className="h-16 text-lg px-10" onClick={() => window.open('https://calendly.com', '_blank')}>
             <CalendarDays className="mr-2 w-5 h-5" />
             AGENDAR BRIEFING EXECUTIVO
           </Button>
        </div>

        <div className="pt-16 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 border-t border-gray-900 mt-16">
          <p>&copy; {new Date().getFullYear()} ApexMkt.ia.br. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-apex-accent transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-apex-accent transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-apex-accent transition-colors">Área do Cliente</a>
          </div>
        </div>

      </div>
    </footer>
  );
};