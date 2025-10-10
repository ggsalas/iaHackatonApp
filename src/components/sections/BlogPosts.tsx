import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PrimaryImage {
  uid: string;
  url: string;
  title?: string;
  filename?: string;
}

interface BlogPostItem {
  uid: string;
  title?: string;
  published_date?: string;
  primary_image?: PrimaryImage;
  body?: string;
  url?: string;
  author?: Array<{
    uid: string;
    _content_type_uid: string;
  }>;
  [key: string]: any;
}

interface BlogPostListData {
  _content_type_uid: string;
  uid: string;
  title?: string;
  preheading?: string;
  heading?: string;
  content?: BlogPostItem[];
  [key: string]: any;
}

interface SectionWrapper {
  section?: {
    title?: string;
    content?: BlogPostListData[];
    [key: string]: any;
  };
  [key: string]: any;
}

function formatDate(dateString?: string): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch {
    return dateString;
  }
}

function extractExcerpt(body?: string): string {
  if (!body) return '';
  const plainText = body.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
}

export function BlogPosts({ raw }: { raw: SectionWrapper }) {
  const items = raw.content || [];
  const heading = raw.heading || raw.title || 'Latest Posts';
  const preheading = raw.preheading || '';

  if (!items.length) return null;

  return (
    <section className="py-24 bg-white">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((post: BlogPostItem) => {
            const postUrl: string = post.url || `/blog/${post.uid}`;
            const excerpt = extractExcerpt(post.body);

            return (
              <article
                key={post.uid}
                className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {post.primary_image?.url && (
                  <Link href={postUrl as any} className="relative h-48 overflow-hidden bg-gray-100">
                    <Image
                      src={post.primary_image.url}
                      alt={post.title || 'Blog post image'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                )}
                
                <div className="flex-1 flex flex-col p-6">
                  {post.published_date && (
                    <time className="text-sm text-gray-500 mb-3">
                      {formatDate(post.published_date)}
                    </time>
                  )}
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    <Link href={postUrl as any}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  {excerpt && (
                    <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
                      {excerpt}
                    </p>
                  )}
                  
                  <Link
                    href={postUrl as any}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    Read more
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

