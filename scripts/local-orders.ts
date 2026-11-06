import { loadEnv, type Plugin, type Connect } from 'vite';
import { handleOrder } from '../src/server/orders';
import { sendMercurioLocal } from './mercurio-transport.mjs';

export function localOrders(): Plugin {
  let env: Record<string, string> = {};
  const middleware: Connect.NextHandleFunction = async (req, res, next) => {
    if (req.url?.split('?')[0] !== '/api/pedidos') return next();
    try {
      const chunks: Buffer[] = [];
      let length = 0;
      for await (const chunk of req) {
        length += chunk.length;
        if (length > 80 * 1024) { res.writeHead(413, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ error: 'Pedido muito grande.' })); return; }
        chunks.push(Buffer.from(chunk));
      }
      const headers = new Headers();
      for (const [name, value] of Object.entries(req.headers)) if (typeof value === 'string') headers.set(name, value);
      const request = new Request(`http://${req.headers.host}${req.url}`, { method: req.method, headers, ...(req.method === 'POST' ? { body: Buffer.concat(chunks) } : {}) });
      const response = await handleOrder(request, env, sendMercurioLocal);
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(await response.text());
    } catch {
      res.writeHead(502, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
      res.end(JSON.stringify({ error: 'Não foi possível confirmar o envio. Tente novamente com o mesmo pedido.' }));
    }
  };
  return {
    name: 'apex-local-orders',
    configResolved(config) { env = { ...loadEnv(config.mode, config.root, 'MERCURIO_'), ...Object.fromEntries(Object.entries(process.env).filter(([key, value]) => key.startsWith('MERCURIO_') && value !== undefined)) } as Record<string, string>; },
    configureServer(server) { server.middlewares.use(middleware); },
    configurePreviewServer(server) { server.middlewares.use(middleware); },
  };
}
