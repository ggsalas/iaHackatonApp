import React from 'react';

// Raw shape for a general_content_list entry plus fallbacks
interface FeaturesRaw { // eslint-disable-line @typescript-eslint/no-explicit-any
  title?: string;
  heading?: string;
  preheading?: string;
  subheading?: string;
  description?: string;
  body?: unknown;
  content?: any[]; // embedded general_content entries
  items?: any[];
  features?: any[];
  cards?: any[];
  entries?: any[];
  [key: string]: any;
}

export function Features({ raw }: { raw: FeaturesRaw }) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const r: any = raw; // eslint-disable-line @typescript-eslint/no-explicit-any

  // Section level fields
  const pre = r.preheading || r.overline || r.kicker || '';
  const heading = r.heading || r.title || 'Features';
  const sub = r.subheading || r.description || (typeof r.body === 'string' ? r.body : '');

  // Items can live under several keys; include `content` (actual general_content_list field)
  const items: any[] = // eslint-disable-line @typescript-eslint/no-explicit-any
    r.content || r.items || r.features || r.cards || r.entries || [];

  function extractLink(it: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (!it) return null;
    const linkObj = typeof it.link === 'object' && it.link ? it.link : it.cta_link;
    const href =
      (typeof it.link === 'string' && it.link) ||
      it.link_url ||
      linkObj?.href ||
      linkObj?.url ||
      it.url;
    const label =
      it.link_text ||
      it.cta_text ||
      linkObj?.label ||
      linkObj?.text ||
      linkObj?.title ||
      'Learn more';
    if (!href) return null;
    return { href, label };
  }

  function renderBody(body: unknown) {
    if (!body) return null;
    if (typeof body === 'string') {
      const looksHtml = /<\w+[^>]*>/.test(body);
      if (looksHtml) {
        return (
          <div
            className="mt-3 text-sm leading-relaxed text-gray-600"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        ); // eslint-disable-line react/no-danger
      }
      return <p className="mt-3 text-sm leading-relaxed text-gray-600">{body}</p>;
    }
    return null;
  }

  if (!items.length && !pre && !heading && !sub) return null;

  return (
    <section className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          {pre && (
            <div className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              {pre}
            </div>
          )}
          {heading && (
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              {heading}
            </h2>
          )}
          {sub && (
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              {sub}
            </p>
          )}
        </div>

        <ul
          role="list"
          className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {items.map((it: any, i: number) => { // eslint-disable-line @typescript-eslint/no-explicit-any
            const title = it.heading || it.title || it.name || 'Feature';
            const body = it.subheading || it.description || it.body;
            const link = extractLink(it);
            const image = it.image?.url ? it.image : null;
            return (
              <li
                key={it.uid || i}
                className="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                {image && (
                  <div className="mb-5">
                    {/* Decorative image / icon */}
                    <img
                      src={image.url}
                      alt={image.title || ''}
                      className="h-12 w-12 object-contain rounded-md bg-indigo-50 p-2"
                      loading="lazy"
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                  {title}
                </h3>
                {renderBody(body)}
                {link && (
                  <div className="mt-4">
                    <a
                      href={link.href}
                      className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      {link.label}
                      <span className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden>
                        →
                      </span>
                    </a>
                  </div>
                )}
              </li>
            );
          })}
          {!items.length && (
            <li className="col-span-full text-sm text-gray-500 italic border rounded p-6 bg-gray-50">
              No feature items.
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
