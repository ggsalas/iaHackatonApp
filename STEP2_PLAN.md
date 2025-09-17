# Step 2: Content Pages with Contentstack Integration

## Prerequisites
- Step 1 completed successfully
- Next.js app running without errors
- Environment variables configured

## Acceptance Criteria
- [ ] 4 pages created: `/`, `/about`, `/services`, `/contact`
- [ ] Contentstack fetch utility implemented with error handling
- [ ] Each page displays JSON content from correct Contentstack entry ID
- [ ] TypeScript types defined for API responses
- [ ] Basic navigation between pages working

## Entry ID Reference (EXACT IDs)
- **Home:** `blt2b4871190715c020`
- **About:** `bltfb3602ca6d53dce9`  
- **Services:** `blt025eb4dcbedf8e9f`
- **Contact:** `blt9f931b18dae8ddfb`

## Execution Steps (Follow in Order)

### Step 2.1: Create TypeScript Types
**File:** `types/contentstack.ts`
**Exact Content:**
```typescript
// Base content structure from Contentstack
export interface ContentstackResponse {
  title: string
  sections: Section[]
}

// Section discriminated union for different section types
export type Section = 
  | HeroSection
  | FeaturesSection
  | TestimonialsSection
  | ContactSection

export interface HeroSection {
  type: 'hero'
  title: string
  subtitle?: string
  cta_button?: string
}

export interface FeaturesSection {
  type: 'features'
  title: string
  features: Array<{
    title: string
    description: string
  }>
}

export interface TestimonialsSection {
  type: 'testimonials'
  title: string
  testimonials: Array<{
    name: string
    text: string
    company?: string
  }>
}

export interface ContactSection {
  type: 'contact'
  title: string
  email?: string
  phone?: string
}

// Error types
export class ContentstackError extends Error {
  constructor(
    message: string,
    public entryId: string,
    public statusCode?: number
  ) {
    super(message)
    this.name = 'ContentstackError'
  }
}
```

### Step 2.2: Create Contentstack Fetch Utility
**File:** `lib/contentstack.ts`
**Exact Content:**
```typescript
import { ContentstackResponse, ContentstackError } from '@/types/contentstack'

const API_BASE_URL = `https://${process.env.CONTENTSTACK_API_HOST}/v3`

