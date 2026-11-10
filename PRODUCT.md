# Apex — Sites e contratação pelo assistente do comprador

## Decisões de Ricardo em 6 de novembro de 2026

- Substituir a apresentação anterior de operações de marketing para agências.
- Vender criação e reformulação de sites como entrada para serviços de marketing.
- Usar “Seu próximo site começa com uma conversa no seu ChatGPT” na abertura.
- Manter a comunicação humana breve, visual e dinâmica, com imagens de projetos reais.
- Apresentar os trabalhos em uma composição explorável, com detalhes sob demanda.
- Disponibilizar informação extensa e estruturada ao assistente do comprador.
- Consultar referências de preço e submeter pedido revisado e confirmado pelo cliente.
- Receber pedidos no Mercúrio. Ricardo está criando a API e fornecerá o contrato.
- Consultar e simular não devem registrar contato para abordagem comercial.
- Em 6 de novembro, Ricardo autorizou implementar o WebMCP com uma base rica para conduzir o briefing; manter envio pendente enquanto termina a API do Mercúrio.

## Implementação local atual

Home e /sites usam a mesma experiência visual. Projetos: Ricardo Tocha, Athena, Mercúrio, Binary Dimension, Aurazap, Associação Novos Caminhos, IBREP, Anacã Música e Estúdio Anacã. Ricardo solicitou os seis novos projetos em 10 de novembro de 2026. Capturas dos três primeiros obtidas em 6 de novembro; dos seis adicionais, em 10 de novembro, nas respectivas páginas públicas. A abertura mantém três destaques e a seção de trabalhos permite selecionar os nove projetos, com nome, descrição, imagem e link. O seletor usa três colunas no desktop e duas no celular. A base para assistentes recebe o mesmo catálogo. Não atribuir resultados de vendas a essas imagens.

A base está em src/data/knowledge.ts e src/data/offer.ts, com 21 assuntos: oferta, formatos, objetivo, estrutura, conteúdo, design, migração, integrações, tracking, busca, atualização, assistentes, preços, prazos, propriedade, exceções, privacidade, envio e lacunas. Cada assunto distingue direção confirmada, orientação de escopo e condição comercial indefinida. /para-assistentes, /apex-context.json e /llms.txt expõem a mesma base pública, sem respostas de visitantes.

O WebMCP registra treze ferramentas nas páginas pelo document.modelContext, com detecção de suporte e descarte pelo ciclo de vida. Ferramentas: apex_consultar_base, apex_pesquisar_base, apex_consultar_briefing, apex_atualizar_briefing, apex_comparar_escopos, apex_preparar_resumo apex_apagar_briefing, apex_consultar_lacunas, apex_registrar_lacuna e apex_apagar_lacunas. O envio usa apex_preparar_pedido, apex_consultar_pedido e apex_enviar_pedido. Não há servidor MCP remoto ou plugin instalável.

O briefing tem 31 campos e respostas confirmadas, hipotéticas, indefinidas, adiadas ou não aplicáveis. As perguntas são condicionais para reformulação, integração, blog e ações por assistentes. A ferramenta retorna até duas próximas perguntas, mantém decisões adiadas para revisão e preserva separadamente respostas fora do escopo ativo. Comparações explicam dependências e exclusões; não calculam preço ou prazo.

O rascunho fica em sessionStorage sob __apex_briefing_v1, separado do tracking. Não há sincronização entre abas. O rascunho só é transmitido ao Mercúrio quando incluído em um pedido confirmado. O navegador pode restaurar a sessão; o painel e a ferramenta de exclusão removem explicitamente as respostas. Cada alteração exige a revisão atual. Validação do lote ocorre antes de salvar; erros preservam o estado anterior. Textos do comprador são renderizados como texto, sem execução de HTML. Falha de armazenamento impede gravação e mantém a consulta pública utilizável.

O painel Seu briefing permite ler, copiar e apagar. A cópia não é submissão. Envio ao Mercúrio acontece apenas pela ação separada de revisão e confirmação do pedido. O código antigo e as páginas históricas permanecem no repositório; não participam da nova home. Dúvidas podem acompanhar o pedido; envio separado de lacunas continua indisponível.

## Integração prevista

O contrato do Mercúrio foi consultado e testado em 6 de novembro de 2026. Ao implementar o adaptador público, preservar campos, autenticação e semântica do destino. Credenciais ficam no servidor. Submissão exige confirmação sobre escopo e contato, validação do servidor, prevenção de duplicações e identificador retornado pelo destino. Não mostrar sucesso sem confirmação de registro.

