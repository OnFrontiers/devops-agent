import JiraClient from '../core/jiraClient.js';

async function bulkCategorizeActiveIssues() {
  try {
    const jira = new JiraClient();
    console.log('⚡ EXECUTING AUTOMATED COMPONENT CATEGORIZATION FOR ALL ACTIVE TICKETS');

    // Target statuses representing active work
    const targetStatuses = [
      'Scoping', 'Triage',
      'Dev Ready', 'In Progress', 'Code Review',
      'Reviewed', 'Ready for Prod'
    ];

    const statusJql = targetStatuses.map(status =>
      `status = "${status}"`
    ).join(' OR ');

    const jql = `(${statusJql}) AND components IS EMPTY`;
    console.log(`🔍 Searching with JQL: ${jql}`);

    const results = await jira.searchIssues(jql, 0, 1000, [
      'summary', 'project', 'status', 'components', 'issuetype', 'labels'
    ]);

    console.log(`\n📊 Processing ${results.total} active tickets for component assignment...`);

    if (results.total === 0) {
      console.log('✅ No active tickets need component assignment!');
      return;
    }

    // Categorization logic based on analysis
    const categorizationRules = {
      // Project-specific prioritizations

      // ENG Project (Technical/Engineering)
      'ENG': {
        'Search': (issue) => {
          const labels = issue.fields.labels || [];
          const summary = issue.fields.summary.toLowerCase();
          return labels.includes('cerca-search') ||
                 summary.includes('cerca') ||
                 summary.includes('search') ||
                 summary.includes('filter') ||
                 summary.includes('index') ||
                 summary.includes('elasticsearch');
        },
        'Operations Hub': (issue) => {
          const labels = issue.fields.labels || [];
          const summary = issue.fields.summary.toLowerCase();
          return labels.includes('operations-hub') ||
                 summary.includes('operations hub') ||
                 summary.includes('orchestration') ||
                 summary.includes('pipeline') ||
                 summary.includes('automation');
        },
        'RM Agent': (issue) => {
          const labels = issue.fields.labels || [];
          const summary = issue.fields.summary.toLowerCase();
          return labels.some(label => label.includes('agent')) ||
                 summary.includes('agent') ||
                 summary.includes('relationship') ||
                 summary.includes('expert');
        },
        'API & Webapp': (issue) => {
          const summary = issue.fields.summary.toLowerCase();
          return summary.includes('api') ||
                 summary.includes('webapp') ||
                 summary.includes('frontend') ||
                 summary.includes('backend') ||
                 summary.includes('portal') ||
                 summary.includes('dashboard') ||
                 summary.includes('interface');
        },
        'DevOps': (issue) => {
          const summary = issue.fields.summary.toLowerCase();
          return summary.includes('deployment') ||
                 summary.includes('infrastructure') ||
                 summary.includes('container') ||
                 summary.includes('kubernetes') ||
                 summary.includes('docker') ||
                 summary.includes('aws') ||
                 summary.includes('monitoring');
        },
        'Product Management': (issue) => {
          const labels = issue.fields.labels || [];
          return labels.includes('product-development') ||
                 labels.includes('product-dev');
        }
      },

      // Non-ENG Projects (Business/Operational)
      'default': {
        'Operations Hub': (issue) => {
          const summary = issue.fields.summary.toLowerCase();
          return summary.includes('operations') ||
                 summary.includes('process') ||
                 summary.includes('workflow') ||
                 summary.includes('meeting') ||
                 summary.includes('governance') ||
                 summary.includes('agreement') ||
                 summary.includes('role') ||
                 summary.includes('consolidat');
        },
        'API & Webapp': (issue) => {
          const summary = issue.fields.summary.toLowerCase();
          const labels = issue.fields.labels || [];
          return summary.includes('email') ||
                 summary.includes('google') ||
                 summary.includes('wordpress') ||
                 summary.includes('analytics') ||
                 summary.includes('kpi') ||
                 summary.includes('review') ||
                 labels.some(label => label.includes('investors'));
        },
        'Search': (issue) => {
          const summary = issue.fields.summary.toLowerCase();
          return summary.includes('filter') ||
                 summary.includes('search') ||
                 summary.includes('list');
        },
        'RM Agent': (issue) => {
          const summary = issue.fields.summary.toLowerCase();
          return summary.includes('expert') ||
                 summary.includes('federal') ||
                 summary.includes('account');
        }
      }
    };

    // Categorize each issue
    const categorizedIssues = [];
    const uncategorizedIssues = [];

    results.issues.forEach(issue => {
      const projectKey = issue.fields.project.key;
      const rules = categorizationRules[projectKey] || categorizationRules['default'];

      let assignedComponent = null;

      // Test each rule in priority order
      for (const [componentName, ruleFunction] of Object.entries(rules)) {
        if (ruleFunction(issue)) {
          assignedComponent = componentName;
          break; // Take first match (priority order)
        }
      }

      if (assignedComponent) {
        categorizedIssues.push({ ...issue, assignedComponent });
      } else {
        uncategorizedIssues.push(issue);
      }
    });

    console.log(`\n🎯 Categorization Results:`);
    console.log(`   ✅ Categorized: ${categorizedIssues.length}`);
    console.log(`   ❓ Need manual review: ${uncategorizedIssues.length}`);

    // Show categorization breakdown
    const componentCounts = {};
    categorizedIssues.forEach(issue => {
      componentCounts[issue.assignedComponent] = (componentCounts[issue.assignedComponent] || 0) + 1;
    });

    console.log(`\n🏷️ Component Assignment Breakdown:`);
    Object.entries(componentCounts).sort((a, b) => b[1] - a[1]).forEach(([component, count]) => {
      console.log(`   ${component}: ${count} issues`);
    });

    // Show uncategorized issues (if any)
    if (uncategorizedIssues.length > 0) {
      console.log(`\n🤔 Uncategorizeable Issues (${uncategorizedIssues.length}):`);
      uncategorizedIssues.slice(0, 5).forEach(issue => {
        console.log(`   ${issue.key}: ${issue.fields.summary} (${issue.fields.project.key})`);
      });
      if (uncategorizedIssues.length > 5) {
        console.log(`   ... and ${uncategorizedIssues.length - 5} more`);
      }
    }

    console.log(`\n⚠️ About to assign components to ${categorizedIssues.length} issues across multiple projects.`);
    console.log('This action cannot be undone automatically.');
    console.log('Proceeding in 10 seconds... (Ctrl+C to cancel)');

    // Wait for user to cancel if needed
    await new Promise(resolve => setTimeout(resolve, 10000));

    console.log('\n🚀 Starting bulk component assignments...');

    let successCount = 0;
    let failureCount = 0;
    const errors = [];
    let projectStats = {};

    for (const issue of categorizedIssues) {
      try {
        console.log(`   🔄 ${issue.key} → "${issue.assignedComponent}"`);

        const updateData = {
          fields: {
            components: [{ name: issue.assignedComponent }]
          }
        };

        await jira.updateIssue(issue.key, updateData);

        successCount++;

        // Track project stats
        const project = issue.fields.project.key;
        projectStats[project] = projectStats[project] || { total: 0, byComponent: {} };
        projectStats[project].total++;
        projectStats[project].byComponent[issue.assignedComponent] =
          (projectStats[project].byComponent[issue.assignedComponent] || 0) + 1;

        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 150));

      } catch (error) {
        console.error(`   ❌ Failed ${issue.key}:`, error.response?.data?.errors || error.message);
        failureCount++;
        errors.push(`${issue.key}: ${error.message}`);
      }
    }

    // Final report
    console.log('\n🎉 BULK CATEGORIZATION COMPLETE!');
    console.log(`\n📊 Final Results:`);
    console.log(`   ✅ Successful assignments: ${successCount}`);
    console.log(`   ❌ Failed assignments: ${failureCount}`);
    console.log(`   📋 Total processed: ${results.total}`);
    console.log(`   🤔 Remaining uncategorized: ${uncategorizedIssues.length}`);

    // Show project breakdown
    console.log(`\n🏗️ By Project:`);
    Object.entries(projectStats).sort((a, b) => b[1].total - a[1].total).forEach(([project, stats]) => {
      console.log(`   ${project}: ${stats.total} issues`);
      Object.entries(stats.byComponent).forEach(([component, count]) => {
        console.log(`     • ${component}: ${count}`);
      });
    });

    if (errors.length > 0) {
      console.log(`\n❌ Errors (${errors.length}):`);
      errors.forEach(error => console.log(`   • ${error}`));
    }

    console.log(`\n🎯 Improvement Made:`);
    console.log(`   • ${successCount} active tickets now have proper component categorization`);
    console.log(`   • Better organization for project boards and reporting`);
    console.log(`   • Enhanced ability to filter and track work by functional area`);

  } catch (error) {
    console.error('❌ Error in bulk categorization:', error.message);
    if (error.response?.status === 401) {
      console.error('Check your API token and email in the .env file');
    } else if (error.response?.status === 403) {
      console.error('Insufficient permissions to modify components');
    }
  }
}

// Run the function
bulkCategorizeActiveIssues();
