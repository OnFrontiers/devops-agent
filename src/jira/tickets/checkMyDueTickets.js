import JiraClient from '../core/jiraClient.js';

async function checkMyDueTickets() {
  try {
    const jira = new JiraClient();
    
    // JQL to find tickets due on 2024-09-15 assigned to current user
    const jql = 'assignee = currentUser() AND duedate = "2024-09-15"';
    
    console.log('🔍 Searching for YOUR tickets due on September 15th...\n');
    console.log(`JQL: ${jql}\n`);
    
    const searchResult = await jira.searchIssues(
      jql, 
      0, 
      100, 
      ['key', 'summary', 'status', 'assignee', 'duedate', 'labels', 'priority']
    );
    
    console.log(`📊 Found ${searchResult.total} ticket(s) assigned to you and due on September 15th:\n`);
    
    if (searchResult.total === 0) {
      console.log('✅ No tickets assigned to you are due on September 15th.');
      return;
    }
    
    searchResult.issues.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue.key}: ${issue.fields.summary}`);
      console.log(`   Status: ${issue.fields.status.name}`);
      console.log(`   Priority: ${issue.fields.priority?.name || 'None'}`);
      console.log(`   Due Date: ${issue.fields.duedate}`);
      console.log(`   Labels: ${issue.fields.labels.join(', ')}`);
      console.log('   ---');
    });
    
  } catch (error) {
    console.error('❌ Error checking your due tickets:', error.message);
  }
}

checkMyDueTickets();