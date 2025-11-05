import JiraClient from '../core/jiraClient.js';

async function createTestCostReductionTicket() {
  try {
    const jira = new JiraClient();
    
    const issueData = {
      summary: 'Test Cost Reduction Story - Created by Automation',
      issueType: 'Story',
      additionalLabels: ['test-ticket']
    };
    
    console.log('🎟️ Creating test cost-reduction story...\n');
    
    const result = await jira.createCostOptimizationTicket(issueData);
    
    console.log(`✅ Test ticket created successfully!`);
    console.log(`🔗 Ticket Key: ${result.key}`);
    console.log(`📋 Summary: ${issueData.summary}`);
    console.log(`🏷️ Labels: cost-reduction, test-ticket`);
    console.log(`👤 Assigned to: You (current user)`);
    console.log(`📊 Issue Type: Story`);
    
    return result;
    
  } catch (error) {
    console.error('❌ Error creating test ticket:', error.message);
  }
}

createTestCostReductionTicket();