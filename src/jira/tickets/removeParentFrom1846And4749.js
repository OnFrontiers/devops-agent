import JiraClient from '../core/jiraClient.js';

async function removeParentFrom1846And4749() {
  try {
    const jira = new JiraClient();

    console.log('🔄 Removing parent from ENG-1846 and ENG-4749...\n');

    // Remove parent from ENG-1846
    console.log('📝 Updating ENG-1846...');
    await jira.updateIssue('ENG-1846', {
      fields: {
        parent: null
      }
    });
    console.log('✅ ENG-1846 parent removed');

    // Remove parent from ENG-4749
    console.log('\n📝 Updating ENG-4749...');
    await jira.updateIssue('ENG-4749', {
      fields: {
        parent: null
      }
    });
    console.log('✅ ENG-4749 parent removed');

    // Verify the changes
    console.log('\n' + '='.repeat(60));
    console.log('VERIFICATION:');
    console.log('='.repeat(60));

    const ticket1846 = await jira.getIssue('ENG-1846');
    const ticket4749 = await jira.getIssue('ENG-4749');

    console.log('\n✅ ENG-1846: ' + ticket1846.fields.summary);
    console.log('   Parent: ' + (ticket1846.fields.parent?.key || 'None'));
    console.log('   Issue Links: ' + (ticket1846.fields.issuelinks?.length || 0) + ' links');
    console.log('   Related to: ENG-4795');
    console.log('   URL: ' + process.env.JIRA_BASE_URL + '/browse/ENG-1846');

    console.log('\n✅ ENG-4749: ' + ticket4749.fields.summary);
    console.log('   Parent: ' + (ticket4749.fields.parent?.key || 'None'));
    console.log('   Issue Links: ' + (ticket4749.fields.issuelinks?.length || 0) + ' links');
    console.log('   Related to: ENG-4795');
    console.log('   URL: ' + process.env.JIRA_BASE_URL + '/browse/ENG-4749');

    console.log('\n' + '='.repeat(60));
    console.log('UPDATED STRUCTURE:');
    console.log('='.repeat(60));

    console.log('\nENG-4784 (Implement New SMB Plan) - Parent Epic');
    console.log('├── ENG-4795 (Implement New Pricing Model) - 34 points');
    console.log('├── ENG-4796 (Continuous Charging) - 55 points');
    console.log('└── ENG-4797 (Expedited Onboarding) - 34 points');
    console.log('');
    console.log('Standalone tickets (related to ENG-4795):');
    console.log('• ENG-1846 (Seat license purchases) - no parent, linked to 4795');
    console.log('• ENG-4749 (USD Pricing) - no parent, linked to 4795');

    console.log('\n✅ Parents removed! ENG-1846 and ENG-4749 are now standalone');
    console.log('   tickets that are related to ENG-4795.');

  } catch (error) {
    console.error('❌ Error removing parents:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
removeParentFrom1846And4749();
