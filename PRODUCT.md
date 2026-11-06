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

A base está em src/data/knowledge.ts e src/data/offer.ts, com 21 assuntos: oferta, formatos, objetivo, estrutura, conteúdo, design, migração, integrações, tracking, busca, atualização, assistentes, preços, prazos, propriedade, exceções, privacidade, envio e lacunas. Cada assunto distingue direção confirmada, orientação de escopo e condição comercial indefinida. /para-assistentes, /apex-context.json e /llms.txt expõem a mesma base pública, sem respostas de visitantes.

O WebMCP registra dez ferramentas nas páginas pelo document.modelContext, com detecção de suporte e descarte pelo ciclo de vida. Ferramentas: apex_consultar_base, apex_pesquisar_base, apex_consultar_briefing, apex_atualizar_briefing, apex_comparar_escopos, apex_preparar_resumo apex_apagar_briefing, apex_consultar_lacunas, apex_registrar_lacuna e apex_apagar_lacunas. Não há ferramenta de envio, servidor MCP remoto ou plugin instalável.

O briefing tem 31 campos e respostas confirmadas, hipotéticas, indefinidas, adiadas ou não aplicáveis. As perguntas são condicionais para reformulação, integração, blog e ações por assistentes. A ferramenta retorna até três próximas perguntas, mantém decisões adiadas para revisão e preserva separadamente respostas fora do escopo ativo. Comparações explicam dependências e exclusões; não calculam preço ou prazo.

O rascunho fica em sessionStorage sob __apex_briefing_v1, separado do tracking. Não há sincronização entre abas nem transmissão a um CRM. O navegador pode restaurar a sessão; o painel e a ferramenta de exclusão removem explicitamente as respostas. Cada alteração exige a revisão atual. Validação do lote ocorre antes de salvar; erros preservam o estado anterior. Textos do comprador são renderizados como texto, sem execução de HTML. Falha de armazenamento impede gravação e mantém a consulta pública utilizável.

O painel Seu briefing permite ler, copiar e apagar. A cópia não é submissão. Nenhum lead é enviado ao Apolo ou Mercúrio pelo novo fluxo. O código antigo e as páginas históricas permanecem no repositório; não participam da nova home. Notificações de lacunas também continuam indisponíveis.

## Integração prevista

O contrato do Mercúrio foi consultado e testado em 6 de novembro de 2026. Ao implementar o adaptador público, preservar campos, autenticação e semântica do destino. Credenciais ficam no servidor. Submissão exige confirmação sobre escopo e contato, validação do servidor, prevenção de duplicações e identificador retornado pelo destino. Não mostrar sucesso sem confirmação de registro.

Proposta de informações, sem definir o schema da API: contato autorizado; objetivo e briefing; escopo, exclusões e pendências; estimativa e versão das regras; atribuição disponível; identificação da submissão e confirmação do comprador. Transporte, autenticação e confirmação de recebimento da API foram validados no teste técnico abaixo; o fluxo público ainda não está conectado. Preço inicial e propostas de manutenção constam em src/data/offer.ts; o cálculo final depende das regras de escopo.

## Preservação

Manter os identificadores de tracking existentes, a chave __wl_tracking e o evento form_submit_lead. Aplicar os 26 campos hidden quando for implementado um formulário de envio. Esta etapa não cria formulário de lead.

## Verificação desta etapa

A verificação usa chamadas reais às ferramentas no navegador compatível e um briefing fictício. As evidências e a sequência reproduzível estão em artifacts/webmcp-e2e.json e artifacts/webmcp-verification.md. O recorte inclui validação de entrada, proteção de revisões, persistência, perguntas condicionais, resumo e ausência de submissão.

## Oferta comercial — atualização de 6 de novembro de 2026

Ricardo definiu site de página única a partir de R$ 1.800. O valor inicial não é preço fechado de qualquer escopo. Outros valores de criação e adicionais discutidos anteriormente continuam referências de proposta, sem calculador ativo.

Até 30 imagens com IA sem custo adicional por projeto, incluindo versões alteradas em revisão. Contagem adotada: 20 imagens iniciais e 10 revisadas consomem 30; gerações internas descartadas não contam como entrega. Excedentes exigem orçamento antes de produzir. Fotos reais, vídeo e licenças são itens diferentes.

Ricardo aceitou como proposta inicial manutenção técnica a R$ 190/mês e manutenção com até 1 hora de alterações a R$ 390/mês. Planos opcionais; prazos, cancelamento, acúmulo e excedentes ficam para a proposta. Tracking avançado tem implantação e acompanhamento separados. Integrações exigem definir sistema, operação, dados, API e responsabilidades de manutenção.

Hospedagem gratuita por 12 meses para sites com tráfego moderado, mediante avaliação; e-mail com custo adicional. Não há corte numérico aprovado. O briefing registra visitas/sessões mensais, fonte e período, picos de campanhas, recursos pesados e necessidade de e-mail. Limites de uso, crescimento e valor após 12 meses devem constar na proposta, sem renovação automática presumida. A gratuidade não inclui domínio nem exige contratação de manutenção.

