import React from 'react';
import Image from 'next/image';

interface BrandLogo {
  uid: string;
  url: string;
  title?: string;
  filename?: string;
}

interface BrandItem {
  uid: string;
  title?: string;
  logo?: BrandLogo;
  [key: string]: any;
}

interface BrandListData {
  _content_type_uid: string;
  uid: string;
  title?: string;
  content?: BrandItem[];
  [key: string]: any;
}

interface SectionWrapper {
  section?: {
    title?: string;
    content?: BrandListData[];
    [key: string]: any;
  };
  [key: string]: any;
}

export function Brands({ raw }: { raw: SectionWrapper }) {
  const items = raw.content || [];
  const title = raw.title || 'Our Partners';

  if (!items.length) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-12 items-center">
          {items.map((brand: BrandItem) => (
            <div
              key={brand.uid}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              {brand.logo?.url ? (
                <Image
                  src={brand.logo.url}
                  alt={brand.title || brand.logo.title || 'Brand logo'}
                  width={120}
                  height={60}
                  className="max-w-full h-auto object-contain"
                />
              ) : (
                <div className="text-gray-400 text-sm font-medium">
                  {brand.title}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

