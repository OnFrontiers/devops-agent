import JiraClient from '../core/jiraClient.js';

async function createProfileBuilderTiersTicket() {
  try {
    const jira = new JiraClient();
    console.log('🎯 Creating Operations Hub ticket for Profile Builder Tiers...');

    // Create the ticket
    const ticketData = {
      summary: "Add tier functionality to profile builder for both build and enrich tabs with AI-powered tier definition",
      issueType: "Story",
      additionalLabels: ["profile-builder", "ai-integration", "tier-classification"],
      priority: { name: "2 - Medium" },
      description: {
        type: "doc",
        version: 1,
        content: [
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
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "The profile builder currently allows users to create and enrich expert profiles but lacks tier classification functionality. We need to integrate tier determination based on OnFrontiers' tier definitions to help categorize experts appropriately across both the build and enrich workflows."
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
                text: "Current State",
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
                        text: "Profile builder supports expert profile creation and enrichment"
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
                        text: "No tier classification system currently implemented"
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
                        text: "Both build and enrich tabs need tier display functionality"
                      }
                    ]
                  }
                ]
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
                    content: [
                      {
                        type: "text",
                        text: "Tier classification displays on both build and enrich tabs in the profile builder"
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
                        text: "AI calls successfully determine expert tiers based on OnFrontiers tier definitions"
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
                        text: "Tier information integrates seamlessly with existing profile builder UI components"
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
                        text: "Tier determination is accurate and consistent across different expert profiles"
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
                        text: "Performance impact of AI calls is minimal and doesn't affect user experience"
                      }
                    ]
                  }
                ]
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
                text: "Technical Design",
                marks: [{ type: "strong" }]
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Integration Points:"
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
                        text: "AI Service Integration: Implement calls to tier determination API using OnFrontiers definitions"
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
                        text: "UI Components: Add tier display components to both build and enrich tab interfaces"
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
                        text: "Data Flow: Ensure tier information flows properly through profile builder state management"
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
                        text: "Caching Strategy: Implement appropriate caching for AI responses to improve performance"
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
                        text: "Error Handling: Graceful degradation when AI services are unavailable"
                      }
                    ]
                  }
                ]
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
                text: "Dependencies",
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
                        text: "Access to OnFrontiers tier definition API/service"
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
                        text: "Profile builder component modifications"
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
                        text: "AI service integration framework"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    };

    console.log('\n📋 Creating ticket with these settings:');
    console.log(`   Summary: ${ticketData.summary}`);
    console.log(`   Type: ${ticketData.issueType}`);
    console.log(`   Labels: operations-hub, ${ticketData.additionalLabels.join(', ')}`);
    console.log(`   Priority: ${ticketData.priority.name}`);
    console.log(`   Assignee: Unassigned (Operations Hub default)`);
    console.log(`   Parent Epic: ENG-4769`);

    const ticketResult = await jira.createOperationsHubTicket(ticketData);

    console.log('\n✅ Ticket created successfully!');
    console.log(`🎫 Ticket Key: ${ticketResult.key}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${ticketResult.key}`);

    // Link to parent epic ENG-4769
    console.log('\n🔗 Linking to parent epic ENG-4769...');
    const epicLinkData = {
      fields: {
        parent: {
          key: "ENG-4769"
        }
      }
    };

    await jira.updateIssue(ticketResult.key, epicLinkData);
    console.log('✅ Successfully linked to epic ENG-4769');

    // Set to Definition stage
    console.log('\n📊 Setting ticket status to Definition...');
    const transitions = await jira.getTransitions(ticketResult.key);

    const definitionTransition = transitions.find(t =>
      t.name.toLowerCase().includes('definition') ||
      t.name.toLowerCase().includes('backlog') ||
      t.name.toLowerCase().includes('open')
    );

    if (definitionTransition) {
      await jira.transitionIssue(ticketResult.key, definitionTransition.id);
      console.log(`✅ Transitioned to: ${definitionTransition.name}`);
    } else {
      console.log(`ℹ️ Definition transition not found. Available transitions: ${transitions.map(t => t.name).join(', ')}`);
      console.log('Ticket remains in current status - manually set to Definition if needed');
    }

    console.log('\n🎯 Profile Builder Tiers ticket created successfully!');
    console.log(`📁 ${ticketResult.key}: "${ticketData.summary}"`);
    console.log('\n📋 Ticket Details:');
    console.log('   • Project Space: Operations Hub');
    console.log('   • Type: Story');
    console.log('   • Priority: Medium (2 - Medium)');
    console.log('   • Labels: operations-hub, profile-builder, ai-integration, tier-classification');
    console.log('   • Parent Epic: ENG-4769');
    console.log('   • Status: Definition');
    console.log('   • Assignee: Unassigned');

  } catch (error) {
    console.error('❌ Error creating Profile Builder Tiers ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

createProfileBuilderTiersTicket();
