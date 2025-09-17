# Product Context

Describe the product.

## Overview

Provide a high-level overview of the project.

## Core Features

- Feature 1
- Feature 2

## Technical Stack

- Tech 1
- Tech 2

## Project Description

A marketing website for Techwix, a technology company, built with Next.js 15, React, TypeScript, and TailwindCSS. The website pulls content from Contentstack CMS and follows the visual design of provided reference templates.



A marketing website for Techwix, a technology company, built with Next.js 15, React, TypeScript, and TailwindCSS. The website pulls content from Contentstack CMS and follows the visual design of provided reference templates.



A corporate marketing website for the brand "Techwix" with the tagline "We transform ideas into technology". The site will feature pages for Home, About, Services, and Contact, with content dynamically pulled from a Contentstack CMS.



## Architecture

The website follows the Next.js App Router architecture with a focus on server-side rendering via Server Components. Content is fetched server-side from Contentstack and rendered through a section-based component registry system. Pages are constructed by mapping section data to the appropriate React components. Forms utilize Server Actions for backend processing.



The website follows the Next.js App Router architecture with a focus on server-side rendering via Server Components. Content is fetched server-side from Contentstack and rendered through a section-based component registry system. Pages are constructed by mapping section data to the appropriate React components. Forms utilize Server Actions for backend processing.



The project uses a modern web architecture based on Next.js 15 with the App Router. Key characteristics include:
- **Server-First Rendering:** Components are React Server Components by default, fetching data and rendering on the server to improve performance and SEO.
- **Client-Side Interactivity:** Client Components are used sparingly, only for interactive UI elements like forms, using the "use client" directive.
- **Headless CMS:** Content is managed in Contentstack and fetched at build or request time via a server-side utility. This decouples the content from the presentation layer.
- **Component-Based Design:** The UI is broken down into reusable components, particularly for different content sections (e.g., Hero, Features), which are dynamically rendered based on API data.
- **Server Actions:** Used for handling form submissions and other mutations securely on the server without needing to create separate API routes.



## Technologies

- Next.js 15 (App Router)
- React
- TypeScript (strict mode)
- TailwindCSS
- shadcn/ui (as needed)
- Contentstack CMS
- Server Components
- Server Actions



- Next.js 15 (App Router)
- React
- TypeScript (strict mode)
- TailwindCSS
- shadcn/ui (as needed)
- Contentstack CMS
- Server Components
- Server Actions



- Next.js 15 (App Router)
- React (Server Components)
- TypeScript (Strict Mode)
- TailwindCSS
- Contentstack (Headless CMS)
- Vercel (intended deployment platform)



## Libraries and Dependencies

- next
- react
- react-dom
- typescript
- tailwindcss
- postcss
- autoprefixer
- shadcn/ui components (as needed)



- next
- react
- react-dom
- typescript
- tailwindcss
- postcss
- autoprefixer
- shadcn/ui components (as needed)
- contentstack SDK (if needed, otherwise native fetch)



- next@15
- react@latest
- react-dom@latest
- tailwindcss
- shadcn/ui (optional)

