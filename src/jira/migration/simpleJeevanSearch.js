import JiraClient from '../core/jiraClient.js';

async function simpleJeevanSearch() {
  try {
    const jira = new JiraClient();

    console.log('🔍 Simple search for Jeevan in ENG project...');

    // Try the simplest possible search
    const jql = 'project = ENG AND reporter ~ "Jeevan"';

    console.log(`JQL: ${jql}`);

    const results = await jira.searchIssues(jql, 0, 50, [
      'reporter',
      'summary',
      'status'
    ]);

    console.log(`\n📊 Results: ${results.total} tickets found`);

    if (results.issues.length > 0) {
      console.log('\n🎯 Found Jeevan\'s tickets:');
      results.issues.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue.key}: ${issue.fields.summary}`);
        console.log(`   Reporter: ${issue.fields.reporter?.displayName}`);
        console.log(`   Status: ${issue.fields.status.name}`);
        console.log('');
      });

      // Count backlog tickets
      const backlogCount = results.issues.filter(issue => issue.fields.status.name === 'Backlog').length;
      console.log(`🎯 Jeevan's ENG Backlog tickets: ${backlogCount} out of ${results.total} total tickets`);

    } else {
      console.log('\n❌ No ENG tickets found for Jeevan');

      // Let's check if there are ANY ENG tickets to make sure our connection works
      console.log('\n🔍 Checking if ENG project has any tickets...');
      const testJql = 'project = ENG';
      const testResults = await jira.searchIssues(testJql, 0, 5, ['key', 'summary']);

      console.log(`ENG project has ${testResults.total} total tickets`);
      if (testResults.issues.length > 0) {
        console.log('Sample tickets:');
        testResults.issues.forEach(issue => {
          console.log(`   ${issue.key}: ${issue.fields.summary.substring(0, 50)}...`);
        });
      }

      console.log('\n💡 Jeevan either:');
      console.log('   - Has no ENG tickets');
      console.log('   - Has a different name spelling in Jira');
      console.log('   - Reports tickets in a different project');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

simpleJeevanSearch();
