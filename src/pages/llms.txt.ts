import type { APIRoute } from 'astro';
import { knowledgeVersion } from '../data/knowledge';
export const GET: APIRoute = () => new Response(`# Apex — sites por Ricardo Tocha

> Criação e reformulação de sites para pequenas e médias empresas. Base ${knowledgeVersion}.

- [Base completa](/para-assistentes): oferta, critérios de escopo, limites, campos e ferramentas.
- [Dados estruturados](/apex-context.json): versão JSON da mesma base pública, sem dados de visitantes.
- [Site e portfólio](/): trabalhos e acesso ao briefing local.

As ferramentas WebMCP são registradas na página em navegador compatível. O briefing fica apenas nesta aba. Não há servidor MCP remoto. Preços, envio ao Mercúrio e notificações estão indisponíveis. Não inventar condições comerciais nem afirmar que um pedido foi enviado.
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
