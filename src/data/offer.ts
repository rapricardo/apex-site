export const projects = [
  { name: 'Ricardo Tocha', domain: 'ricardotocha.com.br', url: 'https://ricardotocha.com.br', image: '/projects/ricardo-tocha.jpg', category: 'Marca pessoal · Experiência interativa', description: 'Uma apresentação do trabalho com IA, organizada em ambientes de um laboratório interativo.' },
  { name: 'Athena', domain: 'athena.app.br', url: 'https://athena.app.br', image: '/projects/athena.jpg', category: 'Produto · Inteligência comercial', description: 'Uma experiência por salas para explorar a proposta do produto e começar uma autoavaliação.' },
  { name: 'Mercúrio', domain: 'mercurio.ia.br', url: 'https://mercurio.ia.br', image: '/projects/mercurio.jpg', category: 'Produto · Gestão de serviços', description: 'Apresentação de um sistema que conecta as etapas comercial, operacional e financeira.' },
];

// Informações aprovadas no contexto da proposta. Condições não decididas ficam explícitas.
export const offer = {
  version: '2026-11-06-commercial-v2',
  status: 'briefing_available',
  provider: 'Apex, por Ricardo Tocha',
  audience: 'Pequenas e médias empresas que precisam criar ou reformular um site.',
  services: ['Landing page', 'Site institucional', 'Reformulação de site', 'Organização e produção de conteúdo conforme proposta', 'Design e desenvolvimento', 'Integrações conforme escopo'],
  optional: ['CRM', 'Atendimento automatizado', 'Tracking', 'Vídeo', 'Ferramentas de consulta e pedido para assistentes'],
  process: ['Entender objetivo e contexto', 'Definir escopo e condições', 'Organizar conteúdo e criar design para aprovação', 'Desenvolver e publicar conforme proposta'],
  pricing: {
    status: 'starting_price', currency: 'BRL', one_page_from: 1800,
    message: 'Site de página única a partir de R$ 1.800. O preço final depende do escopo; este valor não inclui automaticamente integrações ou tracking avançado. Não há calculador de orçamento fechado.',
  },
  ai_images: {
    included: true, allowance: 30, unit: 'imagens apresentadas, incluindo versões revisadas',
    message: 'Até 30 imagens produzidas com IA sem custo adicional por projeto, incluindo versões alteradas em revisão. Exemplo: 20 imagens iniciais e 10 versões revisadas consomem as 30 inclusas. Gerações internas descartadas não são entregas ao cliente. Excedentes dependem de orçamento antes da produção.',
  },
  hosting: {
    included_months: 12, eligibility: 'review_required', email_included: false,
    message: 'Hospedagem gratuita por 12 meses para sites com tráfego moderado, mediante avaliação de visitas, picos, transferência e recursos do projeto. E-mail tem custo adicional. O limite de uso e o valor após 12 meses serão informados na proposta; não há renovação ou cobrança automática definida.',
  },
  maintenance: {
    status: 'initial_proposal', currency: 'BRL', optional: true,
    plans: [
      { id: 'technical', name: 'Manutenção técnica', monthly_price: 190, included_change_hours: 0, scope: 'Acompanhamento de disponibilidade, atualizações técnicas aplicáveis e correções no escopo entregue. Conteúdo novo e novas funcionalidades ficam fora.' },
      { id: 'care', name: 'Manutenção e alterações', monthly_price: 390, included_change_hours: 1, scope: 'Manutenção técnica e até 1 hora mensal de alterações em textos, imagens e conteúdo existente. Novas páginas, integrações e funcionalidades têm orçamento próprio.' },
    ],
    pending: ['Prazos de atendimento', 'Cancelamento e vigência', 'Acúmulo de horas e valor de excedentes', 'Responsabilidades e cobertura final'],
  },
  orders: { status: 'unavailable', destination: 'Mercúrio', message: 'API de destino em preparação pelo responsável. Nenhum lead ou pedido é enviado nesta versão.' },
  unresolved_terms: ['Preço final por escopo e adicionais', 'Condições de pagamento', 'Revisões de texto e design', 'Prazos e disponibilidade', 'Limites da hospedagem e preço após 12 meses', 'Domínio e e-mail', 'Condições finais dos planos de manutenção', 'Propriedade e entrega do código', 'Validade da proposta'],
  privacy: 'Compartilhar somente o resumo e o contato autorizados pelo comprador. Consultas não criam leads. Não solicitar histórico completo da conversa.',
  projects,
};
