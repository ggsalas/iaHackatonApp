import { mapContentType, ignorableContentTypes } from './contentTypeComponentMap';

export interface NormalizedSectionInstruction {
  key: string;
  componentId: string; // internal SectionComponentId, but keep as string to avoid circular import issues
  raw: unknown;
  meta: {
    sourceIndex: number;
    contentTypeUid?: string;
    inferred?: boolean;
    variant?: string; // e.g. 'social_proof'
  };
}

interface RawPageLike {
  sections?: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
}

function collectContentTypeUids(node: unknown, out: { uid?: string; node: any }[]) { // eslint-disable-line @typescript-eslint/no-explicit-any
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    node.forEach((n) => collectContentTypeUids(n, out));
    return;
  }
  const obj = node as Record<string, unknown>;
  if (typeof obj._content_type_uid === 'string') {
    const uid = obj._content_type_uid as string;
    out.push({ uid, node: obj });
    // Stop descending unless this is an ignorable wrapper we explicitly traverse through
    if (!ignorableContentTypes.includes(uid)) {
      return;
    }
  }
  Object.values(obj).forEach((v) => collectContentTypeUids(v, out));
}

// Heuristic detection for Social Proof style stat sections.
// This was previously done at render time in page.tsx; moved upstream so that
// downstream rendering can simply rely on componentId === 'SocialProof'.
function looksLikeSocialProof(raw: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
  if (!raw || typeof raw !== 'object') return false;
  const headingStr = (raw.heading || raw.title || '').toString();
  if (/social\s+proof/i.test(headingStr)) return true;
  const candidateKeys = ['content','items','features','stats','list','entries'];
  const candidateArrays: any[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any
  candidateKeys.forEach((k) => {
    if (Array.isArray(raw[k]) && raw[k].length >= 3) candidateArrays.push(raw[k]);
  });
  if (!candidateArrays.length) return false;
  // Prefer the longest array as likely the stat list
  const items = candidateArrays.sort((a,b)=>b.length-a.length)[0];
  let statLike = 0;
  items.forEach((it: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const num = (it?.preheading || it?.stat || it?.value || '').toString().trim();
    const label = (it?.heading || it?.title || it?.label || '').toString().trim();
    if (label && /^[\d,\s.+%]+$/.test(num) && num.replace(/[\,\s]/g,'').length > 0) statLike++;
  });
  if (!statLike) return false;
  const threshold = Math.min(3, Math.ceil(items.length * 0.6));
  return statLike >= threshold;
}

export function normalizePageSections(page: RawPageLike | null | undefined): NormalizedSectionInstruction[] {
  if (!page || !Array.isArray(page.sections)) return [];
  const result: NormalizedSectionInstruction[] = [];

  page.sections.forEach((sectionWrapper: any, sectionIndex: number) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    // Contentstack modular blocks: each element is an object with a single key naming the block type
    const blockKeys = Object.keys(sectionWrapper || {});
    let sectionObj: any = sectionWrapper; // eslint-disable-line @typescript-eslint/no-explicit-any
    let wrapperKey: string | undefined;
    if (blockKeys.length === 1) {
      wrapperKey = blockKeys[0];
      sectionObj = sectionWrapper[wrapperKey];
    }

    // Gather embedded content type UID nodes
    const collected: { uid?: string; node: any }[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any
    collectContentTypeUids(sectionObj, collected);

    if (collected.length === 0) {
      // If no embedded entries were discovered, attempt to map the wrapper key itself
      let componentId: string | null = null;
      let meta: NormalizedSectionInstruction['meta'] = { sourceIndex: sectionIndex, inferred: true };
      if (wrapperKey) {
        const mappedFromWrapper = mapContentType(wrapperKey);
        if (mappedFromWrapper) {
          componentId = mappedFromWrapper;
          meta = { sourceIndex: sectionIndex, contentTypeUid: wrapperKey };
        }
      }
      if (!componentId) {
        componentId = 'GenericContent';
      }
      // Apply Social Proof heuristic override
      if ((componentId === 'Features' || componentId === 'GenericContent') && looksLikeSocialProof(sectionObj)) {
        componentId = 'SocialProof';
        meta.variant = 'social_proof';
      }
      result.push({
        key: `section-${sectionIndex}-${componentId}${meta.contentTypeUid ? '-wrapper' : ''}`,
        componentId,
        raw: sectionObj,
        meta,
      });
      return;
    }

    collected.forEach((c, i) => {
      if (!c.uid) return;
      let mapped = mapContentType(c.uid);
      if (!mapped) return; // ignored
      const meta: NormalizedSectionInstruction['meta'] = { sourceIndex: sectionIndex, contentTypeUid: c.uid };
      if ((mapped === 'Features' || mapped === 'GenericContent') && looksLikeSocialProof(c.node)) {
        mapped = 'SocialProof';
        meta.variant = 'social_proof';
      }
      result.push({
        key: `section-${sectionIndex}-${mapped}-${i}`,
        componentId: mapped,
        raw: c.node,
        meta,
      });
    });
  });

  return result;
}
