#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { getPageBySlug } from './src/lib/contentstack.ts';
import { normalizePageSections } from './src/lib/normalizeSections.ts';

// Load env
const envRaw = readFileSync('.env.local', 'utf8');
envRaw.split(/\r?\n/).forEach((l) => {
  if (!l || l.startsWith('#')) return;
  const i = l.indexOf('=');
  if (i === -1) return;
  const k = l.slice(0, i).trim();
  const v = l.slice(i + 1).trim();
  if (!(k in process.env)) process.env[k] = v;
});

const page = await getPageBySlug('/', { cache: 'no-store' });
const normalized = normalizePageSections(page);

console.log('\nNormalized Sections:');
console.log('====================\n');

normalized.forEach((section, i) => {
  console.log(`${i}. ${section.componentId} (key: ${section.key})`);
});

console.log('\n\nValidation:');
console.log('===========');
console.log('✓ Section 1 should be "Features" (Feature Grid w/ CTAs)');
console.log('✓ Section 4 should be "Capabilities" (Capability Panels)');

const section1 = normalized[1];
const section4 = normalized[4];

console.log(`\nSection 1: ${section1.componentId} ${section1.componentId === 'Features' ? '✅' : '❌'}`);
console.log(`Section 4: ${section4.componentId} ${section4.componentId === 'Capabilities' ? '✅' : '❌'}`);
