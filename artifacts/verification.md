# Verificação da prévia visual

Executada em 6 de novembro de 2026 no navegador integrado, com o build estático do Astro. Nenhum pedido ou contato foi enviado.

## Reprodução

Na pasta do Apex, executar `npm run build` e `npm run preview -- --host 127.0.0.1 --port 4321`. Abrir http://127.0.0.1:4321/.

1. Abrir “Levar para o meu ChatGPT”: painel apresenta o pedido inicial e informa que orçamento e envio estão indisponíveis.
2. Clicar em “Copiar pedido”: interface mostra o retorno da Clipboard API. A leitura posterior pelo clipboard da automação não confirmou o mesmo conteúdo; a colagem em um aplicativo externo não foi verificada.
3. Fechar com Escape: foco retorna ao botão de abertura.
4. Escolher Athena no portfólio: nome, descrição, imagem, estado selecionado e link mudam para Athena.
5. Navegar ao portfólio: atalho persistente aparece e abre o painel de conversa.
6. Pausar movimento: controle passa a “Retomar movimento” e classe de pausa é aplicada.
7. Abrir /sites: mesma página e fluxo “Como funciona” → “Preparar minha conversa” → fechar, com foco restaurado.
8. Abrir /para-assistentes: oferta, roteiro de briefing e condições indefinidas ficam acessíveis.
9. Em viewport 390 × 844, conferir cabeçalho, primeira tela e painel. Não foi observado overflow horizontal nem imagem sem carregamento. Restaurar viewport padrão ao terminar.

Build e `git diff --check` concluídos. Não há WebMCP operacional nem integração Mercúrio nesta etapa; não foram testados cálculo de orçamento, submissão ou entrega de lead.

## Capturas

- desktop.jpg: primeira tela no viewport padrão.
- mobile.jpg: primeira tela em 390 × 844.
- full-page.jpg: composição completa.
- chat-preview.jpg: painel e estado de cópia no desktop.
- project-selection.jpg: seleção de Athena.
