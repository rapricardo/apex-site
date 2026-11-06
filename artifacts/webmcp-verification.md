# WebMCP — verificação no navegador

Data: 6 de novembro de 2026. Execução local em http://127.0.0.1:4321/, no navegador integrado do ChatGPT. As chamadas usaram ferramentas WebMCP registradas pelo próprio site, sem simular document.modelContext.

## Resultado

- Sete ferramentas descobertas e chamadas. Nenhuma ferramenta de submissão registrada.
- Consulta completa: 19 assuntos. Pesquisa de preço retornou precos como primeiro assunto; preços continuaram indisponíveis.
- Lote contendo URL javascript: rejeitado por invalid_url. Revisão permaneceu 0 e nenhuma resposta do lote foi gravada.
- Briefing fictício com dez respostas salvo na revisão 1. Próximas perguntas foram preserve_existing, integrations e blog_content. A atualização indefinida não foi perguntada novamente.
- Atualização com revisão 0 após a primeira gravação rejeitada por revision_conflict.
- Alteração de integração para não: resposta anterior preservada em retained_inactive e excluída das entradas ativas do resumo.
- Decisão adiada sobre blog conservada como pendência; status needs_decisions.
- Comparação de dois escopos retornou diferenças e dependências, com price null e binding false.
- Texto contendo marcação HTML apareceu como texto no painel.
- Recarga preservou revisão e respostas. Outra aba começou vazia.
- Pesquisa sem correspondência retornou not_documented e notification_sent false.
- Resumo retornou sent false e price null. Conteúdo exportado em webmcp-summary.txt.
- Exclusão do rascunho fictício retornou revisão 5 sem respostas; consulta posterior retornou empty.

Nenhum contato real foi usado. Nenhum pedido foi enviado ao Mercúrio ou Apolo. O rascunho de teste foi apagado ao terminar.

## Reprodução

1. Na pasta Apex, executar npm run build e npm run preview -- --host 127.0.0.1 --port 4321.
2. Abrir uma aba nova no navegador integrado compatível e aguardar o status das ferramentas disponíveis. Consultar o briefing e confirmar revisão 0 sem respostas antes de usar dados fictícios.
3. Descobrir as ferramentas pela API WebMCP do navegador. Os sufixos de identificação são atribuídos pelo navegador a cada descoberta; resolver pelo nome lógico listado em webmcp-e2e.json.
4. Reexecutar os inputs registrados na sequência calls de webmcp-e2e.json, verificando ok, códigos esperados de erro, revisões e valores retornados. A entrada apex_consultar_briefing_other_tab deve ser feita em uma segunda aba nova.
5. Depois de recarregar ou navegar, descobrir as ferramentas novamente. Não reutilizar identificadores de uma página anterior.
6. Abrir Seu briefing para conferir o estado visual. Consultar também /para-assistentes, /apex-context.json e /llms.txt para o conteúdo público.
7. Apagar apenas o rascunho fictício, usando sua revisão atual. Não executar a sequência sobre um briefing real existente.

## Arquivos

- webmcp-e2e.json: inputs e respostas reais das ferramentas, com dados fictícios.
- webmcp-briefing.jpg: painel preenchido pelo WebMCP.
- webmcp-summary.txt: resumo retornado pela ferramenta.

## Validação técnica e limites

Build Astro e git diff --check passaram. A checagem TypeScript restrita a src e aos tipos Astro passou. A checagem global também inclui referencias/apexmkt.ia.br e encontrou dois erros preexistentes de imports de tipos em Process.tsx e Terminal.tsx; esses arquivos não foram alterados.

Não foram exercitados falha por quota/bloqueio de sessionStorage ou navegador sem suporte ao WebMCP. Esses caminhos têm tratamento explícito no código. Não há preço configurado, API Mercúrio, envio de pedido, notificação de lacunas nem publicação remota nesta entrega.
