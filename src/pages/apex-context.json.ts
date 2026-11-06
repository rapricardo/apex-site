import type { APIRoute } from 'astro';
import { knowledgeIndex, topics } from '../data/knowledge';
import { briefingFields, statusLabels } from '../data/briefing-fields';
import { siteTools } from '../lib/webmcp-tools';
export const GET: APIRoute = () => new Response(JSON.stringify({
  ...knowledgeIndex(), topics, briefing_fields: briefingFields, answer_statuses: statusLabels,
  tools: siteTools.map(({ execute: _execute, ...definition }) => definition),
}, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
