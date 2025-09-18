import React from 'react';

interface HeroRaw {
  title?: string;
  background_image?: { url?: string; filename?: string };
}

export function Hero({ raw }: { raw: HeroRaw }) {
  const bgUrl = (raw as any)?.background_image?.url; // eslint-disable-line @typescript-eslint/no-explicit-any
  return (
    <header className="relative flex items-center justify-center text-center min-h-[420px] py-24">
      {bgUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${bgUrl})` }}
        />
      )}
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm">
          {raw.title || 'Hero'}
        </h1>
      </div>
    </header>
  );
}
