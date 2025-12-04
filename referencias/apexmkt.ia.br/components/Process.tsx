import React from 'react';
import { ScanEye, BrainCircuit, MessageSquare, UserCheck, TrendingUp } from 'lucide-react';
import { ProcessStep } from '../types';

const steps: ProcessStep[] = [
  {
    title: "Awareness",
    description: "Agentes de Deep Research monitoram intenção de compra.",
    icon: ScanEye,
    isAi: true,
  },
  {
    title: "Education",
    description: "Nutrição contextual baseada em comportamento, não tempo.",
    icon: BrainCircuit,
    isAi: true,
  },
  {
    title: "Selection",
    description: "SDRs de IA qualificam leads via WhatsApp em tempo real.",
    icon: MessageSquare,
    isAi: true,
  },
  {
    title: "Commit",
    description: "Humanos entram apenas aqui para negociar e fechar.",
    icon: UserCheck,
    isAi: false,
  },
  {
    title: "Expansion",
    description: "IA monitora uso e sugere upsell preditivo.",
    icon: TrendingUp,
    isAi: true,
  },
];

export const Process: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-apex-dark">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">O Pipeline Híbrido APEX</h2>
          <div className="flex items-center justify-center gap-6 text-sm font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-apex-accent/20 border border-apex-accent rounded-full"></span>
              <span className="text-apex-accent">Automação (AI Agent)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-white rounded-full"></span>
              <span className="text-white">Humano Estratégico</span>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 border-2 transition-all duration-300 bg-apex-dark ${
                  step.isAi 
                    ? 'border-apex-accent/30 text-apex-accent group-hover:border-apex-accent group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                    : 'border-white text-white group-hover:bg-white group-hover:text-black'
                }`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};