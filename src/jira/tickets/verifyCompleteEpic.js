import JiraClient from '../core/jiraClient.js';

async function verifyCompleteEpic() {
  try {
    const jira = new JiraClient();

    console.log('🎯 ENG-4784 SMB Plan Epic - Complete Structure\n');
    console.log('═'.repeat(60));

    // Get parent ticket
    const parent = await jira.getIssue('ENG-4784');
    console.log('\n📋 Parent Epic: ENG-4784');
    console.log(`   Summary: ${parent.fields.summary}`);
    console.log(`   Status: ${parent.fields.status.name}`);
    console.log(`   Labels: ${parent.fields.labels.join(', ') || 'None'}`);
    console.log(`   URL: ${process.env.JIRA_BASE_URL}/browse/ENG-4784`);

    console.log('\n' + '─'.repeat(60));
    console.log('CHILD TICKETS:');
    console.log('─'.repeat(60));

    // Get all child tickets
    const children = [
      { key: 'ENG-4795', points: 34, hoursMin: 57, hoursMax: 77 },
      { key: 'ENG-4796', points: 55, hoursMin: 80, hoursMax: 106 },
      { key: 'ENG-4797', points: 34, hoursMin: 65, hoursMax: 87 }
    ];

    for (const child of children) {
      const ticket = await jira.getIssue(child.key);
      console.log(`\n📌 ${child.key}: ${ticket.fields.summary}`);
      console.log(`   Status: ${ticket.fields.status.name}`);
      console.log(`   Story Points: ${child.points}`);
      console.log(`   Estimated Hours: ${child.hoursMin}-${child.hoursMax} (avg ${Math.round((child.hoursMin + child.hoursMax) / 2)})`);
      console.log(`   Labels: ${ticket.fields.labels.join(', ') || 'None'}`);
      console.log(`   URL: ${process.env.JIRA_BASE_URL}/browse/${child.key}`);
    }

    console.log('\n' + '═'.repeat(60));
    console.log('TOTALS:');
    console.log('═'.repeat(60));

    const totalPoints = children.reduce((sum, c) => sum + c.points, 0);
    const totalHoursMin = children.reduce((sum, c) => sum + c.hoursMin, 0);
    const totalHoursMax = children.reduce((sum, c) => sum + c.hoursMax, 0);
    const avgHours = Math.round((totalHoursMin + totalHoursMax) / 2);
    const avgDays = Math.round(avgHours / 8);

    console.log(`\n   Total Story Points: ${totalPoints}`);
    console.log(`   Total Hours: ${totalHoursMin}-${totalHoursMax} (avg ${avgHours})`);
    console.log(`   Estimated Developer Days: ~${avgDays} days`);
    console.log(`   Estimated Calendar Time: 4-6 weeks (with 2-3 developers)`);

    console.log('\n' + '═'.repeat(60));
    console.log('IMPLEMENTATION PHASES (RECOMMENDED):');
    console.log('═'.repeat(60));

    console.log('\n   Phase 1 - MVP (34 points, 57-77 hours):');
    console.log('   └── ENG-4795: Implement New Pricing Model');
    console.log('       • Create SMB plan, seat types, USD display');
    console.log('       • Enable subscription and seat management');

    console.log('\n   Phase 2 - Onboarding (34 points, 65-87 hours):');
    console.log('   └── ENG-4797: Expedited Customer Onboarding');
    console.log('       • Multi-step wizard for signup');
    console.log('       • Stripe payment integration');
    console.log('       • Account/team creation');

    console.log('\n   Phase 3 - Advanced Billing (55 points, 80-106 hours):');
    console.log('   └── ENG-4796: Continuous Charging');
    console.log('       • Usage-based charges (booking, consultation)');
    console.log('       • Charge reconciliation and refunds');
    console.log('       • Failed payment handling');

    console.log('\n' + '═'.repeat(60));
    console.log('✅ Epic Structure Complete!');
    console.log('═'.repeat(60) + '\n');

  } catch (error) {
    console.error('❌ Error verifying epic:', error.message);
  }
}

verifyCompleteEpic();
