import { projects } from '../data/offer';

const prompt = document.querySelector<HTMLTextAreaElement>('#chat-prompt')!;
const isLocal = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
const pageReference = isLocal ? 'a página local da Apex aberta no navegador integrado deste computador' : `a página ${location.origin}${location.pathname}`;
prompt.value = `Consulte ${pageReference} e suas ferramentas de briefing. Quero avaliar um site com a Apex. Me ajude a definir objetivo, público, conteúdo e funcionalidades. Pergunte apenas o que falta e diferencie minhas decisões das suas sugestões. Antes de registrar informações na página, confirme comigo o que será salvo. Prepare um resumo para minha revisão. Consulte o preço inicial e os planos publicados, distinguindo referências de orçamento fechado. Pergunte também sobre tráfego, campanhas, imagens, manutenção e e-mail quando pertinente. Se faltar uma resposta na base, ofereça registrar uma dúvida impessoal para melhorar a FAQ. Se eu quiser avançar, prepare a revisão do pedido com meu contato autorizado e as dúvidas da FAQ que eu escolher incluir. Mostre o que será compartilhado e peça minha confirmação explícita antes de enviar ao Mercúrio. Só afirme recebimento com protocolo confirmado; não invente orçamento fechado. Se não conseguir acessar as ferramentas, explique a limitação.`;

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
