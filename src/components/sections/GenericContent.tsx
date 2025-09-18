import React from 'react';

export function GenericContent({ raw }: { raw: any }) { // eslint-disable-line @typescript-eslint/no-explicit-any
  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        <pre className="text-xs bg-gray-50 border border-gray-200 rounded p-3 overflow-x-auto">{JSON.stringify(raw, null, 2)}</pre>
      </div>
    </section>
  );
}
