import JiraClient from '../core/jiraClient.js';

async function createOpsHubLaunchEpic() {
  try {
    const jira = new JiraClient();
    console.log('Creating Operations Hub Launch Epic...');

    // Create the Epic
    const epicData = {
      summary: "Launch the Operations Hub",
      issueType: "Epic",
      additionalLabels: ["operations-hub", "launch", "deployment", "platform"],
      priority: { name: "1 - High" }  // High priority for launch epic
    };

    console.log('\nCreating Epic with these settings:');
    console.log(`   Summary: ${epicData.summary}`);
    console.log(`   Type: ${epicData.issueType}`);
    console.log(`   Labels: cost-reduction, ${epicData.additionalLabels.join(', ')}`);
    console.log(`   Priority: ${epicData.priority.name}`);
    console.log(`   Planned start: 2025-09-08`);
    console.log(`   Actual completion: 2025-09-15 at 15:30`);

    const epicResult = await jira.createCostOptimizationTicket(epicData);

    console.log('\nEpic created successfully!');
    console.log(`Epic Key: ${epicResult.key}`);
    console.log(`URL: ${process.env.JIRA_BASE_URL}/browse/${epicResult.key}`);

    // Set due date for the launch
    console.log('\nSetting Epic due date...');
    const epicDates = {
      fields: {
        duedate: '2025-09-15'  // Due date of the launch
      }
    };

    await jira.updateIssue(epicResult.key, epicDates);
    console.log('Epic due date set: 2025-09-15');

    // Add comprehensive launch description
    console.log('\nAdding comprehensive launch overview...');
    const launchDescription = {
      type: "doc",
      version: 1,
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Overview",
              marks: [{ type: "strong" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Operations Hub platform production launch and go-live event, marking the completion of the unified internal automation and monitoring system for OnFrontiers operations."
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
              text: "Launch Timeline",
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
                      text: "Planned Start: 2025-09-08 (Monday)"
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
                      text: "Actual Completion: 2025-09-15 at 15:30 (Monday, 3:30 PM)"
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
                      text: "Total Duration: 1 week"
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
              text: "Launch Objectives",
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
                      text: "Deploy unified Operations Hub platform to production"
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
                      text: "Enable internal teams to access enhanced automation and monitoring capabilities"
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
                      text: "Complete transition from disparate external tools to centralized platform"
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
                      text: "Establish Operations Hub as the primary internal operations management system"
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
              text: "Launch Components",
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
                      text: "Expert Request (ER) Funnel integration with search and charting capabilities"
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
                      text: "Enhanced table views with modular filtering and data visualization"
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
                      text: "HubSpot data synchronization for expert applications"
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
                      text: "Dashboard integration with Consultations workflow"
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
                      text: "Unified interface replacing multiple disparate systems"
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
              text: "Go-Live Checklist",
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
                      text: "Production database and API deployment completed"
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
                      text: "Web application deployed to production environment"
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
                      text: "Data migration and synchronization tools operational"
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
                      text: "User access and permissions configured for internal teams"
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
                      text: "User training and documentation made available"
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
                      text: "Monitoring and alerting systems in place"
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
                      text: "Support and escalation procedures documented"
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
                      text: "Go-live announcement and initial usage monitoring completed"
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
              text: "Post-Launch Status",
              marks: [{ type: "strong" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "✅ COMPLETED - Operations Hub successfully launched on September 15, 2025 at 3:30 PM, establishing a unified platform for internal operations and automation."
            }
          ]
        }
      ]
    };

    const descriptionUpdate = {
      fields: {
        description: launchDescription
      }
    };

    await jira.updateIssue(epicResult.key, descriptionUpdate);
    console.log('Launch overview and checklist added');

    // Move to "Done" or "Closed" status since this has an actual end date
    console.log('Setting status to Done (completed launch)...');
    const transitions = await jira.getTransitions(epicResult.key);

    // Look for Done/Closed transition
    const doneTransition = transitions.find(t =>
      t.name.toLowerCase().includes('done') ||
      t.name.toLowerCase().includes('close') ||
      t.name.toLowerCase().includes('complete') ||
      t.name.includes('Done')
    );

    if (doneTransition) {
      await jira.transitionIssue(epicResult.key, doneTransition.id);
      console.log(`✅ Transitioned to: ${doneTransition.name}`);
    } else {
      console.log(`❓ Done/Closed transition not found. Available transitions: ${transitions.map(t => t.name).join(', ')}`);
      console.log('Epic remains in current status - manually set to Done when appropriate');
    }

    console.log('\n🎯 Operations Hub Launch Epic created:');
    console.log(`Epic: ${epicResult.key} - "${epicData.summary}"`);
    console.log('   • Launch completed: 2025-09-15 at 15:30');
    console.log('   • 8-item go-live checklist included');
    console.log('   • Launch objectives and components documented');
    console.log('   • Status: ✅ DONE');

  } catch (error) {
    console.error('Error creating Operations Hub launch epic:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
createOpsHubLaunchEpic();
