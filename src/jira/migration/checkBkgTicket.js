import JiraClient from '../core/jiraClient.js';

async function checkBkgTicket() {
  try {
    const jira = new JiraClient();

    console.log('🔍 Checking BKG-7 ticket structure...');

    // Try to get the ticket the user referenced
    const ticketData = await jira.getIssue('BKG-7');

    console.log('\n📋 BKG-7 Details:');
    console.log('=' .repeat(50));
    console.log(`   Key: ${ticketData.key}`);
    console.log(`   Summary: ${ticketData.fields.summary}`);
    console.log(`   Status: ${ticketData.fields.status?.name || 'N/A'}`);
    console.log(`   Issue Type: ${ticketData.fields.issuetype?.name || 'N/A'}`);
    console.log(`   Project: ${ticketData.fields.project?.name || 'N/A'}`);
    console.log(`   Created: ${new Date(ticketData.fields.created).toLocaleDateString()}`);

    console.log('\n🔍 Checking what fields are available on BKG tickets...');
    console.log('Available fields:');
    Object.keys(ticketData.fields).forEach(field => {
      const value = ticketData.fields[field];
      if (typeof value === 'object' && value !== null) {
        console.log(`   ${field}: ${JSON.stringify(value, null, 2).substring(0, 100)}...`);
      } else {
        console.log(`   ${field}: ${value}`);
      }
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response?.status === 404) {
      console.error('BKG-7 ticket not found.');
    } else if (error.response?.status === 403) {
      console.error('Insufficient permissions to access BKG tickets.');
    }
  }
}

checkBkgTicket();