## Lacunas da FAQ e JSON do Mercúrio

Ricardo informou que a futura API aceitará JSON com os campos estruturados aqui. Os consumidores atuais são ferramentas WebMCP, painel local e documentação pública das ferramentas; nenhum consumidor remoto está conectado. Mantidos IDs dos 25 campos anteriores; seis novos campos opcionais cobrem tráfego, picos, e-mail, manutenção, tracking avançado e imagens.

As lacunas usam armazenamento separado __apex_faq_gaps_v1, com revisão, limite de 50 registros, validação antes de salvar e deduplicação local por pergunta normalizada, assunto e motivo. Não mudam o schema do briefing nem o tracking. Busca sem resultado não registra automaticamente uma lacuna. O assistente lê a base, identifica o que falta, remove detalhes pessoais e registra somente com autorização do comprador. A validação recusa e-mail, URLs e sequências comuns de telefone; não substitui revisão de nomes e detalhes privados pelo assistente.

Contrato proposto de exportação: schema_version=1; event_type=faq_gap_batch; source=apex_webmcp; revision; events; delivery. Cada evento contém id estável, created_at, base_version, question_summary, topic, reason, consulted_topics, classification_by=assistant e editorial_status=pending_review. Não inclui contato, briefing, transcrição ou URL do visitante. Os IDs permitem deduplicar um reenvio futuro. Motivos: not_documented, partial_answer, undefined_policy, needs_evaluation, conflicting_information.

O código e os schemas canônicos estão em src/lib/faq-gaps.ts. A ferramenta de consulta e o painel exportam exatamente esse JSON. delivery permanece local_only e sent=false. Apagar dúvidas preserva briefing; apagar briefing preserva dúvidas, que possuem controle próprio. Nenhuma lacuna é recebida pelo Mercúrio nem publicada automaticamente na FAQ. A futura integração deverá registrar recebimento confirmado e permitir agrupamento e revisão editorial.

Verificação incremental desta atualização: artifacts/faq-gaps-e2e.json registra a sequência reproduzível no navegador, incluindo classificação, duplicação, revisão antiga, rejeição de e-mail, persistência e exclusão pela interface. artifacts/faq-gap-payload-example.json contém o JSON de um exemplo fictício efetivamente registrado, removido da sessão após a verificação. Após recarga, os identificadores WebMCP retornaram estado expirado; persistência e exclusão foram verificadas pela interface. Build e checagem TypeScript restrita a src passaram.

## Contrato do Mercúrio e teste técnico — 6 de novembro de 2026

Fonte: https://app.mercurio.ia.br/configuracoes/captacao-leads, consultada na sessão autenticada de Ricardo. POST https://app.mercurio.ia.br/api/webhooks/leads; autenticação Authorization: Bearer. Chave local em .env.local, variável MERCURIO_LEADS_API_KEY, fora do Git e sem prefixo PUBLIC_. Na futura publicação, configurar como segredo do servidor; nunca incluir no JavaScript entregue ao navegador. O Apex ainda é estático e não possui adaptador público de envio.

Campos: id_envio estável (até 100 letras, números e . _ : -), nome e pelo menos email ou telefone; empresa/cnpj opcionais; servico_id=67 identifica Site no catálogo consultado; interesse/mensagem são texto; pagina, utm_source, utm_medium, utm_campaign e ref preservam origem. dados aceita objeto JSON até 48 KB; _gotcha deve ficar vazio. Demais campos de tracking da Apex continuam preservados em seu contrato e podem integrar dados no adaptador futuro, sem substituir os campos reconhecidos pelo Mercúrio.

Resposta: 201 com protocolo, status e reenvio=false para novo pedido; repetição do mesmo id_envio retorna 200 com o mesmo protocolo e reenvio=true. Erros: 400 com campos, 401 para chave inválida e 429 com Retry-After. A implementação futura só deve confirmar recebimento com protocolo válido e manter o mesmo id_envio em uma tentativa de reenvio.

Este endpoint cria leads e exige contato. Lacunas da FAQ podem acompanhar o pedido autorizado em dados.faq_gaps. Para receber somente lacunas, sem criar lead, será necessário um endpoint próprio; não fabricar contato para contornar essa exigência. O registro fictício abaixo é exclusivamente teste técnico autorizado por Ricardo.

scripts/test-mercurio.mjs lê a chave sem exibi-la, usa curl com cabeçalho pelo stdin, envia registro claramente identificado e verifica idempotência. Reproduzir com node scripts/test-mercurio.mjs --id=apex-test-20261106-01; esse ID reutiliza o pedido já testado. O arquivo artifacts/apex-test-20261106-01.json registra payload e respostas sem chave. Primeira chamada: 201; segunda: 200; protocolo 67943e6d-8109-4889-a7e9-b1389afefb87. Conferido na interface: um pedido no lead TESTE TÉCNICO APEX — NÃO CONTATAR, com briefing, estimativa e faq_gaps preservados. O lead foi mantido para revisão. Nenhuma mensagem foi enviada a terceiros.
