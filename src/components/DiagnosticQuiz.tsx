import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Loader2, MessageCircle } from 'lucide-react';

declare global {
  interface Window {
    __wlTracking?: Record<string, string>;
    dataLayer?: Record<string, unknown>[];
  }
}

const PROXY_URL = "https://apolo-lead-proxy.rapricardo.workers.dev";

interface Question {
  id: string;
  label: string;
  options: { value: string; text: string; score: number }[];
}

const questions: Question[] = [
  {
    id: 'team_size',
    label: '1. Quantas pessoas operam na sua agência hoje?',
    options: [
      { value: '1-3', text: '1 a 3 pessoas', score: 1 },
      { value: '4-8', text: '4 a 8 pessoas', score: 2 },
      { value: '9-15', text: '9 a 15 pessoas', score: 3 },
      { value: '16+', text: 'Mais de 16', score: 4 },
    ],
  },
  {
    id: 'campaign_time',
    label: '2. Quanto tempo leva para entregar uma campanha do briefing à publicação?',
    options: [
      { value: '1-2d', text: '1 a 2 dias', score: 4 },
      { value: '3-5d', text: '3 a 5 dias', score: 3 },
      { value: '1-2w', text: '1 a 2 semanas', score: 2 },
      { value: '2w+', text: 'Mais de 2 semanas', score: 1 },
    ],
  },
  {
    id: 'rework',
    label: '3. Com que frequência acontece retrabalho por briefing mal interpretado?',
    options: [
      { value: 'rare', text: 'Raramente', score: 4 },
      { value: 'sometimes', text: 'Às vezes (1-2x por semana)', score: 3 },
      { value: 'often', text: 'Frequentemente (quase todo dia)', score: 2 },
      { value: 'always', text: 'É o padrão — quase tudo volta', score: 1 },
    ],
  },
  {
    id: 'tools',
    label: '4. Como sua equipe gerencia tarefas e produção?',
    options: [
      { value: 'pm_tool', text: 'Ferramenta de PM integrada (Monday, Asana, ClickUp)', score: 4 },
      { value: 'basic', text: 'Trello / Notion (sem automação)', score: 3 },
      { value: 'spreadsheet', text: 'Planilhas + WhatsApp', score: 2 },
      { value: 'chaos', text: 'Cada um faz do seu jeito', score: 1 },
    ],
  },
  {
    id: 'ai_usage',
    label: '5. Qual o nível de uso de IA na operação hoje?',
    options: [
      { value: 'integrated', text: 'IA integrada nos processos (prompts, automações)', score: 4 },
      { value: 'individual', text: 'Cada pessoa usa ChatGPT por conta', score: 3 },
      { value: 'experimenting', text: 'Estamos experimentando, sem padrão', score: 2 },
      { value: 'none', text: 'Não usamos IA na operação', score: 1 },
    ],
  },
];

interface ScoreResult {
  grade: string;
  title: string;
  description: string;
  color: string;
}

function getResult(score: number): ScoreResult {
  const pct = (score / 20) * 100;
  if (pct >= 80) return {
    grade: 'A',
    title: 'Operação Otimizada',
    description: 'Sua agência já opera com maturidade acima da média. O próximo passo é escalar sem inflar o headcount — IA pode multiplicar a capacidade sem adicionar cadeiras.',
    color: 'text-emerald-400',
  };
  if (pct >= 60) return {
    grade: 'B',
    title: 'Operação Estruturada',
    description: 'Vocês têm processo, mas ainda dependem muito de pessoas para manter tudo funcionando. IA pode absorver o operacional repetitivo e liberar a equipe para estratégia.',
    color: 'text-emerald-400',
  };
  if (pct >= 40) return {
    grade: 'C',
    title: 'Operação Manual',
    description: 'A operação roda, mas com muito atrito. Briefings se perdem, retrabalho é frequente e a equipe gasta mais energia se organizando do que produzindo. IA resolve isso.',
    color: 'text-yellow-400',
  };
  return {
    grade: 'D',
    title: 'Operação no Caos',
    description: 'Sua agência opera sem processo definido. Cada campanha é uma aventura. A margem está sendo corroída por ineficiência operacional. Você precisa de infraestrutura antes de escalar.',
    color: 'text-red-400',
  };
}

const DiagnosticQuiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'quiz' | 'contact' | 'sending' | 'result'>('quiz');
  const [tracking, setTracking] = useState<Record<string, string>>({});

  useEffect(() => {
    setTracking(window.__wlTracking || {});
  }, []);

  const currentQuestion = questions[step];
  const totalQuestions = questions.length;
  const isLastQuestion = step === totalQuestions - 1;
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const result = getResult(totalScore);

  const handleAnswer = (value: string, score: number) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
    setScores({ ...scores, [currentQuestion.id]: score });

    if (isLastQuestion) {
      setStatus('contact');
    } else {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const finalScore = Object.values({ ...scores }).reduce((a, b) => a + b, 0);
    const finalResult = getResult(finalScore);

    const payload = {
      name,
      phone,
      source: 'apex_diagnostico',
      score: finalScore,
      grade: finalResult.grade,
      grade_title: finalResult.title,
      ...answers,
      ...tracking,
      page_url: window.location.href,
    };

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'form_submit_lead',
      lead_name: name,
      lead_whatsapp: phone,
      diagnostic_score: finalScore,
      diagnostic_grade: finalResult.grade,
      ...Object.fromEntries(
        Object.entries(tracking).map(([k, v]) => [k, v || null])
      ),
    });

    try {
      await fetch(PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      // silently fail — show result anyway
    }

    setStatus('result');
  };

  // Quiz step
  if (status === 'quiz') {
    return (
      <section className="py-24 px-6 bg-apex-dark" id="diagnostico">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-mono text-apex-accent uppercase tracking-widest mb-4">Diagnóstico Gratuito</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Qual o nível de maturidade operacional da sua agência?
            </h2>
            <p className="text-gray-400">5 perguntas. 60 segundos. Score personalizado.</p>
          </div>

          <div className="bg-[#121212] border border-gray-800 p-8 md:p-12 rounded-sm">
            {/* Progress bar */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-mono text-gray-500">{step + 1} de {totalQuestions}</span>
              <div className="flex-1 mx-4 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-apex-accent transition-all duration-300"
                  style={{ width: `${((step + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-6">{currentQuestion.label}</h3>

            <div className="space-y-3">
              {currentQuestion.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value, opt.score)}
                  className="w-full text-left p-4 border border-gray-700 hover:border-apex-accent text-gray-300 hover:text-white transition-all rounded-sm flex items-center justify-between group"
                >
                  <span>{opt.text}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-apex-accent transition-opacity" />
                </button>
              ))}
            </div>

            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm mt-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Contact step
  if (status === 'contact' || status === 'sending') {
    return (
      <section className="py-24 px-6 bg-apex-dark" id="diagnostico">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#121212] border border-gray-800 p-8 md:p-12 rounded-sm">
            <div className="text-center mb-8">
              <MessageCircle className="w-10 h-10 text-apex-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Seu diagnóstico está pronto.</h3>
              <p className="text-gray-400">Informe seus dados para ver o resultado e receber o relatório completo por WhatsApp.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-1 uppercase tracking-wider">Seu nome</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-gray-700 text-white p-4 focus:border-apex-accent focus:outline-none transition-colors rounded-sm"
                  placeholder="Ex: Maria Silva"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-1 uppercase tracking-wider">WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-gray-700 text-white p-4 focus:border-apex-accent focus:outline-none transition-colors rounded-sm"
                  placeholder="(11) 99999-9999"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-apex-accent hover:bg-emerald-400 text-black font-semibold py-4 uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'sending' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Processando...</>
                ) : (
                  <>Ver Meu Diagnóstico <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
              <p className="text-xs text-gray-600 text-center">Seus dados estão protegidos. Sem spam.</p>
            </form>
          </div>
        </div>
      </section>
    );
  }

  // Result step
  return (
    <section className="py-24 px-6 bg-apex-dark" id="diagnostico">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#121212] border border-gray-800 p-8 md:p-12 rounded-sm">
          <div className="text-center mb-8">
            <div className={`text-7xl font-bold ${result.color} mb-2`}>{result.grade}</div>
            <h3 className="text-2xl font-bold text-white mb-2">{result.title}</h3>
            <p className="text-gray-400 text-sm">Score: {totalScore}/20</p>
          </div>

          <div className="border border-gray-800 p-6 mb-8 rounded-sm">
            <p className="text-gray-300 leading-relaxed">{result.description}</p>
          </div>

          {/* Score breakdown */}
          <div className="space-y-3 mb-8">
            {questions.map((q) => {
              const s = scores[q.id] || 0;
              return (
                <div key={q.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 truncate mr-4">{q.label.replace(/^\d+\.\s*/, '')}</span>
                  <div className="flex gap-1 shrink-0">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${i <= s ? 'bg-apex-accent' : 'bg-gray-800'}`}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center space-y-4">
            <p className="text-gray-400 text-sm">Enviamos o relatório completo para o seu WhatsApp.</p>
            <a
              href="/"
              className="inline-flex items-center justify-center h-14 px-8 font-semibold tracking-wide uppercase text-sm bg-apex-accent text-black hover:bg-emerald-400 rounded-sm transition-all"
            >
              Conhecer o Apex MKT
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiagnosticQuiz;
