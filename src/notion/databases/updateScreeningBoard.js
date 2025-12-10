import { notion } from "../client.js";

/**
 * Update the Jira Screening Board database to add Type, Jira Link, and Stakeholder properties
 * @param {string} databaseId - The ID of the database to update
 * @returns {Promise<Object>} - The updated database response from Notion API
 */
export async function updateScreeningBoardDatabase(databaseId) {
  if (!databaseId) {
    throw new Error("databaseId is required");
  }

  console.log(`🔄 Updating database ${databaseId}...`);

  try {
    // First get the current database to see existing properties
    const current = await notion.databases.retrieve({ database_id: databaseId });
    console.log('Current properties:', Object.keys(current.properties));

    const response = await notion.databases.update({
      database_id: databaseId,
      properties: {
        ...current.properties, // Keep existing properties
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

    console.log(`✅ Database updated: ${response.id}`);
    console.log(`📎 Url: ${response.url}`);

    return response;

  } catch (error) {
    console.error('❌ Failed to update database:', error.message);
    throw error;
  }
}

/**
 * Update an item to include the new properties (Type, Jira Link)
 * @param {string} itemId - The ID of the item to update
 * @param {Object} itemData - The current item data (optional)
 * @returns {Promise<Object>} - The updated page response from Notion API
 */
export async function updateSampleItem(itemId, itemData = null) {
  if (!itemId) {
    throw new Error("itemId is required");
  }

  console.log(`🔄 Updating item ${itemId} with new properties...`);

  try {
    // Get current properties from itemData or retrieve
    if (!itemData) {
      const retrieved = await notion.pages.retrieve({ page_id: itemId });
      itemData = retrieved;
    }

    const currentTitle = itemData.properties?.Name?.title?.[0]?.plain_text || itemData.properties?.Name?.title?.[0]?.text?.content || 'Untitled';
    const hasType = 'Type' in (itemData.properties || {});
    const hasJiraLink = 'Jira Link' in (itemData.properties || {});

    if (hasType && hasJiraLink) {
      console.log('Item already has Type and Jira Link properties.');
      return itemData;
    }

    const updateData = {
      page_id: itemId,
      properties: {},
    };

    // Only add properties that don't exist
    if (!hasType) {
      updateData.properties.Type = {
        select: {
          name: "Story", // Default to Story
        },
      };
    }

    if (!hasJiraLink) {
      updateData.properties["Jira Link"] = {
        url: "https://onfrontiers.atlassian.net/browse/DEV-12345", // Placeholder URL
      };
    }

    const response = await notion.pages.update(updateData);

    console.log(`✅ Item updated: "${currentTitle}" - added ${Object.keys(updateData.properties).join(', ')} properties`);
    return response;

  } catch (error) {
    console.error('❌ Failed to update item:', error.message);
    throw error;
  }
}
