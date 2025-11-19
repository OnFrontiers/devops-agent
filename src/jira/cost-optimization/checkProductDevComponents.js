import JiraClient from '../core/jiraClient.js';

async function checkProductDevComponents() {
  try {
    const jira = new JiraClient();
    console.log('🔍 Finding ALL tickets with "product-development" label...');

    // JQL query for issues with product-development label
    const jql = 'labels = "product-development"';

    const results = await jira.searchIssues(jql, 0, 2000, [
      'summary', 'project', 'status', 'components', 'issuetype', 'priority'
    ]);

    console.log(`\n📊 Found ${results.total} work items with product-development label:`);
    console.log('=' .repeat(70));

    if (results.total === 0) {
      console.log('❌ No issues found with product-development label');
      return;
    }

    let noComponentCount = 0;
    const noComponentIssues = [];

    if (results.issues.length > 0) {
      // Group by project for better readability
      const issuesByProject = {};

      results.issues.forEach((issue) => {
        const projectKey = issue.fields.project.key;
        if (!issuesByProject[projectKey]) {
          issuesByProject[projectKey] = [];
        }
        issuesByProject[projectKey].push(issue);

        // Check if issue has no components
        const components = issue.fields.components || [];
        if (components.length === 0) {
          noComponentCount++;
          noComponentIssues.push(issue);
        }
      });

      // Display summary
      console.log(`\n🎯 Issues without components: ${noComponentCount} out of ${results.total}`);

      // Display issues grouped by project
      Object.keys(issuesByProject).forEach(projectKey => {
        const projectIssues = issuesByProject[projectKey];
        const issuesWithoutComponents = projectIssues.filter(issue =>
          !issue.fields.components || issue.fields.components.length === 0
        );

        console.log(`\n🏗️ Project: ${projectKey} (${projectIssues.length} issues total, ${issuesWithoutComponents.length} without components)`);
        console.log('-'.repeat(80));

        projectIssues.forEach((issue, index) => {
          const components = issue.fields.components || [];
          const componentNames = components.map(c => c.name).join(', ') || '❌ NONE';
          const statusIndicator = components.length === 0 ? '❌' : '✅';

          console.log(`${index + 1}. ${statusIndicator} ${issue.key}: ${issue.fields.summary}`);
          console.log(`   Status: ${issue.fields.status.name} | Type: ${issue.fields.issuetype.name} | Priority: ${issue.fields.priority?.name || 'None'}`);
          console.log(`   Components: ${componentNames}`);
          console.log('');
        });
      });

      console.log(`\n📋 SUMMARY:`);
      console.log(`   Total product-development issues: ${results.total}`);
      console.log(`   Issues with components: ${results.total - noComponentCount}`);
      console.log(`   Issues without components: ${noComponentCount}`);

      if (noComponentCount > 0) {
        console.log(`\n⚠️ Issues without components (need component assignment):`);
        noComponentIssues.forEach((issue, index) => {
          console.log(`   ${index + 1}. ${issue.key}: ${issue.fields.summary.slice(0, 60)}${issue.fields.summary.length > 60 ? '...' : ''}`);
        });

        console.log(`\n💡 Suggested common components for product-development issues:`);
        console.log(`   • Product Management`);
        console.log(`   • Roadmap`);
        console.log(`   • User Experience`);
        console.log(`   • Business Analysis`);
        console.log(`   • Strategy`);
        console.log(`   • Design`);
      }

    } else {
      console.log('No issues found with product-development label.');
    }

  } catch (error) {
    console.error('❌ Error querying Jira:', error.message);
    if (error.response?.status === 401) {
      console.error('Check your API token and email in the .env file');
    } else if (error.response?.status === 403) {
      console.error('Insufficient permissions to access the project or labels');
    }
  }
}

// Run the function
checkProductDevComponents();
