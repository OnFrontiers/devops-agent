import 'dotenv/config';
import { updateScreeningBoardDatabase, updateSampleItem } from '../databases/updateScreeningBoard.js';

async function updateDatabase() {
  const databaseId = "2b15e061-c553-81cc-a2a5-fcd93916573b"; // User's existing database
  // Note: sample item is already created in the database, we'll update it

  console.log('🚀 Updating Jira Screening Board Database...\n');

  try {
    // 1. Update the database to add new properties
    console.log('Step 1: Adding Type, Jira Link, and Stakeholder properties...');
    const database = await updateScreeningBoardDatabase(databaseId);

    console.log('\n--- Updated Database Properties ---');
    Object.entries(database.properties).forEach(([key, value]) => {
      console.log(`${key}: ${value.type}`);
      if (value.type === 'select' && value.select.options) {
        value.select.options.forEach((option, index) => {
          console.log(`  ${index + 1}. ${option.name} (${option.color})`);
        });
      }
    });

    // 2. Query database for existing items and update one of them
    console.log('\nStep 2: Finding and updating an existing item...');

    // Query for items in the database
    const queryResponse = await notion.databases.query({
      database_id: databaseId,
      page_size: 10, // Get first 10 items
    });

    if (queryResponse.results.length === 0) {
      console.log('No existing items found. You can manually edit properties in Notion UI.');
      return { database };
    }

    const itemId = queryResponse.results[0].id; // Update the first item
    console.log(`Updating item: ${queryResponse.results[0].properties.Name?.title[0]?.plain_text || 'Untitled'}`);

    const sampleItem = await updateSampleItem(itemId, queryResponse.results[0]);

    console.log('\n=== UPDATE COMPLETE ===');
    console.log('📋 Database URL:', database.url);
    console.log('📋 Database ID:', databaseId);
    console.log('📋 Sample Item URL: Check the database - properties updated');
    console.log(`🔧 New properties added:`);
    console.log(`   • Type: Story/Bug/Epic select dropdown`);
    console.log(`   • Jira Link: URL field for Jira ticket links`);
    console.log(`   • Stakeholder: People field for assigning users`);
    console.log(`\nNote: Stakeholder field is empty - assign users in Notion.`);

    return {
      database,
      sampleItem
    };

  } catch (error) {
    console.error('❌ Update failed:', error.message);
    throw error;
  }
}

// Run the update
updateDatabase().catch(console.error);
