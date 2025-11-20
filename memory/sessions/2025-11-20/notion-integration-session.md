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

## Next Steps (Optional)

- Add thin Node helpers for pages/blocks (search, getPage, listBlocks, appendBlocks, createPageUnder) that use NOTION_API_KEY and optional NOTION_PARENT_PAGE_ID.
- Add a simple example script to create a page under the Teamspace Home and append content.
