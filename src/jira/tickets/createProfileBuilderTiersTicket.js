import JiraClient from '../core/jiraClient.js';

async function createProfileBuilderTiersTicket() {
  try {
    const jira = new JiraClient();
    console.log('🎯 Creating Profile Builder Tiers ticket under ENG-4769...');

    const ticketData = {
      summary: "Implement Tiers into Profile Builder with AI-Powered Suggestions",
      issueType: "Story",
      additionalLabels: ["operations-hub", "profile-builder", "ai-integration", "tier-classification"],
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
                marks: [
                  {
                    type: "strong"
                  }
                ]
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
                        text: "tba"
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
                        text: " "
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
                text: "..."
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
    console.log(`   Components: ${ticketData.components.map(c => c.name).join(', ')}`);
    console.log(`   Parent Epic: ENG-4769`);

    const ticketResult = await jira.createProductDevelopmentTicket(ticketData);

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

    console.log('\n🎯 Profile Builder Tiers ticket created successfully!');
    console.log(`📁 ${ticketResult.key}: "${ticketData.summary}"`);
    console.log('\n📋 Ticket Details:');
    console.log('   • Parent Epic: ENG-4769 (Migration Closeout)');
    console.log('   • Type: Story');
    console.log('   • Priority: Medium (2 - Medium - default)');
    console.log('   • Labels: operations-hub, profile-builder, ai-integration, tier-classification');
    console.log('   • Status: Definition');

  } catch (error) {
    console.error('❌ Error creating Profile Builder Tiers ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

createProfileBuilderTiersTicket();
