import { NormalizedSectionInstruction } from './normalizeSections';
import { getEntry } from './contentstack';

export interface HydratedSectionInstruction extends NormalizedSectionInstruction {
  hydrated?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export async function hydrateInstructions(
  instructions: NormalizedSectionInstruction[],
): Promise<HydratedSectionInstruction[]> {
  // Collect unique (contentTypeUid, raw.uid) pairs
  const pairs: Array<{ contentTypeUid: string; entryUid: string }> = [];
  const seen = new Set<string>();
  instructions.forEach((inst) => {
    const entryUid = (inst.raw as any)?.uid; // eslint-disable-line @typescript-eslint/no-explicit-any
    const contentType = inst.meta.contentTypeUid;
    if (entryUid && contentType) {
      const key = `${contentType}:${entryUid}`;
      if (!seen.has(key)) {
        seen.add(key);
        pairs.push({ contentTypeUid: contentType, entryUid });
      }
    }
  });

  const resolved = await Promise.all(
    pairs.map(async (p) => ({ ...p, entry: await getEntry(p.contentTypeUid, p.entryUid, { cache: 300 }) })),
  );

  return instructions.map((inst) => {
    const entryUid = (inst.raw as any)?.uid; // eslint-disable-line @typescript-eslint/no-explicit-any
    const contentType = inst.meta.contentTypeUid;
    if (!entryUid || !contentType) return inst;
    const match = resolved.find((r) => r.entryUid === entryUid && r.contentTypeUid === contentType);
    if (!match || !match.entry) return inst;
    return { ...inst, hydrated: match.entry };
  });
}
