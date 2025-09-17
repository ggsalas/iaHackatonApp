# MemoriPilot: System Architect

## Overview
This file contains the architectural decisions and design patterns for the MemoriPilot project.

## Architectural Decisions

- Use Next.js App Router architecture with Server Components by default
- Implement a section-based component registry to map Contentstack data to React components
- Create a centralized server-side data fetching utility for Contentstack
- Use TypeScript's discriminated unions for type-safe content section handling
- Implement TailwindCSS for styling with a custom theme extending the default configuration
- Store environment variables for CMS access in .env.local
- Use next/font for optimized font loading
- Server Actions for form handling on the contact page



1. **Decision 1**: Description of the decision and its rationale.
2. **Decision 2**: Description of the decision and its rationale.
3. **Decision 3**: Description of the decision and its rationale.



## Design Considerations

- Performance optimization through Server Components and proper image optimization
- SEO best practices with dynamic metadata and proper heading hierarchy
- Accessibility compliance with semantic HTML and ARIA attributes where needed
- Type safety throughout the application with no any types
- Content structure might require adaptation based on the actual Contentstack data



## Components

### Layout Components

Base layout components including RootLayout, Header, Footer, and navigation elements

**Responsibilities:**

- Provide consistent structure across all pages
- Handle responsive navigation
- Implement metadata and SEO elements

### Section Components

Components that render specific content sections based on Contentstack data

**Responsibilities:**

- Render section-specific content with appropriate styling
- Handle responsive layouts for different screen sizes
- Implement appropriate semantic structure

### UI Components

Reusable UI elements like buttons, cards, and form elements

**Responsibilities:**

- Provide consistent styling across the application
- Handle interactive elements with proper accessibility
- Integrate with shadcn/ui where appropriate

### Content Utilities

Utilities for fetching and processing content from Contentstack

**Responsibilities:**

- Handle API requests with proper error handling and caching
- Transform API responses into TypeScript-typed objects
- Provide a consistent interface for all content fetching

### Server Actions

Functions for handling form submissions and other server-side interactions

**Responsibilities:**

- Process form data securely
- Validate user input
- Provide feedback to the user



