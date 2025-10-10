import React from 'react';
import Image from 'next/image';

interface ProfilePhoto {
  uid: string;
  url: string;
  title?: string;
  filename?: string;
}

interface PersonItem {
  uid: string;
  title?: string;
  given_name?: string;
  family_name?: string;
  role?: string;
  organization?: string;
  profile_photo?: ProfilePhoto;
  [key: string]: any;
}

interface PersonListData {
  _content_type_uid: string;
  uid: string;
  title?: string;
  preheading?: string;
  heading?: string;
  content?: PersonItem[];
  [key: string]: any;
}

interface SectionWrapper {
  section?: {
    title?: string;
    content?: PersonListData[];
    [key: string]: any;
  };
  [key: string]: any;
}

export function People({ raw }: { raw: SectionWrapper }) {
  const items = raw.content || [];
  const heading = raw.heading || raw.title || 'Our Team';
  const preheading = raw.preheading || '';

  if (!items.length) return null;

  return (
    <section className="py-24 bg-gray-50">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((person: PersonItem) => {
            const fullName = [person.given_name, person.family_name]
              .filter(Boolean)
              .join(' ') || person.title || 'Team Member';

            return (
              <div
                key={person.uid}
                className="group text-center"
              >
                <div className="relative mb-6 overflow-hidden rounded-2xl aspect-square">
                  {person.profile_photo?.url ? (
                    <Image
                      src={person.profile_photo.url}
                      alt={fullName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold">
                      {fullName.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {fullName}
                </h3>
                {person.role && (
                  <p className="text-sm text-blue-600 font-medium">
                    {person.role}
                  </p>
                )}
                {person.organization && !person.role && (
                  <p className="text-sm text-gray-600">
                    {person.organization}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

