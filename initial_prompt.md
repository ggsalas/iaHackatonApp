**Full Prompt**

Act as a senior full‑stack engineer. Build a production-ready, SEO-optimized marketing website for a company using Next.js 15 (App Router, Server Components, Server Actions), React, TypeScript (strict), TailwindCSS, and (if helpful) shadcn/ui. The site must pull structured content from Contentstack and replicate the visual design, layout rhythm, spacing, typography, and component patterns of the reference template pages. Follow modern accessibility, performance, and clean code practices throughout.

Project / Brand (Fill These Before Running):
- Company Name: Techwix
- Tagline: We transform ideas into technology
- Primary Brand Color(s): extract from https://ai-buildathon-template.netlify.app
- Font Choices: Use those matching the template (fallback system stack)
- Favicon / Logo: https://ai-buildathon-template.netlify.app/assets/images/logo.png

Reference Design Sources (clone structure, hierarchy, spacing, and visual style):
- Home (/): https://ai-buildathon-template.netlify.app/
- Contact (/contact): https://ai-buildathon-template.netlify.app/about   (NOTE: Source/target mismatch in original spec—keep mapping unless instructed otherwise)
- Services (/services): https://ai-buildathon-template.netlify.app/service
- About (/about): https://ai-buildathon-template.netlify.app/contact

Contentstack Integration:
- Use a reusable server-side fetch wrapper (no client-side fetching for page data unless explicitly needed)
- Define environment variables:
  CONTENTSTACK_STACK_API_KEY=blt9935a049d73560aa
  CONTENTSTACK_DELIVERY_TOKEN=cs2f18d26a75eca4cc476e1ef0
  CONTENTSTACK_API_HOST=cdn.contentstack.io
  CONTENTSTACK_APP_HOST=app.contentstack.com
  CONTENTSTACK_ENVIRONMENT=live
  CONTENTSTACK_BRANCH=main
- Page entry IDs:
  index: blt2b4871190715c020
  contact: blt9f931b18dae8ddfb
  services: blt025eb4dcbedf8e9f
  about: bltfb3602ca6d53dce9
- Returned shape:
  {
    title: string
    sections: Section[] // ordered by position
  }
  Expected section types may include (example from Home): Hero, FeaturesWithCTAs, TrustBuilder, SocialProof, Capabilities, CaseStudies, Testimonials, Logos, Team (exclude Blog Feature if present)
- Implement robust TypeScript types for response + section discriminators (e.g. union on section.type)

Deliverables & Order of Execution:
1. Generate core config files:
   - tsconfig.json (strict, path aliases e.g. @/components, @/lib, etc.)
   - tailwind.config.js (extend theme to match template colors, spacing scale, fonts)
   - postcss.config.js (standard Tailwind stack)
   - next.config.js (experimental/server features if needed)
2. Directory structure (propose, then implement):
   app/
     (layout.tsx, globals.css, route groups if helpful)
     page.tsx (Home)
     about/page.tsx
     services/page.tsx
     contact/page.tsx
   components/
     sections/<SectionName>.tsx
     ui/<shared atoms & shadcn wrappers>
   types/
3. Root layout:
   - Import Tailwind
   - Set HTML lang, metadata (dynamic via a helper)
   - Provide font imports (if using Google Fonts via next/font)
4. Content fetching:
   - Single server utility: getEntry(entryId: string)
     - Adds required headers
     - Graceful errors (throw typed or return fallback)
     - Caching: use fetch with proper revalidation strategy (stale-while-revalidate if appropriate)
   - Page-level server components call getEntry and map sections to React components through a registry
5. Section rendering:
   - Implement a registry: const sectionRenderers: Record<string, (data)=>JSX.Element>
   - Each section component is pure, server-first (client only if interactive)
   - Tailwind classes reflect spacing & responsive breakpoints from template
6. SEO & Performance:
   - Add dynamic metadata export per route using fetched title
   - Implement canonical URLs
   - Add structured data JSON-LD (Company / Organization) on Home + About
   - Optimize images (use next/image placeholders)
   - Ensure proper heading hierarchy (one h1 per page)
7. Accessibility:
   - ARIA only where semantic HTML insufficient
   - Keyboard nav works across interactive components
8. Example interactive client component (e.g., contact form or demo form) using a Server Action (form submission -> server handler -> optimistic UI or success state)
9. State management:
   - Only introduce React Context if genuinely needed (e.g., global theme or layout state)
10. Testing approach (outline only if not implementing): utility function tests for mapping, data typing guards
11. Provide final code output in logical, incremental order with minimal inline commentary (concise doc-blocks allowed)

Constraints & Quality:
- Use Server Components by default; only mark "use client" where interactivity is required
- No any types; leverage discriminated unions for sections
- Prefer composition over prop drilling
- Consistent naming, PascalCase for components, camelCase for functions
- Avoid over-abstraction; ship pragmatic, readable code
- Keep bundle lean: no unnecessary libraries

What to Output First:
1. High-level plan (bullet list)
2. Proposed directory tree
3. Config files
4. Type definitions + fetch wrapper
5. Section registry + one implemented section as pattern
6. Then remaining sections & pages

If ambiguities arise (e.g., unknown exact JSON structure per section), propose an inferred schema and proceed.

At the end, summarize:
- Implemented sections
- Gaps (if any)
- Recommended next steps

Ask clarifying questions only if something blocks progress; otherwise assume reasonable defaults and proceed.

Begin now by restating the plan and generating config + structure.
