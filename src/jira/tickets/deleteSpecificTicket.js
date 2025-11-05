import JiraClient from '../core/jiraClient.js';

async function deleteSpecificTicket() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4694';
    
    console.log(`🗑️  Deleting ticket ${ticketKey}...`);
    
    // First verify the ticket exists
    const issue = await jira.getIssue(ticketKey);
    console.log(`📋 Found ticket: ${issue.fields.summary}`);
    
    await jira.deleteIssue(ticketKey);
    console.log(`✅ Ticket ${ticketKey} deleted successfully`);
    
  } catch (error) {
    console.error('❌ Error deleting ticket:', error.message);
    if (error.response?.status === 404) {
      console.log('💡 Ticket may already be deleted or doesn\'t exist');
    }
  }
}

deleteSpecificTicket();