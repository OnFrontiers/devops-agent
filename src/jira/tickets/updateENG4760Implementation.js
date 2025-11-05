import JiraClient from '../core/jiraClient.js';

async function updateENG4760Implementation() {
  const jira = new JiraClient();

  try {
    // Fetch ENG-4760
    console.log('Fetching ENG-4760...');
    const issue = await jira.getIssue('ENG-4760');

    console.log('\n=== ENG-4760 Details ===');
    console.log('Summary:', issue.fields.summary);
    console.log('Status:', issue.fields.status.name);

    // Updated description with implementation details
    const updatedDescription = {
      type: "doc",
      version: 1,
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Background", marks: [{ type: "strong" }] }
          ]
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Enable quick ER lookup and detail view in OpsHub ER Funnel" }]
                }
              ]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Acceptance Criteria", marks: [{ type: "strong" }] }
          ]
        },
        {
          type: "orderedList",
          attrs: { order: 1 },
          content: [
            {
              type: "listItem",
              content: [
                { type: "paragraph", content: [{ type: "text", text: "Search ERs by ID" }] }
              ]
            },
            {
              type: "listItem",
              content: [
                { type: "paragraph", content: [{ type: "text", text: "Display search results in overlay with selection" }] }
              ]
            },
            {
              type: "listItem",
              content: [
                { type: "paragraph", content: [{ type: "text", text: "Show detailed ER view with enriched data (team, CRM, metadata)" }] }
              ]
            },
            {
              type: "listItem",
              content: [
                { type: "paragraph", content: [{ type: "text", text: "Integrate search into ER Funnel dashboard" }] }
              ]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Implementation", marks: [{ type: "strong" }] }
          ]
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                { type: "paragraph", content: [{ type: "text", text: "Backend: GET /api/cache/expert-requests/search and /by-id/:id endpoints" }] }
              ]
            },
            {
              type: "listItem",
              content: [
                { type: "paragraph", content: [{ type: "text", text: "Frontend: SearchBarERFunnel, SearchResultsOverlay, ERDetailView, ERInlineDetail components" }] }
              ]
            },
            {
              type: "listItem",
              content: [
                { type: "paragraph", content: [{ type: "text", text: "Infrastructure: EventBridge automation for closed ER sync (15min)" }] }
              ]
            },
            {
              type: "listItem",
              content: [
                { type: "paragraph", content: [{ type: "text", text: "9 files changed, 1,078 insertions, 68 deletions" }] }
              ]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Next Steps", marks: [{ type: "strong" }] }
          ]
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                { type: "paragraph", content: [{ type: "text", text: "Deploy and monitor search performance" }] }
              ]
            },
            {
              type: "listItem",
              content: [
                { type: "paragraph", content: [{ type: "text", text: "Consider advanced filtering, bulk actions, export capabilities" }] }
              ]
            }
          ]
        }
      ]
    };

    console.log('\n=== Updating Description ===');
    await jira.updateIssue('ENG-4760', {
      fields: {
        description: updatedDescription
      }
    });
    console.log('✅ Description updated!');

    // Add brief PR comment
    const prComment = "PR submitted: feature/ENG-4760-implement-ER-funnel-search-and-filtering - ER search by ID with detail view overlay complete";

    console.log('\n=== Adding PR Comment ===');
    await jira.addComment('ENG-4760', prComment);
    console.log('✅ Comment added!');

    console.log('\n✅ Update complete!');

  } catch (error) {
    console.error('Error updating ENG-4760:', error.message);
    if (error.response?.data) {
      console.error('Details:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

updateENG4760Implementation();
