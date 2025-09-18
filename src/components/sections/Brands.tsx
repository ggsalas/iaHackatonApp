import React from 'react';

export function Brands({ raw }: { raw: any }) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const r: any = raw; // eslint-disable-line @typescript-eslint/no-explicit-any
  const items = r.items || r.brands || r.entries || [];
  const title = r.title || r.heading || 'Brands';
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-6">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {items.map((it: any, i: number) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
            <div key={i} className="p-4 border rounded bg-gray-50">
              <pre className="text-[10px] leading-snug overflow-x-auto">{JSON.stringify(it, null, 2)}</pre>
            </div>
          ))}
          {!items.length && <p className="text-gray-500 text-sm col-span-full">No brands.</p>}
        </div>
      </div>
    </section>
  );
}
