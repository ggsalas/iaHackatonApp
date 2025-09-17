# Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2025-09-17 | Use a Next.js App Router architecture with Server Components as the default | Server Components provide better performance by rendering on the server, reducing client-side JavaScript, and they work well with the content-focused nature of this marketing site. The App Router also provides benefits like nested layouts and improved routing capabilities. |
| 2025-09-17 | Implement a centralized server-side data fetching utility for Contentstack | A single utility function for fetching content will provide consistent error handling, caching strategies, and type safety across the application. This approach prevents code duplication and ensures all content fetching follows the same patterns. |
| 2025-09-17 | Use TypeScript discriminated unions for section typing | Discriminated unions provide type safety when handling different section types from Contentstack. By using a 'type' field as the discriminator, TypeScript can narrow down the type of a section based on its type, ensuring we only access properties that exist on that specific section type. |
| 2025-09-17 | Project directory structure | The project will follow a structured organization that separates concerns and follows Next.js App Router conventions:
- `/app` contains all routes and page components using the App Router
- `/components` houses reusable components organized by purpose
- `/lib` contains utility functions and service integrations
- `/types` centralizes TypeScript type definitions
- `/public` stores static assets
This structure promotes maintainability and follows the principles of separation of concerns. |
| 2025-09-17 | Project initialization and dependency management approach | We'll use create-next-app to bootstrap the project with TypeScript and App Router support already configured. TailwindCSS, PostCSS, and autoprefixer will be installed as development dependencies. For UI components, we'll start with basic TailwindCSS utilities and only add shadcn/ui components as needed for more complex UI elements, keeping the bundle size lean. Dependencies will be installed using npm for better compatibility and error reporting. |
