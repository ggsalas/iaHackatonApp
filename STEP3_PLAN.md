# Step 3: Header and Footer Components

## Prerequisites
- Step 2 completed successfully
- All pages loading with navigation working
- WebFetch tool access to analyze reference template

## Acceptance Criteria
- [ ] Header component matches https://ai-buildathon-template.netlify.app design exactly
- [ ] Footer component matches template design exactly  
- [ ] Brand colors extracted and configured in Tailwind
- [ ] Logo downloaded and integrated using Next.js Image
- [ ] Responsive mobile menu working
- [ ] Components integrated into layout.tsx replacing basic navigation

## Execution Steps (Follow in Order)

### Step 3.1: Analyze Reference Template (REQUIRED FIRST)
**CRITICAL:** Use webfetch tool to analyze https://ai-buildathon-template.netlify.app
**Extract and document:**
- Primary brand color (hex code)
- Secondary colors (hex codes)
- Header layout (logo position, nav items, styling)
- Footer layout (sections, links, styling)
- Typography (font sizes, weights)
- Spacing patterns (margins, padding)
- Mobile breakpoints
- Hover states and animations

**Output:** Document findings before proceeding to next step

### Step 3.2: Download Logo Asset
**Commands:**
```bash
mkdir -p public/assets/images
curl -o public/assets/images/logo.png "https://ai-buildathon-template.netlify.app/assets/images/logo.png"
```
**Verification:** `ls -la public/assets/images/logo.png` should show downloaded file

### Step 3.3: Update Tailwind Configuration
**File:** `tailwind.config.ts`
**Replace existing colors section with extracted brand colors:**
```typescript
// Update based on extracted colors from Step 3.1
theme: {
  extend: {
    colors: {
      brand: {
        primary: '#[EXTRACTED_PRIMARY_COLOR]', // Replace with actual hex
        secondary: '#[EXTRACTED_SECONDARY_COLOR]', // Replace with actual hex
        accent: '#[EXTRACTED_ACCENT_COLOR]', // Replace with actual hex
        text: {
          primary: '#[EXTRACTED_TEXT_COLOR]', // Replace with actual hex
          secondary: '#[EXTRACTED_SECONDARY_TEXT]', // Replace with actual hex
        }
      }
    },
    fontFamily: {
      // Add font family if different from Inter
    }
  }
}
```

### Step 3.4: Create Header Component
**File:** `components/Header.tsx`
**Exact Structure Based on Template Analysis:**
```typescript
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="[APPLY_EXTRACTED_HEADER_CLASSES]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center [APPLY_EXTRACTED_HEIGHT]">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/images/logo.png"
              alt="Techwix Logo"
              width={[EXTRACTED_LOGO_WIDTH]}
              height={[EXTRACTED_LOGO_HEIGHT]}
              className="[APPLY_EXTRACTED_LOGO_CLASSES]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="[APPLY_EXTRACTED_NAV_CLASSES] hover:[EXTRACTED_HOVER_CLASSES]"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden [APPLY_EXTRACTED_MOBILE_BUTTON_CLASSES]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {/* Hamburger icon - implement based on template */}
            <div className="w-6 h-6 flex flex-col justify-center">
              <span className="[HAMBURGER_LINE_CLASSES]"></span>
              <span className="[HAMBURGER_LINE_CLASSES]"></span>
              <span className="[HAMBURGER_LINE_CLASSES]"></span>
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden [APPLY_EXTRACTED_MOBILE_MENU_CLASSES]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="[APPLY_EXTRACTED_MOBILE_NAV_CLASSES]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
```

**IMPORTANT:** Replace all `[EXTRACTED_*]` placeholders with actual values from Step 3.1 analysis

