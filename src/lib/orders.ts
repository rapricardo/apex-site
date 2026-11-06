import { readDraft } from './briefing';
import { readGaps } from './faq-gaps';
import { offer } from '../data/offer';
import { trackingFields } from '../data/tracking-fields';
import { InputError, validate } from './input';
import { prepareOrderSchema, submitOrderSchema, validateOrder, mercurioPayload, orderSummary, validReceipt, type Contact, type OrderPayload, type Receipt } from './order-contract';

export type OrderState = { schema_version: 1; order: OrderPayload; include_faq: boolean; attempted: boolean; receipt: Receipt | null; error: string | null; tracked: boolean };
type PrepareInput = { contact: Contact; message: string; include_faq: boolean };
const storageKey = '__apex_order_v1';
let fallback: OrderState | null = null;
let inFlight: Promise<void> | null = null;

export function readOrder(): OrderState | null {
  if (fallback) return fallback;
  let raw: string | null;
  try { raw = sessionStorage.getItem(storageKey); } catch { throw new InputError('storage_unavailable', 'Não foi possível acessar o pedido local.'); }
  if (!raw) return null;
  try {
    const state = JSON.parse(raw) as OrderState;
    validateOrder(state.order);
    if (state.schema_version !== 1 || typeof state.attempted !== 'boolean' || typeof state.include_faq !== 'boolean' || typeof state.tracked !== 'boolean' || (state.error !== null && typeof state.error !== 'string') || (state.receipt !== null && !validReceipt(state.receipt))) throw new Error('invalid');
    return state;
  } catch { throw new InputError('order_unreadable', 'O pedido salvo não pôde ser lido. Ele foi preservado; não faça um novo envio sem conferir se o anterior chegou.'); }
}
function persist(state: OrderState) {
  try { sessionStorage.setItem(storageKey, JSON.stringify(state)); fallback = null; }
  catch { throw new InputError('save_failed', 'Não foi possível preservar o pedido nesta aba. Nenhum novo envio foi iniciado.'); }
  window.dispatchEvent(new Event('apex:order-changed'));
}
function populateTracking(tracking: Record<string, string>) {
  for (const field of trackingFields) {
    const input = document.getElementById(`h_${field}`) as HTMLInputElement | null;
    if (input) input.value = tracking[field] ?? '';
  }
}
function trackingSnapshot() {
  const stored = (window as Window & { __wlTracking?: Record<string, unknown> }).__wlTracking ?? {};
  const values = Object.fromEntries(trackingFields.map(field => [field, typeof stored[field] === 'string' ? stored[field] as string : '']));
  populateTracking(values);
  return values;
}
export function orderView(state = readOrder()) {
  if (!state) return { status: 'empty' as const, review_id: null, sent: false, receipt: null, review: null, error: null, busy: Boolean(inFlight) };
  const summary = orderSummary(state.order);
  return {
    status: state.receipt ? 'received' : state.attempted ? 'unconfirmed' : 'review',
    review_id: state.order.id_envio, sent: Boolean(state.receipt), receipt: state.receipt, error: state.error, busy: Boolean(inFlight),
    review: {
      contact: state.order.contact, message: state.order.message, briefing: summary.entries,
      preserved_outside_scope: summary.evaluation.retained_inactive,
      missing: summary.evaluation.missing_required, decisions: summary.evaluation.decisions_to_revisit,
      dependencies: summary.evaluation.scope_notes, commercial_pending: offer.unresolved_terms,
      pricing: offer.pricing, faq_gaps: state.order.faq_gaps,
      source: { page: state.order.pagina, tracking: state.order.tracking },
      notice: 'Solicitação de proposta para Ricardo Tocha. O recebimento não confirma contratação, preço final ou prazo. Contato, resumo, briefing e dúvidas exibidas serão enviados ao Mercúrio.',
    },
  };
}
export function prepareOrder(input: unknown, channel: 'site' | 'webmcp') {
  validate(prepareOrderSchema, input);
  const data = input as PrepareInput;
  const previous = readOrder();
  if (inFlight || (previous?.attempted && !previous.receipt)) throw new InputError('pending_delivery', 'Existe um envio sem confirmação. Consulte o pedido e tente novamente com o mesmo identificador antes de preparar outro.');
  const draft = readDraft();
  const gaps = readGaps();
  const order: OrderPayload = {
    schema_version: 1, id_envio: `apex-${crypto.randomUUID()}`, channel, base_version: offer.version,
    contact: Object.fromEntries(Object.entries(data.contact).map(([key, value]) => [key, value.trim()])) as Contact,
    message: data.message.trim(), briefing_revision: draft.revision,
    answers: Object.entries(draft.answers).map(([field, answer]) => ({ field, ...answer })),
    gaps_revision: gaps.revision, faq_gaps: data.include_faq ? gaps.events : [],
    tracking: trackingSnapshot(), pagina: `${location.origin}${location.pathname}`, _gotcha: (document.querySelector<HTMLInputElement>('#order-gotcha')?.value ?? ''),
  };
  mercurioPayload(order);
  const same = previous && JSON.stringify({ ...previous.order, id_envio: '', channel: '' }) === JSON.stringify({ ...order, id_envio: '', channel: '' }) && previous.include_faq === data.include_faq;
  if (!same) persist({ schema_version: 1, order, include_faq: data.include_faq, attempted: false, receipt: null, error: null, tracked: false });
  window.dispatchEvent(new Event('apex:order-review'));
  return orderView();
}
export function assertFreshReview(state: OrderState) {
  if (!state.attempted && (readDraft().revision !== state.order.briefing_revision || (state.include_faq && readGaps().revision !== state.order.gaps_revision) || state.order.base_version !== offer.version)) {
    throw new InputError('review_changed', 'O briefing, as dúvidas ou a oferta mudaram. Prepare e confirme uma nova revisão antes de enviar.');
  }
}
export async function submitOrder(input: unknown) {
  validate(submitOrderSchema, input);
  const state = readOrder();
  if (!state || state.order.id_envio !== (input as { review_id: string }).review_id) throw new InputError('review_mismatch', 'Esta revisão não é a revisão atual. Consulte o pedido antes de confirmar.');
  if (state.receipt) return orderView(state);
  if (inFlight) { await inFlight; return orderView(); }
  assertFreshReview(state);
  populateTracking(state.order.tracking);
  state.attempted = true;
  state.error = null;
  persist(state);
  inFlight = (async () => {
    try {
      const response = await fetch('/api/pedidos', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order: state.order, confirmation: 'enviar_pedido_revisado' }), signal: AbortSignal.timeout(25000) });
      const result = await response.json().catch(() => null);
      if (![200, 201].includes(response.status) || !validReceipt(result)) {
        if ([400, 403, 413, 415, 422].includes(response.status)) state.attempted = false;
        state.error = typeof result?.error === 'string' && result.error.length < 500 ? result.error : 'Não foi possível confirmar o recebimento. Tente novamente com este pedido.';
      } else {
        state.receipt = { protocolo: result.protocolo, status: result.status, reenvio: result.reenvio };
        const emitTracking = !state.tracked;
        state.tracked = true;
        if (emitTracking) {
          const trackedWindow = window as Window & { dataLayer?: unknown[] };
          try { (trackedWindow.dataLayer ??= []).push({ event: 'form_submit_lead', form_id: 'apex_order', source: 'apex', channel: state.order.channel }); } catch { /* Analytics não altera o recebimento confirmado. */ }
        }
      }
    } catch { state.error = 'Não foi possível confirmar o recebimento. Seu pedido foi preservado; tente novamente com o mesmo identificador.'; }
    try { persist(state); } catch { fallback = state; }
  })();
  window.dispatchEvent(new Event('apex:order-changed'));
  try { await inFlight; }
  finally { inFlight = null; window.dispatchEvent(new Event('apex:order-changed')); }
  return orderView();
}
export function clearOrder() {
  if (inFlight) throw new InputError('sending', 'Aguarde o resultado do envio antes de limpar.');
  const state = readOrder();
  if (state?.attempted && !state.receipt) throw new InputError('pending_delivery', 'O recebimento ainda não foi confirmado. Preserve o identificador e tente novamente antes de limpar.');
  try { sessionStorage.removeItem(storageKey); } catch { throw new InputError('storage_unavailable', 'Não foi possível limpar o pedido.'); }
  fallback = null;
  window.dispatchEvent(new Event('apex:order-changed'));
}
