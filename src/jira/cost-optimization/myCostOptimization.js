import JiraClient from '../core/jiraClient.js';

async function queryMyCostOptimizationTickets() {
  try {
    const jira = new JiraClient();
    console.log('🔍 Searching for your cost-optimization tickets...');
    
    // Use the predefined JQL from environment
    const jql = process.env.MY_COST_OPTIMIZATION_JQL;
    
    const results = await jira.searchIssues(jql, 0, 100);
    
    console.log(`\n📊 Found ${results.total} cost-optimization tickets assigned to you:`);
    console.log('=' .repeat(80));
    
    if (results.issues.length > 0) {
      results.issues.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue.key}: ${issue.fields.summary}`);
        console.log(`   Type: ${issue.fields.issuetype.name}`);
        console.log(`   Status: ${issue.fields.status.name}`);
        console.log(`   Priority: ${issue.fields.priority?.name || 'None'}`);
        console.log('');
      });
      
      // Show status summary
      const statusCounts = {};
      const typeCounts = {};
      results.issues.forEach(issue => {
        const status = issue.fields.status.name;
        const type = issue.fields.issuetype.name;
        statusCounts[status] = (statusCounts[status] || 0) + 1;
        typeCounts[type] = (typeCounts[type] || 0) + 1;
      });
      
      console.log('📈 Status Summary:');
      Object.entries(statusCounts).forEach(([status, count]) => {
        console.log(`   ${status}: ${count} tickets`);
      });
      
      console.log('\n📋 Type Summary:');
      Object.entries(typeCounts).forEach(([type, count]) => {
        console.log(`   ${type}: ${count} tickets`);
      });
      
    } else {
      console.log('No cost-optimization tickets found assigned to you.');
    }
    
  } catch (error) {
    console.error('❌ Error querying your cost-optimization tickets:', error.message);
    if (error.response?.status === 401) {
      console.error('Check your API token and email in the .env file');
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  queryMyCostOptimizationTickets();
}

export default queryMyCostOptimizationTickets;