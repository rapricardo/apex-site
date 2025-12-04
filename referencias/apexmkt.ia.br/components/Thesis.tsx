import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';

export const Thesis: React.FC = () => {
  return (
    <section className="bg-gray-50 text-gray-900 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Problem */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <XCircle className="w-8 h-8 text-red-600" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
                O Modelo Tradicional Quebrou.
              </h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed border-l-4 border-red-200 pl-6">
              Você tem 20 vendedores. Metade do tempo deles é gasto preenchendo CRM e perseguindo leads frios. 
              Sua agência atual entrega "likes" e "impressões", mas gagueja quando você pergunta sobre o CAC e LTV. 
              Você está pagando caro por processos manuais que deveriam ter sido automatizados em 2023.
            </p>
            <ul className="space-y-3 mt-6">
              <li className="flex items-center gap-2 text-gray-600 font-medium">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span> Alta rotatividade de SDRs
              </li>
              <li className="flex items-center gap-2 text-gray-600 font-medium">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span> Dados desconexos entre Marketing e Vendas
              </li>
              <li className="flex items-center gap-2 text-gray-600 font-medium">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span> Decisões baseadas em "feeling"
              </li>
            </ul>
          </div>

          {/* Solution */}
          <div className="space-y-6">
             <div className="flex items-center gap-3 mb-8">
              <CheckCircle className="w-8 h-8 text-apex-accent" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
                A Era da Força de Trabalho Híbrida.
              </h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed border-l-4 border-emerald-200 pl-6">
              Não demitimos humanos. Nós removemos o trabalho de robô que eles fazem hoje. 
              O Protocolo APEX insere inteligência artificial em 7 pontos críticos do seu funil. 
              Seu time foca em fechar negócios e estratégia. Nossos agentes focam em escala bruta e execução perfeita.
            </p>
            <ul className="space-y-3 mt-6">
              <li className="flex items-center gap-2 text-gray-600 font-medium">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Prospecção Outbound 100% Autônoma
              </li>
              <li className="flex items-center gap-2 text-gray-600 font-medium">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Qualificação de Leads em Tempo Real
              </li>
              <li className="flex items-center gap-2 text-gray-600 font-medium">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Enriquecimento de Dados Automático
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};