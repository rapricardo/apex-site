import { projects } from '../data/offer';

const dialogs = document.querySelectorAll<HTMLDialogElement>('dialog');
let dialogOpener: HTMLElement | null = null;
const prompt = document.querySelector<HTMLTextAreaElement>('#chat-prompt')!;
prompt.value = 'Quero criar ou reformular meu site com a Apex, de Ricardo Tocha. Me ajude a organizar o objetivo, o público, as páginas, o conteúdo e as integrações necessárias. Faça apenas as perguntas que faltam. Por enquanto, prepare um resumo para eu revisar, sem inventar preços ou enviar meus dados. A experiência de orçamento e envio ainda está em preparação.';

function openDialog(id: string, trigger: HTMLElement) {
  const dialog = document.getElementById(id) as HTMLDialogElement | null;
  if (!dialog) return;
  const previousOpener = dialogOpener;
  dialogs.forEach(item => { if (item.open) item.close(); });
  dialogOpener = trigger.closest('dialog') ? previousOpener : trigger;
  dialog.showModal();
  dialog.scrollTop = 0;
}
document.querySelectorAll<HTMLElement>('[data-dialog]').forEach(button => {
  button.addEventListener('click', () => openDialog(button.dataset.dialog!, button));
});
dialogs.forEach(dialog => {
  dialog.querySelector('[data-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  }});
  dialog.addEventListener('close', () => {
    if (![...dialogs].some(item => item.open)) dialogOpener?.focus({ preventScroll: true });
  });
});
document.querySelector('#copy-prompt')?.addEventListener('click', async () => {
  const status = document.querySelector<HTMLElement>('#copy-status')!;
  try {
    await navigator.clipboard.writeText(prompt.value);
    status.textContent = 'Pedido copiado. Cole no seu ChatGPT para organizar as ideias.';
  } catch {
    prompt.focus(); prompt.select();
    status.textContent = 'Selecionei o texto. Copie manualmente e cole no seu ChatGPT.';
  }
});
function selectProject(index: number) {
  const project = projects[index];
  if (!project) return;
  document.querySelector('#project-name')!.textContent = project.name;
  document.querySelector('#project-category')!.textContent = project.category;
  document.querySelector('#project-description')!.textContent = project.description;
  document.querySelector('#project-domain')!.textContent = project.domain;
  (document.querySelector('#project-link') as HTMLAnchorElement).href = project.url;
  const image = document.querySelector<HTMLImageElement>('#project-image')!;
  image.src = project.image; image.alt = `Página inicial de ${project.name}`;
  document.querySelectorAll<HTMLElement>('[data-select-project]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.selectProject) === index)));
}
document.querySelectorAll<HTMLElement>('[data-select-project], [data-project]').forEach(button => {
  button.addEventListener('click', () => selectProject(Number(button.dataset.selectProject ?? button.dataset.project)));
});
const motionButton = document.querySelector<HTMLButtonElement>('#motion-toggle')!;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
function setMotion(paused: boolean) {
  document.documentElement.classList.toggle('no-motion', paused);
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.textContent = paused ? 'Retomar movimento ▷' : 'Pausar movimento Ⅱ';
}
setMotion(reducedMotion.matches);
reducedMotion.addEventListener('change', event => setMotion(event.matches));
motionButton.addEventListener('click', () => setMotion(!document.documentElement.classList.contains('no-motion')));

const dock = document.querySelector<HTMLButtonElement>('#conversation-dock')!;
new IntersectionObserver(([entry]) => {
  dock.hidden = entry.isIntersecting;
}, { threshold: 0.1 }).observe(document.querySelector('#inicio')!);
