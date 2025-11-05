import JiraClient from '../core/jiraClient.js';

async function queryCostReductionItems() {
  try {
    const jira = new JiraClient();
    console.log('🔍 Searching for cost-reduction items in ENG project...');
    
    // JQL query for ENG project items with cost-reduction label
    const jql = 'project = ENG AND labels = cost-reduction';
    
    const results = await jira.searchIssues(jql, 0, 100); // Get up to 100 items
    
    console.log(`\n📊 Found ${results.total} work items with cost-reduction label in ENG project:`);
    console.log('=' .repeat(80));
    
    if (results.issues.length > 0) {
      results.issues.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue.key}: ${issue.fields.summary}`);
        console.log(`   Status: ${issue.fields.status.name}`);
        console.log(`   Assignee: ${issue.fields.assignee?.displayName || 'Unassigned'}`);
        console.log(`   Priority: ${issue.fields.priority?.name || 'None'}`);
        console.log('');
      });
    } else {
      console.log('No items found with the cost-reduction label in the ENG project.');
    }
    
  } catch (error) {
    console.error('❌ Error querying Jira:', error.message);
    if (error.response?.status === 401) {
      console.error('Check your API token and email in the .env file');
    } else if (error.response?.status === 403) {
      console.error('Insufficient permissions to access the project or labels');
    }
  }
}

queryCostReductionItems();