### Step 3.5: Create Footer Component
**File:** `components/Footer.tsx`
**Exact Structure Based on Template Analysis:**
```typescript
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="[APPLY_EXTRACTED_FOOTER_CLASSES]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="[APPLY_EXTRACTED_FOOTER_GRID_CLASSES]">
          {/* Company Info Section */}
          <div className="[APPLY_EXTRACTED_COMPANY_SECTION_CLASSES]">
            <h3 className="[APPLY_EXTRACTED_FOOTER_HEADING_CLASSES]">Techwix</h3>
            <p className="[APPLY_EXTRACTED_FOOTER_TEXT_CLASSES]">
              We transform ideas into technology
            </p>
          </div>

          {/* Navigation Links */}
          <div className="[APPLY_EXTRACTED_NAV_SECTION_CLASSES]">
            <h3 className="[APPLY_EXTRACTED_FOOTER_HEADING_CLASSES]">Navigation</h3>
            <ul className="[APPLY_EXTRACTED_FOOTER_LIST_CLASSES]">
              <li><Link href="/" className="[APPLY_EXTRACTED_FOOTER_LINK_CLASSES]">Home</Link></li>
              <li><Link href="/about" className="[APPLY_EXTRACTED_FOOTER_LINK_CLASSES]">About</Link></li>
              <li><Link href="/services" className="[APPLY_EXTRACTED_FOOTER_LINK_CLASSES]">Services</Link></li>
              <li><Link href="/contact" className="[APPLY_EXTRACTED_FOOTER_LINK_CLASSES]">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info (if present in template) */}
          <div className="[APPLY_EXTRACTED_CONTACT_SECTION_CLASSES]">
            <h3 className="[APPLY_EXTRACTED_FOOTER_HEADING_CLASSES]">Contact</h3>
            <p className="[APPLY_EXTRACTED_FOOTER_TEXT_CLASSES]">
              [ADD_CONTACT_INFO_FROM_TEMPLATE]
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="[APPLY_EXTRACTED_COPYRIGHT_CLASSES]">
          <p className="[APPLY_EXTRACTED_COPYRIGHT_TEXT_CLASSES]">
            © {currentYear} Techwix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

**IMPORTANT:** Replace all `[EXTRACTED_*]` placeholders with actual values from Step 3.1 analysis

### Step 3.6: Update Layout Integration
**File:** `app/layout.tsx`
**Replace existing layout with:**
```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
```

### Step 3.7: Update Page Styles
**Remove navigation from pages** - Update all page files to remove the manual nav since Header now provides it:

**Files to update:** `app/page.tsx`, `app/about/page.tsx`, `app/services/page.tsx`, `app/contact/page.tsx`

**Remove this className from main:** `min-h-screen` (since layout handles it)
**Update main className to:** `p-8` only

## Testing Commands (Run After Each Step)
```bash
npm run dev           # MUST show new header/footer on all pages
npm run build         # MUST build successfully
npm run lint          # MUST pass without errors
```

## Success Validation Checklist
1. [ ] Template analysis completed with documented colors and layout
2. [ ] Logo downloaded and displays correctly in header
3. [ ] Header matches template design exactly (colors, spacing, typography)
4. [ ] Footer matches template design exactly
5. [ ] Mobile menu toggles correctly on small screens
6. [ ] Navigation works from header on all pages
7. [ ] Responsive design matches template at all breakpoints
8. [ ] No layout shifts or visual inconsistencies
9. [ ] Accessibility: proper focus management and keyboard navigation

## Critical Notes for AI
- **MUST complete Step 3.1 first** - No implementation without template analysis
- **Use exact hex codes** from template, not approximations
- **Match spacing precisely** - measure padding/margins from template
- **Test mobile responsiveness** at 768px breakpoint minimum
- **Verify logo loads** - check Network tab for 404 errors

## Troubleshooting
- **Logo not displaying:** Verify download and file path
- **Styles not matching:** Re-analyze template for exact CSS values  
- **Mobile menu issues:** Check useState and click handlers
- **Build errors:** Verify all imports and component syntax

