#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import path from 'node:path';

// Load env
const envRaw = readFileSync(path.join(process.cwd(), '.env.local'), 'utf8');
envRaw.split(/\r?\n/).forEach((l) => {
  if (!l || l.startsWith('#')) return;
  const i = l.indexOf('=');
  if (i === -1) return;
  const k = l.slice(0, i).trim();
  const v = l.slice(i + 1).trim();
  if (!(k in process.env)) process.env[k] = v;
});

function base(region) {
  switch (region) {
    case 'eu':
      return 'https://eu-cdn.contentstack.com';
    case 'azure-na':
      return 'https://azure-na-cdn.contentstack.com';
    default:
      return 'https://cdn.contentstack.io';
  }
}

async function fetchJson(p, params = {}) {
  const apiKey = process.env.CONTENTSTACK_API_KEY;
  const token = process.env.CONTENTSTACK_DELIVERY_TOKEN;
  const env = process.env.CONTENTSTACK_ENVIRONMENT;
  const region = process.env.CONTENTSTACK_REGION;
  const usp = new URLSearchParams();
  usp.set('environment', env);
  for (const [k, v] of Object.entries(params)) {
    if (v == null) continue;
    if (typeof v === 'object') usp.set(k, JSON.stringify(v));
    else usp.set(k, String(v));
  }
  const url = `${base(region)}/v3/${p}?${usp.toString()}`;
  const res = await fetch(url, { headers: { api_key: apiKey, access_token: token } });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Request failed ${res.status}: ${t}`);
  }
  return res.json();
}

function collectRefs(obj, out) {
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) {
    obj.forEach((o) => collectRefs(o, out));
    return;
  }
  if (obj._content_type_uid && obj.uid) {
    out.push({ contentType: obj._content_type_uid, uid: obj.uid });
  }
  for (const v of Object.values(obj)) collectRefs(v, out);
}

(async () => {
  const page = await fetchJson('content_types/page/entries', { query: { url: '/' } });
  const entry = page.entries?.[0];
  if (!entry) return console.error('No page');
  const refs = [];
  collectRefs(entry.sections, refs);
  console.log('Total reference stubs discovered:', refs.length);
  const unique = Array.from(new Map(refs.map((r) => [r.contentType + ':' + r.uid, r])).values()).slice(0, 5);
  console.log('Inspecting first', unique.length, 'references');
  for (const ref of unique) {
    const full = await fetchJson(`content_types/${ref.contentType}/entries/${ref.uid}`);
    console.log('\nRef', ref.contentType, ref.uid, 'keys:', Object.keys(full.entry));
    // Print selected candidate list fields
    const entryObj = full.entry;
    const candidateList = entryObj.items || entryObj.entries || entryObj.content || entryObj.blocks || null;
    if (candidateList) {
      console.log('Candidate list length:', candidateList.length);
      if (candidateList[0]) console.log('First list item keys:', Object.keys(candidateList[0]));
    }
    console.log('Entry preview:', JSON.stringify(full.entry).slice(0, 500));
  }
})();
