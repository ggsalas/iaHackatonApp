import React from 'react';

// Flexible field mapping for Contentstack entries.
interface GenericContentRaw { // eslint-disable-line @typescript-eslint/no-explicit-any
  title?: string;
  heading?: string;
  subheading?: string;
  preheading?: string;
  overline?: string;
  kicker?: string;
  subtitle?: string;
  body?: unknown;
  link?: string | { href?: string; url?: string; title?: string; text?: string; label?: string };
  link_url?: string;
  link_text?: string;
  cta_text?: string;
  cta_link?: { href?: string; url?: string; title?: string; text?: string; label?: string };
  image?: { url?: string; filename?: string; title?: string; description?: string };
  background_image?: { url?: string; filename?: string; title?: string; description?: string };
  hero_image?: { url?: string; filename?: string; title?: string; description?: string };
  [key: string]: any; // passthrough
}

function extractLink(raw: GenericContentRaw) {
  const linkObj = (typeof raw.link === 'object' && raw.link) ? raw.link as any : null; // eslint-disable-line @typescript-eslint/no-explicit-any
  const href =
    (typeof raw.link === 'string' && raw.link) ||
    raw.link_url ||
    linkObj?.href ||
    linkObj?.url ||
    raw.cta_link?.href ||
    raw.cta_link?.url ||
    raw.url;
  const label =
    raw.link_text ||
    raw.cta_text ||
    linkObj?.label ||
    linkObj?.text ||
    linkObj?.title ||
    raw.cta_link?.title ||
    'Learn more';
  if (!href) return null;
  return { href, label };
}

function extractImage(raw: GenericContentRaw) {
  return (
    raw.background_image?.url ? raw.background_image :
      raw.image?.url ? raw.image :
        raw.hero_image?.url ? raw.hero_image :
          null
  );
}

function renderBody(body: unknown, lightOnDark: boolean): React.ReactElement | React.ReactElement[] | string | null {
  if (!body) return null;
  const baseText = lightOnDark ? 'text-gray-200' : 'text-gray-700';
  if (typeof body === 'string') {
    const looksHtml = /<\w+[^>]*>/.test(body);
    if (looksHtml) {
      return <div className={`prose max-w-none prose-invert ${baseText}`} dangerouslySetInnerHTML={{ __html: body }} />; // eslint-disable-line react/no-danger
    }
    return (
      <div className={`space-y-5 ${baseText}`}>
        {body.split(/\n\n+/).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    );
  }
  if (typeof body === 'object' && body && (body as any).type === 'doc' && Array.isArray((body as any).children)) { // eslint-disable-line @typescript-eslint/no-explicit-any
    const nodes = (body as any).children as any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
    return (
      <div className={`space-y-5 ${baseText}`}>
        {nodes.map((n, i) => {
          if (n.type === 'p' && Array.isArray(n.children)) {
            return <p key={i}>{n.children.map((c: any, j: number) => c.text ? <React.Fragment key={j}>{c.text}</React.Fragment> : null)}</p>; // eslint-disable-line @typescript-eslint/no-explicit-any
          }
          if (n.type?.startsWith('h') && Array.isArray(n.children)) {
            const Tag: any = n.type; // eslint-disable-line @typescript-eslint/no-explicit-any
            return <Tag key={i} className="font-semibold tracking-tight">{n.children.map((c: any, j: number) => c.text ? <React.Fragment key={j}>{c.text}</React.Fragment> : null)}</Tag>; // eslint-disable-line @typescript-eslint/no-explicit-any
          }
          return null;
        })}
      </div>
    );
  }
  return null;
}

export function GenericContent({ raw }: { raw: GenericContentRaw }) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const preheading = raw.preheading || raw.overline || raw.kicker;
  const heading = raw.heading || raw.title;
  const subheading = raw.subheading || raw.subtitle;
  const body = raw.body;
  const link = extractLink(raw);
  const image = extractImage(raw);

  const hasAnything = preheading || heading || subheading || body || link || image;
  if (!hasAnything) return null;

  // Hero-style variant when we have a background image
  if (image && image.url) {
    return (
      <section
        className="relative isolate overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${image.url})` }}
      >
        <div className="absolute inset-0 -z-10 bg-black/60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/60 to-black/30" />
        <div className="relative mx-auto max-w-5xl px-6 py-32 sm:py-40">
          <div className="max-w-3xl">
            {preheading && (
              <div className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
                {preheading}
              </div>
            )}
            {heading && (
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white drop-shadow-md">
                {heading}
              </h1>
            )}
            {subheading && (
              <p className="mt-6 text-lg sm:text-xl text-gray-200 leading-relaxed max-w-2xl">
                {subheading}
              </p>
            )}
            {!!body && (
              <div className="mt-8 text-base sm:text-lg">
                {renderBody(body, true) as any}
              </div>
            )}
            {link && (
              <div className="mt-10">
                <a
                  href={link.href}
                  className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-8 py-4 text-sm sm:text-base font-semibold text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400/30 hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400 transition-colors"
                >
                  {link.label}
                  <span aria-hidden>→</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Fallback non-hero layout (no background image)
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          {preheading && (
            <div className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              {preheading}
            </div>
          )}
          {heading && (
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              {subheading}
            </p>
          )}
          {!!body && (
            <div className="mt-8 text-gray-700 text-lg space-y-5">
              {renderBody(body, false) as any}
            </div>
          )}
          {link && (
            <div className="mt-10">
              <a
                href={link.href}
                className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-8 py-4 text-sm sm:text-base font-semibold text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400/30 hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 transition-colors"
              >
                {link.label}
                <span aria-hidden>→</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
