import JiraClient from '../core/jiraClient.js';

async function createSendGridAutomationTicket() {
  try {
    const jira = new JiraClient();

    // Get current user for assignment
    console.log('📋 Getting current user information...');
    const currentUser = await jira.getCurrentUser();

    // Calculate dates
    const startDate = new Date('2025-11-20'); // Today
    const dueDate = new Date('2025-11-25');   // Tuesday (5 days from today)

    console.log('📧 Creating SendGrid Automation ticket for expert applications...');

    const ticketData = {
      summary: "Implement SendGrid Metadata Strategy for Expert Applications Automation",
      issueType: "Story",
      additionalLabels: ["operations-hub", "sendgrid", "expert-applications", "automation"],
      priority: { name: "1 - High" },
      components: [{ name: "Operations Hub" }],
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
                text: "Current expert outreach uses disparate tracking methods. This implementation establishes a unified SendGrid automation system for tracking per-project performance using metadata strategy."
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
                        text: "Project ID in custom_args: Available to Inbound Parse, Event Webhook, email headers (not visible to recipients)"
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
                        text: "Project ID in categories[]: Enables Stats API queries for per-project dashboards"
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
                        text: "Single Automation: Handle multiple projects without duplicating sequences, steps, or templates"
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
                        text: "Mail Send API Integration: Initial touchpoint with metadata setup"
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
                text: "Implementation Components",
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
                        text: "Set up Inbound Parse webhook on replies@onfrontiers.com for reply tracking"
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
                        text: "Configure Stats API queries using categories[] for per-project metrics"
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
                        text: "Implement metadata schema: project_id, contact_id, batch"
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
                        text: "Create per-project dashboard views (delivered, opens, clicks, replies, bounces, unsubscribes)"
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
                        text: "Implement reply processing logic with X-SG-Custom extraction"
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
                text: "API Integration Points",
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
                        text: "SendGrid Mail Send API with custom metadata"
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
                        text: "Stats API endpoints for performance tracking"
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
                        text: "Inbound Parse webhook for reply handling"
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
                        text: "Automation API for contact lifecycle management"
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
                        text: "Metadata strategy implemented (custom_args project_id + categories for Stats API)"
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
                        text: "Per-project performance tracking working (opens, clicks, replies, bounces, unsubscribes)"
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
                        text: "Single automation handling multiple projects without duplication"
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
                        text: "Inbound Parse webhook processing replies with project tracking"
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
                        text: "Dashboard queries returning accurate per-project metrics via Stats API"
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
                        text: "Reply processing extracting project_id and contact_id from X-SG-Custom headers"
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
    console.log(`   Labels: ${ticketData.additionalLabels.join(', ')}`);
    console.log(`   Priority: ${ticketData.priority.name}`);
    console.log(`   Components: ${ticketData.components.map(c => c.name).join(', ')}`);
    console.log(`   Parent Epic: ENG-4769`);
    console.log(`   Assignee: ${currentUser.displayName} (${currentUser.accountId})`);
    console.log(`   Start Date: ${startDate.toISOString().split('T')[0]}`);
    console.log(`   Due Date: ${dueDate.toISOString().split('T')[0]}`);

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

    // Set assignee
    console.log(`\n👤 Assigning to ${currentUser.displayName}...`);
    await jira.assignIssue(ticketResult.key, currentUser.accountId);
    console.log('✅ Assignment complete');

    // Set dates
    console.log('\n📅 Setting start date and due date...');
    const dateData = {
      fields: {
        "customfield_10900": startDate.toISOString().split('T')[0], // Start date field
        duedate: dueDate.toISOString().split('T')[0]           // Due date
      }
    };

    await jira.updateIssue(ticketResult.key, dateData);
    console.log('✅ Dates set successfully');

    // Transition to In Progress
    console.log('\n📊 Transitioning ticket to In Progress...');
    const transitions = await jira.getTransitions(ticketResult.key);

    // Look for In Progress transition
    const inProgressTransition = transitions.find(t =>
      t.name.toLowerCase().includes('in progress') ||
      t.name.toLowerCase().includes('progress') ||
      t.name.toLowerCase() === 'start progress'
    );

    if (inProgressTransition) {
      await jira.transitionIssue(ticketResult.key, inProgressTransition.id);
      console.log(`✅ Transitioned to: ${inProgressTransition.name}`);
    } else {
      console.log(`❌ In Progress transition not found. Available transitions: ${transitions.map(t => t.name).join(', ')}`);
      console.log('Ticket status may need manual adjustment');
    }

    console.log('\n🎯 SendGrid Automation ticket created successfully!');
    console.log(`📁 ${ticketResult.key}: "${ticketData.summary}"`);
    console.log('\n📋 Ticket Details:');
    console.log('   • Parent Epic: ENG-4769 (Operations Hub)');
    console.log('   • Type: Story');
    console.log('   • Priority: High (1 - High)');
    console.log('   • Labels: operations-hub, sendgrid, expert-applications, automation');
    console.log('   • Status: In Progress');
    console.log(`   • Assignee: ${currentUser.displayName}`);
    console.log(`   • Start Date: ${startDate.toISOString().split('T')[0]}`);
    console.log(`   • Due Date: ${dueDate.toISOString().split('T')[0]}`);

  } catch (error) {
    console.error('❌ Error creating SendGrid Automation ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

createSendGridAutomationTicket();
