import { notion } from "../client.js";

/**
 * Update the title of a Notion page
 * @param {string} pageId - The ID of the page to update
 * @param {string} newTitle - The new title for the page
 * @returns {Promise<Object>} - The updated page response from Notion API
 */
export async function updatePageTitle(pageId, newTitle) {
  if (!pageId) {
    throw new Error("pageId is required");
  }
  if (!newTitle) {
    throw new Error("newTitle is required");
  }

  try {
    // First get the page to determine the correct title property key
    const pageResponse = await notion.pages.retrieve({ page_id: pageId });
    const properties = pageResponse.properties;

    // Find the title property (it might be "title" or "Name" for database items)
    const titlePropertyKey = Object.keys(properties).find(
      key => properties[key].type === 'title'
    ) || 'title'; // fallback to 'title'

    const updateResponse = await notion.pages.update({
      page_id: pageId,
      properties: {
        [titlePropertyKey]: {
          title: [
            {
              type: 'text',
              text: { content: newTitle }
            }
          ]
        }
      }
    });

    console.log(`✅ Page title updated: "${newTitle}"`);
    return updateResponse;

  } catch (error) {
    console.error('❌ Failed to update page title:', error.message);
    throw error;
  }
}
