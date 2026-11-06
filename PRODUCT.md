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

## Implementação local atual

Home e /sites usam a mesma experiência visual. Projetos: Ricardo Tocha, Athena e Mercúrio. Capturas dos sites públicos obtidas em 6 de novembro de 2026; seleção editorial ainda pode ser ajustada. Não atribuir resultados de vendas a essas imagens.

A base inicial está em src/data/offer.ts e é publicada em /para-assistentes. Condições comerciais não definidas estão explicitamente marcadas. O botão principal abre o ponto de partida da conversa e informa a indisponibilidade de orçamento e envio. Copia um pedido de organização do briefing, sem encaminhar o endereço local a um assistente externo.

Não há submissão, cálculo de preços nem ferramentas WebMCP registradas nesta etapa visual. Nenhum lead é enviado ao Apolo ou Mercúrio pelo novo fluxo. O código antigo e as páginas históricas permanecem no repositório; não participam da nova home.

## Integração prevista

Receber o contrato existente do Mercúrio antes de implementar um adaptador. Preservar campos, autenticação e semântica do destino. Credenciais ficam no servidor. Submissão exige confirmação sobre escopo e contato, validação do servidor, prevenção de duplicações e identificador retornado pelo destino. Não mostrar sucesso sem confirmação de registro.

Proposta de informações, sem definir o schema da API: contato autorizado; objetivo e briefing; escopo, exclusões e pendências; estimativa e versão das regras; atribuição disponível; identificação da submissão e confirmação do comprador. API e preços ainda pendentes de definição do responsável.

## Preservação

Manter os identificadores de tracking existentes, a chave __wl_tracking e o evento form_submit_lead. Aplicar os 26 campos hidden quando for implementado um formulário de envio. Esta etapa não cria formulário de lead.
