import React from 'react';

export function TrustBuilder({ raw }: { raw: any }) { // eslint-disable-line @typescript-eslint/no-explicit-any
  return (
    <section className="py-12 bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-4">Trust Builder</h2>
        <pre className="text-xs bg-gray-800 rounded p-3 overflow-x-auto">{JSON.stringify(raw, null, 2)}</pre>
      </div>
    </section>
  );
}
