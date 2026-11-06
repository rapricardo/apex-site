import { briefingFields, answerStatuses } from '../data/briefing-fields';
import { offer } from '../data/offer';
import { trackingFields } from '../data/tracking-fields';
import { validateAnswer, prepareSummary, type Answer, type Draft } from './briefing';
import { gapEventSchema, type Gap } from './faq-gaps';
import { InputError, validate, objectSchema, textSchema, enumSchema, arraySchema, revisionSchema } from './input';

export type Contact = { nome: string; email: string; telefone: string; empresa: string };
export type OrderPayload = {
  schema_version: 1; id_envio: string; channel: 'site' | 'webmcp'; base_version: string;
  contact: Contact; message: string; briefing_revision: number;
  answers: (Answer & { field: string })[]; gaps_revision: number; faq_gaps: Gap[];
  tracking: Record<string, string>; pagina: string; _gotcha: string;
};
export type Receipt = { protocolo: string; status: string; reenvio: boolean };
export const contactSchema = objectSchema({ nome: textSchema(120, 2), email: textSchema(254, 0), telefone: textSchema(40, 0), empresa: textSchema(160, 0) });
export const prepareOrderSchema = objectSchema({ contact: contactSchema, message: textSchema(4000, 20), include_faq: { type: 'boolean' } });
export const submitOrderSchema = objectSchema({ review_id: textSchema(100), confirmation: enumSchema(['enviar_pedido_revisado']) });
export const orderSchema = objectSchema({
  schema_version: { type: 'integer', enum: [1] }, id_envio: textSchema(100), channel: enumSchema(['site', 'webmcp']), base_version: textSchema(80),
  contact: contactSchema, message: textSchema(4000, 20), briefing_revision: revisionSchema,
  answers: arraySchema(objectSchema({ field: enumSchema(briefingFields.map(field => field.id)), status: enumSchema(answerStatuses), value: textSchema(2000, 0) }), briefingFields.length, 0),
  gaps_revision: revisionSchema, faq_gaps: arraySchema(gapEventSchema, 50, 0),
  tracking: objectSchema(Object.fromEntries(trackingFields.map(field => [field, textSchema(field === 'session_attributes_encoded' ? 10000 : 2000, 0)])), []),
  pagina: textSchema(2000), _gotcha: textSchema(200, 0),
});
export const requestSchema = objectSchema({ order: orderSchema, confirmation: enumSchema(['enviar_pedido_revisado']) });

export function validateContact(contact: Contact) {
  validate(contactSchema, contact);
  if (!contact.email && !contact.telefone) throw new InputError('contact_required', 'Informe e-mail ou telefone para receber o retorno.');
  if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) throw new InputError('invalid_email', 'Confira o endereço de e-mail.');
  if (contact.telefone && (!/^[+\d\s().-]+$/.test(contact.telefone) || contact.telefone.replace(/\D/g, '').length < 10 || contact.telefone.replace(/\D/g, '').length > 15)) throw new InputError('invalid_phone', 'Informe telefone com DDD; use de 10 a 15 dígitos.');
}
export function validateOrder(input: unknown): asserts input is OrderPayload {
  validate(orderSchema, input);
  const order = input as OrderPayload;
  validateContact(order.contact);
  if (!/^[a-zA-Z0-9._:-]{1,100}$/.test(order.id_envio)) throw new InputError('invalid_id', 'Identificador de envio inválido. Prepare a revisão novamente.');
  if (order._gotcha) throw new InputError('invalid_request', 'Não foi possível validar este pedido.');
  let page: URL;
  try { page = new URL(order.pagina); } catch { throw new InputError('invalid_page', 'Página de origem inválida.'); }
  if (!['http:', 'https:'].includes(page.protocol) || page.username || page.password) throw new InputError('invalid_page', 'Página de origem inválida.');
  const fields = new Set<string>();
  for (const answer of order.answers) {
    if (fields.has(answer.field)) throw new InputError('duplicate_field', 'Há respostas repetidas. Revise o briefing.');
    fields.add(answer.field);
    validateAnswer(briefingFields.find(field => field.id === answer.field)!, { status: answer.status, value: answer.value });
  }
}
export function orderSummary(order: OrderPayload) {
  const draft: Draft = { schema_version: 1, revision: order.briefing_revision, id: null, updated_at: null, answers: Object.fromEntries(order.answers.map(({ field, ...answer }) => [field, answer])) };
  return prepareSummary(draft);
}
export function mercurioPayload(order: OrderPayload) {
  validateOrder(order);
  const summary = orderSummary(order);
  const dados = {
    schema_version: 1, source: 'apex', channel: order.channel,
    base_version: order.base_version, pricing_version: offer.version,
    briefing: { revision: order.briefing_revision, entries: summary.entries, retained_inactive: summary.evaluation.retained_inactive },
    escopo: { message: order.message, dependencies: summary.evaluation.scope_notes, missing_required: summary.evaluation.missing_required, decisions_to_revisit: summary.evaluation.decisions_to_revisit },
    estimativa: { status: 'starting_price', currency: 'BRL', one_page_from: offer.pricing.one_page_from, binding: false, message: offer.pricing.message },
    commercial_pending: offer.unresolved_terms,
    faq_gaps: order.faq_gaps.map(gap => ({ ...gap, classification_by: 'assistant', editorial_status: 'pending_review' })),
    tracking: order.tracking,
    confirmation: { scope: 'pedido_e_contato_revisados', review_id: order.id_envio, includes_faq: order.faq_gaps.length > 0 },
  };
  if (new TextEncoder().encode(JSON.stringify(dados)).length > 48 * 1024) throw new InputError('payload_too_large', 'O pedido ultrapassa 48 KB. Reduza o resumo ou as dúvidas incluídas antes de revisar novamente.');
  return {
    id_envio: order.id_envio, ...order.contact, servico_id: 67, interesse: 'Criação ou reformulação de site — Apex', mensagem: order.message,
    pagina: order.pagina, utm_source: order.tracking.utm_source ?? '', utm_medium: order.tracking.utm_medium ?? '', utm_campaign: order.tracking.utm_campaign ?? '', ref: order.tracking.ref ?? '',
    _gotcha: '', dados,
  };
}
export function validReceipt(value: unknown): value is Receipt {
  const receipt = value as Receipt | null;
  return Boolean(receipt && typeof receipt.protocolo === 'string' && /^[a-zA-Z0-9-]{1,100}$/.test(receipt.protocolo) && typeof receipt.status === 'string' && /^[A-Z_]{1,40}$/.test(receipt.status) && typeof receipt.reenvio === 'boolean');
}
