import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env.local') });

import { contentstackFetch } from './src/lib/contentstack.ts';

async function checkHeaderFooter() {
  const result = await contentstackFetch('/content_types', {
    query: { include_global_field_schema: true }
  });
  
  const contentTypes = result.content_types || [];
  const relevant = contentTypes.filter(ct => 
    ct.uid.includes('header') || 
    ct.uid.includes('footer') || 
    ct.uid.includes('navigation') ||
    ct.uid.includes('menu')
  );
  
  console.log('Header/Footer related content types:');
  relevant.forEach(ct => {
    console.log(`- ${ct.uid}: ${ct.title}`);
  });
  
  if (relevant.length === 0) {
    console.log('\nNo header/footer content types found. All content types:');
    contentTypes.forEach(ct => console.log(`- ${ct.uid}`));
  }
}

checkHeaderFooter();
