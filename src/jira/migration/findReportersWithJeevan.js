import JiraClient from '../core/jiraClient.js';

async function findReportersWithJeevan() {
  try {
    const jira = new JiraClient();

    console.log('🔍 Searching for ENG tickets to find reporters with "Jeevan" in their name...');

    // First, let's find any ENG tickets with "Jeevan" anywhere in reporter name
    const broadJql = 'project = ENG AND reporter.displayName ~ "Jeevan"';

    console.log(`Broad search JQL: ${broadJql}`);

    const broadResults = await jira.searchIssues(broadJql, 0, 50, [
      'reporter',
      'summary',
      'status',
      'created'
    ]);

    console.log(`\n📊 Found ${broadResults.total} ENG tickets with "Jeevan" in reporter name:`);

    if (broadResults.issues.length > 0) {
      const uniqueReporters = new Set();

      broadResults.issues.forEach(issue => {
        const reporterName = issue.fields.reporter?.displayName;
        if (reporterName) {
          uniqueReporters.add(reporterName);
        }
      });

      console.log('\n👥 Unique reporters found:');
      Array.from(uniqueReporters).forEach((reporter, index) => {
        console.log(`   ${index + 1}. ${reporter}`);
      });

      // Now check how many of Jeevan's tickets are in Backlog
      console.log('\n🔍 Checking Jeevan\'s ticket status distribution...');

      const statusCounts = {};
      let backlogCount = 0;

      broadResults.issues.forEach(issue => {
        const status = issue.fields.status.name;
        statusCounts[status] = (statusCounts[status] || 0) + 1;

        if (status === 'Backlog') {
          backlogCount++;
        }
      });

      console.log('\n📊 Status distribution for Jeevan\'s tickets:');
      Object.entries(statusCounts).forEach(([status, count]) => {
        console.log(`   ${status}: ${count} tickets`);
      });

      console.log(`\n🎯 Jeevan's Backlog tickets: ${backlogCount}`);

    } else {
      console.log('No ENG tickets found with "Jeevan" in reporter name.');
      console.log('\n🔍 Trying alternative searches...');

      // Try searching for common variations
      const variations = ['Jeevan', 'jeevan', 'JEevan'];
      for (const variation of variations) {
        try {
          const altJql = `project = ENG AND reporter.displayName ~ "${variation}"`;
          const altResults = await jira.searchIssues(altJql, 0, 10, ['reporter']);

          if (altResults.total > 0) {
            console.log(`   Found ${altResults.total} tickets with "${variation}"`);
            break;
          }
        } catch (e) {
          // Continue to next variation
        }
      }

      console.log('\n💡 Suggestions:');
      console.log('   - Check the exact spelling of Jeevan\'s name in Jira');
      console.log('   - Jeevan may not have any ENG tickets');
      console.log('   - Try searching by email instead: reporter.emailAddress ~ "jeevan"');
    }

  } catch (error) {
    console.error('❌ Error querying Jira:', error.message);
    if (error.response?.status === 400) {
      console.error('JQL syntax error - reporter.displayName field may not be searchable this way');
      console.error('Try using: reporter ~ "Jeevan" instead');
    }
  }
}

findReportersWithJeevan();
