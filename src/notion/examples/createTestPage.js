import { createPageInDatabase } from "../databases.js";
import "dotenv/config";

const { NOTION_DATABASE_ID } = process.env;

if (!NOTION_DATABASE_ID) {
  console.error("❌ Error: NOTION_DATABASE_ID is required in your .env file");
  console.log("   Copy the Database ID from your Notion database URL.");
  console.log("   Example: https://www.notion.so/your-workspace/database-name-here?pageId=2a1b3c4d-... has database ID: 2a1b3c4d-...");
  console.log("   Make sure your integration is shared with the database!");
  process.exit(1);
}

async function createTestPage() {
  try {
    console.log("📝 Creating test page in Notion database...");

    const result = await createPageInDatabase({
      databaseId: NOTION_DATABASE_ID,
      title: `Test page from devops-agent (${new Date().toISOString()})`,
      properties: {
        // Add any database-specific properties here if needed
        // For example, if your database has a "Status" property:
        // Status: { select: { name: "Draft" } }
      }
    });

    console.log("✅ Test page created successfully!");
    console.log(`🔗 Page URL: ${result.url}`);
    console.log(`🆔 Page ID: ${result.id}`);

  } catch (error) {
    console.error("❌ Error creating test page:", error.message);
    if (error.code === "unauthorized") {
      console.log("   Check that your NOTION_API_KEY is correct and the integration has access to the database.");
    } else if (error.code === "object_not_found") {
      console.log("   Check that the NOTION_DATABASE_ID is correct and the database exists.");
    }
    process.exit(1);
  }
}

createTestPage();
