import 'dotenv/config';
import { createScreeningBoardDatabase } from '../databases/createScreeningBoard.js';
import { notion } from '../client.js';

async function setupCompleteScreeningBoard(parentPageId) {
  console.log('🚀 Setting up Complete Jira Screening Board...\n');

  try {
    // 1. Create the database with all properties
    console.log('Step 1: Creating database with all properties...');
    const database = await createScreeningBoardDatabase(parentPageId);
    const databaseId = database.id;

    console.log('\n--- All Database Properties ---');
    Object.entries(database.properties).forEach(([key, value]) => {
      console.log(`${key}: ${value.type}`);
      if (value.type === 'select' && value.select.options) {
        value.select.options.forEach((option, index) => {
          console.log(`  ${index + 1}. ${option.name} (${option.color})`);
        });
      }
    });

    // 2. Create comprehensive sample item
    console.log('\nStep 2: Creating sample item with all properties...');
    const sampleTitle = "Create a script to add AI defined tiers to 17k experts.";
    const sampleStatus = "Not reviewed";
    const sampleType = "Story";
    const sampleJiraLink = "https://onfrontiers.atlassian.net/browse/DEV-12345";

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
        Type: {
          select: {
            name: sampleType,
          },
        },
        "Jira Link": {
          url: sampleJiraLink,
        },
        // Stakeholder left empty - can be set later
      },
    });

    console.log(`✅ Sample item created: "${sampleTitle}"`);
    console.log(`📎 Item URL: Check the database`);

    // Output final instructions
    console.log('\n=== SETUP COMPLETE ===');
    console.log('📋 Database URL:', database.url);
    console.log('📋 Database ID:', databaseId);
    console.log(`🔧 Next steps in Notion UI:`);
    console.log(`   1. Open: ${database.url}`);
    console.log(`   2. Click Database settings → Board view (grouped by Status)`);
    console.log(`   3. Assign stakeholders and update properties as needed`);
    console.log(`   4. Add more items or integrate with automation`);

    return {
      database,
      sampleItem: sampleResponse
    };

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    throw error;
  }
}

// CLI usage
const parentPageId = process.argv[2];
if (!parentPageId) {
  console.error('❌ Usage: node setupScreeningBoardComplete.js <parent-page-id>');
  console.log('   Example: node setupScreeningBoardComplete.js "2b15e061-c553-8047-88e9-d1844ad3e3d2"');
  process.exit(1);
}

setupCompleteScreeningBoard(parentPageId).catch(console.error);