Proposta de informações, sem definir o schema da API: contato autorizado; objetivo e briefing; escopo, exclusões e pendências; estimativa e versão das regras; atribuição disponível; identificação da submissão e confirmação do comprador. Transporte, autenticação e confirmação de recebimento da API foram validados no teste técnico abaixo; o fluxo público local está conectado pelo adaptador descrito abaixo. Preço inicial e propostas de manutenção constam em src/data/offer.ts; o cálculo final depende das regras de escopo.

## Preservação

Manter os identificadores de tracking existentes, a chave __wl_tracking e o evento form_submit_lead. Manter os 26 campos hidden no formulário de pedido e populá-los antes do envio.

## Verificação desta etapa

A verificação usa chamadas reais às ferramentas no navegador compatível e um briefing fictício. As evidências e a sequência reproduzível estão em artifacts/webmcp-e2e.json e artifacts/webmcp-verification.md. O recorte inclui validação de entrada, proteção de revisões, persistência, perguntas condicionais, resumo e ausência de submissão.

## Oferta comercial — atualização de 6 de novembro de 2026

Ricardo definiu site de página única a partir de R$ 1.800. O valor inicial não é preço fechado de qualquer escopo. Outros valores de criação e adicionais discutidos anteriormente continuam referências de proposta, sem calculador ativo.

Até 30 imagens com IA sem custo adicional por projeto, incluindo versões alteradas em revisão. Contagem adotada: 20 imagens iniciais e 10 revisadas consomem 30; gerações internas descartadas não contam como entrega. Excedentes exigem orçamento antes de produzir. Fotos reais, vídeo e licenças são itens diferentes.

Ricardo aceitou como proposta inicial manutenção técnica a R$ 190/mês e manutenção com até 1 hora de alterações a R$ 390/mês. Planos opcionais; prazos, cancelamento, acúmulo e excedentes ficam para a proposta. Tracking avançado tem implantação e acompanhamento separados. Integrações exigem definir sistema, operação, dados, API e responsabilidades de manutenção.

Hospedagem gratuita por 12 meses para sites com tráfego moderado, mediante avaliação; e-mail com custo adicional. Não há corte numérico aprovado. O briefing registra visitas/sessões mensais, fonte e período, picos de campanhas, recursos pesados e necessidade de e-mail. Limites de uso, crescimento e valor após 12 meses devem constar na proposta, sem renovação automática presumida. A gratuidade não inclui domínio nem exige contratação de manutenção.

## Lacunas da FAQ e JSON do Mercúrio

Ricardo informou que a futura API aceitará JSON com os campos estruturados aqui. Os consumidores atuais são ferramentas WebMCP, painel local e documentação pública das ferramentas; o Mercúrio recebe agora o pedido confirmado pelo adaptador descrito abaixo. Mantidos IDs dos 25 campos anteriores; seis novos campos opcionais cobrem tráfego, picos, e-mail, manutenção, tracking avançado e imagens.

As lacunas usam armazenamento separado __apex_faq_gaps_v1, com revisão, limite de 50 registros, validação antes de salvar e deduplicação local por pergunta normalizada, assunto e motivo. Não mudam o schema do briefing nem o tracking. Busca sem resultado não registra automaticamente uma lacuna. O assistente lê a base, identifica o que falta, remove detalhes pessoais e registra somente com autorização do comprador. A validação recusa e-mail, URLs e sequências comuns de telefone; não substitui revisão de nomes e detalhes privados pelo assistente.

Contrato proposto de exportação: schema_version=1; event_type=faq_gap_batch; source=apex_webmcp; revision; events; delivery. Cada evento contém id estável, created_at, base_version, question_summary, topic, reason, consulted_topics, classification_by=assistant e editorial_status=pending_review. Não inclui contato, briefing, transcrição ou URL do visitante. Os IDs permitem deduplicar um reenvio futuro. Motivos: not_documented, partial_answer, undefined_policy, needs_evaluation, conflicting_information.

O código e os schemas canônicos estão em src/lib/faq-gaps.ts. A ferramenta de consulta e o painel exportam exatamente esse JSON. A exportação permanece sent=false, com delivery.status=export_only; ela não realiza envio. Apagar dúvidas preserva briefing; apagar briefing preserva dúvidas, que possuem controle próprio. Lacunas selecionadas acompanham o pedido confirmado em dados.faq_gaps; não são publicadas automaticamente na FAQ. O endpoint separado para dúvidas continua futuro.

Verificação incremental desta atualização: artifacts/faq-gaps-e2e.json registra a sequência reproduzível no navegador, incluindo classificação, duplicação, revisão antiga, rejeição de e-mail, persistência e exclusão pela interface. artifacts/faq-gap-payload-example.json contém o JSON de um exemplo fictício efetivamente registrado, removido da sessão após a verificação. Após recarga, os identificadores WebMCP retornaram estado expirado; persistência e exclusão foram verificadas pela interface. Build e checagem TypeScript restrita a src passaram.

