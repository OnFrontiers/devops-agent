import JiraClient from '../core/jiraClient.js';

async function createERFunnelSearchSubtask() {
  try {
    const jira = new JiraClient();
    console.log('Creating ER Funnel Search subtask...');

    const subtaskData = {
      summary: "Implement ER Funnel Search and Filtering",
      issueType: "Story",
      additionalLabels: ["er-funnel", "search", "filtering"],
      priority: { name: "2 - Medium" }
    };

    console.log('\nCreating subtask with these settings:');
    console.log(`   Summary: ${subtaskData.summary}`);
    console.log(`   Type: ${subtaskData.issueType}`);
    console.log(`   Labels: cost-reduction, ${subtaskData.additionalLabels.join(', ')}`);
    console.log(`   Priority: ${subtaskData.priority.name}`);
    console.log(`   Project: ${process.env.JIRA_PROJECT_KEY}`);
    console.log(`   Assignee: ${process.env.JIRA_EMAIL}`);
    console.log(`   Parent: ENG-4757 (Migrate the ER Funnel to the OpsHub)`);

    // Create the ticket first
    const result = await jira.createCostOptimizationTicket(subtaskData);

    console.log('\nER Funnel Search subtask created!');
    console.log(`Subtask Key: ${result.key}`);
    console.log(`URL: ${process.env.JIRA_BASE_URL}/browse/${result.key}`);

    // Link to parent ENG-4757
    console.log('\n🔗 Linking to parent ENG-4757...');
    const parentUpdate = {
      fields: {
        parent: { key: 'ENG-4757' }
      }
    };
    await jira.updateIssue(result.key, parentUpdate);
    console.log('✅ Linked to ENG-4757 (Migrate the ER Funnel to the OpsHub)');

    // Now add comprehensive technical specifications
    console.log('\n📝 Adding detailed technical specifications...');
    const detailedDescription = {
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
                      text: "ER funnel requires efficient search and filtering capabilities to locate specific expert requests"
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
                      text: "Users need to search by expert request ID and select from results before displaying full ER funnel data"
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
                      text: "Current generic table search needs extension to support property-based filtering with result selection"
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
                      text: "Search+select+display pattern provides better user control than as-you-type search"
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
                      text: "Modify generic table search to include property selector (\"Search By\" dropdown)"
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
                      text: "ER funnel filtered initially by expert_request.id only"
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
                      text: "Search triggered by button click or Enter key (not as-you-type)"
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
                      text: "After search, display basic results component for user selection"
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
                      text: "User selects from results, then full ER funnel data displays"
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
              text: "Search Interface Extension",
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
                      text: "Extend EnhancedSummaryTable search bar with property selector dropdown"
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
                      text: "Property selector initially includes: expert_request.id (other properties extensible later)"
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
                      text: "Search button/Enter key trigger (debounced event, not real-time typing)"
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
              text: "Results Display Component",
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
                      text: "Create SearchResultsSelector component that displays matching expert requests"
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
                      text: "Display format: Expert Request ID + basic identifying information (creation date, status, etc.)"
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
                      text: "Selection interaction: click to select, highlights selected item, submit button to load data"
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
                      text: "Error handling: no results found, search timeout, cache unavailable"
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
              text: "Cache Integration",
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
                      text: "Implement cache lookup by expert_request.id for fast retrieval"
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
                      text: "Cache query returns expert request metadata for results display"
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
                      text: "Fallback to API call if cache miss (with user notification)"
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
                      text: "Cache data freshness validation before displaying results"
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
              text: "User Experience Flow",
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
                      text: "User opens ER funnel page: https://operations.app.onfrontiers.com/#/expert-requests/dashboards/er-funnel"
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
                      text: "User selects \"expert_request.id\" from search property dropdown"
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
                      text: "User enters expert request ID in search field"
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
                      text: "User clicks Search button or presses Enter"
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
                      text: "System searches cache for matching expert requests"
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
                      text: "Results component displays matching expert requests (with basic info)"
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
                      text: "User selects desired expert request from results"
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
                      text: "Full ER funnel data loads and displays for selected expert request"
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
                      text: "Analyze current EnhancedSummaryTable search implementation"
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
                      text: "Add property selector dropdown to search bar component"
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
                      text: "Implement search button trigger (remove as-you-type functionality for this search type)"
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
                      text: "Create SearchResultsSelector component with selection interface"
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
                      text: "Implement cache lookup functionality for expert_request.id search"
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
                      text: "Integrate results selection with ER funnel data loading"
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
                      text: "Test end-to-end search, select, and display flow"
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
                      text: "Add error handling for no results, cache failures, and timeouts"
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
              text: "Architecture Notes",
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
                      text: "Search functionality modular and reusable for other table views"
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
                      text: "Property selector extensible - future properties added via configuration"
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
                      text: "Cache integration abstracted for different data source types"
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
                      text: "Results component reusable with different data schemas"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };

    const specificationUpdate = {
      fields: {
        description: detailedDescription
      }
    };

    await jira.updateIssue(result.key, specificationUpdate);
    console.log('✅ Added comprehensive search and filtering specifications');

    // Set status to In Progress
    console.log('\n🏃 Setting status to In Progress...');
    const transitions = await jira.getTransitions(result.key);

    const inProgressTransition = transitions.find(t =>
      t.name.toLowerCase().includes('progress') ||
      t.name.toLowerCase().includes('start') ||
      t.name.toLowerCase() === 'in progress'
    );

    if (inProgressTransition) {
      await jira.transitionIssue(result.key, inProgressTransition.id);
      console.log(`✅ Transitioned to: ${inProgressTransition.name}`);
    }

    console.log('\n🎯 Subtask hierarchy created:');
    console.log('   📁 ENG-4757 (Migrate the ER Funnel to the OpsHub)');
    console.log(`   └── 🏃 ${result.key} (Implement ER Funnel Search and Filtering) - IN PROGRESS`);

  } catch (error) {
    console.error('❌ Error creating ER funnel search subtask:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
createERFunnelSearchSubtask();
