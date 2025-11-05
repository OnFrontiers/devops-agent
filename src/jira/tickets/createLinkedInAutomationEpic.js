import JiraClient from '../core/jiraClient.js';

async function createLinkedInAutomationEpic() {
  try {
    const jira = new JiraClient();
    console.log('🚀 Creating LinkedIn Automation Epic...');

    // Create the Epic
    const epicData = {
      summary: "Automate Linkedin scraping from expert onboarding",
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
                text: "Automate the import and caching of expert profile data sourced from LinkedIn. Currently consumes 10 minutes per expert (800 min/week) and delays profile completion."
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
                text: "Key Components:",
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
                        text: "LinkedIn Scraping: Build unregistered profiles by scraping LinkedIn URLs provided in applications"
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
                        text: "HubSpot Matching: Match registered profiles without LinkedIn URLs with HubSpot-sourced expert data"
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
                        text: "Profile Polishing: Automate profile enhancement before delivery (remove contact info, check bio/summary/tags, translate to English)"
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
                text: "Technical Flow:",
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
                        text: "New application → HubSpot webhook → Phantombuster API → AWS Lambda → OnFrontiers API"
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
                        text: "Profile ready trigger → AWS Lambda → Bedrock agent → OnFrontiers API (polishing)"
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
                text: "Reference: ",
                marks: [{ type: "strong" }]
              },
              {
                type: "text",
                text: "https://www.notion.so/onfrontiersteam/External-Expert-Delivery-Feature-Prioritization-2025e061c55380cc94d9cc05bda0d96d#2025e061c553806e8bc1c72976aac97c"
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

    console.log('\n🎯 LinkedIn Automation Epic Implementation Complete:');
    console.log(`📁 ${epicResult.key}: "${epicData.summary}"`);
    console.log('\n📋 Epic Details:');
    console.log('   • Priority: High (1 - High)');
    console.log('   • Labels: Q4-priorities');
    console.log('   • Status: Discovery');
    console.log('   • Assignee: Unassigned');
    console.log('   • Components: LinkedIn scraping, HubSpot matching, profile polishing');
    console.log('   • Reference: Notion doc included');

  } catch (error) {
    console.error('❌ Error creating LinkedIn Automation epic:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

createLinkedInAutomationEpic();
