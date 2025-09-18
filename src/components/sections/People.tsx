import React from 'react';

export function People({ raw }: { raw: any }) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const r: any = raw; // eslint-disable-line @typescript-eslint/no-explicit-any
  const items = r.items || r.people || r.team || r.entries || [];
  const title = r.title || r.heading || 'People';
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">{title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((it: any, i: number) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
            <div key={i} className="p-4 border rounded bg-white shadow-sm">
              <pre className="text-[11px] leading-snug overflow-x-auto">{JSON.stringify(it, null, 2)}</pre>
            </div>
          ))}
          {!items.length && <p className="text-gray-500 text-sm col-span-full">No people.</p>}
        </div>
      </div>
    </section>
  );
}
