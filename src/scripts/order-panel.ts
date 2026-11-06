import { prepareOrder, submitOrder, orderView, readOrder, clearOrder, assertFreshReview } from '../lib/orders';
import { readDraft } from '../lib/briefing';
import { InputError } from '../lib/input';
import { openDialog } from './dialogs';

const form = document.querySelector<HTMLFormElement>('#order-form')!;
const review = document.querySelector<HTMLElement>('#order-review')!;
const content = document.querySelector<HTMLElement>('#order-review-content')!;
const feedback = document.querySelector<HTMLElement>('#order-feedback')!;
const consent = document.querySelector<HTMLInputElement>('#order-consent')!;
const send = document.querySelector<HTMLButtonElement>('#send-order')!;
const edit = document.querySelector<HTMLButtonElement>('#edit-order')!;
const clear = document.querySelector<HTMLButtonElement>('#clear-order')!;
const receipt = document.querySelector<HTMLElement>('#order-receipt')!;
const field = (id: string) => document.getElementById(id) as HTMLInputElement;
let reviewId: string | null = null;
let editing = false;
function showError(error: unknown) { feedback.textContent = error instanceof InputError ? error.message : 'Não foi possível concluir. Seu pedido foi preservado.'; }
function paragraph(label: string, value: string) {
  const section = document.createElement('section');
  const heading = document.createElement('h4');
  const text = document.createElement('p');
  heading.textContent = label; text.textContent = value;
  section.append(heading, text); content.append(section);
}
function renderOrder() {
  try {
    const state = readOrder();
    const view = orderView(state);
    if (reviewId !== view.review_id) { consent.checked = false; editing = false; }
    reviewId = view.review_id;
    receipt.hidden = !view.sent;
    clear.hidden = !state;
    clear.disabled = view.busy || Boolean(state?.attempted && !state.receipt);
    form.hidden = Boolean(state && !editing);
    review.hidden = !state || editing || view.sent;
    edit.disabled = view.busy || Boolean(state?.attempted);
    if (state && !editing) {
      for (const [key, id] of [['nome', 'order-name'], ['empresa', 'order-company'], ['email', 'order-email'], ['telefone', 'order-phone']] as const) field(id).value = state.order.contact[key];
      field('order-message').value = state.order.message;
      field('order-include-faq').checked = state.include_faq;
    }
    content.replaceChildren();
    if (view.review) {
      const data = view.review;
      paragraph('Seu contato', [data.contact.nome, data.contact.empresa, data.contact.email, data.contact.telefone].filter(Boolean).join('\n'));
      paragraph('Seu projeto', data.message);
      if (data.briefing.length) paragraph('Briefing', data.briefing.map(entry => `${entry.label} [${entry.status_label}]: ${entry.value || 'Sem definição'}`).join('\n'));
      if (data.preserved_outside_scope.length) paragraph('Informações fora do escopo atual, preservadas para revisão', data.preserved_outside_scope.map(entry => `${entry.label}: ${entry.answer.value}`).join('\n'));
      if (data.missing.length) paragraph('Ainda falta definir', data.missing.map(entry => entry.label).join(', '));
      if (data.dependencies.length) paragraph('Pontos para avaliação', data.dependencies.join('\n'));
      paragraph('Investimento de referência', data.pricing.message);
      paragraph('Condições a confirmar', data.commercial_pending.join('; '));
      paragraph('Dúvidas incluídas', data.faq_gaps.length ? data.faq_gaps.map(gap => gap.question_summary).join('\n') : 'Nenhuma dúvida será enviada.');
      const attribution = document.createElement('details');
      const title = document.createElement('summary'); title.textContent = 'Dados de origem incluídos';
      const text = document.createElement('p'); text.textContent = [data.source.page, ...Object.entries(data.source.tracking).filter(([, value]) => value).map(([key, value]) => `${key}: ${value}`)].join('\n');
      attribution.append(title, text); content.append(attribution);
    }
    let stale = false;
    if (state && !state.receipt) try { assertFreshReview(state); } catch (error) { stale = true; showError(error); }
    send.disabled = view.busy || !consent.checked || !state || stale;
    send.textContent = view.busy ? 'Enviando…' : state?.attempted ? 'Tentar novamente ↗' : 'Enviar pedido ↗';
    if (!stale) feedback.textContent = view.sent ? '' : view.error ?? (view.busy ? 'Aguardando confirmação do Mercúrio…' : '');
    if (view.receipt) document.querySelector<HTMLElement>('#order-protocol')!.textContent = `Protocolo: ${view.receipt.protocolo}`;
  } catch (error) { send.disabled = true; showError(error); }
}
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  try {
    editing = false;
    prepareOrder({ contact: { nome: field('order-name').value, empresa: field('order-company').value, email: field('order-email').value, telefone: field('order-phone').value }, message: field('order-message').value, include_faq: field('order-include-faq').checked }, 'site');
    consent.checked = false;
    renderOrder();
  } catch (error) { showError(error); }
});
send.addEventListener('click', async () => {
  if (!consent.checked || !reviewId) return;
  try { await submitOrder({ review_id: reviewId, confirmation: 'enviar_pedido_revisado' }); }
  catch (error) { showError(error); }
});
consent.addEventListener('change', renderOrder);
edit.addEventListener('click', () => { editing = true; consent.checked = false; renderOrder(); field('order-message').focus(); });
clear.addEventListener('click', () => {
  if (!window.confirm('Limpar o contato e o pedido desta aba? Isso não apaga o registro já recebido no Mercúrio.')) return;
  try { clearOrder(); form.reset(); feedback.textContent = 'Pedido local limpo.'; }
  catch (error) { showError(error); }
});
window.addEventListener('apex:order-changed', renderOrder);
window.addEventListener('apex:order-review', () => { editing = false; renderOrder(); openDialog('order-dialog', document.activeElement as HTMLElement ?? document.body); });
for (const event of ['apex:briefing-changed', 'apex:gaps-changed', 'pageshow']) window.addEventListener(event, renderOrder);
document.querySelectorAll<HTMLElement>('[data-dialog="order-dialog"]').forEach(button => button.addEventListener('click', () => {
  if (!readOrder() && !field('order-message').value) {
    try {
      const draft = readDraft();
      const objective = draft.answers.objective;
      if (objective?.status === 'confirmed') field('order-message').value = objective.value;
    } catch { /* O formulário continua disponível para revisão manual. */ }
  }
  renderOrder();
}));
renderOrder();
