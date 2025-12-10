# Notion Integration Session

- Date: 2025-11-20
- Participants: enio, devops-agent
- Repository: onfrontiers/devops-agent

## Summary

- Minimal auth: ONLY NOTION_API_KEY is required for the integration.
- Access scopes are defined entirely in the Notion integration UI (teamspaces/pages). We are NOT forcing database usage.
- Verified read/write access to the Teamspace Home page via Notion API with curl.

## Decisions

- Keep env minimal:
  - Required: NOTION_API_KEY
  - Optional convenience: NOTION_PARENT_PAGE_ID for a default parent (e.g., Teamspace Home page ID)
- Do not require NOTION_ORGANIZATION or INTEGRATION_NAME in code.
- Database workflows remain optional and can be added later.

## Verification Commands (working)

Replace the token with your integration secret and use the page ID you want to test.

```bash
export NOTION_API_KEY="ntn_xxx"
```

- Read page metadata:
```bash
curl -sS \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2022-06-28" \
  https://api.notion.com/v1/pages/d61c8553-007d-4489-a7c3-f1d7af090e05
```

- Read page blocks (content):
```bash
curl -sS \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2022-06-28" \
  "https://api.notion.com/v1/blocks/d61c8553-007d-4489-a7c3-f1d7af090e05/children?page_size=10"
```

- Write test (create a child page under the Teamspace Home):
```bash
curl -sS -X POST \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  https://api.notion.com/v1/pages \
  -d '{
    "parent": { "page_id": "d61c8553-007d-4489-a7c3-f1d7af090e05" },
    "properties": {
      "title": [{ "text": { "content": "DevOps Agent Access Test" } }]
    },
    "children": [
      { "object": "block", "type": "paragraph", "paragraph": {
          "rich_text": [{ "type": "text", "text": { "content": "Hello from the API." } }]
      }}
    ]
  }'
```

Expected:
- 200 OK (GETs) and 200/201 on POST indicates proper read/write scope.

## How Scopes Are Set

- Scopes are managed at https://www.notion.so/profile/integrations on the integration’s page:
  - Select which teamspaces/pages the integration can access.
  - Alternatively, Share the Teamspace “Home” page with the integration and, if available, enable “also share with subpages” to cascade.

## Testing Results

Curl commands work perfectly:
- ✅ Page creation: Created child page under Home
- ✅ Page rename: Updated title from "test" → "Jira Screening Board" → "Jira Screening Board - Final" — all successful

Node.js SDK integration completed:
- ✅ @notionhq/client@2.3.0 installed
- ✅ Page title update function created (src/notion/pages/updatePageTitle.js)
- ✅ Demo script (src/notion/examples/updatePageTitle.js) tested and working
- ✅ Integration can read/write/update pages across accessible teamspaces

## Database Creation Results (Nov 20, 2025)

✅ **Jira Screening Board Database Created**
- Database ID: `2b15e061-c553-81cc-a2a5-fcd93916573b`
- URL: https://www.notion.so/2b15e061c55381cca2a5fcd93916573b
- Parent Page: Jira Screening Board (2b15e061-c553-8047-88e9-d1844ad3e3d2)

**Properties Created:**
- Name: title (required)
- Status: select (with exact order requested)
  1. Ready for Jira (green)
  2. Reviewed (blue)
  3. Not reviewed (yellow)
  4. Icebox (gray)

**Sample Item Added:**
- Title: "Create a script to add AI defined tiers to 17k experts."
- Status: "Not reviewed"
- URL: https://www.notion.so/Create-a-script-to-add-AI-defined-tiers-to-17k-experts-2b15e061c553813a8699c4664d957fcb

**Additional Properties Added Manually:**
- Type: Select field with options Story/Bug/Epic
- Jira Link: URL field for ticket links
- Stakeholder: People field for user assignments

**Next Manual Step:**
In Notion UI, add a "Board" view to the database - it's one click, groups automatically by Status.

## Ready for Production

The Notion integration is fully ready for devops workflows:
- Minimal auth: ONLY NOTION_API_KEY required
- Scope: Whatever pages/teamspaces are shared with "enio-devops-agent" integration
- Operations: Page CRUD, database queries, content updates across thousands of docs
