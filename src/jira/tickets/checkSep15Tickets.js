import JiraClient from '../core/jiraClient.js';

async function checkSep15Tickets() {
  try {
    const jira = new JiraClient();
    
    // JQL to find tickets due on 2024-09-15 with cost-reduction label
    const jql = 'labels = cost-reduction AND duedate = "2024-09-15"';
    
    console.log('🔍 Searching for tickets due on September 15th with cost-reduction label...\n');
    console.log(`JQL: ${jql}\n`);
    
    const searchResult = await jira.searchIssues(
      jql, 
      0, 
      100, 
      ['key', 'summary', 'status', 'assignee', 'duedate', 'labels', 'priority']
    );
    
    console.log(`📊 Found ${searchResult.total} ticket(s) matching criteria:\n`);
    
    if (searchResult.total === 0) {
      console.log('✅ No tickets found due on September 15th with cost-reduction label.');
      return;
    }
    
    searchResult.issues.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue.key}: ${issue.fields.summary}`);
      console.log(`   Status: ${issue.fields.status.name}`);
      console.log(`   Assignee: ${issue.fields.assignee?.displayName || 'Unassigned'}`);
      console.log(`   Priority: ${issue.fields.priority?.name || 'None'}`);
      console.log(`   Due Date: ${issue.fields.duedate}`);
      console.log(`   Labels: ${issue.fields.labels.join(', ')}`);
      console.log('   ---');
    });
    
  } catch (error) {
    console.error('❌ Error checking September 15th tickets:', error.message);
  }
}

checkSep15Tickets();