import JiraClient from '../core/jiraClient.js';

async function createOAMigrationEpic() {
  try {
    const jira = new JiraClient();
    console.log('🚀 Creating OA Migration Epic...');

    // Create the Epic
    const epicData = {
      summary: "Migrate OA into operations",
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
                text: "Replicate the Opportunity assessments from n8n into the Operations Hub/ Product"
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

    console.log('\n🎯 OA Migration Epic Implementation Complete:');
    console.log(`📁 ${epicResult.key}: "${epicData.summary}"`);
    console.log('\n📋 Epic Details:');
    console.log('   • Priority: Medium (2 - Medium)');
    console.log('   • Labels: Q4-priorities');
    console.log('   • Status: Discovery');
    console.log('   • Assignee: Unassigned');
    console.log('   • Migration: n8n Opportunity Assessments → Operations Hub/Product');

  } catch (error) {
    console.error('❌ Error creating OA Migration epic:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

createOAMigrationEpic();
