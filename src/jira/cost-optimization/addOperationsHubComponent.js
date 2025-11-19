import JiraClient from '../core/jiraClient.js';

async function addOperationsHubComponent() {
  try {
    const jira = new JiraClient();
    console.log('🔍 Searching for ALL issues with cost-reduction label...');

    // JQL query for ALL projects with cost-reduction label (not just ENG)
    const jql = 'labels = cost-reduction';

async function addSearchComponent() {
  try {
    const jira = new JiraClient();
    console.log('🔍 Searching for ALL issues with labels containing "search"...');

    // JQL query for ALL projects with labels containing "search"
    const jql = 'labels ~ search';

    const results = await jira.searchIssues(jql, 0, 1000, [
      'summary', 'project', 'status', 'components', 'issuetype'
    ]);

    console.log(`\n📊 Found ${results.total} work items with cost-reduction label across ALL projects:`);
    console.log('=' .repeat(80));

    if (results.total === 0) {
      console.log('❌ No issues found with cost-reduction label');
      return;
    }

    if (results.issues.length > 0) {
      // Group by project for better readability
      const issuesByProject = {};

      results.issues.forEach((issue) => {
        const projectKey = issue.fields.project.key;
        if (!issuesByProject[projectKey]) {
          issuesByProject[projectKey] = [];
        }
        issuesByProject[projectKey].push(issue);
      });

      // Display issues grouped by project
      Object.keys(issuesByProject).forEach(projectKey => {
        console.log(`\n🏗️ Project: ${projectKey} (${issuesByProject[projectKey].length} issues)`);
        console.log('-'.repeat(60));

        issuesByProject[projectKey].forEach((issue, index) => {
          console.log(`${index + 1}. ${issue.key}: ${issue.fields.summary}`);
          console.log(`   Status: ${issue.fields.status.name}`);
          console.log(`   Type: ${issue.fields.issuetype.name}`);

          const components = issue.fields.components || [];
          const componentNames = components.map(c => c.name).join(', ') || 'None';
          console.log(`   Current Components: ${componentNames}`);
          console.log('');
        });
      });

      console.log(`\n⚠️  Ready to add "Operations Hub" component to all ${results.total} issues listed above.`);
      console.log('This will ADD the component (keeping any existing components).');
      console.log('\n❓ Continue with bulk update? (This script will proceed automatically in 10 seconds)');
      console.log('   Cancel by pressing Ctrl+C');

      // Wait 10 seconds for user to cancel if needed
      await new Promise(resolve => setTimeout(resolve, 10000));

      console.log('\n🚀 Starting bulk component updates...');

      let successCount = 0;
      let failureCount = 0;
      const errors = [];

      for (const issue of results.issues) {
        try {
          console.log(`🔄 Updating ${issue.key}...`);

          // Get current components
          const currentComponents = issue.fields.components || [];
          const componentIds = currentComponents.map(c => ({ id: c.id }));

          // Add Operations Hub component
          const operationsHubComponent = { name: 'Operations Hub' };
          componentIds.push(operationsHubComponent);

          const updateData = {
            fields: {
              components: componentIds
            }
          };

          await jira.updateIssue(issue.key, updateData);
          console.log(`✅ Successfully added Operations Hub component to ${issue.key}`);

          successCount++;

          // Add small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 200));

        } catch (error) {
          console.error(`❌ Error updating ${issue.key}:`, error.response?.data?.errors || error.message);
          failureCount++;
          errors.push(`${issue.key}: ${error.message}`);
          continue;
        }
      }

      // Final report
      console.log('\n🎉 Bulk update completed!');
      console.log(`📊 Results:`);
      console.log(`   ✅ Successful updates: ${successCount}`);
      console.log(`   ❌ Failed updates: ${failureCount}`);

      if (errors.length > 0) {
        console.log(`\n❌ Errors encountered:`);
        errors.forEach(error => {
          console.log(`   • ${error}`);
        });
      }

      console.log(`\n🎯 All ${results.total} issues now have the "Operations Hub" component added.`);

    } else {
      console.log('No issues found with the cost-reduction label.');
    }

  } catch (error) {
    console.error('❌ Error in bulk update:', error.message);
    if (error.response?.status === 401) {
      console.error('Check your API token and email in the .env file');
    } else if (error.response?.status === 403) {
      console.error('Insufficient permissions to access the project or modify components');
    }
  }
}

// Run the function
addOperationsHubComponent();
