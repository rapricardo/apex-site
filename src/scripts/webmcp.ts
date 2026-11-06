import { siteTools, type SiteTool } from '../lib/webmcp-tools';

type Registry = { registerTool(tool: SiteTool, options?: { signal?: AbortSignal }): void | Promise<void> };
const registry = (document as Document & { modelContext?: Registry }).modelContext;
let lifecycle: AbortController | undefined;
function showStatus(status: string, message: string) {
  document.documentElement.dataset.apexWebmcp = status;
  document.querySelectorAll<HTMLElement>('[data-webmcp-status]').forEach(element => { element.textContent = message; });
}
async function registerTools() {
  if (!registry?.registerTool) {
    showStatus('unsupported', 'Para usar as ferramentas, abra esta página em um navegador compatível com WebMCP. As informações e o resumo continuam acessíveis aqui.');
    return;
  }
  lifecycle?.abort();
  const current = new AbortController();
  lifecycle = current;
  showStatus('registering', 'Preparando as ferramentas de briefing…');
  try {
    for (const tool of siteTools) {
      if (current.signal.aborted) return;
      await registry.registerTool(tool, { signal: current.signal });
    }
    if (!current.signal.aborted) showStatus('ready', 'As ferramentas de consulta e briefing estão disponíveis nesta página. Orçamento e envio continuam indisponíveis.');
  } catch {
    current.abort();
    showStatus('error', 'Não foi possível disponibilizar as ferramentas neste navegador. Você pode consultar a base e copiar seu resumo pela página.');
  }
}
void registerTools();
window.addEventListener('pagehide', () => lifecycle?.abort());
window.addEventListener('pageshow', event => { if (event.persisted) void registerTools(); });
if (import.meta.hot) import.meta.hot.dispose(() => lifecycle?.abort());
