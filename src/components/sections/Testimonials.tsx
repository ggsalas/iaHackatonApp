import React from 'react';

export function Testimonials({ raw }: { raw: any }) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const items = (raw as any)?.items || []; // eslint-disable-line @typescript-eslint/no-explicit-any
  return (
    <section className="py-20 bg-indigo-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">Testimonials</h2>
        <div className="space-y-6">
          {items.map((it: any, i: number) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
            <blockquote key={i} className="border-l-4 border-indigo-400 pl-4">
              <pre className="text-[11px] leading-snug overflow-x-auto">{JSON.stringify(it, null, 2)}</pre>
            </blockquote>
          ))}
          {!items.length && <p className="text-gray-500 text-sm">No testimonials.</p>}
        </div>
      </div>
    </section>
  );
}
