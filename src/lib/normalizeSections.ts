import { mapContentType } from './contentTypeComponentMap';

export interface NormalizedSectionInstruction {
  key: string;
  componentId: string; // internal SectionComponentId, but keep as string to avoid circular import issues
  raw: unknown;
  meta: {
    sourceIndex: number;
    contentTypeUid?: string;
    inferred?: boolean;
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
    out.push({ uid: obj._content_type_uid, node: obj });
  }
  Object.values(obj).forEach((v) => collectContentTypeUids(v, out));
}

export function normalizePageSections(page: RawPageLike | null | undefined): NormalizedSectionInstruction[] {
  if (!page || !Array.isArray(page.sections)) return [];
  const result: NormalizedSectionInstruction[] = [];

  page.sections.forEach((sectionWrapper: any, sectionIndex: number) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    // Contentstack modular blocks: each element is an object with a single key naming the block type
    const blockKeys = Object.keys(sectionWrapper || {});
    let sectionObj: any = sectionWrapper; // by default
    let wrapperKey: string | undefined;
    if (blockKeys.length === 1) {
      wrapperKey = blockKeys[0];
      sectionObj = sectionWrapper[wrapperKey];
    }

    // Gather embedded content type UID nodes
    const collected: { uid?: string; node: any }[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any
    collectContentTypeUids(sectionObj, collected);

    if (collected.length === 0) {
      // Attempt hero inference: first section + has background_image
      const componentId = 'GenericContent';
      result.push({
        key: `section-${sectionIndex}-${componentId}`,
        componentId,
        raw: sectionObj,
        meta: { sourceIndex: sectionIndex, inferred: true },
      });
      return;
    }

    collected.forEach((c, i) => {
      if (!c.uid) return;
      const mapped = mapContentType(c.uid);
      if (!mapped) return; // ignored
      result.push({
        key: `section-${sectionIndex}-${mapped}-${i}`,
        componentId: mapped,
        raw: c.node,
        meta: { sourceIndex: sectionIndex, contentTypeUid: c.uid },
      });
    });
  });

  return result;
}
