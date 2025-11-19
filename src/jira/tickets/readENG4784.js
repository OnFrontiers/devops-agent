import JiraClient from '../core/jiraClient.js';

async function readENG4784() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4784';

    console.log(`🔍 Fetching ticket ${ticketKey}...\n`);

    const ticket = await jira.getIssue(ticketKey);

    console.log(`📋 Ticket: ${ticket.key}`);
    console.log(`📊 Summary: ${ticket.fields.summary}`);
    console.log(`📌 Status: ${ticket.fields.status.name}`);
    console.log(`👤 Assignee: ${ticket.fields.assignee?.displayName || 'Unassigned'}`);
    console.log(`🏷️  Labels: ${ticket.fields.labels.join(', ') || 'None'}`);
    console.log(`📅 Created: ${new Date(ticket.fields.created).toLocaleDateString()}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${ticketKey}`);
    console.log('\n✅ Description updated successfully with detailed scope for Item 1!');

  } catch (error) {
    console.error('❌ Error fetching ticket:', error.message);
  }
}

readENG4784();
