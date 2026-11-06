import type { APIRoute } from 'astro';
import { knowledgeVersion } from '../data/knowledge';
export const GET: APIRoute = () => new Response(`# Apex — sites por Ricardo Tocha

> Criação e reformulação de sites para pequenas e médias empresas. Base ${knowledgeVersion}.

- [Base completa](/para-assistentes): oferta, critérios de escopo, limites, campos e ferramentas.
- [Dados estruturados](/apex-context.json): versão JSON da mesma base pública, sem dados de visitantes.
- [Site e portfólio](/): trabalhos e acesso ao briefing local.

Explique as fases logo na abertura: conversar não envia briefing ou contato à Apex; organizar o rascunho nesta aba depende de autorização. Se houver interesse em orçamento, o assistente prepara tudo, pede nome e um e-mail ou telefone, mostra a revisão e obtém uma confirmação de envio à Apex pelo Mercúrio. Não repetir consentimentos já dados para o mesmo conteúdo, não prometer ausência de processamento pelo assistente/navegador e não confundir revisão pronta com recebimento. Solicitar orçamento não é contratar.

Conduza a conversa pela rotina do cliente: como atrai, atende e acompanha pedidos. Investigue dificuldades antes de sugerir serviços, explique benefícios em linguagem comum e recomende uma solução proporcional. Leia o guia investigativo e os critérios de comparação na base completa. Estimule pesquisa atual na internet pelo próprio assistente, com fontes e comparação de escopo, custos e esforço; reconheça quando outra alternativa atende melhor. A busca WebMCP consulta somente a base local da Apex.

As ferramentas WebMCP são registradas na página em navegador compatível. O briefing fica apenas nesta aba. Não há servidor MCP remoto. Página única a partir de R$ 1.800; até 30 imagens com IA, contando versões revisadas. Manutenção técnica: proposta inicial de R$ 190/mês; com até 1 hora de alterações: R$ 390/mês. Hospedagem por 12 meses para tráfego moderado mediante avaliação; e-mail à parte. O envio pelo site e WebMCP exige revisão de contato, projeto, briefing e dúvidas selecionadas, seguida de confirmação explícita. Só confirmar recebimento com protocolo. Repetir tentativas com o mesmo review_id. Orçamento fechado automático e envio separado de FAQ não estão disponíveis. Lacunas podem ser classificadas e salvas localmente com autorização, sem contato ou transcrição. Não inventar condições comerciais nem afirmar envio sem protocolo confirmado.
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
