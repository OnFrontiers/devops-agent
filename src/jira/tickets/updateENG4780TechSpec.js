import JiraClient from '../core/jiraClient.js';

async function updateENG4780TechSpec() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4780';

    console.log(`🔄 Getting current details for ticket ${ticketKey}...\n`);

    // First, get the current ticket to see its structure
    const currentTicket = await jira.getIssue(ticketKey);
    console.log(`📋 Current Summary: ${currentTicket.fields.summary}`);
    console.log(`📊 Current Status: ${currentTicket.fields.status.name}`);

    // Get the current description content
    const currentDescription = currentTicket.fields.description;

    // Add the technical specification section
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
            text: "Technical Analysis",
            marks: [{ type: "strong" }]
          }
        ]
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Root Cause",
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
                  {
                    type: "text",
                    text: "AI background check triggering logic only activates for consultations meeting specific criteria:"
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
                          { type: "text", text: "ai_background_check_state = 'Pending'" }
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
                          { type: "text", text: "ai_background_check_updated_at IS NULL" }
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
                          { type: "text", text: "created_at > NOW() - INTERVAL '30 seconds' (created within last 30 seconds)" }
                        ]
                      }
                    ]
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
                  {
                    type: "text",
                    text: "Consultations created in 'pending' state but processed >30 seconds later never trigger background checks"
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
                  {
                    type: "text",
                    text: "Workaround (state cycling) works because it updates ai_background_check_updated_at timestamp"
                  }
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
            text: "Code Location",
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
                  { type: "text", text: "File: operations-hub/api/cache/opshubConsultations.js" }
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
                  { type: "text", text: "Functions: upsertFromCaches(), upsertForConsultationIds()" }
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
                  { type: "text", text: "Issue: newlyPending detection uses 30-second time window" }
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
            text: "Proposed Solution",
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
                  { type: "text", text: "Modify newlyPending detection logic to trigger background checks for ALL consultations in 'pending' state" }
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
                  { type: "text", text: "Remove time-based restrictions (30-second window)" }
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
                  { type: "text", text: "Trigger based on: ai_background_check_state = 'Pending' AND ai_background_check_updated_at IS NULL" }
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
            text: "Impact Assessment",
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
                  { type: "text", text: "Fixes incomplete background check coverage for new consultations" }
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
                  { type: "text", text: "Eliminates need for manual state cycling workaround" }
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
                  { type: "text", text: "No expected regression in existing background check functionality" }
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
            text: "Implementation Steps",
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
                content: [{ type: "text", text: "Update upsertFromCaches() newlyPending detection logic" }]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Update upsertForConsultationIds() newlyPending detection logic" }]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Test with consultations created in pending state" }]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Verify background checks trigger automatically without state cycling" }]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Monitor for any regressions in existing background check flows" }]
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

    console.log('✅ Technical specification added successfully!');
    console.log(`🎫 Ticket: ${ticketKey}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${ticketKey}`);
    console.log('\n📋 Added technical analysis sections:');
    console.log('   • Root Cause (30-second time window limitation)');
    console.log('   • Code Location (opshubConsultations.js)');
    console.log('   • Proposed Solution (remove time restrictions)');
    console.log('   • Impact Assessment (fixes coverage gap)');
    console.log('   • Implementation Steps (5-step fix plan)');

  } catch (error) {
    console.error('❌ Error updating ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
updateENG4780TechSpec();
