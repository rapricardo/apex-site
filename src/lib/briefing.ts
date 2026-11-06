import { briefingFields, answerStatuses, statusLabels, type AnswerStatus, type Field } from '../data/briefing-fields';
import { offer } from '../data/offer';
import { knowledgeVersion } from '../data/knowledge';
import { InputError, isRecord, validate, objectSchema, enumSchema, textSchema, revisionSchema, arraySchema } from './input';

export const storageKey = '__apex_briefing_v1';
export type Answer = { status: AnswerStatus; value: string };
export type Draft = { schema_version: 1; revision: number; id: string | null; updated_at: string | null; answers: Record<string, Answer> };
export type Change = Answer & { field: string };
const emptyDraft = (revision = 0): Draft => ({ schema_version: 1, revision, id: null, updated_at: null, answers: {} });
const answerSchema = objectSchema({ status: enumSchema(answerStatuses), value: textSchema(2000, 0) });
export const updateSchema = objectSchema({
  expected_revision: revisionSchema,
  changes: arraySchema(objectSchema({ field: enumSchema(briefingFields.map(field => field.id)), status: enumSchema(answerStatuses), value: textSchema(2000, 0) }), briefingFields.length),
});
export const clearSchema = objectSchema({ expected_revision: revisionSchema, confirmation: enumSchema(['apagar_rascunho_local']) });

