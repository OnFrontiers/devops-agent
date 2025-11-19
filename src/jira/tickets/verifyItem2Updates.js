import JiraClient from '../core/jiraClient.js';

async function verifyItem2Updates() {
  try {
    const jira = new JiraClient();

    console.log('🔍 Verifying ticket updates...\n');

    // Get parent ticket
    const parent = await jira.getIssue('ENG-4784');
    console.log('📋 Parent Ticket: ENG-4784');
    console.log(`   Summary: ${parent.fields.summary}`);
    console.log(`   Status: ${parent.fields.status.name}`);
    console.log(`   URL: ${process.env.JIRA_BASE_URL}/browse/ENG-4784`);

    // Get child tickets
    const child1 = await jira.getIssue('ENG-4795');
    console.log('\n📋 Child Ticket 1: ENG-4795');
    console.log(`   Summary: ${child1.fields.summary}`);
    console.log(`   Status: ${child1.fields.status.name}`);
    console.log(`   Parent: ${child1.fields.parent?.key || 'None'}`);
    console.log(`   URL: ${process.env.JIRA_BASE_URL}/browse/ENG-4795`);

    const child2 = await jira.getIssue('ENG-4796');
    console.log('\n📋 Child Ticket 2: ENG-4796');
    console.log(`   Summary: ${child2.fields.summary}`);
    console.log(`   Status: ${child2.fields.status.name}`);
    console.log(`   Parent: ${child2.fields.parent?.key || 'None'}`);
    console.log(`   Labels: ${child2.fields.labels.join(', ') || 'None'}`);
    console.log(`   URL: ${process.env.JIRA_BASE_URL}/browse/ENG-4796`);

    console.log('\n✅ Summary:');
    console.log('   • ENG-4784: Parent epic with high-level summaries');
    console.log('   • ENG-4795: Item 1 - Implement New Pricing Model (34 points, 57-77 hours)');
    console.log('   • ENG-4796: Item 2 - Implement Continuous Charging (55 points, 80-106 hours)');
    console.log('   • Total so far: 89 story points, 137-183 hours');
    console.log('   • Ready to create ticket for Item 3 (Expedited Onboarding)');

  } catch (error) {
    console.error('❌ Error verifying tickets:', error.message);
  }
}

verifyItem2Updates();
