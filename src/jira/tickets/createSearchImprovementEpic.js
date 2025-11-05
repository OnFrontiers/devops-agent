import JiraClient from '../core/jiraClient.js';

async function createSearchImprovementEpic() {
  try {
    const jira = new JiraClient();
    console.log('🚀 Creating Search Improvement Epic...');

    // Create the Epic
    const epicData = {
      summary: "Search Improvement",
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
                text: "OnFrontiers is launching comprehensive search improvements to enhance expert discovery and marketplace efficiency. This epic focuses on optimizing search functionality to help users find relevant experts more effectively. Related to ENG-4501 (Improve document search relevancy)."
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
                text: "Key Objectives:",
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
                        text: "Enhance search algorithms for better expert matching - Details TBA"
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
                        text: "Improve search UI/UX for easier expert discovery - Details TBA"
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
                        text: "Optimize marketplace search performance - Details TBA"
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
                        text: "Finding marketplace experts more efficiently - Details TBA"
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
    console.log(`   Related to: ENG-4501 (Improve document search relevancy)`);

    // Use createProductDevelopmentTicket since this is product-related
    const epicResult = await jira.createProductDevelopmentTicket(epicData);

    console.log('\n✅ Epic created successfully!');
    console.log(`Epic Key: ${epicResult.key}`);
    console.log(`URL: ${process.env.JIRA_BASE_URL}/browse/${epicResult.key}`);

    // Link ENG-4501 as a related issue (not parent-child, just mention in description)
    console.log('\n🔗 ENG-4501 relationship noted in epic description');
    console.log('   (ENG-4501: Improve document search relevancy - In Progress)');

    console.log('\n🎯 Search Improvement Epic Implementation Complete:');
    console.log(`📁 ${epicResult.key}: "${epicData.summary}"`);
    console.log('\n📋 Epic Details:');
    console.log('   • Priority: High (1 - High)');
    console.log('   • Labels: Q4-priorities');
    console.log('   • Status: Discovery');
    console.log('   • Assignee: Unassigned');
    console.log('   • Related to ENG-4501: Improve document search relevancy');
    console.log('   • Objectives: 4 key areas outlined (details TBA)');

  } catch (error) {
    console.error('❌ Error creating Search Improvement epic:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

createSearchImprovementEpic();
