import { spawn } from 'node:child_process';

// Transporte local: a chave e o conteúdo via stdin, sem shell ou argumentos sensíveis.
// Cloudflare usa fetch nativo no servidor; este módulo não entra no site publicado.
export async function sendMercurioLocal(payload, key) {
  const config = [
    'url = "https://app.mercurio.ia.br/api/webhooks/leads"',
    'request = "POST"',
    `header = ${JSON.stringify(`Authorization: Bearer ${key}`)}`,
    'header = "Content-Type: application/json"',
    `data-binary = ${JSON.stringify(JSON.stringify(payload))}`,
  ].join('\n');
  const raw = await new Promise((resolve, reject) => {
    const child = spawn('curl', ['--silent', '--max-time', '20', '--config', '-', '--write-out', '\n%{http_code}'], { stdio: ['pipe', 'pipe', 'pipe'] });
    let output = '';
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', chunk => { output += chunk; if (output.length > 100000) child.kill(); });
    child.stderr.resume();
    child.stdin.on('error', () => {});
    child.on('error', () => reject(new Error('network_failed')));
    child.on('close', code => code === 0 ? resolve(output) : reject(new Error('network_failed')));
    child.stdin.end(config);
  });
  const split = raw.lastIndexOf('\n');
  return new Response(raw.slice(0, split), { status: Number(raw.slice(split + 1)), headers: { 'Content-Type': 'application/json' } });
}
