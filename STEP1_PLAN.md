# Step 1: Next.js App Foundation Setup

## Prerequisites
- Node.js 18+ installed
- Empty directory ready for project initialization

## Acceptance Criteria
- [ ] Next.js 15 app with App Router configured
- [ ] TailwindCSS properly integrated
- [ ] TypeScript strict mode enabled
- [ ] Generic home page displaying "Techwix - We transform ideas into technology"
- [ ] Development server running at http://localhost:3000

## Execution Steps (Follow in Order)

### Step 1.1: Initialize Next.js Project
**EXACT COMMAND:**
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
```
**Expected Output:** Project files created successfully
**If Error:** Ensure directory is empty, Node.js version is 18+

### Step 1.2: Verify Initial Structure
**Command:** `ls -la`
**Expected Files:** package.json, tsconfig.json, tailwind.config.ts, next.config.js, app/

### Step 1.3: Update tsconfig.json
**File:** `tsconfig.json`
**Required Changes:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["components/*"],
      "@/lib/*": ["lib/*"],
      "@/types/*": ["types/*"]
    }
  }
}
```

### Step 1.4: Configure Tailwind
**File:** `tailwind.config.ts`
**Required Setup:**
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Placeholder for brand colors - to be updated in Step 3
        brand: {
          primary: '#000000',
          secondary: '#666666',
        }
      }
    },
  },
  plugins: [],
}
export default config
```

### Step 1.5: Create Directory Structure
**Commands:**
```bash
mkdir -p components/sections
mkdir -p components/ui
mkdir -p lib
mkdir -p types
mkdir -p public/assets/images
```

### Step 1.6: Update Home Page
**File:** `app/page.tsx`
**Exact Content:**
```typescript
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Techwix
        </h1>
        <p className="text-xl text-gray-600">
          We transform ideas into technology
        </p>
      </div>
    </main>
  )
}
```

### Step 1.7: Update Layout
**File:** `app/layout.tsx`
**Required Content:**
```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Techwix - We transform ideas into technology',
  description: 'Production-ready marketing website for Techwix',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

### Step 1.8: Create Environment Template
**File:** `.env.local`
**Content:**
```env
# Contentstack Configuration (for Step 2)
CONTENTSTACK_STACK_API_KEY=blt9935a049d73560aa
CONTENTSTACK_DELIVERY_TOKEN=cs2f18d26a75eca4cc476e1ef0
CONTENTSTACK_API_HOST=cdn.contentstack.io
CONTENTSTACK_APP_HOST=app.contentstack.com
CONTENTSTACK_ENVIRONMENT=live
CONTENTSTACK_BRANCH=main
```

## Testing Commands
```bash
npm install                # Install dependencies
npm run dev               # MUST start at http://localhost:3000
npm run build            # MUST complete without errors
npm run lint             # MUST pass without errors
```

## Success Validation Checklist
1. [ ] `npm run dev` starts server at http://localhost:3000
2. [ ] Page displays "Techwix" as h1 and tagline as p
3. [ ] TailwindCSS classes render correctly (centered layout, proper fonts)
4. [ ] No TypeScript compilation errors
5. [ ] Browser console shows no errors
6. [ ] All directories created successfully

## Troubleshooting
- **Port 3000 in use:** Kill process or use different port
- **TypeScript errors:** Check strict mode configuration
- **Tailwind not working:** Verify config file and CSS imports
- **Build fails:** Check all file paths and syntax
