# AGENTS.md - Development Guidelines

## Build/Test Commands
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run test suite
- `npm run test -- --testNamePattern="TestName"` - Run single test

## Project Tech Stack
Next.js 15 (App Router, Server Components), React, TypeScript (strict), TailwindCSS, shadcn/ui

## Code Style Guidelines
- **TypeScript**: Strict mode, no `any` types, use discriminated unions for sections
- **Components**: PascalCase, prefer Server Components, mark "use client" only when needed
- **Functions**: camelCase naming
- **Imports**: Use path aliases (`@/components`, `@/lib`)
- **Composition**: Prefer over prop drilling, avoid over-abstraction
- **Server Actions**: Use for form submissions with optimistic UI

## Environment Variables
Set in `.env.local`: CONTENTSTACK_STACK_API_KEY, CONTENTSTACK_DELIVERY_TOKEN, CONTENTSTACK_API_HOST, CONTENTSTACK_APP_HOST, CONTENTSTACK_ENVIRONMENT, CONTENTSTACK_BRANCH

## Error Handling
- Graceful errors in fetch utilities (throw typed or return fallback)
- Use proper TypeScript error types

## Performance & SEO
- Server-side fetching with caching (stale-while-revalidate)
- Dynamic metadata exports, canonical URLs, structured data JSON-LD
- Optimize images with next/image, proper heading hierarchy (one h1 per page)
