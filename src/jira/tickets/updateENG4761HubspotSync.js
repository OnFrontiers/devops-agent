import JiraClient from '../core/jiraClient.js';

async function updateENG4761HubspotSync() {
  try {
    const jira = new JiraClient();
    console.log('Updating ENG-4761 to HubSpot synchronization specifications...');

    // First, get current ticket to see its state
    const currentTicket = await jira.getIssue('ENG-4761');
    console.log(`Current Status: ${currentTicket.fields.status.name}`);
    console.log(`Current Summary: ${currentTicket.fields.summary}`);

    // Update summary and status
    const updateData = {
      fields: {
        summary: "Implement 2-way syncs with HubSpot",
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
                  text: "HubSpot contains expert application data that needs to be synchronized with the ER funnel charts in Operations Hub"
                }
              ]
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Two-way synchronization ensures data consistency between HubSpot and Operations Hub ER funnel views"
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
                          text: "Pull expert application data from HubSpot API into Operations Hub cache"
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
                          text: "Transform HubSpot data format to match ER funnel chart/table requirements"
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
                          text: "Ensure data freshness and incremental sync capabilities"
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
                          text: "Maintain data integrity during two-way synchronization"
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
                          text: "Expert application data from HubSpot displays in ER funnel charts/tables"
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
                          text: "Data updates in HubSpot reflect in Operations Hub within acceptable timeframes"
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
                          text: "Two-way sync capabilities (read from HubSpot, write updates back if needed)"
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
                          text: "Error handling for network failures, API rate limits, and data consistency issues"
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
                  text: "HubSpot API Integration",
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
                          text: "Connect to HubSpot Contacts API and Custom Objects API for expert applications"
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
                          text: "Implement OAuth2 flow for secure API access with appropriate scopes"
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
                          text: "Handle HubSpot API rate limits and implement retry mechanisms"
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
                          text: "Map HubSpot custom object properties to ER funnel data schema"
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
                  text: "Synchronization Engine",
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
                          text: "Create HubSpotSyncService class to manage data flow between systems"
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
                          text: "Implement incremental sync using HubSpot webhooks and timestamp-based queries"
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
                          text: "Build conflict resolution logic for handling data discrepancies"
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
                          text: "Create synchronization scheduler with configurable intervals"
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
                  text: "Data Mapping and Transformation",
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
                          text: "Transform HubSpot expert application fields to ER funnel requirements"
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
                          text: "Map HubSpot lifecycle stages to ER funnel statuses and progress indicators"
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
                          text: "Convert HubSpot timestamps to consistent timezone handling"
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
                          text: "Handle HubSpot data types and null values appropriately for charts"
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
                  text: "Integration with ER Funnel Charts",
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
                          text: "Connect HubSpot-synchronized data to chart provider data sources"
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
                          text: "Ensure synchronized data appears in table views and refreshes charts"
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
                          text: "Add data source indicators (HubSpot vs cached vs live) in UI"
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
                          text: "Implement manual sync triggers from chart/table interfaces"
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
                      content: [
                        {
                          type: "text",
                          text: "Set up HubSpot API credentials and OAuth2 authentication flow"
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
                          text: "Analyze HubSpot expert application data structure and available fields"
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
                          text: "Create HubSpotSyncService with basic API connectivity and data fetching"
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
                          text: "Implement data mapping and transformation logic from HubSpot to ER funnel format"
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
                          text: "Build incremental synchronization with timestamp tracking"
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
                          text: "Integrate synchronized data with ER funnel chart providers"
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
                          text: "Add manual sync triggers and data source indicators to the UI"
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
                          text: "Test end-to-end synchronization and chart data accuracy"
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
                          text: "Implement comprehensive error handling and logging"
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
                  text: "Security and Compliance",
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
                          text: "Store HubSpot API credentials securely using environment variables"
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
                          text: "Implement proper authentication and authorization for sync operations"
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
                          text: "Ensure GDPR/data protection compliance for personal data synchronization"
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
                          text: "Add audit logging for synchronization operations and data changes"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    };

    await jira.updateIssue('ENG-4761', updateData);

    // Move from Definition to In Progress if currently in Definition
    if (currentTicket.fields.status.name === 'Definition') {
      console.log('\nMoving from Definition to In Progress...');
      const transitions = await jira.getTransitions('ENG-4761');

      const inProgressTransition = transitions.find(t =>
        t.name.toLowerCase().includes('progress') ||
        t.name.toLowerCase().includes('start') ||
        t.name.toLowerCase() === 'in progress'
      );

      if (inProgressTransition) {
        await jira.transitionIssue('ENG-4761', inProgressTransition.id);
        console.log(`Transitioned to: ${inProgressTransition.name}`);
      }
    }

    console.log('ENG-4761 successfully updated!');
    console.log('URL: https://onfrontiers.atlassian.net/browse/ENG-4761');
    console.log('\nUpdated specifications:');
    console.log('   • Title: Implement 2-way syncs with HubSpot');
    console.log('   • HubSpot API integration for expert applications');
    console.log('   • Data synchronization with ER funnel charts');
    console.log('   • 2-way sync capabilities and error handling');
    console.log('   • Security and compliance measures');

  } catch (error) {
    console.error('Error updating ENG-4761:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
updateENG4761HubspotSync();
