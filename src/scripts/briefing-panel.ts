import { gapPayload, clearGaps } from '../lib/faq-gaps';
import { readDraft, prepareSummary, clearDraft } from '../lib/briefing';
import { InputError } from '../lib/input';

const entries = document.querySelector<HTMLElement>('#briefing-entries')!;
const summaryText = document.querySelector<HTMLElement>('#briefing-summary-text')!;
const copyButton = document.querySelector<HTMLButtonElement>('#copy-briefing')!;
const clearButton = document.querySelector<HTMLButtonElement>('#clear-briefing')!;
const feedback = document.querySelector<HTMLElement>('#briefing-feedback')!;
let displayedRevision = 0;
function renderBriefing() {
  entries.replaceChildren();
  try {
    const draft = readDraft();
    const summary = prepareSummary(draft);
    displayedRevision = draft.revision;
    const count = Object.keys(draft.answers).length;
    copyButton.disabled = count === 0;
    clearButton.disabled = count === 0;
    summaryText.textContent = summary.text;
    document.querySelectorAll<HTMLElement>('[data-draft-status]').forEach(element => {
      element.textContent = count ? `Informações registradas: ${count}. Pontos essenciais sem resposta: ${summary.evaluation.missing_required.length}. Decisões a revisar: ${summary.evaluation.decisions_to_revisit.length}.` : 'Nenhuma informação registrada ainda.';
    });
    document.querySelectorAll<HTMLElement>('[data-draft-count]').forEach(element => { element.textContent = count ? ` (${count})` : ''; });
    for (const item of summary.entries) {
      const section = document.createElement('section');
      const heading = document.createElement('h3');
      const status = document.createElement('span');
      const content = document.createElement('p');
      heading.textContent = item.label;
      status.textContent = item.status_label;
      content.textContent = item.value || 'Sem definição.';
      section.append(heading, status, content);
      entries.append(section);
    }
    const pending = document.createElement('p');
    pending.className = 'briefing-pending';
    pending.textContent = summary.evaluation.missing_required.length ? `Falta conversar sobre: ${summary.evaluation.missing_required.map(field => field.label.toLowerCase()).join(', ')}.` : 'Revise hipóteses e indefinições antes de tratar o escopo como decidido.';
    entries.append(pending);
  } catch (error) {
    copyButton.disabled = true; clearButton.disabled = true;
    summaryText.textContent = '';
    document.querySelectorAll<HTMLElement>('[data-draft-status]').forEach(element => {
      element.textContent = error instanceof InputError ? error.message : 'Não foi possível ler o rascunho. Nenhum dado foi alterado.';
    });
  }
}
window.addEventListener('apex:briefing-changed', () => { feedback.textContent = ''; renderBriefing(); });
window.addEventListener('pageshow', renderBriefing);
renderBriefing();
copyButton.addEventListener('click', async () => {
  try {
    const text = prepareSummary().text;
    await navigator.clipboard.writeText(text);
    feedback.textContent = 'Resumo copiado. Nenhum dado foi enviado.';
  } catch {
    const details = summaryText.closest('details');
    if (details) details.open = true;
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(summaryText);
    selection?.removeAllRanges(); selection?.addRange(range);
    feedback.textContent = 'Não foi possível copiar automaticamente. Selecione o resumo e copie manualmente.';
  }
});
clearButton.addEventListener('click', () => {
  if (!window.confirm('Apagar todas as respostas do rascunho desta aba? Esta ação não pode ser desfeita.')) return;
  try {
    clearDraft({ expected_revision: displayedRevision, confirmation: 'apagar_rascunho_local' });
    feedback.textContent = 'Rascunho apagado desta aba.';
  } catch (error) {
    feedback.textContent = error instanceof InputError ? error.message : 'Não foi possível apagar. Consulte o rascunho novamente.';
    renderBriefing();
  }
});

const gapText = document.querySelector<HTMLElement>('#gap-json')!;
const gapStatus = document.querySelector<HTMLElement>('#gap-status')!;
const gapCopy = document.querySelector<HTMLButtonElement>('#copy-gaps')!;
const gapClear = document.querySelector<HTMLButtonElement>('#clear-gaps')!;
let gapRevision = 0;
function renderGaps() {
  try {
    const payload = gapPayload();
    gapRevision = payload.revision;
    gapText.textContent = JSON.stringify(payload, null, 2);
    gapStatus.textContent = `${payload.events.length} dúvida(s) registrada(s) nesta aba. Nenhuma enviada.`;
    gapCopy.disabled = gapClear.disabled = payload.events.length === 0;
  } catch (error) {
    gapText.textContent = '';
    gapCopy.disabled = gapClear.disabled = true;
    gapStatus.textContent = error instanceof InputError ? error.message : 'Não foi possível ler as dúvidas.';
  }
}
window.addEventListener('apex:gaps-changed', renderGaps);
window.addEventListener('pageshow', renderGaps);
renderGaps();
gapCopy.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(JSON.stringify(gapPayload(), null, 2));
    gapStatus.textContent = 'JSON copiado. Nenhuma dúvida enviada.';
  } catch {
    gapText.closest('details')!.open = true;
    gapStatus.textContent = 'Selecione e copie o JSON abaixo. A cópia automática não ficou disponível.';
  }
});
gapClear.addEventListener('click', () => {
  if (!window.confirm('Apagar as dúvidas sem resposta desta aba? O briefing será preservado.')) return;
  try { clearGaps({ expected_revision: gapRevision, confirmation: 'apagar_lacunas_locais' }); }
  catch (error) { gapStatus.textContent = error instanceof InputError ? error.message : 'Não foi possível apagar as dúvidas.'; }
});
