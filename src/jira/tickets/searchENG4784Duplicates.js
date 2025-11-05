import JiraClient from '../core/jiraClient.js';

async function searchENG4784Duplicates() {
  try {
    const jira = new JiraClient();

    console.log('🔍 Searching for potential duplicates of ENG-4784 "Implement New SMB Plan"...\n');

    // Define search queries for potential overlaps with ENG-4784
    const searchQueries = [
      {
        name: 'Search Improvements',
        jql: 'text ~ "search improvement" OR text ~ "marketplace search" OR text ~ "expert discovery" OR text ~ "search optimization"',
        description: 'Tickets about improving search functionality and expert discovery'
      },
      {
        name: 'Marketplace Expert Finding',
        jql: 'text ~ "find experts" OR text ~ "expert search" OR text ~ "marketplace efficiency" OR text ~ "discovery improvement"',
        description: 'Tickets about finding marketplace experts more efficiently'
      },
      {
        name: 'SMB Onboarding',
        jql: 'text ~ "SMB" AND (text ~ "onboarding" OR text ~ "signup" OR text ~ "customer" OR text ~ "registration")',
        description: 'Tickets about SMB customer onboarding and signup processes'
      },
      {
        name: 'SMB Subscription',
        jql: 'text ~ "SMB" AND (text ~ "subscription" OR text ~ "billing" OR text ~ "pricing")',
        description: 'Tickets about SMB subscription and billing models'
      },
      {
        name: 'Seat-Based SMB',
        jql: 'text ~ "SMB" AND text ~ "seat"',
        description: 'Tickets about seat-based licensing for SMB customers'
      },
      {
        name: 'Marketplace Enhancements',
        jql: 'text ~ "marketplace" AND (text ~ "enhancement" OR text ~ "improvement" OR text ~ "optimization")',
        description: 'Tickets about marketplace functionality improvements'
      }
    ];

    const allResults = [];
    let totalTicketsFound = 0;

    // Execute each search query
    for (const query of searchQueries) {
      console.log(`\n🔎 ${query.name}`);
      console.log(`   ${query.description}`);
      console.log(`   JQL: ${query.jql}`);

      try {
        const searchResult = await jira.searchIssues(
          query.jql,
          0,
          50, // Limit to 50 results per query to avoid overwhelming output
          ['key', 'summary', 'status', 'assignee', 'created', 'updated', 'labels', 'issuetype', 'priority', 'description']
        );

        const totalCount = searchResult.total || searchResult.issues?.length || 0;
        console.log(`   📊 Found ${totalCount} ticket(s)\n`);

        if (totalCount > 0) {
          totalTicketsFound += totalCount;

          searchResult.issues.forEach((issue, index) => {
            const result = {
              key: issue.key,
              summary: issue.fields.summary,
              status: issue.fields.status.name,
              issuetype: issue.fields.issuetype.name,
              assignee: issue.fields.assignee?.displayName || 'Unassigned',
              created: issue.fields.created,
              updated: issue.fields.updated,
              labels: issue.fields.labels,
              priority: issue.fields.priority?.name || 'None',
              queryCategory: query.name
            };

            allResults.push(result);

            console.log(`   ${index + 1}. ${issue.key}: ${issue.fields.summary}`);
            console.log(`      Type: ${issue.fields.issuetype.name} | Status: ${issue.fields.status.name}`);
            console.log(`      Assignee: ${issue.fields.assignee?.displayName || 'Unassigned'}`);
            console.log(`      Priority: ${issue.fields.priority?.name || 'None'}`);
            console.log(`      Labels: ${issue.fields.labels.join(', ') || 'None'}`);
            console.log(`      Created: ${new Date(issue.fields.created).toLocaleDateString()}`);
            console.log('      ---');
          });
        }
      } catch (error) {
        console.log(`   ❌ Error executing query: ${error.message}`);
      }
    }

    // Summary
    console.log(`\n📈 SEARCH SUMMARY`);
    console.log(`   Total tickets found across all queries: ${totalTicketsFound}`);

    if (totalTicketsFound > 0) {
      console.log('\n🎯 POTENTIAL OVERLAPS WITH ENG-4784 "Implement New SMB Plan":');

      // Group by issue type
      const epics = allResults.filter(r => r.issuetype === 'Epic');
      const stories = allResults.filter(r => r.issuetype === 'Story');
      const tasks = allResults.filter(r => r.issuetype === 'Task');

      if (epics.length > 0) {
        console.log(`\n   📋 EXISTING EPICS (${epics.length}):`);
        epics.forEach(epic => {
          console.log(`      ${epic.key}: ${epic.summary} (${epic.status}) - ${epic.queryCategory}`);
        });
      }

      if (stories.length > 0) {
        console.log(`\n   📝 EXISTING STORIES (${stories.length}):`);
        stories.forEach(story => {
          console.log(`      ${story.key}: ${story.summary} (${story.status}) - ${story.queryCategory}`);
        });
      }

      if (tasks.length > 0) {
        console.log(`\n   ✅ EXISTING TASKS (${tasks.length}):`);
        tasks.forEach(task => {
          console.log(`      ${task.key}: ${task.summary} (${task.status}) - ${task.queryCategory}`);
        });
      }

      console.log('\n⚠️  RECOMMENDATION: Review these tickets to determine if they should be linked to ENG-4784 or if they represent separate initiatives.');
    } else {
      console.log('\n✅ No additional tickets found that would duplicate ENG-4784 scope.');
      console.log('   The epic appears to cover unique functionality not addressed by existing work.');
    }

    // Specific check for ENG-4784's child tickets
    console.log('\n🔗 ENG-4784 CHILD TICKETS (Already Linked):');
    console.log('   ├── ENG-4749: Enable USD Pricing Model');
    console.log('   └── ENG-1846: Establish online seat license purchases and seat management');

  } catch (error) {
    console.error('❌ Error searching for ENG-4784 duplicates:', error.message);
  }
}

searchENG4784Duplicates();
