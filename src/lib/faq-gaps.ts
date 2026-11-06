import { topics, knowledgeVersion } from '../data/knowledge';
import { InputError, validate, objectSchema, enumSchema, textSchema, arraySchema, revisionSchema } from './input';

export const gapReasons = ['not_documented', 'partial_answer', 'undefined_policy', 'needs_evaluation', 'conflicting_information'] as const;
const classificationSchema = objectSchema({
  question_summary: textSchema(500, 10),
  topic: enumSchema([...topics.map(topic => topic.id), 'other']),
  reason: enumSchema(gapReasons),
  consulted_topics: arraySchema(enumSchema(topics.map(topic => topic.id)), topics.length),
});
export const gapInputSchema = objectSchema({
  ...classificationSchema.properties,
  expected_revision: revisionSchema,
  confirmation: enumSchema(['registrar_duvida_impessoal_local']),
});
export const clearGapsSchema = objectSchema({ expected_revision: revisionSchema, confirmation: enumSchema(['apagar_lacunas_locais']) });
export const gapEventSchema = objectSchema({
  ...classificationSchema.properties, id: textSchema(80), created_at: textSchema(40), base_version: textSchema(80),
});
const storeSchema = objectSchema({ schema_version: { type: 'integer', enum: [1] }, revision: revisionSchema, events: arraySchema(gapEventSchema, 50, 0) });
export type Gap = { question_summary: string; topic: string; reason: typeof gapReasons[number]; consulted_topics: string[]; id: string; created_at: string; base_version: string };
type GapStore = { schema_version: 1; revision: number; events: Gap[] };
const key = '__apex_faq_gaps_v1';

export function readGaps(): GapStore {
  let raw: string | null;
  try { raw = sessionStorage.getItem(key); } catch { throw new InputError('storage_unavailable', 'Não foi possível acessar as dúvidas locais.'); }
  if (!raw) return { schema_version: 1, revision: 0, events: [] };
  try {
    const parsed = JSON.parse(raw);
    validate(storeSchema, parsed);
    return parsed;
  } catch { throw new InputError('gaps_unreadable', 'Registro de dúvidas ilegível. O conteúdo foi preservado.'); }
}
function persist(store: GapStore) {
  validate(storeSchema, store);
  try { sessionStorage.setItem(key, JSON.stringify(store)); } catch { throw new InputError('save_failed', 'Não foi possível salvar as dúvidas. O estado anterior foi preservado.'); }
  window.dispatchEvent(new Event('apex:gaps-changed'));
  return gapPayload(store);
}
export function gapPayload(store = readGaps()) {
  return {
    schema_version: 1, event_type: 'faq_gap_batch', source: 'apex_webmcp', revision: store.revision,
    events: store.events.map(event => ({ ...event, classification_by: 'assistant', editorial_status: 'pending_review' })),
    delivery: { status: 'export_only', sent: false, destination: 'Mercúrio', message: 'Esta consulta não transmite. Dúvidas podem acompanhar um pedido confirmado; o recibo do pedido informa seu envio.' },
  };
}
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export function registerGap(input: unknown) {
  validate(gapInputSchema, input);
  const { expected_revision, question_summary, topic, reason, consulted_topics } = input as Omit<Gap, 'id' | 'created_at' | 'base_version'> & { expected_revision: number };
  const previous = readGaps();
  if (previous.revision !== expected_revision) throw new InputError('revision_conflict', 'As dúvidas mudaram. Consulte novamente antes de registrar.');
  // Rejeitar identificadores comuns; a remoção de nomes e detalhes privados também exige revisão do assistente.
  if (/@|https?:\/\/|www\.|\d[\d ().+-]{6,}\d/i.test(question_summary)) throw new InputError('private_details', 'Use uma pergunta genérica, sem e-mail, telefone, URL ou identificador pessoal.');
  if (previous.events.some(event => event.topic === topic && event.reason === reason && normalize(event.question_summary) === normalize(question_summary))) return { ...gapPayload(previous), duplicate: true };
  if (previous.events.length >= 50) throw new InputError('gap_limit', 'Limite de 50 dúvidas nesta aba. Revise e exporte o registro antes de apagar.');
  const event: Gap = { id: crypto.randomUUID(), created_at: new Date().toISOString(), base_version: knowledgeVersion, question_summary: question_summary.trim(), topic, reason, consulted_topics: [...new Set(consulted_topics)] };
  return { ...persist({ schema_version: 1, revision: previous.revision + 1, events: [...previous.events, event] }), duplicate: false };
}
export function clearGaps(input: unknown) {
  validate(clearGapsSchema, input);
  const previous = readGaps();
  if (previous.revision !== (input as { expected_revision: number }).expected_revision) throw new InputError('revision_conflict', 'As dúvidas mudaram. Consulte novamente antes de apagar.');
  return persist({ schema_version: 1, revision: previous.revision + 1, events: [] });
}
