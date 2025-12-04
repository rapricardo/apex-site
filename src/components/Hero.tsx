import React, { useState, useEffect } from 'react';
import { Terminal } from './Terminal';
import { Button } from './Button';
import { Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [headline, setHeadline] = useState("Marketing não é mais sobre criatividade. É sobre Engenharia.");
  const [subHeadline, setSubHeadline] = useState("Implemente o Protocolo APEX e instale um exército de agentes autônomos.");

  useEffect(() => {
    // Parse URL params for dynamic copy (simulated since we don't have full router)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const term = params.get('utm_term')?.toLowerCase() || params.get('segment')?.toLowerCase();
      const source = params.get('utm_source')?.toLowerCase();

      if (term === 'saas') {
        setHeadline("Reduza o CAC do seu SaaS usando Engenharia de Dados.");
        setSubHeadline("Pare de queimar caixa com PLG que não converte. Nossos agentes qualificam Enterprise Leads automaticamente.");
      } else if (term === 'industria' || term === 'industry') {
        setHeadline("Sua Indústria precisa de Vendas, não de Posts no Instagram.");
        setSubHeadline("Conecte sua produção diretamente à demanda. Prospecção B2B industrial automatizada.");
      }
    }
  }, []);

  const handleAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setIsAuditing(true);
    // Logic would continue to handle the "audit" simulation
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-12 md:pt-32 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <div className="space-y-8">
          <div className="inline-flex items-center space-x-2 bg-gray-900/50 border border-gray-800 rounded-full px-4 py-1.5">
            <Zap className="w-4 h-4 text-apex-accent" />
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Protocolo v4.0 Live</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            {headline}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed">
            {subHeadline} Substitua o "eu acho" por dados. Menos headcount, mais margem.
          </p>

          <form onSubmit={handleAudit} className="space-y-4 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Digite a URL da sua empresa"
                className="w-full bg-gray-900 border border-gray-700 rounded-sm px-4 py-4 text-white focus:border-apex-accent focus:ring-1 focus:ring-apex-accent outline-none transition-all"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full h-14 text-base" isLoading={isAuditing}>
              {isAuditing ? 'EXECUTANDO PROTOCOLO...' : 'RODAR AUDITORIA DE IA'}
            </Button>
            <p className="text-xs text-gray-500 text-center font-mono">
              Sem reuniões. Sem cadastro prévio. Análise técnica em 30s.
            </p>
          </form>
        </div>

        {/* Right Content - Terminal */}
        <div className="relative">
           {/* Decorative Glow */}
           <div className="absolute -inset-1 bg-gradient-to-r from-apex-accent to-blue-600 rounded-lg blur opacity-20"></div>
           <Terminal triggerAudit={isAuditing} targetUrl={url} />
        </div>
      </div>
    </section>
  );
};

export default Hero;

