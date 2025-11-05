import JiraClient from '../core/jiraClient.js';

async function createTestTicket() {
  try {
    const jira = new JiraClient();
    console.log('🧪 Creating test cost-optimization ticket...');
    
    // Test Bug ticket
    const bugTicketData = {
      summary: "Test Bug - Remove unused test service causing errors",
      issueType: "Bug",
      additionalLabels: ["test", "automation"],
      priority: { name: "1 - High" }
    };
    
    console.log('\n🔧 Creating test bug ticket with these settings:');
    console.log(`   Summary: ${bugTicketData.summary}`);
    console.log(`   Type: ${bugTicketData.issueType}`);
    console.log(`   Labels: cost-reduction, ${bugTicketData.additionalLabels.join(', ')}`);
    console.log(`   Priority: ${bugTicketData.priority.name}`);
    console.log(`   Project: ${process.env.JIRA_PROJECT_KEY}`);
    console.log(`   Assignee: ${process.env.JIRA_EMAIL}`);
    
    const result = await jira.createCostOptimizationTicket(bugTicketData);
    
    console.log('\n✅ Test ticket created successfully!');
    console.log(`🎫 Ticket Key: ${result.key}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${result.key}`);
    
    // Verify it appears in our cost-optimization query
    console.log('\n🔍 Verifying ticket appears in cost-optimization query...');
    const searchResults = await jira.searchIssues(process.env.MY_COST_OPTIMIZATION_JQL, 0, 1);
    console.log(`✅ Query returned ${searchResults.total} total cost-optimization tickets`);
    
  } catch (error) {
    console.error('❌ Error creating test ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

createTestTicket();