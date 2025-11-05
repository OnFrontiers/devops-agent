import JiraClient from '../core/jiraClient.js';

async function createSMBPricingEpic() {
  try {
    const jira = new JiraClient();
    console.log('🚀 Creating SMB Pricing Implementation Epic...');

    // Create the Epic
    const epicData = {
      summary: "Implement New SMB Plan",
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
                text: "Spec: ",
                marks: [{ type: "strong" }]
              },
              {
                type: "text",
                text: "https://www.notion.so/onfrontiersteam/Spec-Implementation-of-New-SMB-Plan-28d5e061c5538098a950d1ccae8a6e5a"
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "OnFrontiers is launching a new SMB pricing model to accommodate small and medium businesses coming through Govtribe. This epic encompasses the implementation of subscription-based pricing, seat management, continuous charging via Stripe, and streamlined customer onboarding to support our growing SMB customer base."
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
                        text: "Implement USD-based subscription pricing with monthly and annual options for SMB customers"
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
                        text: "Establish seat-based licensing with full access and read-only user roles"
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
                        text: "Integrate continuous charging for booking, consultation, and cancellation fees via Stripe"
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
                        text: "Create streamlined customer onboarding flow with subscription setup and payment collection"
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
                        text: "Update UI to display USD pricing and hide credit tabs for SMB plan customers"
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
    console.log(`   Status: Definition (default)`);
    console.log(`   Assignee: Unassigned`);

    // Use createProductDevelopmentTicket since this is product-related
    const epicResult = await jira.createProductDevelopmentTicket(epicData);

    console.log('\n✅ Epic created successfully!');
    console.log(`Epic Key: ${epicResult.key}`);
    console.log(`URL: ${process.env.JIRA_BASE_URL}/browse/${epicResult.key}`);

    // Link ENG-4749 as child of the new epic
    console.log('\n🔗 Linking ENG-4749 (Enable USD Pricing Model) to the new epic...');
    const eng4749Update = {
      fields: {
        parent: { key: epicResult.key }
      }
    };
    await jira.updateIssue('ENG-4749', eng4749Update);
    console.log('✅ ENG-4749 linked to epic');

    // Link ENG-1846 as child of the new epic
    console.log('\n🔗 Linking ENG-1846 (Establish online seat license purchases and seat management) to the new epic...');
    const eng1846Update = {
      fields: {
        parent: { key: epicResult.key }
      }
    };
    await jira.updateIssue('ENG-1846', eng1846Update);
    console.log('✅ ENG-1846 linked to epic');

    console.log('\n🎯 SMB Pricing Epic Implementation Complete:');
    console.log(`📁 ${epicResult.key}: "${epicData.summary}"`);
    console.log('   ├── 📝 ENG-4749: Enable USD Pricing Model');
    console.log('   └── 📝 ENG-1846: Establish online seat license purchases and seat management');
    console.log('\n📋 Epic Details:');
    console.log('   • Priority: High (1 - High)');
    console.log('   • Labels: Q4-priorities');
    console.log('   • Status: Definition');
    console.log('   • Assignee: Unassigned');
    console.log('   • Spec Link: Included in description');
    console.log('   • Objectives: 5 key bullet points documented');

  } catch (error) {
    console.error('❌ Error creating SMB Pricing epic:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

createSMBPricingEpic();
