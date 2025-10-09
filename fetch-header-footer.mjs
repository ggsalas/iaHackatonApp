import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env.local') });

const apiKey = process.env.CONTENTSTACK_API_KEY;
const token = process.env.CONTENTSTACK_DELIVERY_TOKEN;
const env = process.env.CONTENTSTACK_ENVIRONMENT;

const url = `https://cdn.contentstack.io/v3/content_types/global_header_and_footer/entries?environment=${env}`;
const res = await fetch(url, {
  headers: {
    'api_key': apiKey,
    'access_token': token,
  }
});

const data = await res.json();
console.log('Global Header and Footer entries:');
console.log(JSON.stringify(data, null, 2));