export function validateAnswer(field: Field, answer: Answer) {
  validate(answerSchema, answer, field.id);
  if (answer.status === 'confirmed' || answer.status === 'hypothesis') {
    if (!answer.value.trim()) throw new InputError('invalid_answer', `${field.id}: informe o conteúdo ou use status unknown/deferred.`);
    if (field.choices && !Object.hasOwn(field.choices, answer.value)) throw new InputError('invalid_answer', `${field.id}: use ${Object.keys(field.choices).join(', ')}.`);
    if (answer.value === 'undecided' && field.choices && answer.status === 'confirmed') throw new InputError('invalid_answer', `${field.id}: “ainda não sei” deve ter status unknown.`);
    if (field.id === 'current_site_url') {
      let url: URL;
      try { url = new URL(answer.value); } catch { throw new InputError('invalid_url', 'Informe a URL completa com https:// ou http://.'); }
      if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) throw new InputError('invalid_url', 'Use endereço HTTP(S) sem credenciais. A URL será apenas registrada.');
    }
  }
}
export function readDraft(): Draft {
  let raw: string | null;
  try { raw = sessionStorage.getItem(storageKey); } catch { throw new InputError('storage_unavailable', 'O navegador não permite acessar o rascunho. Nenhum dado foi alterado.'); }
  if (!raw) return emptyDraft();
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed) || Object.keys(parsed).some(key => !['schema_version', 'revision', 'id', 'updated_at', 'answers'].includes(key)) || parsed.schema_version !== 1 || !isRecord(parsed.answers)) throw new Error('schema');
    validate(revisionSchema, parsed.revision);
    if (parsed.id !== null && (typeof parsed.id !== 'string' || parsed.id.length > 80)) throw new Error('id');
    if (parsed.updated_at !== null && (typeof parsed.updated_at !== 'string' || !Number.isFinite(Date.parse(parsed.updated_at)))) throw new Error('date');
    for (const [key, answer] of Object.entries(parsed.answers)) {
      const field = briefingFields.find(item => item.id === key);
      if (!field || !isRecord(answer)) throw new Error('field');
      validateAnswer(field, answer as Answer);
    }
    return parsed as Draft;
  } catch { throw new InputError('draft_unreadable', 'Não foi possível ler o rascunho salvo. O conteúdo foi preservado; nenhuma atualização será feita sobre ele.'); }
}
function persist(draft: Draft) {
  try { sessionStorage.setItem(storageKey, JSON.stringify(draft)); } catch { throw new InputError('save_failed', 'O navegador não conseguiu salvar. O rascunho anterior foi preservado.'); }
  window.dispatchEvent(new Event('apex:briefing-changed'));
  return draft;
}
export function updateDraft(input: unknown): Draft {
  validate(updateSchema, input);
  const { expected_revision, changes } = input as { expected_revision: number; changes: Change[] };
  const previous = readDraft();
  if (previous.revision !== expected_revision) throw new InputError('revision_conflict', `O briefing mudou. Consulte novamente. Revisão atual: ${previous.revision}.`);
  const seen = new Set<string>();
  const answers = { ...previous.answers };
  for (const change of changes) {
    if (seen.has(change.field)) throw new InputError('duplicate_field', `O campo ${change.field} aparece duas vezes.`);
    seen.add(change.field);
    const field = briefingFields.find(item => item.id === change.field)!;
    const answer = { status: change.status, value: change.value.trim() };
    validateAnswer(field, answer);
    answers[field.id] = answer;
  }
  return persist({ schema_version: 1, revision: previous.revision + 1, id: previous.id ?? crypto.randomUUID(), updated_at: new Date().toISOString(), answers });
}
export function clearDraft(input: unknown): Draft {
  validate(clearSchema, input);
  const { expected_revision } = input as { expected_revision: number };
  const previous = readDraft();
  if (previous.revision !== expected_revision) throw new InputError('revision_conflict', 'O briefing mudou. Consulte novamente antes de apagar.');
  // Manter somente uma revisão vazia impede que uma atualização antiga recrie o rascunho apagado.
  return persist(emptyDraft(previous.revision + 1));
}
export function fieldActive(field: Field, draft: Draft) {
  const value = (id: string) => draft.answers[id]?.status === 'confirmed' ? draft.answers[id].value : null;
  if (field.condition === 'existing_site') return value('project_type') === 'redesign' || Boolean(value('current_site_url'));
  if (field.condition === 'integrations') return value('needs_integrations') === 'yes';
  if (field.condition === 'blog') return value('needs_blog') === 'yes';
  if (field.condition === 'assistant_tools') return value('needs_assistant_tools') === 'yes';
  return true;
}
export function displayAnswer(field: Field, answer: Answer) {
  return field.choices?.[answer.value] ?? answer.value;
}
export function evaluateDraft(draft = readDraft()) {
  const activeFields = briefingFields.filter(field => fieldActive(field, draft));
  const missing = activeFields.filter(field => !draft.answers[field.id]);
  const unresolved = activeFields.filter(field => {
    const answer = draft.answers[field.id];
    return answer && answer.status !== 'confirmed' && (answer.status !== 'not_applicable' || field.required);
  });
  const requiredMissing = missing.filter(field => field.required);
  const requiredUnresolved = unresolved.filter(field => field.required);
  // Priorizar a rotina antes das decisões de formato; campos continuam sendo o contrato de registro.
  const discoveryOrder = ['business', 'objective', 'audience', 'primary_action', 'campaigns', 'needs_integrations', 'integrations'];
  const discoveryMissing = discoveryOrder.flatMap(id => missing.filter(field => field.id === id));
  const remainingMissing = [...requiredMissing, ...missing.filter(field => !field.required)].filter(field => !discoveryOrder.includes(field.id));
  const nextQuestions = [...discoveryMissing, ...remainingMissing].slice(0, 2).map(field => ({ field: field.id, question: field.question, why: field.purpose, required: field.required, choices: field.choices ?? null, topic: field.topic }));
  const retainedInactive = briefingFields.filter(field => draft.answers[field.id] && !fieldActive(field, draft)).map(field => ({ field: field.id, label: field.label, answer: draft.answers[field.id], reason: 'A resposta foi preservada, mas sua condição não está confirmada no escopo atual. Revisar antes de reutilizar.' }));
  const status = Object.keys(draft.answers).length === 0 ? 'empty' : requiredMissing.length ? 'in_progress' : requiredUnresolved.length ? 'needs_decisions' : 'ready_for_human_review';
  const confirmed = (id: string, value: string) => draft.answers[id]?.status === 'confirmed' && draft.answers[id].value === value;
  const scopeNotes = [
    ...(confirmed('project_type', 'redesign') || draft.answers.current_site_url?.status === 'confirmed' ? ['Avaliar inventário de URLs, conteúdo e dependências existentes antes de definir migração.'] : []),
    ...(confirmed('project_type', 'other') ? ['O formato solicitado exige avaliação de adequação à oferta; não assumir atendimento ou pacote padrão.'] : []),
    ...(confirmed('needs_integrations', 'yes') ? ['A integração depende de contrato da API, operações, autenticação e retornos; não solicitar credenciais no briefing.'] : []),
    ...(confirmed('needs_blog', 'yes') ? ['Definir modelos editoriais, responsável por atualização e necessidade de importar acervo.'] : []),
    ...(confirmed('needs_assistant_tools', 'yes') ? ['Definir consultas, ações, regras e confirmações para assistentes. Transações dependem de integração com o sistema do negócio.'] : []),
    ...(draft.answers.deadline?.status === 'confirmed' ? ['A data informada é uma necessidade do comprador, não um prazo de entrega aceito pela Apex.'] : []),
    ...(draft.answers.constraints?.status === 'confirmed' ? ['Requisitos especiais informados precisam de revisão humana antes de confirmar viabilidade e condições.'] : []),
  ];
  return {
    revision: draft.revision, status, can_prepare_summary: true,
    scope_notes: scopeNotes,
    next_questions: nextQuestions,
    missing_required: requiredMissing.map(field => ({ field: field.id, label: field.label })),
    decisions_to_revisit: unresolved.map(field => ({ field: field.id, label: field.label, status: draft.answers[field.id].status, value: displayAnswer(field, draft.answers[field.id]), question: field.question })),
    retained_inactive: retainedInactive,
    relevant_topics: [...new Set(['apex', 'precos', 'envio', ...activeFields.filter(field => draft.answers[field.id]).map(field => field.topic)])],
    commercial_pending: offer.unresolved_terms,
    pricing: offer.pricing, submission: offer.orders,
    guidance: 'next_questions são sugestões de informação faltante, não um formulário para recitar. Faça uma pergunta da rotina por vez, no máximo duas relacionadas; siga o que o cliente contou. Use o guia investigativo de apex_consultar_briefing para recomendar somente o que resolve uma necessidade relatada. Não percorra opcionais sem relevância. Respostas indefinidas ou adiadas ficam em decisions_to_revisit, sem insistir. Ready_for_human_review significa briefing organizado, não orçamento ou contratação aprovados.',
  };
}
export function prepareSummary(draft = readDraft()) {
  const evaluation = evaluateDraft(draft);
  const entries = briefingFields.filter(field => draft.answers[field.id] && fieldActive(field, draft)).map(field => ({ field: field.id, label: field.label, status: draft.answers[field.id].status, status_label: statusLabels[draft.answers[field.id].status], value: displayAnswer(field, draft.answers[field.id]) }));
  const lines = [
    '# Briefing Apex — rascunho para revisão',
    `Revisão: ${draft.revision} | Base: ${knowledgeVersion}`,
    'Este resumo não é orçamento, pedido enviado ou contratação.', '',
    ...entries.map(entry => `- ${entry.label} [${entry.status_label}]: ${entry.value || 'Sem definição.'}`),
    '', '## Informações ainda não fornecidas',
    ...evaluation.missing_required.map(field => `- ${field.label}`),
    ...(evaluation.missing_required.length ? [] : ['- Não há campo essencial sem resposta. Respostas indefinidas ainda precisam de decisão.']),
    '', '## Respostas preservadas fora do escopo ativo',
    ...evaluation.retained_inactive.map(entry => `- ${entry.label}: ${entry.answer.value || 'Sem definição'} (${statusLabels[entry.answer.status]}). Revisar antes de reutilizar.`),
    ...(evaluation.retained_inactive.length ? [] : ['- Nenhuma.']),
    '', '## Pontos de escopo para avaliação', ...evaluation.scope_notes.map(note => `- ${note}`),
    ...(evaluation.scope_notes.length ? [] : ['- Ainda sem dependências específicas identificadas.']),
    '', '## Condições a confirmar com Ricardo', ...offer.unresolved_terms.map(item => `- ${item}`),
    '', 'Preparar este resumo não envia dados. Para solicitar uma proposta, revise e confirme o pedido ao Mercúrio.',
  ];
  return { kind: 'briefing_draft', version: knowledgeVersion, revision: draft.revision, entries, evaluation, text: lines.join('\n'), sent: false, price: null };
}