export async function getEntry(entryId: string): Promise<ContentstackResponse> {
  const url = `${API_BASE_URL}/content_types/page/entries/${entryId}`
  
  const headers = {
    'api_key': process.env.CONTENTSTACK_STACK_API_KEY!,
    'access_token': process.env.CONTENTSTACK_DELIVERY_TOKEN!,
    'environment': process.env.CONTENTSTACK_ENVIRONMENT!,
    'branch': process.env.CONTENTSTACK_BRANCH || 'main',
    'Content-Type': 'application/json'
  }

  try {
    const response = await fetch(url, {
      headers,
      next: { revalidate: 300 } // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new ContentstackError(
        `Failed to fetch entry: ${response.statusText}`,
        entryId,
        response.status
      )
    }

    const data = await response.json()
    
    if (!data.entry) {
      throw new ContentstackError('No entry found in response', entryId)
    }

    return {
      title: data.entry.title || 'Untitled',
      sections: data.entry.sections || []
    }
  } catch (error) {
    if (error instanceof ContentstackError) {
      throw error
    }
    throw new ContentstackError(
      `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      entryId
    )
  }
}
```

### Step 2.3: Update Home Page
**File:** `app/page.tsx`
**Exact Content:**
```typescript
import { getEntry } from '@/lib/contentstack'
import { ContentstackError } from '@/types/contentstack'

export default async function HomePage() {
  let content
  let error: string | null = null

  try {
    content = await getEntry('blt2b4871190715c020')
  } catch (e) {
    error = e instanceof ContentstackError ? e.message : 'Unknown error'
    content = null
  }

  if (error) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-red-600">Error Loading Home Page</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="bg-gray-100 p-4 rounded">
            <p>Fallback: Welcome to Techwix - We transform ideas into technology</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Home Page</h1>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Content from Contentstack:</h2>
          <pre className="whitespace-pre-wrap text-sm overflow-auto">
            {JSON.stringify(content, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  )
}
```

### Step 2.4: Create About Page
**File:** `app/about/page.tsx`
**Directory:** Create `app/about/` directory first
**Commands:**
```bash
mkdir -p app/about
```
**Exact Content:**
```typescript
import { getEntry } from '@/lib/contentstack'
import { ContentstackError } from '@/types/contentstack'

export default async function AboutPage() {
  let content
  let error: string | null = null

  try {
    content = await getEntry('bltfb3602ca6d53dce9')
  } catch (e) {
    error = e instanceof ContentstackError ? e.message : 'Unknown error'
    content = null
  }

  if (error) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-red-600">Error Loading About Page</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Page</h1>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Content from Contentstack:</h2>
          <pre className="whitespace-pre-wrap text-sm overflow-auto">
            {JSON.stringify(content, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  )
}
```

### Step 2.5: Create Services Page
**Commands:**
```bash
mkdir -p app/services
```
**File:** `app/services/page.tsx`
**Exact Content:**
```typescript
import { getEntry } from '@/lib/contentstack'
import { ContentstackError } from '@/types/contentstack'

export default async function ServicesPage() {
  let content
  let error: string | null = null

  try {
    content = await getEntry('blt025eb4dcbedf8e9f')
  } catch (e) {
    error = e instanceof ContentstackError ? e.message : 'Unknown error'
    content = null
  }

  if (error) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-red-600">Error Loading Services Page</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Services Page</h1>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Content from Contentstack:</h2>
          <pre className="whitespace-pre-wrap text-sm overflow-auto">
            {JSON.stringify(content, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  )
}
```

### Step 2.6: Create Contact Page
**Commands:**
```bash
mkdir -p app/contact
```
**File:** `app/contact/page.tsx`
**Exact Content:**
```typescript
import { getEntry } from '@/lib/contentstack'
import { ContentstackError } from '@/types/contentstack'

export default async function ContactPage() {
  let content
  let error: string | null = null

  try {
    content = await getEntry('blt9f931b18dae8ddfb')
  } catch (e) {
    error = e instanceof ContentstackError ? e.message : 'Unknown error'
    content = null
  }

  if (error) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-red-600">Error Loading Contact Page</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Contact Page</h1>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Content from Contentstack:</h2>
          <pre className="whitespace-pre-wrap text-sm overflow-auto">
            {JSON.stringify(content, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  )
}
```

### Step 2.7: Add Basic Navigation
**File:** `app/layout.tsx` (Update existing)
**Add this navigation section before {children}:**
```typescript
// Add this import at top
import Link from 'next/link'

// Add this nav element before {children} in the body:
<nav className="bg-gray-100 p-4">
  <div className="max-w-4xl mx-auto flex space-x-6">
    <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
    <Link href="/about" className="text-blue-600 hover:text-blue-800">About</Link>
    <Link href="/services" className="text-blue-600 hover:text-blue-800">Services</Link>
    <Link href="/contact" className="text-blue-600 hover:text-blue-800">Contact</Link>
  </div>
</nav>
```

## Testing Commands (Run in Order)
```bash
npm run dev           # MUST start without errors
npm run build         # MUST complete successfully  
npm run lint          # MUST pass all checks
```

## Success Validation Checklist
1. [ ] Visit http://localhost:3000 - shows Home page with JSON content
2. [ ] Visit http://localhost:3000/about - shows About page with JSON content  
3. [ ] Visit http://localhost:3000/services - shows Services page with JSON content
4. [ ] Visit http://localhost:3000/contact - shows Contact page with JSON content
5. [ ] Navigation links work between all pages
6. [ ] Error handling displays when API fails
7. [ ] No TypeScript compilation errors
8. [ ] All pages build successfully for production

## Troubleshooting
- **API errors:** Check environment variables in `.env.local`
- **TypeScript errors:** Verify import paths and type definitions
- **Build failures:** Check async/await syntax in Server Components
- **Network issues:** Verify Contentstack API credentials and permissions
