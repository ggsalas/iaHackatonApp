// Auto-generated initial mapping of Contentstack _content_type_uid values
// to internal React component identifiers. Adjust component names as actual
// implementations are added under src/components/sections.

export type SectionComponentId =
  | 'Features'
  | 'TrustBuilder'
  | 'Testimonials'
  | 'Brands'
  | 'People'
  | 'BlogPosts'
  | 'GenericContent';

// Raw discovered UIDs from initial scan:
// - general_content
// - presentation_blueprint (acts as a wrapper / blueprint, not rendered directly)
// - general_content_list
// - trust_builder
// - testimonial_list
// - brand_list
// - person_list
// - blog_post_list

// We exclude presentation_blueprint from direct rendering; it likely defines layout metadata.

export const contentTypeToComponent: Record<string, SectionComponentId> = {
  // Single / generic content blocks
  general_content: 'GenericContent',
  general_content_list: 'Features', // assumption: list with CTAs styled as features

  // Specialized sections
  trust_builder: 'TrustBuilder',
  testimonial_list: 'Testimonials',
  brand_list: 'Brands',
  person_list: 'People',
  blog_post_list: 'BlogPosts',
};

// Content types intentionally ignored for direct render
export const ignorableContentTypes: string[] = ['presentation_blueprint'];

export function mapContentType(uid: string): SectionComponentId | null {
  if (ignorableContentTypes.includes(uid)) return null;
  return contentTypeToComponent[uid] ?? 'GenericContent';
}
