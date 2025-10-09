import { getPageBySlug, getEntry } from './src/lib/contentstack.ts';

const page = await getPageBySlug('/', { cache: 0 });
const sections = page?.sections || [];

// Find the testimonial_list section
const testimonialSection = sections.find(s => s.section?._content_type_uid === 'testimonial_list');
if (testimonialSection) {
  const uid = testimonialSection.section.uid;
  console.log('=== TESTIMONIAL SECTION ===');
  console.log('UID:', uid);
  
  const entry = await getEntry('testimonial_list', uid, { cache: 0 });
  console.log('Keys:', Object.keys(entry || {}));
  console.log('Has content:', !!entry?.content);
  console.log('Content length:', entry?.content?.length);
  console.log('Full entry:', JSON.stringify(entry, null, 2));
}
