import JiraClient from '../core/jiraClient.js';

async function createPostConsultationRequestTicket() {
  try {
    const jira = new JiraClient();
    console.log('🎫 Creating post-consultation request ticket...\n');

    // Create ticket data for the post-consultation request feature
    const ticketData = {
      summary: 'Post-consultation request notifications should only trigger after form submission',
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
                        text: "Currently, email notifications are sent to admin users via notifications@onfrontiers.com when users click the \"Hire expert for long term\" button in the UI"
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
                        text: "However, users still need to submit the actual request form in Typeform for the request to be fulfilled"
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
                        text: "This causes premature notifications even for test clicks, leading to user complaints (raised by Becky)"
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
                        text: "Notifications should only be sent after the Typeform is successfully submitted and validated"
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
                        text: "Button clicks without completed form submission should not trigger notifications"
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
                        text: "Existing functionality for completed requests should remain intact"
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
                        text: "Modify notification trigger logic to check for actual form submission status"
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
                        text: "Integrate with Typeform webhook or API to confirm form completion"
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
                        text: "Update UI button behavior if needed to prevent premature triggers"
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

    console.log('🔧 Creating consultation ticket...');
    console.log(`   Project: ${process.env.JIRA_PROJECT_KEY || 'ENG'}`);
    console.log(`   Type: ${ticketData.issueType}`);
    console.log(`   Labels: consultation, product-development`);
    console.log(`   Priority: ${ticketData.priority.name}`);

    const result = await jira.createConsultationTicket(ticketData);

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
  createPostConsultationRequestTicket();
}

export default createPostConsultationRequestTicket;