## Contrato do Mercúrio e teste técnico — 6 de novembro de 2026

Fonte: https://app.mercurio.ia.br/configuracoes/captacao-leads, consultada na sessão autenticada de Ricardo. POST https://app.mercurio.ia.br/api/webhooks/leads; autenticação Authorization: Bearer. Chave local em .env.local, variável MERCURIO_LEADS_API_KEY, fora do Git e sem prefixo PUBLIC_. Na futura publicação, configurar como segredo do servidor; nunca incluir no JavaScript entregue ao navegador. O Apex gera páginas estáticas e usa a Pages Function functions/api/pedidos.ts para envio; a chave permanece no servidor.

Campos: id_envio estável (até 100 letras, números e . _ : -), nome e pelo menos email ou telefone; empresa/cnpj opcionais; servico_id=67 identifica Site no catálogo consultado; interesse/mensagem são texto; pagina, utm_source, utm_medium, utm_campaign e ref preservam origem. dados aceita objeto JSON até 48 KB; _gotcha deve ficar vazio. Demais campos de tracking da Apex continuam preservados em seu contrato e integram dados no adaptador atual, sem substituir os campos reconhecidos pelo Mercúrio.

Resposta: 201 com protocolo, status e reenvio=false para novo pedido; repetição do mesmo id_envio retorna 200 com o mesmo protocolo e reenvio=true. Erros: 400 com campos, 401 para chave inválida e 429 com Retry-After. A implementação só deve confirmar recebimento com protocolo válido e manter o mesmo id_envio em uma tentativa de reenvio.

Este endpoint cria leads e exige contato. Lacunas da FAQ podem acompanhar o pedido autorizado em dados.faq_gaps. Para receber somente lacunas, sem criar lead, será necessário um endpoint próprio; não fabricar contato para contornar essa exigência. O registro fictício abaixo é exclusivamente teste técnico autorizado por Ricardo.

scripts/test-mercurio.mjs lê a chave sem exibi-la, usa curl com cabeçalho pelo stdin, envia registro claramente identificado e verifica idempotência. Reproduzir com node scripts/test-mercurio.mjs --id=apex-test-20261106-01; esse ID reutiliza o pedido já testado. O arquivo artifacts/apex-test-20261106-01.json registra payload e respostas sem chave. Primeira chamada: 201; segunda: 200; protocolo 67943e6d-8109-4889-a7e9-b1389afefb87. Conferido na interface: um pedido no lead TESTE TÉCNICO APEX — NÃO CONTATAR, com briefing, estimativa e faq_gaps preservados. O lead foi mantido para revisão. Nenhuma mensagem foi enviada a terceiros.


## Envio pelo site e WebMCP — 6 de novembro de 2026

Ricardo autorizou conectar ambos os caminhos ao Mercúrio e enviar dúvidas da FAQ junto do pedido. Endpoint separado de dúvidas fica para depois. Formulário e ferramentas compartilham src/lib/orders.ts, validação em src/lib/order-contract.ts e servidor em src/server/orders.ts. O contrato existente do destino foi preservado; dados recebe briefing, escopo, pendências, referência de preço, dúvidas, origem e confirmação.

Fluxo: nome, e-mail ou telefone e resumo; revisão do contato e conteúdo; confirmação explícita daquela revisão; envio; protocolo. Briefing incompleto pode seguir com pendências identificadas. WebMCP oferece apex_preparar_pedido, apex_consultar_pedido e apex_enviar_pedido. Alterar briefing ou dúvidas incluídas invalida uma revisão ainda não enviada. Depois de tentativa sem confirmação, o pedido e seu id_envio ficam preservados para repetir com segurança. Recebimento não confirma contratação, preço final ou prazo.

O formulário mantém os 26 hidden fields inicialmente vazios. A captura roda antes do formulário, preenche os campos antes do envio e preserva __wl_tracking, window.__wlTracking e form_submit_lead. Analytics recebe apenas identificação do formulário/canal; contato e briefing não entram nesse evento. O servidor valida origem, formato, contato, respostas, limites e protocolo retornado. Chave nunca integra o bundle público.

Desenvolvimento: npm run dev -- --host 127.0.0.1 --port 4322 usa .env.local e o mesmo handler, com transporte curl local. Publicação Cloudflare Pages usa functions/api/pedidos.ts com fetch nativo e requer MERCURIO_LEADS_API_KEY como segredo. Esta entrega não configura ambiente remoto nem publica o site.

