#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import path from 'node:path';

// Load env
const rawEnv = readFileSync(path.join(process.cwd(), '.env.local'), 'utf8');
rawEnv.split(/\r?\n/).forEach((l) => { if(!l || l.startsWith('#')) return; const i = l.indexOf('='); if(i===-1) return; const k=l.slice(0,i).trim(); const v=l.slice(i+1).trim(); if(!(k in process.env)) process.env[k]=v; });

function getBaseUrl(region){switch(region){case 'eu':return 'https://eu-cdn.contentstack.com';case 'azure-na':return 'https://azure-na-cdn.contentstack.com';default:return 'https://cdn.contentstack.io';}}
async function fetchJson(pathname, params={}){const apiKey=process.env.CONTENTSTACK_API_KEY;const token=process.env.CONTENTSTACK_DELIVERY_TOKEN;const env=process.env.CONTENTSTACK_ENVIRONMENT;const region=process.env.CONTENTSTACK_REGION;const usp=new URLSearchParams();usp.set('environment', env);for(const [k,v] of Object.entries(params)){if(v==null) continue; if(typeof v==='object') usp.set(k, JSON.stringify(v)); else usp.set(k, String(v));}const base=getBaseUrl(region);const full=`${base}/v3/${pathname}?${usp.toString()}`;const res=await fetch(full,{headers:{api_key:apiKey, access_token:token}});if(!res.ok){throw new Error('Failed '+res.status);}return res.json();}

function collectContentTypeUids(node,out){if(!node||typeof node!=='object')return;if(Array.isArray(node)){node.forEach(n=>collectContentTypeUids(n,out));return;}if(typeof node._content_type_uid==='string'){out.push({uid:node._content_type_uid,node});}Object.values(node).forEach(v=>collectContentTypeUids(v,out));}

function mapContentType(uid){const ignorable=['presentation_blueprint']; if(ignorable.includes(uid)) return null; const map={general_content:'GenericContent',general_content_list:'Features',trust_builder:'TrustBuilder',testimonial_list:'Testimonials',brand_list:'Brands',person_list:'People',blog_post_list:'BlogPosts'}; return map[uid]||'GenericContent';}

function normalize(page){if(!page||!Array.isArray(page.sections)) return []; const out=[]; page.sections.forEach((wrapper, idx)=>{const keys=Object.keys(wrapper||{}); let sectionObj=wrapper; if(keys.length===1){sectionObj=wrapper[keys[0]];} const collected=[]; collectContentTypeUids(sectionObj,collected); if(collected.length===0){const looksHero= idx===0 && sectionObj && typeof sectionObj==='object' && 'background_image' in sectionObj; out.push({key:`section-${idx}-${looksHero?'Hero':'GenericContent'}`,componentId:looksHero?'Hero':'GenericContent',raw:sectionObj}); return;} collected.forEach((c,i)=>{if(!c.uid) return; const mapped=mapContentType(c.uid); if(!mapped) return; out.push({key:`section-${idx}-${mapped}-${i}`,componentId:mapped,raw:c.node,uid:c.uid});}); }); return out;}

(async()=>{const data=await fetchJson('content_types/page/entries',{query:{url:'/'}});const entry=data.entries?.[0];console.log('ENTRY KEYS', Object.keys(entry||{}));const norm=normalize(entry);console.log('NORMALIZED INSTRUCTIONS');console.log(JSON.stringify(norm,null,2));})();
