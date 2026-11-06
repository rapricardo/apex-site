export const projects = [
  { name: 'Ricardo Tocha', domain: 'ricardotocha.com.br', url: 'https://ricardotocha.com.br', image: '/projects/ricardo-tocha.jpg', category: 'Marca pessoal · Experiência interativa', description: 'Uma apresentação do trabalho com IA, organizada em ambientes de um laboratório interativo.' },
  { name: 'Athena', domain: 'athena.app.br', url: 'https://athena.app.br', image: '/projects/athena.jpg', category: 'Produto · Inteligência comercial', description: 'Uma experiência por salas para explorar a proposta do produto e começar uma autoavaliação.' },
  { name: 'Mercúrio', domain: 'mercurio.ia.br', url: 'https://mercurio.ia.br', image: '/projects/mercurio.jpg', category: 'Produto · Gestão de serviços', description: 'Apresentação de um sistema que conecta as etapas comercial, operacional e financeira.' },
];

// Informações aprovadas no contexto da proposta. Condições não decididas ficam explícitas.
export const offer = {
  version: '2026-11-06-briefing-v1',
  status: 'briefing_available',
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
