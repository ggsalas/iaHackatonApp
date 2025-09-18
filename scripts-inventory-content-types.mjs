#!/usr/bin/env node
import 'node:process';
import { readFileSync } from 'node:fs';
import path from 'node:path';

// Simple env loader for .env.local (not using dotenv to avoid extra dep)
const envPath = path.join(process.cwd(), '.env.local');
try {
  const raw = readFileSync(envPath, 'utf8');
  raw.split(/\r?\n/).forEach((line) => {
    if (!line || line.startsWith('#')) return;
    const eq = line.indexOf('=');
    if (eq === -1) return;
    const key = line.slice(0, eq).trim();
    const value = line.slice(eq + 1).trim();
    if (key && !(key in process.env)) process.env[key] = value;
  });
} catch (e) {
  console.error('Could not read .env.local', e);
}

function getBaseUrl(region) {
  switch (region) {
    case 'eu':
      return 'https://eu-cdn.contentstack.com';
    case 'azure-na':
      return 'https://azure-na-cdn.contentstack.com';
    default:
      return 'https://cdn.contentstack.io';
  }
}

function assertEnv() {
  const required = [
    'CONTENTSTACK_API_KEY',
    'CONTENTSTACK_DELIVERY_TOKEN',
    'CONTENTSTACK_ENVIRONMENT',
  ];
  const missing = required.filter((v) => !process.env[v]);
  if (missing.length) {
    throw new Error('Missing env vars: ' + missing.join(', '));
  }
}

async function fetchJson(pathname, params = {}) {
  assertEnv();
  const apiKey = process.env.CONTENTSTACK_API_KEY;
  const deliveryToken = process.env.CONTENTSTACK_DELIVERY_TOKEN;
  const environment = process.env.CONTENTSTACK_ENVIRONMENT;
  const region = process.env.CONTENTSTACK_REGION;
  const usp = new URLSearchParams();
  usp.set('environment', environment);
  for (const [k, v] of Object.entries(params)) {
    if (v == null) continue;
    if (typeof v === 'object') usp.set(k, JSON.stringify(v));
    else usp.set(k, String(v));
  }
  const base = getBaseUrl(region);
  const full = `${base}/v3/${pathname}?${usp.toString()}`;
  const res = await fetch(full, {
    headers: { api_key: apiKey, access_token: deliveryToken },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed ${res.status}: ${text}`);
  }
  return res.json();
}

function collectContentTypeUids(node, set, currentPath = '') {
  if (node === null || node === undefined) return;
  if (Array.isArray(node)) {
    node.forEach((v, i) => collectContentTypeUids(v, set, `${currentPath}[${i}]`));
    return;
  }
  if (typeof node === 'object') {
    if (Object.prototype.hasOwnProperty.call(node, '_content_type_uid')) {
      set.add(node._content_type_uid);
    }
    for (const [k, v] of Object.entries(node)) {
      collectContentTypeUids(v, set, currentPath ? `${currentPath}.${k}` : k);
    }
  }
}

async function main() {
  const slug = '/';
  const data = await fetchJson('content_types/page/entries', { query: { url: slug } });
  const entry = data.entries?.[0];
  if (!entry) {
    console.error('No Home entry found for /');
    process.exit(1);
  }

  const sections = entry.sections || [];
  console.log('Sections array length:', sections.length);
  // Show raw first two sections for inspection (stringified trimmed)
  sections.slice(0, 2).forEach((s, i) => {
    console.log(`Section[${i}] keys:`, Object.keys(s));
    console.log(`Section[${i}] preview:`, JSON.stringify(s, null, 2).slice(0, 800));
  });

  const uidSet = new Set();
  collectContentTypeUids(entry, uidSet);
  console.log('\nDiscovered _content_type_uid values:');
  if (!uidSet.size) {
    console.log('  (none found)');
  } else {
    [...uidSet].forEach((u) => console.log('  -', u));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
