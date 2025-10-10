import { getPageBySlug, hasContentstackEnv } from '@/lib/contentstack';

export const revalidate = 60;

export default async function ContactPage() {
  let page = null;
  if (hasContentstackEnv()) {
    try {
      page = await getPageBySlug('/contact', { cache: 60 });
    } catch (_err) {
      // Intentionally ignore: allow static fallback when CMS fetch fails
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Contact Page (CMS Raw JSON)</h1>
        {!hasContentstackEnv() && (
          <p className="text-red-600">
            Missing Contentstack environment variables. Add them to <code>.env.local</code> to enable dynamic content.
          </p>
        )}
        {page ? (
          <pre className="bg-gray-100 text-gray-800 p-4 rounded text-sm overflow-x-auto">{JSON.stringify(page, null, 2)}</pre>
        ) : (
          <p className="text-gray-600">No page data returned.</p>
        )}
      </div>
    </main>
  );
}
