import React from 'react';

interface RawStatItem { // eslint-disable-line @typescript-eslint/no-explicit-any
  uid?: string;
  preheading?: string; // numeric value stored here in current CMS model
  heading?: string;
  title?: string;
  subheading?: string;
  body?: string;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface SocialProofRaw { // eslint-disable-line @typescript-eslint/no-explicit-any
  title?: string;
  heading?: string;
  preheading?: string;
  content?: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

function parseIntSafe(v: string | undefined): number | null {
  if (!v) return null;
  const cleaned = v.replace(/[\,\s]/g, '');
  if (!/^\d+(?:\.\d+)?$/.test(cleaned)) return null;
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : null;
}

function extractStats(items: RawStatItem[]) {
  return items.map((it) => {
    const numberRaw = it.preheading || ''; // numeric stored in preheading
    const numeric = parseIntSafe(numberRaw);
    const label = it.heading || it.title || '';
    return {
      key: it.uid || label || numberRaw,
      value: numeric,
      display: numberRaw,
      label,
    };
  }).filter((s) => s.value !== null && s.label);
}

export function SocialProof({ raw }: { raw: SocialProofRaw }) { // eslint-disable-line @typescript-eslint/no-explicit-any
  let statItems: RawStatItem[] = [];
  let nestedList: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any

  if (Array.isArray(raw.content)) {
    nestedList = raw.content.find((c: any) => Array.isArray(c?.content)); // eslint-disable-line @typescript-eslint/no-explicit-any
    if (nestedList) {
      statItems = nestedList.content || [];
    } else {
      // Treat raw.content itself as the stats list (normalization may have given us the list entry directly)
      statItems = raw.content as RawStatItem[];
    }
  }

  const stats = extractStats(statItems);

  // Attach local icon paths in order; fallback cycles if more than 4
  const localIcons = [
    '/images/social-proof/counter-1.png',
    '/images/social-proof/counter-2.png',
    '/images/social-proof/counter-3.png',
    '/images/social-proof/counter-4.png',
  ];

  let headingCandidate = raw.heading || raw.title || '';
  if (!headingCandidate && nestedList) headingCandidate = nestedList.heading || nestedList.title || '';
  if (!headingCandidate && stats.length) headingCandidate = 'Social Proof';
  headingCandidate = headingCandidate.replace(/^Home\s+/i, '').trim();
  const heading = headingCandidate || 'Social Proof';

  const sub = raw.subheading || raw.description || '';

  if (!stats.length) return null;

  return (
    <section className="techwix-counter-section-02 py-24">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            {heading}
          </h2>
          {sub && (
            <p className="mt-5 text-base md:text-lg text-gray-600 leading-relaxed">
              {sub}
            </p>
          )}
        </div>
        <dl className="mt-14 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((s, idx) => (
            <div
              key={s.key}
              className="single-counter flex flex-col items-center text-center"
            >
              <div className="counter-img mb-4 w-20 h-20 flex items-center justify-center">
                {/* Icon image */}
                {/* Cycle local icons */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={localIcons[idx % localIcons.length]}
                  alt=""
                  className="max-w-full h-auto"
                />
              </div>
              <div className="counter-content">
                <dd className="counter block text-4xl font-extrabold tracking-tight text-gray-900" aria-label={`${s.display} ${s.label}`}>
                  {s.display}
                </dd>
                <dt className="mt-2 text-base font-medium text-gray-600">
                  {s.label}
                </dt>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
