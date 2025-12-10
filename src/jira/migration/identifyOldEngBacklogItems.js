import JiraClient from '../core/jiraClient.js';

async function identifyOldEngBacklogItems() {
  try {
    const jira = new JiraClient();
    console.log('🔍 Searching for ENG items in Backlog status created more than 2 years ago...');

    // JQL query for ENG items in Backlog status created more than 2 years ago
    // created < -730d means created more than 730 days ago (approximately 2 years)
    const jql = 'project = ENG AND status = Backlog AND created < -730d';

    console.log(`JQL Query: ${jql}`);

    const results = await jira.searchIssues(jql, 0, 100, [
      'summary',
      'status',
      'created',
      'assignee',
      'issuetype',
      'priority',
      'labels'
    ]);

    console.log(`\n📊 Found ${results.total} ENG work items in Backlog status created >2 years ago:`);
    console.log('=' .repeat(100));

    if (results.issues.length > 0) {
      results.issues.forEach((issue, index) => {
        const createdDate = new Date(issue.fields.created);
        const ageInDays = Math.floor((new Date() - createdDate) / (1000 * 60 * 60 * 24));

        console.log(`${index + 1}. ${issue.key}: ${issue.fields.summary}`);
        console.log(`   Type: ${issue.fields.issuetype.name}`);
        console.log(`   Status: ${issue.fields.status.name}`);
        console.log(`   Created: ${createdDate.toLocaleDateString()} (${ageInDays} days ago)`);
        console.log(`   Assignee: ${issue.fields.assignee?.displayName || 'Unassigned'}`);
        console.log(`   Priority: ${issue.fields.priority?.name || 'None'}`);
        console.log(`   Labels: ${issue.fields.labels?.join(', ') || 'None'}`);
        console.log('');
      });

      console.log(`\n✅ Total items found: ${results.issues.length}`);
      console.log('\n💡 Next step: Review these items and confirm migration to BKG project with "Waiting initial review" status');

    } else {
      console.log('No items found matching the criteria.');
      console.log('This could mean:');
      console.log('- No ENG items have been in Backlog status for >2 years');
      console.log('- The status name might be different (check for "Open", "To Do", etc.)');
      console.log('- Items may have already been migrated or closed');
    }

    // Show pagination info if there are more results
    if (results.total > results.issues.length) {
      console.log(`\n⚠️  Note: Only showing first ${results.issues.length} of ${results.total} total results.`);
      console.log('Modify the script to increase the maxResults parameter if you need to see more.');
    }

  } catch (error) {
    console.error('❌ Error querying Jira:', error.message);
    if (error.response?.status === 401) {
      console.error('Check your API token and email in the .env file');
    } else if (error.response?.status === 403) {
      console.error('Insufficient permissions to access the ENG project');
    } else if (error.response?.status === 400) {
      console.error('Invalid JQL query - check the status name and project key');
    }
  }
}

identifyOldEngBacklogItems();
