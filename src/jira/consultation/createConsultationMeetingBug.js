import JiraClient from '../core/jiraClient.js';

async function createConsultationMeetingBug() {
  try {
    const jira = new JiraClient();
    console.log('🐛 Creating consultation meeting bug ticket...\n');

    // Create ticket data for the consultation meeting issue
    const ticketData = {
      summary: 'Consultation Meeting ID Invalid - Both Client and Expert Affected',
      issueType: 'Bug',
      description: {
        type: "doc",
        version: 1,
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Invalid Meeting ID prevents consultation from working for both client and expert",
                marks: [
                  {
                    type: "strong"
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
                text: "Both the client and expert are unable to access the consultation call due to an invalid meeting ID. The consultation URL shows Meeting ID is invalid."
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: ""
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Production"
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: ""
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Consistent issue reported by users"
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: ""
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Sample Record",
                marks: [
                  {
                    type: "strong"
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
                text: ""
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Consultation ID: 13318"
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Expert Email: derekwillis@alumni.princeton.edu"
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "URL: https://app.onfrontiers.com/consultation/13318"
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: ""
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Additional Context: Possible contact information mismatch (phone number discrepancy noted between profile and provided info)"
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: ""
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Steps to reproduce",
                marks: [
                  {
                    type: "strong"
                  }
                ]
              }
            ]
          },
          {
            type: "orderedList",
            attrs: {
              order: 1
            },
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Navigate to https://app.onfrontiers.com/consultation/13318"
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
                        text: "Attempt to join the consultation as either client or expert"
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
                        text: "Observe \"Meeting ID is invalid\" error"
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
                text: "Intended Result",
                marks: [
                  {
                    type: "strong"
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
                text: "Both client and expert should be able to successfully join the consultation call without encountering meeting ID errors."
              }
            ]
          }
        ]
      },
      priority: { name: '1 - High' },
      additionalLabels: ['meeting-failure', 'critical-user-experience']
    };

    console.log('🔧 Creating consultation bug ticket...');
    console.log(`   Project: ${process.env.JIRA_PROJECT_KEY || 'ENG'}`);
    console.log(`   Type: ${ticketData.issueType}`);
    console.log(`   Labels: consultation, product-development, ${ticketData.additionalLabels.join(', ')}`);
    console.log(`   Priority: ${ticketData.priority.name}`);

    const result = await jira.createConsultationTicket(ticketData);

    console.log('\n✅ Bug ticket created successfully!');
    console.log(`🐛 Ticket Key: ${result.key}`);
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
  createConsultationMeetingBug();
}

export default createConsultationMeetingBug;
