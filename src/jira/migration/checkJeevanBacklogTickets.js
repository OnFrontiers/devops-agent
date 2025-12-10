import JiraClient from '../core/jiraClient.js';

async function checkJeevanBacklogTickets() {
  try {
    const jira = new JiraClient();

    console.log('🔍 Searching for ENG tickets in Backlog status reported by Jeevan...');

    // JQL query for ENG tickets in Backlog status reported by someone with first name Jeevan
    // Using reporter displayName containing "Jeevan" (case insensitive)
    const jql = 'project = ENG AND status = Backlog AND reporter.displayName ~ "Jeevan"';

    console.log(`JQL Query: ${jql}`);

    const results = await jira.searchIssues(jql, 0, 100, [
      'summary',
      'status',
      'created',
      'assignee',
      'issuetype',
      'priority',
      'reporter',
      'labels'
    ]);

    console.log(`\n📊 Found ${results.total} ENG tickets in Backlog status reported by Jeevan:`);
    console.log('=' .repeat(100));

    if (results.issues.length > 0) {
      results.issues.forEach((issue, index) => {
        const createdDate = new Date(issue.fields.created);
        const ageInDays = Math.floor((new Date() - createdDate) / (1000 * 60 * 60 * 24));

        console.log(`${index + 1}. ${issue.key}: ${issue.fields.summary}`);
        console.log(`   Reporter: ${issue.fields.reporter?.displayName || 'Unknown'}`);
        console.log(`   Status: ${issue.fields.status.name}`);
        console.log(`   Created: ${createdDate.toLocaleDateString()} (${ageInDays} days ago)`);
        console.log(`   Assignee: ${issue.fields.assignee?.displayName || 'Unassigned'}`);
        console.log(`   Priority: ${issue.fields.priority?.name || 'None'}`);
        console.log(`   Type: ${issue.fields.issuetype.name}`);
        console.log(`   Labels: ${issue.fields.labels?.join(', ') || 'None'}`);
        console.log('');
      });

      console.log(`\n✅ Total Jeevan backlog tickets: ${results.issues.length}`);

      // Summary statistics
      const typeCounts = {};
      const priorityCounts = {};
      const ageGroups = { '30days': 0, '90days': 0, '1year': 0, '2years': 0, 'older': 0 };

      results.issues.forEach(issue => {
        // Count by type
        const type = issue.fields.issuetype.name;
        typeCounts[type] = (typeCounts[type] || 0) + 1;

        // Count by priority
        const priority = issue.fields.priority?.name || 'None';
        priorityCounts[priority] = (priorityCounts[priority] || 0) + 1;

        // Count by age
        const ageInDays = Math.floor((new Date() - new Date(issue.fields.created)) / (1000 * 60 * 60 * 24));
        if (ageInDays <= 30) ageGroups['30days']++;
        else if (ageInDays <= 90) ageGroups['90days']++;
        else if (ageInDays <= 365) ageGroups['1year']++;
        else if (ageInDays <= 730) ageGroups['2years']++;
        else ageGroups['older']++;
      });

      console.log('\n📈 Summary Statistics:');
      console.log('Issue Types:');
      Object.entries(typeCounts).forEach(([type, count]) => {
        console.log(`   ${type}: ${count}`);
      });

      console.log('\nPriorities:');
      Object.entries(priorityCounts).forEach(([priority, count]) => {
        console.log(`   ${priority}: ${count}`);
      });

      console.log('\nAge Distribution:');
      console.log(`   ≤ 30 days: ${ageGroups['30days']}`);
      console.log(`   31-90 days: ${ageGroups['90days']}`);
      console.log(`   3-12 months: ${ageGroups['1year']}`);
      console.log(`   1-2 years: ${ageGroups['2years']}`);
      console.log(`   > 2 years: ${ageGroups['older']}`);

    } else {
      console.log('No ENG tickets found in Backlog status reported by Jeevan.');
      console.log('This could mean:');
      console.log('- Jeevan hasn\'t reported any backlog tickets');
      console.log('- The reporter name search didn\'t match (try different spelling/case)');
      console.log('- Tickets may have been moved or closed');
    }

  } catch (error) {
    console.error('❌ Error querying Jira:', error.message);
    if (error.response?.status === 401) {
      console.error('Check your API token and email in the .env file');
    } else if (error.response?.status === 403) {
      console.error('Insufficient permissions to access the ENG project');
    } else if (error.response?.status === 400) {
      console.error('Invalid JQL query - check the reporter field syntax');
    }
  }
}

checkJeevanBacklogTickets();
