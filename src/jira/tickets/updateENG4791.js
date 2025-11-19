import JiraClient from '../core/jiraClient.js';

async function updateENG4791() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4791';

    console.log(`🔄 Getting current details for ticket ${ticketKey}...\n`);

    // First, get the current ticket to see its structure
    const currentTicket = await jira.getIssue(ticketKey);
    console.log(`📋 Current Summary: ${currentTicket.fields.summary}`);
    console.log(`📊 Current Status: ${currentTicket.fields.status.name}`);

    // Get the current description content
    const currentDescription = currentTicket.fields.description;

    // Add the organized issue information
    const newContent = [
      ...currentDescription.content,
      {
        type: "paragraph",
        content: [{ type: "text", text: "" }]
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Manager Selection Issue (Expert Request 9150)",
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
                  { type: "text", text: "Multiple managers for expert request: 1 must be saved" }
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
                  { type: "text", text: "Product condition: managers stored under projects table, but operations considers managers by ER level" }
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
                  { type: "text", text: "One project can have multiple ERs, so product shows multiple managers" }
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
                  { type: "text", text: "Workaround: primary definition in operations hub with dropdown for indecisive cases" }
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
                  { type: "text", text: "UI stores primary managers after user selection via dropdown" }
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
            text: "Issue 1: Selection Not Respected",
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
                  { type: "text", text: "User selects manager via dropdown, but UI always shows default manager" }
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
                  { type: "text", text: "set-manager function executes and returns correct manager:" }
                ]
              },
              {
                type: "codeBlock",
                attrs: { language: "json" },
                content: [
                  {
                    type: "text",
                    text: "{\n    \"ok\": true,\n    \"updated\": {\n        \"project_member_id\": 22876,\n        \"primary_manager\": true\n    },\n    \"hubspot\": {\n        \"ok\": true,\n        \"record_id\": \"38749336089\",\n        \"manager_name\": \"Thea Miyakawa\"\n    }\n}"
                  }
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
                  { type: "text", text: "UI shows: Lee Xavier Naong (wrong manager)" }
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
            text: "Issue 2: New Manager Addition",
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
                  { type: "text", text: "When new manager added to project/product, property transforms back to dropdown" }
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
                  { type: "text", text: "Must assume previous manager selection remains primary" }
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
            text: "Investigation Question",
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
                  { type: "text", text: "Are we storing the right primary manager, or is the logic faulty?" }
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
                  { type: "text", text: "UI issue only, or data persistence problem?" }
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
            text: "HubSpot URL Issue (ER Funnel)",
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
                  { type: "text", text: "ER funnel table view HubSpot links missing account number" }
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
                  { type: "text", text: "Correct URL: https://app.hubspot.com/contacts/21130119/record/0-1/146226228542" }
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
                  { type: "text", text: "Current URL: https://app.hubspot.com/contacts/record/0-1/146226228542" }
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
                  { type: "text", text: "Missing: 21130119 (HubSpot account number)" }
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
                  { type: "text", text: "Issue occurs only at ER funnel table view" }
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
            text: "Technical Implementation",
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
                  { type: "text", text: "Add opshub_er_manager_overrides table" }
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
                  { type: "text", text: "Integrate primary manager logic in team data computation" }
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
                  { type: "text", text: "New POST /api/cache/expert-requests/:id/primary-manager endpoint" }
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
                  { type: "text", text: "UI uses ER-scoped endpoint for manager selection" }
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
                  { type: "text", text: "Optimistic updates keyed by ER id" }
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
                  { type: "text", text: "Fix: selecting manager no longer changes all ERs under project" }
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
                  { type: "text", text: "Use buildHubSpotContactUrl in ERCandidateDetailsTable for UI and CSV" }
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
                  { type: "text", text: "Ensure ER Inline Detail button normalized via normalizeHubSpotUrl" }
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
                  { type: "text", text: "ER Funnel custom CSV outputs portal-aware links for summary and candidates" }
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
                  { type: "text", text: "Frontend-only changes; removes reliance on window.HUBSPOT_PORTAL_ID" }
                ]
              }
            ]
          }
        ]
      }
    ];

    const updatedDescription = {
      type: "doc",
      version: 1,
      content: newContent
    };

    const updateData = {
      fields: {
        description: updatedDescription
      }
    };

    await jira.updateIssue(ticketKey, updateData);

    console.log('✅ Ticket ENG-4791 updated successfully!');
    console.log(`🎫 Ticket: ${ticketKey}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${ticketKey}`);
    console.log('\n📋 Added organized sections:');
    console.log('   • Manager Selection Issue (Expert Request 9150)');
    console.log('   • Issue 1: Selection Not Respected');
    console.log('   • Issue 2: New Manager Addition');
    console.log('   • Investigation Question');
    console.log('   • HubSpot URL Issue (ER Funnel)');
    console.log('   • Technical Implementation');

  } catch (error) {
    console.error('❌ Error updating ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
updateENG4791();
