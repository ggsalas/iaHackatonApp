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
        const Comp = getSectionComponent(inst.componentId);
        return (
          <div key={inst.key} className="border-b border-gray-100">
            <Comp raw={inst.hydrated || inst.raw} />
          </div>
        );
      })}
    </main>
  );
}
