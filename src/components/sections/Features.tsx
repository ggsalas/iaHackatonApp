import React from 'react';

interface FeaturesRawItem { [key: string]: any } // eslint-disable-line @typescript-eslint/no-explicit-any
interface FeaturesRaw { items?: FeaturesRawItem[]; [key: string]: any } // eslint-disable-line @typescript-eslint/no-explicit-any

export function Features({ raw }: { raw: FeaturesRaw }) {
  const list = (raw as any)?.items || []; // eslint-disable-line @typescript-eslint/no-explicit-any
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">Features</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {list.map((item: any, i: number) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
            <div key={i} className="p-5 border rounded shadow-sm bg-gray-50">
              <pre className="text-[11px] leading-snug overflow-x-auto">{JSON.stringify(item, null, 2)}</pre>
            </div>
          ))}
          {!list.length && <p className="text-gray-500 text-sm">No feature items.</p>}
        </div>
      </div>
    </section>
  );
}
