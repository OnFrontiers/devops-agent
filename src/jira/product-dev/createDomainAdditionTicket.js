import JiraClient from '../core/jiraClient.js';

async function createDomainAdditionTicket() {
  try {
    const jira = new JiraClient();
    console.log('🎫 Creating domain addition ticket...\n');

    // Create ticket data for adding domains to API configuration
    const ticketData = {
      summary: 'Add operations.onfrontiers.com, resources.onfrontiers.com, and cerca.onfrontiers.com to API allowed domains',
      issueType: 'Story',
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
                        text: "Currently the API only allows requests from localhost, app, api, etc."
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
                        text: "Internal products need to query the API from other domains"
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
                        text: "Previously had to use operations.app.onfrontiers.com as root domain for internal apps (clumsy)"
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
                        text: "This implementation is dev ready"
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
                        text: "operations.onfrontiers.com added to allowed domains configuration"
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
                        text: "resources.onfrontiers.com added to allowed domains configuration"
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
                        text: "cerca.onfrontiers.com added to allowed domains configuration"
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
                        text: "Code redeployed to production"
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
                        text: "Internal products can successfully query the API from these domains"
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
                text: "Technical Design",
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
                        text: "Update the API configuration file with the new allowed domains"
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
                        text: "Test domain access from each new domain"
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
                        text: "Redeploy the application"
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
                        text: "Verify cross-origin requests work properly"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      priority: { name: '2 - Medium' }
    };

    console.log('🔧 Creating product-development ticket...');
    console.log(`   Project: ${process.env.JIRA_PROJECT_KEY || 'ENG'}`);
    console.log(`   Type: ${ticketData.issueType}`);
    console.log(`   Labels: product-development`);
    console.log(`   Priority: ${ticketData.priority.name}`);

    const result = await jira.createProductDevelopmentTicket(ticketData);

    console.log('\n✅ Ticket created successfully!');
    console.log(`🎫 Ticket Key: ${result.key}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${result.key}`);

    // Now update the status to "In Progress"
    console.log('\n🔄 Updating ticket status to "In Progress"...');

    try {
      const transitions = await jira.getTransitions(result.key);
      const inProgressTransition = transitions.find(t =>
        t.name.toLowerCase().includes('in progress') ||
        t.to?.name?.toLowerCase().includes('in progress')
      );

      if (inProgressTransition) {
        await jira.transitionIssue(result.key, inProgressTransition.id);
        console.log('✅ Ticket status updated to "In Progress"');
      } else {
        console.log('⚠️ Could not find "In Progress" transition. Available transitions:');
        transitions.forEach(t => console.log(`   - ${t.name}`));
      }
    } catch (statusError) {
      console.error('❌ Failed to update ticket status:', statusError.message);
    }

  } catch (error) {
    console.error('❌ Error creating ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', error.response.data.errors);
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createDomainAdditionTicket();
}

export default createDomainAdditionTicket;
