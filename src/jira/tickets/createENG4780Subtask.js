import JiraClient from '../core/jiraClient.js';

async function createENG4780Subtask() {
  try {
    const jira = new JiraClient();
    const parentKey = 'ENG-4780';

    console.log(`🔄 Creating subtask under ${parentKey}...\n`);

    // Get current user info
    const currentUser = await jira.getCurrentUser();

    // Create subtask data
    const subtaskData = {
      fields: {
        project: { key: process.env.JIRA_PROJECT_KEY || 'ENG' },
        parent: { key: parentKey },
        summary: 'Test Subtask: Verify Background Check Triggering Fix',
        description: {
          type: "doc",
          version: 1,
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Test subtask to verify the background check triggering fix for ENG-4780",
                  marks: [{ type: "strong" }]
                }
              ]
            },
            {
              type: "paragraph",
              content: [{ type: "text", text: "" }]
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Background",
                  marks: [{ type: "strong" }]
                }
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
                      content: [
                        { type: "text", text: "ENG-4780 fixes AI background check triggering for consultations created in pending state" }
                      ]
                    }
                  ]
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        { type: "text", text: "This subtask tests the fix to ensure background checks trigger automatically" }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Acceptance Criteria",
                  marks: [{ type: "strong" }]
                }
              ]
            },
            {
              type: "orderedList",
              attrs: { order: 1 },
              content: [
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "text", text: "Create a new consultation in pending state" }]
                    }
                  ]
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "text", text: "Wait more than 30 seconds before processing" }]
                    }
                  ]
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "text", text: "Verify AI background check triggers automatically without state cycling" }]
                    }
                  ]
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "text", text: "Confirm background check completes successfully" }]
                    }
                  ]
                }
              ]
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Test Environment",
                  marks: [{ type: "strong" }]
                }
              ]
            },
            {
              type: "paragraph",
              content: [
                { type: "text", text: "operations-hub staging environment" }
              ]
            }
          ]
        },
        issuetype: { name: 'Sub-task' },
        assignee: { accountId: currentUser.accountId },
        labels: ['consultation', 'background-check', 'testing'],
        priority: { name: '3 - Low' }
      }
    };

    const response = await jira.client.post('/issue', subtaskData);
    const createdIssue = response.data;

    console.log('✅ Subtask created successfully!');
    console.log(`🎫 Parent: ${parentKey}`);
    console.log(`🎫 Subtask: ${createdIssue.key}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${createdIssue.key}`);
    console.log('\n📋 Subtask Details:');
    console.log(`   • Summary: ${createdIssue.fields.summary}`);
    console.log(`   • Type: ${createdIssue.fields.issuetype.name}`);
    console.log(`   • Status: ${createdIssue.fields.status.name}`);
    console.log(`   • Assignee: ${createdIssue.fields.assignee?.displayName || 'Unassigned'}`);

  } catch (error) {
    console.error('❌ Error creating subtask:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
createENG4780Subtask();
