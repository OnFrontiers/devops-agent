import 'dotenv/config';
import { createScreeningBoardDatabase } from '../databases/createScreeningBoard.js';
import { notion } from '../client.js';

async function setupScreeningBoard(parentPageId) {
  console.log('🚀 Setting up Jira Screening Board...\n');

  try {
    // 1. Create the database
    console.log('Step 1: Creating database...');
    const database = await createScreeningBoardDatabase(parentPageId);
    const databaseId = database.id;

    console.log('\n--- Database Properties ---');
    Object.entries(database.properties).forEach(([key, value]) => {
      console.log(`${key}: ${value.type}`);
      if (value.type === 'select' && value.select.options) {
        value.select.options.forEach((option, index) => {
          console.log(`  ${index + 1}. ${option.name} (${option.color})`);
        });
      }
    });

    // 2. Create sample item in database
    console.log('\nStep 2: Creating sample item in "Not reviewed" status...');
    const sampleTitle = "Create a script to add AI defined tiers to 17k experts.";
    const sampleStatus = "Not reviewed"; // Matches one of our select options

    const sampleResponse = await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: databaseId,
      },
      properties: {
        Name: {
          title: [
            {
              type: "text",
              text: {
                content: sampleTitle,
              },
            },
          ],
        },
        Status: {
          select: {
            name: sampleStatus,
          },
        },
      },
    });

    console.log(`✅ Sample item created: "${sampleTitle}"`);
    console.log(`📎 Item URL: ${sampleResponse.url}`);
    console.log(`📎 Item ID: ${sampleResponse.id}`);

    // Output final instructions
    console.log('\n=== SETUP COMPLETE ===');
    console.log('📋 Database URL:', database.url);
    console.log('📋 Database ID:', databaseId);
    console.log(`🔧 In Notion UI:`);
    console.log(`   1. Open the database at: ${database.url}`);
    console.log(`   2. Add a "Board" view (grouped by Status) in one click`);
    console.log(`   3. Move items between columns: "Ready for Jira" → "Reviewed" → etc.`);

    return {
      database,
      sampleItem: sampleResponse
    };

  } catch (error) {
    console.error('❌ Setup failed:', error.message);

    if (error.code === 'object_not_found') {
      console.error('\nHint: Make sure the parent page is shared with your integration.');
    } else if (error.code === 'forbidden') {
      console.error('\nHint: Your integration may not have write access to this page.');
    }

    throw error;
  }
}

// CLI usage
const parentPageId = process.argv[2];
if (!parentPageId) {
  console.error('❌ Usage: node setupScreeningBoard.js <parent-page-id>');
  console.log('   Example: node setupScreeningBoard.js "2b15e061-c553-8047-88e9-d1844ad3e3d2"');
  process.exit(1);
}

setupScreeningBoard(parentPageId).catch(console.error);
