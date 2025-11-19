import JiraClient from '../core/jiraClient.js';

async function organizeENG4780() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4780';

    console.log(`🔄 Reorganizing ticket ${ticketKey}...\n`);

    // Get the current ticket
    const currentTicket = await jira.getIssue(ticketKey);
    console.log(`📋 Current Summary: ${currentTicket.fields.summary}`);
    console.log(`📊 Current Status: ${currentTicket.fields.status.name}`);

    // Reorganized content with clear sections
    const organizedContent = [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Primary Issue",
            marks: [{ type: "strong" }]
          }
        ]
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Pending consultations fail to start background checks due to 30-second time window restriction in newlyPending detection logic."
          }
        ]
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
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Additional Issues to Address",
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
                  { type: "text", text: "Background check table view shows outdated or blank data on initial load (cache issue requiring Cmd+Shift+R)" }
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
                  { type: "text", text: "AI background check completion incorrectly changes Manual Background check to Pending" }
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
                  { type: "text", text: "Add daily check for experts with completed consultations where Background check complete = No" }
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
                  { type: "text", text: "HubSpot integration fails silently" }
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
                  { type: "text", text: "Background check complete property in table views should show Yes (green) and No (red)" }
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
      content: organizedContent
    };

    const updateData = {
      fields: {
        description: updatedDescription
      }
    };

    await jira.updateIssue(ticketKey, updateData);

    console.log('✅ Ticket ENG-4780 reorganized successfully!');
    console.log(`🎫 Ticket: ${ticketKey}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${ticketKey}`);
    console.log('\n📋 Reorganized into clear sections:');
    console.log('   • Primary Issue (background check triggering)');
    console.log('   • Technical Analysis (root cause, code location, solution, impact, steps)');
    console.log('   • Additional Issues (5 related problems to address)');

  } catch (error) {
    console.error('❌ Error reorganizing ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
organizeENG4780();
