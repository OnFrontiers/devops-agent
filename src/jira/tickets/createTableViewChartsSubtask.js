import JiraClient from '../core/jiraClient.js';

async function createTableViewChartsSubtask() {
  try {
    const jira = new JiraClient();
    console.log('Creating Table View Charts Integration subtask...');

    const subtaskData = {
      summary: "Modify Table View Component to Accept Charts",
      issueType: "Story",
      additionalLabels: ["er-funnel", "charts", "table-view", "module"],
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

    // Create the ticket
    const result = await jira.createCostOptimizationTicket(subtaskData);

    console.log('\nTable View Charts subtask created!');
    console.log(`Subtask Key: ${result.key}`);
    console.log(`URL: https://onfrontiers.atlassian.net/browse/${result.key}`);

    // Link to parent ENG-4757
    console.log('\nLinking to parent ENG-4757...');
    const parentUpdate = {
      fields: {
        parent: { key: 'ENG-4757' }
      }
    };
    await jira.updateIssue(result.key, parentUpdate);
    console.log('Linked to ENG-4757 (Migrate the ER Funnel to the OpsHub)');

    // Add detailed technical specifications for chart integration
    console.log('\nAdding detailed table-view charting specifications...');
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
                      text: "ER funnel requires visual data analysis beyond table views"
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
                      text: "Current EnhancedSummaryTable needs chart integration capabilities"
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
                      text: "Charts should be modular components attachable to any table view"
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
                      text: "Data transformation between table format and chart-compatible format needed"
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
                      text: "TableView component accepts chart provider wrapper without breaking existing functionality"
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
                      text: "Chart providers can be attached to any existing table view instance"
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
                      text: "Automatic data transformation from table data source to chart-compatible format"
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
                      text: "Modular chart system allows future chart types to be added without modifying table view"
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
                      text: "Chart persistence and sharing capabilities integrated into the table view"
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
              text: "Chart Provider Architecture",
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
                      text: "Create ChartProvider higher-order component that wraps any TableView"
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
                      text: "ChartProvider accepts tableDataSource prop and provides chartData to child components"
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
                      text: "ChartProvider includes data transformation utilities and format validation"
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
              text: "Data Transformation Layer",
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
                      text: "Implement TableToChartMapper utility class for data format conversion"
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
                      text: "Support column-to-axis mapping with user configuration dialog"
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
                      text: "Automatic data type detection and appropriate chart type suggestions"
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
                      text: "Real-time data updates reflected in connected charts without performance impact"
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
              text: "Table View Integration Points",
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
                      text: "Add chartToggle prop to EnhancedSummaryTable component"
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
                      text: "Extend table toolbar with \"Add Chart\" button when chart provider is available"
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
                      text: "Chart container appears below table with collapsible interface"
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
                      text: "Table and chart maintain synchronized filtering and sorting"
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
              text: "Chart Management Interface",
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
                      text: "Chart selection panel with supported chart types (Bar, Line, Pie, Scatter)"
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
                      text: "Column mapping dialog for selecting X/Y axes and grouping dimensions"
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
                      text: "Chart persistence: save/load chart configurations per user/table"
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
                      text: "Chart settings panel for colors, labels, legends, and display options"
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
                      text: "Analyze EnhancedSummaryTable component structure and extension points"
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
                      text: "Create ChartProvider wrapper component with data transformation capabilities"
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
                      text: "Implement TableToChartMapper utility for data format conversion"
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
                      text: "Add chart toggle and toolbar integration to EnhancedSummaryTable"
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
                      text: "Create chart management interface with type selection and configuration"
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
                      text: "Implement chart persistence and sharing capabilities"
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
                      text: "Integrate with existing table filtering and sorting mechanisms"
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
                      text: "Test chart functionality across different table views and data types"
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
              text: "Modular Architecture Requirements",
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
                      text: "Chart system completely decoupled from table implementation details"
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
                      text: "New chart types can be added through plugin-like architecture"
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
                      text: "Table views can opt-in to chart functionality without breaking changes"
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
                      text: "Data transformation layer abstracts chart library specifics"
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
                      text: "Chart state management integrated with existing application patterns"
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
    console.log('Detailed table-view charting specifications added');

    // Set status to In Progress
    console.log('\nSetting status to In Progress...');
    const transitions = await jira.getTransitions(result.key);

    const inProgressTransition = transitions.find(t =>
      t.name.toLowerCase().includes('progress') ||
      t.name.toLowerCase().includes('start') ||
      t.name.toLowerCase() === 'in progress'
    );

    if (inProgressTransition) {
      await jira.transitionIssue(result.key, inProgressTransition.id);
      console.log(`Transitioned to: ${inProgressTransition.name}`);
    }

    console.log('\nSubtask hierarchy updated:');
    console.log('   📁 ENG-4757 (Migrate the ER Funnel to the OpsHub)');
    console.log('   ├── 🏃 ENG-4760 (Implement ER Funnel Search and Filtering) - IN PROGRESS');
    console.log(`   └── 🏃 ${result.key} (Modify Table View Component to Accept Charts) - IN PROGRESS`);

  } catch (error) {
    console.error('Error creating table-view charts subtask:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
createTableViewChartsSubtask();
