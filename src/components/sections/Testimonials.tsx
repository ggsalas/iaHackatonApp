'use client';
import React, { useState } from 'react';

interface TestimonialItem {
  uid: string;
  title?: string;
  body?: string;
  person?: Array<{
    uid: string;
    _content_type_uid: string;
  }>;
  [key: string]: any;
}

interface TestimonialListData {
  _content_type_uid: string;
  uid: string;
  title?: string;
  preheading?: string;
  heading?: string;
  content?: TestimonialItem[];
  [key: string]: any;
}

interface SectionWrapper {
  section?: {
    title?: string;
    content?: TestimonialListData[];
    blueprint?: Array<{ view_name?: string }>;
    [key: string]: any;
  };
  [key: string]: any;
}

export function Testimonials({ raw }: { raw: SectionWrapper }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = raw.content || [];
  const heading = raw.heading || raw.title || 'Testimonials';
  const preheading = raw.preheading || '';

  if (!items.length) return null;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          {preheading && (
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
              {preheading}
            </p>
          )}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            {heading}
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {items.map((item: TestimonialItem, idx: number) => (
                <div
                  key={item.uid || idx}
                  className="w-full flex-shrink-0"
                >
                  <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                    <div className="mb-6">
                      <svg
                        className="w-12 h-12 text-blue-600 opacity-50"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                      {item.body}
                    </blockquote>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                        {item.title?.charAt(0) || 'T'}
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold text-gray-900">{item.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {items.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-800 hover:bg-gray-50 transition-colors"
                aria-label="Previous testimonial"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-800 hover:bg-gray-50 transition-colors"
                aria-label="Next testimonial"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="flex justify-center gap-2 mt-8">
                {items.map((_: TestimonialItem, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentIndex
                        ? 'bg-blue-600 w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

