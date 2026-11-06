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
  { id: 'project_type', label: 'Tipo de projeto', question: 'Você quer melhorar um site que já existe ou criar uma presença nova? Posso sugerir o formato a partir do que precisa.', purpose: 'Orientar a avaliação do escopo sem impor um formato.', required: true, topic: 'formatos', choices: { landing_page: 'Landing page', institutional: 'Site institucional', redesign: 'Reformulação', other: 'Outro formato', undecided: 'Ainda não sei' } },
  { id: 'current_site_url', label: 'Site atual', question: 'Qual o endereço do site atual, se houver?', purpose: 'Registrar a referência; esta ferramenta não acessa a URL.', required: false, topic: 'migracao' },
  { id: 'preserve_existing', label: 'O que preservar', question: 'O que funciona no site atual e precisa continuar funcionando depois da mudança?', purpose: 'Identificar dependências da reformulação.', required: true, topic: 'migracao', condition: 'existing_site' },
  { id: 'structure', label: 'Páginas e estrutura', question: 'Quais serviços, públicos ou unidades precisam de espaço próprio?', purpose: 'Delimitar páginas e tipos de conteúdo.', required: true, topic: 'estrutura' },
  { id: 'languages', label: 'Idiomas', question: 'O site precisa de mais de um idioma?', purpose: 'Identificar tradução e atualização de versões.', required: false, topic: 'estrutura' },
  { id: 'content_work', label: 'Trabalho de conteúdo', question: 'Os textos e imagens serão fornecidos, produzidos ou uma combinação?', purpose: 'Definir responsabilidades sobre conteúdo.', required: true, topic: 'conteudo', choices: { supplied: 'Materiais fornecidos', produce: 'Produzir conteúdo', mixed: 'Aproveitar e produzir', undecided: 'Ainda não sei' } },
  { id: 'content_available', label: 'Materiais disponíveis', question: 'Quais textos, fotos e materiais já existem?', purpose: 'Registrar o inventário sem solicitar arquivos nesta etapa.', required: false, topic: 'conteudo' },
  { id: 'visual_identity', label: 'Identidade visual', question: 'Já há marca, cores, fontes ou diretrizes a seguir?', purpose: 'Identificar materiais e restrições visuais.', required: false, topic: 'design' },
  { id: 'references', label: 'Referências', question: 'Quais referências mostram o que você procura e o que gosta nelas?', purpose: 'Entender preferências sem copiar outro projeto.', required: false, topic: 'design' },
  { id: 'needs_integrations', label: 'Integrações necessárias', question: 'Onde sua equipe acompanha os pedidos hoje: WhatsApp, planilha ou CRM? Se houver trabalho repetido, podemos avaliar levar os pedidos do site para esse lugar.', purpose: 'Distinguir links de integrações com operações e dados.', required: true, topic: 'integracoes', choices: yesNo },
  { id: 'integrations', label: 'Sistemas e operações', question: 'Como sua equipe recebe e acompanha pedidos hoje? Usa CRM, planilha ou WhatsApp? O que precisa copiar à mão?', purpose: 'Identificar contrato e dependências técnicas, sem credenciais.', required: true, topic: 'integracoes', condition: 'integrations' },
  { id: 'needs_blog', label: 'Blog ou notícias', question: 'Você precisa publicar artigos ou notícias?', purpose: 'Avaliar conteúdo recorrente e edição.', required: false, topic: 'atualizacao', choices: yesNo },
  { id: 'blog_content', label: 'Conteúdo do blog', question: 'Existe acervo a importar e quem publicará os próximos conteúdos?', purpose: 'Distinguir criação de modelo, migração e operação editorial.', required: true, topic: 'atualizacao', condition: 'blog' },
  { id: 'needs_assistant_tools', label: 'Ferramentas para assistentes', question: 'Quer que o assistente dos seus clientes consulte ou execute ações no seu site?', purpose: 'Avaliar a experiência de compra por assistentes como opção de escopo.', required: false, topic: 'assistentes', choices: yesNo },
  { id: 'agent_actions', label: 'Ações do assistente', question: 'Quais consultas ou ações o assistente deve conseguir realizar?', purpose: 'Identificar regras, confirmações e integrações necessárias.', required: true, topic: 'assistentes', condition: 'assistant_tools' },
  { id: 'updates', label: 'Atualização depois da entrega', question: 'Quem atualiza o site e quais conteúdos mudam com frequência?', purpose: 'Avaliar painel, orientação e responsabilidades.', required: true, topic: 'atualizacao' },
  { id: 'campaigns', label: 'Campanhas e medição', question: 'Como os clientes chegam até vocês hoje? Fazem anúncios online? Como sabem quais trazem pedidos?', purpose: 'Identificar atribuição e medição relevantes.', required: false, topic: 'tracking' },
  { id: 'traffic_volume', label: 'Tráfego mensal', question: 'Você tem ideia de quantas pessoas visitam o site por mês? Se tiver um relatório, de qual período é? Tudo bem não saber.', purpose: 'Avaliar hospedagem; não confundir visitas com requisições ou banda.', required: false, topic: 'hospedagem' },
  { id: 'traffic_peaks', label: 'Picos e recursos de hospedagem', question: 'Há épocas em que muita gente acessa ao mesmo tempo? O site precisa oferecer vídeos ou arquivos grandes?', purpose: 'Dimensionar uso além da média mensal.', required: false, topic: 'hospedagem' },
  { id: 'email_service', label: 'E-mail profissional', question: 'Precisa de e-mail profissional? Quantas caixas e existe serviço a migrar?', purpose: 'Separar e-mail pago da hospedagem incluída, sem coletar endereços ou senhas.', required: false, topic: 'hospedagem' },
  { id: 'maintenance', label: 'Manutenção e recorrência', question: 'Prefere cuidar do site internamente ou avaliar manutenção técnica e alterações mensais?', purpose: 'Identificar interesse sem contratar plano automaticamente.', required: false, topic: 'manutencao' },
  { id: 'advanced_tracking', label: 'Origem dos pedidos e vendas', question: 'Vocês conseguem saber de onde vieram os pedidos que viraram vendas? O que gostariam de entender melhor?', purpose: 'Delimitar implantação e acompanhamento de tracking para campanhas.', required: false, topic: 'tracking' },
  { id: 'ai_images', label: 'Imagens com IA', question: 'Que imagens seriam úteis no site? A franquia inclui até 30, contando versões revisadas.', purpose: 'Planejar a produção incluída e identificar necessidades além da franquia.', required: false, topic: 'conteudo' },
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
