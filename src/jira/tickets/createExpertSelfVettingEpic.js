import JiraClient from '../core/jiraClient.js';

async function createExpertSelfVettingEpic() {
  try {
    const jira = new JiraClient();
    console.log('🚀 Creating Expert Self Vetting Automation Epic...');

    // Create the Epic
    const epicData = {
      summary: "Implement Expert Self Vetting Automation",
      issueType: "Epic",
      additionalLabels: ["Q4-priorities"],
      priority: { name: "1 - High" }, // High priority
      description: {
        type: "doc",
        version: 1,
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Implement automated expert self-vetting system to process search results and generate personalized outreach emails using GPT."
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
                text: "Components:",
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
                        text: "Create Script: Given search ID, process each returned expert"
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
                        text: "Generate Email: GPT component to create personalized emails with questions"
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
                        text: "Technical Design: Database monitoring & triggers, notification system, email generation component, implementation steps"
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
                        text: "Self-Vetting: Use solicitation details to build expert campaigns, ingest solicitations into database, create associations with existing objects"
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

    console.log('\n📋 Creating Epic with these settings:');
    console.log(`   Summary: ${epicData.summary}`);
    console.log(`   Type: ${epicData.issueType}`);
    console.log(`   Labels: ${epicData.additionalLabels.join(', ')}`);
    console.log(`   Priority: ${epicData.priority.name}`);
    console.log(`   Status: Discovery (default)`);
    console.log(`   Assignee: Unassigned`);

    // Use createProductDevelopmentTicket since this is product-related
    const epicResult = await jira.createProductDevelopmentTicket(epicData);

    console.log('\n✅ Epic created successfully!');
    console.log(`Epic Key: ${epicResult.key}`);
    console.log(`URL: ${process.env.JIRA_BASE_URL}/browse/${epicResult.key}`);

    console.log('\n🎯 Expert Self Vetting Automation Epic Implementation Complete:');
    console.log(`📁 ${epicResult.key}: "${epicData.summary}"`);
    console.log('\n📋 Epic Details:');
    console.log('   • Priority: High (1 - High)');
    console.log('   • Labels: Q4-priorities');
    console.log('   • Status: Discovery');
    console.log('   • Assignee: Unassigned');
    console.log('   • Components: 4 main areas outlined');

  } catch (error) {
    console.error('❌ Error creating Expert Self Vetting epic:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

createExpertSelfVettingEpic();
