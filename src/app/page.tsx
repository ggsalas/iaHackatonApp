import { getPageBySlug, hasContentstackEnv } from '@/lib/contentstack';
import { normalizePageSections } from '@/lib/normalizeSections';
import { hydrateInstructions } from '@/lib/hydrateSections';
import { getSectionComponent } from '@/components/sections';

export const revalidate = 60; // ISR demo; adjust as needed

export default async function HomePage() {
  let page: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any
  if (hasContentstackEnv()) {
    try {
      page = await getPageBySlug('/', { cache: 60 });
    } catch (e) {
      // swallow for now; could add logging
    }
  }

  const baseInstructions = normalizePageSections(page);
  const hydrated = await hydrateInstructions(baseInstructions);

  return (
    <main className="min-h-screen bg-white">
      {!hasContentstackEnv() && (
        <div className="bg-red-50 border-b border-red-200 py-3">
          <div className="max-w-6xl mx-auto px-4 text-sm text-red-700">
            Missing Contentstack environment variables. Add them to <code>.env.local</code> to enable dynamic content.
          </div>
        </div>
      )}
      {hydrated.length === 0 && (
        <div className="max-w-6xl mx-auto px-4 py-10 text-gray-600">No sections to render.</div>
      )}
      {hydrated.map((inst) => {
        const baseRaw: any = inst.raw; // eslint-disable-line @typescript-eslint/no-explicit-any
        const hyd: any = inst.hydrated; // eslint-disable-line @typescript-eslint/no-explicit-any
        let merged = hyd ? { ...baseRaw, ...hyd } : baseRaw;

        const componentId = inst.componentId;
        const Comp = getSectionComponent(componentId);

        // Preserve base expanded content if hydration only returned reference shells
        if (hyd && Array.isArray(baseRaw?.content) && Array.isArray(hyd?.content)) {
          const hydLooksLikeRefs = hyd.content.length > 0 && hyd.content.every((c: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
            const keys = Object.keys(c || {});
            return keys.length <= 2 && keys.includes('uid') && keys.includes('_content_type_uid');
          });
          const baseHasExpanded = baseRaw.content.some((c: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
            const keys = Object.keys(c || {});
            return keys.length > 2;
          });
          if (hydLooksLikeRefs && baseHasExpanded) {
            merged = { ...merged, content: baseRaw.content };
          }
        }

        return (
          <div
            key={inst.key}
            className="border-b border-gray-100"
            data-section-component={componentId}
            data-raw-type={inst.meta?.contentTypeUid || ''}
            data-variant={inst.meta?.variant || ''}
            data-heading={(merged as any)?.heading || (merged as any)?.title || ''}
          >
            <Comp raw={merged} />
          </div>
        );
      })}
    </main>
  );
}
