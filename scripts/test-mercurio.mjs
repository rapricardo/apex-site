import { loadEnvFile } from 'node:process';
import { fileURLToPath } from 'node:url';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { sendMercurioLocal } from './mercurio-transport.mjs';

const root = new URL('../', import.meta.url);
try { loadEnvFile(fileURLToPath(new URL('.env.local', root))); }
catch (error) { if (error.code !== 'ENOENT') throw new Error('Não foi possível carregar .env.local.'); }
const key = process.env.MERCURIO_LEADS_API_KEY?.trim();
const configured = Boolean(key && key.length >= 16 && key.length <= 512 && !/\s/.test(key));
if (process.argv.includes('--check')) {
  console.log(JSON.stringify({ key_configured: configured, key_disclosed: false, request_sent: false }));
  process.exit(configured ? 0 : 1);
}
if (!configured) {
  console.error('Salve MERCURIO_LEADS_API_KEY em .env.local antes do teste. Nenhuma chamada realizada.');
  process.exit(1);
}
const submissionId = process.argv.find(arg => arg.startsWith('--id='))?.slice(5);
if (!submissionId || !/^[a-zA-Z0-9._:-]{1,100}$/.test(submissionId)) {
  console.error('Informe --id=apex-test-identificador. Reutilize o mesmo id para repetir este pedido.');
  process.exit(1);
}

const endpoint = 'https://app.mercurio.ia.br/api/webhooks/leads';
const faq = JSON.parse(await readFile(new URL('artifacts/faq-gap-payload-example.json', root), 'utf8'));
const payload = {
  id_envio: submissionId,
  nome: 'TESTE TÉCNICO APEX — NÃO CONTATAR',
  email: 'teste-integracao-apex@example.invalid',
  servico_id: 67,
  interesse: 'Teste de integração Apex / Mercúrio',
  mensagem: 'Registro fictício autorizado para testar JSON e idempotência. Não representa cliente ou pedido comercial. Não contatar.',
  pagina: 'http://127.0.0.1:4321/',
  utm_source: 'apex_test', utm_medium: 'integration_test', utm_campaign: 'validacao_mercurio',
  _gotcha: '',
  dados: {
    schema_version: 1, test: true, source: 'apex',
    briefing: { objective: 'Validar recebimento do briefing estruturado; exemplo fictício.', project_type: 'landing_page' },
    estimativa: { status: 'starting_price', currency: 'BRL', from: 1800, binding: false },
    faq_gaps: faq.events,
  },
};
if (Buffer.byteLength(JSON.stringify(payload.dados), 'utf8') > 48 * 1024) throw new Error('dados excede 48 KB.');
const report = { tested_at: new Date().toISOString(), endpoint, id_envio: submissionId, payload, requests: [], passed: false };

async function send() {
  const response = await sendMercurioLocal(payload, key);
  const httpStatus = response.status;
  const body = await response.json().catch(() => null);
  const result = {
    http_status: httpStatus,
    protocolo: typeof body?.protocolo === 'string' && /^[a-zA-Z0-9-]{1,100}$/.test(body.protocolo) ? body.protocolo : null,
    status: typeof body?.status === 'string' && /^[A-Z_]{1,40}$/.test(body.status) ? body.status : null,
    reenvio: typeof body?.reenvio === 'boolean' ? body.reenvio : null,
  };
  report.requests.push(result);
  if (![200, 201].includes(httpStatus) || !result.protocolo || !result.status || result.reenvio === null) {
    throw new Error(`Resposta inválida para confirmação de recebimento (HTTP ${httpStatus}).`);
  }
  return result;
}
try {
  const first = await send();
  const repeat = await send();
  if (repeat.http_status !== 200 || !repeat.reenvio || repeat.protocolo !== first.protocolo) throw new Error('Reenvio não confirmou o mesmo protocolo.');
  report.passed = true;
  console.log(JSON.stringify({ passed: true, protocolo: first.protocolo, reenvio: repeat.reenvio, http_statuses: report.requests.map(request => request.http_status) }));
} catch (error) {
  // Não imprimir objetos de requisição, cabeçalhos, chave ou resposta arbitrária do servidor.
  report.error = error instanceof Error && /^(Resposta inválida|Reenvio não confirmou)/.test(error.message) ? error.message : 'Falha de rede ou tempo limite. Repita com o mesmo id_envio para evitar duplicação.';
  console.error(report.error);
  process.exitCode = 1;
} finally {
  await mkdir(new URL('artifacts/', root), { recursive: true });
  await writeFile(new URL(`artifacts/${submissionId}.json`, root), `${JSON.stringify(report, null, 2)}\n`);
}
