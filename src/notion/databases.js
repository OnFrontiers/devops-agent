import { notion } from "./client.js";

/**
 * Create a new page in a Notion database
 * @param {Object} params - Parameters object
 * @param {string} params.databaseId - The ID of the Notion database
 * @param {string} params.title - The title for the page
 * @param {Object} [params.properties={}] - Additional properties for the page
 * @returns {Promise<Object>} - The created page response from Notion API
 */
export async function createPageInDatabase({ databaseId, title, properties = {} }) {
  if (!databaseId) {
    throw new Error("databaseId is required");
  }
  if (!title) {
    throw new Error("title is required");
  }

  return notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      Name: { title: [{ text: { content: title } }] },
      ...properties
    }
  });
}

/**
 * Update an existing page in Notion
 * @param {string} pageId - The ID of the page to update
 * @param {Object} properties - Properties to update on the page
 * @returns {Promise<Object>} - The updated page response from Notion API
 */
export async function updatePage(pageId, properties) {
  if (!pageId) {
    throw new Error("pageId is required");
  }

  return notion.pages.update({
    page_id: pageId,
    properties
  });
}

/**
 * Query a Notion database with optional filters and sorts
 * @param {string} databaseId - The ID of the database to query
 * @param {Object} [query={}] - Query parameters (filters, sorts, etc.)
 * @returns {Promise<Object>} - The query response from Notion API
 */
export async function queryDatabase(databaseId, query = {}) {
  if (!databaseId) {
    throw new Error("databaseId is required");
  }

  return notion.databases.query({
    database_id: databaseId,
    ...query
  });
}

/**
 * Get a page by its ID
 * @param {string} pageId - The ID of the page to retrieve
 * @returns {Promise<Object>} - The page response from Notion API
 */
export async function getPage(pageId) {
  if (!pageId) {
    throw new Error("pageId is required");
  }

  return notion.pages.retrieve({
    page_id: pageId
  });
}
