type RevalidateOption = number | 'no-store';

interface FetchOptions {
  cache?: RevalidateOption;
}

interface ContentstackSystemFields {
  uid: string;
  created_at?: string;
  updated_at?: string;
  locale?: string;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// Section Models (extend as needed)
export interface HeroSection {
  type: 'hero';
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  backgroundImageUrl?: string;
}

export interface FeaturesSectionFeature {
  title?: string;
  description?: string;
  icon?: string;
}

export interface FeaturesSection {
  type: 'features';
  heading?: string;
  features?: FeaturesSectionFeature[];
}

export interface CtaSection {
  type: 'cta';
  heading?: string;
  body?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export interface TestimonialSectionItem {
  quote?: string;
  author?: string;
  role?: string;
}

export interface TestimonialsSection {
  type: 'testimonials';
  heading?: string;
  items?: TestimonialSectionItem[];
}

export type Section =
  | HeroSection
  | FeaturesSection
  | CtaSection
  | TestimonialsSection;

export interface PageEntry extends ContentstackSystemFields {
  title?: string;
  url?: string;
  sections?: Section[];
}

function getBaseUrl(region?: string) {
  switch (region) {
    case 'eu':
      return 'https://eu-cdn.contentstack.com';
    case 'azure-na':
      return 'https://azure-na-cdn.contentstack.com';
    default:
      return 'https://cdn.contentstack.io';
  }
}

function assertEnv() {
  const required = [
    'CONTENTSTACK_API_KEY',
    'CONTENTSTACK_DELIVERY_TOKEN',
    'CONTENTSTACK_ENVIRONMENT',
  ];
  const missing = required.filter((v) => !process.env[v]);
  if (missing.length) {
    throw new Error(`Missing Contentstack env vars: ${missing.join(', ')}`);
  }
}

export async function contentstackFetch<T>(
  path: string,
  params?: Record<string, unknown>,
  options?: FetchOptions,
): Promise<T> {
  assertEnv();
  const apiKey = process.env.CONTENTSTACK_API_KEY as string;
  const deliveryToken = process.env.CONTENTSTACK_DELIVERY_TOKEN as string;
  const environment = process.env.CONTENTSTACK_ENVIRONMENT as string;
  const region = process.env.CONTENTSTACK_REGION;

  const searchParams = new URLSearchParams();
  searchParams.set('environment', environment);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v === undefined || v === null) return;
      if (typeof v === 'object') {
        searchParams.set(k, JSON.stringify(v));
      } else {
        searchParams.set(k, String(v));
      }
    });
  }

  const baseUrl = getBaseUrl(region);
  const url = `${baseUrl}/v3/${path}?${searchParams.toString()}`;

  const fetchOptions: RequestInit & { next?: { revalidate?: number } } = {
    headers: {
      api_key: apiKey,
      access_token: deliveryToken,
    },
  };

  if (options?.cache === 'no-store') {
    fetchOptions.cache = 'no-store';
  } else if (typeof options?.cache === 'number') {
    fetchOptions.next = { revalidate: options.cache };
  } else {
    fetchOptions.next = { revalidate: 60 };
  }

  const res = await fetch(url, fetchOptions);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Contentstack request failed ${res.status}: ${text}`);
  }
  return (await res.json()) as T;
}

export async function getPageBySlug(
  slug: string,
  options?: FetchOptions,
): Promise<PageEntry | null> {
  const normalized = slug.startsWith('/') ? slug : `/${slug}`;
  const data = await contentstackFetch<{ entries: PageEntry[] }>(
    'content_types/page/entries',
    {
      query: { url: normalized },
    },
    options,
  );
  return data.entries?.[0] || null;
}

export function hasContentstackEnv(): boolean {
  return Boolean(
    process.env.CONTENTSTACK_API_KEY &&
      process.env.CONTENTSTACK_DELIVERY_TOKEN &&
      process.env.CONTENTSTACK_ENVIRONMENT,
  );
}

// Fetch a single entry by content type and entry UID
export async function getEntry(
  contentTypeUid: string,
  entryUid: string,
  options?: FetchOptions,
): Promise<any | null> { // eslint-disable-line @typescript-eslint/no-explicit-any
  try {
    const data = await contentstackFetch<{ entry: any }>( // eslint-disable-line @typescript-eslint/no-explicit-any
      `content_types/${contentTypeUid}/entries/${entryUid}`,
      undefined,
      options,
    );
    return data.entry || null;
  } catch {
    return null;
  }
}
