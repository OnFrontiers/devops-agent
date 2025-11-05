import JiraClient from '../core/jiraClient.js';

async function deleteTestTicket() {
  try {
    const jira = new JiraClient();
    const testTicketKey = 'ENG-4679';
    
    console.log(`🗑️  Deleting test ticket ${testTicketKey}...`);
    
    // First verify the ticket exists and is the test ticket
    const issue = await jira.getIssue(testTicketKey);
    console.log(`📋 Found ticket: ${issue.fields.summary}`);
    
    if (issue.fields.summary.includes('Test Bug - Remove unused test service')) {
      await jira.deleteIssue(testTicketKey);
      console.log(`✅ Test ticket ${testTicketKey} deleted successfully`);
      
      // Verify it's gone from our query
      console.log('\n🔍 Verifying removal from cost-optimization query...');
      const searchResults = await jira.searchIssues(process.env.MY_COST_OPTIMIZATION_JQL, 0, 1);
      console.log(`✅ Query now shows ${searchResults.total} cost-optimization tickets (should be back to 17)`);
    } else {
      console.log(`❌ Ticket ${testTicketKey} doesn't appear to be the test ticket. Skipping deletion for safety.`);
    }
    
  } catch (error) {
    console.error('❌ Error deleting test ticket:', error.message);
    if (error.response?.status === 404) {
      console.log('💡 Ticket may already be deleted or doesn\'t exist');
    }
  }
}

deleteTestTicket();