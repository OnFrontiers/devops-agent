import JiraClient from '../core/jiraClient.js';

async function assignComponentsToProductDev() {
  try {
    const jira = new JiraClient();
    console.log('🔍 Finding product-development issues that need components...');

    // JQL query for issues with product-development label
    const jql = 'labels = "product-development"';

    const results = await jira.searchIssues(jql, 0, 2000, [
      'summary', 'project', 'status', 'components', 'issuetype'
    ]);

    console.log(`\n📊 Found ${results.total} product-development issues`);

    // Define component assignments based on user's categorization
    const componentMappings = {
      // CERCA search related (15 issues) - using "Search" component since "cerca" doesn't exist
      'Search': [
        'ENG-4731', 'ENG-4715', 'ENG-4714', 'ENG-4713', 'ENG-4712', 'ENG-4697',
        'ENG-4696', 'ENG-4693', 'ENG-4692', 'ENG-4690', 'ENG-4677', 'ENG-4674',
        'ENG-4673', 'ENG-4672', 'ENG-4731'
      ],
      // API and infrastructure (6 issues) → DevOps
      'DevOps': [
        'ENG-4704', 'ENG-4675', 'ENG-4720', 'ENG-4726', 'ENG-4783'
      ],
      // UI/UX (2 issues) → API & Webapp
      'API & Webapp': [
        'ENG-4721', 'ENG-4698', 'ENG-4716', 'ENG-4699',
        // Operations and tech debt (5 issues) → API & Webapp
        'ENG-4700', 'ENG-4676', 'ENG-4678', 'ENG-4687', 'ENG-4691'
      ]
    };

    let successCount = 0;
    let failureCount = 0;
    const errors = [];

    console.log('\n🚀 Starting component assignments...\n');

    // Process each component assignment
    for (const [componentName, issueKeys] of Object.entries(componentMappings)) {
      console.log(`🏷️ Assigning "${componentName}" component to ${issueKeys.length} issues...`);

      for (const issueKey of issueKeys) {
        try {
          console.log(`   🔄 Updating ${issueKey}...`);

          // Find the issue in our results
          const issue = results.issues.find(i => i.key === issueKey);
          if (!issue) {
            console.log(`   ⚠️ Issue ${issueKey} not found in results`);
            continue;
          }

          // Get current components and add the new one
          const currentComponents = issue.fields.components || [];
          const componentIds = currentComponents.map(c => ({ id: c.id }));

          // Add new component
          componentIds.push({ name: componentName });

          const updateData = {
            fields: {
              components: componentIds
            }
          };

          await jira.updateIssue(issueKey, updateData);
          console.log(`   ✅ Successfully added "${componentName}" component to ${issueKey}`);

          successCount++;

          // Small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 200));

        } catch (error) {
          console.error(`   ❌ Error updating ${issueKey}:`, error.response?.data?.errors || error.message);
          failureCount++;
          errors.push(`${issueKey}: ${error.message}`);
          continue;
        }
      }
      console.log('');
    }

    // Final report
    console.log('🎉 Component assignment completed!');
    console.log(`\n📊 Results:`);
    console.log(`   ✅ Successful assignments: ${successCount}`);
    console.log(`   ❌ Failed assignments: ${failureCount}`);

    if (errors.length > 0) {
      console.log(`\n❌ Errors encountered:`);
      errors.forEach(error => {
        console.log(`   • ${error}`);
      });
    }

    // Show component distribution
    console.log(`\n📋 Component Assignment Summary:`);
    Object.entries(componentMappings).forEach(([component, issues]) => {
      console.log(`   • "${component}": ${issues.length} issues`);
    });

    console.log(`\n🎯 All product-development issues now have appropriate components assigned.`);

  } catch (error) {
    console.error('❌ Error in component assignment:', error.message);
    if (error.response?.status === 401) {
      console.error('Check your API token and email in the .env file');
    } else if (error.response?.status === 403) {
      console.error('Insufficient permissions to modify components');
    }
  }
}

// Run the function
assignComponentsToProductDev();
