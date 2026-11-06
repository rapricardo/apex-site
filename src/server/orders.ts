import { InputError, validate } from '../lib/input';
import { requestSchema, mercurioPayload, validReceipt, type OrderPayload } from '../lib/order-contract';

export const mercurioEndpoint = 'https://app.mercurio.ia.br/api/webhooks/leads';
type Env = { MERCURIO_LEADS_API_KEY?: string };
export type Transport = (payload: unknown, key: string) => Promise<Response>;
const send: Transport = (payload, key) => fetch(mercurioEndpoint, {
  method: 'POST', redirect: 'error', signal: AbortSignal.timeout(20000),
  headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
});
const json = (body: unknown, status = 200, extra: Record<string, string> = {}) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra } });

export async function handleOrder(request: Request, env: Env, transport: Transport = send): Promise<Response> {
  if (request.method !== 'POST') return json({ error: 'Use POST para enviar o pedido.' }, 405, { Allow: 'POST' });
  if (request.headers.get('origin') !== new URL(request.url).origin) return json({ error: 'Envie o pedido pela própria página da Apex.' }, 403);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return json({ error: 'Formato de pedido inválido.' }, 415);
  const key = env.MERCURIO_LEADS_API_KEY?.trim();
  if (!key || /\s/.test(key)) return json({ error: 'O envio está temporariamente indisponível. Seu pedido permanece nesta aba.' }, 503);
  let submitted: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return json({ error: 'Pedido vazio.' }, 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 80 * 1024) { await reader.cancel(); return json({ error: 'Pedido muito grande. Reduza o conteúdo antes de revisar.' }, 413); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    submitted = JSON.parse(new TextDecoder().decode(bytes));
    validate(requestSchema, submitted);
    const payload = mercurioPayload((submitted as { order: OrderPayload }).order);
    const response = await transport(payload, key);
    if (![200, 201].includes(response.status)) console.warn('Mercurio upstream request failed', { status: response.status, contentType: response.headers.get('content-type') });
    if (response.status === 429) {
      const delay = response.headers.get('retry-after');
      return json({ error: 'Limite temporário de envios. Aguarde e tente novamente; o identificador será preservado.' }, 429, delay && /^\d{1,6}$/.test(delay) ? { 'Retry-After': delay } : {});
    }
    if (response.status === 400) return json({ error: 'O Mercúrio não aceitou os dados. Confira nome, contato e resumo antes de revisar novamente.' }, 422);
    if (response.status === 401) return json({ error: 'O envio está temporariamente indisponível. Seu pedido permanece nesta aba.' }, 503);
    if (![200, 201].includes(response.status)) return json({ error: 'Não foi possível confirmar o recebimento. Tente novamente com este mesmo pedido.' }, 502);
    const receipt = await response.json();
    if (!validReceipt(receipt)) return json({ error: 'O destino não confirmou um protocolo válido. Tente novamente com este mesmo pedido.' }, 502);
    return json({ protocolo: receipt.protocolo, status: receipt.status, reenvio: receipt.reenvio }, response.status);
  } catch (error) {
    if (error instanceof InputError) return json({ error: error.message, code: error.code }, error.code === 'payload_too_large' ? 413 : 400);
    if (error instanceof SyntaxError && !submitted) return json({ error: 'JSON inválido.' }, 400);
    console.warn('Mercurio transport failed', { name: error instanceof Error ? error.name : 'UnknownError', message: error instanceof Error ? error.message.slice(0, 200) : '' });
    return json({ error: 'Não foi possível confirmar o recebimento. Seu pedido foi preservado; tente novamente com o mesmo identificador.' }, 502);
  }
}
