import React from 'react';

export function BlogPosts({ raw }: { raw: any }) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const items = (raw as any)?.items || []; // eslint-disable-line @typescript-eslint/no-explicit-any
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">Blog Posts</h2>
        <div className="space-y-6">
          {items.map((it: any, i: number) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
            <article key={i} className="p-4 border rounded shadow-sm bg-gray-50">
              <pre className="text-[11px] leading-snug overflow-x-auto">{JSON.stringify(it, null, 2)}</pre>
            </article>
          ))}
          {!items.length && <p className="text-gray-500 text-sm">No posts.</p>}
        </div>
      </div>
    </section>
  );
}
