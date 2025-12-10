import { notion } from "../client.js";

/**
 * Create a Notion database for Jira Screening Board items
 * @param {string} parentPageId - The ID of the parent page to create the database under
 * @returns {Promise<Object>} - The created database response from Notion API
 */
export async function createScreeningBoardDatabase(parentPageId) {
  if (!parentPageId) {
    throw new Error("parentPageId is required");
  }

  console.log(`🔄 Creating database under page ${parentPageId}...`);

  try {
    const response = await notion.databases.create({
      parent: {
        type: "page_id",
        page_id: parentPageId,
      },
      title: [
        {
          type: "text",
          text: {
            content: "Jira Screening Board Items",
          },
        },
      ],
      properties: {
        Name: {
          title: {},
        },
        Status: {
          select: {
            options: [
              {
                name: "Ready for Jira",
                color: "green",
              },
              {
                name: "Reviewed",
                color: "blue",
              },
              {
                name: "Not reviewed",
                color: "yellow",
              },
              {
                name: "Icebox",
                color: "gray",
              },
            ],
          },
        },
        Type: {
          select: {
            options: [
              {
                name: "Story",
                color: "blue",
              },
              {
                name: "Bug",
                color: "red",
              },
              {
                name: "Epic",
                color: "yellow",
              },
            ],
          },
        },
        "Jira Link": {
          url: {},
        },
        Stakeholder: {
          people: {},
        },
      },
    });

    console.log(`✅ Database created: ${response.id}`);
    console.log(`📎 Url: ${response.url}`);

    return response;

  } catch (error) {
    console.error('❌ Failed to create database:', error.message);
    throw error;
  }
}
