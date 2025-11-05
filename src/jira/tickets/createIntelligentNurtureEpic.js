import JiraClient from '../core/jiraClient.js';

async function createIntelligentNurtureEpic() {
  try {
    const jira = new JiraClient();
    console.log('🚀 Creating Intelligent Nurture Epic...');

    // Create the Epic
    const epicData = {
      summary: "Intelligent Nurture",
      issueType: "Epic",
      additionalLabels: ["Q4-priorities"],
      priority: { name: "2 - Medium" }, // Medium priority
      description: {
        type: "doc",
        version: 1,
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Details TBA"
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
    console.log(`   Description: Details TBA`);

    // Use createProductDevelopmentTicket since this is product-related
    const epicResult = await jira.createProductDevelopmentTicket(epicData);

    console.log('\n✅ Epic created successfully!');
    console.log(`Epic Key: ${epicResult.key}`);
    console.log(`URL: ${process.env.JIRA_BASE_URL}/browse/${epicResult.key}`);

    console.log('\n🎯 Intelligent Nurture Epic Implementation Complete:');
    console.log(`📁 ${epicResult.key}: "${epicData.summary}"`);
    console.log('\n📋 Epic Details:');
    console.log('   • Priority: Medium (2 - Medium)');
    console.log('   • Labels: Q4-priorities');
    console.log('   • Status: Discovery');
    console.log('   • Assignee: Unassigned');
    console.log('   • Description: Details TBA');

  } catch (error) {
    console.error('❌ Error creating Intelligent Nurture epic:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

createIntelligentNurtureEpic();
