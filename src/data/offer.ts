export const projects = [
  { name: 'Ricardo Tocha', domain: 'ricardotocha.com.br', url: 'https://ricardotocha.com.br', image: '/projects/ricardo-tocha.jpg', category: 'Marca pessoal · Experiência interativa', description: 'Uma apresentação do trabalho com IA, organizada em ambientes de um laboratório interativo.' },
  { name: 'Athena', domain: 'athena.app.br', url: 'https://athena.app.br', image: '/projects/athena.jpg', category: 'Produto · Inteligência comercial', description: 'Uma experiência por salas para explorar a proposta do produto e começar uma autoavaliação.' },
  { name: 'Mercúrio', domain: 'mercurio.ia.br', url: 'https://mercurio.ia.br', image: '/projects/mercurio.jpg', category: 'Produto · Gestão de serviços', description: 'Apresentação de um sistema que conecta as etapas comercial, operacional e financeira.' },
];

// Informações aprovadas no contexto da proposta. Condições não decididas ficam explícitas.
export const offer = {
  version: '2026-11-06-preview',
  status: 'preview',
  provider: 'Apex, por Ricardo Tocha',
  audience: 'Pequenas e médias empresas que precisam criar ou reformular um site.',
  services: ['Landing page', 'Site institucional', 'Reformulação de site', 'Organização e produção de conteúdo conforme proposta', 'Design e desenvolvimento', 'Integrações conforme escopo'],
  optional: ['CRM', 'Atendimento automatizado', 'Tracking', 'Vídeo', 'Ferramentas de consulta e pedido para assistentes'],
  process: ['Entender objetivo e contexto', 'Definir escopo e condições', 'Organizar conteúdo e criar design para aprovação', 'Desenvolver e publicar conforme proposta'],
  pricing: { status: 'not_configured', message: 'Não há tabela de preços aprovada. Não apresentar valores, faixas, descontos ou prazo de entrega como oferta da Apex.' },
  orders: { status: 'unavailable', destination: 'Mercúrio', message: 'API de destino em preparação pelo responsável. Nenhum lead ou pedido é enviado nesta versão.' },
  unresolved_terms: ['Valores e regras de cálculo', 'Condições de pagamento', 'Quantidade de revisões', 'Prazos e disponibilidade', 'Domínio e hospedagem', 'Manutenção e suporte', 'Propriedade e entrega do código', 'Validade da proposta'],
  privacy: 'Compartilhar somente o resumo e o contato autorizados pelo comprador. Consultas não criam leads. Não solicitar histórico completo da conversa.',
  projects,
};

export const briefingQuestions = [
  { id: 'objective', question: 'O que o visitante precisa conseguir fazer no novo site?', purpose: 'Definir o objetivo e a ação principal.' },
  { id: 'business', question: 'O que sua empresa oferece e para quem?', purpose: 'Contextualizar a comunicação e o público.' },
  { id: 'current_site', question: 'Já existe um site? Qual o endereço e o que deve ser preservado?', purpose: 'Identificar criação, reformulação e necessidade de migração.' },
  { id: 'structure', question: 'Quais serviços, públicos ou unidades precisam de espaço próprio?', purpose: 'Delimitar páginas e navegação.' },
  { id: 'content', question: 'Quais textos, fotos e materiais estão disponíveis?', purpose: 'Identificar produção e reaproveitamento de conteúdo.' },
  { id: 'features', question: 'Quais recursos e integrações são indispensáveis?', purpose: 'Identificar funcionalidades e dependências técnicas.' },
  { id: 'editing', question: 'Quem vai atualizar o conteúdo depois?', purpose: 'Avaliar a forma de atualização.' },
  { id: 'timing', question: 'Há uma data importante e quem aprova o projeto?', purpose: 'Identificar restrições sem prometer prazo.' },
];
