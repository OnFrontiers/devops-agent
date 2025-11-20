import { Client } from "@notionhq/client";

const { NOTION_API_KEY } = process.env;

if (!NOTION_API_KEY) {
  throw new Error("NOTION_API_KEY is required. Please set it in your .env file.");
}

// Initialize and export the Notion client
export const notion = new Client({
  auth: NOTION_API_KEY,
});

console.log("✅ Notion client initialized successfully");
