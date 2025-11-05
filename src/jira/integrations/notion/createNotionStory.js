import JiraClient from '../../core/jiraClient.js';

async function createNotionStory() {
  try {
    const jira = new JiraClient();
    console.log('📝 Creating Notion integration story...');
    
    const storyData = {
      summary: "Set up notion integration for support.onfrontiers.com",
      issueType: "Story",
      additionalLabels: ["hubspot"],
      priority: { name: "2 - Medium" }
    };
    
    console.log('\n🔧 Creating story with these settings:');
    console.log(`   Summary: ${storyData.summary}`);
    console.log(`   Type: ${storyData.issueType}`);
    console.log(`   Labels: cost-reduction, ${storyData.additionalLabels.join(', ')}`);
    console.log(`   Priority: ${storyData.priority.name}`);
    console.log(`   Project: ${process.env.JIRA_PROJECT_KEY}`);
    console.log(`   Assignee: ${process.env.JIRA_EMAIL}`);
    console.log(`   Template: Story template (Background, Acceptance Criteria, Technical Design)`);
    
    const result = await jira.createCostOptimizationTicket(storyData);
    
    console.log('\n✅ Notion integration story created successfully!');
    console.log(`🎫 Ticket Key: ${result.key}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${result.key}`);
    
    // Verify it appears in our cost-optimization query
    console.log('\n🔍 Verifying ticket appears in cost-optimization query...');
    const searchResults = await jira.searchIssues(process.env.MY_COST_OPTIMIZATION_JQL);
    console.log(`✅ Query now shows ${searchResults.total} total cost-optimization tickets`);
    
  } catch (error) {
    console.error('❌ Error creating Notion story:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

createNotionStory();