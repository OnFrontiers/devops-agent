import 'dotenv/config';
import { updatePageTitle } from '../pages/updatePageTitle.js';

async function demoUpdatePageTitle() {
  const pageId = process.argv[2];
  const newTitle = process.argv[3];

  if (!pageId) {
    console.error('❌ Usage: node updatePageTitle.js <page-id> "<new-title>"');
    console.log('   Example: node updatePageTitle.js "2b15e061-c553-8047-88e9-d1844ad3e3d2" "My New Page Title"');
    process.exit(1);
  }

  if (!newTitle) {
    console.error('❌ New title is required');
    process.exit(1);
  }

  try {
    console.log(`🔄 Updating page ${pageId} title to: "${newTitle}"`);

    const result = await updatePageTitle(pageId, newTitle);

    console.log(`✅ Success! Page URL: ${result.url}`);
    console.log(`📎 Page ID: ${result.id}`);

  } catch (error) {
    if (error.code === 'object_not_found') {
      console.error('❌ Page not found. Make sure the integration has access to this page.');
    } else {
      console.error('❌ Error:', error.message);
    }
    process.exit(1);
  }
}

demoUpdatePageTitle();
