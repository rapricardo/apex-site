export type Field = {
  id: string;
  label: string;
  question: string;
  purpose: string;
  required: boolean;
  topic: string;
  choices?: Record<string, string>;
  condition?: 'existing_site' | 'integrations' | 'blog' | 'assistant_tools';
};
const yesNo = { yes: 'Sim', no: 'Não', undecided: 'Ainda não sei' };
export const briefingFields: Field[] = [
  { id: 'objective', label: 'Objetivo', question: 'O que motivou o projeto e o que você quer melhorar?', purpose: 'Entender a necessidade antes de escolher uma solução.', required: true, topic: 'objetivo' },
  { id: 'business', label: 'Negócio', question: 'O que sua empresa oferece?', purpose: 'Contextualizar serviços e conteúdo.', required: true, topic: 'apex' },
  { id: 'audience', label: 'Público', question: 'Quem precisa usar o site?', purpose: 'Definir para quem organizar a informação.', required: true, topic: 'objetivo' },
  { id: 'primary_action', label: 'Ação principal', question: 'O que o visitante precisa conseguir fazer?', purpose: 'Definir o próximo passo: orçamento, agendamento, contato ou outra ação.', required: true, topic: 'objetivo' },
  { id: 'project_type', label: 'Tipo de projeto', question: 'É uma landing page, site institucional, reformulação ou ainda não sabe?', purpose: 'Orientar a avaliação do escopo sem impor um formato.', required: true, topic: 'formatos', choices: { landing_page: 'Landing page', institutional: 'Site institucional', redesign: 'Reformulação', other: 'Outro formato', undecided: 'Ainda não sei' } },
  { id: 'current_site_url', label: 'Site atual', question: 'Qual o endereço do site atual, se houver?', purpose: 'Registrar a referência; esta ferramenta não acessa a URL.', required: false, topic: 'migracao' },
  { id: 'preserve_existing', label: 'O que preservar', question: 'Quais páginas, URLs, conteúdos e integrações devem continuar?', purpose: 'Identificar dependências da reformulação.', required: true, topic: 'migracao', condition: 'existing_site' },
  { id: 'structure', label: 'Páginas e estrutura', question: 'Quais serviços, públicos ou unidades precisam de espaço próprio?', purpose: 'Delimitar páginas e tipos de conteúdo.', required: true, topic: 'estrutura' },
  { id: 'languages', label: 'Idiomas', question: 'O site precisa de mais de um idioma?', purpose: 'Identificar tradução e atualização de versões.', required: false, topic: 'estrutura' },
  { id: 'content_work', label: 'Trabalho de conteúdo', question: 'Os textos e imagens serão fornecidos, produzidos ou uma combinação?', purpose: 'Definir responsabilidades sobre conteúdo.', required: true, topic: 'conteudo', choices: { supplied: 'Materiais fornecidos', produce: 'Produzir conteúdo', mixed: 'Aproveitar e produzir', undecided: 'Ainda não sei' } },
  { id: 'content_available', label: 'Materiais disponíveis', question: 'Quais textos, fotos e materiais já existem?', purpose: 'Registrar o inventário sem solicitar arquivos nesta etapa.', required: false, topic: 'conteudo' },
  { id: 'visual_identity', label: 'Identidade visual', question: 'Já há marca, cores, fontes ou diretrizes a seguir?', purpose: 'Identificar materiais e restrições visuais.', required: false, topic: 'design' },
  { id: 'references', label: 'Referências', question: 'Quais referências mostram o que você procura e o que gosta nelas?', purpose: 'Entender preferências sem copiar outro projeto.', required: false, topic: 'design' },
  { id: 'needs_integrations', label: 'Integrações necessárias', question: 'O site precisa registrar dados ou executar ações em outro sistema?', purpose: 'Distinguir links de integrações com operações e dados.', required: true, topic: 'integracoes', choices: yesNo },
  { id: 'integrations', label: 'Sistemas e operações', question: 'Qual sistema, qual ação e quais dados precisam ser integrados?', purpose: 'Identificar contrato e dependências técnicas, sem credenciais.', required: true, topic: 'integracoes', condition: 'integrations' },
  { id: 'needs_blog', label: 'Blog ou notícias', question: 'Você precisa publicar artigos ou notícias?', purpose: 'Avaliar conteúdo recorrente e edição.', required: false, topic: 'atualizacao', choices: yesNo },
  { id: 'blog_content', label: 'Conteúdo do blog', question: 'Existe acervo a importar e quem publicará os próximos conteúdos?', purpose: 'Distinguir criação de modelo, migração e operação editorial.', required: true, topic: 'atualizacao', condition: 'blog' },
  { id: 'needs_assistant_tools', label: 'Ferramentas para assistentes', question: 'Quer que o assistente dos seus clientes consulte ou execute ações no seu site?', purpose: 'Avaliar a experiência de compra por assistentes como opção de escopo.', required: false, topic: 'assistentes', choices: yesNo },
  { id: 'agent_actions', label: 'Ações do assistente', question: 'Quais consultas ou ações o assistente deve conseguir realizar?', purpose: 'Identificar regras, confirmações e integrações necessárias.', required: true, topic: 'assistentes', condition: 'assistant_tools' },
  { id: 'updates', label: 'Atualização depois da entrega', question: 'Quem atualiza o site e quais conteúdos mudam com frequência?', purpose: 'Avaliar painel, orientação e responsabilidades.', required: true, topic: 'atualizacao' },
  { id: 'campaigns', label: 'Campanhas e medição', question: 'Há campanhas, métricas ou eventos que precisam ser preservados?', purpose: 'Identificar atribuição e medição relevantes.', required: false, topic: 'tracking' },
  { id: 'deadline', label: 'Data desejada', question: 'Existe uma data importante e qual o motivo?', purpose: 'Registrar uma restrição do comprador sem prometer prazo.', required: false, topic: 'prazos' },
  { id: 'approver', label: 'Aprovação', question: 'Qual papel ou equipe aprova conteúdo e design?', purpose: 'Entender o processo de aprovação; não é necessário informar contato pessoal.', required: false, topic: 'prazos' },
  { id: 'constraints', label: 'Restrições e requisitos especiais', question: 'Há requisitos de plataforma, acesso, pagamento, acessibilidade ou operação?', purpose: 'Identificar itens que exigem avaliação específica.', required: false, topic: 'excecoes' },
  { id: 'later', label: 'Segunda etapa', question: 'O que pode ficar para uma segunda etapa?', purpose: 'Distinguir prioridade de exclusão definitiva.', required: false, topic: 'estrutura' },
];

export const answerStatuses = ['confirmed', 'hypothesis', 'unknown', 'deferred', 'not_applicable'] as const;
export type AnswerStatus = typeof answerStatuses[number];
export const statusLabels: Record<AnswerStatus, string> = {
  confirmed: 'Confirmado pelo comprador', hypothesis: 'Hipótese para revisão', unknown: 'Ainda não definido', deferred: 'Deixado para depois', not_applicable: 'Não se aplica',
};
