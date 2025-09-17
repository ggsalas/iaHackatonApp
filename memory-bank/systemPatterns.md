# System Patterns

## Architectural Patterns

- Pattern 1: Description

## Design Patterns

- Pattern 1: Description

## Common Idioms

- Idiom 1: Description

## Section Component Registry Pattern

A pattern for rendering dynamic content sections from a CMS. Each section type from Contentstack will map to a specific React component through a registry object. The component receives the section data as props and renders accordingly. This allows for a clean separation of concerns and makes adding new section types straightforward.

### Examples

- const sectionRegistry = {
  hero: HeroSection,
  featuresWithCTAs: FeaturesWithCTAsSection,
  // other section types
};

// Usage
function renderSection(section) {
  const SectionComponent = sectionRegistry[section.type];
  if (!SectionComponent) return null;
  return <SectionComponent {...section} />;
}
