import JiraClient from '../core/jiraClient.js';

async function reassociateToENG4795() {
  try {
    const jira = new JiraClient();

    console.log('🔄 Re-associating ENG-1846 and ENG-4749 to ENG-4795...\n');

    // Update ENG-1846 parent to ENG-4795
    console.log('📝 Updating ENG-1846...');
    await jira.updateIssue('ENG-1846', {
      fields: {
        parent: { key: 'ENG-4795' }
      }
    });
    console.log('✅ ENG-1846 now linked to ENG-4795');

    // Update ENG-4749 parent to ENG-4795
    console.log('\n📝 Updating ENG-4749...');
    await jira.updateIssue('ENG-4749', {
      fields: {
        parent: { key: 'ENG-4795' }
      }
    });
    console.log('✅ ENG-4749 now linked to ENG-4795');

    // Add a comment to ENG-4795 about the linked tickets
    console.log('\n💬 Adding comment to ENG-4795...');
    await jira.addComment('ENG-4795',
      'Two existing tickets have been associated as subtasks:\n\n' +
      '• ENG-1846: Establish online seat license purchases and seat management (covered by sections 1.5 & 1.6)\n' +
      '• ENG-4749: Enable USD Pricing Model (covered by sections 1.1 & 1.3)\n\n' +
      'These tickets are now subtasks of this implementation.'
    );
    console.log('✅ Comment added to ENG-4795');

    // Verify the changes
    console.log('\n' + '='.repeat(60));
    console.log('VERIFICATION:');
    console.log('='.repeat(60));

    const ticket1846 = await jira.getIssue('ENG-1846');
    const ticket4749 = await jira.getIssue('ENG-4749');
    const ticket4795 = await jira.getIssue('ENG-4795');

    console.log('\n✅ ENG-1846: ' + ticket1846.fields.summary);
    console.log('   Parent: ' + (ticket1846.fields.parent?.key || 'None'));
    console.log('   URL: ' + process.env.JIRA_BASE_URL + '/browse/ENG-1846');

    console.log('\n✅ ENG-4749: ' + ticket4749.fields.summary);
    console.log('   Parent: ' + (ticket4749.fields.parent?.key || 'None'));
    console.log('   URL: ' + process.env.JIRA_BASE_URL + '/browse/ENG-4749');

    console.log('\n✅ ENG-4795: ' + ticket4795.fields.summary);
    console.log('   Parent: ' + (ticket4795.fields.parent?.key || 'None'));
    console.log('   URL: ' + process.env.JIRA_BASE_URL + '/browse/ENG-4795');

    console.log('\n' + '='.repeat(60));
    console.log('UPDATED STRUCTURE:');
    console.log('='.repeat(60));

    console.log('\nENG-4784 (Implement New SMB Plan)');
    console.log('├── ENG-4795 (Implement New Pricing Model) - 34 points');
    console.log('│   ├── ENG-1846 (Seat license purchases & management)');
    console.log('│   └── ENG-4749 (USD Pricing Model)');
    console.log('├── ENG-4796 (Continuous Charging) - 55 points');
    console.log('└── ENG-4797 (Expedited Onboarding) - 34 points');

    console.log('\n✅ Re-association complete!');

  } catch (error) {
    console.error('❌ Error re-associating tickets:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
reassociateToENG4795();
