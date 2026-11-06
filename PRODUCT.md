# Apex — Sites e contratação pelo assistente do comprador

## Decisões de Ricardo em 6 de novembro de 2026

- Substituir a apresentação anterior de operações de marketing para agências.
- Vender criação e reformulação de sites como entrada para serviços de marketing.
- Usar “Seu próximo site começa com uma conversa no seu ChatGPT” na abertura.
- Manter a comunicação humana breve, visual e dinâmica, com imagens de projetos reais.
- Apresentar os trabalhos em uma composição explorável, com detalhes sob demanda.
- Disponibilizar informação extensa e estruturada ao assistente do comprador.
- Permitir futuramente consultar orçamento e submeter pedido confirmado pelo cliente.
- Receber pedidos no Mercúrio. Ricardo está criando a API e fornecerá o contrato.
- Consultar e simular não devem registrar contato para abordagem comercial.
- Em 6 de novembro, Ricardo autorizou implementar o WebMCP com uma base rica para conduzir o briefing; manter envio pendente enquanto termina a API do Mercúrio.

## Implementação local atual

Home e /sites usam a mesma experiência visual. Projetos: Ricardo Tocha, Athena e Mercúrio. Capturas dos sites públicos obtidas em 6 de novembro de 2026; seleção editorial ainda pode ser ajustada. Não atribuir resultados de vendas a essas imagens.

A base está em src/data/knowledge.ts e src/data/offer.ts, com 19 assuntos: oferta, formatos, objetivo, estrutura, conteúdo, design, migração, integrações, tracking, busca, atualização, assistentes, preços, prazos, propriedade, exceções, privacidade, envio e lacunas. Cada assunto distingue direção confirmada, orientação de escopo e condição comercial indefinida. /para-assistentes, /apex-context.json e /llms.txt expõem a mesma base pública, sem respostas de visitantes.

O WebMCP registra sete ferramentas nas páginas pelo document.modelContext, com detecção de suporte e descarte pelo ciclo de vida. Ferramentas: apex_consultar_base, apex_pesquisar_base, apex_consultar_briefing, apex_atualizar_briefing, apex_comparar_escopos, apex_preparar_resumo e apex_apagar_briefing. Não há ferramenta de envio, servidor MCP remoto ou plugin instalável.

O briefing tem 25 campos e respostas confirmadas, hipotéticas, indefinidas, adiadas ou não aplicáveis. As perguntas são condicionais para reformulação, integração, blog e ações por assistentes. A ferramenta retorna até três próximas perguntas, mantém decisões adiadas para revisão e preserva separadamente respostas fora do escopo ativo. Comparações explicam dependências e exclusões; não calculam preço ou prazo.

O rascunho fica em sessionStorage sob __apex_briefing_v1, separado do tracking. Não há sincronização entre abas nem transmissão a um CRM. O navegador pode restaurar a sessão; o painel e a ferramenta de exclusão removem explicitamente as respostas. Cada alteração exige a revisão atual. Validação do lote ocorre antes de salvar; erros preservam o estado anterior. Textos do comprador são renderizados como texto, sem execução de HTML. Falha de armazenamento impede gravação e mantém a consulta pública utilizável.

O painel Seu briefing permite ler, copiar e apagar. A cópia não é submissão. Nenhum lead é enviado ao Apolo ou Mercúrio pelo novo fluxo. O código antigo e as páginas históricas permanecem no repositório; não participam da nova home. Notificações de lacunas também continuam indisponíveis.

## Integração prevista

Receber o contrato existente do Mercúrio antes de implementar um adaptador. Preservar campos, autenticação e semântica do destino. Credenciais ficam no servidor. Submissão exige confirmação sobre escopo e contato, validação do servidor, prevenção de duplicações e identificador retornado pelo destino. Não mostrar sucesso sem confirmação de registro.

Proposta de informações, sem definir o schema da API: contato autorizado; objetivo e briefing; escopo, exclusões e pendências; estimativa e versão das regras; atribuição disponível; identificação da submissão e confirmação do comprador. API e preços ainda pendentes de definição do responsável.

## Preservação

Manter os identificadores de tracking existentes, a chave __wl_tracking e o evento form_submit_lead. Aplicar os 26 campos hidden quando for implementado um formulário de envio. Esta etapa não cria formulário de lead.

## Verificação desta etapa

A verificação usa chamadas reais às ferramentas no navegador compatível e um briefing fictício. As evidências e a sequência reproduzível estão em artifacts/webmcp-e2e.json e artifacts/webmcp-verification.md. O recorte inclui validação de entrada, proteção de revisões, persistência, perguntas condicionais, resumo e ausência de submissão.
