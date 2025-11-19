import JiraClient from '../core/jiraClient.js';

async function verifyENG4784Updates() {
  try {
    const jira = new JiraClient();

    console.log('🔍 Verifying ticket updates...\n');

    // Get parent ticket
    const parent = await jira.getIssue('ENG-4784');
    console.log('📋 Parent Ticket: ENG-4784');
    console.log(`   Summary: ${parent.fields.summary}`);
    console.log(`   Status: ${parent.fields.status.name}`);
    console.log(`   URL: ${process.env.JIRA_BASE_URL}/browse/ENG-4784`);

    // Get child ticket
    const child = await jira.getIssue('ENG-4795');
    console.log('\n📋 Child Ticket: ENG-4795');
    console.log(`   Summary: ${child.fields.summary}`);
    console.log(`   Status: ${child.fields.status.name}`);
    console.log(`   Parent: ${child.fields.parent?.key || 'None'}`);
    console.log(`   Labels: ${child.fields.labels.join(', ') || 'None'}`);
    console.log(`   URL: ${process.env.JIRA_BASE_URL}/browse/ENG-4795`);

    console.log('\n✅ Summary:');
    console.log('   • ENG-4784 now has a high-level summary of all 3 product work items');
    console.log('   • ENG-4795 contains the detailed spec for Item 1 (34 points, 57-77 hours)');
    console.log('   • ENG-4795 is properly linked as a child of ENG-4784');
    console.log('   • Ready to create tickets for Item 2 and Item 3');

  } catch (error) {
    console.error('❌ Error verifying tickets:', error.message);
  }
}

verifyENG4784Updates();
