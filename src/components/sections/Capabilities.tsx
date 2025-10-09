import React from 'react';

interface CapabilitiesRaw {
  title?: string;
  heading?: string;
  preheading?: string;
  subheading?: string;
  description?: string;
  body?: unknown;
  content?: any[];
  items?: any[];
  link?: { title?: string; href?: string };
  link_supporting_text?: string;
  [key: string]: any;
}

export function Capabilities({ raw }: { raw: CapabilitiesRaw }) {
  const r: any = raw;

  const pre = r.preheading || r.overline || r.kicker || '';
  const heading = r.heading || r.title || 'Capabilities';
  const sub = r.subheading || r.description || (typeof r.body === 'string' ? r.body : '');

  const items: any[] = r.content || r.items || [];

  const mainLink = r.link && r.link.href ? r.link : null;
  const linkSupportingText = r.link_supporting_text || '';

  function renderBody(body: unknown) {
    if (!body) return null;
    if (typeof body === 'string') {
      const looksHtml = /<\w+[^>]*>/.test(body);
      if (looksHtml) {
        return (
          <div
            className="text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        );
      }
      return <p className="text-gray-600 leading-relaxed">{body}</p>;
    }
    return null;
  }

  if (!items.length && !pre && !heading && !sub) return null;

  return (
    <section className="relative py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
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

        <div className="grid gap-8 md:grid-cols-3">
          {items.map((it: any, i: number) => {
            const title = it.heading || it.title || it.name || 'Capability';
            const body = it.subheading || it.description || it.body;
            const image = it.image?.url ? it.image : null;
            
            return (
              <div
                key={it.uid || i}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                {image && (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.title || title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {title}
                  </h3>
                  {renderBody(body)}
                </div>
              </div>
            );
          })}
        </div>

        {mainLink && (
          <div className="mt-12 text-center">
            {linkSupportingText && (
              <p className="text-sm text-gray-600 mb-2">{linkSupportingText}</p>
            )}
            <a
              href={mainLink.href}
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors group"
            >
              {mainLink.title || 'Learn more'}
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