Verificação: artifacts/orders-e2e.json registra chamadas reais, inputs reproduzíveis e protocolos. Formulário recusou ausência de contato e exigiu confirmação; WebMCP recusou revisão antiga e devolveu o mesmo protocolo na repetição. Mercúrio exibiu dois pedidos, canais site e webmcp, com briefing e dúvidas, no contato fictício TESTE FLUXO APEX — NÃO CONTATAR. Registros mantidos para conferência. Build Astro e TypeScript de src, functions e adaptador local passaram. Execução na infraestrutura Cloudflare e falhas de rede/quota não foram exercitadas nesta etapa.


## Publicação — 6 de novembro de 2026

Ricardo autorizou publicar o Apex no Cloudflare e configurar o segredo do Mercúrio em produção. Projeto existente apex-site, domínio apexmkt.ia.br e branch de produção main. Publicação direta pelo Wrangler a partir do build local; não implica push ou merge do código no GitHub. MERCURIO_LEADS_API_KEY configurado como segredo de produção, preservando a chave fora do build público. Removido o rótulo de prévia local do rodapé.


Produção confirmada em https://apexmkt.ia.br. Implantação final: https://fb3e8279.apex-site.pages.dev, código 73f4437. O runtime Cloudflare recusou redirect=error; corrigido para manual, mantendo respostas 3xx recusadas sem encaminhar a chave para outro destino. O pedido fictício autorizado preservou o mesmo id_envio entre tentativas e retornou protocolo d65fbf7e-a1e7-4150-a7d3-6df1b5acfcce, status NOVO e reenvio=false. Site exibiu Pedido recebido. Evidência e requisição reproduzível sem cookies ou credenciais: artifacts/production-deploy.json. Um pedido de produção criado no contato de teste já existente; nenhuma contratação. GitHub permanece sem push ou merge desta entrega.


## Condução investigativa — 6 de novembro de 2026

Ricardo pediu reduzir o esforço do comprador: investigar anúncios, atendimento, CRM e acompanhamento de vendas em linguagem cotidiana antes de apresentar opções técnicas. O assistente deve relacionar cada recomendação a uma necessidade relatada, explicar benefício e alternativa mais simples, e ajudar a escolher. Anúncios ou uso de CRM não confirmam contratação de tracking ou integração. Sugestões permanecem hipóteses até confirmação.

Estimular comparação com alternativas na internet, com ferramentas de pesquisa do próprio assistente, fontes atuais e escopo equivalente. Comparar custos de implantação e recorrência, trabalho exigido do cliente, limites e propriedade. A intenção comercial é oferecer valor justo; não declarar superioridade ou menor preço sem evidência. Outra solução, ajuste do site atual ou adiamento podem ser a recomendação adequada. Pesquisa não é condição para preparar pedido e não compartilha dados privados.

Implementação: guia com caminhos de investigação, critérios de pesquisa e recomendações condicionadas ao relato; descrições das ferramentas direcionam sua consulta; perguntas usam linguagem cotidiana e priorizam contexto antes de formato. Os mesmos conteúdos estão disponíveis na base JSON, na página para assistentes e em llms.txt. Preservados os 31 IDs, opções, estados, condições de campos e schemas de briefing e pedido consumidos pelo painel, ferramentas, validação do servidor e adaptador do Mercúrio. Mudam textos, prioridade e quantidade máxima de sugestões; a versão pública da base identifica a atualização. Nenhuma ferramenta de pesquisa externa foi acrescentada. O guia orienta o LLM do comprador; sua aderência depende do assistente utilizado.


## Abertura, consentimento e envio — 6 de novembro de 2026

Ricardo confirmou que o pedido chegou após sua confirmação. Pediu explicar desde o começo a fase de conversa, a coleta posterior de contato e a preparação do orçamento pelo assistente, com consentimento antecipado para reduzir esforço.

A abertura explica que conversar não envia briefing ou contato à Apex, oferece organizar rascunho nesta aba e antecipa como pedir orçamento. O consentimento inicial autoriza conversa e registro local quando aceito, sem nova permissão a cada campo. Quando houver interesse, o assistente reúne nome e um contato, prepara a solicitação e mostra a revisão para uma confirmação de envio. Confirmação já dada para essa revisão não é repetida. Não prometer ausência de processamento pelo navegador/assistente, segurança absoluta, orçamento fechado ou contratação. O cliente não preenche formulário nem repete o briefing. Revisão pronta é comunicada como ainda não enviada; recebimento exige protocolo. Contratos e mecanismos de confirmação e envio permanecem preservados.

Publicação autorizada e concluída no Cloudflare em 6 de novembro de 2026: https://07ecd134.apex-site.pages.dev, fonte 40ea968, domínio https://apexmkt.ia.br. A base pública retornou 2026-11-06-orders-v3-discovery-v2 e conteúdo idêntico ao build, incluindo investigação, comparação de alternativas e abertura com consentimento. Deploy direto, sem push ou merge no GitHub.
