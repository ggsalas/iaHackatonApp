import React from 'react';

// Rough shape for trust_builder content type (fields inferred from inspection)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface TrustBuilderRaw { [key: string]: any }

function isHtmlString(v: unknown): v is string {
  return typeof v === 'string' && /<\w+[^>]*>/.test(v);
}

function renderRichBody(body: unknown) {
  if (!body) return null;
  if (typeof body === 'string') {
    if (isHtmlString(body)) {
      return (
        <div
          className="prose prose-lg max-w-none text-gray-600"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: body }}
        />
      );
    }
    return (
      <div className="space-y-5 text-gray-600 text-lg">
        {body.split(/\n\n+/).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    );
  }
  // Basic handling for Contentstack RTE JSON (very simplified)
  if (typeof body === 'object' && body && (body as any).type === 'doc' && Array.isArray((body as any).children)) { // eslint-disable-line @typescript-eslint/no-explicit-any
    const nodes = (body as any).children as any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
    return (
      <div className="space-y-5 text-gray-600 text-lg">
        {nodes.map((n, i) => {
          if (n.type === 'p' && Array.isArray(n.children)) {
            return (
              <p key={i}>
                {n.children.map((c: any, j: number) => (c.text ? <React.Fragment key={j}>{c.text}</React.Fragment> : null))}
              </p>
            );
          }
          if (n.type?.startsWith('h') && Array.isArray(n.children)) {
            const Tag: any = n.type; // eslint-disable-line @typescript-eslint/no-explicit-any
            return (
              <Tag key={i} className="font-semibold tracking-tight">
                {n.children.map((c: any, j: number) => (c.text ? <React.Fragment key={j}>{c.text}</React.Fragment> : null))}
              </Tag>
            );
          }
          return null;
        })}
      </div>
    );
  }
  return null;
}

function extractSignatureHtml(raw: TrustBuilderRaw): string | null {
  const candidates = raw.supporting_sections || raw.supporting_section || raw.supporting || [];
  if (typeof candidates === 'string') return isHtmlString(candidates) ? candidates : null;
  if (Array.isArray(candidates)) {
    for (const item of candidates) {
      if (!item) continue;
      if (typeof item === 'string' && isHtmlString(item)) return item;
      if (typeof item.text === 'string' && isHtmlString(item.text)) return item.text;
      if (item.section) {
        const sec = item.section;
        if (typeof sec === 'string' && isHtmlString(sec)) return sec;
        if (typeof sec.text === 'string' && isHtmlString(sec.text)) return sec.text;
        if (typeof sec.body === 'string' && isHtmlString(sec.body)) return sec.body;
      }
      if (typeof item.body === 'string' && isHtmlString(item.body)) return item.body;
      if (typeof item.html === 'string' && isHtmlString(item.html)) return item.html;
    }
  }
  return null;
}

export function TrustBuilder({ raw }: { raw: TrustBuilderRaw }) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const pre = raw.preheading || raw.overline || raw.kicker;
  const heading = raw.heading || raw.title;
  const body = raw.body || raw.description;
  const leftImage = raw.left_image?.url ? raw.left_image : null;
  const rightImage = raw.right_image?.url ? raw.right_image : null;
  const signatureHtml = extractSignatureHtml(raw);
  const signatureName = raw.signature_name || raw.name || null;
  const signatureRole = raw.signature_role || raw.role || null;
  const signatureImage = raw.signature_image?.url ? raw.signature_image : null;

  const hasImages = leftImage || rightImage;
  const hasContent = pre || heading || body;
  if (!hasImages && !hasContent) return null;

  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid gap-20 md:grid-cols-2 md:items-center">
          {/* Images / visual side */}
          <div className="relative order-2 md:order-1">
            {hasImages && (
              <div className="relative mx-auto w-full max-w-md">
                {leftImage && (
                  <div className={rightImage ? 'relative z-10' : 'relative'}>
                    <img
                      src={leftImage.url}
                      alt={leftImage.title || leftImage.filename || ''}
                      className="rounded-2xl shadow-xl ring-1 ring-black/5 object-cover w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                )}
                {rightImage && (
                  <img
                    src={rightImage.url}
                    alt={rightImage.title || rightImage.filename || ''}
                    className={[
                      'rounded-2xl shadow-xl ring-1 ring-black/5 object-cover w-2/3 h-auto',
                      leftImage ? 'absolute -right-10 top-1/2 -translate-y-1/2 rotate-2' : 'relative mx-auto',
                    ].join(' ')}
                    loading="lazy"
                  />
                )}
                {leftImage && rightImage && (
                  <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-indigo-200/40 to-transparent rounded-3xl blur-xl" />
                )}
              </div>
            )}
          </div>

          {/* Text / content side */}
          <div className="order-1 md:order-2 max-w-xl mx-auto md:mx-0">
            {pre && (
              <div className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                {pre}
              </div>
            )}
            {heading && (
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                {heading}
              </h2>
            )}
            {body && <div className="mt-8">{renderRichBody(body)}</div>}

            {(signatureHtml || signatureName) && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                {signatureHtml && (
                  <div
                    className="text-gray-600 text-base leading-relaxed"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: signatureHtml }}
                  />
                )}
                {(signatureName || signatureRole || signatureImage) && (
                  <div className="mt-6 flex items-center gap-4">
                    {signatureImage && (
                      <img
                        src={signatureImage.url}
                        alt={signatureName || 'Signature'}
                        className="h-14 w-14 rounded-full object-cover ring-2 ring-white shadow"
                        loading="lazy"
                      />
                    )}
                    <div>
                      {signatureName && (
                        <div className="font-semibold text-gray-900 tracking-tight">
                          {signatureName}
                        </div>
                      )}
                      {signatureRole && (
                        <div className="text-sm text-gray-500">{signatureRole}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

