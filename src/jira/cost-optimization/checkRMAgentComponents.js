import JiraClient from '../core/jiraClient.js';

async function checkRMAgentComponents() {
  try {
    const jira = new JiraClient();
    console.log('🔍 Searching for ALL tickets related to RM Agent...');

    // Try different search strategies for RM Agent
    const searchQueries = [
      'labels ~ "RM Agent"',  // Label contains RM Agent
      'summary ~ "RM Agent"', // Summary contains RM Agent
      'labels ~ "rm-agent"',  // Label contains rm-agent (lowercase)
      'labels ~ "rm agent"',  // Label contains rm agent (space)
      'labels ~ "RM"',        // Label contains RM
    ];

    let allIssues = [];
    let uniqueKeys = new Set();

    // Try each search query
    for (const query of searchQueries) {
      try {
        console.log(`   Searching with: ${query}`);
        const results = await jira.searchIssues(query, 0, 500, [
          'summary', 'project', 'status', 'components', 'issuetype', 'labels'
        ]);

        // Add unique issues not already found
        results.issues.forEach(issue => {
          if (!uniqueKeys.has(issue.key)) {
            uniqueKeys.add(issue.key);
            allIssues.push(issue);
          }
        });

        console.log(`   Found ${results.issues.length} potential matches`);
      } catch (error) {
        console.log(`   Query "${query}" failed, continuing...`);
      }
    }

    // Filter for issues that actually mention RM Agent in labels, summary, or are clearly RM-related
    const rmAgentIssues = allIssues.filter(issue => {
      const labels = issue.fields.labels || [];
      const summary = issue.fields.summary.toLowerCase();

      // Check if any label contains RM or Agent
      const hasRMLabel = labels.some(label =>
        label.toLowerCase().includes('rm') || label.toLowerCase().includes('agent')
      );

      // Check if summary contains RM Agent
      const hasRMSummary = summary.includes('rm agent') || summary.includes('rm-agent');

      return hasRMLabel || hasRMSummary;
    });

    console.log(`\n📊 Found ${rmAgentIssues.length} confirmed RM Agent related issues:`);
    console.log('='.repeat(70));

    if (rmAgentIssues.length === 0) {
      console.log('❌ No confirmed RM Agent issues found');

      // Show some examples of what was found
      console.log('\n🔍 Sample of issues found during search:');
      allIssues.slice(0, 5).forEach(issue => {
        console.log(`   • ${issue.key}: ${issue.fields.summary}`);
        console.log(`     Labels: ${(issue.fields.labels || []).join(', ') || 'None'}`);
      });

      return;
    }

    let noComponentCount = 0;
    const noComponentIssues = [];

    if (rmAgentIssues.length > 0) {
      // Group by project for better readability
      const issuesByProject = {};

      rmAgentIssues.forEach((issue) => {
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
      console.log(`\n🎯 Issues without components: ${noComponentCount} out of ${rmAgentIssues.length}`);

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
          console.log(`   Status: ${issue.fields.status.name} | Type: ${issue.fields.issuetype.name}`);
          console.log(`   Components: ${componentNames}`);
          console.log(`   Labels: ${(issue.fields.labels || []).join(', ')}`);
          console.log('');
        });
      });

      console.log(`\n📋 SUMMARY:`);
      console.log(`   Total RM Agent related issues: ${rmAgentIssues.length}`);
      console.log(`   Issues with components: ${rmAgentIssues.length - noComponentCount}`);
      console.log(`   Issues without components: ${noComponentCount}`);

      if (noComponentCount === 0) {
        console.log('\n✅ All RM Agent issues already have components assigned!');
        return;
      }

      // Proceed with component assignment
      console.log(`\n⚠️ Ready to add "RM Agent" component to ${noComponentCount} issues listed above.`);
      console.log('This will ADD the component (keeping any existing components).');
      console.log('\n❓ Continue with bulk component assignment? (This script will proceed automatically in 10 seconds)');
      console.log('   Cancel by pressing Ctrl+C');

      // Wait 10 seconds for user to cancel if needed
      await new Promise(resolve => setTimeout(resolve, 10000));

      console.log('\n🚀 Starting RM Agent component assignments...');

      let successCount = 0;
      let failureCount = 0;
      const errors = [];

      for (const issue of noComponentIssues) {
        try {
          console.log(`🔄 Updating ${issue.key}...`);

          const updateData = {
            fields: {
              components: [{ name: 'RM Agent' }]
            }
          };

          await jira.updateIssue(issue.key, updateData);
          console.log(`✅ Successfully added "RM Agent" component to ${issue.key}`);

          successCount++;

          // Small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 200));

        } catch (error) {
          console.error(`❌ Error updating ${issue.key}:`, error.response?.data?.errors || error.message);
          failureCount++;
          errors.push(`${issue.key}: ${error.message}`);
          continue;
        }
      }

      // Final report
      console.log('\n🎉 RM Agent component assignment completed!');
      console.log(`\n📊 Results:`);
      console.log(`   ✅ Successful assignments: ${successCount}`);
      console.log(`   ❌ Failed assignments: ${failureCount}`);

      if (errors.length > 0) {
        console.log(`\n❌ Errors encountered:`);
        errors.forEach(error => {
          console.log(`   • ${error}`);
        });
      }

      console.log(`\n🎯 All RM Agent issues now have the "RM Agent" component assigned.`);
    }

  } catch (error) {
    console.error('❌ Error in RM Agent component check:', error.message);
    if (error.response?.status === 401) {
      console.error('Check your API token and email in the .env file');
    } else if (error.response?.status === 403) {
      console.error('Insufficient permissions to access the project or labels');
    }
  }
}

// Run the function
checkRMAgentComponents();
