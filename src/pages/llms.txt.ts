import type { APIRoute } from 'astro';
import { knowledgeVersion } from '../data/knowledge';
export const GET: APIRoute = () => new Response(`# Apex — sites por Ricardo Tocha

> Criação e reformulação de sites para pequenas e médias empresas. Base ${knowledgeVersion}.

- [Base completa](/para-assistentes): oferta, critérios de escopo, limites, campos e ferramentas.
- [Dados estruturados](/apex-context.json): versão JSON da mesma base pública, sem dados de visitantes.
- [Site e portfólio](/): trabalhos e acesso ao briefing local.

As ferramentas WebMCP são registradas na página em navegador compatível. O briefing fica apenas nesta aba. Não há servidor MCP remoto. Página única a partir de R$ 1.800; até 30 imagens com IA, contando versões revisadas. Manutenção técnica: proposta inicial de R$ 190/mês; com até 1 hora de alterações: R$ 390/mês. Hospedagem por 12 meses para tráfego moderado mediante avaliação; e-mail à parte. O envio pelo site e WebMCP exige revisão de contato, projeto, briefing e dúvidas selecionadas, seguida de confirmação explícita. Só confirmar recebimento com protocolo. Repetir tentativas com o mesmo review_id. Orçamento fechado automático e envio separado de FAQ não estão disponíveis. Lacunas podem ser classificadas e salvas localmente com autorização, sem contato ou transcrição. Não inventar condições comerciais nem afirmar envio sem protocolo confirmado.
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
